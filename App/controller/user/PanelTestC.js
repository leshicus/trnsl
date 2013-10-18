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
                            errorMessage('Ошибка подключения к базе','Не удалось подать заявку на регистрацию');
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
                                infoMessage('Внимание','Нельзя повторно проходить один и тот же экзамен');
                            } else {
                                // * проверим не снята ли регистрация
                                Ext.Ajax.request({
                                    url: 'php/user/getRegStatus.php?examid=' + examid,
                                    success: function (response, options) {
                                        var resp = Ext.decode(response.responseText);
                                        cnt = resp.cnt
                                        if (cnt != 0) { // * старт теста
                                            button.setDisabled(true);
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
                                            infoMessage('Внимание','Регистрация была снята администратором');
                                            Ext.TaskManager.start(taskRegStatus);
                                        }
                                    },
                                    failure: function () {
                                        errorMessage('Ошибка подключения к базе','Ошибка проверки статуса регистрации');
                                    },
                                    scope: this
                                });
                            }
                        },
                        failure: function (response) {
                            errorMessage('Ошибка подключения к базе', 'Ошибка проверки повторного прохождения экзамена');
                        },
                        scope: this
                    });

                }
            },
            'panelTest button[action=nextquestion]': {
                click: function (button) {
                    console.log('action=nextquestion');


                    var panelTest = button.up('panelTest'),
                        panelCard = panelTest.down('#panelCard'),
                        rownum = questionNumber,
                        textAnswer = panelTest.down('#textAnswer'), // * прогресс - Ответ
                        answerAccordion = panelTest.down('#answerAccordion'),
                        arrayAnswers = answerAccordion.query('radiofield'),
                        storeCard = Ext.data.StoreManager.lookup('user.CardS'),
                        questionId = storeCard.findRecord('rownum',rownum).get('questionid'),
                        buttonNextQuestion = panelTest.down('#nextQuestion'),
                        checkedAnswerId,
                        correct = 0,
                        taskDelayShowNewQuestion = Ext.create('Ext.util.DelayedTask', function () {
                            this.showNextQuestion(panelCard, buttonNextQuestion);
                        }, this);
                    buttonNextQuestion.setDisabled(true);
                    // * проверим правильность ответа
                    function getCheckedAnswer(element, index, array) {
                        if (element.checked)
                            checkedAnswerId = element.inputValue;
                    }
                    arrayAnswers.forEach(getCheckedAnswer);
                    if(checkedAnswerId){
                        function findRecordAnswer(rec, id) {
                            if(rec.get('rownum') == rownum &&
                                rec.get('answerid') == checkedAnswerId){
                                return true;
                            }
                        }
                        var checkedAnswerIndex = storeCard.findBy(findRecordAnswer);
                        if(checkedAnswerIndex != -1){
                            var checkedAnswerRec = storeCard.getAt(checkedAnswerIndex);
                            correct = checkedAnswerRec.get('correct');
                        }
                    }
                    // * сохраним результат
                    this.saveResult(questionId, correct);
                    // * прогресс - ответ
                    if (correct == 1){
                        rightAnswersAmount++;
                        textAnswer.setValue(correctString);
                        textAnswer.setFieldStyle(colorStatusTextReg);
                    }else{
                        textAnswer.setValue(uncorrectString);
                        textAnswer.setFieldStyle(colorStatusTextUnreg);
                    }
                    // * отсроченный показ следующего билета
                    taskDelayShowNewQuestion.delay(2000);
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
    // * показ 1-го вопроса после загрузки стора билетов
    onStoreCardLoad: function (storeCard) {
        console.log('onStoreCardLoad');

        // * проверим, что в билете необходимое число вопросов
        var maxRownum = this.getStoreMaxValue(storeCard, 'rownum'); //* число вопросов в билете
        if (maxRownum != questionAmount){
            errorMessage('Ошибка генерации билета', 'Не верное число вопросов в билете. Нужно: ' + questionAmount + ', сгенерировано: ' + maxRownum);
        }else{
            this.showCard(1);
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
    },
    // * смена вопросов и ответов
    showCard: function (num) {
        var storeCard = Ext.data.StoreManager.lookup('user.CardS');
        storeCard.clearFilter();
        var panelTest = this.getPanelTest(),
            panelCard = panelTest.down('#panelCard'),// * билет
            questionAccordion = panelCard.down('#questionAccordion'),
            answerAccordion = panelCard.down('#answerAccordion'),
            question = panelCard.down('#question'), // * поле внутри аккордиона Вопрос
            textQuestion = panelTest.down('#textQuestion'), // * Прогресс - Вопрос
            textAnswer = panelTest.down('#textAnswer'),
            questionText = storeCard.findRecord('rownum', num).get('questiontext'); //* текст вопроса
        // * вопросы
        question.setValue(questionText);
        questionAccordion.setTitle('Вопрос №' + num);
        textAnswer.reset();
        textQuestion.setValue(num + ' / ' + questionAmount);
        questionNumber = num;
        // * ответы
        answerAccordion.removeAll(true);
        storeCard.filter(function (rec) {
            if (rec.get('rownum') == num)
                return true;
        });
        storeCard.each(function (r) {
            var answerId = r.get('answerid'),
                answerText = r.get('answertext');
            answerAccordion.add(
                {
                    boxLabel  : answerText,
                    inputValue: answerId
                }
            );
        });
        panelCard.show();
    },
    showNextQuestion : function (panelCard, buttonNextQuestion) {
        if (questionNumber < questionAmount) {
            //* следующий вопрос
            buttonNextQuestion.setDisabled(false);
            this.showCard(questionNumber + 1);
        } else {
            //* отображаем результат в прогрессе
            var panelTest = Ext.ComponentQuery.query('panelTest')[0],
                textResult = panelTest.down('#textResult');
            if(rightAnswersAmount >= passAmount){ // * экзамен сдан
                textResult.setValue(passString);
                textResult.setFieldStyle(colorStatusTextReg);
                this.saveToClass(1);
            }else{
                textResult.setValue(unpassString);
                textResult.setFieldStyle(colorStatusTextUnreg);
                this.saveToClass(0);
            }
        }
    },
    // * сохранить в базу ответ пользователя
    saveResult : function (questionId, correct) {
        var panelTest = Ext.ComponentQuery.query('panelTest')[0],
            comboExam = panelTest.down('#comboExam'),
            examid = comboExam.getValue();
        Ext.Ajax.request({
            url: 'php/user/saveCard.php?examid=' + examid
                + '&questionid=' + questionId
                + '&correct=' + correct,
            success: function (response, options) {

            },
            failure: function () {
                errorMessage('Ошибка подключения к базе','Ответ не сохранен в базу');
            },
            scope: this
        });
    },
    // * сохранение результата в таблицу class
    saveToClass : function (result) {
        var panelTest = Ext.ComponentQuery.query('panelTest')[0],
            comboExam = panelTest.down('#comboExam'),
            examid = comboExam.getValue();
        Ext.Ajax.request({
            url: 'php/user/saveClass.php?examid=' + examid
                + '&balls=' + rightAnswersAmount
                + '&result=' + result,
            success: function (response, options) {

            },
            failure: function () {
                errorMessage('Ошибка подключения к базе','Результат экзамена не сохранен в базу');
            },
            scope: this
        });
    }

});