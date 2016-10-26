var connection = require('./connection.js');
var advertiser = {};

advertiser.findByUid = function(uid,next){
    connection.query('SELECT * FROM advertiser where user_id='+uid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

advertiser.insert = function(values, next){
  var user_id = values.user_id,
      name = values.name,
      contacter = values.contacter,
      contact_number = values.contact_number,
      website = values.website,
      landding_white = values.landing_white;
  if(!user_id){
    next("uid doesn't exist");
  }
  connection.query(
    'INSERT INTO advertiser (user_id, name, contacter, contact_number, website, landing_white) VALUES (?,?,?,?,?,?)',
    [user_id, name, contacter, contact_number, website, landding_white],
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

advertiser.findByName = function(name, next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM advertiser where name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

module.exports = advertiser;