Ext.define('MOST.view.configuration.DriverTruckRegistration', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-drivertruckregistration',
	
	requires: [
	    'Ext.layout.container.Table'
	],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	controller: 'drivertruckregistration',
	
	viewModel: {
		type: 'drivertruckregistration'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	MAIN_GRID_REF_DRIVER_NAME: 'refDriverLorryRegistrationDriversTabGrid',
	MAIN_GRID_REF_LORRY_NAME: 'refDriverLorryRegistrationLorriesTabGrid',
	MAIN_GRID_REF_CHASSIS_NAME: 'refDriverLorryRegistrationChassisTabGrid',
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
				xtype:'tabpanel',
				margin: '5 5 5 0',
				reference:'tabDriverRorries',
				activeTab: 0,
				listeners:{
	            	tabchange:'onTabChange'
	            },
				flex: 1,
				items:[
				{
					title: ViewUtil.getLabel('driverlorryregistrationDriverstab'),
					xtype: 'app-drivertruckregistrationdriverstab',
		    		reference: 'refDriverlorryRegistrationDriversTab',
		    		listeners: {
		    			activate: 'onColumnButtonSetting'
		    	    }
				},{
					title: ViewUtil.getLabel('driverlorryregistrationLorriestab'),
					xtype: 'app-drivertruckregistrationtrucktab',
		    		reference: 'refDriverlorryRegistrationLorriesTab',
			    	listeners: {
		    			activate: 'onColumnButtonSetting'
		    	    }
				},{
					title: ViewUtil.getLabel('driverlorryregistrationChassistab'),
					xtype: 'app-drivertruckregistrationchassistab',
		    		reference: 'refDriverlorryRegistrationChassisTab',
			    	listeners: {
		    			activate: 'onColumnButtonSetting'
		    	    }
				}]
	        }],
			dockedItems: [{
				xtype : 'container',
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnVerify',
					text: ViewUtil.getLabel('verifyChk'),
					hidden: true,
					listeners: {
						click: 'onVerifyChk'
					}
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					itemId: 'deleteButton',
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
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:['', true]
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:['', false]
						}
					}
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					reference: 'refDriverColumn',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_DRIVER_NAME]
					}
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					reference: 'refLorryColumn',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_LORRY_NAME]
					}
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					reference: 'refChassisColumn',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_CHASSIS_NAME]
					}
				}]
		    },
			{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
       			items: [{
       				xtype:'searchfieldset',
       				title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
       				layout:{
       					type:'hbox',
       					align:'stretch'
       				},
       				defaults:{
						margin: '0 0 5 0',
						labelAlign: 'right'
					},
       				flex: 1,
       				items:[
       					{
    						xtype:'partnercdfield',
    						/*hidden: true,*/
    						width: 200,
    	   					labelWidth: 70,
    	   					fieldLabel: ViewUtil.getLabel('driverlorryregistrationTransport'),
    	   					reference:'ctlPartnerCdForGridField',
    	   					params:{
    	   						ptnrType: CodeConstants.CM_PTNRTP_TRK // CNS, FWD, TRK
    	   					},
    						bind: {
    							value: '{theSearch.ptnrCd}'
    						}
    					},
       					{
						xtype: 'textfield',
						reference:'ctlDriverSearch',
						fieldLabel: ViewUtil.getLabel('driverId'),
						labelWidth: 70,
						width: 200,
						disable: true,
						bind: '{theSearch.driverId}',
						listeners: {
							blur: function(ref){
								if(ref.getValue()){
									ref.setValue(ref.getValue().toUpperCase());
								}
							}
						}
					},
					{
						xtype: 'textfield',
						reference:'ctlDriverNameSearch',
						fieldLabel: ViewUtil.getLabel('driverNm'),
						labelWidth: 70,
						width: 300,
						disable: true,
						bind: '{theSearch.driverNm}',
						listeners: {
							blur: function(ref){
								if(ref.getValue()){
									ref.setValue(ref.getValue().toUpperCase());
								}
							}
						}
					},
					{
		        		xtype: 'textfield',
			            flex:1,
			            reference:'ctlCompanyNameField',
			            fieldLabel: ViewUtil.getLabel('driverlorryregistrationCompanyname'),
			            labelAlign: 'right',
			            width: 200,
			            labelWidth: 100,
			            editable: false,
			            hidden: true,
		        	},
		        	{
		        		xtype: 'textfield',
			            flex:1,
			            reference:'ctlRepresentiveField',
			            fieldLabel: ViewUtil.getLabel('driverlorryregistrationRepresentive'),
			            labelAlign: 'right',
			            width: 200,
			            labelWidth: 100,
			            editable: false,
			            hidden: true,
		        	},
		        	{
		        		xtype: 'textfield',
		        		reference:'ctlTruckNo',
		        		fieldLabel: ViewUtil.getLabel('lorryNo'),
		        		labelWidth: 70,
		        		width: 300,
		        		//disable: true,
		        		hidden: true,
		        		listeners: {
		        			blur: function(ref){
		        				if(ref.getValue()){
		        					ref.setValue(ref.getValue().toUpperCase());
		        				}
		        			}
		        		}
		        	},
		        	{
		        		xtype: 'textfield',
		        		reference:'ctlChassisNo',
		        		fieldLabel: ViewUtil.getLabel('chassisNo'),
		        		labelWidth: 70,
		        		width: 300,
		        		//disable: true,
		        		hidden: true,
		        		listeners: {
		        			blur: function(ref){
		        				if(ref.getValue()){
		        					ref.setValue(ref.getValue().toUpperCase());
		        				}
		        			}
		        		}
		        	},
		        	{
		        		xtype: 'datetimefield',
		        		reference:'ctlMeasureDt',
		        		fieldLabel: ViewUtil.getLabel('lorriesMeasuredt'),
		        		labelWidth: 100,
		        		width: 300,
		        		format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        		//disable: true,
		        		editable: true,
		        		hidden: true
		        	},
		        	{
						xtype: 'textfield',
						reference:'ctlPlateNo',
						fieldLabel: ViewUtil.getLabel('plateNo'),
						labelWidth: 70,
						width: 200,
						disable: true,
						hidden: true,
						listeners: {
							blur: function(ref){
								if(ref.getValue()){
									ref.setValue(ref.getValue().toUpperCase());
								}
							}
						}
					},
					]
       			}],
			}]
		});
		me.callParent();
	}
});