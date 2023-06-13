//Импорт gulp
const { src, dest } = require("gulp")

//Импорт плагинов
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const size = require("gulp-size")
const csso = require("gulp-csso")
const rename = require("gulp-rename")
const shorthand = require("gulp-shorthand")
const groupCssMediaQueries = require("gulp-group-css-media-queries")
const webpCss = require("gulp-webp-css")

//Задача
const prodScss = function (cb) {
   src("./dist/css/*.css") //Берёт путь с файлами //?(2)

      //Проверка на ошибки
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "prodSCSS",
            message: error.message
         }))
      }))

      // .pipe(webpCss()) //!
      // .pipe(shorthand()) //+
      // .pipe(groupCssMediaQueries())  //Баги с этим плагином
      .pipe(size({ title: "style.css" })) //
      // .pipe(dest("./dist/css")) //Копирование и создание в dist  // 


      // .pipe(rename({ suffix: ".min" })) // 
      .pipe(csso()) // 
      .pipe(size({ title: "style.css" })) // 
      .pipe(dest("./dist/css")) //Копирование и создание в dist 

   cb()
}

//Вывод
module.exports = prodScss;
