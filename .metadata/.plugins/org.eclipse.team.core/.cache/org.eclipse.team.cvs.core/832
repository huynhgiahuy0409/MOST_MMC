Ext.define('MOST.view.planning.roster.ShiftDefinitionList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-shiftdefinitionlist',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'shiftDefinitionListEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onShiftDefListValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'shiftDefinitionListGridId',
				usePagingToolbar : false,
				reference: 'refShiftDefinitionListGrid',
				flex : 1,
				stateId : 'stateShiftDefinitionListGrid',
				plugins: [
	    		          rowEditing, 
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{shiftDefListOnlyStore}'
	    		},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	
	            	items:GridUtil.getGridColumns('ShiftDefinitionList')
				}
		    }],
		    
		    dockedItems: [{
                xtype: 'toolbar',
                enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
                items: [{
                    xtype: 'fieldset',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
        
                    items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        defaults:{
                        	labelWidth: 70,
                        	labelAlign: 'right',
                        	margin : '5 0 0 0'
                        },
                        items: [{
                      	    reference: 'ctlShiftType',
                            xtype: 'combo',
                            width: 310,
                        	margin : '5 0 0 60',
                            fieldLabel: ViewUtil.getLabel('shiftType'),
                            queryMode: 'local',
                            bind: {
                          	  store: '{shiftTypeCombo}',
                          	  value: '{theSearch.shftTpCd}'
                            },
                            displayField: 'shftTpCdNm',
                            valueField: 'shftTpCd',
                            value : '',
                            emptyText: ViewUtil.getLabel('selectMethod'),
                            editable: false,
                            allowBlank: true,
                            listeners: {
                            	select: 'onShiftTypeComboSelect'
                            }
                        },
                        {
	                       	reference: 'ctlUseYn',
	                       	xtype: 'combo',
	                       	width: 150,
	                       	fieldLabel: ViewUtil.getLabel('use'),
	                       	queryMode: 'local',
	                       	bind: {
	                       		store: '{userYnCombo}',
	                       		value: '{theSearch.useYn}'
	                       	},
	                       	displayField: 'scdNm',
	                       	valueField: 'scd',
	                       	value : 'Y',
	                       	editable: false,
	                       	allowBlank: false,
	                       	listeners: {
                            	change: 'onShiftDefinitionUseYnComboSelect'
                            }
    	                }                        
                        ]
                   },{
                	   xtype: 'container',
                	   layout: {
                		   type: 'hbox'
                	   },
                       defaults:{
	                       	labelWidth: 130,
	                       	labelAlign: 'right',
	                       	margin : '5 0 0 0'
                       },                	   
                	   items: [{
                		   reference: 'ctlMethodDeployment',
                		   xtype: 'combo',
                		   fieldLabel:  ViewUtil.getLabel('methodofDeployment'),
                		   width: 280,
                		   queryMode: 'local',
                		   bind: {
                			   store: '{shiftMethodDeploymentCombo}'
                		   },
                		   displayField: 'scdNm',
                		   valueField: 'scd',
                		   value : '',
                		   editable: false,
                		   allowBlank: true,
                		   listeners: {
                			   change: 'onMethodDeploymentComboSelect'
                		   }
                     }]
                   }]
                }]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
				items: ['->',{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					reference: 'refBtnCreate',
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: {
							fn: 'onShiftDefAdd',
							args: ['S']
						}
					}
				}, 
				{
					xtype: 'button',
					itemId: 'deleteButton',
					text: ViewUtil.getLabel('remove'),
					reference: 'refBtnDelete',
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: {
							fn: 'onShiftDefRemove',
							args: ['S']
						}
					}
				}]
			}]
		});
		
		me.callParent();
	}
});

