var connection = require('../dao/connection');
var co = require("co");

module.exports = function(next){

  co(function* (){
    try{

      var provinceAll = yield new Promise(function(resolve,reject){
        connection.query('SELECT province as label, province_id as value  FROM city where country_id = 1 group by province order by city_id', 
          function(err, rows, fields) {
            if (err) {
              reject(err);
            }
            for(var i in rows){
              rows[i].oid = rows[i].value;
              rows[i].value = String(rows[i].value)              
              rows[i].key = rows[i].value;
            }
            resolve(rows)
          });
      })
      
      var arr = [];
      for(var i in provinceAll){
        var province = provinceAll[i];
        if(!province.label)
          continue;
        var children = yield new Promise(function(resolve,reject){
          connection.query('SELECT city as label, city_id as value FROM city where province_id = '+ province.oid +' and city_id <> 0', 
            function(err, rows, fields) {
              if (err) {              
                reject(err);
              }
              for(var j in rows){
                rows[j].value = String(rows[j].value)
                rows[j].key = rows[j].value;
              }
              resolve(rows)
            });
        })
        province.children = children;
        arr.push(province);
      }

      next(arr);
    
    }catch(err){
      console.log(err)
    }



  }).catch(function(err){
    console.log(err)
  });
};