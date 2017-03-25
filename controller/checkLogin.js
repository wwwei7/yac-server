
var check = function(req,res,next){

      // if(!req.session.user)
      //   req.session.user = {
      //       name: '广州优效',
      //       role: 'agency',
      //       uid: '100004',
      //       advertiserid: ''
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
    return res.redirect('/');
  }
}

module.exports = check;