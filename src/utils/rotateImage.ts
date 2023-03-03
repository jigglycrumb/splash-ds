const rotateImage = (image: CanvasImageSource) => {
  const rotationCanvas = document.createElement('canvas');
  rotationCanvas.width = image.height as number;
  rotationCanvas.height = image.width as number;

  const rotationContext = rotationCanvas.getContext("2d");

  if(rotationContext) {
    rotationContext.save();
    rotationContext.translate(rotationCanvas.width/2, rotationCanvas.height/2);
    rotationContext.rotate(90 * Math.PI/180);
    rotationContext.drawImage(image, -image.width/2, -image.height/2);
    rotationContext.restore();
  }

  return rotationCanvas;
}

export { rotateImage }
