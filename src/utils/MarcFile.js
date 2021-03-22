/* MarcFile.js 20150922 by Marc */
function MarcFile(source, func) {
  if (typeof window.FileReader !== "function") {
    alert("Your browser doesn't support FileReader.");
    return null;
  }

  if (
    typeof source === "object" &&
    source.name &&
    source.size /*&& source.type*/
  ) {
    this.file = source;
    this.fileName = this.file.name;
    this.fileSize = this.file.size;
    this.fileType = source.type;

    this.fileReader = new FileReader();
    this.fileReader.addEventListener(
      "load",
      function () {
        this.dataView = new DataView(this.result);
      },
      false
    );
    if (func) this.fileReader.addEventListener("load", func, false);
    this.fileReader.readAsArrayBuffer(this.file);
  } else if (typeof source === "number") {
    this.fileSize = source;
    this.fileName = "filename.bin";
    this.fileType = "application/octet-stream";

    this.fileReader = new ArrayBuffer(this.fileSize);
    this.fileReader.dataView = new DataView(this.fileReader);

    if (func) func();
  } else {
    alert("Invalid type of file.");
    return null;
  }

  this.seekOffset = 0;
  this.seqMode = false;
  this.littleEndian = false;
}

MarcFile.prototype.read = function (p) {
  if (p === undefined) p = 0;
  var ret = this.fileReader.dataView.getUint8(this.seekOffset + p);
  if (this.seqMode) this.seekOffset++;
  return ret;
};

MarcFile.prototype.readU16 = function (p) {
  if (p === undefined) p = 0;
  var ret = this.fileReader.dataView.getUint16(
    this.seekOffset + p,
    this.littleEndian
  );
  if (this.seqMode) this.seekOffset += 2;
  return ret;
};

MarcFile.prototype.readU32 = function (p) {
  if (p === undefined) p = 0;
  var ret = this.fileReader.dataView.getUint32(
    this.seekOffset + p,
    this.littleEndian
  );
  if (this.seqMode) this.seekOffset += 4;
  return ret;
};

MarcFile.prototype.readArray = function (p, l) {
  var bytes = new Array(l);
  for (var i = 0; i < l; i++) bytes[i] = this.read(p + i);
  return bytes;
};

MarcFile.prototype.write = function (v) {
  this.fileReader.dataView.setUint8(this.seekOffset + 0, v);
  if (this.seqMode) this.seekOffset++;
};

MarcFile.prototype.writeU16 = function (v) {
  this.fileReader.dataView.setUint16(this.seekOffset + 0, v, this.littleEndian);
  if (this.seqMode) this.seekOffset += 2;
};

MarcFile.prototype.writeU32 = function (v) {
  this.fileReader.dataView.setUint32(this.seekOffset + 0, v, this.littleEndian);
  if (this.seqMode) this.seekOffset += 4;
};

MarcFile.prototype.save = function () {
  var blob;
  try {
    blob = new Blob([this.fileReader.dataView], { type: this.fileType });
  } catch (e) {
    //old browser, using BlobBuilder
    window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (e.name === "TypeError" && window.BlobBuilder) {
      var bb = new window.BlobBuilder();
      bb.append(this.fileReader.dataView.buffer);
      blob = bb.getBlob(this.fileType);
    } else if (e.name === "InvalidStateError") {
      blob = new Blob([this.fileReader.dataView.buffer], {
        type: this.fileType,
      });
    } else {
      alert("Incompatible browser.");
    }
  }

  console.log("MarcFile.save", blob);

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    const base64data = reader.result;
    if (base64data) {
      downloadFile(base64data, "info.smdh");
    }
  };
};

const downloadFile = (url, name) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { MarcFile };
