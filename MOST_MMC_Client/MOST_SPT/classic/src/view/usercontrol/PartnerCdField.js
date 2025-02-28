Ext.define('MOST.view.usercontrol.PartnerCdField', {
	extend: 'Ext.Container',
	alias: 'widget.partnercdfield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'partnercdfield',
	
	viewModel: {
		type: 'partnercdpopup'
	},
	
	layout:'hbox',
	
	config:{
		allowBlank : true,
		editableControl : true,
		visibleName : false,
		parent : null,
		params : null
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
			        	change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					}
		        },{
					xtype: 'button',
					//height: 25,
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click:{
							fn : 'openPopup',
							args : ['popup-partnercdpopup']
						}
					}
				}
			],
			
			getValue:function(){
				return me.lookupReference("ctlField").getValue();
		 	},
		 	
		 	setValue:function(codeValue){
		 		me.lookupReference("ctlField").setValue(codeValue);
		 	},
		 	setDisabled:function(value){
				var fieldButton = me.lookupReference("ctlOpenPopupButton");
				var fieldControl = me.lookupReference("ctlField");
				
				if(fieldControl && fieldButton){
					fieldControl.setEditable(!value);
					fieldButton.setDisabled(value);
				}
		 	},
		 	
		 	setEditable: function(value){
				var fieldControl = me.lookupReference("ctlField");
				if(fieldControl){
					fieldControl.setEditable(value);
				}
		 	}
		});
		
		me.callParent();
	}

});