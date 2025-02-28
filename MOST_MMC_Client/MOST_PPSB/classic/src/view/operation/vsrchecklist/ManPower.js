Ext.define('MOST.view.operation.vsrchecklist.ManPower', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-manpower',
	
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
	 MANPOWER_GRID_REF_NAME: 'refManPowerGrid',  // Main Grid Name 
	 MANPOWER_STORE_NAME: 'manPowerList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'fieldset',
				margin: '0 0 5 5',
				width: 380,
				defaults: {
					margin: '5 5 0 0',
					labelAlign: 'right',
					labelWidth: 100,
					width: 300
				},
				items: [{
					xtype: 'combo',
					reference:'refRoleCd',
					allowBlank: false,
					fieldLabel: ViewUtil.getLabel('roleCd'),
					forceSelection: true,
					bind: {
						store: '{roleCombo}',
						value: '{theManPower.rsNm}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					editable: false,
					emptyText:'Select',
					listeners: {
						select: 'onSelectManPowerRoleCombo',
						afterrender: function(combo) {
					        if (!combo.isValid()) {
					            combo.addCls('x-form-invalid-field');
					        } else {
					            combo.removeCls('x-form-invalid-field');
					        }
					    }
				   	}
				},{
					xtype: 'container',
					layout:{
						type: 'hbox',
						align: 'stretch'
					},
					margin: '5 5 5 0',
					items: [{
						xtype:'textfield',
						reference:'ctlEmpId',
						allowBlank: false,
						forceSelection: true,
						fieldLabel: ViewUtil.getLabel('jPB'),
						labelAlign: 'right',
						editable:false,
						width: 250,
						labelWidth: 100,
						bind: {
							value: '{theManPower.empId}'
						},
						listeners: {
							afterrender: function(textfield) {
						        if (!textfield.isValid()) {
						        	textfield.addCls('x-form-invalid-field');
						        } else {
						        	textfield.removeCls('x-form-invalid-field');
						        }
						    }
						}
					},
					{
						xtype: 'button',
						reference: 'refEmpPopupBtn',
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 5',
						listeners:{
							click:'openEmpIdPopup'
						},
						disabled: true
					}]
				},{
					xtype: 'textfield',
					margin: '0 5 0 105',
					reference: 'refEmpNm',
					editable: false,
					fieldStyle: 'text-align:left',
					width: 195,
					bind: {
						value: '{theManPower.empNm}'
					},
				},
				{
					xtype: 'textfield',
					reference: 'ctlManPowerWorkingArea',
					fieldLabel: ViewUtil.getLabel('workingArea'),
					labelWidth: 100,
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
					reference: 'refManPowerStartTime',
					xtype: 'datetimefield',
					allowBlank: false,
					forceSelection: true,
					fieldLabel: ViewUtil.getLabel('startTime'),
					editable:false,
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					width: 250,
					bind: {
						value: '{theManPower.workStDt}'
					},
				},{
					reference: 'refManPowerEndTime',
					xtype: 'datetimefield',
					allowBlank: false,
					forceSelection: true,
					fieldLabel: ViewUtil.getLabel('endTime'),
					editable:false,
					width: 250,
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					bind: {
						value: '{theManPower.workEndDt}'
					},
				},{
					xtype: 'textfield',
					reference: 'refManPowerRemarks',
					fieldLabel: ViewUtil.getLabel('remarks'),
					fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
					listeners:{
						change: 'onUpperCase'
					},
					bind: {
						value: '{theManPower.rmk}'
					},
				}]
			},{
				xtype: 'panel',
				layout: 'fit',
				flex: 1,
				defaults: {
					margin: '0 5 5 5',
					labelAlign: 'right',
				},
				items: [{
					xtype: 'tsb-datagrid',
					reference: me.MANPOWER_GRID_REF_NAME,
					flex: 1,
					usePagingToolbar : false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MANPOWER_STORE_NAME + '}'
					},
					selModel: {
//						selType: 'rowmodel',
						cellSelect: false,
						mode: 'SINGLE',
						type: 'spreadsheet',
					},
					 
					listeners : {
						cellclick: 'onManPowerClick',
					},
					
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('VSRManPower')
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
					reference: 'refsClearManPower',
					ui: 'create-button',
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onClearManPower'
					}
				},
				{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					reference: 'refsAddManPower',
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAddManPower'
					}
				},
				{
					xtype: 'button',
					text: ViewUtil.getLabel('update'),
					reference: 'refsUpdateManPower',
					ui: 'update-button',
					iconCls: 'fa fa-pencil-square-o',
					listeners: {
						click: 'onUpdateManPower'
					}
				}, {
					xtype: 'button',
					itemId: 'deleteButton',
					text: ViewUtil.getLabel('remove'),
					reference: 'refsRemoveManPower',
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemoveManPower'
					}
				}]
			}]	
		});
		
		me.callParent();
	}
});