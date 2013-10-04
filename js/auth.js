Ext.onReady(function()
{
	Ext.QuickTips.init();    
	//setup the state provider, all state information will be saved to a cookie
	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
	var fpIdentification=Ext.create('Ext.form.Panel', 
	{
		bodyPadding:5,
		border:0,
		/*style: 
		{
			borderColor:'white',
			borderStyle:'solid'
		},*/
		// Fields will be arranged vertically, stretched to full width
		layout:'anchor',
		defaults:
		{
			anchor:'100% 100%'
		},
		// The fields
		defaultType:'textfield',
		items: 
		[
			{
				fieldLabel:'Фамилия',
				name:'surname',
				allowBlank:false
			},
			{
				fieldLabel:'Имя',
				name:'name',
				allowBlank:false
			},
			{
				fieldLabel:'Отчество',
				name:'patronymic',
				allowBlank:false
			},
			{
				xtype:'combo',
				fieldLabel:'Пол',
				name:'gender',
				store:sGender,
				queryMode:'local',
				displayField:'sex',
				valueField:'sex',
				value:'Мужской',
				editable:false
			}
		],
		//Reset and Submit buttons
		buttons: 
		[
			{
				text:'Сброс',
				handler:function() 
				{
					this.up('form').getForm().reset();
				}
			},
			{
				text:'Войти в систему',
				formBind:true,//only enabled once the form is valid
				disabled:true,
				handler:function() 
				{
					var form=this.up('form').getForm();
					if (form.isValid()) 
					{
						form.submit({
							url:'php/identification.php',
							success:function(form,action)
							{
								Ext.Msg.alert('Success',action.result.msg);
							},
							failure: function(form,action) 
							{
								Ext.Msg.alert('Failed',action.result.msg);
							}
						});
					}
				}
			}
		]
	});
	
	var fpRegistration=Ext.create('Ext.form.Panel', 
	{
		bodyPadding:5,
		border:0,
		/*style: 
		{
			borderColor:'white',
			borderStyle:'solid'
		},*/
		// Fields will be arranged vertically, stretched to full width
		layout:'anchor',
		defaults:
		{
			anchor:'100% 100%'
		},
		// The fields
		defaultType:'textfield',
		items: 
		[
			{
				fieldLabel:'Фамилия',
				name:'surname',
				allowBlank:false
			},
			{
				fieldLabel:'Имя',
				name:'name',
				allowBlank:false
			},
			{
				fieldLabel:'Отчество',
				name:'patronymic',
				allowBlank:false
			},
			{
				xtype:'combo',
				fieldLabel:'Пол',
				name:'gender',
				store:sGender,
				queryMode:'local',
				displayField:'sex',
				valueField:'sex',
				value:'Мужской',
				editable:false
			}
		],
		//Reset and Submit buttons
		buttons: 
		[
			{
				text:'Сброс',
				handler:function() 
				{
					this.up('form').getForm().reset();
				}
			},
			{
				text:'Зарегистрироваться',
				formBind:true,//only enabled once the form is valid
				disabled:true,
				handler:function() 
				{
					var form=this.up('form').getForm();
					if (form.isValid()) 
					{
						form.submit({
							url:'php/registration.php',
							success:function(form,action)
							{
								Ext.Msg.alert('Success',action.result.msg);
							},
							failure: function(form,action) 
							{
								Ext.Msg.alert('Failed',action.result.msg);
							}
						});
					}
				}
			}
		]
	});
	var tab_tests = Ext.create('Ext.tab.Panel', 
	{
		height:300,
		width:400,
		renderTo:'auth',
		items: 
		[
			{
				title:'Авторизация',
				icon:'img/identification.ico',
				tooltip:'Вход в систему',
				items:
				[fpIdentification]
			},
			{
				title:'Регистрация',
				icon:'img/registration.ico',
				tooltip:'Создание аккаунта',
				items:
				[fpRegistration]
			}
		]
	});
	
});