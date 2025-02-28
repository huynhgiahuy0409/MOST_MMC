Ext.define('MOST.view.popup.WorkingAreaPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-workingareapopuphht',

	requires: [
		//'MOST.view.popup.CMMCdPopupController',
		//'MOST.view.popup.CMMCdPopupModel'
    ],

    //example
controller: 'cmmcdpopuphht',
	
	viewModel: {
		type: 'cmmcdpopuphht'
	},
    
	
    autoSize: true,
    shadow: false,
    layout: 'vbox',
//    padding: 8,    
    scrollable: true,	
    width : 400,

//	items: [{ 
    initialize : function(){
		var me = this;
		me.setItems({
			xtype: 'formpanel',
			padding: '0 0 0 0',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype: 'combobox',
					flex:3,
					placeholder: 'Select',
					style: 'opacity: 0.9;',
					label : 'Category',
					labelWidth: 80,
					labelAlign: 'left',
					reference:'refcomboCaTagory',
					bind: {
						store: '{commonCodePopup}'
					},
					displayField: 'codeName',
					valueField: 'code',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					listeners:{
						select: 'onSearchData'
					}
				},{
			   		xtype: 'button',
			   		flex : 1,
			   		reference: 'refBtnSelectWorkingAreaHHT',
					text: 'Select',
					ui: 'action',
			   		margin: '0 0 5 5',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelecthWorkingData',
		   		}]
			},{  
		        xtype: 'grid',
		        reference: 'refWorkingAreaPopupHHTGrid',
		        height : '300',
		        flex : 1,
		        style: 'border: 1px solid silver; padding: 5px',
//			        plugins: [
//				          'gridexporter',
//				          'clipboard'
//				    ],
		        bind:'{grideStore}',
//			        selModel: {
//						type: 'spreadsheet',
//						cellSelect: false
//					},
				listeners: {
//						childdoubletap : 'onHHTDblClick'
//						childsingletap : 'onCommonCodeForMultiCheckChange'
				},
//				selectable:{
//					mode: 'single',
//				},
		        columns: [{
            		header: 'chk',
            		reference: 'refChkCommonCodeForMulti',
		            xtype: 'checkcolumn',
		            dataIndex: 'chkCdNm',
		            headerCheckbox: false,
		            width: 46,
		            listeners: {
		                checkchange: 'onCommonCodeForMultiCheckChange'
		            }
		        },
		        {
	                width: 70,
	                dataIndex: 'code',
	                text: 'Code'
	            },
	            {
	                width: 150,
	                dataIndex: 'codeName',
	                text: 'Name'
	            }]
		    }]
		});
		me.callParent();
	},
	
	afterRender : function() {
		var me = this;
		me.getController().onHHTWorkingAreaLoad();
		me.callParent(arguments);
	}
});
