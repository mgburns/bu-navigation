if("undefined"===typeof bu||"undefined"===typeof bu.plugins||"undefined"===typeof bu.plugins.navigation)throw new TypeError("BU Navigation Metabox dependencies have not been met!");
(function(b){bu.plugins.navigation.views=bu.plugins.navigation.views||{};var f,e;f=bu.plugins.navigation.views.Metabox={el:"#bupageparentdiv",ui:{treeContainer:"#edit_page_tree",moveBtn:"#select-parent",breadcrumbs:"#bu_nav_attributes_location_breadcrumbs"},inputs:{label:'[name="nav_label"]',visible:'[name="nav_display"]',parent:'[name="parent_id"]',order:'[name="menu_order"]'},data:{modalTree:void 0,breadcrumbs:"",label:""},initialize:function(a){a=a||{};this.settings=b.extend({},bu.plugins.navigation.settings,
a);"undefined"===typeof this.settings.isNewPost&&(this.settings.isNewPost=1==b("#auto_draft").val()?!0:!1);this.settings.isNewPost&&(this.settings.currentPost=b("#post_ID").val());this.$el=b(this.el);this.loadNavTree();this.attachHandlers()},loadNavTree:function(){"undefined"===typeof this.data.modalTree&&(this.data.modalTree=ModalPostTree({treeContainer:this.ui.treeContainer,currentPost:this.settings.currentPost,ancestors:this.settings.ancestors,isNewPost:this.settings.isNewPost}),this.data.modalTree.listenFor("update",
b.proxy(this.updateLocation,this)))},attachHandlers:function(){this.$el.delegate(this.ui.moveBtn,"click",this.data.modalTree.open);this.$el.delegate(this.inputs.label,"blur",b.proxy(this.onLabelChange,this));this.$el.delegate(this.inputs.visible,"click",b.proxy(this.onToggleVisibility,this))},onLabelChange:function(){var a=b(this.inputs.label).attr("value"),a={ID:this.settings.currentPost,title:a};e.updatePost(a);e.save();this.updateBreadcrumbs(a)},onToggleVisibility:function(a){var c=b(a.target).attr("checked"),
d=e.getPost(this.settings.currentPost);c&&!this.isAllowedInNavigationLists(d)&&(a.preventDefault(),this.notify('Displaying top-level pages in the navigation is disabled. To change this behavior, go to Site Design > Primary Navigation and enable "Allow Top-Level Pages."'));d.meta.excluded=!c;e.updatePost(d);e.save()},updateLocation:function(a){this.updateBreadcrumbs(a);b(this.inputs.parent).val(a.parent);b(this.inputs.order).val(a.menu_order)},updateBreadcrumbs:function(a){var a=e.getAncestors(a.ID),
c=a.join("&nbsp;&raquo;&nbsp;");1<a.length?b(this.ui.breadcrumbs).html("<p>"+c+"</p>"):b(this.ui.breadcrumbs).html("<p>Top level page</p>")},isAllowedInNavigationLists:function(a){return 0===a.parent?this.settings.allowTop:!0},notify:function(a){alert(a)}};ModalPostTree=bu.plugins.navigation.views.ModalPostTree=function(a){var c={},d=c.conf={treeContainer:"#edit_page_tree",toolbarContainer:".page_location_toolbar",navSaveBtn:"#bu_page_parent_save",navCancelBtn:"#bu_page_parent_cancel",currentPost:void 0,
isNewPost:!1},d=b.extend(d,a);b.extend(!0,c,bu.signals);c.open=function(a){var d=b(window).width(),f=b(window).height(),d=720<d?720:d,h=a.target.title||a.target.name||null,g=a.target.href||a.target.alt,a=a.target.rel||!1,g=g.replace(/&width=[0-9]+/g,""),g=g.replace(/&height=[0-9]+/g,"");tb_show(h,g+"&width="+(d-80)+"&height="+(f-85),a);e.scrollToSelection();b("#TB_window").bind("tb_unload",function(){c.saving?c.saving=!1:e.restore()});return!1};c.onUpdateLocation=function(a){a.preventDefault();c.broadcast("update",
[e.getCurrentPost()]);e.save();c.saving=!0;tb_remove()};c.onCancelMove=function(a){a.preventDefault();tb_remove()};c.onPostsSelected=function(){var a,c;d.isNewPost&&!e.getCurrentPost()&&(a=b(f.inputs.label).val()||"Untitled post",c=b(f.inputs.visible).attr("checked")||!1,a={ID:d.currentPost,title:a,meta:{excluded:!c},parent:0,menu_order:0},e.insertPost(a,{position:"before"}),e.setCurrentPost(a),e.save())};e=bu.plugins.navigation.tree("edit_post",{el:d.treeContainer});e.listenFor("postsSelected",c.onPostsSelected);
a=b(d.toolbarContainer);a.delegate(d.navSaveBtn,"click",c.onUpdateLocation);a.delegate(d.navCancelBtn,"click",c.onCancelMove);return c}})(jQuery);var tb_position;
(function(b){tb_position=function(){var f=b("#TB_window"),e=b(window).width(),a=b(window).height(),c=720<e?720:e;f.size()&&(f.width(c-50).height(a-45),b("#TB_inline").width(c-80).height(a-90),f.css({"margin-left":"-"+parseInt((c-50)/2,10)+"px"}),"undefined"!=typeof document.body.style.maxWidth&&f.css({top:"20px","margin-top":"0"}));return b("a.thickbox").each(function(){var d=b(this).attr("href");d&&(d=d.replace(/&width=[0-9]+/g,""),d=d.replace(/&height=[0-9]+/g,""),b(this).attr("href",d+"&width="+
(c-80)+"&height="+(a-85)))})};b(window).resize(function(){tb_position()})})(jQuery);jQuery(document).ready(function(){bu.plugins.navigation.views.Metabox.initialize()});