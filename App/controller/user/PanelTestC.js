Ext.define('App.controller.user.PanelTestC', {
    extend: 'Ext.app.Controller',
    views: [
        'user.PanelTestV'/*,
        'user.PanelTestingV'*/
    ],
    models: [
    ],
    stores: [
    ],
    refs: [
        {
            ref: 'comboExam',
            selector: 'panelTest #comboExam'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelTestC init');

        this.control({
            'panelTest #comboExam': {
                select: function (combo, records, eOpts) {
                    console.log('comboExam');

                    var examid = combo.getValue();
                    Ext.Ajax.request({
                        url: 'php/user/setExam.php?examid=' + examid,
                        success: function (response, options) {
                            var textStatus = combo.up('panelTest').down('#textStatus');
                            textStatus.setValue(unregString);
                            textStatus.setFieldStyle(colorStatusTextUnreg);
                            Ext.TaskManager.start(taskRegStatus);
                        },
                        failure: function () {
                            Ext.MessageBox.show({
                                title: 'Ошибка',
                                msg: 'Не удалось подать заявку на регистрацию',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                },
                specialkey: function (combo, e) {
                    if (e.getKey() == e.DELETE && combo.readOnly == false) {
                        combo.reset();
                        var textStatus = combo.up('panelTest').down('#textStatus'),
                            buttonStartTest = combo.up('panelTest').down('#startTest');
                        textStatus.reset();
                        buttonStartTest.disable();
                    }
                }
            },
            'panelTest button[action=starttest]': {
                click: function (button) {
                    console.log('action=starttest');

                    var panelTest = button.up('panelTest'),
                        comboExam = panelTest.down('#comboExam'),
                        examid = comboExam.getValue();
                    // * проверим не снята ли регистрация
                    Ext.Ajax.request({
                        url: 'php/user/getRegStatus.php?examid=' + examid,
                        success: function (response, options) {
                            var resp = Ext.decode(response.responseText),
                                cnt = resp.cnt;
                            if (cnt == 0) {
                                var textStatus = panelTest.down('#textStatus'),
                                    buttonStartTest = panelTest.down('#startTest');
                                textStatus.setValue(unregString);
                                textStatus.setFieldStyle(colorStatusTextUnreg);
                                comboExam.setReadOnly(false);
                                buttonStartTest.disable();
                                Ext.MessageBox.show({
                                    title: 'Ошибка',
                                    msg: 'Регистрация была снята администратором',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                                Ext.TaskManager.start(taskRegStatus);
                            }else{
                                // * старт теста
                                var runnerExamTest = new Ext.util.TaskRunner(),
                                    textTime = panelTest.down('#textTime'),
                                    //counterSec = examTimerMin,
                                    taskExamTimerSec = {
                                        run: function () {
                                            if(examTimerSec < 0){
                                                runnerExamTest.stop(taskExamTimerSec);
                                            }else{
                                                textTime.setValue(examTimerSec + ' секунд');
                                                examTimerSec -= 1;
                                            }
                                        },
                                        interval: 1000, // каждую секунду
                                        duration: 1000 * examTimerSec + 1
                                    },
                                    taskExamTimerMin = {
                                        run:function(){
                                            if(examTimerMin < 2){
                                                textTime.setValue(examTimerSec + ' секунд');
                                                runnerExamTest.start(taskExamTimerSec);
                                                runnerExamTest.stop(taskExamTimerMin);

                                            }else{
                                                textTime.setValue(examTimerMin + ' минут');
                                                examTimerMin -= 1;
                                            }
                                        },
                                        interval: 1000 * 60, // каждую минуту
                                        duration: 1000 * 60 * examTimerMin
                                    };
                                textTime.setValue(examTimerMin + ' минут');
                                runnerExamTest.start(taskExamTimerMin);

                            }


                        },
                        failure: function () {
                            var textStatus = panelTest.down('#textStatus'),
                                buttonStartTest = panelTest.down('#startTest');
                            textStatus.setValue(unregString);
                            textStatus.setFieldStyle(colorStatusTextUnreg);
                            comboExam.setReadOnly(false);
                            buttonStartTest.disable();

                            Ext.MessageBox.show({
                                title: 'Ошибка',
                                msg: 'Не удалось проверить статус заявки на регистрацию',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            }
        });
        console.log('PanelTestC end');
    }
});