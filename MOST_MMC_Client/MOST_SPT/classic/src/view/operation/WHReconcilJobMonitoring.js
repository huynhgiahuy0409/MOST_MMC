Ext.define('MOST.view.operation.WHReconcilJobMonitoring', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-whreconciljobmonitoring',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	width: 1000,
	height: 600,
	
	controller: 'jobmonitoring',
	
	viewModel: {
		type: 'jobmonitoring'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblUpdateBy: {type: 'bundle', key: 'updBy'},
	lblOpeClassNm: {type: 'bundle', key: 'opeClassNm'},
	lblCgNo: {type: 'bundle', key: 'jobMonitoringCgNo'},
	lblVslCallId: {type: 'bundle', key: 'jpvc'},
	lblSpCaCoNm: {type: 'bundle', key: 'spCaCoNm'},
	lblJobCoNm: {type: 'bundle', key: 'jobCoNm'},
	lblWgt: {type: 'bundle', key: 'mt'},
	lblMsrmt: {type: 'bundle', key: 'jobMonitoringMsrmt'},
	lblPkgQty: {type: 'bundle', key: 'jobMonitoringPkgQty'},
	lblJobPurpNm: {type: 'bundle', key: 'jobPurpNm'},
	lblRcCoNm: {type: 'bundle', key: 'rcCoNm'},
	lblJobTpNm: {type: 'bundle', key: 'jobTpNm'},
	lblTsptTpNm: {type: 'bundle', key: 'tsptTpNm'},
	lblGatePassNo: {type: 'bundle', key: 'gatePassNo'},
	lblLocId: {type: 'bundle', key: 'jobMonitoringLocId'},
	lblRhdlModeNm: {type: 'bundle', key: 'rhdlModeNm'},
	lblWorkStDt: {type: 'bundle', key: 'workStDt'},
	lblWorkEndDt: {type: 'bundle', key: 'workEndDt'},
	lblDelvTpNm: {type: 'bundle', key: 'delvTpNm'},
	lblShftNm: {type: 'bundle', key: 'shftNm'},
	lblHatchNo: {type: 'bundle', key: 'hatchNo'},
	lblFnlOpeYn: {type: 'bundle', key: 'fnlOpeYn'},
	lblPackageNo: {type: 'bundle', key: 'packageNo'},
	lblPackageType: {type: 'bundle', key: 'packageType'},
	
	btnSearch: {type: 'bundle', key: 'search'},
	btnAdd: {type: 'bundle', key: 'add'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnExportToExcel: {type: 'bundle', key: 'exportToExcel'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'jobMonitoringEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refJobMonitoringGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateJobMonitoringGrid',
				plugins: [
					rowEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{jobMonitoring}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            		{
	            			header: me.lblUpdateBy,
	            			dataIndex: 'updateBy',
	            			reference: 'refJobMonitoringOpeClassNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblOpeClassNm,
	            			dataIndex: 'opeClassNm',
	            			reference: 'refJobMonitoringOpeClassNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblCgNo,
	            			dataIndex: 'cgNo',
	            			reference: 'refJobMonitoringCgNo',
	            			filter: 'string',
	            			width: 150
	            		},
	            		{
	            			header: me.lblVslCallId,
	            			dataIndex: 'vslCallId',
	            			reference: 'refJobMonitoringVslCallId',
	            			filter: 'string',
	            			width: 150
	            		},
	            		{
	            			header: me.lblSpCaCoNm,
	            			dataIndex: 'spCaCoNm',
	            			reference: 'refJobMonitoringSpCaCoNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblJobCoNm,
	            			dataIndex: 'jobCoNm',
	            			reference: 'refJobMonitoringJobCoNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		/*{
		            		header: me.lblPackageNo,
							dataIndex: 'pkgNo',
							filter : 'string',
							width: 110,
							editor: {
								xtype: 'textfield',
								maxLength: 60,
								enforceMaxLength : true
					       }
						},
	            		{
	       				    header: me.lblPackageType,
	       					dataIndex: 'repkgTypeCd',
	        	    		editor:{
								xtype: 'combo',
								bind: {store: '{jobMonitoringPackageTypeCombo}'},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd',
						        matchFieldWidth: false
							},
					        width: 150,
					        renderer:'onGridComboRenderer'
		            	},*/
            			{
            				header: me.lblWgt,
            				dataIndex: 'wgt',
            				width: 110,
            				xtype: 'numbercolumn',
    						align : 'right',
    						format: '0,000.000',
    						editor : {
    							xtype : 'numberfield',
    							minValue : 0,
    							maxValue: 999999999999.999,
    							align : 'right',
    							decimalPrecision: 3,
    							selectOnFocus : true
    						}
            			},
            			{
            				header: me.lblMsrmt,
            				dataIndex: 'msrmt',
            				width: 110,
            				xtype: 'numbercolumn',
    						align : 'right',
    						format: '0,000.000',
    						editor : {
    							xtype : 'numberfield',
    							minValue : 0,
    							maxValue: 999999999999.999,
    							align : 'right',
    							decimalPrecision: 3,
    							selectOnFocus : true
    						}
            			},
            			{
							header : me.lblPkgQty,
							dataIndex : 'pkgQty',
							xtype: 'numbercolumn',
							width : 110,
							align : 'right',
							format: '0,000',
							editor : {
								xtype : 'numberfield',
								minValue : 0,
								align : 'right',
								maxValue: 999999999
							}
						},
	            		{
	            			header: me.lblJobPurpNm,
	            			dataIndex: 'jobPurpNm',
	            			reference: 'refJobMonitoringJobPurpNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblRcCoNm,
	            			dataIndex: 'rcCoNm',
	            			reference: 'refJobMonitoringRcCoNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblJobTpNm,
	            			dataIndex: 'jobTpNm',
	            			reference: 'refJobMonitoringJobTpNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	       				    header: me.lblTsptTpNm,
	       					dataIndex: 'tsptTpCd',
	        	    		editor:{
								xtype: 'combo',
								bind: {store: '{jobMonitoringModeOfOprCombo}'},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd'
							},
					        width: 110,
					        renderer:'onGridComboRenderer'
		            	},
	            		{
	            			header: me.lblGatePassNo,
	            			dataIndex: 'gatePassNo',
	            			reference: 'refJobMonitoringGatePassNo',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblLocId,
	            			dataIndex: 'locId',
	            			reference: 'refJobMonitoringLocId',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblRhdlModeNm,
	            			dataIndex: 'rhdlModeNm',
	            			reference: 'refJobMonitoringRhdlModeNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
							header: me.lblWorkStDt,
							dataIndex: 'workStDt',
							width: 150,
							xtype: 'datecolumn',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							editor: {
								xtype: 'datetimefield',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						        allowBlank: false
			                },
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
							}
						},
						{
							header: me.lblWorkEndDt,
							dataIndex: 'workEndDt',
							width: 150,
							xtype: 'datecolumn',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							editor: {
								xtype: 'datetimefield',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						        allowBlank: false
			                },
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
							}
						},
	            		{
	            			header: me.lblDelvTpNm,
	            			dataIndex: 'delvTpNm',
	            			reference: 'refJobMonitoringDelvTpNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblShftNm,
	            			dataIndex: 'shftNm',
	            			reference: 'refJobMonitoringShftNm',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	       				    header: me.lblHatchNo,
	       					dataIndex: 'hatchNo',
	        	    		editor:{
								xtype: 'combo',
								bind: {store: '{jobMonitoringHatchNoCombo}'},
								queryMode: 'local',
						        displayField: 'cdNm',
						        valueField: 'cd'
							},
					        width: 110
		            	},
	            		{
	       				    header: me.lblFnlOpeYn,
	       					dataIndex: 'fnlOpeYn',
	        	    		editor:{
								xtype: 'combo',
								bind: {store: '{jobMonitoringYnCombo}'},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd'
							},
					        width: 110,
					        renderer:'onGridComboRenderer'
		            	}
	            	]
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [
					{
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                        	margin: '0 5 0 0',
        					labelAlign: 'right'
                    	},
                    	layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items:[
                        	{
            					xtype:'textfield',
            					reference:'ctlJobMonitoringCgNo',
            					fieldLabel: me.lblCgNo,
               					labelWidth: 60,
            					width: 240,
            					bind:'{theDetail.cgNo}',
            					editable:false
               				}
                        ]
					}
					]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
				items: ['->',{
					xtype: 'button',
					itemId: 'deleteButton',
					text: me.btnRemove,
					ui: 'delete-button',
					reference:'refBtnRemove',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					}
				}, {
					xtype: 'button',
					itemId: 'exportToExcelButton',
					reference:'refBtnExportToExcel',
					text: me.btnExportToExcel,
					iconCls: 'x-fa fa-file-excel-o txt_green',
					listeners: {
						click: {
							fn: 'onExportExcel',
							args:['refJobMonitoringGrid']
						}
					}
				}]
			}]
			
		});
		
		me.callParent();
	}
});

