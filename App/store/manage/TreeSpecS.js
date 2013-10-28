Ext.define('App.store.manage.TreeSpecS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'ajax',
        url: 'php/manage/getTreeSpec.php'
    },
    root: {
        text: 'Виды деятельности',
        expanded: false
    }
});