const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);



// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
  secret: 'mixtape secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000','http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030', 'http://localhost:8081'],
    credentials: true
  };
  app.use(cors(corsOptions));
}

// socket section 
// var msgs = []
// io.on('connection', (socket) => {
//     socket.emit('msgHistory', msgs)

//     io.emit('user connect')

//     socket.on('msgSent', (msg) => {
//         console.log('Got msg', msg);
//         msgs.push(msg)
//         io.emit('msgBeam', msg);
//     });
//     socket.on('disconnect', () => {
//         io.emit('user disconnected', { txt: 'Someone just left', from: 'System' })
//     });
// });

 
 
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const poolRoutes = require('./api/pool/pool.routes')
const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/pool', poolRoutes)
connectSockets(io)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port: v ' + port)
});

