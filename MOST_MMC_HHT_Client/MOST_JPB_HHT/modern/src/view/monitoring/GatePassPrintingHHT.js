Ext.define('MOST.view.popup.GatePassPrintingHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-gatepassprintinghht',

	requires: [
		'MOST.view.controller.GatePassListController',
		'MOST.view.controller.GatePassListModel',
		'MOST.view.common.DateTimeLocalField'
    ],
    
    controller: 'gatepasslist',
	
	viewModel: {
		type: 'gatepasslist'
	},

    
    autoSize: true,
    shadow: false,
    layout: 'vbox',
//    padding: 8,
    scrollable: true,
    width:500,

    initialize : function(){
    	var me = this;
    	me.setItems(
		{
			xtype: 'formpanel',
			padding: '0 0 0 0',
			items: [{
				//radio Button
				xtype: 'container',
				layout: 'hbox',
				items:[
				{
					xtype: 'container',
					layout: 'hbox',
					flex: 1,
					items: [
						{    		
							xtype: 'radiofield',
							reference: 'refNonJpvcRadiofield',
							name: 'JPVC',
							value: 'NON-JPVC',
							label: 'Non-JPVC',
							labelWidth: 80,
							labelAlign: 'right',
							labelTextAlign : 'left',
							listeners: {
								change : 'onCheckJpvcRadioField'
							}
						},
						{
							xtype: 'radiofield',
							reference: 'refJpvcRadiofield',
							name: 'JPVC',	//grouping radio button, to set only one
							value: 'JPVC',
							label: 'JPVC',
							labelWidth: 80,
							labelAlign: 'right',
							labelTextAlign : 'left',
							checked: true,
							listeners: {
								change : 'onCheckJpvcRadioField'
							}
						},
					]
				},
				{
					xtype: 'vslcallidfieldhht',
					reference: 'refJpvcText',
					required: true,
					flex: 1,
					placeholder: null,
					label: {type:'bundle', key:'hht_vslcallid'},
					labelAlign: null,	
						disabled: true,
						change: function(field, newValue){
						   field.setValue(newValue.toUpperCase());
					}					
				}
			]
			},
			//text field & bttion
			{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype:'container',
					layout:'vbox',
					flex:2,
					items:[{
						xtype:'container',
						flex:1,
						layout:'hbox',
						items:[{
							xtype: 'textfield',
							flex:3,
							label: 'GR/BL',
							labelAlign: 'left',
				            labelWidth : 50,
				            labelTextAlign : 'left',
							reference: 'refFindGRBLTextField',
							placeholder: 'input GR/BL',
							allowBlank: true,
							editable:false,
							triggers: {
								someField: {
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: function() {
										this.onSearchGLBL(); // Equivalent to the original handler
							
										// Equivalent to the listener for 'tap' event
										this.onSearchGrBl('refFindGRBLTextField');
									}
								}
							}
						},
						// {
			        	// 	xtype: 'button',
			        	// 	flex:1,
			        	// 	reference: 'refSearchButton',
			        	// 	iconCls: 'x-fa fa-search',
			        	// 	handler: 'onSearchGLBL',
			        	// 	listeners: {
						// 		tap: {
						// 			fn : 'onSearchGrBl',
						// 			args : ['refFindGRBLTextField']
						// 		}
						// 	}
			        	// }
					]
					},{
						xtype:'container',
						flex:1,
						layout:'hbox',
						items:[{
			        		xtype: 'textfield',
			        		flex:1,
			        		reference: 'refFindGPTextField',
			    			label: 'GP',
			    			labelAlign: 'left',
				            labelWidth : 50,
				            labelTextAlign : 'left',
			    			placeholder: 'input GP Code..',
			        	}]
					}]
				},{
	        		xtype: 'button',
	        		flex:1,
	        		reference: 'refSearchButton',
	    			text: 'Search',
	    			ui: 'action',
	    			iconCls: 'x-fa fa-search',
	        		handler: 'onSearchGatePassList',
	        		margin: '0 0 5 5'
	        	}]	
			},
			//Date Field
			{
				xtype: 'container',
				layout: 'hbox',
				items:[
				{
					//from
			        xtype: 'datetimelocalfield',
			        flex: 1,
			        reference: 'refStartDatefield',
//					        label: 'Work Date',
			        disabled: false,
			        inputType: 'date'
				},
				{
					//to
			        xtype: 'datetimelocalfield',
			        flex: 1,
			        margin:'0 0 0 10',
			        reference: 'refEndDatefield',
//					        label: 'Work Date',
			        disabled: false,
			        inputType: 'date'
				}]
			},
			//gird
	        {  
	            xtype: 'grid',
	            reference: 'refGatePassPrintingHHTGrid',
	            height : '300',
	            flex : 1,
//			            plugins: [
//					          'gridexporter',
//					          'clipboard'
//					    ],
				bind: {
					store: '{gatePassListData}'
				},
//						selModel: {
//							type: 'spreadsheet',
//							cellSelect: false
//						},
				listeners: {
					childsingletap : 'onHHTOneClick'
				},
				selectable:{
					mode: 'single',
				},
				columns:[{
            		text: 'No',
            		xtype: 'rownumberer',
            		width : 40,
            		align : 'center'
        		},{
				    width: 130,
				    dataIndex: 'gatePassNo',
				    text: 'GP No',
				},{
				    width: 130,
				    dataIndex: 'cgNo',
				    text: 'Cg NO'
				},{
			        width: 150,
			        dataIndex: 'vslCallId',
			        text: 'JPVC'
				},{
				    width: 100,
				    dataIndex: 'lorryNo',
				    text: 'Lorry'
				},{
				    width: 100,
				    dataIndex: 'tsptr',
				    text: 'Transporter'
				},{
				    width: 100,
				    dataIndex: 'wgt',
				    text: 'MT'
				},{
				    width: 100,
				    dataIndex: 'msrmt',
				    text: 'M3'
				},{
				    width: 100,
				    dataIndex: 'pkgQty',
				    text: 'QTY'
				},{
				    width: 100,
				    dataIndex: 'rmk',
				    text: 'Remark',
				    hidden:true
				},{
				    width: 100,
				    dataIndex: 'cglnQutCd',
				    text: 'CGINOUTCD',
				    hidden:true
				},{
				    width: 100,
				    dataIndex: 'seq',
				    text: 'seq',
				    // hidden:true
				}
				],
	        },
	        //remark
	        {
        		xtype: 'textfield',
        		flex:1,
        		reference: 'refRemarkTextField',
				style:{
					'padding-top': '10px'
				},
    			label: 'Remark',
    			labelAlign: 'left',
	            labelWidth : 80,
	            labelTextAlign : 'left',
    			placeholder: 'Input Remark...',
	        },
	        //printing setting combo
//	        {
//	        	xtype: 'container',
//				layout: 'hbox',
//				margin:'10 0 0 0',
//				items:[{
//					xtype:'container',
//					layout:'vbox',
//					flex:3,
//					items:[{
//						xtype:'container',
//						flex:1,
//						layout:'hbox',
//						items:[{
//							xtype:'container',
//							flex :0.3
//						},{
//							xtype:'label',
//							flex:1,
//							references:'refcomportText',
//							html:'COM Port',
//							style:{
//								'text-align': 'left'
//							}
//						},{
//							xtype:'label',
//							flex:1,
//							references:'refbaudRateText',
//							margin : '0 0 0 10',
//							html:'Baud Rate',
//							style:{
//								'text-align': 'left'
//							}
//						}]
//					},{
//						xtype:'container',
//						flex:1,
//						layout:'hbox',
//						items:[{
//							xtype:'label',
//							flex:0.3,
//							references:'refcomportText',
//							html:'Print Setting',
//							style:{
//								'text-align': 'left'
//							}
//						},{
//				            xtype: 'combobox',
//				            flex:1,
//				            required: true,
//				            bind: {
//								//example
//								store: '{payerCodeNameComboStore}'
//							},
//							displayField: 'comName',
//		   					valueField: 'comCode',
//		   					value : 'CD',
//					        queryMode: 'local',
//				            clearable: true,
//				            typeAhead: true		
//						},{
//				            xtype: 'combobox',
//				            flex:1,
//				            required: true,
//				            margin : '0 0 0 10',
//				            bind: {
//								//example
//								store: '{payerCodeNameComboStore}'
//							},
//							displayField: 'comName',
//		   					valueField: 'comCode',
//		   					value : 'CD',
//					        queryMode: 'local',
//				            clearable: true,
//				            typeAhead: true		
//						}]
//					}]
//				}]
//	        },
	        {
	        	xtype: 'container',
				layout: 'hbox',
				items:[
				{
	        		xtype: 'button',
	        		flex:1,
	        		reference: 'refPrintButton',
	    			text: 'Print',
	        		handler: 'onPrint'
	        	},{
	        		xtype: 'button',
	        		flex:1,
	        		reference: 'refPrintButton',
	    			text: 'Remark Update',
	        		handler: 'setHHTPopupRemarkUpdate'
	        	},
	        	{
	        		xtype: 'button',
	        		flex:1,
	        		reference: 'refCancelButton',
	    			text: 'Cancel',
		        	handler: 'onCloseWin',
	        	}]
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
 