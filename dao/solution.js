var connection = require('./connection.js');
var solution = {};

solution.findById = function(id, next){
    connection.query('SELECT * FROM solution WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
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
  var advertiser_id = values.advertiser_id,
      solution_name = values.solution_name,
      region = values.region,
      adx = values.adx,
      media = values.media,
      start_time = values.start_time,
      end_time = values.end_time,
      budget = values.budget,
      price = values.price;      
  if(!advertiser_id){
    next("aid doesn't exist");
  }
  connection.query(
    'INSERT INTO solution (advertiser_id, solution_name, region, adx, media, start_time, end_time, budget, price) VALUES (?,?,?,?,?,?,?,?,?)',
    [advertiser_id, solution_name, region, adx, media, start_time, end_time, budget, price],
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

module.exports = solution;