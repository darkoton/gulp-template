//Импорт gulp
const { watch, series } = require("gulp")

//Импорт js задач
const html = require('./tasks/html.js')
const clear = require('./tasks/clear.js')
const img = require('./tasks/img.js')
const video = require('./tasks/video.js')
const font = require('./tasks/font.js')
const prodHtml = require('./tasks/prodhtml.js')
const prodScss = require('./tasks/prodscss.js')
const js = require('./tasks/js.js')

//Наблюдение
const watcher = () => {
   watch("./#src/html/**/*.html", html) //наблюдает за путями и задачей 
   watch("./#src/js/**/*.js", js) //наблюдает за путями и задачей 
   watch("./#src/img/**/*", img) //наблюдает за путями и задачей 
   watch("./#src/video/**/*", video) //наблюдает за путями и задачей 
}

//Последовательность
const build = series(
   prodScss,
   prodHtml,
   // img,
   // font
)
const dev = series(
   html,
   img,
   video,
   font,
   js,
   watcher
)

//Экспорт наружу
exports.html = html; //справа название функции которую вызываем
exports.watcher = watcher; //справа название функции которую вызываем 
exports.clear = clear; //справа название функции которую вызываем 
exports.img = img; //справа название функции которую вызываем 
exports.video = video; //справа название функции которую вызываем 
exports.font = font; //справа название функции которую вызываем 
exports.js = js; //справа название функции которую вызываем 

exports.prodHtml = prodHtml;
exports.prodScss = prodScss;

//Запуск задач
exports.dev = dev; //dev
exports.build = build; //production







