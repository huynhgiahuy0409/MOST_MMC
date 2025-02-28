Ext.define("MOST.view.document.excelupload.ROROLoadingList",{
	extend: "Ext.panel.Panel",
	
    alias: 'widget.app-roroloadinglist',
    
    requires: [
			'MOST.view.document.excelupload.ROROLoadingListModel',
			'MOST.view.document.excelupload.ROROLoadingListController',
			'MOST.config.Locale',
			'Ext.grid.plugin.RowEditing',
			'Ext.grid.plugin.Exporter',
			'Ext.grid.plugin.Clipboard',
			'Ext.grid.filters.Filters',
			'Ext.grid.selection.SpreadsheetModel'
   	],
   	
   	controller: 'roroloadinglist',
   	
   	viewModel: {
   		type: 'roroloadinglist'
   	},
   	
	listeners: {
	},
   	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refROROLoadingListGrid',
   	MAIN_STORE_NAME: 'rOROloadinglist',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	width: 1400,
	height: 700,
	
   	layout: {type:'hbox', align:'stretch'},
   	initComponent: function() {

   		var me = this;
   		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
   			clicksToMoveEditor: 2,
			clicksToEdit: 2,
   			pluginId :'roroloadinglistEditor',
   			autoCancel: false,
   			listeners:{
   				cancelEdit:'onCancelEdit',
				validateedit:'onValidateEdit',
				edit:'onEdit'
   			}
   		});

   		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				flex: 1,
				plugins: [
					rowEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblclick',
					pagingSearch: 'onSearch'
				},
				viewConfig: {
                    getRowClass: function(record, rowIndex, rowParams, store){
                        return record.get("invalid") ? "bg_red" : "row-error"; //"row-valid";
                    }
                },
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items:GridUtil.getGridColumns('ROROLoadingList')
				}
			}],
			
   			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
	   			items: [{
	   				xtype:'searchfieldset',
	   				title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
	   				layout:{
	   					type:'vbox',
	   					align:'stretch'
	   				},
	   				defaults:{
						margin: '0 0 5 0'
					},
	   				flex: 1,
	   				items: [{
	   	       				xtype: 'container',
	   	       				layout:{
	   	       					type:'hbox'
	   	       				},
	   	       				defaults:{
	   	       					labelAlign: 'right',
	   	       					margin:'5 5 5 0'
	   	       				},
	   	       				items:[{
	   	       					reference: 'refFilePath',
	   	       					xtype: 'textfield',
	   	       					width:300,
		       					labelWidth:80,
	   	       					selectOnFocus: true,
	   	       					readOnly: true,
	   	       					fieldLabel: ViewUtil.getLabel('fileName'),
	   	       					emptyText: ViewUtil.getLabel('fileName'),
	   	       					fieldStyle: 'text-transform:uppercase'
	   	       				},{
		   	       				xtype: 'filefield',
		        				name : 'fileUpload',
		        				itemId: 'createButton',
								reference: 'refFileField',
		        				id:'rOROLoadingListFileUpload',
		        				style: 'text-align:left',
		        				method: 'POST',
		        				width:100,
		        				fileUpload: true,
		                    	enctype: 'multipart/form-data',
		        				buttonText: '',
		        		        buttonOnly: true,
		        		        multiple: true,
		        				buttonConfig: {
		        					text:  ViewUtil.getLabel('upload'),
		        					iconCls: 'excel-button-image' 
		        		    	},
		        		    	listeners: {
		        		    		change: 'onLoadingListFileUpload',
		        		    		afterrender:function(cmp){
		        		                cmp.fileInputEl.set({
		        		                	accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		        		                });
		        		            }
		        			    }
	   	       				},{
	                            xtype: 'button',
	                            text: ViewUtil.getLabel('save'),
	                            iconCls: 'x-fa fa-save',
	                            reference:'refbtnSave',
								bind: {
	                                disabled: '{rOROloadinglist.data.length === 0 || !validObj.excelItself }'
	                            },
	                            listeners: {
	   	    						click: 'onSave'
	   	    					}
	   	       				},{
	                            xtype: 'button',
	                            text: ViewUtil.getLabel('clear'),
	                            iconCls: 'fa fa-trash',
	                            reference:'refbtnClear',
	                            listeners: {
	   	    						click: 'onClear'
	   	    					}
	   	       				}]
	   	       			}     					
	   				]
	   			}],
			}]
   		});
   		
   		me.callParent();
   	}
});
