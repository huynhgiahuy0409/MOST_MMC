Ext.define('MOST.view.controller.VesselWorkPlan', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselworkplan',
	requires: [
		'MOST.view.planning.VesselWorkPlanModel',
		'MOST.view.planning.VesselWorkPlanController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselWorkPlanGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselWorkPlanStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	controller: 'vesselworkplan',
	
	viewModel: {
		type: 'vesselworkplan'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'vesselWorkPLanEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype:'container',
				layout:{
					type : 'hbox',
				},
				defaults:{
					labelWidth : 100,
					width : 600,
					labelAlign: 'right',
					margin : '2 0 0 0'
				},				
				items:[{
					xtype:'container',
					flex: 1,
					layout:{
						type : 'hbox',
						align : 'bottom'
					},
					defaults:{
						margin : '0 0 0 3'
					},
					items:[{
						xtype: 'tbfill'
					},{
						xtype: 'button',
						itemId: 'createItemId',
						text: ViewUtil.getLabel('add'),
						reference: 'refBtnCreate',
						ui: 'create-button',
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onAdd'
						}
					},{
						xtype: 'button',
						reference: 'refBtnDelete',
						itemId: 'deleteItemId',
						text: ViewUtil.getLabel('delete'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						listeners: {
							click: 'onRemove'
						}
					},{
						xtype: 'button',
						reference: 'refBtnDeleteAll',
						itemId: 'deleteAllId',
						text: ViewUtil.getLabel('deleteAll'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						listeners: {
							click: 'onRemoveAll'
						}
					}]
				}]
			},{
				xtype: 'tsb-datagrid',
				margin: '5 5 5 0',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateVesselWorkPlanGrid',
				plugins: [
					rowEditing,
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		listeners: {
	    			cellDblClick: 'onVslWorkPlanGridClick',
	    			pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('VesselWorkPlan'),
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'container',
		    	style: { "background-color":"white" },
		    	layout:{
					type : 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					itemId: 'inquiryItemId',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					itemId: 'saveItemId',
					reference:'refBtnSave',
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					listeners: {
						click: 'onSave'
					}
				},{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
            	},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
            	}]
		    },{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex: 1,
			        layout: {
			        	type: 'hbox',
			        	align: 'stretch'
                    },
			    	items: [{
			    		xtype: 'searchfieldset',
			    		title: ViewUtil.getLabel('search'),
				    	margin: '5 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
				    	items: [{
	                		xtype:'vesselcalllistfield',
	    	   				labelWidth:100,
	           				width:250,
	    	   				fieldLabel: ViewUtil.getLabel('vslcallid'),
	    	   				bind :{
								value: '{theSearch.vslCallId}'
							},
	    	   				reference:'ctlJpvc',
	    	   				margin: '2 0 0 0'
	                    }]
		    		},{
		    			xtype: 'fieldset',
		    			title: ViewUtil.getLabel('vslInfo'),
		    			margin: '5 0 0 5',
		    			flex: 1,
		    			layout: {
		    				type: 'hbox',
		    				align: 'stretch'
	                    },
	                    items:[{
    		    			xtype: 'container',
    		    			layout: {
    		    				type: 'vbox',
    		    				align: 'stretch'
    	                    },
    	                    flex: 1,
    		    			defaults:{
    		    				labelAlign: 'right',
    		    				margin: '2 0 0 0',
    		    				flex: 1
    		    			},
    	                    items:[{
    	                    	xtype: 'textfield',
    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVesselcode'),
    	                    	readOnly: true,
    	                    	bind: '{theEqSet.vslCd}'
    	                    },{
    	                    	xtype: 'textfield',
    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVesselname'),
    	                    	readOnly: true,
    	                    	bind: '{theEqSet.vslNm}'
    	                    },{
    	                    	xtype: 'textfield',
    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVoyage'),
    	                    	readOnly: true,
    	                    	bind: '{theEqSet.voyage}'
    	                    }]
    			    	},{
    		    			xtype: 'container',
    		    			layout: {
    		    				type: 'vbox',
    		    				align: 'stretch'
    		    			},
    		    			flex: 1,
    		    			defaults:{
    		    				labelAlign: 'right',
    		    				flex: 1,
    		    				margin: '2 0 0 0'
    		    			},
    		    			items:[{
    		    				xtype: 'textfield',
    		    				fieldLabel: ViewUtil.getLabel('vessleBerthingListShippingAgent'),
    		    				readOnly: true,
    		    				bind: '{theEqSet.arrvSaId}'
    		    			},{
    		    				xtype:'datetimefield',
            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
            					readOnly: true,
    		    				fieldLabel: ViewUtil.getLabel('equipmentSettingEta'),
    		    				bind: '{theEqSet.eta}'
    		    			},{
    		    				xtype:'datetimefield',
            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
            					readOnly: true,
    		    				fieldLabel: ViewUtil.getLabel('equipmentSettingEtd'),
    		    				bind: '{theEqSet.etd}'
    	                    }]
    			    	},{
    		    			xtype: 'container',
    				    	layout: {
    				    		type: 'vbox',
    				    		align: 'stretch'
    				    	},
    				    	flex: 1,
    				    	defaults:{
    				    		labelAlign: 'right',
    				    		margin: '2 0 0 0'
    				    	},
    				    	items:[{
    				    		xtype: 'textfield',
    				    		readOnly: true,
    				    		fieldLabel: ViewUtil.getLabel('equipmentSettingBerthingloc'),
    				    		bind: '{theEqSet.berthLoc}'
    				    	}]
    			    	}]
                    }]
				}]
		    }]
		});
		
		me.callParent();
	}
});

