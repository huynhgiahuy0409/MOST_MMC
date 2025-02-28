Ext.define('MOST.view.usercontrol.CMMCdForMultiField', {
	extend: 'Ext.Container',
	alias: 'widget.cmmcdformultifield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'cmmcdformultifield',
	
	viewModel: {
		type: 'cmmcdformultipopup'
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
		            margin: '4 5 0 0',
		            reference:'ctlField',
		            labelWidth: 30,
		            editable: false,
					fieldStyle : 'text-transform: uppercase',
		            listeners: {
			        	beforeRender: 'onRenderField'
					}
		        },{
					xtype: 'button',
					height: 25,
					margin: '5 0 0 0',
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click:{
							fn : 'openPopup',
							args : ['popup-cmmcdformultipopup']
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