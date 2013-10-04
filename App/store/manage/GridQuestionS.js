Ext.define('App.store.manage.GridQuestionS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridQuestionM',
    //sorters:['object_type', 'object_name', 'manid'],
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/manage/syncGridQuestion.php?act=create',
            read: 'php/manage/syncGridQuestion.php?act=read',
            update: 'php/manage/syncGridQuestion.php?act=update',
            destroy: 'php/manage/syncGridQuestion.php?act=destroy'
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