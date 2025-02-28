Ext.define('MOST.view.operation.Shftgdbank', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vesselshiftinghht',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.scroll.Scroller',
		
		//<< Model, Controller:
		'MOST.view.operation.VesselShiftingHHTController',
		'MOST.view.operation.VesselShiftingHHTModel',
		//>>
		
		//<< tab(view):
		'MOST.view.operation.DoubleBankingTab',
		'MOST.view.operation.ShipToShipTab',
		'MOST.view.operation.CargoShiftingTab',
		'MOST.view.operation.VesselShiftingTab',
		//>>
		
		//<< popup:
		'MOST.view.popup.VslCallIdFieldHHT',
		'MOST.view.popup.VesselPopupHHT',
		'MOST.view.popup.CommonCodePopupHHT',
		//>>
	],
	
	controller: 'vesselshiftinghht',
	viewModel: {
		type: 'vesselshiftinghht'
	},
	
	listeners: {
		initialize: 'onTblLoad',
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},
	
	layout: 'fit',
	shadow: false,
	padding: 5,	
	
	items: [{
		xtype: 'formpanel',
		padding: 0,
		layout: { 
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			//Button	--> need to remove
			hidden: true,
			xtype: 'fieldset',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'button',
				reference: 'refBtnVslShiftingRetrieveHHT',
				text: 'Retrieve',
				ui: 'retrieve-button-modern',
				handler: 'onTblRetrieve',
			},{
				//Wk Date, Shift
				xtype: 'fieldset',
				hidden: true,
				flex: 1,
				layout: {
					type: 'hbox',
					align: 'right'
				},
				items: [{	
					xtype: 'datefield',
					reference: 'refWorkingDate',
					flex: 1,
					label: {type: 'bundle', key: 'workingYMD'},
					dateFormat: 'd/m/Y',
					labelAlign: 'left',
					required: true,
					disableTime: true,
					disabled: true
				},{
					xtype: 'combobox',
					flex: 1,
					reference: 'refCbxShft',
					style: 'margin-left: 20px',
					bind: {
						store: '{shiftCombo}',
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
					readOnly: true,
					disabled: true
				}]
			}]
		},{
			//tab
			xtype: 'tabpanel',
			flex:1,
	        tabBar: {
	            layout: {
	                pack: 'start',
	                overflow: 'scroller'
	            }
	        },
			layout:{
				animation: null
			},
			tabBarPosition: 'top',
	        defaults: {
	            scrollable: true,
	            layout: 'fit',
	            userCls: 'card',
	            tab: {
	                flex: 1,
	                ui: 'md-tab'    
	            }
	        },			
			items: [{
				xtype: 'app-dbbanking',
				reference: 'refDbbankingTab',
				flex: 1,
				title: 'DBL Banking'
			},{
				xtype: 'app-sts',
				flex: 1,
				title: 'Ship > Ship'
			},{
				xtype: 'app-shiftg',
				flex: 1,
				title: 'VSL Shifting'
			},{
				xtype: 'app-CgShif',
				flex: 1,
				title: 'CG Shifting'
			}]
		
		}]
	}]
});
