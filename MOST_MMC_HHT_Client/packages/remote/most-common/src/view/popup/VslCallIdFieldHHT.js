Ext.define('MOST.view.popup.VslCallIdFieldHHT', {
	extend : 'Ext.Container',
	alias: 'widget.vslcallidfieldhht',

	requires: [
		'MOST.view.popup.VslCallIdFieldHHTController',
		'MOST.view.popup.VesselPopupModel'
	],

	config:{
		label: {type: 'bundle', key: 'hht_vslcallid'},
	},
	controller: 'vslcallidfieldhht',
	
	viewModel: {
		type: 'vesselpopup'
	},
	
	lblDefaultLabel: {type: 'bundle', key: 'hht_vslcallid'},
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	defaults: {
		labelAlign: 'left',
		labelTextAlign: 'right'
	},
	
	allowBlank : true,
	editableControl : true,
	visibleName : false,
	parent : null,
	params : null,

	updateEditableControl : function(value){
		var me = this;
		var fieldButton = this.lookupReference("ctlOpenPopupButton");
		var fieldControl = this.lookupReference("ctlField");
		
		if(fieldControl && fieldButton){
			fieldControl.setEditable(value);
			fieldButton.setDisabled(!value);			
		}
	},
	
	items: [
		{
            xtype: 'textfield',
            flex:1,
            reference:'ctlField',
            style: 'opacity: 0.9;',
            lable: {type: 'bundle', key: 'hht_vslcallid'},
            labelWidth: this.labelWidth,
            fieldStyle : 'text-transform: uppercase',
            maxLength:20,
			disabled: false,
			enforceMaxLength: true,
            listeners: {
            	focusleave: 'onFieldFocusleave',
				activate: 'onRenderField',
				change: 'onChangeVslCallIdHHT',
				focus: 'onFocusVslCallIdHHT'
			},
			triggers: {
					someField: {
						iconCls: 'x-fa fa-search',
						scope: 'controller',
						handler: 'onSearchVesselCallHHT'
					}
			}
        },
		// {
		// 	xtype: 'button',
		// 	reference:'ctlOpenPopupButton',
		// 	iconCls: 'x-fa fa-search',
		// 	handler: 'onSearchVesselCallHHT',
		// },
		{
			xtype:'textfield',
			flex:1,
			reference:'ctlFieldName',
			editable:true,
			width: 120
		}],
	getValue:function(){
		return this.lookupReference("ctlField").getValue();
 	},
 	
 	setValue:function(codeValue){
 		this.lookupReference("ctlField").setValue(codeValue);
 	},
 	
	getName:function(){
		return this.lookupReference("ctlFieldName").getValue();
 	},
 	
 	setName:function(codeName){
 		this.lookupReference("ctlFieldName").setValue(codeName);
	
	},
	
 	setLabel: function(label){
 		this.lookupReference("ctlField").setLabel(label);
 	},
 	
	setLabelWidth: function(width){
		this.lookupReference("ctlField").setLabelWidth(width);
	},
	
	setLabelAlign: function(align){
		this.lookupReference("ctlField").setLabelAlign(align);
	},
	
	setWidth: function(width){
		this.lookupReference("ctlField").setWidth(width);
	},
	
	setRequired: function(value){
		this.lookupReference("ctlField").setRequired(value);
	},
	
	setDisabled: function(value){
		this.lookupReference("ctlField").setDisabled(value);
		// this.lookupReference("ctlOpenPopupButton").setDisabled(value);
	},
	
	setEditable: function(value){
		this.lookupReference("ctlField").setEditable(value);
	},
	
	setPlaceholder: function(value){
		this.lookupReference("ctlField").setPlaceholder(value);
	}
});


 