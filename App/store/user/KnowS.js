Ext.define('App.store.user.KnowS', {
    extend: 'Ext.data.Store',
    model: 'App.model.user.KnowM',
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'php/user/getKnow.php',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});