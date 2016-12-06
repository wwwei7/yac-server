var connection = require('./connection.js');
var advertiser = {};

advertiser.findById = function(id, next){
    connection.query('SELECT * FROM advertiser WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

advertiser.findByUid = function(uid,next){
    connection.query('SELECT * FROM advertiser WHERE user_id='+uid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

advertiser.findInName = function(uid, name , next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM advertiser WHERE user_id='+uid+' AND name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

advertiser.insert = function(values, next){
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
    next("uid doesn't exist");
  }
  connection.query(
    'INSERT INTO advertiser SET ?',
    insertObj,
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

module.exports = advertiser;