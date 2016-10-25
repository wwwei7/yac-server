var logout = function(req,res){
  req.session.destroy();
  return res.redirect('/app');
}

module.exports = logout;