const express =require('express')
const router = express.Router()
const QueueClass = require('../libs/queue')
let queue = new QueueClass(10);
router.get('/video',(req,res)=>{

})