const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const ratelimit = require("../middlewares/ratelimit");
const config = require("../configs/config");
const expressSession = require("express-session");
const Sequelize = require("sequelize");
// const MongoStore = require('connect-mongodb-session')(expressSession);
const SequelizeStore = require("connect-session-sequelize")(
  expressSession.Store
);
const sharedsession = require("express-socket.io-session");
const { sequelize } = require("../video/video.model");
const store = new SequelizeStore({
  db: sequelize,
});
const compression = require("compression");
//socketio
// init socketio

//const io = new Server(server);
//app.set('socketio', io);
const handlebars = require("express-handlebars");

const helmet = require("helmet");

const morgan = require("morgan");
//const mongoose = require("mongoose");
/* require('./controllers/socketService') */
//app.set("socket.io", io);
// view engine setup
module.exports = () => {
    
  const app = express();
  const server = createServer(app);
  const io = require("../socket/socket.service").init(server);
  app.set("views", "./views");
  app.engine("handlebars", handlebars());
  app.set("view engine", "handlebars");
  // basic setup security
  const session = expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 365 * 10,
    },
    store: store,
  });
  app.use(session);
  io.use(
    sharedsession(session, {
      autoSave: true,
    })
  );
  /* app.use(compression()) */
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(require("../auth/passport").initialize());
  const indexRouter = require("../index/index.router");
  const searchRouter = require("../search/search.router");

const authRouter = require("../auth/auth.router");
const videoRouter = require("../video/video.router");
const adminRouter = require("../admin/admin.router");
  app.use("/", ratelimit); // Rate limit
  app.use("/", searchRouter);
  app.use("/", authRouter);
  app.use("/", indexRouter);
  app.use("/", videoRouter);
  app.use("/", adminRouter);

  app.post("/login", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "./public") });
  });
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
  // Cronjob
  require('../backupDB/backupdb')
  server.listen(3000,()=>console.log("Running port 3000"))
  return app;
};

