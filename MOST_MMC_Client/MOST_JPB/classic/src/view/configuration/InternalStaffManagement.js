Ext.define('MOST.view.planning.roster.InternalStaffManagement', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-internalstaffmanagement',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width: 1100,
	height: 800,

	layout : {type  : 'vbox', align : 'stretch'},

	listeners:{
		afterrender: 'onInternalStaffLoad'
	},
	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refInternalStaffManagementGrid',				// Main Grid Name 
	 MAIN_STORE_NAME: 'internalStaffMngListOnly',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	initComponent: function() {

		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'internalStaffManagementGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onInternalStaffManagementValidateEdit',				
				edit: 'onEdit'
			}
		});

		Ext.apply(me, {
			items: [{
                xtype: 'fieldset',
                layout: {
                    type: 'vbox'
                },
                margin: '5 5 0 5',
                padding : '3 3 3 3',
                items: [{
                		xtype:'container',
                		layout:'hbox',
                		margin : '0 0 0 0',
                		items:[
                        	{
                        		xtype: 'container',
                        		layout: {
                        			type:'vbox'
                        		},
        						defaults:{
        							margin: '2 0 0 0',
        							labelAlign:'right',
        							labelWidth : 100,
        							width : 250
        						},          
                        		items:[{
                        				xtype: 'container',
                        				layout:{
                        					type : 'hbox'
                        				},
                        				width: 350,
                						defaults:{
                							margin: '2 0 0 0',
                							labelAlign:'right',
                							labelWidth : 100,
                							width : 250
                						}, 
                        				items:[
                        					{
                	            				xtype: 'textfield',
                	            				reference : 'ctlStaffNo',
                	            				fieldLabel: 'Staff No',
                								maxLength: 6,
                								enforceMaxLength : true,
                								allowBlank: false,
                								width : 170,
                								allowOnlyWhitespace: false,
                								bind:'{theStaff.empId}'
                	            			},{
                	            				xtype: 'textfield',
                	            				reference : 'ctlStaffName',
                								maxLength: 50,
                								enforceMaxLength : true,
                								allowBlank: false,
                								width : 170,
                								margin: '2 0 0 5',
                								bind:'{theStaff.engNm}',
                						        listeners:{
                			   						change: 'onUpperCase'
                			   					}
                	            			}
                        				]
                        			},{
            							xtype: 'combo',
            							fieldLabel: 'User Id',
            							bind: {
            								store: '{internalStaffMngUserListCombo}',
            								value: '{theStaff.tuserId}'
            							},
            							queryMode: 'local',
            					        displayField: 'userId',
            					        width : 345,
            					        valueField: 'userId',
            					        emptyText :'Select'
            						},{
            							xtype: 'combo',
            							fieldLabel: 'Work Location',
            							bind: {
            								store: '{workingLocCodeListCombo}',
            								value: '{theStaff.workLocCd}'
            							},
            							queryMode: 'local',
            					        displayField: 'scdNm',
            					        valueField: 'scd',
            					        allowBlank: false,
            					        width : 345,
            					        emptyText :'Select'
            						},{
            							xtype: 'combo',
            							fieldLabel: 'Primary Role',
            							bind: {
            								store: '{primaryRoleCodeCombo}',
            								value: '{theStaff.proleCd}'
            							},
            							queryMode: 'local',
            					        displayField: 'scdNm',
            					        valueField: 'scd',
            					        width : 345,
            					        allowBlank: false,
            					        emptyText :'Select'
            						}
                        		]
                        	},{
                        		xtype: 'container',
                        		layout: {
                        			type:'vbox'
                        		},
								margin: '2 0 0 0',
        						defaults:{
        							margin: '2 0 0 0',
        							labelAlign:'right',
        							labelWidth : 100,
        							width : 250
        						},
                        		items:[
                        			{
            							xtype: 'combo',
            							fieldLabel: 'Contract',
            							bind: {
            								store: '{contractDivisionSearchListCombo}',
            								value: '{theStaff.conttDiv}'
            							},
            							queryMode: 'local',
            					        displayField: 'scdNm',
            					        valueField: 'scd',
            					        allowBlank: false,
            					        emptyText :'Select'
            						},{
            							xtype: 'combo',
            							fieldLabel: 'Unit',
            							bind: {
            								store: '{unitDropDownListCombo}',
            								value: '{theStaff.unitDiv}'
            							},
            							queryMode: 'local',
            					        displayField: 'scdNm',
            					        valueField: 'scd',
            					        emptyText :'Select'
            						},{
            							xtype: 'combo',
            							fieldLabel: 'Cost Center',
            							bind: {
            								store: '{costCenterListCombo}',
            								value: '{theStaff.costCentCd}'
            							},
            							queryMode: 'local',
            					        displayField: 'scdNm',
            					        valueField: 'scd',
            					        allowBlank: false,
            					        emptyText :'Select'
            						},{
                        				xtype: 'textfield',
                        				fieldLabel: 'Email Address',
            							maxLength: 100,
            							enforceMaxLength : true,
            							bind:'{theStaff.email}'
                        			}
                        		]
                        	},{
                        		xtype: 'container',
                        		layout: {
                        			type:'vbox'
                        		},
								margin: '2 0 0 0',
        						defaults:{
        							margin: '2 0 0 0',
        							labelAlign:'right',
        							labelWidth : 100,
        							width : 250
        						},
                        		items:[
                        			{
            							xtype: 'combo',
            							fieldLabel: 'Grade',
            							bind: {
            								store: '{staffGradeCodeListCombo}',
            								value: '{theStaff.grdCd}'	
            							},
            							queryMode: 'local',
            							displayField: 'scdNm',
            						    valueField: 'scd',
            						    allowBlank: false,
            						    emptyText :'Select'
            						},{
            							xtype: 'combo',
            							fieldLabel: 'Active status',
            							/*bind: {
            								store: '{ActiveStatusYnCombo}',
            								value: '{theStaff.useYn}'
            							},*/
            							store: {
            						        data: [
            						            { comCode: 'Y', comName: 'Y' },
            						            { comCode: 'N', comName: 'N' },
            						        ]
            						    },
            						    bind: {
            						        value: '{theStaff.useYn}'
            						    },
            							queryMode: 'local',
            							displayField: 'comName',
                	   					valueField: 'comCode',
                	   					value: 'Y',
                	   					emptyText :'Select'
            						},{
                        				xtype: 'textfield',
                        				fieldLabel: 'Remark',
            							maxLength: 100,
            							enforceMaxLength : true,
            							bind:'{theStaff.remark}'
                        			},{
            							xtype: 'combo',
            							fieldLabel: 'Rate',
            							bind: {
            								store: '{staffInfoListSearchStore}',
            								value: '{theStaff.rate}'
            							},
            							queryMode: 'local',
            					        displayField: 'rate',
            					        allowBlank: false,
            					        valueField: 'rate',
            					        emptyText :'Select'
            						}
                        		]
                        	}                			
                		]
                	},{
                		xtype:'container',
                		layout:{
                			type :'vbox',
                			align : 'fit'
                		},
                		defaults:{
							margin: '2 0 0 0',
							labelAlign:'right',
							labelWidth : 100,
							width : 345
						},
                		items:[{
            					xtype: 'tagfield',
            					fieldLabel: 'Secondary Role',
            					reference: 'ctlTagSroleCd',
            			        bind: {
                	    			store: '{internalStaffMngSecondaryRoleListCombo}',
                	    			value: '{theStaff.roleCd}'
                	    		},
            			        queryMode: 'local',
            			        displayField: 'scdNm',
               					valueField: 'scd',
               					value : '',
               					listeners: {
            						change: 'onInternalStaffManagementChangeTagField'
            					},
            					allowBlank: true,
            					emptyText :'Select'
    						}
                		]
                	}
                ]
    		},
    		{//Grid
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				//usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				listeners : {
					cellClick: 'onStaffGridClick',
					pagingSearch: 'onInternalStaffManagementGridSearch'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false,
					mode: 'SINGLE',
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('InternalStaffManagement')
				}
		    }],
		    
	    dockedItems: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			defaults: {
				margin: '1 1 1 1'
			},
			items: [
			{
				xtype: 'tbfill'
			},
			{
				xtype: 'button',
				text: ViewUtil.getLabel('search'),
				itemId: 'inquiryItemId',
				iconCls: 'x-fa fa-search',
				cls: 'search-button', 
				reference:'refBtnRetrieve',
				listeners: {
					click: 'onInternalStaffManagementGridSearch'
				}
			},{
                xtype: 'button',
                width: 100,
                text: ViewUtil.getLabel('add'),
                itemId: 'createItemId',
                ui: 'create-button',
				iconCls: 'x-fa fa-plus',
				reference:'refBtnCreate',
                listeners: {
                	click: 'onAdd'
                }
            },{
				xtype: 'button',
				text: ViewUtil.getLabel('remove'),
				itemId: 'deleteItemId',
				reference:'refBtnDelete',
				ui: 'delete-button',
				iconCls: 'x-fa fa-minus',
				disabled:true,
				listeners: {
					click: 'onRemove'
				}
			},{
				xtype: 'button',
				text: 'Save',
				itemId: 'saveItemId',
				ui: 'update-button',
				iconCls: 'x-fa fa-save',
				reference:'refBtnSave',
				listeners: {
					click: 'onSave'
				}
			},{
				xtype: 'button',
				text: 'Clear',
				iconCls: 'fa fa-file-o',
				reference:'refBtnClear',
				listeners: {
					click: 'onClear'
				}					
			}
			,{
				xtype: 'button',
				cls: 'column-setting-button',
				iconCls: 'x-fa fa-columns',
				text: ViewUtil.getLabel('column'),
				listeners: {
					click: 'onColumnSettingPopup',
					args: [me.MAIN_GRID_REF_NAME]
				}
			
			}]
        },
		{
			xtype: 'toolbar',
			enableOverflow: true,
			padding : '0 0 0 0',
			defaults: {
				labelAlign: 'right',
			},
			items: [{
				xtype: 'searchfieldset',
				title: ViewUtil.getLabel('search'),
				autoScroll: true,
				collapsible:true,
				flex:1,
				margin: '5 5 5 5',
				padding: '5 5 5 5',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				defaults:{
					margin: '0 0 5 0'
				},
				items: [
					{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						labelWidth:100,
						labelAlign: 'right',
						//margin: '2 0 0 0'
					},
					items: [
					{
						xtype: 'combo',
						reference: 'ctlSearchRoleCombo',
						fieldLabel: ViewUtil.getLabel('searchRole'),
						width:325,
						align: 'right',
						queryMode: 'local',
						bind: {
							store: '{roleCodeListCombo}',
							value: '{theSearch.roleCd}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						value : '',
						emptyText: ViewUtil.getLabel('searchRole'),
						editable: false,
						allowBlank: true
					},
					{
						xtype: 'combo',
						reference: 'ctlUserYNCombo',
						width: 280,
						fieldLabel: ViewUtil.getLabel('activestatus'),
						queryMode: 'local',
						   bind: {
							/*store: '{userInternalYnCombo}',
							value: '{theSearch.useYn}'*/
								store: {
    						        data: [
    						            { comCode: 'Y', comName: 'Y' },
    						            { comCode: 'N', comName: 'N' },
    						        ]
    						    },
						        value: '{theSearch.useYn}'
						},
						value: 'Y',
						emptyText :'Select',
						displayField: 'comName',
                		valueField: 'comCode',
                		editable: false,
                		allowBlank: true
					}]
				},
				{//Search.Row2:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						labelWidth:100,
						labelAlign: 'right',
						margin: '0 0 0 5'
					},                        
					items: [
					{
						xtype: 'textfield',
						reference: 'txtStaffCd',
						width: 170,
						margin: '0 0 0 0',
						fieldLabel: ViewUtil.getLabel('staffNo'),
						maxLength: 6,
						bind:{
							value: '{theSearch.empId}'
						},
						enforceMaxLength : true,
						maskRe: /[0-9]/
					},
					{
						xtype: 'textfield',
						reference: 'txtStaffNm',
						//margin: '5 0 0 5',
						width: 150,
						bind:{
							value: '{theSearch.empName}'
						},
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
					},
					{
						xtype: 'combo',
						reference: 'ctlContractCombo',
						fieldLabel: ViewUtil.getLabel('contract'),
						margin: '0 0 0 0',
						width:280,
						queryMode: 'local',
						bind: {
							store: '{contractDivisionSearchListCombo}',
							value: '{theSearch.conttDiv}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						value: '',
						emptyText: ViewUtil.getLabel('searchCode'),
						editable: false,
						allowBlank: true
					},
					{
						xtype: 'combo',
						reference: 'ctlCostCenterCombo',
						fieldLabel: ViewUtil.getLabel('costCenter'),
						margin: '0 0 0 0',
						width:295,
						queryMode: 'local',
						bind: {
							store: '{costCenterListCombo}',
							value: '{theSearch.costCentCd}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						value : '',
						emptyText: ViewUtil.getLabel('searchCode'),
						editable: false,
						allowBlank: true
					}]
				}]
			}]
		}]
	});
		
	me.callParent();
	}
});

