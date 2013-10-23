Ext.define('App.view.user.ToolbarUserV', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbarUser',
    itemId: 'toolbarUser',
    defaults    : {
        toggleGroup    : "user",
        allowDepress    : false
    },
    initComponent: function () {
        console.log('ToolbarUserV init');



        this.items = [
            {
                text: 'Главная',
                itemId: 'mainMI'
            },
            '-',
            {
                text: 'Тестирование',
                itemId: 'testMI'
            },
            {
                text: 'Самоподготовка',
                itemId: 'selfMI'
            }/*,
            { xtype: 'tbspacer', width: 100 },
            label*/
        ];
        this.callParent(arguments);
        console.log('ToolbarUserV end');
    }
});