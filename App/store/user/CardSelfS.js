Ext.define('App.store.user.CardSelfS', {
    extend: 'Ext.data.Store',
    model: 'App.model.user.CardM',
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'php/user/getCard.php',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});