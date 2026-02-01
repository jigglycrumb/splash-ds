const loadImage = (file: any) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = function () {
      resolve(img);
    };
    img.src = file;
  });
};

export { loadImage };
