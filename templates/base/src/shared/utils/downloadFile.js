export const downloadFile = (response, fileName = "") => {
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
