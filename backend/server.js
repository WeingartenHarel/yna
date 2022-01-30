const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);



// Express App Config

app.use(bodyParser.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000','http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030', 'http://localhost:8081'],
    credentials: true
  };
  app.use(cors(corsOptions));
}
 
const poolRoutes = require('./api/pool/pool.routes')
// routes
app.use('/api/pool', poolRoutes)


app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port:  ' + port)
});

