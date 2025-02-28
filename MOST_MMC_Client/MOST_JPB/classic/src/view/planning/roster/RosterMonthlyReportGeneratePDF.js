Ext.define('MOST.view.controller.RosterMonthlyReportGeneratePDF', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.app-rostermonthlyreportgeneratepdf',
	requires : [
	],

	 controller: 'rostermonthlyreportgeneratepdf',

	listeners : {
		afterrender: 'onLoadPopupPDF'
	},
	width : 350,
	height : 150,

	lblStartDate : {type : 'bundle',key : 'programManagerStartDate'},

	btnOk : {type : 'bundle',key : 'ok'},
	btnCancel : {type : 'bundle',key : 'cancel'},

	layout : {
		type : 'vbox',align : 'center'
	},
	config: {
		recvData: null,
	},
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			items : [
				{
				xtype : 'container',
				layout : {
					type : 'vbox'
				},
				items : [ {
					reference : 'ctlDateFromDt',
					xtype : 'datefield',
					id : 'ctlDateFromDt',
					labelWidth: 80,
					fieldLabel : me.lblStartDate,
					alignLabel: 'right',
					margin : '5 0 0 0',
					editable: false,
					width : 220,
					format : MOST.config.Locale.getShortDate(),
				}]
			},{
				xtype : 'radiogroup',
				layout : 'hbox',
				reference : 'ctl_optRptTp',
				margin: '10 0 0 0',
				items : [ {
					xtype : 'radiofield',
					boxLabel : 'PDF',
					name : 'rptTp',
					margin : '0 10 0 10',
					inputValue : 'PDF',
					labelWidth: 50,
					checked : true,
					width: 70
				}, {
					xtype : 'radiofield',
					boxLabel : 'EXCEL',
					margin : '0 10 0 10',
					name : 'rptTp',
					inputValue : 'EXCEL'
				} ]

			},{
				xtype : 'container',
				layout : {
					type : 'hbox'
				},
				defaults:{
					margin: '10 0 0 10'
				},
				margin: '10 0 0 10',
				items: [
					{
						xtype: 'button',
						text: me.btnOk,
						width: 70,
						listeners: {
							click: 'onOk'
						}
					},{
						
						xtype: 'button',
						text: me.btnCancel,
						width: 70,
						listeners: {
							click: 'onCancel'
						}
						
					}
				]
			} ],

		});

		me.callParent();
	}
});
