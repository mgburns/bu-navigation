(function(d){d(function(){function f(a){var b={ignore:!0};d.ajax({url:ajaxurl,type:"POST",data:{action:"check_hidden_page",post_id:a},async:!1,success:function(a){b=JSON.parse(a)}});return b}function g(a,b){if(!a.ignore){var c=a.msg,c=c+("\n\nAre you sure you want to delete "+(b?"these "+bu_navigation_pt_labels.plural.toLowerCase():"this "+bu_navigation_pt_labels.singular.toLowerCase())+"?");if(!window.confirm(c))return!1}return!0}d("a.submitdelete").live("click",function(){var a="undefined"!=typeof inlineEditPost?
inlineEditPost.getId(this):buNavSettings.currentPost;return a?(a=f(a),g(a)):!0});d("#posts-filter").submit(function(){var a=null,b=[],a=0;if(d(this).find('select[name="action"],select[name="action2"]').filter('[value="trash"]')){for(var c=d(this).find('input[name="post[]"]:checked'),e=0;e<c.length;e++)a=d(c[e]).val(),a=f(a),a.ignore||b.push(a.msg);if(b.length)return c=1<b.length?!0:!1,g({ignore:!1,msg:b.join("\n\n")},c)}return!0})})})(jQuery);