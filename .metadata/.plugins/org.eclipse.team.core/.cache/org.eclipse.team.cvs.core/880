Ext.define('MOST.view.usercontrol.BargeField', {
	extend: 'Ext.Container',
	alias: 'widget.bargefield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'bargefield',
	
	viewModel: {
		type: 'assignmentbargepopup'
	},
	
	layout:'hbox',
	
	config:{
		allowBlank : true,
		editableControl : true,
		visibleName : false,
		parent : null,
		params : null,
		vslCallId : '',
		bargeNo : '',
		searchType: ''
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
		            labelWidth: 30,
		            maxLength:20,
					enforceMaxLength: true,
					fieldStyle : 'text-transform: uppercase',
		            listeners: {
			        	beforeRender: 'onRenderField',
			        	focusleave: 'onFieldFocusleave',
						focus: 'onFocus',
						change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					}
		        },{
					xtype: 'button',
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
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
		 		
		 	getVslCallId: function(){
		 		return this.vslCallId;
		 	},
		 	
		 	setVslCallId: function(codeValue){
		 		this.vslCallId = codeValue;
		 	},
		 	
		 	getBargeNo: function(){
		 		return this.bargeNo;
		 	},
		 	
		 	setBargeNo: function(codeValue){
		 		this.bargeNo = codeValue;
		 	},
		 	
		 	getSearchType: function(){
		 		return this.searchType;
		 	},
		 	
		 	setSearchType: function(codeValue){
		 		this.searchType = codeValue;
		 	},
		 	
		});
		
		me.callParent();
	}

});