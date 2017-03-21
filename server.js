var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cloudinary = require('cloudinary');
var path = require('path');

var app = express();
var upload = multer({ dest: 'uploads/' })

const uuidV4 = require('uuid/v4');
var cloud_name = 'dhdze0irb';

cloudinary.config({
  cloud_name: cloud_name,
  api_key: '482385852363446',
  api_secret: 'EJq_0z3xMsJ-fXTRd7Rk1voF3X8'
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on port %s", port);
});

app.get("/list", function(request, response) {
  console.log('Listing images...');
  cloudinary.api.resources(function(result){response.send(result)},{ type: 'upload', 'max_results': 500});
});

app.post("/upload", upload.single('file0'), function(request, response) {
  console.log('Uploading...');
  console.log(request.file);
  cloudinary.uploader.upload(
    request.file.path,
    function(result) {
      setTimeout(function() {
        response.send(result);
      },1000);
    },
    { 'public_id': uuidV4() }
  );
});

app.post("/upload_url", function(request, response) {
  console.log('Grabbing image from URL and uploading');
  console.log(request.body.imageURL);
  cloudinary.uploader.upload(
    request.body.imageURL,
    function(result) {
      setTimeout(function() {
        response.send(result);
      },1000);
    },
    { 'public_id': uuidV4() }
  );
});

app.post("/delete", function(request, response) {
  console.log('Deleting ' + request.body.img + '...');
  cloudinary.uploader.destroy(request.body.img, function(result) { response.send(result) });
});
