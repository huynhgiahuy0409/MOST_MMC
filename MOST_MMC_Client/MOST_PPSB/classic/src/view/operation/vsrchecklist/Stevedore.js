Ext.define('MOST.view.operation.vsrchecklist.Stevedore', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-stevedore',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 STEVEDORE_GRID_REF_NAME: 'refStevedoreGrid',  // Main Grid Name 
	 STEVEDORE_STORE_NAME: 'stevedoreList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	 
	layout : {type  : 'hbox', align : 'stretch'},
		
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
            items: [{
        		xtype: 'fieldset',
	            margin: '0 0 5 5',
	            width: 360,
	            defaults: {
                    margin: '5 5 0 0',
                    labelAlign: 'right',
					labelWidth: 75
                },
	            items: [{
					xtype: 'container',
					layout:{
						type: 'hbox'
					},
					defaults: {
	                    labelAlign: 'right',
						labelWidth: 75
	                },
					items: [
						{
    	   					xtype:'partnercdfield',
    	   					reference:'refStevedoreCompany',
    	   					labelWidth:140,
           					width:300,
           					allowBlank: false,
    	   					fieldLabel:ViewUtil.getLabel('vsrStevedoreCompany'),
    	   					fieldStyle: 'background-color: #ffccff;',
    	   					params:{
    	   						ptnrType: CodeConstants.MT_PTNRTP_STV
    	   					},
							bind: {
								value: '{theStevedore.stvdComp}'
							}
    	   				}
					]
				},{
					xtype: 'numberfield',
			        anchor: '100%',
			        fieldLabel: ViewUtil.getLabel('supervisor'),
			        value: 0,
			        maxValue: 99,
			        minValue: 0,
					reference: 'refSupervisor',
					allowDecimals: false,
					width:200,
					bind: {
						value: '{theStevedore.nofStvdSprr}'
					}
				},{
					xtype: 'numberfield',
			        anchor: '100%',
			        fieldLabel: ViewUtil.getLabel('nonTonnage'),
			        value: 0,
			        maxValue: 99,
			        minValue: 0,
					reference: 'refNonTonnage',
					allowDecimals: false,
					width:200,
					bind: {
						value: '{theStevedore.stvdNonTon}'
					}
				},
                {
					xtype: 'textfield',
					reference: 'ctlStevedoreWorkingArea',
					fieldLabel: ViewUtil.getLabel('workingArea'),
					labelWidth: 140,
					width : 300,
					editable: true,
					labelAlign: 'right',
					matchFieldWidth: true,
					displayField: 'cd',
					valueField: 'cd',
					emptyText:'--Select--',
					triggers: {
						someField: {
							cls: 'fa-search',
							scope: 'controller',
							handler: 'onTriggerClick'
						}
					},
					listeners:{
						change: function(field, newValue){
							field.setValue(newValue.toUpperCase());
						}
					}
				},
                {
                	reference: 'refStevedoreStartTime',
					width:300,
			        xtype: 'datetimefield',
			        allowBlank: false,
			        forceSelection: true,
			        fieldLabel: ViewUtil.getLabel('startTime'),
			        anchor: '100%',
			        editable:false,
			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					bind: {
						value: '{theStevedore.workStDt}'
					}
                },{
                	reference: 'refStevedoreEndTime',
                	width:300,
			        xtype: 'datetimefield',
			        allowBlank: false,
			        forceSelection: true,
			        fieldLabel: ViewUtil.getLabel('endTime'),
			        anchor: '100%',
			        editable:false,
			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					bind: {
						value: '{theStevedore.workEndDt}'
					}
                },{
					xtype: 'textfield',
					reference: 'refStevedoreRemarks',
					fieldLabel: ViewUtil.getLabel('remarks'),
					fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
   					listeners:{
   						change: 'onUpperCase'
   					},
					bind: {
						value: '{theStevedore.rmk}'
					},
					width:300,
                },{
					xtype: 'container',
					layout:{
						type: 'hbox'
					},
					items: [
						{
		   					xtype:'partnercdtypefield',
		   					labelWidth: 75,
							width: 300,
		   					fieldLabel:ViewUtil.getLabel('requestor'),
		   					allowBlank: false,
		   					labelAlign: 'right',
		   					reference:'refStevedoreRequestor',
		   					params:{
		   						ptnrType: CodeConstants.CM_PTNRTP_RQT	//Requestor
		   					},
							   bind: {
								value: '{theStevedore.payer}'
							},
		   				}
	   				]
				}]
        	},{
	            xtype: 'panel',
	            layout: 'fit',
	            flex: 1,
	            margin : '0 5 5 5',
	            items: [{
	            	xtype: 'tsb-datagrid',
	 				reference: me.STEVEDORE_GRID_REF_NAME,
	 				flex: 1,
	 				usePagingToolbar : false,
	 				stateful : true,
    				stateId : 'stateStevedoreGrid',
    				plugins: [
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
    	    		bind: {
    					store: '{' + me.STEVEDORE_STORE_NAME + '}'
    				},
    	    		selModel: {
    					cellSelect: false,
    					selType: 'rowmodel',
						mode: 'SINGLE',
						type: 'spreadsheet',
    				},
    				listeners: {
    					cellclick: 'onStevedoreClick'
    				},
                    columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
    	            	items: GridUtil.getGridColumns('VSRStevedore')
                    }
		        }]
			}],
			
			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					margin :'0 2 0 0'
	        	},
				items: ['->',{
					xtype: 'button',
					text: ViewUtil.getLabel('clear'),
					reference: 'refsAddStevedore',
					ui: 'create-button',
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onClearStevedore'
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					reference: 'refsAddStevedore',
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAddStevedore'
					}
				},{
                    
                    xtype: 'button',
                    text: ViewUtil.getLabel('update'),
                    ui: 'update-button',
                    reference: 'refsUpdateStevedore',
                    iconCls: 'fa fa-pencil-square-o',
                    listeners: {
                        click: 'onUpdateStevedore'
                    }
                }, {
					xtype: 'button',
					itemId: 'deleteButton',
					text: ViewUtil.getLabel('remove'),
					reference: 'refsRemoveStevedore',
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemoveStevedore'
					}
				}]
			}]	
		});
		
		me.callParent();
	}
});