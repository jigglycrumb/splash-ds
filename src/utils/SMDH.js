import { MarcFile } from "./MarcFile";
import { UnicodeString } from "./UnicodeString";

const el = id => document.getElementById(id);

const SMDH_SIZE = 14016;
const SMDH_MAGIC = 0x48444d53;
const TILE_ORDER = [
  0,
  1,
  8,
  9,
  2,
  3,
  10,
  11,
  16,
  17,
  24,
  25,
  18,
  19,
  26,
  27,
  4,
  5,
  12,
  13,
  6,
  7,
  14,
  15,
  20,
  21,
  28,
  29,
  22,
  23,
  30,
  31,
  32,
  33,
  40,
  41,
  34,
  35,
  42,
  43,
  48,
  49,
  56,
  57,
  50,
  51,
  58,
  59,
  36,
  37,
  44,
  45,
  38,
  39,
  46,
  47,
  52,
  53,
  60,
  61,
  54,
  55,
  62,
  63,
];

export const VALID_LANGUAGES = [2, 3, 4, 5];

function SMDHHeader() {
  this.magic = SMDH_MAGIC; //u32
  this.version = 0; //u16
  this.reserved = 0; //u16
}

function SMDHTitle() {
  this.shortDescription = new UnicodeString(0x40);
  this.longDescription = new UnicodeString(0x80);
  this.publisher = new UnicodeString(0x40);
}

function SMDHSettings() {
  this.gameRatings = new Array(0x10); //u8
  this.regionLock = 0; //u32
  this.matchMakerId = new Array(0x0c); //u8
  this.flags = 0; //u32
  this.eulaVersion = 0; //u16
  this.reserved = 0; //u16
  this.defaultFrame = 0; //u32
  this.cecId = 0; //u32
}

function SMDH() {
  this.file = new MarcFile(SMDH_SIZE);
  this.file.fileName = "info.smdh";
  this.file.seqMode = true;
  this.file.littleEndian = true;
  this.file.seekOffset = 0;

  this.header = new SMDHHeader();
  this.applicationTitles = new Array(16);
  for (var i = 0; i < 16; i++) this.applicationTitles[i] = new SMDHTitle();
  this.settings = new SMDHSettings();
  this.reserved = new Array(0x08);

  this.bigIconData = new Array(0x0900);
  for (var i = 0; i < 0x0900; i++) this.bigIconData[i] = 0;
  this.smallIconData = new Array(0x0240);
  for (var i = 0; i < 0x0240; i++) this.smallIconData[i] = 0;
}

SMDH.prototype.isValid = function () {
  return this.header.magic === SMDH_MAGIC;
};

SMDH.prototype.readTitle = function (titleId) {
  this.applicationTitles[titleId] = new SMDHTitle();
  for (var i = 0; i < 0x40; i++)
    this.applicationTitles[titleId].shortDescription.setChar(
      i,
      this.file.readU16()
    );

  for (var i = 0; i < 0x80; i++)
    this.applicationTitles[titleId].longDescription.setChar(
      i,
      this.file.readU16()
    );

  for (var i = 0; i < 0x40; i++)
    this.applicationTitles[titleId].publisher.setChar(i, this.file.readU16());
};

