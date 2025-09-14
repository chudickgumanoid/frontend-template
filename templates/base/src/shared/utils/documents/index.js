import html2pdf from "html2pdf.js";

export const pdfDownload = (html, name = "Documents") => {
  html2pdf()
    .from(html)
    .set({
      margin: [0.4, 0.1, 0.2, 0.1],
      image: { type: "jpeg", quality: 0.95 },
      pagebreak: { mode: ["avoid-all"] },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save(name);
};

export const handlePrint = (doc) => {
  html2pdf()
    .from(doc)
    .set({
      margin: [0.4, 0.1, 0.2, 0.1],
      image: { type: "jpeg", quality: 0.95 },
      pagebreak: { mode: ["avoid-all"] },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .outputPdf("blob")
    .then((pdfBlob) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const newWindow = window.open(pdfUrl);

      if (newWindow) {
        newWindow.onload = function () {
          newWindow.print();
        };
      }
    });
};
