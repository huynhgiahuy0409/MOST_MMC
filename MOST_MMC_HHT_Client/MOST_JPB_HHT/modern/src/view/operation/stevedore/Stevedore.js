Ext.define('MOST.view.operation.Stevedore', {
	extend: 'Ext.Panel',
	alias: 'widget.app-stevedore',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',		
		'Ext.scroll.Scroller',
		'Ext.field.Date',
		'Ext.layout.overflow.Scroller',
		'MOST.view.operation.StevedoreStrimming',
		'MOST.view.operation.StevedorePenalty',
		'MOST.view.controller.StevedoreTrimmingModel',
		'MOST.view.controller.StevedoreTrimmingController',
		'MOST.view.common.DateTimeLocalField'
	],

	controller: 'stevedoretrimming',

	viewModel: {
		type: 'stevedoretrimming'
	},

	reference: 'stevedore',
	itemId: 'stevedoretrimming',

//	shadow: false,
//	layout: { 
//		type: 'vbox', 
//		align: 'stretch' 
//	},
//	scrollable: true,
//	columns: 1,
	
	listeners: {
		initialize: 'onTabletLoad',
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
		items: [{//buton wkdate, shift:
			xtype: 'fieldset',
			layout: 'hbox',
			hidden: true,
			defaults: {
				margin: '0 0 0 0',	
			},					
			items: [
    		{
    			xtype: 'button',
    			//reference: 'refBtnStevedoreTmRetrieve',
    			iconCls: 'x-fa fa-search',
    			text: 'Retrieve',
    			handler: 'onClickRetrieveHHT',
    			width: 140,
    			ui: 'action'
    		}, 
			{//Wk Date, Shift
				//Wk Date, Shift
				xtype: 'fieldset',
				flex: 1,
				margin: '0 0 0 20',
				layout: {
					type: 'hbox',
					align: 'right'
				},
				defaults: {
					margin: '0 0 0 0',	
				},		
				items: [{
					xtype: 'datetimelocalfield',
					reference: 'refWDTextfield',
					flex: 1,
					label: {type: 'bundle', key: 'workingYMD'},
					labelAlign: 'left',
					labelWidth: 90,
					format:'d/m/Y',
					inputType: 'date',
					required: true,
					disableTime: true,
					disabled: true
				}, {
					xtype: 'combobox',
					width: 150,
					reference: 'refShiftCbx',
					style: 'margin-left: 20px',
					bind: {
						store: '{shiftCombo}',
					},
					label: 'Shift',
					flex:1,
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
		},{//tab
//			xtype: 'container',
//			flex: 1,
//			shadow: 'true',
//			layout: {
//				type: 'vbox',
//				align: 'left'
//			},
////			columns: 2,
//			items: [{
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
					xtype: 'app-stevedoreStrimming',
					flex: 1,
					title: 'Stevedore and Trimming'
				},{
					xtype: 'app-stevedorePenalty',
					flex: 1,
					title: 'Penalty'
				}]
			}]
//		}]
	}]
});
