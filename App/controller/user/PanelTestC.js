Ext.define('App.controller.user.PanelTestC', {
    extend: 'Ext.app.Controller',
    views: [
        'user.PanelTestV'/*,
         'user.PanelTestingV'*/
    ],
    models: [
        'user.CardM'
    ],
    stores: [
        'user.CardS'
    ],
    refs: [
        {
            ref: 'comboExam',
            selector: 'panelTest #comboExam'
        },
        {
            ref: 'panelTest',
            selector: 'panelTest'
        }
    ],

    onLaunch: function () {
        var me = this;

        var storeCard = Ext.data.StoreManager.lookup('user.CardS');
        // * старт показа вопросов после генерации билета
        storeCard.on('load', me.onStoreCardLoad, me);
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
                    // * проверить, что экзамен еще не пройден
                    Ext.Ajax.request({
                        url: 'php/user/getExam.php?examid=' + examid,
                        success: function (response, options) {
                            var respGetExam = Ext.decode(response.responseText),
                                cnt = respGetExam.cnt;
                            if (cnt != 0) {
                                Ext.MessageBox.show({
                                    title: 'Ошибка',
                                    msg: 'Нельзя повторно проходить один и тот же экзамен',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            } else {
                                // * проверим не снята ли регистрация
                                Ext.Ajax.request({
                                    url: 'php/user/getRegStatus.php?examid=' + examid,
                                    success: function (response, options) {
                                        var resp = Ext.decode(response.responseText);
                                        cnt = resp.cnt
                                        if (cnt != 0) { // * старт теста
                                            // * генерация билета
                                            var storeCard = Ext.data.StoreManager.lookup('user.CardS');
                                            // * показ вопросов на событие load в storeCard
                                            storeCard.load({params: {examid: examid}});
                                            this.runTimer(panelTest);
                                        } else {
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
                                        }
                                    },
                                    failure: function () {
                                        Ext.MessageBox.show({
                                            title: 'Ошибка',
                                            msg: 'Ошибка проверки статуса регистрации',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    },
                                    scope: this
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.MessageBox.show({
                                title: 'Ошибка',
                                msg: 'Ошибка проверки повторного прохождения экзамена',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        },
                        scope: this
                    });

                }
            },
            'panelTest button[action=nextquestion]': {
                click: function (button) {
                    console.log('action=nextquestion');

                    var panelTest = button.up('panelTest'),
                        panelCard = panelTest.down('#panelCard');
                    if (panelCard.questionNumber < questionAmount) {
                        //* следующий вопрос
                        var question = panelCard.down('#question'),
                            storeCard = Ext.data.StoreManager.lookup('user.CardS'),
                            questionNumber = panelCard.questionNumber + 1,
                            questionRec = storeCard.findRecord('rownum', questionNumber);
                        if (questionRec) {
                            var questionText = questionRec.get('questiontext');
                            question.setValue(questionText);
                            panelCard.questionNumber = questionNumber;
                        }

                    } else {
                        //* сохраняем результат

                    }

                }
            }

        });
        console.log('PanelTestC end');
    },

    // * запуск таймера
    runTimer: function (panelTest) {
        var runnerExamTest = new Ext.util.TaskRunner(),
            textTime = panelTest.down('#textTime'),
            taskExamTimerSec = {
                run: function () {
                    if (examTimerSec < 0) {
                        runnerExamTest.stop(taskExamTimerSec);
                    } else {
                        textTime.setValue(examTimerSec + ' секунд');
                        examTimerSec -= 1;
                    }
                },
                interval: 1000, // каждую секунду
                duration: 1000 * examTimerSec + 1
            },
            taskExamTimerMin = {
                run: function () {
                    if (examTimerMin < 2) {
                        textTime.setValue(examTimerSec + ' секунд');
                        runnerExamTest.start(taskExamTimerSec);
                        runnerExamTest.stop(taskExamTimerMin);

                    } else {
                        textTime.setValue(examTimerMin + ' минут');
                        examTimerMin -= 1;
                    }
                },
                interval: 1000 * 60, // каждую минуту
                duration: 1000 * 60 * examTimerMin
            };
        textTime.setValue(examTimerMin + ' минут');
        runnerExamTest.start(taskExamTimerMin);
    },
    // * показ вопросов
    onStoreCardLoad: function (storeCard) {
        console.log('onStoreCardLoad');

        var panelTest = this.getPanelTest(),
            panelCard = panelTest.down('#panelCard'),
            question = panelCard.down('#question'),
            questionText = storeCard.findRecord('rownum', 1).get('questiontext'),
            answerText = panelCard.down('#answer'),
            maxRownum = this.getStoreMaxValue(storeCard, 'rownum');

        // * проверим, что в билете необходимое число вопросов
        if (maxRownum != questionAmount){
            Ext.MessageBox.show({
                title: 'Ошибка генерации билета',
                msg: 'Не верное число вопросов в билете. Нужно: ' + questionAmount + ', сгенерировано: ' + maxRownum,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }else{
            question.setValue(questionText);
            panelCard.questionNumber = 1;
            panelCard.show();
        }

    },
    // * нахождение максимального значения поля в сторе
    getStoreMaxValue: function (store, field) {
        var max = 0;
        if (store.getCount() > 0){
            max = store.getAt(0).get(field); // initialise to the first record's id value.
            store.each(function(rec) // go through all the records
            {
                max = Math.max(max, rec.get(field));
            });
        }
        return max;
    }
});