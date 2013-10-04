Ext.define('App.store.admin.GridSigngroupS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridSigngroupM',
    //autoSync: true,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/admin/syncGridSigngroup.php?act=create',
            read: 'php/admin/syncGridSigngroup.php?act=read',
            update: 'php/admin/syncGridSigngroup.php?act=update',
            destroy: 'php/admin/syncGridSigngroup.php?act=destroy'
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