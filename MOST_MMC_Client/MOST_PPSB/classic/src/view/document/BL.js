Ext.define("MOST.view.document.BL",{
    extend: "Ext.panel.Panel",
    alias: 'widget.app-blinquiry',
    
    requires:[],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBLListGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'bllist',
	MANIFEST_TYPE_STORE: 'manifestTypeCombo',
	VESSEL_ASSIGN_STORE: 'jpvcAsignComboStore',
	NIL_COMBO_STORE: 'nilComboStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	config:{
  		isPopup: 'N',
  		docId: ''
  	},
    
    controller: 'bl',
	viewModel: {
		type: 'bl'
	},
	
	detailViewAlias: 'app-bldetail',
	
	listeners:{
		afterrender:'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items:[{
				xtype: 'tsb-datagrid',
	    		reference: me.MAIN_GRID_REF_NAME,
	    		flex: 1,
	    		stateful: true,
	    		stateId : 'stateBLListGrid',
	    		plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard',
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
	    		listeners: {
	    			rowdblclick: 'onRowDbClick',
	    			afterrender: 'onAfterRender',
	    			pagingSearch: 'onSearch'
	    		},
	    		viewConfig:
	    	    {
	    	        stripeRows: true
	    	    },
	    		columns:{
	    			defaults: {
	            		style : 'text-align:center'
	            	},
	            	items: GridUtil.getGridColumns('BillOfLading')
	    		}
			}],
			
			dockedItems: [{	// Buttons
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
   				items: [{
					xtype: 'tbfill'
				},
				{
                    xtype: 'button',
                    itemId:'inquiryItemId',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }
                
                },{
                	xtype: 'button',
                	text: ViewUtil.getLabel('add'),
                	itemId:'createItemId',
					iconCls: 'x-fa fa-plus',
					ui: 'create-button',
					reference:'refBtnCreate',
					listeners: {
						click: 'onCreate'
					}
                },
                {
					xtype: 'button',
					itemId: 'deleteItemId',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					}
				},
                {
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
            	}]
   			},
   			{	// Search Filters	
				xtype : 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [
					{
						xtype: 'searchfieldset',
						margin: '0 5 5 0',
						flex: 1,
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible:true,
						defaults: {
			                labelAlign: 'right',
			                layout: {
			                    type: 'vbox',
			                    align: 'stretch'
			                },
			                defaults: {
			                    margin: '0 5 2 5',
			                    labelAlign: 'right',
			                    flex: 1,
			                    labelWidth: 100
			                }
			            },
			            layout: {
			                type: 'hbox',
			                /*align: 'stretch'*/
			            },
			            items: [
			            	//Vessel/MBL/Lot No
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										bind: {
											value: '{theSearch.scn}',
										},
										
									},
			                    	{
										xtype:'vesselcalllistfield',
										fieldLabel:ViewUtil.getLabel('vslschlJPVCNo'),
										reference:'txtVslCallId',
										emptyText:ViewUtil.getLabel('vslschlJPVCNo'),
										change: function(field, newValue){
											   field.setValue(newValue.toUpperCase());
										},
										bind:{
											value: '{theSearch.vslCallId}'
										}
									},
									{
										xtype: 'textfield',
										reference: 'txtUserRefNo',
							          	fieldLabel: ViewUtil.getLabel('lotNo'),
							          	bind: '{theSearch.userDefNo}',
							          	listeners:{
											change: 'onUpperCase'
										}
		    						},
		    						{
										xtype: 'combobox',
										reference: 'txtMasterBlNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('masterBLNo'),
										bind: {
											store: '{masterBlCombo}',
											value: '{theSearch.mfDocId}'
										},
										listeners:{
											change: 'onSelectMasterBlCombo'
										},
										displayField: 'scdNm',
										valueField: 'mfDocId',
										emptyText:'Select',
										queryMode: 'local',
										forceSelection : true,
										anyMatch: true
									}
			                    ]
			            	},
			            	
			            	//2-SHA/BL/category
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
										xtype: 'partnercdtypefield',
										fieldLabel: ViewUtil.getLabel('shippingAgent'),
										reference: 'ctlPartner',
	    			   					params:{
	    			   						ptnrType: CodeConstants.CM_PTNRTP_SHA
	    			   					},
										change: function (field, newValue) {
											field.setValue(newValue.toUpperCase());
										},
										editable: false
									},
									{
										xtype: 'combo',
										reference: 'cmbDocId',
										editable:false,
										fieldLabel: ViewUtil.getLabel('category'),
										emptyText: 'Select',
										queryMode:'local',
										bind:{
											store:'{' + me.MANIFEST_TYPE_STORE + '}',
											value: '{theSearch.blDocId}'
										},
										displayField:'scdNm',
										valueField:'scd',
		    						},
		    						{
										xtype: 'combobox',
										reference: 'txtBlNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('blno'),
										bind: {
											store: '{blCombo}',
											value: '{theSearch.blNo}'
										},
										displayField: 'scdNm',
			                    		valueField: 'blNo',
			                    		emptyText:'Select',
			                    		queryMode: 'local',
										anyMatch: true
									}
			                    ]
			            	},
			            	
			            	//3-Date/Split
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
			    						xtype:'container',
			    						layout:{
			    							type:'hbox'
			    						},
			    						defaults:{
			    							labelAlign: 'right',
			    							labelWidth: 100,
			    							margin: '0 0 0 0'
			    						},
			    						items:[
			    							{
			    								xtype: 'datefield',	
			    								width : 255,
												reference: 'txtDocStatDateFrom',
												editable: false,
												fieldLabel: ViewUtil.getLabel('vslpatiConfDt'),
												format: MOST.config.Locale.getShortDate(),
												format: 'd/m/Y',
												bind: '{theSearch.docStatFromDate}',
											},{
												xtype: 'datefield',
												width : 150,
												reference: 'txtDocStatDateTo',
												margin: '0 0 0 5',
												format: MOST.config.Locale.getShortDate(),
												format: 'd/m/Y',
												bind: '{theSearch.docStatToDate}',
												editable: false,
											}
										]
			                    	},
									{
										xtype: 'checkbox',
										margin: '0 0 0 110',
										reference: 'refSplitChk',
										boxLabel: ViewUtil.getLabel('splitBL'),
									},
		    						{
										xtype: 'container',
										layout:{
			    							type:'hbox'
			    						},
			    						defaults:{
			    							labelAlign: 'right',
			    							labelWidth: 100,
			    							margin: '0 0 0 0'
			    						},
			    						items:[
			    							{
												xtype: 'button',
												margin: '0 5 0 105',
												reference : 'refGeneralCargoDischargingList',
												text: ViewUtil.getLabel('BLLGeneralCargoLoadingList'),
												width : 150,
												listeners : {
													click : 'onGeneralCargoDischargingListUpload'
												}
											},{
												xtype: 'button',
												margin: '0 5 0 5',
												reference : 'refRORODischargingList',
												text: ViewUtil.getLabel('BLROROLoadingList'),
												width : 150,
												listeners : {
													click : 'onRORODischargingListUpload'
												}
											},
											{
												xtype : 'button',
												margin: '0 5 0 5',
												width : 150,
												reference : 'refBtnBLPkgDetail',
												text:  ViewUtil.getLabel('packagedetail'),
												listeners : {
													click : 'onOpenPackageDetail'
												}
											}
			    						]
		    						}
			                    ]
			            	}
			            ]
					}
				]
			}],
			
			renderTo: Ext.getBody()
		});
		
		me.callParent();
	}
});