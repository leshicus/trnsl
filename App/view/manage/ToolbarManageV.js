Ext.define('App.view.manage.ToolbarManageV', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbarManage',
    itemId: 'toolbarManage',
    defaults    : {
        toggleGroup    : "manage",
        allowDepress    : false
    },
    initComponent: function () {
        console.log('ToolbarManageV init');

        this.items = [
            {
                text: 'Вопросы',
                itemId: 'questionMI'
            },
            {
                text: 'Специальности',
                itemId: 'specialityMI'
            },
            {
                text: 'Виды деятельности',
                itemId: 'activityMI'
            },
            {
                text: 'Группы',
                itemId: 'groupMI'
            },
            {
                text: 'Экспорт/Импорт вопросов',
                itemId: 'expimpMI'
            },
            '->',
            {
                text: 'Главная',
                itemId: 'mainMI'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarManageV end');
    }
});