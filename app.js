

const expressLoader = require('./src/loader/expressLoader');
const { initDb }  = require('./initDb');
initDb().then(()=>expressLoader())