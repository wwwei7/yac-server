var connection = require('../connection.js');
var banner = {};

var setSearch = function(sql,data){
    var where = true;
    for(var i in data){
        if(!data[i]) continue 
        if(where){
            sql += ` WHERE b.${i} = ${data[i]}`
            where = false
        }else{
            sql += ` AND b.${i} = ${data[i]}`
        } 
    }
    sql += ` ORDER BY id DESC`
    return sql
}
var setUpdata = function(data){
    var newdata={};
    for(var i in data){
        if(i!='id'){
            newdata[i]=data[i]
        }
    }
    return newdata
}

banner.findList = function(data, next){
    var sql = `SELECT b.id, b.dspid, b.advertiserid, b.adtype, b.category, b.banner_url, b.banner_link, b.banner_title, b.banner_desc, b.status, b.audit_info, b.operatetime, b.banner_video, b.banner_duration, b.createtime, b.width, b.height, i.ic_name AS category_type
       FROM banner_yax b LEFT JOIN industry_category i ON b.category = i.ic_id`
    sql = setSearch(sql,data)
    connection.query(sql,
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}


banner.upStatus = function(values, next){
    if(!values.id){
        next("id doesn't exist");
    }
    var newValues = setUpdata(values);
    connection.query(
        `UPDATE banner_yax SET ? WHERE id IN (${values.id})`, 
        [newValues],
        function(err, result){
        if(err) {
            next('upStatus failed')
            console.log(err.stack);
            throw err;
        }
        next({
            success: true,
            id: values.id,
            status: values.status
        });
    });
}


module.exports = banner;