$(function () {
    CKEDITOR.replace('ckeditor');

    //Articles
    $(document).on('click', '.showArticle', function () {
        $('.panel-collapse').collapse('hide');
    });

    $(document).on('click', ".editArticle", function () {
        var articleId = $(this).closest('tr').attr('data-id');
        var header = jQuery($(this).parent().parent().children()[0]).text();
        var body = $(this).closest('tr').next('tr').find('div.well').html();
        $("#newHeader").val(header);
        CKEDITOR.instances['ckeditor'].setData(body);
        $("#createArticleButton").html("Update");
        $("#createArticleButton").attr('data-articleId', articleId);
        $("#createNewArticle").modal();
    });

    function clearArticleModal() {
        $("#newHeader").val("");
        CKEDITOR.instances['ckeditor'].setData("");
        $("#createArticleButton").html("Create");
        $("#createArticleButton").attr('data-articleId', "");
        $("#newImage").val("");
    }

    $("#createArticleButton").on('click', function () {
        var header = $("#newHeader").val();
        var body = CKEDITOR.instances['ckeditor'].getData();
        var id = $(this).attr('data-articleId');
        var method = "POST";
        var url = "/api/articles";
        if (id !== "") {
            method = "PUT";
            url = "/api/articles/" + id;
        }
        var fileInput = $("#newImage");
        if (fileInput[0].files && fileInput[0].files[0]) {
            var fr = new FileReader();
            fr.addEventListener("load", function (e) {
                var img = e.target.result;
                $.ajax({
                    method: method,
                    url: url,
                    data: {
                        header: header,
                        body: body,
                        img: img
                    },
                    success: function (article) {
                        if (id !== "") {
                            removeArticle(article);
                        }
                        addArticle(article);
                        clearArticleModal();
                    },
                    error: function () {
                        console.log('Wompwomp');
                    }
                });
            });
            fr.readAsDataURL(fileInput[0].files[0]);
        }else{
            $.ajax({
                method: method,
                url: url,
                data: {
                    header: header,
                    body: body
                },
                success: function (article) {
                    if (id !== "") {
                        removeArticle(article);
                    }
                    addArticle(article);
                    clearArticleModal();
                },
                error: function () {
                    console.log('Wompwomp');
                }
            });
        }
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
            url: "/api/articles/" + id,
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
        if (oldId !== undefined) {
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
                    });
                },
                error: function () {
                    console.log('Wompwomp');
                }
            });
        } else {
            $.ajax({
                method: "GET",
                url: "/api/articles/" + newSelectedId,
                dataType: "json",
                success: function (newArticle) {
                    removeArticle(newArticle);
                    $("#selectedRow").html(Handlebars.templates.tRowSelectedArticleTemplate(newArticle));
                },
                error: function () {
                    console.log('Wompwomp');
                }
            });
        }
    }

    function removeArticle(article) {
        var tr = $("tr[data-id='" + article._id + "']");
        tr.next('tr').remove();
        tr.remove();
    }

    //Users
    $("button[data-target='#createNewUser']").on('click', function () {
        clearUserModal();
    });

    $(document).on('click', ".editUser", function () {
        var userId = $(this).closest('tr').attr('data-userId');
        var email = $(this).attr('data-email');
        $("#newEmail").val(email);
        $("#createUserButton").html("Update");
        $("#createUserButton").attr('data-userId', userId);
        $("#createNewUser").modal();
    });

    $(document).on('click', ".deleteUser", function () {
        var userId = $(this).closest('tr').attr('data-userId');
        var email = $(this).attr('data-email');
        $.ajax({
            method: "DELETE",
            url: "/api/users/" + userId,
            dataType: "json",
            success: function (user) {
                removeUser(user);
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    });

    function clearUserModal() {
        $("#newEmail").val("");
        $("#newPassword").val("");
        $("#createUserButton").html("Create");
        $("#createUserButton").attr('data-userId', "");
    }

    $("#createUserButton").on('click', function () {
        var email = $("#newEmail").val();
        var password = $("#newPassword").val();
        var id = $(this).attr('data-userId');
        clearUserModal();
        var method = "POST";
        var url = "/api/users";
        if (id !== "") {
            method = "PUT";
            url = "/api/users/" + id;
        }
        $.ajax({
            method: method,
            url: url,
            data: {
                email: email,
                password: password
            },
            success: function (user) {
                if (id !== "") {
                    removeUser(user);
                }
                addUser(user);
            },
            error: function () {
                console.log('Wompwomp');
            }
        });
    });

    function addUser(user) {
        $("#userTableBody").append(Handlebars.templates.tRowUserTemplate(user));
    }

    function removeUser(user) {
        $("tr[data-userId='" + user._id + "']").remove();
    }


});
