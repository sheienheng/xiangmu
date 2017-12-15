module.exports = function (app) {
    var people = require('../database/db').people;

    app.get('/edit/:id', function(req, res) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/login');
        }else {
            people.find({"_id":req.params.id},function (error, doc) {
                console.log(doc);
                res.render('edit', {
                    title: '主页页面',
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString(),
                    doc:doc
                });
            });
        }
    });
    function formatDate(num) {
        return num < 10 ? '0' + num : num;
    }
    app.post('/edit/:Name',function (req,res) {
        var date = new Date();
        var now = date.getFullYear()+'年'+formatDate(date.getMonth()+1)+'月'+formatDate(date.getDate())+'日'
            +'  '+formatDate(date.getHours())+':'+formatDate(date.getMinutes())+':'+formatDate(date.getSeconds());
        var Age = req.body.Age;
        var Phone = req.body.Phone;
        var Email = req.body.Email;
            people.update({Name: req.params.Name},{
                Pname:req.session.user.name,
                Age:Age,
                Phone:Phone,
                Email:Email,
                time:now
            },{upsert:true,multi: true},function (error, doc) {
                if (error) {
                    req.flash('error','客户信息更新失败！');
                    return res.redirect('back');
                } else {
                    req.flash('success','客户信息更新成功');
                    return res.redirect('/');
                }
            });


    })
}

