export const toBlob = (fileObj) => {
  return window.URL.createObjectURL(
    new Blob([fileObj], { type: fileObj.type })
  );
};

export const fetchBlobFile = async (url) =>
  await fetch(url).then((r) => r.blob());

export function toDataUrl(url) {
  let res, rej;

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const reader = new FileReader();

      reader.onloadend = function () {
        res(reader.result);
      };

      reader.readAsDataURL(xhr.response);
    } else {
      rej(new Error(`Failed to fetch data from URL: ${url}`));
    }
  };

  xhr.onerror = function () {
    rej(new Error(`Network error while fetching URL: ${url}`));
  };

  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();

  return new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
}