SMDH.prototype.save = function () {
  this.header.magic = SMDH_MAGIC;

  this.file.seekOffset = 0;
  this.file.writeU32(this.header.magic);
  this.file.writeU16(this.header.version);
  this.file.writeU16(this.header.reserved);

  var globalShortDescription = el("short-description").value;
  var globalLongDescription = el("long-description").value;
  var globalPublisher = el("publisher").value;

  for (var i = 0; i < this.applicationTitles.length; i++) {
    var shortDescription = globalShortDescription;
    var longDescription = globalLongDescription;
    var publisher = globalPublisher;

    // if (el("row-short-description" + i)) {
    //   if (el("short-description" + i).value !== "")
    //     shortDescription = el("short-description" + i).value;

    //   if (el("long-description" + i).value !== "")
    //     longDescription = el("long-description" + i).value;

    //   if (el("publisher" + i).value !== "")
    //     publisher = el("publisher" + i).value;
    // }

    this.applicationTitles[i].shortDescription.set(shortDescription);
    this.applicationTitles[i].longDescription.set(longDescription);
    this.applicationTitles[i].publisher.set(publisher);

    for (
      var j = 0;
      j < this.applicationTitles[i].shortDescription.maxLength;
      j++
    )
      this.file.writeU16(this.applicationTitles[i].shortDescription.array[j]);

    for (
      var j = 0;
      j < this.applicationTitles[i].longDescription.maxLength;
      j++
    )
      this.file.writeU16(this.applicationTitles[i].longDescription.array[j]);

    for (var j = 0; j < this.applicationTitles[i].publisher.maxLength; j++)
      this.file.writeU16(this.applicationTitles[i].publisher.array[j]);
  }

  for (var i = 0; i < this.settings.gameRatings.length; i++)
    this.file.write(this.settings.gameRatings[i]);
  this.file.writeU32(this.settings.regionLock);
  for (var i = 0; i < this.settings.matchMakerId.length; i++)
    this.file.write(this.settings.matchMakerId[i]);
  this.file.writeU32(this.settings.flags);
  this.file.writeU16(this.settings.eulaVersion);
  this.file.writeU16(this.settings.reserved);
  this.file.writeU32(this.settings.defaultFrame);
  this.file.writeU32(this.settings.cecId);

  for (var i = 0; i < this.reserved.length; i++)
    this.file.write(this.reserved[i]);

  for (var i = 0; i < this.smallIconData.length; i++)
    this.file.writeU16(this.smallIconData[i]);

  for (var i = 0; i < this.bigIconData.length; i++)
    this.file.writeU16(this.bigIconData[i]);

  console.log(this.bigIconData);

  return this.file.save();
};

SMDH.prototype.convertIcon = function (bigIcon, toBitmap) {
  var iconSize, iconData, canvasCtx;
  if (bigIcon) {
    iconSize = 48;
    iconData = this.bigIconData;
    canvasCtx = el("big-icon").getContext("2d");
  } else {
    iconSize = 24;
    iconData = this.smallIconData;
    canvasCtx = el("small-icon").getContext("2d");
  }

  let i = 0;
  let tile_x = 0;
  let tile_y = 0;
  let k = 0;

  if (toBitmap) {
    for (tile_y; tile_y < iconSize; tile_y += 8) {
      for (tile_x; tile_x < iconSize; tile_x += 8) {
        for (k; k < 8 * 8; k++) {
          const x = TILE_ORDER[k] & 0x7;
          const y = TILE_ORDER[k] >> 3;
          const color = iconData[i];
          i++;

          const b = (color & 0x1f) << 3;
          const g = ((color >> 5) & 0x3f) << 2;
          const r = ((color >> 11) & 0x1f) << 3;

          canvasCtx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          canvasCtx.fillRect(x + tile_x, y + tile_y, 1, 1);
        }
      }
    }
  } else {
    for (tile_y; tile_y < iconSize; tile_y += 8) {
      for (tile_x; tile_x < iconSize; tile_x += 8) {
        for (k; k < 8 * 8; k++) {
          const x = TILE_ORDER[k] & 0x7;
          const y = TILE_ORDER[k] >> 3;

          const pixelData = canvasCtx.getImageData(
            x + tile_x,
            y + tile_y,
            1,
            1
          );
          const r = pixelData.data[0] >> 3;
          const g = pixelData.data[1] >> 2;
          const b = pixelData.data[2] >> 3;

          iconData[i] = (r << 11) | (g << 5) | b;
          i++;
        }
      }
    }
  }
};

SMDH.prototype.convertIconToBitmap = function (bigIcon) {
  this.convertIcon(bigIcon, true);
};

export { SMDH };
