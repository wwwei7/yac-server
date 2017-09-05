var connection = require('../connection.js');

exports.findById = function(id, next){
    if(!id){
        return next({});
    }
    connection.query('SELECT * FROM dsp_inject_yax WHERE dspid=' + id, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}

exports.update = function(values, next){
  if(!values){
    return next({err:'dsp not exist'});
  }
  connection.query(
    'UPDATE dsp_inject_yax SET ? WHERE dspid = ?', 
    [values, values.dspid],
    function(err, result){
      if(err) {
        next('update failed')
        console.log(err.stack);
        throw err;
      }
      next({
          success: true,
          id: values.id
      });
    });

  }