var connection = require('./connection.js');
var industry = {};

industry.find = function(next){
    connection.query('SELECT * FROM industry_category', 
        function(err, rows, fields) {
            if (err) {
                next(err);
                throw err;
            }
            var fobjs = [], fids=[], row;
            for(var i in rows){
              var fobj={};
              row = rows[i];
              if(fids.indexOf(row.icf_id)>-1){
                continue;
              }
              fids.push(row.icf_id);
              fobj.value = row.icf_id;
              fobj.label = row.icf_name;
              fobj.children = [];
              for(var j in rows){
                var child = {}, childRow = rows[j];
                if(childRow.icf_id == fobj.value){
                  child.value = childRow.ic_id;
                  child.label = childRow.ic_name;
                  fobj.children.push(child)
                }
              }
              fobjs.push(fobj);
            }
            
            next(fobjs);
        }
    );
}

module.exports = industry;