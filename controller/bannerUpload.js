var fs = require("fs");
var formidable = require("formidable");
var path = require('path');
var sizeOf = require('image-size');
var co = require("co");
var OSS = require('ali-oss');
var config = require('../config');
var dao = require('../dao/banner');
var randomstring = require("randomstring");

var solutionType = {
  "1": 'pc',
  "2": 'mobile',
  "3": 'ott'
}

//当前支持的图片尺寸
var surpportSize = {
  "pc": ['336x280', '320x50', '300x250', '960x90', '728x90', '250x250', '120x240'],
  "mobile": [],
  "ott": ['800x600', '1024x768', '1152x864', '1400x1050', '1600x1200', '2048x1536', '3200x2400', '960x540', '1280x720', '1366x768', '1920x1080', '2560x1440', '3840x2160']
}
var pcSizeList = ['336x280', '320x50', '300x250', '960x90', '728x90', '250x250', '120x240'];

var upload = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../tmp');  
  form.maxFieldsSize = 1 * 1024 * 1024; //150k  
  form.keepExtensions = true;  
  form.multiples = true;

  //ali-oss client
  var client = new OSS(config.oss);
  var extName = '';

  form.on('fileBegin', function(name, file) {
    console.log(file)

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
    var stype = solutionType[fields.stype];
    var fileName = config.ossFileLocation + sid + '/' + stype + '/' + randomstring.generate(12) + '.' + extName;

    var dimensions = sizeOf(filePath);
    var sizeList = surpportSize[stype];

    var dimension = dimensions.width + 'x' + dimensions.height;
    if(sizeList.indexOf(dimension)== -1){
      return res.send({
        status: 'fail',
        dimension: dimension,
        msg: '当前暂不支持 '+ dimension+ ' 的图片尺寸！'
      })
      
    }

    // 检查是否存在改尺寸图片
    var updateFlag;  

    co(function* () {
      client.useBucket('yac-material');
      var result = yield client.put(fileName, filePath);

      //删除本地文件
      fs.unlink(filePath)

      return res.send({
        status: 'success',
        name: file.name.replace(extName,'').slice(0,-1),
        width: dimensions.width,
        height: dimensions.height,
        dimension: dimension,
        url: result.url.replace('yac-material.oss-cn-qingdao.aliyuncs.com','mt.youradcloud.com')
      })
    }).catch(function (err) {
      // console.log(err);
      return res.send({
        status: 'error',
        err: err,
        dimension: dimension
      })
    });
    
  })
}

module.exports = upload;