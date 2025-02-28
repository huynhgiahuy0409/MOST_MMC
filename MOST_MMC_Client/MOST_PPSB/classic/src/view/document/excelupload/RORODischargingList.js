Ext.define("MOST.view.document.excelupload.RORODischargingList",{
	extend: "Ext.panel.Panel",
	
    alias: 'widget.app-rorodischarginglist',
    
    requires: [
			'MOST.view.document.excelupload.RORODischargingListModel',
			'MOST.view.document.excelupload.RORODischargingListController',
			'MOST.config.Locale',
			'Ext.grid.plugin.RowEditing',
			'Ext.grid.plugin.Exporter',
			'Ext.grid.plugin.Clipboard',
			'Ext.grid.filters.Filters',
			'Ext.grid.selection.SpreadsheetModel'
   	],
   	
   	controller: 'rorodischaginglist', 
   	
   	viewModel: {
   		type: 'rorodischaginglist'
   	},
   	
	listeners: {
	},
   	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refRORODisChargingListGrid',
   	MAIN_STORE_NAME: 'rORODischargingList',
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
            pluginId :'rorodischarginglistEditor',
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
                    items:GridUtil.getGridColumns('RORODischargingList')
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
                            xtype: 'textfield',
                            reference: 'refFilePath',
                            fieldLabel: ViewUtil.getLabel('fileName'),
                            emptyText: ViewUtil.getLabel('fileName'),
                            width: 300,
                            labelWidth: 80,
                            readOnly: true,
                            selectOnFocus: true,
                            fieldStyle: 'text-transform:uppercase'
                        },{
                            xtype: 'filefield',
                            name : 'fileUpload',
	        				itemId: 'createButton',
                            reference: 'refFileField',
	        				id: 'rORODischargingListFileUpload',
	        				buttonText: '',
	                    	enctype: 'multipart/form-data',
                            method: 'POST',
                            fileUpload: true,
	        		        buttonOnly: true,
	        		        multiple: true,
                            width: 100,
                            style: 'text-align:left',
                            buttonConfig: {
	        					text:  ViewUtil.getLabel('upload'),
	        					iconCls: 'excel-button-image' 
	        		    	},
	        		    	listeners: {
	        		    		change: 'onDischargingListFileUpload',
	        		    		afterrender:function(cmp){
	        		                cmp.fileInputEl.set({
	        		                	accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	        		                });
	        		            }
	        			    }
                        },{
                            xtype: 'button',
                            reference:'refbtnSave',
                            text: ViewUtil.getLabel('save'),
                            iconCls: 'x-fa fa-save',
                            bind: {
                                disabled: '{rORODischargingList.data.length === 0 || !validObj.excelItself }'
                            },
                            listeners: {
   	    						click: 'onSave'
   	    					}
   	       				},{
                            xtype: 'button',
                            reference:'refbtnClear',
                            text: ViewUtil.getLabel('clear'),
                            iconCls: 'fa fa-trash',
                            listeners: {
   	    						click: 'onClear'
   	    					}
   	       				}]
                    }]
                }],
            }]
        });
        
        me.callParent();
    }

});
