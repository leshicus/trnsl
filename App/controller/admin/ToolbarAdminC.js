﻿Ext.define('App.controller.admin.ToolbarAdminC', {
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
                    layout.activeItem.cascade(cascadeRemoveGrid, false);
                    layout.activeItem.add(panel);
                }
            },
            'toolbarAdmin #mainMI': {
                click: function (me, e, eOpts) {
                    console.log('click mainMI');

                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.activeItem.cascade(cascadeRemoveGrid, false);
                    layout.setActiveItem(0);
                }
            },
            'toolbarAdmin #logMI': {
                click: function (me, e, eOpts) {
                    console.log('click logMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('gridLog')[0],
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.admin.GridLogV');
                    }
                    layout.activeItem.cascade(cascadeRemoveGrid, false);
                    layout.activeItem.add(panel);

                    /*panel.store.clearFilter();
                    panel.store.filter(function () {
                        return false
                    });*/
                }
            },
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
                    layout.activeItem.cascade(cascadeRemoveGrid, false);
                    layout.activeItem.add(panel);

                    var gridPerson = Ext.ComponentQuery.query('gridPerson')[0],
                        gridSigngroup = Ext.ComponentQuery.query('gridSigngroup')[0];
                    gridPerson.store.filter(function () {
                        return false
                    });
                    gridSigngroup.store.filter(function () {
                        return false
                    });
                }
            }
        });

        console.log('ToolbarC end');
    }
});

