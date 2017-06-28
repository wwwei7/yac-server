var connection = require('./connection.js');
var banner = {};

banner.insert = function(values, next){
    var image = values.image || [];
    var video = values.video || [];    
    var sql = '('
    image.map(function(val){
        sql+= '('+val[7]+',"'+val[2]+'","'+val[3]+'"),'
    })
    video.map(function(val){
        sql+= '('+val[7]+',"'+val[2]+'","'+val[3]+'"),'
    })
    video = video.filter(function(video){
        if(video[4])
            return true;
    })
    sql = sql.slice(0,-1)
    sql += ')'
    
    var insertValue = image.concat(video)
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      //图片
      connection.query('update banner set deleteflag=1 WHERE (solutionid, width, height) IN '+sql, 
          function(err, result) {
              if (err) { 
                  connection.rollback(function() {
                      throw err;
                  });
                  next({
                    msg: err,
                    status: 500
                  })
                  return;
              }

              if(insertValue.length<1){
                connection.commit(function(err) {
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    next({
                        msg: 'success',
                        status: 200
                    })
                    return;
                });
                return;
              }

              connection.query('INSERT INTO banner (name, link, width, height, image, memo, advertiserid, solutionid, creativetype) VALUES ?',
                  [insertValue], 
                  function(err, result) {
                      if (err) { 
                          connection.rollback(function() {
                              throw err;
                          });
                          next({
                            msg: err,
                            status: 500
                          })
                          return;
                      }  
                      connection.commit(function(err) {
                          if (err) { 
                              connection.rollback(function() {
                                  throw err;
                              });
                          }
                          next({
                            msg: 'success',
                            status: 200
                          })
                      });
              });
          });
    });
}

banner.findById = function(id, next){
    connection.query('SELECT * FROM banner WHERE ID=' + id +' AND deleteflag=0', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

banner.findByAid = function(aid,next){
    connection.query(
        'SELECT banner.ID as bannerid, name, advertiserid, solutionid, memo, link, image, width, height, solution_name FROM banner left join solution on banner.solutionid = solution.id where advertiserid = '+ aid +' AND deleteflag=0', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.findInSize = function(width, height , next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM banner WHERE width='+ width +' AND height="'+ height +'" AND deleteflag=0', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0]);
            next({});
        }
    );
}

banner.findVideoBySid = function(sid, next){
    connection.query('SELECT * FROM banner WHERE creativetype="video" AND solutionid="'+ sid +'" AND deleteflag=0', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows);
            next([]);
        }
    );
}


banner.update = function(values, next){
  if(!values.id){
    return next("sid doesn't exist");
  }
  connection.query(
    'UPDATE banner SET ? WHERE id = ?', 
    [values, values.id],
    function(err, result){
      if(err) {
        next('insert failed')
        console.log(err.stack);
        throw err;
      }
      next('success');
    });
} 

banner.delete = function(id, next){
  if(!id){
    return next({
        err: 'id empty'
    });
  }
  connection.query(
    'UPDATE banner SET deleteflag="1" WHERE id ="'+id+'"', 
    function(err, result){
      if(err) {
        next({
            err: err
        })
        console.log(err.stack);
        throw err;
      }
      next({
          deleteSuccess: 1,
          bannerid: id
      });
    });
}

module.exports = banner;