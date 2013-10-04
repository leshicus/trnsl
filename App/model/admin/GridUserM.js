Ext.define('App.model.admin.GridUserM', {
    extend:'Ext.data.Model',
    fields:[
        {name: 'userid'},
        {name: 'familyname'},
        {name: 'firstname'},
        {name: 'lastname'},
        {name: 'roleid'},
        {name: 'login'},
        {name: 'begindate'},
        {name: 'enddate'},
        {name: 'groupid'},
        {name: 'specid'},
        {name: 'password'}
    ]
});