Ext.define('App.controller.manage.PanelActC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridActV'
    ],
    models: [
        'manage.GridActM'
    ],
    stores: [
        'manage.GridActS'
    ],
    refs: [
        {
            ref: 'gridAct',
            selector: 'gridAct'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelActC init');

        this.control({
            'gridAct': {
                edit: function (editor, context) {
                    console.log('edit');

                    /* context.grid.store.sync({
                     success: function () {
                     */
                    /*tree.getRootNode().removeAll();
                     tree.store.load();
                     tree.getView().refresh();*/
                    /*
                     },
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                     },
                     scope: this
                     });*/
                }
            },
            'gridAct button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridActM'),
                        rowEditing = grid.plugins[0];
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridAct button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected(),
                        actid = selection.get('actid'),
                        storeGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                        recGroup = storeGroup.findRecord('actid', actid);

                    /*controllerQuestion = App.app.getController('manage.PanelQuestionC'),
                     tree = controllerQuestion.getTreeQuestion()*/
                    // * проверка, что нет видов деятельности в группах
                    if (!recGroup) {
                        grid.store.remove(selection);
                    }else{
                        Ext.example.msg('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                    }
                }
            }
        });
        console.log('PanelActC end');
    }
});