var fs = require("fs");
var formidable = require("formidable");
var path = require('path');
var sizeOf = require('image-size');
var co = require("co");
var OSS = require('ali-oss');
var config = require('../config');

//当前支持的图片尺寸
var sizeList = ['336x280', '300x250', '960x90', '728x90', '250x250', '120x240'];

var upload = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../tmp');  
  form.maxFieldsSize = 1 * 150 * 1024; //150k  
  form.keepExtensions = true;  

  //ali-oss client
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
      return res.status(403).send({msg: '不支持的文件类型！'})
    }

  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    var file = files.file;
    var filePath = file.path;
    var sid = fields.sid;    
    var fileName = 'banner/'+ sid + '/' + file.name;

    var dimensions = sizeOf(filePath);

    var fileSize = dimensions.width + 'x' + dimensions.height;
    if(sizeList.indexOf(fileSize)== -1){
      return res.status(403).send({msg: '当前暂不支持 '+ fileSize+ ' 的图片尺寸！'})
    }    

    co(function* () {
      client.useBucket('yac-material');
      var result = yield client.put(fileName, filePath);;

      //TODO dao

      //删除本地文件
      fs.unlink(filePath)

      return res.send({
        width: dimensions.width,
        height: dimensions.height,
        url: result.url
      })
    }).catch(function (err) {
      console.log(err);
      return res.status(400).send(err)
    });
    
  })
}

module.exports = upload;