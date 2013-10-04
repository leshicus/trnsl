Ext.define('App.view.admin.ToolbarAdminV', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbarAdmin',
    itemId: 'toolbarAdmin',
    initComponent: function () {
        console.log('ToolbarAdminV init');

        this.items = [
            {
                text: 'Пользователи',
                itemId: 'userMI'
            },
            {
                text: 'Журнал',
                itemId: 'journalMI'
            },
            {
                text: 'Класс',
                itemId: 'classMI'
            },
            {
                text: 'Отчеты',
                itemId: 'reportMI'
            },
            {
                text: 'Статистика',
                itemId: 'statisticMI'
            },
            '->',
            {
                text: 'Главная',
                itemId: 'mainMI'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarAdminV end');
    }
});