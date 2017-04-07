
$.fn.loading = function () {
    var spinner = '<i id="spinner" class="fa fa-spinner fa-spin"></i> ';

    var html = $(this).html();
    if ($(this).html().indexOf(spinner) >= 0) {
        $(this).html(html.replace(spinner, ""));
        //Disable button reduce error (could use on '.btn' then we disable every button)
        $(this).removeClass("disabled");
    } else {
        $(this).html(spinner + html);
        //Disable button reduce error
        $(this).addClass("disabled");
    }
};