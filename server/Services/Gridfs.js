const app = require('../app');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const multer  = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

const mongoURI = process.env.MONGODB_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs, gridfsBucket;
Grid.mongo = mongoose.mongo;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })
  
    // Init stream
  gfs = Grid(conn.db);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage });

module.exports = upload;

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
  });

  app.get("/file/:filename", async (req, res) => {
      try {
          const file = await gfs.files.findOne({ filename: req.params.filename });

          if ( !file ) {
            throw Error("filename is not correct")
          }
          
          const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
          readStream.on('error', (err) => {
              console.log(err)
          })
        
          readStream.pipe(res)


    } catch (error) {
        res.send(error);
    }
});