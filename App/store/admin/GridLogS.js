Ext.define('App.store.admin.GridLogS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridLogM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            //create: 'php/admin/syncGridLog.php?act=create',
            read: 'php/admin/syncGridLog.php?act=read'
            //update: 'php/admin/syncGridLog.php?act=update',
            //destroy: 'php/admin/syncGridLog.php?act=destroy'
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