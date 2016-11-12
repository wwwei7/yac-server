var connection = require('./connection.js');
var solution = {};

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
  var advertiser_id = values.advertiser_id,
      solution_name = values.solution_name,
      region_type = values.region_type,
      region_value = values.region_value,
      adx = values.adx,
      media = values.media,
      start_date = values.start,
      end_date = values.end,
      budget = values.budget,
      price = values.price;      
  if(!advertiser_id){
    next("aid doesn't exist");
  }
  connection.query(
    'INSERT INTO solution (advertiser_id, solution_name, region_type, region_value, adx, media, start_date, end_date, budget, price) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [advertiser_id, solution_name, region_type, region_value, adx, media, start_date, end_date, budget, price],
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

module.exports = solution;