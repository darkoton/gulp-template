//Импорт gulp
const { src, dest } = require("gulp")

const fileInclude = require("gulp-file-include")
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")


//Задача
const js = function (cb) {
   src("./#src/js/*.js") //Берёт путь с файлами //?(2)

      //Проверка на ошибки
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "JS",
            message: error.message
         }))
      }))

      .pipe(fileInclude()) //Плагином обрабатывает

      .pipe(dest("./dist/js")) //Копирует и создаёт в dist //?(3)

   cb()
}

//Вывод
module.exports = js;