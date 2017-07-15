var connection = require('../connection.js');
var md5 = require('md5')
var publisher = {};

publisher.findById = function(id, next){
    if(!id){
        return next({});
    }
    connection.query('SELECT * FROM publisher WHERE id=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

publisher.findList = function(uid,next){
    connection.query('SELECT * FROM publisher WHERE ssp_id='+uid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

publisher.findNameByPublisher = function(uid, name , next){
    var i, row, adlist = [];
    connection.query('SELECT * FROM publisher WHERE ssp_id='+uid+' AND name="'+name+'"', 
        function(err, rows, fields) {
            if (err) throw err;
            if(rows.length>0)
                return next(rows[0])
            next({});
        }
    );
}

publisher.insert = function(values, next){

  if(!values.ssp_id || !values.apppkg){
    return next({
        err: 1,
        errMsg: 'Not enough for required fields'
    });
  }
  var appKey = md5(values.apppkg + '@y0urAdC!oud#');
  var insertObj = {
    ssp_id: values.ssp_id,
    name: values.name,
    contacter: values.contacter,
    contact_number: values.contact_number,
    website: values.website,
    industry: values.industry,
    apppkg: values.apppkg,
    appKey: appKey
  }

  connection.query(
    'INSERT INTO publisher SET ?',
    insertObj,
    function(err, result){
      if(err) {
          next({
              err: 1,
              errMsg: '创建失败'
          })
          console.log(err.stack);
          throw err;
      }
      next({
          ok: 1
      });
    }
  );
}

publisher.update = function(id, values, next){
  if(!id){
    next("publisherid doesn't exist");
  }
  connection.query(
    'UPDATE publisher SET ? WHERE id = ?', 
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

module.exports = publisher;