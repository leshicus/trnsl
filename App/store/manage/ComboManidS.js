Ext.define('App.store.ComboManidS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'php/getManid.php',
        reader:{
            type:'json',
            root:'rows'
        }
    }
    //autoLoad:true
});