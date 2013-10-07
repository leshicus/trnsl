Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    /*layout: {
     align: 'center',
     pack: 'center',
     type: 'vbox'
     },*/
    layout: 'card',
    activeItem: 0,
    border: false,
    defaults: {
        border: false
    },
    initComponent: function () {
        console.log('Init Viewport');

        this.items = [
            {
                id: 'card-0-auth',
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                items: [
                    {xtype: 'tabpanelAuth'}
                ]
            },
            {
                id: 'card-1-user',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {xtype: 'toolbarUser'}
                ]
            },
            {
                id: 'card-2-admin',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {xtype: 'toolbarAdmin'}
                ]
            },
            {
                id: 'card-3-manage',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {xtype: 'toolbarManage'}
                ]
            }
        ];

        this.callParent(arguments);
    }
});