Ext.define('App.store.admin.GridExamS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridExamM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/admin/syncGridExam.php?act=create',
            read: 'php/admin/syncGridExam.php?act=read',
            update: 'php/admin/syncGridExam.php?act=update',
            destroy: 'php/admin/syncGridExam.php?act=destroy'
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