var Dao = require('../dao/banner');

var handler = {
  insert: function(req, res, next){
    var data = req.body;
    Dao.insert(data, next);
  },
  findByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.findByAid(aid, next);
  },
  findVideoBySid: function(req, res, next){
    var sid = req.params.sid;
    Dao.findVideoBySid(sid, function(data){
      var arr = [];
      var videoAll = {
        '480P': {pixel: '480P', name: '480P', width: '720', height: '480', url: '', clickUrl: ''},
        '720P': {pixel: '720P', name: '720P', width: '1280', height: '720', url: '', clickUrl: ''},
        '1080P': {pixel: '1080P', name: '1080P', width: '1920', height: '1080', url: '', clickUrl: ''},
        '4K': {pixel: '4K', name: '4K', width: '3840', height: '2160', url: '', clickUrl: ''}
      }
      data.map(function(video){
        var pixel = video.height == '2140' ? '4K' : video.height + 'P';        
        var videoObj = videoAll[pixel];
        videoObj.name = video.name || '';
        videoObj.url = video.image;
        videoObj.clickUrl = video.link || '';
      })
      for(var pixel in videoAll){
        arr.push(videoAll[pixel])
      }
      next(arr);
    });
  }
}

module.exports = handler;