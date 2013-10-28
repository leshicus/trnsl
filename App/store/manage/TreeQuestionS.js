Ext.define('App.store.manage.TreeQuestionS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'ajax',
        url: 'php/manage/getTreeQuestion.php'
    },
    root: {
        text: 'Виды деятельности',
        expanded: false
    }
});