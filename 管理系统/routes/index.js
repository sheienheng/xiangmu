module.exports = function (app) {
    var people = require('../database/db').people;
    var bool = false;
    var boolA;
    var lastA = 1;
    //首页
    app.get('/', function(req, res) {
        var page = parseInt(req.query.page) || 1;
        var a = req.query.a;
        if(!a){
            a = -1;
            boolA = false;
        }else {
            boolA = true;
        }
        if(lastA != a){
            bool = !bool;
        }
        lastA = a;
        people.count({},function (err,total) {
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            people.find({}).skip((page - 1)*6).limit(6).sort({time:a}).exec(function (error, doc) {
                res.render('index', {
                    title: '主页页面',
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString(),
                    doc:doc,
                    page:page,
                    bool:bool,
                    boolA:boolA,
                    isFirstPage:(page - 1)*6 == 0,
                    isLastPage:(page - 1)*6 + doc.length == total,
                    length:total
                });
            });
        })

    });
    //退出
    app.get('/logout',function (req, res) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/login');
        }else {
            req.session.user = null;
            req.flash('success','退出成功');
            return res.redirect('/');
        }

    })
    app.get('/remove/:id',function (req,res) {
        people.remove({"_id":req.params.id},function(err,doc){
            if(doc){
                req.flash('success','删除成功');
                res.redirect('/');
            }
        });
    })
    var lastNew;
    app.get('/search',function (req,res) {
        var newRegex = new RegExp(req.query.keyword,'i');

        people.find({Name:newRegex}).sort({time:-1}).exec(function (error, doc) {
            res.render('search', {
                title: '搜索页面',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                doc:doc
            });
        });
    })
    app.post('/clearing',function (req,res) {
        console.log(req.body.id);
        people.remove({"_id":req.body.id},function(err,doc){
            if(doc){
                req.flash('success','删除成功');
                res.redirect('/');
            }
        });
    })

}

