Ext.define('MOST.view.usercontrol.VesselCallListField', {
	extend: 'Ext.Container',
	alias: 'widget.vesselcalllistfield',
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
		params : {
			scn: null
		}
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
		            fieldLabel: me.lblDefaultLabel,
					style: 'opacity: 1;',
		            labelWidth: 30,
		            fieldStyle : 'text-transform: uppercase',
		            maxLength:30,
					enforceMaxLength: true,
		            listeners: {
		            	focusleave: 'onFieldFocusleave',
		            	change: 'onChangeFieldValue',
			        	beforeRender: 'onRenderField'
					}
		        },{
					xtype: 'button',
					//height: 25,
					//margin: '5 0 0 0',
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
		 	},
		 	
		 	setDisabled:function(value) {
				var fieldButton = me.lookupReference("ctlOpenPopupButton");
				var fieldControl = me.lookupReference("ctlField");

				if (fieldControl && fieldButton) {
					fieldControl.setDisabled(value);
					fieldButton.setDisabled(value);
				}
			},
			
			getScn: function(){
				return this.params['scn'];
			},

			setScn: function(codeValue){
				this.params['scn'] = codeValue;
			},			

			getFieldLabel: function(){
				return me.lookupReference("ctlField").getFieldLabel();
			},

//			isDisabled: function(){
//				return me.lookupReference('ctlOpenPopupButton').isDisabled();
//			},

			refreshValue: function(){
				me.getController().onFieldFocusleave();
			}
		});
		
		me.callParent();
	}

});