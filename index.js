async function getPDF() {
  const images = document.querySelectorAll("img"); // all images in the HTML

  const canvasArray = []; // Array for canvas images

  await new Promise((resolve, reject) => {
    images.forEach(async (image) => {
      const canvas = await html2canvas(image, {
        allowTaint: true,
      });

      var imgData = canvas.toDataURL("image/jpeg", 1.0);

      canvasArray.push(imgData);

      if (images.length === canvasArray.length) {
        resolve();
      }
    });
  });

  var pdf = new jsPDF({ format: "a4", orientation: "p" });
  canvasArray.forEach((CI, index) => {
    pdf.addImage(
      CI,
      "JPG",
      15,
      15,
      images[index].width / 4,
      images[index].height / 4,
      "NONE"
    );
    if (!(index === images.length - 1)) pdf.addPage("a4", "p");
  });

  pdf.save("HTML-Document.pdf");
}

getPDF();
