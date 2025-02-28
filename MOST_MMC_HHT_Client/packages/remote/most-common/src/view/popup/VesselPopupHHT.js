Ext.define('MOST.view.popup.VesselPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vesselpopuphht',

	requires: [
//	    'Ext.grid.plugin.Exporter',
//		'Ext.grid.plugin.Clipboard',
//		'Ext.grid.plugin.ColumnResizing',
		'MOST.view.popup.VesselPopupController',
		'MOST.view.popup.VesselPopupModel'
    ],

    controller: 'vesselpopup',
	
	viewModel: {
		type: 'vesselpopup'
	},
    
    autoSize: true,
    shadow: false,
    layout: 'vbox',
    scrollable: true,
    width : 400,
    padding: '0 0 0 0',

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
					xtype: 'textfield',
					margin: '0 10 0 0 ',
					flex : 2,
		            label: 'Vsl Call Id',
		            labelAlign: 'left',
		            labelWidth : 80,
		            labelTextAlign : 'left',
		            reference: 'refjpvc',
		            placeholder: 'Select Vsl Call Id',
		            allowBlank: true,
		       },{
			   		xtype: 'button',
			   		//flex : 1,
			   		width: 80,
			   		reference: 'refsearchJPVCButton',
					//text: 'Search',
					iconCls: 'x-fa fa-search',
			   		handler: 'onSearch',
			   		ui: 'action',
			   		margin: '0 0 5 0'
		   		}
		   		,{
			   		xtype: 'button',
			   		//flex : 1,
			   		width: 80,
			   		reference: 'refBtnSelectJPVCHHT',
					//text: 'Select',
					ui: 'action',
			   		margin: '0 0 5 5',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelectData',
		   		}
		   		]
			},
	        {  
	            xtype: 'grid',
	            reference: 'refJPVCPopupHHTGrid',
	            height : '300',
	            flex : 1,
	            style: 'border: 1px solid silver; padding: 5px',
//		            plugins: [
//				          'gridexporter',
//				          'clipboard'
//				    ],
				bind: {
					store: '{vslCallIdPopup}'
				},
//					selModel: {
//						type: 'spreadsheet',
//						cellSelect: false
//					},
				listeners: {
					childdoubletap : 'onDblTab' 
				},
				selectable:{
					mode: 'single',
				},
				columns:[
//					{
//            		header: 'chk',
//            		reference: 'refChkCommonCodeForMulti',
//		            xtype: 'checkcolumn',
//		            dataIndex: 'chkCdNm',
//		            headerCheckbox: false,
//		            width: 46,
//		            listeners: {
//		                checkchange: 'onCommonCodeForMultiCheckChange'
//		            },
//		        },
		        {
			        width: 130,
			        dataIndex: 'vslCallId',
			        text: 'Vessel Call Id'
				},{
				    width: 130,
				    dataIndex: 'vslNm',
				    text: 'Vessel Name'
				},{
				    width: 180,
				    dataIndex: 'etb',
				    text: 'ETB',
				    xtype: 'datecolumn',
				    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				},{
				    width: 80,
				    dataIndex: 'berthLoc',
				    text: 'Berth Location'
				},{
				    width: 50,
				    dataIndex: 'loa',
				    text: 'LOA'
				},{
				    width: 150,
				    dataIndex: 'atb',
				    text: 'ATB',
				    xtype: 'datecolumn',
				    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				},{
				    width: 150,
				    dataIndex: 'etw',
				    text: '1ETW',
				},{
				    width: 60,
				    dataIndex: 'wharfStart',
				    text: 'wharfStart'
				},{
				    width: 60,
				    dataIndex: 'wharfEnd',
				    text: 'wharfEnd'
				},{
				    width: 150,
				    dataIndex: 'atw',
				    text: 'ATW',
				    xtype: 'datecolumn',
				    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				},{
				    width: 150,
				    dataIndex: 'etc',
				    text: 'ETC',
				},{
				    width: 150,
				    dataIndex: 'atc',
				    text: 'ATC',
				    xtype: 'datecolumn',
				    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				},{
				    width: 150,
				    dataIndex: 'etu',
				    text: '1ETU',
				},{
				    width: 150,
				    dataIndex: 'atu',
				    text: 'ATU',
				    xtype: 'datecolumn',
				    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				},{
				    width: 70,
				    dataIndex: 'vslTp',
				    text: 'Vessel Type'
				},{
				    width: 90,
				    dataIndex: 'vslTpNm',
				    text: 'Vessel Type Name'
				},{
				    width: 80,
				    dataIndex: 'purpCall',
				    text: 'Purp of call'
				},{
				    width: 80,
				    dataIndex: 'purpCallCd',
				    text: 'Purp of call Code'
				},{
				    width: 180,
				    dataIndex: 'curAtb',
				    text: 'Cur.ATB'
				}],
	        }]
				
		});
    	me.callParent();
    },
  
	afterRender : function() {
		var me = this;
		me.getController().onLoad();
		me.callParent(arguments);
	}
});
 