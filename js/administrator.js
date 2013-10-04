Ext.onReady(function()
{
	Ext.QuickTips.init();
	//setup the state provider, all state information will be saved to a cookie
	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	var pInfo=Ext.create('Ext.panel.Panel',
	{
		autoDestroy:false,
		margin:10,
		border:0,
		html:'<p style="font-size:16px;font-weight:bold;color:gray;"> Добро пожаловать в Систему тестирования! </p>',
	}
	);
	var menu=Ext.create('Ext.toolbar.Toolbar',
	{
		border:0,
		defaults:
		{
			xtype:'button',
			scale:'large'
		},
		items:
		[
			{
				tooltip:'На главную',
				icon:'img/home2.ico',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([pInfo]);
				}
				
			},'-','-',
			{
				text:'Направления',
				icon:'img/direction.ico',
				tooltip:'Раздел работы с видами деятельности',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([gActivity]);
					gActivity.store.load();
				}
			},'-',
			{
				text:'Предметы',
				icon:'img/subject.ico',
				tooltip:'Раздел работы с предметной областью',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([gSubject,gDistribution]);
					gSubject.store.load();
					gDistribution.store.load();
				}
			},'-',
			{
				text:'Пользователи',
				icon:'img/users.ico',
				tooltip:'Раздел работы с пользователями',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([gUsers]);
				}
			},'-',
			{
				text:'Вопросы и ответы',
				icon:'img/question.ico',
				tooltip:'Раздел работы с вопросами и ответами',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([tQuestion]);
				}
			},'-',
			{
				text:'Материалы',
				icon:'img/files.ico',
				tooltip:'Раздел работы с материалами',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
				}
			},'-',
			{
				text:'Отчеты',
				icon:'img/reports.ico',
				tooltip:'Раздел работы с отчетами',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
				}
			}
		]
	});
	var pAdministrator=Ext.create('Ext.panel.Panel',//menu
	{
		id:'iPanel',
		border:0,
		autoScroll:true,
		title:'Администратор системы',
		width:'100%',
		height:'100%',
		tbar:
		[
			menu
		],
		items:
		[
			pInfo
		],
		tools:
		[
			{
				type:'refresh',
				tooltip:'Обновить страницу',
				handler: function(event,toolEl,panelHeader) 
				{
					document.location.reload();
				}
			},
			{
				type:'help',
				tooltip:'Информация',
				callback: function(panel,tool,event)
				{
					//console.log('help');
				}
			}
		],
		renderTo:Ext.getBody()
	});
});