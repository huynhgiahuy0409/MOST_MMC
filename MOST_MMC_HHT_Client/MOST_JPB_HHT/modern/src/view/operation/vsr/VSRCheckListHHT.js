Ext.define('MOST.view.operation.VSRCheckListHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrchecklisthht',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'MOST.view.operation.VSRCheckListHHTController',
		'MOST.view.operation.VSRCheckListHHTModel',
		
		'MOST.view.operation.VSRManPowerTab',
		'MOST.view.operation.VSRPortCraneTab',
		'MOST.view.operation.VSRStevedoreTab',
		'MOST.view.operation.VSRForkliftTab',
		'MOST.view.operation.VSRTrailerTab',
		'MOST.view.operation.VSRMEquipmentTab',
		'MOST.view.common.DateTimeLocalField',
		
		//PopUp:
		'MOST.view.popup.WorkingAreaPopupHHT',
		'MOST.view.popup.ContractorPopupHHT',
		'MOST.view.popup.RequesterPopupHHT',
		'MOST.view.popup.MechanicalEquipmentPopupHHT'
	],
	
	controller: 'vsrchecklisthht',
	viewModel: {
		type: 'vsrchecklisthht'
	},
	
	reference: 'vsrchecklisthht',
	itemId: 'vsrchecklisthht',
	
	/////////////////////////////////////
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	
	listeners: {
		initialize: 'onLoadHHT',
		//show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},
	items: [{
		xtype: 'container',
		layout: 'vbox',
		scrollable: true,
		items: [
		{
			//Button
			xtype: 'fieldset',
			layout: 'hbox',
			defaults: {
				margin: '0 0 0 0',	
			},
			hidden: true,
			items: [{
				xtype: 'button',
				reference: 'refBtnVSRCheckListRetrive',
				iconCls: 'x-fa fa-search',
				text: 'Retrieve',
				handler: 'onSearchHHT',
				width: 140,
				ui: 'action',
				hidden: true
			}, 
			{
				//Working Date, Shift
				xtype: 'fieldset',
				flex: 1,
				margin: '0 0 0 0',
				padding: 5,
				layout: {
					type: 'hbox',
					align: 'right'
				},
				defaults: {
					margin: '0 0 0 0',
				},
				items: [{	
					xtype: 'datetimelocalfield',
					reference: 'refWorkingDate',
					flex: 1,
					label: {type: 'bundle', key: 'workingYMD'},
					inputType: 'date',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y',
					labelAlign: 'left',
					labelWidth: 90,
					required: true,
					//disabled: true,
					//hidden: true
					listeners: {
						focusleave: 'onVSRInfoByShift'
					}
				},{
					xtype: 'combobox',
					flex: 1,
					reference: 'refCbxShft',
					style: 'margin-left: 20px',
					bind: {
						store: '{shiftList}',
					},
					label: 'Shift',
					labelAlign: 'left',
					labelWidth: 70,
					required: true,
					displayField: 'shftNm',
					valueField: 'shftId',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					listeners: {
						change: 'onVSRInfoByShift'
					}
					//readOnly: true,
					//disabled: true
				}]
			}
			]
		},{
			//Tab list
			xtype: 'tabpanel',
			reference: 'refTabVSRCheckListCtl',
			bind: {
				disabled: '{!globalJpvcCheck}' ,
			},
			layout:{
				animation: null
			},
			flex:1,
			items: [
			{
				title: 'M.Power',//'Man Power',
				xtype: 'app-vsrmanpowerhht',
				reference: 'refTabManPower',
				name: 'manPower',
				flex: 1,
				listeners: {
					activate: 'onActivateTabHHT'
				}
			},
			{
				title: 'P.Crane',//'Port Crane',
				xtype: 'app-vsrportcranehht',
				reference: 'refTabPortCrane',
				name: 'portCrane',
				flex: 1,
				listeners: {
					activate: 'onActivateTabHHT'
				}
			},
			{	// VSRStevedoreTab
				title: 'Yd Stv',//'Yd Stevedore',
				xtype: 'app-vsrstevedorehht',
				reference: 'refTabStevedore',
				name: 'ydStevedore',
				flex: 1,
				listeners: {
					activate: 'onActivateTabHHT'
				}
			},
			{	// VSRForkliftTab
				title: 'Forklift',
				xtype: 'app-vsrforklifthht',
				reference: 'refTabForklift',
				name: 'forklift',
				flex: 1,
				//listeners: {
				//	activate: 'onActivateFL'
				//}
				listeners: {
					activate: 'onActivateTabHHT'
				}
			},
			{	// VSRTrailerTab
				title: 'Trailer',
				xtype: 'app-vsrtrailerhht',
				reference: 'refTabTrailer',
				name: 'trailer',
				flex: 1,
				listeners: {
					activate: 'onActivateTabHHT'
				}
			},
			{	// VSRMEquipmentTab
				title: 'M.EQ',
				xtype: 'app-vsrmquipmenthht',
				reference: 'refTabMechanicalEQ',
				name: 'mechanicalEQ',
				flex: 1,
				listeners: {
					activate: 'onActivateTabHHT'
				}
			}]
		}]
	}]
});
