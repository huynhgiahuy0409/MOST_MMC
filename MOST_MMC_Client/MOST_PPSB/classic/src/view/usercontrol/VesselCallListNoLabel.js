Ext.define('MOST.view.usercontrol.VesselCallListNoLabel', {
	extend: 'Ext.Container',
	alias: 'widget.vesselcalllistnolabel',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'vesselcalllistfield',
	
	viewModel: {
		type: 'vesselcalllistpopup'
	},
	
	lblDefaultLabel: {type: 'bundle', key: 'jpvc'},
	
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
		            fieldLabel: '',
		            labelWidth: 30,
		            fieldStyle : 'text-transform: uppercase',
		            maxLength:20,
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
						click:{
							fn : 'openPopup',
							args : ['popup-vesselcalllistpopup']
						}
					}
				},{
					xtype:'textfield',
					flex:1,
					margin: '0 0 0 5',
					reference:'ctlFieldName',
					editable:false,
					width: 120
   				}
			],
			
			getValue:function(){
				return me.lookupReference("ctlField").getValue();
		 	},
		 	
		 	setValue:function(codeValue){
		 		me.lookupReference("ctlField").setValue(codeValue);
		 	},
		 	
			getName:function(){
				return me.lookupReference("ctlFieldName").getValue();
		 	},
		 	
		 	setName:function(codeName){
		 		me.lookupReference("ctlFieldName").setValue(codeName);
		 	}
		});
		
		me.callParent();
	}

});