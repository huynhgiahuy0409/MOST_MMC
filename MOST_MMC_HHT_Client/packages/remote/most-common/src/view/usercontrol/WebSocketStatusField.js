/**
 * 2024.03.20
 * Robert create for Display Timer and Websocket status on HHT.
 * */

Ext.define('MOST.view.usercontrol.WebSocketStatusField', {
	extend : 'Ext.Container',
	alias: 'widget.websocketstatusfield',

	requires: [
		'MOST.view.usercontrol.WebSocketStatusFieldController'
	],
	
	STATUS_CONNECTED: 'Connected',
	STATUS_NOTCONNECTED: 'Not Connected',
	
	CONNECTED_STYLE:{
		color: 'yellow',
		fontSize: '18px',
		fontWeight: 'bold'
	},

	NOTCONNECTED_STYLE: {
		color: 'red', 
		fontSize: '18px',
		fontWeight: 'bold'
	},
	
	TASK_LISTTASK: ['checkStatusTask', 'clockTask'],

	controller: 'websocketstatusfield',
	
//	viewModel: {
//		type: ''
//	},

	config:{
	},
	//lblDefaultLabel: {type: 'bundle', key: 'jpvc'},
	listeners: {
		painted: 'onPained',
		destroy: 'onDestroy'
	},
	layout:'hbox',
	
//	updateEditableControl : function(value){
//		var me = this;
//		var fieldButton = this.lookupReference("ctlOpenPopupButton");
//		var fieldControl = this.lookupReference("ctlField");
//		
//		if(fieldControl && fieldButton){
//			fieldControl.setEditable(value);
//			fieldButton.setDisabled(!value);			
//		}
//	},
	
	items: [
		{
			xtype:'label',
			reference: 'refLblWsClock',
			html: 'Time',
			style: {
				color: 'white', 
				fontSize: '18px',
				fontWeight: 'bold'
			},
			//style: "font-style: italic; font-weight: bold; color: red",
		},
		{
			xtype:'label',
			html: ' - ',
			margin: '0 10 5 10',
			style: {
				color: 'white', 
				fontSize: '18px',
				fontWeight: 'bold'
			},
		},
		{
			xtype:'label',
			reference: 'refLblWsStatus',
			html:'Not Connected',
			style: {
				'color': 'red', 
				'font-size': '18px',
			},
			//style: "font-style: italic; font-weight: bold; color: red",
		}
	],
	
	setValue: function (connected){
		var me = this;
		var status_ = '', style_ = '';
		var ctl = this.lookupReference("refLblWsStatus");
		
		if(connected){
			status_ = me.STATUS_CONNECTED;
			style_ = me.CONNECTED_STYLE
			
		}else{
			status_ = me.STATUS_NOTCONNECTED;
			style_ = me.NOTCONNECTED_STYLE
		}
		
		ctl.setHtml(this.CONNECTED);
		ctl.setStyle(style_);
		ctl.setHtml(status_);
	},
	
	getValue: function (){
		var me = this;
		var status_ = '', style_ = '';
		var ctl = this.lookupReference("refLblWsStatus");
		return ctl.getHtml();
	},
	
	getHtml: function (){
		var ctl = this.lookupReference("refLblWsStatus");
		return ctl.getHtml();
	},
	
	setHtml: function (value){
		var me = this;
		var status_ = '', style_ = '';
		var ctl = this.lookupReference("refLblWsStatus");
		
		if(value){
			status_ = me.STATUS_CONNECTED;
			style_ = me.CONNECTED_STYLE
			
		}else{
			status_ = me.STATUS_NOTCONNECTED;
			style_ = me.NOTCONNECTED_STYLE
		}
		
		ctl.setHtml(this.CONNECTED);
		ctl.setStyle(style_);
		ctl.setHtml(status_);
	}
});


 