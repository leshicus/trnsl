Ext.define('App.controller.manage.ToolbarManageC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.ToolbarManageV'
    ],
    models: [

    ],
    stores: [

    ],
    refs: [
        {
            ref: 'toolbarManage',
            selector: 'toolbarManage'
        }
    ],

    init: function () {
        console.log('ToolbarC init');

        this.control({
            'toolbarManage #questionMI': {
                click: function (me, e, eOpts) {
                    console.log('click questionMI');

                    var toolbarManage = me.up('toolbarManage'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelQuestion')[0],
                        storeQuest = Ext.StoreManager.lookup('manage.GridQuestionS'),
                        tree = Ext.StoreManager.lookup('manage.TreeQuestionS'),
                        layout = viewport.getLayout();
                    storeQuest.filter(function(){return false;});
                    if (!panel) {
                        panel = Ext.create('App.view.manage.PanelQuestionV');
                    }
                    tree.getRootNode().expand(true);
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarManage #specialityMI': {
                click: function (me, e, eOpts) {
                    console.log('click specialityMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('panelSpec')[0],
                        storeSpec = Ext.StoreManager.lookup('manage.GridSpecS'),
                        tree = Ext.StoreManager.lookup('manage.TreeSpecS'),
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    storeSpec.filter(function(){return false;});
                    if (!panel) {
                        panel = Ext.create('App.view.manage.PanelSpecV');
                    }
                    tree.getRootNode().expand(true);
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarManage #activityMI': {
                click: function (me, e, eOpts) {
                    console.log('click activityMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridActV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridActV');
                    }
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarManage #groupMI': {
                click: function (me, e, eOpts) {
                    console.log('click groupMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridGroupV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridGroupV');
                    }
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarManage #mainMI': {
                click: function (me, e, eOpts) {
                    console.log('click mainMI');

                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.setActiveItem(0);
                }
            }
        });

        console.log('ToolbarC end');
    }
});

