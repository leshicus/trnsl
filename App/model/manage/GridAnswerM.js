Ext.define('App.model.manage.GridAnswerM', {
    extend:'Ext.data.Model',
    fields:[
        {name: 'answerid'},
        {name: 'answertext'},
        {name: 'questionid'},
        {name: 'correct',type:'bool'},
        {name: 'normdoc'}
    ]
});