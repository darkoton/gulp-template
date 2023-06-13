//Импорт gulp
const { src, dest } = require("gulp")

//Импорт плагинов
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const imagemin = require("gulp-imagemin")
const newer = require("gulp-newer")
const webp = require("gulp-webp")

//Задача
const img = function (cb) {
   src("./#src/img/**/*") //Берёт путь с файлами

      //Проверка на ошибки
      // .pipe(plumber({
      //    errorHandler: notify.onError(error => ({
      //       title: "HTML",
      //       message: error.message
      //    }))
      // }))

      // .pipe(newer("./dist/img")) //Фильтр
      // .pipe(webp())
      // .pipe(dest("./dist/img")) //Копирует и создаёт в dist 
      // src("./#src/img/*.{png,jpg,jpeg,gif,svg}") //Берёт путь с файлами
      // .pipe(newer("./dist/img"))
      // .pipe(imagemin({
      //    verbose: true
      // }))
      .pipe(dest("./dist/img")) //Копирует и создаёт в dist //?(3)

   cb()
}

//Вывод
module.exports = img;