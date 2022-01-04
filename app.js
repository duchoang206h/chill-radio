const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const path = require('path')
const cors = require("cors");
require('dotenv').config();
const ratelimit = require("./src/middlewares/ratelimit");
const config = require("./src/configs/config");
const expressSession = require('express-session');
const MongoStore = require('connect-mongodb-session')(expressSession);
const sharedsession = require("express-socket.io-session");
const store = new MongoStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
const compression = require('compression')
//socketio
const app = express();
const server = createServer(app);

// init socketio
const io = require('./src/socket/socket.service').init(server);


//const io = new Server(server);
//app.set('socketio', io);
const handlebars = require("express-handlebars");

const helmet = require("helmet");
const searchRouter = require("./src/search/search.router");
const indexRouter = require("./src/index/index.router");
const authRouter =require('./src/auth/auth.router')
const videoRouter = require('./src/video/video.router')
const adminRouter = require('./src/admin/admin.router')
const morgan = require("morgan");
const mongoose = require("mongoose");
/* require('./controllers/socketService') */
//app.set("socket.io", io);
// view engine setup
app.set("views", "./views");
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
// basic setup security
const session = expressSession ({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 3600*1000*24*365*10
  },
  store: store
})
app.use(session);
io.use(sharedsession(session, {
  autoSave:true
})); 
/* app.use(compression()) */
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(require('./src/auth/passport').initialize())


app.use("/", ratelimit); // Rate limit
app.use("/", searchRouter);
app.use('/',authRouter)
app.use("/", indexRouter);
app.use("/", videoRouter);
app.use("/", adminRouter);

app.post('/login',(req,res)=>{
  res.sendFile('login.html', { root: path.join(__dirname, './public') });
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
function connect(){
  return new Promise((resolve,reject) => {
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      ()=> resolve()
    )
  })
}
require('./backupDb')
const { initDb } = require('./initDb')
// init some data before start
/* connect().
then(()=>initDb().
then(()=>server.listen(80))) */
connect().then(()=>server.listen(3000))


