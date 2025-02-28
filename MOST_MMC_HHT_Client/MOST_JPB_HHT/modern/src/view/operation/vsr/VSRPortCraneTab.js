Ext.define('MOST.view.operation.VSRPortCraneTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrportcranehht',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],
	reference: 'vsrportcranehht',
	itemId: 'vsrportcranehht',

	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,

	listeners: {
		//show: { fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS'] }
	},
	items: [{
		xtype: 'formpanel',
		padding: 0,
		reference: 'refFrmVsrPortCraneHHT',
		// bind: {
		// 	disabled: '{!globalJpvcCheck}',
		// },
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
		{	//Row1: Form Detail
			xtype: 'fieldset',
			layout: 'vbox',
			items: [
    		{
    			xtype: 'container',
    			layout: 'hbox',
    			items: [
				{	//left: Row1.Col1
					xtype: 'container',
					flex: 1,
					defaults:{
						//margin: '5 0 0 0'
					},
					layout: 'vbox',
					items: [
					{
						xtype: 'container',
						layout: 'hbox',
						items:[
							{	//Ship Crane Radio
								xtype: 'radiofield',
								reference: 'refShipCraneRdo',
								name: 'CraneRdoGroup',
								value: 'shipCrane',
								label: 'Ship Crane',
								labelWidth: 100,
								labelAlign: 'left',
								checked: false,
								listeners: {
									change: 'onChangeCraneHHTGroup'
								},
								width: 120
							},
							{	//Port Cran Radio
								xtype: 'radiofield',
								reference: 'refPortCraneRdo',
								name: 'CraneRdoGroup',
								value: 'portCrane',
								label: 'Port Crane',
								labelWidth: 100,
								labelAlign: 'left',
								checked: true,
								listeners: {
									change: 'onChangeCraneHHTGroup'
								},
								width: 120
							},
						]
					},
	    			{	//Ship Crane, Port Crane Combo
	    				xtype: 'container',
	    				layout: 'hbox',
	    				items: [
	    				{
	    					xtype: 'combobox',
	    					reference: 'refPCEqNoHHT',
	    					flex: 1,
	    					label: 'Port Crane EQ',
							labelWidth: 100,
							labelAlign: 'left',
	    					bind: {
	    						store: '{eqPCCombo}',
	    						required: '{CraneModeHHT}',
	    					},
	    					displayField: 'engNm',
	    					valueField: 'eqNo',
	    					listeners: {
	    						change: 'onChangeEqTypeHHT'
	    					},
	    					editable: false,
	    					clearable: true,
	    					queryMode: 'local',
	    				},
	    				{
	    					xtype: 'combobox',
	    					reference: 'refPCShipCraneHHT',
	    					flex: 1,
	    					label: 'Ship Crane EQ',
							labelWidth: 100,
							labelAlign: 'left',
	    					bind: {
	    						store: '{shipCraneCombo}',
	    						required: '{!CraneModeHHT}',
	    					},
	    					displayField: 'scdNm',
	    					valueField: 'scd',
	    					hidden: true,
	    					editable: false,
	    					clearable: true,
	    					queryMode: 'local',
	    				}]
	    			},
	    			{
	    				xtype: 'container',
	    				layout: 'hbox',
	    				items: [{
	    					xtype: 'textfield',
	    					reference: 'refPCCapaCdHHT',
	    					flex: 1,
	    					bind: '{theVSRPortCrane.capaCd}',
	    					labelWidth: 90,
	    					hidden: true,
	    					labelAlign: 'left',
	    					disabled: true,
	    				},
	    				{
	    					xtype: 'spacer',
	    					width: 5
	    				},
	    				{
	    					xtype: 'textfield',
	    					reference: 'refPCCapaDescHHT',
	    					flex: 1,
	    					bind: '{theVSRPortCrane.capaDescr}',
	    					labelWidth: 90,
	    					labelAlign: 'left',
	    					disabled: true,
	    					hidden: true
	    				}]
	    			}, 
	    			{	//JPB
	    				xtype: 'container',
	    				layout: 'hbox',
	    				items: [
	    				{
	    					xtype: 'radiofield',
	    					reference: 'refPortCraneJPBRdo',
	    					name: 'JPBGroup',
	    					value: 'JPB',
	    					label: 'Internal',
	    					labelAlign: 'right',
	    					labelTextAlign: 'right',
	    					labelWidth: 80,
							checked: true,
	    					listeners: {
	    						change: 'onChangeJPBGroup'
	    					},
	    					width: 100
	    				},
	    				{
	    					xtype: 'combobox',
	    					reference: 'refVSRJPBscbx',
	    					flex: 3,
	    					bind: {
	    						store: '{empPCCombo}',
	    						value: '{theVSRPortCrane.empId}',
								required: '{JPBModeHHT}',
								disabled: '{!JPBModeHHT}',
								readOnly: '{!JPBModeHHT}',
	    					},
	    					displayField: 'empNm',
	    					valueField: 'empId',
	    					// listeners: {
	    					// 	change: 'onBerthLocationComboChange'
	    					// },
	    					queryMode: 'local',
	    					editable: false,
	    					clearable: true,
	    				}]
	    			},
	    			{	// Contractor
	    				xtype: 'container',
	    				layout: 'hbox',
	    				items: [
	    				{
	    					xtype: 'radiofield',
	    					reference: 'refPortCraneContractorRdo',
	    					name: 'JPBGroup',
	    					value: 'contractor',
	    					label: 'Contractor',
	    					labelAlign: 'right',
	    					labelTextAlign: 'right',
	    					labelWidth: 80,
							checked: false,
	    					listeners: {
	    						change: 'onChangeJPBGroup'
	    					},
	    					width: 100
	    				},
	    				{
	    					xtype: 'textfield',
	    					reference: 'refPCContractorHHTField',
	    					flex: 1,
	    					bind: {
	    						value: '{theVSRPortCrane.cnrtCd}',
								required: '{!JPBModeHHT}',
								disabled: '{JPBModeHHT}',
								readOnly: '{JPBModeHHT}'
	    					},
	    					listeners: {
	    						focusleave:{
	    							fn: 'onPartnerFocusleave',
	    							e:'Contractor'
	    						},
	    					},
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onSearchPartnerHHT',
								},
							},
	    				},
	    				// {
	    				// 	xtype: 'button',
	    				// 	reference: 'refBtnContractorPC',
	    				// 	handler: 'onSearchPartnerHHT',
	    				// 	iconCls: 'x-fa fa-search'
	    				// }
						]
	    			},
					{	//Row Date
						xtype: 'container',
						layout: 'vbox',
						items: [{
							xtype: 'datetimelocalfield',
							flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							reference: 'refStartTimePortCranefield',
							label: 'Start Time',
							labelWidth: 100,
							labelAlign: 'left',
							required: true,
							inputType: 'datetime-local'
						},
						
						{
							xtype: 'datetimelocalfield',
							flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							reference: 'refEndTimePortCranefield',
							label: 'End Time',
							labelWidth: 100,
							labelAlign: 'left',
							inputType: 'datetime-local',
							required: true,
							clearable: false,
							typeAhead: true
						}]
					}
					]
				},
				{
					xtype: 'spacer',
					width: 15
				},
				{//right
					xtype: 'container',
					flex: 1,
					layout: 'vbox',
					defaults:{
						//margin: '5 0 0 0'
					},
					items: [
					{
						xtype: 'combobox',
						reference: 'refPurposePortCranecbx',
						label: 'Purpose',
						labelWidth: 90,
						labelAlign: 'left',
						bind: {
							store: '{purposeCombo}',
							value: '{theVSRPortCrane.purpose}',
						},
						displayField: 'scdNm',
						valueField: 'scd',
						editable: false,
						clearable: true,
						required:true,
					}, 
					{
						xtype: 'container',
						layout: 'hbox',
						items: [
						{
							xtype: 'textfield',
							reference: 'refRequesterPortCraneField',
							flex: 1,
							label: 'Requester', 
							labelWidth: 90,
							labelAlign: 'left',
							bind: '{theVSRPortCrane.payer}',
							listeners: {
								focusleave:{
									fn: 'onPartnerFocusleave',
									e:'Requestor'
								},
								change: function(field, newValue){
									field.setValue(newValue.toUpperCase());
								}
							},
							required: true,
							//style: 'background-color: #f2f22e',
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onSearchRequesterPCHHT'
								},
							},
						}, 
						// {
						// 	xtype: 'button',
						// 	reference: 'refBtnRequesterPortCrane',
						// 	handler: 'onSearchRequesterPCHHT',
						// 	iconCls: 'x-fa fa-search'
						// }
						]
					}, 
					{
						xtype: 'combobox',
						reference: 'refPCCargoTypeHHT',
						label: 'Cargo Type',
						labelWidth: 90,
						labelAlign: 'left',
						bind: {
							store: '{cargoCombo}',
							value: '{theVSRPortCrane.cgTpCd}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						// listeners: {
						// 	change: 'onBerthLocationComboChange'
						// },
						editable: false,
						clearable: true,
						required: true,
					},
					{
						xtype: 'textareafield',
						label: 'Remark',
						labelWidth: 90,
						labelAlign: 'left',
						flex: 1,
						maxLength: 150,
						reference: 'refPortCraneRmkHHTField',
						bind: '{theVSRPortCrane.rmk}',
						//style: 'background-color: #f2f22e',
					}]
				}]
    		},
			]
		}, 
		{	//Row Button:
			xtype: 'container',
			layout: 'hbox',
			items: [
			{
				xtype: 'button',
				reference: 'refBtnVSRCheckPCListRetrive',
				iconCls: 'x-fa fa-search',
				text: 'Retrieve',
				handler: 'onSearchHHT',
				flex: 1,
				ui: 'retrieve-button-modern',
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'onClearPortCraneHHT',
				flex: 1,
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				text: { type: 'bundle', key: 'clear' },
				handler: 'onClearPortCraneHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'onAddPortCraneHHT',
				flex: 1,
				iconCls: 'x-fa fa-plus',
				ui: 'create-button-modern',
				text: { type: 'bundle', key: 'add' },
				handler: 'onAddPortCraneHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'onUpdatePortCraneHHT',
				flex: 1,
				ui: 'update-button-modern',
				iconCls: 'x-fa fa-save',
				text: { type: 'bundle', key: 'update' },
				handler: 'onCheckUpdatePortCraneHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'onDeletePortCraneHHT',
				flex: 1,
				iconCls: 'x-fa fa-minus',
				ui: 'delete-button-modern',
				text: { type: 'bundle', key: 'delete' },
				handler: 'onDeletePortCraneHHT'
			}]
		},
		{	//grid
			xtype: 'container',
			layout: 'hbox',
			flex: 1,
			responsiveConfig: {
				 small: {
					 flex: 1
				 },
				 large: {
					 flex: undefined,
					 height: 300
				 }
			},
			scrollable: true,
			items: [{
				xtype: 'grid',
				reference: 'refPortCraneHHTGrid',
				bind: {
					store: '{portCraneList}'
				},
				listeners: {
					select: 'onGridPortCraneClick'
				},
				selectable:{
					mode: 'single'
				},
				columns: [{
					text: { type: 'bundle', key: 'gridNo' },
					xtype: 'rownumberer',
					width: 50,
					align: 'center'
				}, {
					text: { type: 'bundle', key: 'cranegroup' },
					dataIndex: 'craneGroup',
					reference: 'refCraneGroup',
					width: 120
				}, {
					text: { type: 'bundle', key: 'eqtype' },
					dataIndex: 'eqNo',
					reference: 'refEqType',
					width: 180
				}, {
					text: { type: 'bundle', key: 'eqName' },
					dataIndex: 'engNm',
					width: 100
				}, {
					text: { type: 'bundle', key: 'capacity' },
					dataIndex: 'capaDescr',
					width: 150
				}, {
					text: { type: 'bundle', key: 'driverTp' },
					reference: 'refColDriverTp',
					hidden: true,
					dataIndex: 'mbsCd',
					width: 150,
				}
				, {
					text: { type: 'bundle', key: 'purpose' },
					dataIndex: 'purposeNm',
					width: 100
				}, {
					text: { type: 'bundle', key: 'operator' },
					dataIndex: 'operator',
					width: 100
				}, {
					text: { type: 'bundle', key: 'cargoTp' },
					dataIndex: 'cgTpCd',
					width: 100
				}, {
					text: { type: 'bundle', key: 'requestor' },
					dataIndex: 'payer',
					width: 100
				}, {
					text: { type: 'bundle', key: 'startTime' },
					dataIndex: 'workStDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 100
				}, {
					text: { type: 'bundle', key: 'endTime' },
					dataIndex: 'workEndDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 100
				}, {
					text: { type: 'bundle', key: 'remarks' },
					dataIndex: 'rmk',
					width: 250
				}]
			}]
		}]
	}]
});
