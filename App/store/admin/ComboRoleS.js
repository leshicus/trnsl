Ext.define('App.store.admin.ComboRoleS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'php/admin/getRole.php',
        reader:{
            type:'json',
            root:'rows'
        }
    }
    //autoLoad:true
});