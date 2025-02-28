Ext.define('MOST.view.popup.PackageNoMultiPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-packagenomultipopuphht',

	requires: [
		'MOST.view.popup.PackageNoMultiPopupHHTController',
		'MOST.view.popup.PackageNoMultiPopupModel'
    ],

    controller: 'packagenomultipopuphht',
	viewModel: {
		type: 'packagenomultipopup'
	},

    shadow: false,
    layout: 'vbox',
    scrollable: true,
    width : 650,
    padding: '0 0 0 0',
    
    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackageNoMultiPopupGrid',
	MAIN_STORE_NAME: 'packageNoList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    initialize : function(){
    	var me = this;
    	me.setItems({
			xtype: 'formpanel',
			padding: '0 0 0 0',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items:[{
						xtype: 'textfield',
						margin: '0 10 0 0 ',
						flex : 3,
						label: { type: 'bundle', key: 'packageNo'},
	   					labelAlign: 'left',
			            labelWidth : '100',
			            labelTextAlign : 'left',			            
			            reference: 'txtPackageNo',
			            listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
			       },{
				   		xtype: 'button',
				   		flex : 1.5,
				   		reference: 'refSearchButton',
						text: { type: 'bundle', key: 'search'},
						iconCls: 'x-fa fa-search',
                        ui: 'retrieve-button-modern',
						handler: 'onSearch',
						margin: '0 0 5 0',
			   		},
			   		{
				   		xtype: 'button',
				   		flex : 1.4,
				   		reference: 'refBtnSelectButton',
						text: { type: 'bundle', key: 'select'},
						ui: 'action',
				   		margin: '0 0 5 5',
				   		iconCls: 'x-fa fa-check-square-o',
				   		handler: 'onSelectData',
			   		}
			   		]
				},
		        {  
		            xtype: 'grid',
		            reference: me.MAIN_GRID_REF_NAME,
		            height : '300',
		            flex : 1,
		            style: 'border: 1px solid silver; padding: 5px',
					bind: {
						store:'{' + me.MAIN_STORE_NAME + '}'
					},
	
					listeners: {
						childdoubletap : 'onHHTDblClick' 
					},
					selectable:{
						columns: false,
						checkbox: true,
						checkboxSelect: true,
						rows: true,
						cells: false,
						mode: 'multi',
						deselectable: false,
						headerCheckbox: false
					},
					columns:[
						{
		            		header: me.lblNo,
		            		xtype: 'rownumberer',
		            		width : 50,
		            		align : 'center'
		        		},
						{
						    width: 150,
						    dataIndex: 'packageNo',
						    text: { type: 'bundle', key: 'packageNo'}
						},
						{
						    width: 170,
						    dataIndex: 'packageDesc',
						    text: { type: 'bundle', key: 'packageDesc'}
						},
						{
						    width: 100,
						    dataIndex: 'mt',
						    text: { type: 'bundle', key: 'mt'}
						},
						{
						    width: 100,
						    dataIndex: 'm3',
						    text: { type: 'bundle', key: 'm3'}
						}
					],
		        }
			]
    	});
    	me.callParent();
    },
  
	afterRender : function() {
		var me = this;
		me.getController().onHHTLoad();
		me.callParent(arguments);
	}
});
 