Ext.define('App.store.admin.GridPersonS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridPersonM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/admin/syncGridPerson.php?act=create',
            read: 'php/admin/syncGridPerson.php?act=read',
            update: 'php/admin/syncGridPerson.php?act=update',
            destroy: 'php/admin/syncGridPerson.php?act=destroy'
        },
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json',
            allowSingle:false
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