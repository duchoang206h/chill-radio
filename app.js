const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const path = require('path')
const cors = require("cors");
require('dotenv').config();
const ratelimit = require("./middlewares/ratelimit");
const config = require("./configs/config");
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
const io = require('./helpers/socketService').initialize(server);


//const io = new Server(server);
//app.set('socketio', io);
const handlebars = require("express-handlebars");

const helmet = require("helmet");
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");
//const auth0config = require('./routes/auth0config')
const oauth =require('./routes/oauth')
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
      maxAge: 900000
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
app.use(require('./middlewares/passport').initialize())
app.use("/api/v1", ratelimit); // Rate limit
app.use("/api/v1", apiRouter);
//app.use("/config",auth0config);
app.use('/auth',oauth)
app.use("/", indexRouter);
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
connect().
then(()=>server.listen(3000))

