export const prepareImageFile = async (file) => {
  if (!file) return null;

  if (!file.type.startsWith("image/")) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageUrl;
    });

    const maxWidth = 1600;
    const maxHeight = 1600;
    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    const width = Math.round(image.width * ratio);
    const height = Math.round(image.height * ratio);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.85);
    });

    if (!blob) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};
