Ext.define('App.controller.admin.ToolbarAdminC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.ToolbarAdminV'
    ],
    models: [

    ],
    stores: [

    ],
    refs: [
        {
            ref: 'toolbarAdmin',
            selector: 'toolbarAdmin'
        }
    ],

    init: function () {
        console.log('ToolbarC init');

        this.control({
            'toolbarAdmin #userMI': {
                click: function (me, e, eOpts) {
                    console.log('click userMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelUser')[0],
                        storeUser = Ext.StoreManager.lookup('admin.GridUserS'),
                        treeUser = Ext.StoreManager.lookup('admin.TreeUserS'),
                        layout = viewport.getLayout();
                    storeUser.filter(function () {
                        return false;
                    });
                    if (!panel) {
                        panel = Ext.create('App.view.admin.PanelUserV');
                    }
                    treeUser.getRootNode().expand(true);
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarAdmin #mainMI': {
                click: function (me, e, eOpts) {
                    console.log('click mainMI');

                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.setActiveItem(0);
                }
            }, /*,
             'toolbarAdmin #journalMI': {
             click: function (me, e, eOpts) {
             console.log('click specialityMI');

             var toolbarAdmin = me.up('toolbarAdmin'),
             panel = Ext.ComponentQuery.query('panelSpec')[0],
             storeSpec = Ext.StoreAdminr.lookup('manage.GridSpecS'),
             viewport = me.up('viewport'),
             layout = viewport.getLayout();
             storeSpec.filter(function(){return false;});
             if (!panel) {
             panel = Ext.create('App.view.manage.PanelSpecV');
             }
             layout.activeItem.cascade(cascadeRemoveGrid);
             layout.activeItem.add(panel);
             }
             }*/
            'toolbarAdmin #classMI': {
                click: function (me, e, eOpts) {
                    console.log('click classMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelClass')[0],
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.admin.PanelClassV');
                    }
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        });

        console.log('ToolbarC end');
    }
});

