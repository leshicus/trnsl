Ext.define('App.model.admin.GridLogM', {
    extend:'Ext.data.Model',
    fields:[
        {name: 'logid'},
        {name: 'logdate'},
        {name: 'userid'},
        {name: 'parameter'},
        {name: 'logtypeid'},
        {name: 'fio'},
        {name: 'logtypename'}
    ]
});