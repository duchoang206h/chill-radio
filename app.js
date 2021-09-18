import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createServer } from 'http';

//socketio
const app = express();
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);


import handlebars from 'express-handlebars';

import searchRouter from './routes/search';

app.set('socket.io', io);
// view engine setup
 app.set('views', './views')
app.engine('handlebars',handlebars())
app.set('view engine', 'handlebars'); 

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
app.use('/search', searchRouter);
 app.use('/', (req,res)=>{
   res.render('test',{layout:"other"})
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */
server.listen(3000)


