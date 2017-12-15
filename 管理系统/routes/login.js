module.exports = function (app) {
    var user = require('../database/db').user;
    app.get('/login', function(req, res) {

        res.render('login', {
            title: '登录页面',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });

    });
    app.post('/login', function(req, res) {
        var name = req.body.name;
        var password = req.body.password;
        user.findOne({name: name}, function (error, doc) {
            if (!doc) {
                req.flash('error','用户名bu存在');
                return res.redirect('/login');
            } else {
                if(password == doc.password){
                    req.session.user = doc;
                    req.flash('success','登陆成功');
                    return res.redirect('/');
                }else{
                    req.flash('error','密码错误！');
                    return res.redirect('/login');

                }
            }
        });

    });

}

