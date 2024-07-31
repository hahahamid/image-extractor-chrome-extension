document.addEventListener("DOMContentLoaded", function () {
    const extractBtn = document.getElementById("extract-btn");
    const imageList = document.getElementById("image-list");
  
    extractBtn.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extractImages" });
      });
    });
  
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === "imagesExtracted") {
        const images = request.images;
        imageList.innerHTML = "";
        images.forEach(function (image) {
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("image-container");
          const img = document.createElement("img");
          img.src = image.src;
          img.width = 200;
          img.height = 200;
          imageContainer.appendChild(img);
          const downloadBtn = document.createElement("button");
          downloadBtn.classList.add("download-btn");
          downloadBtn.textContent = "Download";
          downloadBtn.addEventListener("click", function () {
            const a = document.createElement("a");
            a.href = image.src;
            a.download = image.filename;
            a.click();
          });
          imageContainer.appendChild(downloadBtn);
          imageList.appendChild(imageContainer);
        });
      }
    });
  });