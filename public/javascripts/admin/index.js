$(function () {
    CKEDITOR.replace('ckeditor');

    //Articles
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
            url: "/api/articles/" + id,
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
        }else{
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

    function clearModal() {
        $("#newEmail").val("");
        $("#newPassword").val("");
        $("#createUserButton").html("Create");
        $("#createUserButton").attr('data-userId', "");
    }

    $("#createUserButton").on('click', function () {
        var email = $("#newEmail").val();
        var password = $("#newPassword").val();
        var id = $(this).attr('data-userId');
        clearModal();
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
