Ext.define('MOST.view.usercontrol.PartnerCdForMultiField', {
	extend: 'Ext.Container',
	alias: 'widget.partnercdformultifield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'partnercdformultifield',
	
	viewModel: {
		type: 'partnercdformultipopup'
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
		            maxLength:50,
		            editable: false,
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
					//margin: '0 5 0 0',
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click:{
							fn : 'openPopup',
							args : ['popup-partnercdformultipopup']
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