(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tRowUserTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-userId=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <td>"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td>"
    + alias4(((helper = (helper = helpers.apikey || (depth0 != null ? depth0.apikey : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"apikey","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td class=\"text-right\">\r\n        <button data-email=\""
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\" class='btn btn-primary btn-xs editUser'>Edit</button>\r\n        <button class='btn btn-danger btn-xs deleteUser'>Remove</button>\r\n    </td>\r\n</tr>";
},"useData":true});
})();