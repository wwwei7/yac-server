var connection = require('../connection.js');
var adspace = {};
var Moment = require('moment');

adspace.findById = function(id, next){
    connection.query('SELECT * FROM adspace WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

adspace.findNameByPublisher = function(pid, name , next){
    connection.query('SELECT * FROM adspace WHERE publisherid='+pid+' AND name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

adspace.getList = function(publisherID,next){
    connection.query('SELECT * FROM adspace WHERE publisherid='+ publisherID, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}


adspace.insert = function(values, next){
  
  connection.query(
    'INSERT INTO adspace SET ?',
    values,
    function(err, result){
      if(err) {
          next({err: 'insert failed'})
          console.log(err.stack);
          throw err;
      }
      next({
          success: true,
          id: parseInt(result.insertId),
          sname: values.adspace_name
      });
    }
  );
} 


adspace.update = function(id, values, next){
  if(!id){
    next({err: "id doesn't exist"});
  }
  connection.query(
    'UPDATE adspace SET ? WHERE id = ?', 
    [values, id],
    function(err, result){
      if(err) {
        next('insert failed')
        console.log(err.stack);
        throw err;
      }
      next({
          success: true,
          adsid: values.id,
          name: values.name
      });
    });
} 


module.exports = adspace;