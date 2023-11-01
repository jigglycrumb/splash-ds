const convertImageToBin = (canvas: HTMLCanvasElement) => {
  if(canvas) {
    const canvasData = canvas?.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height).data;
    let fileData = '';

    if(canvasData) {
      for(var i = 0; i < canvasData.length; i += 4) {
        fileData += String.fromCharCode(canvasData[i+2], canvasData[i+1], canvasData[i]);
      }
    }

    return fileData;
  }
}

export { convertImageToBin }
