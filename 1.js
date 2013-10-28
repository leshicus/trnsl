fieldLabel: 'Специальность',
    mode: 'local',
    displayField: 'name',
    valueField: 'id',
    queryMode: 'local',
    store: 'other.Speciality',
    name: 'speciality',
    tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<div class="x-boundlist-item">{spec_cipher} - {name}</div>',
    '</tpl>'
),
    // template for the content inside text field
    displayTpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '{spec_cipher} {name}',
    '</tpl>'
)