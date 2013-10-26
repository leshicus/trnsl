Ext.Loader.setPath('Ext.ux', '../ext-4.2.1/examples/ux');
/*
Ext.onReady(function () {
    Ext.Loader.setConfig({
        enabled: true,
        //disableCaching: false,
        paths: {
            'Ext': '/ext-4.2.1/src',
            'Ext.ux': '/ext-4.2.1/examples/ux'
        }
    });

});
Ext.require([
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.CheckColumn'
]);

*/
Ext.require([
    'Ext.grid.plugin.DragDrop',
    'Ext.tree.plugin.TreeViewDragDrop'
]);


Ext.define('Ext.ux.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    // * исправление подсказки, которая не убирается после ввода первых символов
    loadRecord: function (record) {
        var me = this,
            form = me.getForm();
        form.loadRecord(record);
        if (form.isValid()) {
            me.hideToolTip();
        } else if (me.errorSummary) {
            me.showToolTip();
        }

        Ext.Array.forEach(me.query('>displayfield'), function (field) {
            me.renderColumnData(field, record);
        }, me);
    }
});

Ext.grid.RowEditor.prototype.saveBtnText = 'ОК';
Ext.grid.RowEditor.prototype.cancelBtnText = 'Отмена';
Ext.tip.QuickTipManager.init(true, {showDelay : 2000, dismissDelay:2000});
Ext.application({
    name: 'App',
    appFolder: 'App',
    autoCreateViewport: true,
    launch: function () {
        App.app = this;
        Ext.QuickTips.init();
        console.log('launch App');
    },
    controllers: [
        'TabpanelAuthC',
        'manage.ToolbarManageC',
        'manage.PanelQuestionC',
        'manage.PanelSpecC',
        'manage.PanelActC',
        'manage.PanelGroupC',
        'admin.ToolbarAdminC',
        'admin.PanelUserC',
        'admin.PanelClassC',
        'admin.GridLogC',
        'user.ToolbarUserC',
        'user.PanelTestC',
        'user.PanelSelfC'
    ]
});
