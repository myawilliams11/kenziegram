const express = require('express');
const fs = require ('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
const port = 3000;
const app = express();
const uploaded_files = [];


app.use(express.static('public'));
app.use(express.static('public/uploads/'));

app.get('/', (req, res) => {
    const path = './public/uploads';
    fs.readdir(path, function(err,items) {
        console.log(items);
        let html= `
            <style>
            </style>
            <h1>Welcome to Kenziegram!</h1>
            <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
            <div>
              <label for="file">Choose a File</label>
              <!-- <input type="file" id="file" name="myFile"> -->
              <input type="file" id="file" name="myFile">
              
              
            </div>
            <div>
              <button>Send the file</button>
            </div>
          </form>

            
        `;
        // the href takes to upload page
        for (i=0; i<items.length; i++){
            html+= `<img src="${items[i]}" width=300px height=300px>`;
            
        }
        res.send(html);
    });
});


app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.send('<a href="/">Upload Form</a>');
    // res.setHeader("Location", "http://localhost:3000/home")
  })


  


app.listen(port);