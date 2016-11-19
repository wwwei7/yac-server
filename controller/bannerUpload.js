var fs = require("fs");
var formidable = require("formidable");
var path = require('path');
var sizeOf = require('image-size');

var co = require("co");
var OSS = require('ali-oss');
var config = require('../config');


var upload = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../tmp');  
  form.maxFieldsSize = 1 * 150 * 1024; //150k  
  form.keepExtensions = true;  


  var client = new OSS(config.oss);

  form.on('fileBegin', function(name, file) {
    console.log(file)
    var extName = '';

    switch (file.type) {
      case 'image/gif':
        extName = 'gif';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(!extName){
      return res.status(400).send({err: '不支持的文件类型！'})
    }

  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    var file = files.file;
    var filePath = file.path;
    var fileName = file.name;


    var dimensions = sizeOf(filePath);    

    co(function* () {
      client.useBucket('yac-material');
      var result = yield client.put(fileName, filePath);
      console.log(result);

      //TODO dao
    }).catch(function (err) {
      console.log(err);
    });
    res.send({
      url: `http://yac-material.oss-cn-qingdao.aliyuncs.com/${fileName}`
    })
  })
}

module.exports = upload;