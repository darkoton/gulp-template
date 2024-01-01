document.addEventListener("DOMContentLoaded", () => {

  const mediaFiles = Array.from(document.querySelectorAll("img, video"))
  let i = 0
  const preloader = document.querySelector(".preloader")
  const percent = document.querySelector(".preloader .percent > span")

  if (!preloader || !percent) {
    console.error("Не удалось найти элементы");
    return;
  }

  if (mediaFiles.length == 0) {
    percent.textContent = '100'
    preloader.classList.add("preloader--hide")
  }

  const updateProgress = () => {
    i++;
    percent.textContent = ((i * 100) / mediaFiles.length).toFixed();
    if (i === mediaFiles.length) {
      percent.textContent = '100';
      preloader.classList.add("preloader--hide");
    }
  };


  mediaFiles.forEach(file => {
    if (!file.complete) {
      file.onload = updateProgress
    } else {
      updateProgress()
    }

  });
})