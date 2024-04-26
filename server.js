const express = require('express');
const http = require('http');
const multer = require('multer');
const socketio = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `uploads/${req.file.originalname}`);

    console.log('Uploaded file:', targetPath);

    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).send('Error uploading file');

        const fileUrl = `/uploads/${req.file.originalname}`;
        const fileName = req.file.originalname;
        io.emit('fileUploaded', { fileUrl, fileName });
        res.json({ fileUrl, fileName });
        io.emit('fileUploaded', { fileUrl, fileName, fileSize: req.file.size, uploadDate: Date.now() });
    });
});

// Socket.io connection handling
io.on('connection', socket => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});


