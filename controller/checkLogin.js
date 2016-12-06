
var check = function(req,res,next){

      return res.send({
        user: {
          name: 'testname40',
          role: 'agency',
          uid: '100008'  
        }
      })

  try{
    // var sid = req.cookies['connect.sid'];
    // var sessionID = sid.slice(2,sid.indexOf('.'));

    if(req.session.user){
      return res.send({
        user: req.session.user
      })
    }else{
      return res.send({
        err: 'illegal access'
      });
    }
  }catch(err){
    return res.send({
      err: 'illegal access'
    });
  }
}

module.exports = check;