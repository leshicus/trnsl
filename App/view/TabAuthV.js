Ext.define('App.view.TabAuthV', {
    extend: 'Ext.form.Panel',
    alias: 'widget.tabAuth',
    itemId: 'tabAuth',
    title: 'Авторизация',
    url: 'php/auth.php',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        console.log('TabAuthV init');

        var textLogin = {
                xtype: 'textfield',
                itemId: 'textLogin',
                name: 'textLogin',
                allowBlank: false,
                afterLabelTextTpl: required,
                fieldLabel: 'Логин'
            },
        /*textFamily = {
         xtype: 'textfield',
         itemId: 'textFamily',
         name: 'textFamily',
         //allowBlank: false,
         fieldLabel: 'Фамилия'
         },
         textName = {
         xtype: 'textfield',
         itemId: 'textName',
         name: 'textName',
         //allowBlank: false,
         fieldLabel: 'Имя'
         },
         textLastname = {
         xtype: 'textfield',
         itemId: 'textLastname',
         name: 'textLastname',
         fieldLabel: 'Отчество'
         },
         comboSpeciality = {
         xtype: 'combo',
         store: 'manage.GridSpecS',
         itemId: 'comboSpeciality',
         name: 'comboSpeciality',
         queryMode: 'local',
         editable: false,
         valueField: 'specid',
         displayField: 'specname',
         //allowBlank: false,
         fieldLabel: 'Специальность'
         },*/
            comboSystem = {
                xtype: 'combo',
                store: dataSystem,
                itemId: 'comboSystem',
                name: 'comboSystem',
                queryMode: 'local',
                editable: false,
                value:1,
                valueField: 'id',
                displayField: 'name',
                allowBlank: false,
                afterLabelTextTpl: required,
                fieldLabel: 'Подсистема'
            },
            textPassword = {
                xtype: 'textfield',
                itemId: 'textPassword',
                name: 'textPassword',
                inputType: 'password',
                fieldLabel: 'Пароль',
                allowBlank: false,
                afterLabelTextTpl: required
                //style: 'margin-top:15px'
            },
        // TODO сделать валидацию на поля, в т.ч. на пароли
            textOldPassword = {
                xtype: 'textfield',
                itemId: 'textOldPassword',
                name: 'textOldPassword',
                inputType: 'password',
                fieldLabel: 'Старый пароль'
            },
            textNewPassword = {
                xtype: 'textfield',
                itemId: 'textNewPassword',
                name: 'textNewPassword',
                inputType: 'password',
                fieldLabel: 'Новый пароль'
            },
            buttonChangePas = {
                xtype: 'button',
                text: 'Поменять',
                anchor: '20%',
                action: 'changepassword'

                //fieldLabel: '&nbsp;',
                //labelSeparator: ''
            },
            fieldsetChangePas = Ext.create('Ext.form.FieldSet', {
                xtype: 'fieldset',
                title: 'Смена пароля',
                itemId: 'fieldsetChangePas',
                padding:'5 5 5 5',
                margin:'10 0 0 0',
                //style: { textAlign: 'center', width: '100px' },
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                items: [
                    textOldPassword,
                    textNewPassword,
                    buttonChangePas
                ]
            });
        /*fieldsetUser = Ext.create('Ext.form.FieldSet', {
         xtype: 'fieldset',
         title: 'Идентификация по ФИО',
         itemId: 'fieldsetUser',
         defaults: {
         anchor: '100%',
         labelWidth: 120
         },
         items: [
         textFamily,
         textName,
         textLastname,
         comboSpeciality
         ]
         }),
         fieldsetAuth = Ext.create('Ext.form.FieldSet', {
         xtype: 'fieldset',
         title: 'Идентификация по логину',
         itemId: 'fieldsetAuth',
         defaults: {
         anchor: '100%',
         labelWidth: 120
         },
         items: [
         comboSystem,
         textLogin,
         textPassword
         ]
         });*/

        this.items = [
            /*fieldsetUser,
             fieldsetAuth*/
            comboSystem,
            textLogin,
            textPassword,
            fieldsetChangePas
        ];

        this.buttons = [
            {
                text: 'Вход',
                action: 'enter'
            },
            {
                text: 'Очистить',
                action: 'refresh'
            }/*,
             { xtype: 'tbspacer', width: 150 }*/
        ];

        this.callParent(arguments);
        console.log('TabAuthV end');
    }
});