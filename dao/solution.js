var connection = require('./connection.js');
var solution = {};
var Moment = require('moment');

solution.findById = function(id, next){
    connection.query('SELECT * FROM solution WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

solution.findByAid = function(aid,next){
    connection.query('SELECT * FROM solution WHERE advertiser_id='+ aid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

solution.findInName = function(aid, name , next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM solution WHERE advertiser_id='+aid+' AND solution_name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

solution.insert = function(values, next){
  
  connection.query(
    'INSERT INTO solution SET ?',
    values,
    function(err, result){
      if(err) {
          next('insert failed')
          console.log(err.stack);
          throw err;
      }
      next('success');
    }
  );
} 


solution.update = function(values, next){
  if(!values.id){
    next("sid doesn't exist");
  }
  connection.query(
    'UPDATE solution SET ? WHERE id = ?', 
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

solution.pause = function(values, id, next){

  connection.query(
    'UPDATE solution SET ? WHERE id = ?', 
    [values, id],
    function(err, result){
      if(err) {
        console.log(err.stack);
        throw err;
      }
      next(result);
    });
} 

module.exports = solution;