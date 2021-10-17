const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const cors = require("cors");
const ratelimit = require("./middlewares/ratelimit");
const config = require("./configs/config");
//socketio
const app = express();
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const handlebars = require("express-handlebars");
const helmet = require("helmet");
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");
const auth0config = require('./routes/auth0config')
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to mongodb")
);
app.set("socket.io", io);
// view engine setup
app.set("views", "./views");
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
// basic setup security
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1", ratelimit); // Rate limit
app.use("/api/v1", apiRouter);
app.use("/config",auth0config);
app.use("/", indexRouter);

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
server.listen(3000);
