var tQuestion=Ext.create('Ext.tab.Panel', 
{
	height:(window.innerHeight-103),
	autoDestroy:false,
	items: 
	[
		{
			title:'Вопросы',
			//icon:'icons/add2.ico',
			tooltip:'Добавление новых вопросов, внесение изменений',
			items:
			[
				cSubject,gQuestion
			]
		},
		{
			title:'Загрузка...',
			//icon:'icons/ok2.ico',
			tooltip:'Импортировать-экспортировать вопросы',
			items:[]
		}
	]
});