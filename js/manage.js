if("undefined"===typeof bu||"undefined"===typeof bu.plugins.navigation||"undefined"===typeof bu.plugins.navigation.tree)throw new TypeError("BU Navigation Manager script dependencies have not been met!");
(function(b){bu.plugins.navigation.views=bu.plugins.navigation.views||{};var e,d,c;e=bu.plugins.navigation.views.Navman={el:"#nav-tree-container",ui:{form:"#navman_form",dataField:"#navman_data",deletionsField:"#navman_delete",editsField:"#navman_edits",expandAllBtn:"#navman_expand_all",collapseAllBtn:"#navman_collapse_all",saveBtn:""},data:{dirty:!1,deletions:[]},initialize:function(){c=bu.plugins.navigation.tree("navman",{el:this.el});d.initialize();c.listenFor("editPost",b.proxy(this.editPost,
this));c.listenFor("removePost",b.proxy(this.removePost,this));b(this.ui.form).bind("submit",b.proxy(this.save,this));b(this.ui.expandAllBtn).bind("click",this.expandAll);b(this.ui.collapseAllBtn).bind("click",this.collapseAll)},expandAll:function(a){a.preventDefault();a.stopImmediatePropagation();c.showAll()},collapseAll:function(a){a.preventDefault();a.stopImmediatePropagation();c.hideAll()},editPost:function(a){"link"==a.type?d.edit(a):window.location="post.php?action=edit&post="+a.ID},removePost:function(a){if(a=
a.ID)this.data.deletions.push(a),this.data.dirty=!0},save:function(){var a=c.getPosts();b(this.ui.dataField).attr("value",JSON.stringify(a));b(this.ui.deletionsField).attr("value",JSON.stringify(this.data.deletions));b(this.ui.editsField).attr("value",JSON.stringify(d.data.edits));this.data.dirty=!1}};d=bu.plugins.navigation.views.Linkman={el:"#navman_editlink",ui:{form:"#navman_editlink_form",urlField:"#editlink_address",labelField:"#editlink_label",targetNewField:"#editlink_target_new",targetSameField:"#editlink_target_same",
addBtn:"#navman_add_link"},data:{currentLink:null,edits:{}},initialize:function(){this.$el=b(this.el);this.$form=b(this.ui.form);this.$el.dialog({autoOpen:!1,buttons:{Ok:b.proxy(this.save,this),Cancel:b.proxy(this.cancel,this)},minWidth:400,width:500,modal:!0,resizable:!1});b(this.ui.addBtn).bind("click",b.proxy(this.add,this));return this},add:function(){this.$el.dialog("open")},edit:function(a){b(this.ui.urlField).attr("value",a.content);b(this.ui.labelField).attr("value",a.title);"new"==a.meta.bu_link_target?
b(this.ui.targetNewField).attr("checked","checked"):b(this.ui.targetSameField).attr("checked","checked");this.data.currentLink=a;this.$el.dialog("open")},save:function(){if(this.$form.valid()){var a=this.data.currentLink||{status:"new",type:"link",meta:{}};a.content=b(this.ui.urlField).attr("value");a.title=b(this.ui.labelField).attr("value");a.meta.bu_link_target=b("input[name='editlink_target']:checked").attr("value");"new"===a.status&&!a.ID?c.insertPost(a):(c.updatePost(a),this.data.edits[a.ID]=
a);this.$el.dialog("close");this.clear();e.data.dirty=!0}},cancel:function(){this.$el.dialog("close");this.clear()},clear:function(){b(this.ui.urlField).attr("value","");b(this.ui.labelField).attr("value","");b(this.ui.targetSameField).attr("checked","");this.data.currentLink=null}};window.onbeforeunload=function(){if(e.data.dirty)return"You have made changes to your navigation that have not yet been saved."}})(jQuery);jQuery(document).ready(function(){bu.plugins.navigation.views.Navman.initialize()});