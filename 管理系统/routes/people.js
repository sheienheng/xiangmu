module.exports = function (app) {
    var people = require('../database/db').people;

    app.get('/people', function(req, res) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/login');
        }else {
            res.render('people', {
                title: '添加页面',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
                // pro:doc
            });
        }
    });
    function formatDate(num) {
        return num < 10 ? '0' + num : num;
    }
    app.post('/people',function (req,res) {
        var Name = req.body.Name;
        var Age = req.body.Age;
        var Phone = req.body.Phone;
        var Email = req.body.Email;
        var date = new Date();
        var now = date.getFullYear()+'年'+formatDate(date.getMonth()+1)+'月'+formatDate(date.getDate())+'日'
            +'  '+formatDate(date.getHours())+':'+formatDate(date.getMinutes())+':'+formatDate(date.getSeconds());
        people.findOne({Name: Name}, function (error, doc) {
            if(doc){
                req.flash('error','已经有相同的客户名');
                return res.redirect('/people');
            }else{
                people.create({
                    Pname:req.session.user.name,
                    Name:Name,
                    Age:Age,
                    Phone:Phone,
                    Email:Email,
                    time:now
                }, function (error, doc) {
                    if (error) {
                        req.flash('error','客户名创建失败！');
                        return res.redirect('/people');
                    } else {
                        req.flash('success','客户添加成功');
                        return res.redirect('/');

                    }
                });
            }
        })
    })
}

