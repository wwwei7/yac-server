
var userDao = function(name,psw){
    if(name === 'aaa' && psw === '111')
        return true;
    else
        return false;
}

module.exports = userDao;