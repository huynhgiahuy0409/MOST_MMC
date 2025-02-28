Ext.define('MOST.view.usercontrol.PortCodeField', {
	extend: 'Ext.Container',
	alias: 'widget.portcodefield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'portcodefield',
	
	viewModel: {
		type: 'portpopup'
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
			fieldControl.setDisabled(value);
			fieldButton.setDisabled(value);				
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
					maskRe: /[0-9A-Za-z]/,
					fieldStyle : 'text-transform: uppercase',
		            listeners: {
			        	beforeRender: 'onRenderField',
			        	focus : 'onFocus',
			        	focusleave: 'onFieldFocusleave',
			        	change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					},
		        },{
					xtype: 'button',
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click:{
							fn : 'openPopup',
							args : ['popup-portpopup']
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
		 	
		 	getCol1:function(){
		 		me.params.searchCol1;
		 	},
		 	
		 	setCol1:function(value){
		 		me.params.searchCol1 = value;
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