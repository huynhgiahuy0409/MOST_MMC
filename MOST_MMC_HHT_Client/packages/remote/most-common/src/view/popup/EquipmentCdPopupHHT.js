Ext.define('MOST.view.popup.EquipmentCdPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-equipmentCdPopupHHT',

	requires: [
		'MOST.view.popup.EquipmentCdPopupModel',
		'MOST.view.popup.EquipmentCdPopupController',
    ],

    controller: 'equipmentcdpopup',
	
	viewModel: {
		type: 'equipmentcdpopup'
	},
	listeners: {
		painted: 'onLoad'
	},
    autoSize: true,
    shadow: false,
    layout: 'vbox',
    padding: 8,    
    scrollable: true,	

    initialize : function(){
	var me = this;
	me.setItems(
	{
		xtype: 'container',
		scrollable: true,
			items: [{
				xtype: 'formpanel',
				margin: '0 20 0 10',
				layout: 'vbox',
				items:[{
					xtype: 'container',
					layout: 'hbox',
					items:[{
						xtype: 'combobox',
	   					width: 130,
						reference:'refcomboTypeHHT',
						bind: {store: '{equipmentListPopupSearchCombo}'},
						displayField: 'comName',
	   					valueField: 'comCode',
	   					value : 'CODE',
				        queryMode: 'local',
				        editable: false,
				        allowBlank: true,
			        },{
						xtype:'textfield',
						reference:'txtEqDivCdHHT',
						maxLength: 10,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 180,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
					},{
				   		xtype: 'button',
				   		width : 120,
				   		reference: 'refsearchEquipmentButton',
						text: 'Search',
						iconCls: 'x-fa fa-search',
				   		handler: 'onPopUpHHTSearch',
			   		}]
				},
				{  
			        xtype: 'grid',
			        reference: 'refMechanicalEquipmentPopupHHTGrid',
			        height : '300',
			        width: '100%',
			        bind:'{equipmentListPopup}',
					listeners: {
						childdoubletap : 'onHHTDblClick' 
					},
					selectable:{
						mode: 'single',
					},
			        columns: [{
	            		text:{type: 'bundle', key: 'gridNo'},
	            		xtype: 'rownumberer',
	            		width : 50,
	            		align : 'center'	
            		},
            		{
            			text:{type: 'bundle', key: 'eqNo'},
            			dataIndex: 'eqFacNo',
            			reference: 'refEqDivCd',
            			width: 0
            		},
            		{
            			text:{type: 'bundle', key: 'description'},
            			dataIndex: 'capaDescr',
            			reference: 'refDivCdNm',
            			width: 390
	            	}]
			    }]
			}]
		});	
 
		me.callParent();
	},
	
	afterRender : function() {
		var me = this;
		// me.getController().onLoad();
		me.callParent(arguments);
	}
});
