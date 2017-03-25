
var check = function(req,res,next){

      // if(!req.session.user)
      //   req.session.user = {
      //       name: 'testname22',
      //       role: 'agency',
      //       uid: '100008',
      //       advertiserid: '100003'
      //   }

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