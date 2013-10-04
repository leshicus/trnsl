Ext.define('App.store.manage.GridActS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridActM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/manage/syncGridAct.php?act=create',
            read: 'php/manage/syncGridAct.php?act=read',
            update: 'php/manage/syncGridAct.php?act=update',
            destroy: 'php/manage/syncGridAct.php?act=destroy'
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