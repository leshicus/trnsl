Ext.define('App.store.manage.GridSpecS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridSpecM',
    //autoSync: true,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/manage/syncGridSpec.php?act=create',
            read: 'php/manage/syncGridSpec.php?act=read',
            update: 'php/manage/syncGridSpec.php?act=update',
            destroy: 'php/manage/syncGridSpec.php?act=destroy'
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