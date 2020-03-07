const express = require('express');
const bodyParser = require('body-parser');
const router = require('./db/router')

const cors = require('cors')
let app = express();
app.use(bodyParser.json());
app.use(cors());
//处理表单数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(3300,()=>{
    console.log('http://localhost:3300');
});