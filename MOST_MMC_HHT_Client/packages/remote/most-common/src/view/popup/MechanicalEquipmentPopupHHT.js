Ext.define('MOST.view.popup.MechanicalEquipmentPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-mechanicalequipmenthht',

	requires: [
		//'MOST.view.popup.MechanicalCdPopupController',
		//'MOST.view.popup.MechanicalCdPopupModel'
    ],

    controller: 'mechanicalcdpopup',
	
	viewModel: {
		type: 'mechanicalcdpopup'
	},
	
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblMechanicalEquipmentType: {type: 'bundle', key: 'mechanicalEquipmentType'},
	lblEqDivCdNm: {type: 'bundle', key: 'mecharicalEqDivCdNm'},
	lblEqFacNm: {type: 'bundle', key: 'eqFacNm'},
	lblCapaDescr: {type: 'bundle', key: 'capaDescr'},
	lblOwnDivNm: {type: 'bundle', key: 'ownDivNm'},
	
    autoSize: true,
    shadow: false,
    layout: 'vbox',
//    padding: 8,    
    scrollable: true,	
    width : 420,

    initialize : function(){
    	var me = this;
    	me.setItems(
		{
			xtype: 'formpanel',
			padding: '0 0 0 0',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype: 'combobox',
					style: 'opacity: 0.9;',
					label : 'Type',
					labelAlign: 'left',
		            labelWidth : 50,
		            labelTextAlign : 'left',
   					flex : 3,
   					margin: '0 10 0 0',
					reference:'refcomboType',
					bind: {store: '{mechanicalEquipmentComboStore}'},
					displayField: 'scdNm',
   					valueField: 'scd',
   					value : '',
			        queryMode: 'local',
			        editable: false,
			        allowBlank: false,
			        forceSelection: true,
			        emptyText: 'Select'
		        },{
			   		xtype: 'button',
			   		//flex : 1,
			   		reference: 'refsearchMechanicalEquipmentButton',
					text: 'Search',
					ui: 'Search',
					iconCls: 'x-fa fa-search',
			   		handler: 'onPopUPHHTSearch',
			   		margin: '0 0 5 0'
		   		},{
			   		xtype: 'button',
			   		//flex : 1,
			   		reference: 'refBtnSelectMechanicalEquipmentHHT',
					text: 'Select',
					ui: 'action',
			   		margin: '0 0 5 5',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelectData',
		   		}]
			},
			{  
		        xtype: 'grid',
		        reference: 'refMechanicalEquipmentPopupHHTGrid',
		        height : '300',
		        style: 'border: 1px solid silver; padding: 5px',
		        flex : 1,
//			        plugins: [
//				          'gridexporter',
//				          'clipboard'
//				    ],
		        bind:'{mechanicalEquipmentListPopup}',
//			        selModel: {
//						type: 'spreadsheet',
//						cellSelect: false
//					},
				listeners: {
					childdoubletap : 'onHHTDblClick' 
				},
				selectable:{
					mode: 'single',
				},
		        columns: [{
		        	text: this.lblNo,
            		xtype: 'rownumberer',
            		width : 50,
            		align : 'center'
        		},
        		{	
        			text: this.lblEqDivCdNm,
        			dataIndex: 'eqDivCdNm',
        			reference: 'refEqDivCdNm',
        			width: 130
        		},
        		{
        			text: this.lblEqFacNm,
        			dataIndex: 'eqFacNm',
        			reference: 'refEqFacNm',
        			hidden: true
        		},
        		{
        			text: this.lblCapaDescr,
        			dataIndex: 'capaDescr',
        			reference: 'refCapaDescr',
        			width: 230
        		},
        		{
        			text: this.lblOwnDivNm,
        			dataIndex: 'ownDivNm',
        			reference: 'refOwnDivNm',
        			width: 130
        		}]
			}]
		});	
 
		me.callParent();
	},
	
	afterRender : function() {
		var me = this;
		me.getController().onPopupHHTLoad();
		me.callParent(arguments);
	}
});
