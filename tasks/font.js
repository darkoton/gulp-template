//Импорт gulp
const { src, dest } = require("gulp")

//Импорт плагинов
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const newer = require("gulp-newer")
const fonter = require("gulp-fonter")
const ttf2woff2 = require("gulp-ttf2woff2")

//Задача
const font = function (cb) {
   src("./#src/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}")
   .pipe(dest("./dist/fonts"))

   src("./#src/iconfonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}")
   .pipe(dest("./dist/iconfonts"))

   cb()
}

//Вывод
module.exports = font;