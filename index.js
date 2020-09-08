const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000

const FPS = 6;
const wCap = new cv.VideoCapture(0);
//wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
//wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
		const frame = wCap.read();
		const image = cv.imencode('.jpg',frame).toString('base64');
		io.emit('image',image);
}, 1000 / FPS)

server.listen(PORT);

console.log('listening on port '+PORT)
