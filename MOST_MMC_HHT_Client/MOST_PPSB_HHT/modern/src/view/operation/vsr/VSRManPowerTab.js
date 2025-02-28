Ext.define('MOST.view.operation.VSRManPowerTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrmanpowerhht',

	requires: [
		
	],
		
	reference: 'vsrmanpowerhht',
	itemId: 'vsrmanpowerhht',
	
	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	
	listeners: {
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},
	items: [{
		xtype: 'formpanel',
		padding: 0,
		reference: 'refFrmVsrManPowerHHT',
//		bind: {
//			disabled: '{!globalJpvcCheck}' ,
//		},		
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
		{	//Row 1: detail form
			xtype: 'fieldset',
			//padding: '0 0 0 0',
			//margin: '0 0 0 0',
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'start'
			},
			defaults: {
				// /margin: '5 5 0 0'
			},
			items: [
			{	//Row1.Row1: Role
				xtype: 'container',
				layout: 'vbox',
				items: [
					{
						xtype: 'combobox',
						reference: 'refCboRole',
						label:  'Role',
						labelWidth: 90,
						labelAlign: 'left',
						bind: {
							store: '{roleCombo}',
							value: '{theManPower.rsNm}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						required: true,
						clearable: true,
						typeAhead: true,
						editable: false,
					}
				]
				
			},
			{	//Row1.Row2: JPB Staff:
				xtype: 'container',
				layout: 'hbox',
				items: [
					{
						xtype: 'textfield',
						reference: 'refTxtStaffId',
						flex: 1,
						label:  'Internal',
						labelWidth: 90,
						labelAlign: 'left',
						required: true,
						editable: false,
						bind: {
							value: '{theManPower.empId}'
						},
						listeners: {
							change: 'onChangeStaffIdHHT',
						},
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onJPBStaffHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onJPBStaffHHT'
					// },
					{
						xtype: 'spacer',
						width: 10
					},
					{
						xtype: 'textfield',
						reference: 'refTxtStaffNm',
						flex: 1.5,
						//label:  'JPB Staff',
						//labelWidth: 90,
						//labelAlign: 'left',
						readOnly: true,
						editable: false,
						bind: {
							value: '{theManPower.empNm}'
						},
					}
				]
			},
			{	//Row1.Row3: Start End Time:
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'datetimelocalfield',
					reference: 'refDtStartTimeManPower',
					flex: 1,
					label:  'Start Time',
					labelWidth: 90,
					labelAlign: 'left',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
					bind: {
						//value: '{theManPower.workStDt}'
					},
				},
				{
					xtype: 'spacer',
					width: 10
				},
				{
					xtype: 'datetimelocalfield',
					reference: 'refDtEndTimeManPower',
					flex: 1,
					label:  'End Time',
					labelWidth: 90,
					labelAlign: 'left',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
					bind: {
						//value: '{theManPower.workEndDt}'
					},
				}]
			},
			{	//Row1.Row3: Working Area, Remark
				xtype: 'container',
				layout: 'hbox',
				items: [
				{
					xtype: 'textfield',
					reference: 'refTxtWorkingArea',
					flex: 1,
					label:  'Working Area',
					labelWidth: 90,
					labelAlign: 'left',
					required: true,
					//readOnly: true,
					//editable: false,
					bind:{
						value : '{theManPower.workLoc}'
					},
					fieldStyle: 'background-color: #ccffff;',
					triggers: {
						someField: {
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onSearchWorkingAreaManPowerHHT'
						}
					},
				},
				{
					xtype: 'spacer',
					width: 10
				},
				{
					xtype: 'textfield',
					flex: 1,
					reference: 'refTxtRemark',
					bind: {
						value: '{theManPower.rmk}'
					},
					label:  'Remarks',
					labelWidth: 90,
					labelAlign: 'left',
				}]
			}]
		},
		{	//Row2: button:
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'right'
			},
			items: [
			{
				xtype: 'button',
				reference: 'refSearchBtnManPwVSRCheckList',
				text: 'Retrieve',
				handler: 'onSearchHHT',
				flex: 1,
				iconCls: 'x-fa fa-search',
				ui: 'retrieve-button-modern',
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDBClear',
				text: 'Clear',
				flex: 1,
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				handler: 'onClearManPowerHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},{
				xtype: 'button',
				reference: 'refBtnDBAdd',
				text: 'Add',
				flex: 1,
				ui: 'create-button-modern',
				iconCls: 'x-fa fa-plus',
				handler: 'onAddManPowerHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDBUpdate',
				text: 'Update',
				flex: 1,
				iconCls: 'x-fa fa-save',
				ui: 'update-button-modern',
				handler: 'onUpdateManPowerHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDBDelete',
				text: 'Delete',
				flex: 1,
				ui: 'delete-button-modern',
				iconCls: 'x-fa fa-minus',
				handler: 'onDeleteManPowerHHT'
			}]
		},
		{	//Row3: Grid
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			/*responsiveConfig: {
				 small: {
					 flex: 1
				 },
				 large: {
					 flex: undefined,
					 height: 350
				 }
			},*/
			items: [{
				xtype: 'grid',
				reference: 'refGrdManPower',
				bind: {
					store: '{manPowerList}'
				},
				listeners: {
					childsingletap: 'onSelectGriddManPowerHHT'
				},
				selectable: {
					columns: false,
					checkbox: false,
					checkboxSelect: false,
					rows: true,
					cells: false,
					mode: 'single',
					deselectable: true,
					headerCheckbox: false,
				},
				columns: [{
					text: 'No',
					xtype: 'rownumberer',
					width : 60,
					align : 'center',
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'roleCd'},
					dataIndex: 'rsNm',
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'staffId'},
					dataIndex: 'empId',
					//width: 120,
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'staffNm'},
					dataIndex: 'empNm',
					width: 220,
					renderer:function(val){
						if(val != null || val != ''){
							return val
						}
					},
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'workingArea'},
					dataIndex: 'workLoc',
					width: 200,
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'staffTime'},
					dataIndex: 'workStDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160,
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'endTime'},
					dataIndex: 'workEndDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160,
					autoSize: true
				},
				{
					text: {type: 'bundle', key: 'remarks'},
					dataIndex: 'rmk',
					width: 300,
					autoSize: true
				}]
			}]
		}],
	}]
});
