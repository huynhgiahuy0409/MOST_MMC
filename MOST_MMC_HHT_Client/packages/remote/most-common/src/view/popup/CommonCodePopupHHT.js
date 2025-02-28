Ext.define('MOST.view.popup.CommonCodePopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-commoncodepopuphht',

	requires: [
		'MOST.view.popup.CMMCdPopupHHTModel',
		'MOST.view.popup.CMMCdPopupHHTController',
    ],

    reference: 'refCommonCodePopupHHT',
    controller: 'cmmcdpopuphht',
	
	viewModel: {
		type: 'cmmcdpopuphht'
	},

	//autoSize: true,
	layout: 'fit',
	shadow: false,
	padding: 5,	
	closeAction: 'destroy',
	scrollable: true,
    width : 500,
	height: 400,
	
    initialize : function(){
    	var me = this;
    	me.setItems(
		{
			xtype : 'formpanel',
			layout: {
				type: 'vbox',
				align : 'stretch'
			},
			padding: '0 0 0 0',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items:[{
		            xtype: 'combobox',
		            flex : 1.2,
		            style: 'opacity: 0.9;',
					labelAlign: 'left',
					reference:'refcomboSearchType',
					bind: {
						store: '{commonCodePopupSearchCombo}'
					},
					displayField: 'comName',
   					valueField: 'comCode',
   					value : 'CD',
			        queryMode: 'local',
		            clearable: false,
		            typeAhead: true		
				},{
					xtype: 'textfield',
					flex : 1.4,
					margin: '0 0 0 10',
		            labelAlign: 'left',
		            reference: 'refSearchCode',
		            placeholder: 'Input search',
		            listeners:{
						change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					}
		       },{
			   		xtype: 'button',
			   		flex :1,
			   		reference: 'refsearchCommonCodeButton',
					iconCls: 'x-fa fa-search',
			   		handler: 'onSearchHHT',
			   		ui: 'action',
			   		margin: '0 0 5 5'
		   		},{
			   		xtype: 'button',
			   		flex : 1,
			   		reference: 'refBtnSelectContractorHHT',
					ui: 'action',
			   		margin: '0 0 5 5',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelectContractorData',
		   		}]
			},
	        {//gird 
	            xtype: 'grid',
	            reference: 'refCommonCodePopupGrid',
	            //height : '300',
	            flex : 1,
	            style: 'border: 1px solid silver; padding: 5px',
				bind: {
					store: '{partnerCdPopupStore}'
				},

				listeners: {
					childdoubletap : 'onHHTDblClick' 
				},
				selectable:{
					mode: 'single',
				},
				columns:[{
					text: 'No.',
            		xtype: 'rownumberer',
            		width : 50,
            		align : 'center'
        		},
        		{
        			text: 'Code',       		
        			dataIndex: 'code',
        			reference: 'refScd',
        			filter: 'string',
        			width: 80
        		},
        		{
        			text: 'Name',      			
        			dataIndex: 'codeName',
        			reference: 'refScdNm',
        			align: 'left',
        			filter: 'string',
        			width: 200
        		},
//        		{
//        			text: 'Type',      			
//        			dataIndex: 'ptnrType',
//        			reference: 'refPtnrType',
//        			align: 'left',
//        			filter: 'string',
//        			width: 150
//        		}
        		]

	        }]		
		});
    	me.callParent();
    },
  
	afterRender : function() {
		var me = this;
		me.getController().onHHTLoad();
		me.callParent(arguments);
	}
});
 