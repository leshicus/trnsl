Ext.define('App.store.admin.ComboLogtypeS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'php/admin/getLogtype.php',
        reader:{
            type:'json',
            root:'rows'
        }
    },
    autoLoad:true
});