//Импорт gulp
const { src, dest } = require("gulp")

//Импорт плагинов
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const fileInclude = require("gulp-file-include")

//Задача
const html = function (cb) {
   src([
      "./#src/html/*.html",
      "!./#src/html/_*.html",
      "!./#src/chunks/html/_*.html"
   ]) //Берёт путь с файлами //?(2)

      //Проверка на ошибки
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message
         }))
      }))

      .pipe(fileInclude()) //Плагином обрабатывает
      .pipe(dest("./dist/")) //Копирует и создаёт в dist //?(3)

   cb()
}

//Вывод
module.exports = html;