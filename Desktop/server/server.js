const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const cors = require('cors');
const mysql = require("mysql");
const MySQLStore = require('express-mysql-session')(session);

const db = mysql.createPool({
    host: "127.0.0.1",  // 数据库的IP
    user: "root",  // 登录数据库的账号
    port: "3310",   // 设置端口号，如果设置了自定义端口号就需要在这里更改
    password: "123456",  // 登录数据库的密码
    database: "carno",   // 指定要操作的数据库
});

// express-mysql-session配置（自动写入cookie数据）
let sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: false,	//是否创建表
    schema: {
        tableName: 'login_session',	//表名
        columnNames: {		//列选项
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// 自定义cors中间件设置
app.use(function (req, res, next) {
    // res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Method", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", 'content-type');
    next();
})

// session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false, maxAge: 100000000 },
    name: 'ivan',
}));

// 测试接口1
app.all('/api/test', (req, res) => {
    const session = req.session  // 获得session
    if (!session.time) {
        session.time = new Date();
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.send(session.time);
})
// 测试接口2
app.all('/api/testVue', (req, res) => {
    const session = req.session  // 获得session
    if (!session.time) {
        session.time = new Date();
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.send(session.time);
})

// 判断是否初次登录校验cookie
app.get("/api/islogin", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    if (!req.session.user) {
        res.send({ loginCode: 2, msg: '验证过期' });
    } else {
        res.send({ loginCode: 1, msg: '验证成功' })
    }
});
// 登录路由
app.options("/api/login", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    res.send("preflight is correct");
});

app.post("/api/login", (req, res) => {
    const usermsg = req.body;
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    db.query("SELECT username,userpwd FROM carno.user_msg;", (err, results) => {
        if (err) return console.log("Error：" + err.message);
        // foreach和some方法
        const isLogin = results.some(ele => {
            return ele.username == usermsg.username && ele.userpwd == usermsg.userpwd;
        });
        if (!isLogin) {
            res.send({ loginCode: 0, msg: '验证失败' });
        } else {
            const session = req.session;
            session.user = usermsg;
            res.send({ loginCode: 1, msg: '验证成功', username: usermsg.username });
        }
    });
});

// 注册路由(动态用户名验证)
app.options("/api/registersearch", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    res.send("preflight is correct");
});

app.post("/api/registersearch", (req, res) => {
    const usermsg = req.body;
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    db.query(`select count(*) from carno.user_msg where username='${usermsg.username}';`, (err, results) => {
        if (err) {
            console.log("Error：" + err.message);
        };
        if (results[0]['count(*)'] == 1) res.send({ regisCode: 0, msg: '该用户名已被注册' });
        else res.send({ regisCode: 1, msg: '该用户名可以注册' });
    });
});

// 注册路由（点击）
app.options("/api/register", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    res.send("preflight is correct");
});

app.post("/api/register", (req, res) => {
    const usermsg = req.body;
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    db.query(`INSERT INTO carno.user_msg (username,userpwd,usertime) VALUES ('${usermsg.username}','${usermsg.userpwd}','${usermsg.usertime}') ;`, (err, results) => {
        if (err) {
            console.log("Error：" + err.message);
            if (err.code == 'ER_DUP_ENTRY') res.send({ regisCode: 0, msg: '该用户名已被注册' }); return;
        };
        if (results.affectedRows == 1) res.send({ regisCode: 2, msg: '注册成功' }); return;
    });
});

//用户退出登录
app.get("/api/clearuser", (req, res) => {
    req.session.destroy();
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    res.send({ code: 00, msg: '删除成功' });
})

// 获取用户信息
app.get("/api/getuserlist", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    db.query('SELECT username,usertime FROM carno.user_msg;', (err, results) => {
        if (err) {
            console.log("Error：" + err.message);
            return;
        };
        res.send(JSON.stringify(results))
    });
    
})

// 静态托管
app.use('/vuetest', express.static('vuetest'));
app.listen(8001, () => {
    console.log("port 8001 is listening...")
})

// 错误中间件
app.use(function (err, req, res, next) {
    console.log('服务器发生了错误！');
    res.send(err.message);
})

