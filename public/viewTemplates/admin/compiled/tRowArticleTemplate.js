(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tRowArticleTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <td>"
    + alias4(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td class=\"text-right\">\r\n        <button class='btn btn-primary btn-xs selectArticle'>Make primary</button>\r\n        <button class='btn btn-primary btn-xs editArticle'>Edit</button>\r\n        <button class='btn btn-danger btn-xs deleteArticle'>Remove</button>\r\n        <button class='btn btn-success btn-xs showArticle' data-toggle='collapse'\r\n                data-target='#article"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "'><i\r\n                class='fa fa-expand'></i> Expand\r\n        </button>\r\n    </td>\r\n</tr>\r\n<tr class=\"panel\">\r\n    <td colspan='2' class=\"hiddenRow\">\r\n        <div class='collapse panel-collapse container-fluid' id='article"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "'>\r\n            <br/>\r\n            <div class=\"well\">\r\n                "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n            </div>\r\n        </div>\r\n    </td>\r\n</tr>";
},"useData":true});
})();