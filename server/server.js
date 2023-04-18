const app = require('./app');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const server = require('http').createServer(app);
const { v4 } = require('uuid');
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

require('dotenv').config();

// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(cors());

let usersInRoom = [];

// socket.io connection
io.on('connection', socket => {
    socket.on('join-room', rid => {
        socket.join(rid);
    });

    socket.on('leave-room', rid => {
        socket.leave(rid);
        socket.emit('clean-old-data', true);
    });

    socket.on('send-message', data => {
        data.id = v4();
        io.to(data.rid).emit('recive-message', data);
    });
    socket.on('disconnect', () => { });
});


// Get all @Routers
require('./Routers/index');

// Start Server On @port: 5000
server.listen(port, () => console.log(`server is running on port: ${port}`))

// Mongo URI
const mongoURI = process.env.MONGODB_URI;

// Connect to @MongoDB
mongoose.connect(mongoURI).then(() => {
    console.log('Server has been Connected to MongoDB')
})

require('./Services/Gridfs');