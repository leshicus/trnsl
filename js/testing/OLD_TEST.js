Ext.onReady(function()
{
Ext.QuickTips.init();    
// setup the state provider, all state information will be saved to a cookie
Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
Ext.util.CSS.swapStyleSheet("theme","../../ext-4.1.1/resources/css/ext-all-gray-debug.css");
/******************************************************************************/
var body=Ext.getBody();
var group;
var fio;
Ext.Ajax.request(
{
    url: 'php/get_fio.php',
    success: function(response)
    {
        fio = response.responseText;
        Ext.getCmp('fio_id').update('<b>ФИО: </b>' + fio + '<br/>');
    }
});
Ext.Ajax.request(
{
    url: 'php/get_group.php',
    success: function(response)
    {
        group = response.responseText;
        Ext.getCmp('groid').update('<b>Группа: </b>'+ group + '<br/>');
    }
});
Ext.Ajax.request(
{
    url: 'php/get_kurs.php',
    success: function(response)
    {
        kurs = response.responseText;
        Ext.getCmp('kurs').update('<b>Курс: </b>'+ kurs + '<br/>');
		Ext.getCmp('pbar2').reset(true);
    }
});



/*************Menu********************************************************/
var main_tab = Ext.create('Ext.tab.Panel', {
    height: (window.innerHeight - 59),//515,
	frame:true,
	autoDestroy:false,
	id: 'main-tab',
	name: 'main-tab',
	bbar:
	[
		{
			xtype: 'progressbar',
			id:'pbar',
			width: 150,
			hidden:true
		},
		{
			xtype:'button',
			text: 'завершить тест',
			icon:'icons/finish.ico',
			handler:function(btn)
			{
				//btn.setDisabled(true);
				Ext.getCmp('pbar').setVisible(true);
				Ext.getCmp('pbar').wait({
					interval: 200,
					increment: 10,
					text: 'Обработка...',
					scope: this
				});
				
				var qids = '';
				var aids = '';
				var time = Ext.getCmp('time').getValue();
				for(var i = 0; i < store_q.getCount(); i++)
				{
					var type = store_q.getAt(i).data['QUESTION_TYPE'];
					
					qids+= store_q.getAt(i).data['QUESTION_ID'] + '_';
					if( type == '0' )
					{
						if(Ext.getCmp('answer_group' + (i + 1)).getChecked().length != 0)
						{
							aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[0].inputValue + '_';
						}
						else
						{
							aids+='1_';
						}
					}
					else
					{
						var n = Ext.getCmp('answer_group' + (i + 1)).getChecked().length;
						for(var j = 0; j < n; j++)
						{
							if( j == n - 1)
							{ 
								aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[j].inputValue;
							}
							else
							{
								aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[j].inputValue + '-';
							}
						}
						aids+="_";
					}
				}
				
				Ext.Ajax.request(
				{
					url: 'php/insert_ua.php?qids=' + qids + '&aids=' + aids + '&atime=' + time,
					success: function(response)
					{
						var arr = response.responseText.split('_');
						Ext.getCmp('central-region-content').removeAll(false);
						Ext.getCmp('central-region-content').add(
							{
								xtype: 'displayfield',
								fieldLabel: 'Статус:',
								name: 'status',
								id: 'status',
								value: 'Тест пройден',
								margin:10
							},
							{
								xtype: 'displayfield',
								fieldLabel: 'Получено баллов:',
								name: 'balls',
								id: 'balls',
								value: arr[0],
								margin:10
							},
							{
								xtype: 'displayfield',
								fieldLabel: 'Максимум баллов:',
								name: 'max',
								id: 'max',
								value: arr[3],
								margin:10
							},
							{
								xtype: 'displayfield',
								fieldLabel: 'Правильных ответов:',
								name: 'right',
								id: 'right',
								value: arr[1],
								margin:10
							},
							{
								xtype: 'displayfield',
								fieldLabel: 'Неправильных ответов:',
								name: 'wrong',
								id: 'wrong',
								value: arr[2],
								margin:10
							}
						);
						Ext.getCmp('pbar').reset(true);
					}
				});
				
				Ext.TaskManager.stop(task);
				Ext.getCmp('time').setValue('-:-');
				//store_tree.load();
				grid.store.load();
			}
		}
	]
});

var menu = Ext.create('Ext.menu.Menu', {
    margin: '0 0 0 0',
    padding: '0 0 0 0',
    plain:true,
    floating: false, 
    frame:true,
    items: 
    [
        {
            text: 'Тестирование',
            icon:'images/right.ico',
            handler:function()
			{
				var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Тестирование');
				main_content.removeAll(false);
				combo_tests.clearValue();
				main_content.add(
					[
						combo_tests,
						{
							xtype: 'button',
							id: 'bStart',
							text: 'Начать тестирование',
							icon:'icons/start.ico',
							margin: 10,
							disabled:true,
							handler: function()
							{
								var time2 = Ext.getCmp('time').getValue();
								task = 
								{
									run: function()
									{
										var time = Ext.getCmp('time').getValue();
										time--;
										Ext.getCmp('time').setValue(time);
										if(time == 0)
										{
											Ext.Msg.alert('Предупреждение', 'Время вышло. Ваши ответы будут учтены!');
											var qids = '';
											var aids = '';
											var time = Ext.getCmp('time').getValue();
											for(var i = 0; i < store_q.getCount(); i++)
											{
												var type = store_q.getAt(i).data['QUESTION_TYPE'];
												
												qids+= store_q.getAt(i).data['QUESTION_ID'] + '_';
												if( type == '0' )
												{
													if(Ext.getCmp('answer_group' + (i + 1)).getChecked().length != 0)
													{
														aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[0].inputValue + '_';
													}
												}
												else
												{
													var n = Ext.getCmp('answer_group' + (i + 1)).getChecked().length;
													for(var j = 0; j < n; j++)
													{
														if( j == n - 1)
														{ 
															aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[j].inputValue;
														}
														else
														{
															aids+=Ext.getCmp('answer_group' + (i + 1)).getChecked()[j].inputValue + '-';
														}
													}
													aids+="_";
												}
											}
											
											Ext.Ajax.request(
											{
												url: 'php/insert_ua.php?qids=' + qids + '&aids=' + aids + '&atime=' + time,
												success: function(response)
												{
													var arr = response.responseText.split('_');
													Ext.getCmp('central-region-content').removeAll(false);
													Ext.getCmp('central-region-content').add(
														{
															xtype: 'displayfield',
															fieldLabel: 'Статус:',
															name: 'status',
															id: 'status',
															value: 'Тест пройден',
															margin:10
														},
														{
															xtype: 'displayfield',
															fieldLabel: 'Получено баллов:',
															name: 'balls',
															id: 'balls',
															value: arr[0],
															margin:10
														},
														{
															xtype: 'displayfield',
															fieldLabel: 'Максимум баллов:',
															name: 'max',
															id: 'max',
															value: arr[3],
															margin:10
														},
														{
															xtype: 'displayfield',
															fieldLabel: 'Правильных ответов:',
															name: 'right',
															id: 'right',
															value: arr[1],
															margin:10
														},
														{
															xtype: 'displayfield',
															fieldLabel: 'Неправильных ответов:',
															name: 'wrong',
															id: 'wrong',
															value: arr[2],
															margin:10
														}
													);
												}
											});
											
											Ext.TaskManager.stop(task);
											Ext.getCmp('time').setValue('-:-');
											grid.store.load();
										}
									},
									interval: 60000, //1 минута
									duration: time2 * 60000
								}
								//time--;
								Ext.TaskManager.start(task);
								
								curent_question = 1;
								main_content.removeAll(false);
								main_tab.removeAll(false);
								main_content.add(
									[
										main_tab
									]);
								
								
								while(curent_question <= store_q.getCount())
								{
									main_tab.add(
									[
											{
												title:curent_question,
												id:'tab' + curent_question
											}
									]
									);
									Ext.getCmp('tab' + curent_question).removeAll(false);
									Ext.getCmp('tab' + curent_question).add(
									[
										{
												xtype:'panel',
												id: 'qDetail' + curent_question,
												bodyPadding: 10,
												html: ''
										},
										{
												xtype:'panel',
												id: 'iPanel' + curent_question,
												bodyPadding: 10,
												hidden:true,
												html: ''
										}
									]);
									
									Ext.getCmp('qDetail' + curent_question).update(store_q.getAt(curent_question-1).data['QUESTION_TEXT']);
									
									var type = store_q.getAt(curent_question-1).data['QUESTION_TYPE'];
									
									if(type == '0')
									{
										Ext.Ajax.request(
										{
											url: 'php/get_image.php?qid=' + store_q.getAt(curent_question-1).data['QUESTION_ID'] + '&curqid=' + curent_question,
											success: function(response)
											{
												if(response.responseText != 0)
												{
													var arr = response.responseText.split('_');
													//Ext.getCmp('tab' + arr[1]).removeAll(false);
													Ext.getCmp('iPanel' + arr[1]).add(
													{
														xtype: 'image',
														id:'qimage' + arr[1],
														width:200,
														height:200,
														margin: 10
													}
													);
													Ext.getCmp('iPanel' + arr[1]).setVisible(true);
													Ext.getCmp('qimage' + arr[1]).setSrc('php/image2.php?media='  + arr[0]);
												}
												
											}
										});
										
										Ext.getCmp('tab' + curent_question).add(
											{
												xtype: 'radiogroup',
												fieldLabel: 'Выберите ответ',
												//defaultType: 'radiofield',
												id: 'answer_group' + curent_question,
												columns: 1,
												vertical: true,
												margin:10,
												listeners: {
													change: function ( rg, newValue, oldValue, eOpts) 
													{
														//rg.up().setTitle('+');
														rg.up().setIcon('icons/radio.ico');
													}/*,
													afterrender:function()
													{
														Ext.getCmp('pbar').reset(true);
													}*/
												}
											}
										);

										Ext.Ajax.request(
										{
											url: 'php/get_answer.php?qid=' + store_q.getAt(curent_question-1).data['QUESTION_ID'] + '&curqid=' + curent_question,
											success: function(response)
											{
												
												var array = new Array();
												var k = 1;
												var l = 0;
												array = response.responseText.split('_');
												
												for(var j = 0; j < (array.length - 1) / 2; j++)
												{
													Ext.getCmp('answer_group' + array[array.length - 1]).add(
													{ 
														boxLabel: array[j + k],
														name: 'rb' + array[array.length - 1],
														inputValue: array[j + l]
													});
													k++;
													l++;
												}
												
											}
											
										});
									}
									else// if(type == '1')
									{
										Ext.Ajax.request(
										{
											url: 'php/get_image.php?qid=' + store_q.getAt(curent_question-1).data['QUESTION_ID'] + '&curqid=' + curent_question,
											success: function(response)
											{
												if(response.responseText != 0)
												{
													var arr = response.responseText.split('_');
													//Ext.getCmp('tab' + arr[1]).removeAll(false);
													Ext.getCmp('iPanel' + arr[1]).add(
													{
														xtype: 'image',
														id:'qimage' + arr[1],
														width:200,
														height:200,
														//src:'php/image2.php?media=' + arr[0],
														margin: 10
													}
													);
													Ext.getCmp('iPanel' + arr[1]).setVisible(true);
													Ext.getCmp('qimage' + arr[1]).setSrc('php/image2.php?media='  + arr[0]);
												}
												
											}
										});
									
										Ext.getCmp('tab' + curent_question).add(
											{
												xtype: 'checkboxgroup',
												fieldLabel: 'Выберите ответ',
												//defaultType: 'radiofield',
												id: 'answer_group' + curent_question,
												columns: 1,
												vertical: true,
												margin:10,
												listeners: {
													change: function ( cg, newValue, oldValue, eOpts) 
													{
														//cg.up().setTitle('');
														cg.up().setIcon('icons/checkbox.ico');
													}/*,
													afterrender:function()
													{
														Ext.getCmp('pbar').reset(true);
													}*/
												}
											}
										);

										Ext.Ajax.request(
										{
											url: 'php/get_answer.php?qid=' + store_q.getAt(curent_question-1).data['QUESTION_ID'] + '&curqid=' + curent_question,
											success: function(response)
											{
												
												var array = new Array();
												var k = 1;
												var l = 0;
												array = response.responseText.split('_');
												
												for(var j = 0; j < (array.length - 1) / 2; j++)
												{
													Ext.getCmp('answer_group' + array[array.length - 1]).add(
													{ 
														boxLabel: array[j + k],
														name: 'rb' + array[array.length - 1],
														inputValue: array[j + l]
													});
													k++;
													l++;
												}
												
											}
											
										});
									}
									/*else
									{
										Ext.getCmp('tab' + curent_question).add(
											{
												xtype: 'textfield',
												fieldLabel: 'Введите ответ',
												//defaultType: 'radiofield',
												id: 'answer_group' + curent_question,
												margin: 10
											}
										);
									}*/
									curent_question++;
								}
								main_tab.setActiveTab('tab1');
							}
						}
					]
				);
			}
        },
        {
            text: 'Результаты',
            icon:'images/right.ico',
            handler:function()
            {
				var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Архив');
				main_content.removeAll(false);
                main_content.add(
					[
						grid
					]
				);
				grid.store.load();
            }   
        },
        {
            text: 'Материалы для подготовки',
            icon:'images/right.ico',
            handler:function()
            {
				var main_content=Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Материалы');
				main_content.removeAll(false);
                main_content.add(
					[
						gFiles
					]
				);
				gFiles.store.load();
            }   
        }
    ]
});


/**********Main Panel***********************************************************/

Ext.create('Ext.panel.Panel', {
    //draggable:true,
	autoDestroy:false,
    //collapsible:true,
    height: window.innerHeight,//600,
    //flex:1,
    //margin:'40 150 40 150',
   // title: 'Система тестирования знаний',
    layout: 'border',
    /*tools:
    [
        {
            type:'refresh',
            tooltip: 'Обновить',
            // hidden:true,
            handler: function(event, toolEl, panel)
            {
                // refresh logic
				document.location.reload();
            }
        }
    ],*/
    items: 
    [
        {
            title: 'Меню',
            region:'west',
            xtype: 'panel',
            frame:true,
            margins: '5 5 5 5',
            width: 200,
            collapsible: true,   // make collapsible
            id: 'menu',
            //layout: 'fit',
            items: [
                        menu,
						{
							xtype:'panel',
                            margin: '10 0 0 0',
                            frame:true,
							layout:'table',
							columns:2,
							items:
							[
								{
									xtype: 'displayfield',
									fieldLabel: 'Время',
									name: 'time',
									id: 'time',
									value: ' - : - ',
									margin:'0 0 5 0'
								}, 
								{
									xtype: 'displayfield',
									margin:'0 0 5 5',
									value: '   мин. '
								}
							]
						},
                        {
                            xtype:'panel',
                            margin: '10 0 0 0',
                            frame:true,
                            title: 'Информация о пользователе',
                            items:
                            [
                                /*{
                                     xtype:'image',
                                     width:150,
                                     height:190,
                                     src:'php/image.php',
                                     margin:'10 10 10 15'
                                 },*/
								{
									xtype: 'progressbar',
									id:'pbar2',
									width: 170,
									margin: '0 0 0 5',
									listeners:
									{
										afterrender:function(pbar)
										{
											pbar.wait({
												interval: 200,
												increment: 10,
												text: 'Подождите...',
												scope: this
											});
										}
									}
								},
                                {
                                    xtype: 'label',
                                    id:'fio_id',
                                    margin: '0 0 0 5'
                                },
                                {
                                    xtype: 'label',
                                    id:'groid',
                                    margin: '5 0 0 5'
                                },
                                {
                                    xtype: 'label',
                                    id:'kurs',
                                    margin: '5 0 0 5'
                                }
                            ]
                        }
                   ]  
        },
        {
            title: 'Главная',
            region: 'center',     // center region is required, no width/height specified
            xtype: 'panel',
            frame:true,
            //layout: 'fit',
            margins: '5 5 5 0',
            id:'center-region',
            items:
            [
                {
					xtype:'panel',
					id:'central-region-content',
					name:'main',
					height:(window.innerHeight - 49),//526,
					frame:true,
					items:
					[
						{
							xtype:'label',
							html:'<b style="font-size:16px;">Здравствуйте! </b><br/>' + '<p style = "padding:10px;font-size:14px;">Для прохождения теста перейдите на вкладку Меню->Тестирование выберите тест и нажмите кнопку Начать тестирование.</p>' + '<p style = "padding-left:10px;font-size:14px;">Для просмотра результатов Ваших тестов перейдите во вкладку Меню->Архив.</p>' /*+ '<p style = "padding-left:10px;">.</p>'*/
						}
					]
				}
                
            ]
        }
    ],
    renderTo: body
});  


});