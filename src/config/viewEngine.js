import express from 'express'

let configViewEnine = (app) => {
    app.use(express.static('./src/public')) //Cấu hình để nói với express là lấy tài nguyên ở đâu
    app.set('view engine', 'ejs') //Nói với nodejs là dùng view engine ejs
    app.set('views', './src/views') //Cấu hình đường dẫn tới thư mục views, tự động tìm đến khi render ở controller
}

module.exports = configViewEnine;