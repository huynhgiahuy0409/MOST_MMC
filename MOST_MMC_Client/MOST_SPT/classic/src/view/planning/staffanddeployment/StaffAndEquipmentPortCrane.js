Ext.define('MOST.view.controller.staffandequipment.StaffAndEquipmentPortCrane', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffandequipmentportcrane',
	
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
		var rowStaffPortCraneEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'staffPortCraneGridEditor',
			listeners: {
				cancelEdit: 'onCOCancelEdit',				
				edit: 'onStaffPortCraneEdit'
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
							layout:{
								type:'vbox',
								align:'stretch'
							},
							margin:'0 0 5 0',
							autoScroll:true,
							title:'Mega Summary',
							flex:0.3,
							items:[
								{
									xtype: 'tsb-datagrid',
									reference: 'refStaffShipCraneGrid',
									usePagingToolbar : false,
									stateful : true,
									title:'Shore Crane',
									flex:.35,
									stateId : 'stateStaffShipCraneGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{megaSumShoreCraneList}'
									},
									selModel: {
										cellSelect: false
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items:GridUtil.getGridColumns('StaffShipCrane')			
									}
								},
								{
									xtype: 'tsb-datagrid',
									reference: 'refStaffPortCraneGrid',
									usePagingToolbar : false,
									stateful : true,
									title:'Port Crane/ Ship Crane',
									flex:.65,
									stateId : 'statePortCraneGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{megaSumPortAndShipCraneList}'
									},
									selModel: {
										cellSelect: false
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items:GridUtil.getGridColumns('StaffPortCrane')		
									}
								}
							]
						},{
					        xtype: 'splitter',
					        margin : '13 0 7 0',
					        width: 3,
					        collapseOnDblClick: false
					    },{
							xtype:'fieldset',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							flex:0.3,
							margin:'0 0 5 0',
							title: 'Equipment List',
							autoScroll: true,
							padding : '3 3 3 3',
							items:[						
								{
									xtype:'fieldset',
									padding : '5 5 5 5',
									margin : '0 0 2 0',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									items:[
										{
											xtype: 'radiogroup',
											reference: 'refRdgEquip',
											layout:{
												type: 'vbox',
												align:'stretch'
											},
											cls: 'x-check-group-alt',
											defaults:{
												margin: '3 0 0 0'
											},
											listeners:{
												change: 'onRdgEquipChange'
											},
											items:[									
												{
													xtype: 'container',
													layout: {
														type : 'hbox',
														align : 'stectch'
													},
													items: [
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('equipment'),
															width : 100,
															name: 'rdgEquip', 
															reference: 'refRdEq',
															inputValue: 'EQ'
														},{
															xtype: 'combobox',
															reference: 'refEqTypeCbo',
															displayField: 'scdNm',
															valueField: 'scd',
															flex : 1,
															queryMode:'local',
															editable: false,
															matchFieldWidth: true,
															disabled:true,
															listeners:{
																change: 'onSelectEquPortCrane'
															}
														}
													]
												},{
													xtype: 'container',
													layout: {
														type : 'hbox',
														align : 'stectch'
													},
													items: [
														{ 
															xtype: 'radiofield',
															boxLabel: 'Ship Crane', 
															name: 'rdgEquip',
															reference: 'refRdSc', 
															width : 100,
															inputValue: 'SC',
															listeners:{
																change: 'changePCRadio'
															}
														},{
															xtype: 'textfield',
															reference: 'refEqpQty',
															flex : 1,
															editable: false,
															disabled:true,
															matchFieldWidth: true,
														},{
															xtype: 'label',
															text: 'EA',
															margin: '10 0 0 5'
														}
													]
												},{ 
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('others'),
													height: 100,
													margin : '0 0 0 0',
													name: 'rdgEquip', 
													reference: 'refRdOt',
													width: 100,
													inputValue: 'OT',
													listeners:{
														change: 'changePCRadio'
													}
												}       
											]
										}
									]
								},
								{
									xtype:'fieldset',
									margin:'0 0 2 0',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									padding : '5 5 5 5',
									items:[
										{
											xtype: 'radiogroup',
											reference: 'refRdgOp',
											layout:{
												type: 'vbox',
												align:'stretch'
											},
											defaults:{
												margin: '3 0 0 0'
											},
											listeners:{
												change: 'onRdgOpChange'
											},
											items:[									
												{
													xtype: 'container',
													layout: {
														type : 'hbox',
														align : 'stectch'
													},
													reference: 'refJPBbox',
													items: [
														{ 
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('jPB'),
															name: 'rdgOp', 
															reference: 'refRdOp',
															change: 'onRdgOpChange',
															width: 100,
															inputValue: 'JPB',
															checked: true
														},{
															xtype: 'combobox',
															flex : 1,
															reference: 'refCboOperator',
															bind: {
																store: '{empPCCombo}'
															},
															displayField: 'empNm',
												    		valueField: 'empId',
															queryMode:'local',
															editable: false,
															matchFieldWidth: true
														}
													]
												},{
													xtype: 'container',
													layout: {
														type : 'hbox',
														align : 'stectch'
													},
													reference: 'refCTTbox',
													items: [
														{ 
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('contractor'),
															reference: 'refRdCtt',
															name: 'rdgOp', 
															change: 'onRdgOpChange',
															width: 100,
															inputValue: 'CTT',
														},{
															xtype: 'partnercdfield',
															reference: 'refCboContractor',
															flex : 1,
															queryMode:'local',
															editable: false,
															matchFieldWidth: true,
															displayField: 'engPtyNm',
															valueField: 'ptyCd',									
															filter: 'string',
															editable: false,
															matchFieldWidth: false,
															params:{
																searchDivCd: 'CTT'
															}
														}
													]
												},{
													xtype: 'textfield',
													flex : 1,
													align: 'left',
													reference: 'ctlWorkingAreaPort',
													fieldLabel: ViewUtil.getLabel('workingArea'),
													labelWidth : 100,
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
												},{
													reference: 'refRdNop',
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('deployedequipment_no_operator'),
													name: 'rdgOp', 
													margin : '0 0 0 0',
													change: 'onRdgOpChange',
													width: '35%',
													disabled: true																									
												}        
											]
										}
									]
								},{
									xtype: 'tsb-datagrid',
									flex: 1,
				                    reference: 'refStaffEquipmentPortCraneDetailGrid',
									usePagingToolbar : false,
				    				plugins: [
										'gridexporter',
				    					'gridfilters',
				    					'clipboard'
									],
				    	    		selModel: {
				    					cellSelect: false
									},
				    				listeners: {
				    					afterrender:'onGridAfterRenderer'
				    				},
				    				bind: {
				    	    			store: '{' + 'othersEquipmentList' + '}'
				    	    		},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('StaffEquipmentPortCraneDetail')
				                    }
								},
							]
						},{
					        xtype: 'splitter',
					        margin : '13 0 7 0',
					        width: 3,
					        collapseOnDblClick: false
					    },{
			            	xtype:'fieldset',
			            	layout:{
			            		type:'vbox',
			            		align:'stretch'
			            	},
			            	title:'Deploy Equipment',
			            	margin:'0 0 5 0',
			            	flex:0.4,
			            	autoScroll:true,
			            	items:[
								{
									xtype: 'tsb-datagrid',
									flex: 1,
				                    reference: 'refStaffEquipmentDeployGrid',
									usePagingToolbar : false,
				    				stateful : true,
				    				stateId : 'staffEquipmentDeployGrid',
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{portCraneDeployedList}'
				    	    		},
				    	    		selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners: {
				    					cellClick: 'onEquipmentDeployGridClick'
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items:GridUtil.getGridColumns('StaffEquipmentDeploy')
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
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('add'),
											reference: 'refBtnCreate',
											listeners: {
												click: 'onAddStaffPortCrane'
											}
										},{
											xtype: 'button',
											ui: 'update-button',
											iconCls: 'fa fa-pencil-square-o',
											text: ViewUtil.getLabel('update'),
											reference: 'refBtnUpdate',
											listeners: {
												click: 'onUpdateStaffPortCrane'
											}
										},{
											xtype: 'button',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('remove'),
											reference: 'refBtnDelete',
											listeners: {
												click: 'onRemoveStaffPortCrane'
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