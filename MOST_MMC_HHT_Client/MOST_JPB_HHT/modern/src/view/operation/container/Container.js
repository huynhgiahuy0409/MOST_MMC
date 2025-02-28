Ext.define('MOST.view.operation.Container', {
	extend: 'Ext.Panel',
	alias: 'widget.app-containers',
	requires: [
		'MOST.view.operation.ContainerController',
		'MOST.view.operation.ContainerModel',
		'MOST.view.common.DateTimeLocalField',
	],
	
	controller: 'container',
	
	viewModel: {
		type: 'container'
	},

	layout: 'fit',
	shadow: false,
	padding: 0,
	scrollable: true,
	
	listeners: {
		initialize: 'onLoad',
		show: function() {
			var me = this;
			me.getController().onCheckValidateFormPanel('ALL_PANELS');	//check required validation for formpanel at this panel
		}		
	},
	
	reference: 'containers',
	itemId: 'containers',

	items: [{
		xtype: 'formpanel',
		padding: 0,
		layout: 'vbox',
		reference: 'refFormContrainerProcess',
		bind: {
			disabled: '{!VSLCALLID}',
		},
		
		scrollable: true,
		
		items: [{//WorkDate
			xtype: 'fieldset',
			layout: 'hbox',
			hidden: true,
			items: [
//			{
//				xtype: 'button',
//				ui: 'action',
//				text: { type: 'bundle', key: 'retrive' },
//				width: 150,
//				iconCls: 'x-fa fa-search',
//				handler: 'onSearch'
//			}, 
			// {
			// 	xtype: 'button',
			// 	ui: 'action',
			// 	margin: '0 0 0 10',
			// 	text: { type: 'bundle', key: 'ok' },
			// 	handler: 'onCancelHHT',
			// 	width: 150,
			// },
			{
				xtype: 'datetimelocalfield',
				flex: 1,
				reference: 'refWorkDate',
				labelAlign: 'left',
				required: true,
				label: 'Working Date',
				labelWidth:90,
				inputType: 'date',
				format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				bind: {
					disabled: true,
				},
			}, {
				xtype: 'combobox',
				reference: 'refCboShift',
				bind: {
					store: '{shiftStore}'
				},
				flex: 1,
				label: 'Shift',
				labelWidth: 50,
				labelAlign: 'left',
				required: true,
				displayField: 'shftNm',
				valueField: 'shftId',
				queryMode: 'local',
				clearable: true,
				typeAhead: true,
				disabled: true
			}]
		},{
			//Row 1: detail form
			xtype: 'fieldset',
			layout: 'vbox',
			defaults: {
				margin: '6 0 0 0'
			},
			items: [
				{
					xtype:'container',
					layout:'hbox',
					items:[{
						xtype: 'combobox',
						reference: 'refCboHack',
						placeholder: 'Hatch',
						bind:{
							store: '{hatchNoStore}',
							value: '{theContainerProcess.hatchNo}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						clearable: true,
						required: true,
						typeAhead: true
					},{
						xtype: 'spacer',
						width: 15
					},{
						xtype: 'combobox',
						reference: 'refCboEquip',
						bind: {
							store: '{equipmentStore}',
							value: '{theContainerProcess.eqNo}'
						},
						flex:1,
						placeholder: 'Equipment',
						displayField: 'eqNm',
						valueField: 'eqNo',
						queryMode: 'local',
						clearable: true,
						typeAhead: true,
						required: true
					}, ]
				},
				{//Loading
					xtype:'container',
					layout:'hbox',
					items:[
					{
						xtype: 'label',
						html: 'Loading Qty',
						width: 120,			
						style: 'margin-top: 10px; font-size: 14px;'
					}, 
					{
						xtype: 'numberfield',
						reference: 'reftxtL20',
						label: '20\'',
						labelTextAlign: 'left',
						ui: 'field-inputcolor',
						labelWidth: 30,
						labelAlign: 'left',
						minValue: 0,
						maxValue: 999999999,
						defaultValue: 0,
						bind: {
							value: '{theContainerProcess.l20}'
						},
						flex:1
					},{
						xtype: 'spacer',
						width: 7
					}, {
						xtype: 'numberfield',
						minValue: 0,
						maxValue: 999999999,
						defaultValue: 0,
						flex:1,
						label: '40\'',
						labelTextAlign: 'left',
						ui: 'field-inputcolor',
						labelAlign: 'left',
						labelWidth: 30,
						reference: 'reftxtL40',
						bind: {
							value: '{theContainerProcess.l40}'
						},
					}]
				},{//Discharging
					xtype:'container',
					layout:'hbox',
					items:[
					{
						xtype: 'label',
						html: 'Discharging Qty',
						width: 120,			
						style: 'margin-top: 10px; font-size: 14px;'
					}, 
					{
						xtype: 'numberfield',
						minValue: 0,
						maxValue: 999999999,
						defaultValue: 0,
						label: '20\'',
						labelWidth: 30,
						flex:1,
						labelTextAlign: 'left',
						ui: 'field-inputcolor',
						reference: 'reftxtD20',
						labelAlign: 'left',
						bind: {
							value: '{theContainerProcess.d20}'
						},
					},{
						xtype: 'spacer',
						width: 7
					}, {
						xtype: 'numberfield',
						minValue: 0,
						maxValue: 999999999,
						defaultValue: 0,
						label: '40\'',
						flex:1,
						labelWidth: 30,
						labelTextAlign: 'left',
						ui: 'field-inputcolor',
						labelAlign: 'left',
						reference: 'reftxtD40',
						bind: {
							value: '{theContainerProcess.d40}'
						},
					}]
				},{//Start End Time
					xtype:'container',
					layout:'hbox',
					items:[{
						xtype: 'datetimelocalfield',
						reference: 'refStartTime',
						flex: 1,
					//	inputType: 'datetime-local',
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
						bind: {
							value: '{theContainerProcess.stDt}',
						},
					//	labelAlign: 'left',
					//	label: { type: 'bundle', key: 'vorStartTime' },
					//	labelWidth:90,
						required: true,
					},{
						xtype: 'spacer',
						width: 15
					},{
						xtype: 'datetimelocalfield',
						reference: 'refEndTime',
						flex:1,
					//	inputType: 'datetime-local',
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
						bind: {
							value: '{theContainerProcess.endDt}',
						},
					//	labelAlign: 'left',
					//	label: { type: 'bundle', key: 'vorEndTime' },
					//	labelWidth:90,
						required: true,
					}]
			}]
		}, 
	
		{//button
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'right'
			},
			items: [
			{
				xtype: 'button',
				text: { type: 'bundle', key: 'retrive' },
				handler: 'onSearch',
				flex: 1,
				ui: 'retrieve-button-modern',
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnClear',
				flex: 1,
				ui: 'clear-button-modern',
				text: { type: 'bundle', key: 'clear' },
				handler: 'onClear'
			},
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnAdd',
				flex: 1,
				ui: 'create-button-modern',
				text: { type: 'bundle', key: 'add' },
				handler: 'onAdd'
			},
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				ui: 'update-button-modern',
				flex: 1,
				text: { type: 'bundle', key: 'update' },
				reference: 'refBtnUpdate',
				handler: 'onUpdate'
			},
			{
				xtype: 'spacer',
				width: 3
			}, {
				xtype: 'button',
				ui: 'delete-button-modern',
				flex: 1,
				text: { type: 'bundle', key: 'delete' },
				reference: 'refBtnDelete',
				handler: 'onDelete'
			}]
		},{//GRID
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			items: [{
				xtype: 'grid',
				reference: 'refContainerGridList',
				listeners:{
					select: 'onCellClick'
				},
				bind: {
					store: '{containerGridList}'
				},
				selectable:{
					columns: false,
					rows: true,
					cells: false,
					mode: 'single',
					headerCheckbox: false,
				},
				columns: [{
					text: 'Vessel Call Id',
					dataIndex: 'vslCallId',
					width: 200
				},{
					text: { type: 'bundle', key: 'workHatchNo' },
					dataIndex: 'hatchNo',
					width: 200
				},{
					text: { type: 'bundle', key: 'containerEquip' },
					dataIndex: 'eqNo',
					width: 200
				},{
					text: { type: 'bundle', key: 'vorStartTime' },
					dataIndex: 'stDt',
					width: 200
				},{
					text: { type: 'bundle', key: 'vorEndTime' },
					dataIndex: 'endDt',
					width: 200
				},{
					text: 'Loading 20',
					dataIndex: 'l20',
					width: 200
				},{
					text: 'Loading 40',
					dataIndex: 'l40',
					width: 200
				},{
					text: 'Discharge 20',
					dataIndex: 'd20',
					width: 200
				},{
					text: 'Discharge 40',
					dataIndex: 'd40',
					width: 200
				}]
			}]
		}]
	}]
});
