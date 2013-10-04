Ext.define('App.store.admin.TreeUserS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'ajax',
        url: 'php/admin/getTreeUser.php'
    },
    root: {
        text: 'Виды деятельности'
        //expanded: false
        //loaded:true
    }
});