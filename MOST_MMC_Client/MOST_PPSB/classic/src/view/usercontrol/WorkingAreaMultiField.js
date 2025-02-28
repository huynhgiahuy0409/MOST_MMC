Ext.define('MOST.view.usercontrol.WorkingAreaMultiField', {
	extend: 'Ext.Container',
	alias: 'widget.workingareamultifield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'workingareamultifield',
	
	viewModel: {
		type: 'workingareamultipopup'
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
		            maxLength:30,
		            editable: true,
					enforceMaxLength: true,
		            listeners: {
			        	beforeRender: 'onRenderField',
			        	change: function(field, newValue){
							field.setValue(newValue.toUpperCase());
						}
					}
		        },{
		            xtype: 'textfield',
		            reference:'ctlLocationTypeField',
		            maxLength:20,
		            width: 100,
		            editable: false,
		            hidden: true
		        },{
					xtype: 'button',
					//height: 25,
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click:{
							fn : 'openPopup',
							args : ['popup-workingareamultipopup']
						}
					}
				}
			],
			
			getValue:function(){
				return me.lookupReference("ctlField").getValue();
		 	},
		 	
		 	setValue:function(codeValue){
		 		me.lookupReference("ctlField").setValue(codeValue);
		 	}
		});
		
		me.callParent();
	}

});