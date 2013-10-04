Ext.define('App.store.admin.GridUserS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridUserM',
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/admin/syncGridUser.php?act=create',
            read: 'php/admin/syncGridUser.php?act=read',
            update: 'php/admin/syncGridUser.php?act=update',
            destroy: 'php/admin/syncGridUser.php?act=destroy'
        },
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json'
        },
        appendId: false,
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        }
    },
    initComponent:function () {

    }
});