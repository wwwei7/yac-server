$(function(){
    var loginData = {};

    var loginBtn = $('#loginBtn');

    loginBtn.on('click',function(e){
        loginData.username = $('#username').val();
        loginData.password = $('#password').val();

        if($.trim(loginData) == '')
            e.preventDefault();
    })
})