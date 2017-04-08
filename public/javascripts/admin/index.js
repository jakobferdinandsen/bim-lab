CKEDITOR.replace('ckeditor');


$(document).on('click', '.showArticle', function () {
    $('.panel-collapse').collapse('hide');
});

$(function () {

    $("#createArticleButton").on('click', function () {
        var header = $("#newHeader").val();
        var body = CKEDITOR.instances['ckeditor'].getData();
        $.ajax({
            method: "POST",
            url: "/api/articles",
            data:{
                header: header,
                body: body
            },
            dataType: "json",
            success: function (data) {
                console.log(data.message);
            },
            error: function () {
                console.log('Wompwomp');
            }
        })
    });

    $(".selectArticle").on('click', function () {
        var id = $(this).parent().parent().attr('data-id');
        $.ajax({
            method: "PUT",
            url: "/api/configs/selectedArticle",
            data:{
                value: id
            },
            dataType: "json",
            success: function (data) {
                console.log(data.message);
            },
            error: function () {
                console.log('Wompwomp');
            }
        })
    });
});