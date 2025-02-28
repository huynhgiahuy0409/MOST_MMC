Ext.define('MOST.view.usercontrol.GateTicketNoField', {
	extend: 'Ext.Container',
	alias: 'widget.gateticketnofield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'gateticketnofield',
	
	viewModel: {
		type: 'gateticketnopopup'
	},
	
	lblDefaultLabel: {type: 'bundle', key: 'grPopup'},
	
	layout:'hbox',
	
	config:{
		allowBlank : true,
		editableControl : true,
		editableFieldControl: true,
		visibleName : false,
		parent : null,
		lorryNo : null,
		vslCallId : null,
		tabMode: null,
		gateInOut: null,
		maxLength: 35,
		popupType: 'S', //M: Multi select
	},
	
	updateEditableControl : function(value){
		var me = this;
		var fieldButton = this.lookupReference("ctlOpenPopupButton");
		var fieldControl = this.lookupReference("ctlField");
		
		if(fieldControl && fieldButton){
			fieldControl.setEditable(value);
			fieldButton.setDisabled(!value);			
		}
	},
	updateEditableFieldControl : function(value){
		var me = this;
		var fieldControl = this.lookupReference("ctlField");
		
		if(fieldControl){
			fieldControl.setEditable(value);
		}
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			defaults:{
				labelAlign: 'right'
			},
			items:[
				{
		            xtype: 'textfield',
		            flex:1,
		            margin: '0 5 0 0',
		            reference:'ctlField',
		            fieldLabel: me.lblDefaultLabel,
		            labelWidth: 30,
		            fieldStyle : 'text-transform: uppercase',
		            maxLength: this.maxLength,
					enforceMaxLength: true,
		            listeners: {
		            	focusleave: 'onFieldFocusleave',
			        	beforeRender: 'onRenderField'
					}
		        },{
					xtype: 'button',
					//height: 25,
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					listeners:{
						click: 'openCodePopup'
					}
				}
			],
			
			getValue:function(){
				return me.lookupReference("ctlField").getValue();
		 	},
		 	
		 	setValue:function(codeValue){
		 		me.lookupReference("ctlField").setValue(codeValue);
		 	},
		 	
		 	getLorryNo:function(){
				return this.lorryNo;
		 	},
		 	
		 	setLorryNo:function(codeValue){
		 		this.lorryNo = codeValue;
		 	},
		 	
		 	getVslCallId:function(){
				return this.vslCallId;
		 	},
		 	
		 	setVslCallId:function(codeValue){
		 		this.vslCallId = codeValue;
		 	},
		 	
		 	getTabMode:function(){
				return this.tabMode;
		 	},
		 	
		 	setTabMode:function(codeValue){
		 		this.tabMode = codeValue;
		 	},
		 	
		 	getGateInOut:function(){
				return this.gateInOut;
		 	},
		 	
		 	setGateInOut:function(codeValue){
		 		this.gateInOut = codeValue;
		 	}
		});
		
		me.callParent();
	}

});