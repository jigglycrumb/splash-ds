/*
SMDH Creator v1.1 by Marc Robledo 2015
based on SMDH Creator by GEMISIS https://github.com/gemisis/SMDH-Creator
more info about SMDH format: http://3dbrew.org/wiki/SMDH
*/
function el(e) {
  return document.getElementById(e);
}

function addEvent(e, ev, f) {
  if (e.addEventListener) {
    e.addEventListener(ev, f, false);
    return true;
  } else if (e.attachEvent) e.attachEvent("on" + ev, f);
}

var smdh, tempImage, tempImageReader, tempFile, tempFileLoadFunction;

function importBigCanvas() {
  tempImageReader.readAsDataURL(el("file-load").files[0]);
}
function importSmallCanvas() {
  tempImageReader.readAsDataURL(el("file-load").files[0]);
}

function clickImportBigCanvas() {
  tempFileLoadFunction = importBigCanvas;
  el("file-load").click();
}
function clickImportSmallCanvas() {
  tempFileLoadFunction = importSmallCanvas;
  el("file-load").click();
}
function clickLoadSMDH() {
  tempFileLoadFunction = loadSMDH;
  el("file-load").click();
}
// function clickSaveSMDH() {
//   smdh.save();
// }

/* Initialize SMDH Creator */
addEvent(window, "load", function () {
  // smdh = new SMDH();

  tempImage = document.createElement("img");
  addEvent(tempImage, "load", function () {
    if (el("both-icons").checked) {
      el("big-icon").getContext("2d").drawImage(tempImage, 0, 0, 48, 48);
      el("small-icon").getContext("2d").drawImage(tempImage, 0, 0, 24, 24);
      smdh.convertIcon(true, false);
      smdh.convertIcon(false, false);
    } else if (tempFileLoadFunction == importBigCanvas) {
      el("big-icon").getContext("2d").drawImage(tempImage, 0, 0, 48, 48);
      smdh.convertIcon(true, false);
    } else if (tempFileLoadFunction == importSmallCanvas) {
      el("small-icon").getContext("2d").drawImage(tempImage, 0, 0, 24, 24);
      smdh.convertIcon(false, false);
    }
  });

  tempImageReader = new FileReader();
  addEvent(tempImageReader, "load", function () {
    //if(validFileType)
    tempImage.src = tempImageReader.result;
  });
});
