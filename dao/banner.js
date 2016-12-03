var connection = require('./connection.js');
var banner = {};

banner.insert = function(insertObj,next){
    connection.query('INSERT INTO banner SET ?',
        insertObj,
        function(err, rows, fields){
            if (err) {
                next(err);                
                throw err;
            }
            next({
                data: {
                    id: rows.insertId
                },
                msg: 'success',
                status: 200
            });
        })
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
    connection.query('SELECT * FROM banner WHERE width='+width+' AND height="'+height+'"', 
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