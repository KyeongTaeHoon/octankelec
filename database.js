var mysql = require('mysql');
var db_info = {
    host: 'taehoon-aurora-poc.cluster-cct6axswzdpb.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Kk11596714*',
    database: 'octank_poc'
}


module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
