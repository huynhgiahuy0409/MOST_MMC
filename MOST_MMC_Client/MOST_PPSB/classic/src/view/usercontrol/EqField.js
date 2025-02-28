/* 
	Equipment Field pop-up made by LamLong based on PackageNoField.js
*/
Ext.define('MOST.view.usercontrol.EqField', {
    extend: 'Ext.Container',
    alias: 'widget.eqfield',
    padding: '0, 0, 0, 0',
    
    requires: [
    ],
    
    controller: 'eqfield',
    
    viewModel: {
        type: 'eqfieldpopup'
    },
    
    layout: 'hbox',
    
    config: {
    	editable: true,
        allowBlank: true,
        editableControl: true,
        visibleName: false,
        parent: null,
        params: null
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
		            margin: '0 5 0 0',
					flex: 1,
		            reference:'ctlField',
					enforceMaxLength: true,
					fieldStyle : 'text-transform: uppercase',
					editable: this.editable,
		            listeners: {
			        	beforeRender: 'onRenderField',
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
		 	
		 	getBlNo: function(){
		 		return this.blNo;
		 	},
		 	
		 	setBlNo: function(codeValue){
		 		this.blNo = codeValue;
		 	},
		 	
		 	getShipgNoteNo: function(){
		 		return this.shipgNoteNo;
		 	},
		 	
		 	setShipgNoteNo: function(codeValue){
		 		this.shipgNoteNo = codeValue;
		 	},
		 	
		 	getEqCd: function(){
		 		return this.eqCd;
		 	},
		 	
		 	setEqCd: function(codeValue){
		 		this.eqCd = codeValue;
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
		 		debugger;
				var fieldControl = me.lookupReference("ctlField");
				if(fieldControl){
					fieldControl.setEditable(value);
				}
		 	}
		});
		
		me.callParent();
	}
});