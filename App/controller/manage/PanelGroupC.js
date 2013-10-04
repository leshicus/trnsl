Ext.define('App.controller.manage.PanelGroupC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridGroupV'
    ],
    models: [
        'manage.GridGroupM'
    ],
    stores: [
        'manage.GridGroupS'
    ],
    refs: [
        {
            ref: 'gridGroup',
            selector: 'gridGroup'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelGroupC init');

        this.control({
            'gridGroup': {
                edit: function (editor, context) {
                    console.log('edit');

                    context.grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                }
            },
            'gridGroup button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridGroupM'),
                        rowEditing = grid.plugins[0];
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridGroup button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected(),

                        storeSpec = Ext.StoreManager.lookup('manage.GridSpecS'),
                        storeQuest = Ext.StoreManager.lookup('manage.GridQuestionS');
                    // * проверка, что нет групп в специальностях и вопросах
                    storeSpec.clearFilter();
                    storeQuest.clearFilter();
                    if (selection.raw) {
                        var groupid = selection.raw.groupid,
                            recSpec = storeSpec.findRecord('groupid', groupid),
                            recQuest = storeQuest.findRecord('groupid', groupid);
                        if (!recSpec && !recQuest) {
                            grid.store.remove(selection);
                            grid.store.sync();
                        } else {
                            Ext.example.msg('Не удалено', 'Есть специальности привязанные к данной группе');
                        }
                    }
                }
            }
        });
        console.log('PanelGroupC end');
    }
});