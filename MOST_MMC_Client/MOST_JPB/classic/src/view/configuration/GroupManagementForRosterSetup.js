Ext.define('MOST.view.planning.roster.GroupManagementForRosterSetup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-groupmanagementforrostersetup',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width: 1150,
	height: 520,
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGroupManagementForRosterSetupStaffGrid',
	MAIN_STORE_NAME: 'internalStaffListOnly',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
                xtype: 'tsb-datagrid',
                reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
                flex: 1,
                margin: '5 5 5 5',
                scrollable: true,
				stateId : 'stateGroupManagementForRosterSetupStaffGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		listeners: {
					cellclick: 'onInternalStaffCellClick'
				},
                columns: {
                	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('GroupManagementForRosterSetupStaff')
                }
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        width: 90,
                        text: ViewUtil.getLabel('add'),
                        ui: 'create-button',
	                    iconCls: 'x-fa fa-plus',
	                    reference: 'refBtnCreate',
                    	listeners: {
			            	click: 'onGroupManagementForRosterSetupAdd'
			            }
                    },
                    {
                        xtype: 'button',
                        margin:'5 0 0 0',
                        width: 90,
                        text: ViewUtil.getLabel('remove'),
	                    ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						 reference: 'refBtnDelete',
						listeners: {
			            	click: 'onGroupManagementForRosterSetupRemove'
			            }
                    }
                ]
            },
            {
                xtype: 'tsb-datagrid',
				reference: 'refGroupManagementForRosterSetupVesselOpGrid',
				usePagingToolbar : false,
                flex: 1,
                margin: '5 5 5 5',
				scrollable: true,
				stateId : 'stateGroupManagementForRosterSetupVesselOpGrid',
				bind: {
	    			store: '{shiftGroupListOnlyStore}'
	    		},
	    		listeners: {
					cellclick: 'onShiftConfigurationCellClick'
				},
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
                title: '',
                columns: {
                	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('GroupManagementForRosterSetupVesselOp')
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
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults:{
                    	labelWidth: 60,
                    	labelAlign: 'right',
                    	margin: '5 0 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'txtEmpId',
                            width: 160,
                            fieldLabel: ViewUtil.getLabel('groupmanagementEmpId'),
                            maxLength: 6,
							enforceMaxLength : true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textfield',
                            reference: 'txtUserNm',
                            margin: '5 0 0 5',
                            width: 140,
                            listeners:{
                            	change: function(){
                            		var me = this;
                            		me.setValue(this.getValue().toUpperCase());
                            	}
                            }
                        },
                        {
           					reference: 'ctlRoleCd',
           					xtype: 'combo',
           					width:230,
           					fieldLabel: ViewUtil.getLabel('rolecdNm'),
           					queryMode: 'local',
           					bind: {
            	    			store: '{internalStaffCombo}'
            	    		},
           					displayField: 'scdNm',
           					valueField: 'scd',
           					value : '',
           					emptyText: ViewUtil.getLabel('searchRole'),
           					editable: false,
           					allowBlank: true,
           					listeners: {
    							select: 'onSearchRoleComboSelect'
    						}
                        },
                        {
                        	reference: 'ctlShiftTypeCd',
           					xtype: 'combo',
           					fieldLabel: ViewUtil.getLabel('sType'),
           					width:230,
           					queryMode: 'local',
           					align: 'right',
           					bind: {
            	    			store: '{shiftTypeInfoCombo}'
            	    		},
           					displayField: 'shftTpCdNm',
           					valueField: 'shftTpCd',
           					value : '',
           					emptyText: ViewUtil.getLabel('searchType'),
           					editable: false,
           					listeners: {
           						change: 'onChangeGroupSelect',
    							select: 'onSearchGroupSelect'
    						}
                        },
                        {
                            xtype: 'combo',
                        	reference: 'ctlShiftTypeGroupCd',
           					xtype: 'combo',
           					width:200,
           					margin: '5 0 0 5',
           					queryMode: 'local',
           					bind: {
            	    			store: '{shiftGroupCombo}'
            	    		},
           					displayField: 'shftGroupNm',
           					valueField: 'shftGroupCd',
           					value : '',
           					emptyText: ViewUtil.getLabel('selectGroup'),
           					editable: false,
           					disabled: true,
           					listeners: {
    							select: 'onSearchGroupClick'
    						}
                        }
                    ]
				},{
					xtype: 'container',
					layout:{
						type:'vbox'
					},
					items:[
                        {
                        	xtype: 'button',
        					text: ViewUtil.getLabel('search'),
        					cls: 'search-button', 
        					iconCls: 'x-fa fa-search',
        					reference: 'refRetrive',
        					width : 120,
        					height : 40,
        					listeners: {
        						click: 'onGroupManagementForRosterSetupSearch'
        					}
                        }
					]
				}]
			}]
		});
		
		me.callParent();
	
	}
});


