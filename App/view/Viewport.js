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
                    {
                        xtype:'box',
                        margin:'5 5 5 1',
                        cls:'mystyle',
                        html:'Аутентификация',
                        height: 35,
                        width:500
                    },
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
                    {
                        xtype:'box',
                        margin:'5 5 0 1',
                        cls:'mystyle',
                        html:'Подсиситема тестирования',
                        height: 35
                    },
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
                    {
                        xtype:'box',
                        margin:'5 5 0 1',
                        cls:'mystyle',
                        html:'Подсиситема администрирования',
                        height: 35
                    },
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
                    {
                        xtype:'box',
                        margin:'5 5 0 1',
                        cls:'mystyle',
                        html:'Подсиситема ведения',
                        height: 35
                    },
                    {xtype: 'toolbarManage'}
                ]
            }
        ];

        this.callParent(arguments);
    }
});