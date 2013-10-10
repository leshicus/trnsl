Ext.define('App.controller.user.PanelTestC', {
    extend: 'Ext.app.Controller',
    views: [
        'user.PanelTestV'
    ],
    models: [
    ],
    stores: [
    ],
    refs: [

    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelTestC init');

        this.control({
            'panelTest #comboExam': {
                select:function (combo, records, eOpts) {
                    console.log('comboExam');

                    Ext.Ajax.request({
                        url:'php/user/setExam.php',
                        success:function (response, options) {
                            var textfield = combo.up('panelTest').down('#textStatus');
                            textfield.setValue(regString);
                        }
                    });
                }
            },
            'panelTest button[action=starttest]': {
                click: function (button) {
                    console.log('action=starttest');

                    /*var grid = button.up('grid'),
                        selection = grid.getSelected(),
                        actid = selection.get('actid'),
                        storeGroup = Ext.StoreManager.lookup('user.GridGroupS'),
                        recGroup = storeGroup.findRecord('actid', actid);

                    *//*controllerQuestion = App.app.getController('user.PanelQuestionC'),
                     tree = controllerQuestion.getTreeQuestion()*//*
                    // * проверка, что нет видов деятельности в группах
                    if (!recGroup) {
                        grid.store.remove(selection);
                    }else{
                        Ext.example.msg('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                    }*/
                }
            }
        });
        console.log('PanelTestC end');
    }
});