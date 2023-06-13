//Импорт плагинов
const del = require("del") 

//Задача
const clear = (cb) => {
   del("./dist")

   cb()
}

//Вывод
module.exports = clear;