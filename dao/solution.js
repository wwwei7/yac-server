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

solution.findListWithCost = function(aid,next){
    const sql = `SELECT SUM(l.money) as money,SUM(l.service_charge) as service, SUM(l.shows) as shows,SUM(l.click) as click, s.id, s.solution_name ,s.start_date , s.end_date ,s.budget  ,s.status ,s.disabled 
        FROM solution s LEFT JOIN log_hour l on s.id = l.solutionid and l.date = CURRENT_DATE
        WHERE s.advertiser_id  = '${aid}' GROUP BY s.id`;
    connection.query(sql, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

solution.findByType = function(aid, type, next){
    connection.query('SELECT * FROM solution WHERE advertiser_id='+ aid +' AND solution_type=' + type, 
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
          next({err: 'insert failed'})
          console.log(err.stack);
          throw err;
      }
      next({
          success: true,
          sid: parseInt(result.insertId),
          sname: values.solution_name
      });
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
      next({
          success: true,
          sid: values.id,
          sname: values.solution_name
      });
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