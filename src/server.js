import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoute from './route/web'
import connectDB from './config/connectDB'
require('dotenv').config()

let app = express();

//config app

app.use(bodyParser.json()); //express.json()là một phương thức được tích hợp sẵn để nhận ra Đối tượng Yêu cầu đến là một Đối tượng JSON .
app.use(bodyParser.urlencoded({extended: true})) //express.urlencoded()là một phương thức được xây dựng sẵn để nhận ra Đối tượng Yêu cầu đến dưới dạng chuỗi hoặc mảng

viewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})
