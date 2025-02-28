Ext.define('MOST.view.usercontrol.PartnerCdTypeField', {
	extend: 'Ext.Container',
	alias: 'widget.partnercdtypefield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'partnercdtypefield',
	
	viewModel: {
		type: 'partnercdtypepopup'
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
							args : ['popup-partnercdtypepopup']
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
		 	
		 	setDisable:function(bool){
		 		if(bool == true || bool == false){
		 			me.lookupReference("ctlField").setDisabled(bool);
			 		me.lookupReference("ctlOpenPopupButton").setDisabled(bool);
		 		}
		 	},
		 	
		 	setEditable:function(bool){
		 		if(bool == true || bool == false){
		 			me.lookupReference("ctlField").setEditable(bool);
		 		}
		 	}
		});
		
		me.callParent();
	}

});