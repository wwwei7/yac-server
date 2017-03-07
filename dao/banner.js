var connection = require('./connection.js');
var banner = {};

banner.insert = function(values, next){
    var deleteRows = [];
    var sql = '('
    values.map(function(val){
        deleteRows.push([parseInt(val[7]),val[2],val[3]])
        sql+= '('+val[7]+',"'+val[2]+'","'+val[3]+'"),'
    })
    sql = sql.slice(0,-1)
    sql += ')'
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('DELETE FROM banner WHERE (solutionid, width, height) IN '+sql, 
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

              connection.query('INSERT INTO banner (name, link, width, height, image, memo, advertiserid, solutionid) VALUES ?',
                  [values], 
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
    connection.query('SELECT * FROM banner WHERE ID=' + id, 
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
        'SELECT banner.ID as bannerid, name, advertiserid, solutionid, memo, link, image, width, height, solution_name FROM banner left join solution on banner.solutionid = solution.id where advertiserid = '+ aid, 
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
    connection.query('SELECT * FROM banner WHERE width='+ width +' AND height="'+ height +'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0]);
            next({});
        }
    );
}


banner.update = function(values, next){
  if(!values.id){
    next("sid doesn't exist");
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

module.exports = banner;