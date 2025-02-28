Ext.define('MOST.view.popup.ContractorPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-contractorpopuphht',

	requires: [
		'MOST.view.popup.VesselPopupController',
		'MOST.view.popup.VesselPopupModel'
    ],

    
    //classic-> JPVC Popup controller
    controller: 'vesselpopup',
	
    //classic -> JPVC Popup Model
	viewModel: {
		type: 'vesselpopup'
	},
	
    autoSize: true,
    shadow: false,
    layout: 'vbox',
//    padding: 8,    
    scrollable: true,	
    width : 400,
    padding: '0 0 0 0',

    initialize : function(){
    	var me = this;
    	me.setItems(
		{
			xtype : 'formpanel',
			padding: '0 0 0 0',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype: 'combobox',
					style: 'opacity: 0.9;',
					margin: '0 10 0 0 ',
					flex : 2,
					label : 'Role',
					labelAlign: 'left',
					labelWidth: 50,
					labelTextAlign : 'left',
					placeholder: 'Select',
					reference:'refcomboRoleCode',
					bind: {store: '{roleCombo}'},
			        displayField: 'scdNm',
			        valueField: 'scd',
			        queryMode: 'local',
			        editable: false,
			        allowBlank: false,
//				        forceSelection: true,
			        emptyText: 'Select',
//				        listeners: {
//							select: 'onChangeRole'
//						},
					forceSelection : true
		        },{
			   		xtype: 'button',
			   		//flex : 1,
			   		width: 80,
			   		reference: 'refsearchContracotorButton',
					//text: 'Search',
					iconCls: 'x-fa fa-search',
					ui: 'action',
			   		handler: 'onPopUPHHTSearch',
			   		margin: '0 0 5 0'
		   		},{
			   		xtype: 'button',
			   		//flex : 1,
			   		width: 80,
			   		reference: 'refBtnSelectContractorHHT',
					//text: 'Select',
					ui: 'action',
			   		margin: '0 0 5 5',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelectData',
		   		}]
			},
			{  
		        xtype: 'grid',
		        reference: 'refContractorPopupHHTGrid',
		        height : '300',
		        flex : 1,
		        style: 'border: 1px solid silver; padding: 5px',
//			        plugins: [
//				          'gridexporter',
//				          'clipboard'
//				    ],
		        bind:'{empPopupHHTList}',
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
		        columns: [
	        	{
            		xtype: 'rownumberer',
            		width : 50,
            		align : 'center'
            	}, {
	                width: 70,
	                dataIndex: 'roleCd',
	                text: 'Role'
	            },
	            {
	                width: 100,
	                dataIndex: 'empId',
	                text: 'Employee ID'
	            },
	            {
	                width: 200,
	                dataIndex: 'empNm',
	                text: 'Name'
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
