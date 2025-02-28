Ext.define('MOST.view.popup.PackageTypeMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-packagetypemultipopup',
	requires: [
		'MOST.view.popup.PackageTypeMultiPopupModel',
		'MOST.view.popup.PackageTypeMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Package Type",
	width: 460,
	height: 440,

	controller: 'packagetypemultipopup',
	
	viewModel: {
		type: 'packagetypemultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblCk: {type: 'bundle', key: 'fnChk'},
	lblCode: {type: 'bundle', key: 'scd'},
	lblDescription: {type: 'bundle', key: 'capaDesc'},
	lblCategory: {type: 'bundle', key: 'titleCategory'},
	lblWorkingArea: {type: 'bundle', key: 'titlefieldnameWorkingarea'},
	lblWharf: {type: 'bundle', key: 'titlecomboWharf'}, 

	btnUpdate: {type: 'bundle', key: 'update'},
	btnSet: {type: 'bundle', key: 'set'},
	btnClear: {type: 'bundle', key: 'clear'},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refCommonCodeForMultiPopupGrid',
				flex : 1,
				margin:'0 5 5 5',
				stateful : true,
				stateId : 'stateCommonCodeForMultiPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{packageTypeMultiList}'
	    		},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            	{
	            		header: me.lblCk,
	            		reference: 'refChkWorkingAreaMulti',
			            xtype: 'checkcolumn',
			            dataIndex: 'chk',
			            width: 40,
			            defaultType: 'integer',
			            listeners: {
			            	checkchange: 'onPackageTypeMultiCheckChange'
//    		                checkchange: 'onCommonCodeForMultiCheckChange'
    		            }
			        },
			        {
			        	header: 'Package Type Code',
			        	dataIndex: 'scd',
			        	reference: 'refCd',
			        	filter: 'string',
			        	width: 130
			        },
			        {
			        	header: 'Package Type Name',
			        	dataIndex: 'scdNm',
			        	reference: 'refCdNm',
			        	filter: 'string',
			        	width: 268
			        }]
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'container',
					layout:{
						type: 'hbox'
					},
					defaults : {
	   					width : 300,
	   					labelAlign : 'right',
	   					labelWidth : 100
					},
					items: [
					{							
						reference:'txtSetCds',
						xtype:'textfield',
						fieldLabel : 'Package Type',						
						name: 'ptnCds',
						fieldStyle: 'background-color: #E8D4F7;',
						editable: true,
						margin: '0 5 0 0',
						flex: 1,
						listeners:{
	                        change: function(field, newValue, oldValue){
	                            field.setValue(newValue.toUpperCase());
	                        }
	                     }
					},
					{
						xtype: 'button',
						text: 'Search',
						width: 60,
						margin: '0 5 0 0',
						listeners:{
							click:'onSearch'
						}
					},
					{
						xtype: 'button',
						text: me.btnUpdate,
						width: 60,
						margin: '0 0 0 0',
						listeners:{
							click:'onUpdate'
						}
					}]
				}]
					
			},{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'container',
					layout:{
						type: 'hbox',
					     align: 'stretch'
					},
					defaults : {
	   					width : 300,
	   					labelAlign : 'right',
	   					labelWidth : 100
					},					
					items: [
					{																		
						margin: '0 5 0 0',
						flex: 1
					},
					{
						xtype: 'button',
						text: me.btnSet,
						width: 60,
						name: 'btnCdTypeSet',
						margin: '0 5 0 0',
						listeners:{
							click:'onSet'
						}
					},{
						xtype: 'button',
						text: me.btnClear,
						width: 60,
						name: 'btnCdTypeClear',
						listeners:{
							click:'onClear'
						}
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

