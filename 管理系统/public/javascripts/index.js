function logout(){
    if(!confirm("是否确认退出")){
        window.event.returnValue = false;
    }
}

$('.chkItem').click(function () {
    var isCheck = $('.chkItem:not(:checked)').length ? false:true;
    $('#CheckAll').prop("checked",isCheck);

})
//checkbox 全选事件
$('#CheckAll').click(function(){
    var self = $(this);
    $('.chkItem').each(function(){
        $(this).prop("checked",self.is(':checked'));
    });
});

function del(){
    if(!confirm("是否要彻底删除选中项！！！")){
        window.event.returnValue = false;
    }
    $('.chkItem:checked').each(function(){
        var id = $(this).attr('data-id');
        console.log(id);
        var data = { "id": id};
        $.ajax({
            url:'/clearing',
            type:'post',
            data:data,
            success:function(data,status){

            },
            error:function(data,status){

            }
        });
    });location.href = "/";
}
