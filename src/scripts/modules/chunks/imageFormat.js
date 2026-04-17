// Проверка поддержки формата изображений
function testImageFormat(format, data, callback) {
  let img = new Image();
  img.onload = img.onerror = () => {
    callback(img.height === 2);
  };
  img.src = data;
}

// Проверка AVIF
function isAvif() {
  testImageFormat(
    'avif',
    'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAAHwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgQAMAAAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAnbWRhdBIACggYADYICGg0IDIRGAAKKKKEAO2tKztNOttUDeA=',
    support => {
      if (support) {
        document.documentElement.classList.add('avif');
      }
    },
  );
}

// Проверка WebP
function isWebp() {
  testImageFormat(
    'webp',
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
    support => {
      if (support) {
        document.documentElement.classList.add('webp');
      }
    },
  );
}

isWebp();
isAvif();
