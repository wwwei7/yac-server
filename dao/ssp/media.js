var connection = require('../connection.js');
var media = {};

media.findById = function(id, next){
    if(!id){
        return next({});
    }
    connection.query('SELECT * FROM media WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

media.findList = function(uid,next){
    connection.query('SELECT * FROM media WHERE user_id='+uid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

media.findInName = function(uid, name , next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM media WHERE user_id='+uid+' AND name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

media.insert = function(values, next){
  var insertObj = {
    user_id: values.user_id,
    name: values.name,
    contacter: values.contacter,
    contact_number: values.contact_number,
    website: values.website,
    landing_white: values.landing_white,
    industry: values.industry
  }
  if(!insertObj.user_id){
    return next("uid doesn't exist");
  }
  connection.query(
    'INSERT INTO media SET ?',
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

media.update = function(id, values, next){
  if(!id){
    next("mediaid doesn't exist");
  }
  connection.query(
    'UPDATE media SET ? WHERE id = ?', 
    [values, id],
    function(err, result){
      if(err) {
        next('insert failed')
        console.log(err.stack);
        throw err;
      }
      next('success');
    });
}  

module.exports = media;