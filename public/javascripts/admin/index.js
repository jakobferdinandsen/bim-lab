$(function () {
    CKEDITOR.replace('ckeditor');

    $(document).on('click', '.showArticle', function () {
        $('.panel-collapse').collapse('hide');
    });

    $("#createArticleButton").on('click', function () {
        var header = $("#newHeader").val();
        var body = CKEDITOR.instances['ckeditor'].getData();
        $.ajax({
            method: "POST",
            url: "/api/articles",
            data: {
                header: header,
                body: body
            },
            dataType: "json",
            success: function (article) {
                addArticle(article);
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    });

    $(document).on('click', ".selectArticle", function () {
        var id = $(this).parent().parent().attr('data-id');
        $.ajax({
            method: "PUT",
            url: "/api/configs/selectedArticle",
            data: {
                value: id
            },
            dataType: "json",
            success: function (config) {
                changeSelected(config.value);
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    });

    $(document).on('click', ".deleteArticle", function () {
        var id = $(this).parent().parent().attr('data-id');
        $.ajax({
            method: "DELETE",
            url: "/api/articles/"+id,
            data: {
                value: id
            },
            dataType: "json",
            success: function (article) {
                removeArticle(article);
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    });

    function addArticle(article) {
        $("#articleTableBody").append(Handlebars.templates.tRowArticleTemplate(article));
    }

    function changeSelected(newSelectedId) {
        var oldId = $("#selectedRow").children('tr').attr('data-id');
        $.ajax({
            method: "GET",
            url: "/api/articles/" + oldId,
            dataType: "json",
            success: function (oldArticle) {
                $.ajax({
                    method: "GET",
                    url: "/api/articles/" + newSelectedId,
                    dataType: "json",
                    success: function (newArticle) {
                        removeArticle(newArticle);
                        addArticle(oldArticle);
                        $("#selectedRow").html(Handlebars.templates.tRowSelectedArticleTemplate(newArticle));
                    },
                    error: function () {
                        console.log('Wompwomp');
                    }
                })
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    }

    function removeArticle(article) {
        var tr = $("tr[data-id='" + article._id + "']");
        tr.next('tr').remove();
        tr.remove();
    }
});
