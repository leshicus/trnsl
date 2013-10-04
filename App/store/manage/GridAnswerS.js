Ext.define('App.store.manage.GridAnswerS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridAnswerM',
    //sorters:['object_type', 'object_name', 'manid'],
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'php/manage/syncGridAnswer.php?act=create',
            read: 'php/manage/syncGridAnswer.php?act=read',
            update: 'php/manage/syncGridAnswer.php?act=update',
            destroy: 'php/manage/syncGridAnswer.php?act=destroy'
        },
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            type: 'json',
            allowSingle:false  // * чтобы всегда передавал массив
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