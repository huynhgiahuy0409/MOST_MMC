Ext.define('MOST.view.controller.staffandequipment.StaffAndEquipmentForklift', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffandequipmentforklift',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : 'fit',
	
	stateful : true,
	stateId : 'stateStaffandEquipmentForklift',
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'staffForkliftGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				edit: 'onStaffForkLiftEdit'
			}
		});
			
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
		            height: 470,
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
		            	title:'Mega Summary',
		            	margin:'0 0 5 0',
		            	flex:0.3,
		            	items:[{
		                    xtype: 'tsb-datagrid',
		                    reference: 'refForkliftGrid',
							usePagingToolbar : false,
		    				stateful : true,
		    				title:'Forklift',
		    				height:'100%',
		    				stateId : 'stateForkliftGrid',
		    				plugins: [
		    					'gridexporter',
		    					'gridfilters',
		    					'clipboard'
		    	    		],
		    	    		bind: {
		    	    			store: '{megaSumForkliftList}'
		    	    		},
		    	    		selModel: {
		    					cellSelect: false
		    				},
		                    columns: {
		    	            	defaults: {
		    	            		style : 'text-align:center',
		    	            		align : 'center'
		    	            	},
		    	            	items:GridUtil.getGridColumns('StaffDeploymentForklift')
		    	            	
		                    }
				        }]
					},{
				        xtype: 'splitter',
				        margin : '13 0 7 0',
				        width: 3.5,
				        collapseOnDblClick: false
				    },{
						xtype:'fieldset',
						layout:{
							type:'vbox',
							align:'stretch'
						},
						margin:'0 0 5 0',
						flex: 0.35,
						title: 'Forklift List',
						autoScroll: true,
						items:[						
						{
							xtype:'container',
							margin : '0 0 0 0',
							padding : '0 0 0 0',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							items:[
								{
									xtype: 'textfield',	
									reference: 'refCboForklift',
									fieldLabel: ViewUtil.getLabel('forklift'),
									emptyText: '--Select All--',
									triggers:{
										someField: {
											cls: 'fa-search',
											scope: 'controller',
											handler: 'onTriggerSearchForklift'
										}
									},																
									filter: 'string',
									editable: true,
									matchFieldWidth: true,
									labelWidth:100,
									flex : 1,
									labelAlign: 'left'
								},	
								{
									xtype: 'radiogroup',
									reference: 'rdgFl',
									layout:{
										type: 'vbox',
										align:'stretch'
									},
									margin : '-10 0 0 0',
									padding : '0 0 0 0',
									defaults:{
										margin: '2 0 0 0'
									},
									listeners:{
										change: 'onRdgForkliftContractorChange'
									},
									items:[														
									{
										xtype: 'container',
										layout: 'hbox',
										items: [
											{ 
												xtype: 'radiofield',
												boxLabel: ViewUtil.getLabel('jPB'),
												reference:'refRadioForkliftJPB',
												name: 'rdgFl', 
												width : 100,
												inputValue: 'JPB',
												checked: true
											},     
											{
												xtype: 'combobox',
												flex : 1,
												reference: 'refCboJPBForklift',
												bind: {store: '{empFLCombo}'},
												displayField: 'empNm',
									    		valueField: 'empId',
												queryMode:'local',
												editable: false,
												matchFieldWidth: true
											}
										]
									},
									{
										xtype: 'container',
										layout: 'hbox',
										items: [
											{ 
												xtype: 'radiofield',
												boxLabel: ViewUtil.getLabel('contractor'),
												reference:'refRadioForkliftContractor',
												name: 'rdgFl', 
												width : 100,
												inputValue: 'CTT',
											},
											{
												xtype: 'partnercdfield',
												reference: 'refCboContractorForklift',
												flex: 1,
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
												},
											},                    
										]
									},
									{
										xtype: 'container',
										layout: 'hbox',
										items: [
											{ 
												xtype: 'radiofield',
												reference:'refRadioForkliftNoDriver',
												boxLabel: ViewUtil.getLabel('noDriver'),
												name: 'rdgFl', 
												width: '35%',
												inputValue: 'NOD',
											}								
										]
									},        
									{
										xtype: 'textfield',
										labelWidth : 100,
										margin : '0 0 0 0',
										flex : 1,
										align: 'left',
										reference: 'ctlWorkingAreaForklift',
										fieldLabel: ViewUtil.getLabel('workingArea'),
										editable: true,
										maxLength:30,
										enforceMaxLength: true,
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
									},								
									]
								}
							]
						},
						{
							xtype: 'tsb-datagrid',
							usePagingToolbar : false,
							flex: 1,
		                    reference: 'refStaffEquipmentForkliftDetailGrid',
		    				
							bind: {store: '{forkliftList}'},
		    	    		selModel: {
		    					type: 'spreadsheet',
		    					cellSelect: false
		    				},
		                    columns: {
		    	            	defaults: {
		    	            		style : 'text-align:center',
		    	            		align : 'center'
		    	            	},
		    	            	items:GridUtil.getGridColumns('StaffDeploymentForkliftDetail')
		                    }
						},
					]
					},{
				        xtype: 'splitter',
				        margin : '13 0 7 0',
				        width: 3,
				        collapseOnDblClick: false
				    },
					{
		            	xtype:'fieldset',
		            	layout:{
		            		type:'vbox',
		            		align:'stretch'
		            	},
		            	margin:'0 0 5 0',
		            	title:'Deploy Forklift',
		            	flex:0.35,
		            	items:[
						{						
		                    xtype: 'tsb-datagrid',
		                    reference: 'refStaffForkliftGrid',
							usePagingToolbar : false,
		    				stateful : true,
		    				stateId : 'stateStaffForkliftGrid',
		    				flex: 1,
		    				plugins: [
		    					'gridexporter',
		    					'gridfilters',
		    					'clipboard'
		    	    		],
		    	    		bind: {
		    	    			store: '{forkliftDeployedList}'
		    	    		},
		    	    		selModel: {
		    					type: 'spreadsheet',
		    					cellSelect: false
		    				},
		    				listeners: {
		    					cellClick: 'onDeployForkliftGridClick',
		    					afterrender:'onforkliftGridAfterRender'
		    				},
		                    columns: {
		    	            	defaults: {
		    	            		style : 'text-align:center',
		    	            		align : 'center'
		    	            	},
		    	            	items:GridUtil.getGridColumns('StaffForklift')
		                    }
						},
						{
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
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-plus',
									text: ViewUtil.getLabel('add'),
									reference: 'refBtnCreate',
									listeners: {
										click: 'onAddStaffForklift'
									}
								},
								{
									xtype: 'button',
									ui: 'update-button',
									iconCls: 'fa fa-pencil-square-o',
									text: ViewUtil.getLabel('update'),
									reference: 'refBtnupdate',
									listeners: {
										click: 'onUpdateStaffForklift'
									}
								},
								{
									xtype: 'button',
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									text: ViewUtil.getLabel('remove'),
									reference: 'refBtnDelete',
									listeners: {
										click: 'onRemoveStaffForklift'
									}
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('workingArea'),
									reference: 'refBtnWorkingAreaFL',
									style:'background-color: #2fed21;color: #ffffff',
									listeners: {
										click: 'onClickWorkingAreaForklift'
									}
								}]
						}]
		            }]
		        }
			],	
		});
		
		me.callParent();
	}
});