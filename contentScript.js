function extractImages() {
    const images = document.querySelectorAll("img");
    const imageList = [];
  
    images.forEach(function (image) {
      const src = image.src;
      const filename = src.split("/").pop();
      imageList.push({ src, filename });
    });
  
    chrome.runtime.sendMessage({ action: "imagesExtracted", images: imageList });
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "extractImages") {
      extractImages();
    }
  });