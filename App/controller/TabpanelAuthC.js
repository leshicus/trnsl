Ext.define('App.controller.TabpanelAuthC', {
    extend: 'Ext.app.Controller',
    views: [
        'TabpanelAuthV',
        'TabAuthV',
        'TabRegV'
    ],
    models: [
        //'manage.GridAuthM'
    ],
    stores: [
        //'manage.GridAuthS'
    ],
    refs: [
       /* {
            ref: 'gridAuth',
            selector: 'gridAuth'
        }*/
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('TabpanelAuthC init');

        this.control({
// * tabReg
            'tabReg button[action=register]': {
                click: function (button) {
                    console.log('action=register');

                    var form = button.up('form').getForm();
                    if (form.isValid() ) {
                        form.submit({
                            waitMsg: 'Регистрация...',
                            success: function (form, action) {
                                Ext.Msg.alert('Успех', action.result.message);
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('Ошибка', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                }
            },
            'tabReg button[action=refresh]': {
                click: function (button) {
                    console.log('action=refresh');

                    var form = button.up('form');
                    form.getForm().reset();
                }
            },

// * tabAuth
            'tabAuth button[action=enter]': {
                click: function (button) {
                    console.log('action=enter');
                    //userid = 0;
                    var form = button.up('form').getForm();
                    /*if (form.isValid() ) {
                        form.submit({
                            waitMsg: 'Авторизация...',
                            success: function (form, action) {
                                Ext.example.msg('Успех', action.result.message);*/
                                // * открыть нужную подсистему
                                var formValues = form.getValues(),
                                    subsystem = formValues['comboSystem'],
                                    //userid = action.result.userid,
                                    viewport = button.up('viewport'),
                                    layout = viewport.getLayout();
                                /*userid = 5;
                                Ext.Ajax.request({
                                    url:'php/setUserid.php?userid='+userid
                                });*/
                    //TODO проверить логирование auth
                                if(subsystem){
                                    switch (subsystem){
                                        case 1: // * Тестирование

                                            break;
                                        case 2:  // * Администрирование
                                            var treeUser = Ext.StoreManager.lookup('admin.TreeUserS'),
                                                storeRole = Ext.StoreManager.lookup('admin.ComboRoleS'),
                                                gridUser = Ext.StoreManager.lookup('admin.GridUserS'),
                                                //storeSpec = Ext.data.StoreManager.lookup('manage.GridSpecS'),
                                                gridExam = Ext.StoreManager.lookup('admin.GridExamS'),
                                                gridSigngroup = Ext.StoreManager.lookup('admin.GridSigngroupS'),
                                                gridPerson = Ext.StoreManager.lookup('admin.GridPersonS');
                                            treeUser.load();
                                            gridUser.load();
                                            //storeSpec.load();
                                            storeRole.load();
                                            gridExam.load();
                                            gridSigngroup.load();
                                            gridPerson.load();
                                            break;
                                        case 3:  // * Ведение
                                            var storeTreeQuestion = Ext.StoreManager.lookup('manage.TreeQuestionS'),
                                                storeTreeSpec = Ext.StoreManager.lookup('manage.TreeSpecS'),
                                                storeGridAct = Ext.StoreManager.lookup('manage.GridActS'),
                                                storeGridAnswer = Ext.StoreManager.lookup('manage.GridAnswerS'),
                                                storeGridGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                                                storeGridQuestion = Ext.StoreManager.lookup('manage.GridQuestionS');
                                                //storeGridSpec = Ext.data.StoreManager.lookup('manage.GridSpecS');
                                            storeTreeQuestion.load();
                                            storeTreeSpec.load();
                                            storeGridAct.load();
                                            storeGridAnswer.load();
                                            storeGridGroup.load();
                                            storeGridQuestion.load();
                                            //storeGridSpec.load();
                                            break;
                                        default:
                                            break;
                                    }
                                    layout.setActiveItem(subsystem);
                                }

                            /*},
                            failure: function (form, action) {
                                Ext.Msg.alert('Ошибка', action.result ? action.result.message : 'No response');
                            }
                        });
                    }*/


                }
            },
            'tabAuth button[action=refresh]': {
                click: function (button) {
                    console.log('action=refresh');

                    var form = button.up('form');
                    form.getForm().reset();
                }
            },
            'tabAuth button[action=changepassword]': {
                click: function (button) {
                    console.log('action=changepassword');

                    var form = button.up('form'),
                        values = form.getValues();
                    Ext.Ajax.request({
                        url:'php/changePassword.php',
                        params: {
                            textLogin: values['textLogin'],
                            textOldPassword: values['textOldPassword'],
                            textNewPassword: values['textNewPassword']
                        },
                        success:function (response, options) {
                            var response = Ext.decode(response.responseText),
                                message = response.message;
                            Ext.example.msg('Успех', message);
                        },
                        failure: function (response, options) {
                            var response = Ext.decode(response.responseText),
                                message = response.message;
                            Ext.Msg.alert('Ошибка', message);
                        }
                    });
                }
            }
        });
        console.log('TabpanelAuthC end');
    }
});