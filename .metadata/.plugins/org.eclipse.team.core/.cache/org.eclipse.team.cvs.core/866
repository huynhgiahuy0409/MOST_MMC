Ext.define('MOST.view.popup.ShiftGroupMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-shiftgroupmultipopup',
	requires: [
		'MOST.view.popup.ShiftGroupMultiPopupModel',
		'MOST.view.popup.ShiftGroupMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Group List",
	width: 1000,
	height: 520,

	controller: 'shiftgroupmultipopup',
	
	viewModel: {
		type: 'shiftgroupmultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'hbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refShiftGroupPopupGrid1',				// Main Grid Name 
	MAIN_STORE_NAME: 'shiftGroupMultiList1',	
	
	MAIN2_GRID_REF_NAME: 'refShiftGroupPopupGrid2',				// Main Grid Name 
	MAIN2_STORE_NAME: 'shiftGroupMultiList2',	
	
	MAIN3_GRID_REF_NAME: 'refShiftGroupPopupGrid3',				// Main Grid Name 
	MAIN3_STORE_NAME: 'shiftGroupMultiList3',	
	
	MAIN4_GRID_REF_NAME: 'refShiftGroupPopupGrid4',				// Main Grid Name 
	MAIN4_STORE_NAME: 'shiftGroupMultiList4',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				flex : 1,
  				stateful : true,
  				stateId : 'stateShiftGroupMultiPopupGrid',
  				viewConfig: {           
		            getRowClass: function (row, index) {
		                var cls = "";
		                if(row.get("chkShiftGroupMulti") == 1){
		                	cls = "shift1-color";	
		                }
		                return cls;
		            }
		        },
  				plugins: [
  	    		          'gridexporter',
  	    		          'gridfilters',
  	    		          'clipboard'
  	    		],
  	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
  	    		},
  	    		selModel: {
  					cellSelect: false
  				},
  				columns: {
  	            	defaults: {
  	            		style : 'text-align:center',
  	            		align : 'center'
  	            	},
  	            	items: GridUtil.getGridColumns('ShiftGroupList')
  				}
  			},{
  				xtype: 'tsb-datagrid',
				reference: me.MAIN2_GRID_REF_NAME,
  				usePagingToolbar : false,
  				flex : 1,
  				stateful : true,
  				stateId : 'stateShiftGroupMultiPopupGrid',
  				viewConfig: {           
		            getRowClass: function (row, index) {
		                var cls = "";
		                if(row.get("chkShiftGroupMulti") == 1){
		                	cls = "shift2-color";	
		                }
		                return cls;
		            }
		        },
  				plugins: [
  	    		          'gridexporter',
  	    		          'gridfilters',
  	    		          'clipboard'
  	    		],
  	    		bind: {
  	    			store: '{' + me.MAIN2_STORE_NAME + '}'
  	    		},
  	    		selModel: {
  					cellSelect: false
  				},
  				columns: {
  	            	defaults: {
  	            		style : 'text-align:center',
  	            		align : 'center'
  	            	},
  	            	items: GridUtil.getGridColumns('ShiftGroupList')
  				}
  			},{
  				xtype: 'tsb-datagrid',
  				reference: me.MAIN3_GRID_REF_NAME,
  				usePagingToolbar : false,
  				flex : 1,
  				stateful : true,
  				stateId : 'stateShiftGroupMultiPopupGrid',
  				viewConfig: {           
		            getRowClass: function (row, index) {
		                var cls = "";
		                if(row.get("chkShiftGroupMulti") == 1){
		                	cls = "shift3-color";	
		                }
		                return cls;
		            }
		        },
  				plugins: [
  	    		          'gridexporter',
  	    		          'gridfilters',
  	    		          'clipboard'
  	    		],
  	    		bind: {
  	    			store: '{' + me.MAIN3_STORE_NAME + '}'
  	    		},
  	    		selModel: {
  					cellSelect: false
  				},
  				columns: {
  	            	defaults: {
  	            		style : 'text-align:center',
  	            		align : 'center'
  	            	},
  	            	items: GridUtil.getGridColumns('ShiftGroupList')
  				}
  			},{
  				xtype: 'tsb-datagrid',
  				reference: me.MAIN4_GRID_REF_NAME,
  				usePagingToolbar : false,
  				flex : 1,
  				stateful : true,
  				stateId : 'stateShiftGroupMultiPopupGrid',
  				viewConfig: {           
		            getRowClass: function (row, index) {
		                var cls = "";
		                if(row.get("chkShiftGroupMulti") == 1){
		                	cls = "dayoff-color";	
		                }
		                return cls;
		            }
		        },
  				plugins: [
  	    		          'gridexporter',
  	    		          'gridfilters',
  	    		          'clipboard'
  	    		],
  	    		bind: {
  	    			store: '{' + me.MAIN4_STORE_NAME + '}'
  	    		},
  	    		selModel: {
  					cellSelect: false
  				},
  				columns: {
  	            	defaults: {
  	            		style : 'text-align:center',
  	            		align : 'center'
  	            	},
  	            	items: GridUtil.getGridColumns('ShiftGroupList')
  				}
  			}],
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'container',
					flex: 1,
					layout:{
						type: 'vbox',
					     align: 'stretch'
					},
					items: [
					{
						xtype: 'container',
						flex: 1,
						layout:{
							type: 'hbox',
						     align: 'stretch'
						},
						items: [
						{
							xtype: 'button',
							reference: 'btnUpdate',
							text: ViewUtil.getLabel('update'),
							width: 91,
							height: 33,
							name: 'btnUpdate',
							margin: '0 0 10 0',
							listeners:{
								click:'onUpdate'
							}
						},{
							xtype: 'label',
							margin: '10 0 10 100',
							style: "color:blue;font-weight:bold;",
							reference:'txtDate',
							height: 33
						}]
					},{
						xtype: 'container',
						flex: 1,
						layout:{
							type: 'hbox',
						     align: 'stretch'
						},
						items: [
						{
							xtype: 'label',
							reference: 'lbShft1',
							flex: 1,
							text: 'SHFT 01',
							style: 'text-align:center;font-weight: bold; color: #F44336;'
						},{
							xtype: 'label',
							reference: 'lbShft2',
							flex: 1,
							text: ViewUtil.getLabel('update'),
							text: 'SHFT 02',
							style: 'text-align:center;font-weight: bold; color: #3F51B5;'
						},{
							xtype: 'label',
							
							flex: 1,
							reference: 'lbShft3',
							text: ViewUtil.getLabel('update'),
							text: 'SHFT 03',
							style: 'text-align:center;font-weight: bold; color: #4CAF50;'
						},{
							xtype: 'label',
							flex: 1,
							text: 'DAY OFF',
							style: 'text-align:center;font-weight: bold; color: #FF9800;'
						}]
					},{

						xtype: 'container',
						flex: 1,
						layout:{
							type: 'hbox',
						     align: 'stretch'
						},
						margin: '0 0 0 50',
						items: [
						{
							 xtype: 'checkboxfield',
							 reference:'chkAll1',
			                 flex: 1,
			                 boxLabel: 'Select All',
			                 boxLabelAlign : 'after',
			                 listeners: {
			    				change: 'onAllCheck1'
			    			 }	
						},{
							xtype: 'checkboxfield',
							reference:'chkAll2',
							flex: 1,
			                boxLabel: 'Select All',
			                boxLabelAlign : 'after',
			                listeners: {
			    				change: 'onAllCheck2'
			    			}	
						},{
							xtype: 'checkboxfield',
							reference:'chkAll3',
							flex: 1,
			                boxLabel: 'Select All',
			                boxLabelAlign : 'after',
			                listeners: {
			    				change: 'onAllCheck3'
			    			}	
						},{
							xtype: 'checkboxfield',
							reference:'chkAll4',
							flex: 1,
			                boxLabel: 'Select All',
			                boxLabelAlign : 'after',
			                listeners: {
			    				change: 'onAllCheck4'
			    			}	
						}]
					}]
		    	}]
			}]
		});
		
		me.callParent();
	}
});


