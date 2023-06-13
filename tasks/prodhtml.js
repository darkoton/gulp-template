//Импорт gulp
const { src, dest } = require("gulp")

//Импорт плагинов
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const fileInclude = require("gulp-file-include")
const htmlMin = require("gulp-htmlmin")
const size = require("gulp-size")
const webpHtml = require("gulp-webp-html")
const rename = require("gulp-rename")


//Задача
const prodHtml = function (cb) {
   src([
      "./#src/html/*.html",
      "!./#src/html/_*.html",
      "!./#src/chunks/html/_*.html"
   ]) //Берёт путь с файлами

      //Проверка на ошибки
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "prodHTML",
            message: error.message
         }))
      }))

      .pipe(fileInclude()) //Плагином обрабатывает
      // .pipe(webpHtml()) //!
      // .pipe(dest("./dist")) //Копирует и создаёт в dist

      .pipe(size({ title: "HTML До сжатия" })) //
      .pipe(htmlMin({  //
         collapseWhitespace: true
      }))
      .pipe(size({ title: "HTML После сжатия" })) //
      // .pipe(rename({ suffix: ".min" })) // 

      .pipe(dest("./dist/")) //Копирует и создаёт в dist //

   cb()
}

//Вывод
module.exports = prodHtml;