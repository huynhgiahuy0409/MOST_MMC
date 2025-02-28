Ext.define('MOST.view.controller.staffandequipment.StaffAndEquipmentManPower', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffandequipmentmanpower',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout:'fit',
	
	initComponent: function() {
		var me = this;
		var rowStaffEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'staffManPowerGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				edit: 'onStaffListEdit'
			}
		});
			
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
						{
			            	xtype:'fieldset',
			            	autoScroll:true,
			            	layout:{
			            		type:'vbox',
			            		align:'stretch'
			            	},
			            	title:'Mega Summary',
			            	flex:0.30,
			            	margin:'0 0 5 0',
			            	items:[
			            		{
				                    xtype: 'tsb-datagrid',
									reference: 'refMegaGrid',
									usePagingToolbar : false,
				    				stateful : true,
				    				stateId : 'stateStaffAndEquipManPowerMegaGri',
				    				flex:1,
				    				plugins: [
				    	    		],
				    	    		bind: {
				    	    			store: '{megaSumList}'
				    	    		},
				    	    		selModel: {
				    					cellSelect: false
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('StaffAndEquipManPowerMega')
				                    }
						        },{
				                    xtype: 'tsb-datagrid',
									reference: 'refMegaSumOprGrid',
									usePagingToolbar : false,
				    				stateId : 'stateMegaSumOprInStaffAndEquipmentGrid',
				    				stateful : true,
				    				flex:1,
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{megaSumOperatorList}'
				    	    		},
				    	    		selModel: {
				    					cellSelect: false
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('MegaSumOprInStaffAndEquipment')
				                    }
						        },{
				                    xtype: 'tsb-datagrid',
									reference: 'refMegaRemarkGrid',
									usePagingToolbar : false,
				    				stateful : true,
				    				stateId : 'stateMegaRemarkInStaffAndEquipmentGrid',
				    				flex:1,
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{megaRemarkList}'
				    	    		},
				    	    		selModel: {
				    					cellSelect: false
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('MegaRemarkInStaffAndEquipment')
				                    }
						        }
						    ]
						},{
					        xtype: 'splitter',
					        margin : '13 0 7 0',
					        collapseOnDblClick: false,
					        width: 3
						},{
							xtype:'fieldset',
							layout:{
			            		type:'vbox',
			            		align:'stretch'
							},
							title:'Staff List in Roster',
							flex:0.28,
							margin:'0 0 2 0',
							items:[
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 0 2 0',								
									},
									items:[
										{
											xtype: 'radiogroup',	
											reference: 'rdgRoster',
											cls: 'x-check-group-alt',
											listeners:{
												change:'onSelectStaffGroup'
											},
											items: [
												{
													xtype: 'radiofield',
													reference: 'refStfRadio',
													boxLabel: ViewUtil.getLabel('staff'),
													inputValue: 'STF',
													name: 'rdgRoster',
													checked: 'true'
												},{
													xtype: 'radiofield',
													reference: 'refGrpRadio',
													margin: '0 0 0 15',
													boxLabel: ViewUtil.getLabel('group'),
													name: 'rdgRoster',
													inputValue : 'GRP'
												},
											]														
										},{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											flex : 1,
											items:[
												{
													xtype: 'combobox',
													reference: 'refGroupCbo',
													queryMode:'local',
													value:'Select All',
													margin : '0 5 0 0',
													flex : 1,
													emptyText: '--Select All--',
													listeners:{
														select:'onSelectGroup'
													},
													displayField: 'groupNm',
													valueField: 'groupCd',									
													filter: 'string',
													editable: false,
													matchFieldWidth: true,
													bind: {store: '{comboGroupRosterList}'}
												}
											]
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 5 2 0',								
									},
									items:[
										{
											xtype: 'combobox',	
											reference: 'refCboRole',
											fieldLabel: ViewUtil.getLabel('staffRole'),
											queryMode:'local',
											value:'Select All',
											emptyText: '--Select All--',
											bind:{
												store: '{allRoleList}'
											},
											listeners:{
												select:'onSelectStaffRole'
											},
											displayField: 'roleCdNm',
											valueField: 'roleCd',								
											filter: 'string',
											editable: false,
											matchFieldWidth: true,
											labelWidth:80,
											flex : 1,
											labelAlign: 'right'
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 5 2 0',								
									},
									items:[
										{
											xtype: 'textfield',
											align: 'left',
											reference: 'ctlWorkingArea',
											fieldLabel: ViewUtil.getLabel('workingArea'),
											labelWidth:80,
											flex : 1,
											labelAlign: 'right',
											editable: true,
											matchFieldWidth: true,
											displayField: 'cd',
											valueField: 'cd',
											emptyText:'--Select--',
											triggers: {
												someField: {
													cls: 'fa-search',
													scope: 'controller',
													handler: 'onSearchTriggerClick'
												}
											},
											listeners:{
												change: function(field, newValue){
													field.setValue(newValue.toUpperCase());
												}
											}
										}
									] 
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 0 2 0',								
									},
									items:[
										{
											xtype: 'datetimefield',
											reference: 'ctlStartTime',
											fieldLabel: ViewUtil.getLabel('startTime'),
											labelWidth: 80,
											width: 260,
											labelAlign: 'right',
											editable: true,
											matchFieldWidth: false,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										}
									] 
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 0 2 0',								
									},
									items:[
										{
											xtype: 'datetimefield',
											reference: 'ctlEndTime',
											fieldLabel: ViewUtil.getLabel('endTime'),
											labelWidth: 80,
											width: 260,
											labelAlign: 'right',
											editable: true,
											matchFieldWidth: false,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										}
									] 
								},{
									xtype: 'container',
									margin: '0 0 0 10',
									layout:{
										type: 'hbox'
									},
									items:[
										{
											xtype: 'checkbox',
											reference: 'changeShiftbtn',
											boxLabel: ViewUtil.getLabel('changeShift'),
											cls: 'segmented-btn-disable',
											disabled: true
										},{
											xtype: 'checkbox',
											margin: '0 0 0 10',
											reference: 'refCheckWorkingInLunchTime',
											boxLabel: ViewUtil.getLabel('workingInLunchTime'),
										}
									]
								},{
									xtype: 'radiogroup',
									reference: 'rdgHandling',
									cls: 'x-check-group-alt',
									fieldLabel: ViewUtil.getLabel('handlingMode'),
									items: [
										{
											xtype: 'radiofield',
											reference: 'refRadioHI',
											boxLabel: ViewUtil.getLabel('hi'),
											inputValue: 'HI',
											name: 'rdgHandling',
											checked: 'true'
										},{
											xtype: 'radiofield',
											reference: 'refRadioHO',
											boxLabel: ViewUtil.getLabel('ho'),
											name: 'rdgHandling',
											inputValue: 'HO'
										},{
											xtype: 'radiofield',
											reference: 'refRadioBoth',
											boxLabel: ViewUtil.getLabel('both'),
											name: 'rdgHandling',
											inputValue: 'Both'
										}
									]	
								},{
									xtype: 'tsb-datagrid',
									reference: 'refManPowerDetailGrid',
									usePagingToolbar : false,
				    				stateId : 'stateStaffAndEquipManPowerDetailGrid',
				    				stateful : true,
									flex: 1,
									plugins: [
										'gridexporter',
				    					'gridfilters',
				    					'clipboard'
									],
									margin:'0 0 0 0',
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										celldblclick: 'onAddStaffManPower'
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items:GridUtil.getGridColumns('StaffAndEquipManPowerDetail')
									}
								},{
									xtype: 'container',
									layout: {
										type:'hbox',
										align:'stretch'
									},
									margin: '5 0 0 5',								
									autoScroll:true,
									items:[
										{
											xtype: 'segmentedbutton',
											reference: 'toggleStaffType',
											defaults:{
												margin: '0 0 0 5',								
											},
											items:[
												{
													text: ViewUtil.getLabel('roster'),
													reference: 'btnToggleRoster',
													value: 'Ststaffs',
													pressed: true
												},{
													text: ViewUtil.getLabel('overtime'),
													reference: 'btnToggleOvertime',
													value: 'Exstaffs'
												},{
													text: ViewUtil.getLabel('office'),
													reference: 'btnToggleOffice',
													value: 'Othersstaffs'
												}
											],
											listeners: {
												toggle: 'onSelectStaffType'
											}
										}
									]
								}
							]
						},{
	    		    		xtype: 'splitter',
	    		    		width: 3,
	    		    		margin : '13 0 7 0',
	            			collapseOnDblClick: false
						},{
			            	xtype:'fieldset',
			            	layout:{
			            		type:'vbox',
			            		align:'stretch'
			            	},
			            	margin:'0 0 5 0',
			            	autoScroll:true,
			            	title:'Deployed Staff List',
			            	flex:0.43,
			            	items:[
								{
									xtype: 'tsb-datagrid',
									reference: 'refStaffManPowerGrid',
									usePagingToolbar : false,
				    				stateful : true,
				    				stateId : 'stateManPowerInStaffAndEquipmetnGrid',
				    				flex:1,
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		viewConfig: {
				    		            stripeRows: true,
				    		            enableTextSelection: true,		    		            
				    		        },
				    	    		bind: {
				    	    			store: '{vesselOperationDeployedStaffList}'
				    	    		},
				    	    		selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners: {
				    					cellDblclick: 'onStaffManPowerDblClick',
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('ManPowerInStaffAndEquipment')
				                    }
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'right',
										pack: 'end'
									},
									defaults:{
										margin: '5 0 0 3',								
									},
									items:[
										{
											xtype: 'container',
											height:32,
											width:20
										},{
											xtype: 'button',
											reference:'ctlMegaDetailAddForGears',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('add'),
											listeners: {
												click: 'onAddStaffManPower'
											}
										},{
											xtype: 'button',
											reference:'ctlMegaDetailUpdateForGears',
											ui: 'update-button',
											iconCls: 'fa fa-pencil-square-o',
											text: ViewUtil.getLabel('update'),
											listeners: {
												click: 'onUpdateStaffManPower'
											}
										},{
											xtype: 'button',
											iconCls: 'x-fa fa-plus',
											reference:'ctlMegaDetailAddListForGears',
											text: ViewUtil.getLabel('addList'),
											listeners: {
												click: 'onAddListStaffManPower'
											}
										},{
											xtype: 'button',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											reference:'ctlMegaDetailDeleteForGears',
											text: ViewUtil.getLabel('delete'),
											listeners: {
												click: 'onRemoveStaffManPower'
											}
										}								
									]
								}
							]
						}
		            ]
		        }
		    ]
		});
		
		me.callParent();
	}
});