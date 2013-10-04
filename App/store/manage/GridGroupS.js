Ext.define('App.store.manage.GridGroupS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridGroupM',
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/manage/syncGridGroup.php?act=create',
            read: 'php/manage/syncGridGroup.php?act=read',
            update: 'php/manage/syncGridGroup.php?act=update',
            destroy: 'php/manage/syncGridGroup.php?act=destroy'
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