Ext.define('MOST.view.common.PopupPicker', {
	extend : 'Ext.Panel',
	alias: 'widget.app-popupPicker',

	requires: [
       'Ext.MessageBox',
       'Ext.layout.Fit'
    ],
    
    controller: 'popupsample',
//	
//	viewModel: {
//		type: 'main'
//	},
        
    lblJpvcNo: {type: 'bundle', key: 'vslcallid'},
    lblJpvc: {type: 'bundle', key: 'jpvc'},
    
    reference : 'popupPicker',
    itemId: 'popupPicker',    
    
    autoSize: true,
    modal: true,
    
    shadow: false,
    layout: 'vbox',
    padding: 8,    
    scrollable: true,
    

    items: [
		{
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[{
			xtype:'vslcallidfieldhht',
			labelWidth:80,
			width:290,
//			margin: '-4 0 0 0',
			fieldLabel:'JPVC',
			reference:'refJpvcHHT',
			emptyText:'JPVC',
			change: function(field, newValue){
        	   field.setValue(newValue.toUpperCase());
			},
    	},{
			xtype: 'textfield',
			margin: '0 50 10 0 ',
			width : 500,
            label: 'JPVC',
            labelAlign: 'left',
            reference: 'refSearchJpvcHHT',
            placeholder: 'select JPVC',
            allowBlank: true,
            editable:false,
       },{
    		xtype: 'button',
    		reference: 'refVslCallIdPopupButton',
    		ui: 'raised',
			text: 'JPVC',
			iconCls: 'x-fa fa-search',
    		handler: 'openVslCallIdPopupHHT',
    	}]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[{
			xtype:'contractorfieldHHT',
			labelWidth:80,
			width:290,
			margin: '-4 0 0 0',
			fieldLabel:'Contractor',
			reference:'refContractorHHT',
			emptyText:'Contractor',
			change: function(field, newValue){
        	   field.setValue(newValue.toUpperCase());
			},
    	},{
			xtype: 'textfield',
			margin: '0 50 10 0 ',
			width : 500,
            label: 'Contractor',
            labelAlign: 'left',
            reference: 'refSearchContractorHHT',
            placeholder: 'select Contractor',
            allowBlank: true,
            editable:false,
       },{
    		xtype: 'button',
    		reference: 'refContractorPopupButton',
    		ui: 'raised',
			text: 'Contracotr',
			iconCls: 'x-fa fa-search',
    		handler: 'onSearchContracotrHHT',
    	}]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'Lorry',
                labelAlign: 'left',
                reference: 'refLorryHHT',
                placeholder: 'select Lorry',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refLorryPopupButton',
        		ui: 'raised',
    			text: 'Lorry',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchLorryHHT',
        	}
    	]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'Requester',
                labelAlign: 'left',
                reference: 'refRequesterHHT',
                placeholder: 'select Requester',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refRequesterPopupButton',
        		ui: 'raised',
    			text: 'Requester',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchRequesterHHT',
        	}
    	]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'Gate Pass Printing',
                labelAlign: 'left',
                reference: 'refGatePassPrintingHHT',
                placeholder: 'Gate Pass Printing',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refGatePassPrintingButton',
        		ui: 'raised',
    			text: 'Gate Pass Printing',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchGatePassPrintingHHT',
        	}
    	]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'Mechanical Equipment',
                labelAlign: 'left',
                reference: 'refMechanicalEquipmentHHT',
                placeholder: 'MechanicalEquipment',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refMechanicalEquipmentButton',
        		ui: 'raised',
    			text: 'Mechanical Equipment',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchMechanicalEquipmentHHT',
        	}
    	]
    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'GR List for ATA',
                labelAlign: 'left',
                reference: 'refGRListATAHHT',
                placeholder: 'GR Code',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refGRListATAButton',
        		ui: 'raised',
    			text: 'GR List for ATA',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchGRListATAHHT',
        	}
    	]
    },
//    {
//    	xtype: 'fieldset',
//    	layout: 'hbox',
//    	items:[
//    		{
//    			xtype: 'textfield',
//    			margin: '0 50 10 0 ',
//    			width : 500,
//                label: 'GR List for Paging',
//                labelAlign: 'left',
//                reference: 'refGRListPagingHHT',
//                placeholder: 'GR Code',
//                allowBlank: true,
//                editable:false,
//           },{
//        		xtype: 'button',
//        		reference: 'refGRListpagingButton',
//        		ui: 'raised',
//    			text: 'GR List for Paging',
//    			iconCls: 'x-fa fa-search',
//        		handler: 'onSearchGRListPagingHHT',
//        	}
//    	]
//    },
    {
    	xtype: 'fieldset',
    	layout: 'hbox',
    	items:[
    		{
    			xtype: 'textfield',
    			margin: '0 50 10 0 ',
    			width : 500,
                label: 'D/O List',
                labelAlign: 'left',
                reference: 'refDOListHHT',
                placeholder: 'D/O Code',
                allowBlank: true,
                editable:false,
           },{
        		xtype: 'button',
        		reference: 'refDOListButton',
        		ui: 'raised',
    			text: 'D/O List',
    			iconCls: 'x-fa fa-search',
        		handler: 'onSearchDOListHHT',
        	}
    	]
    },
	{
		xtype: 'fieldset',
		layout: 'hbox',
		items:[
			{
				xtype: 'textfield',
				margin: '0 50 10 0 ',
				width : 500,
				label: 'Gate Pass List',
				labelAlign: 'left',
				reference: 'refGatePassListHHT',
				placeholder: 'Gate Pass',
				allowBlank: true,
				editable:false,
			},{
				xtype: 'button',
				reference: 'refGatePassListButton',
				ui: 'raised',
				text: 'Gate Pass List',
				iconCls: 'x-fa fa-search',
				handler: 'onSearchGatePassListHHT',
			}
			]
	},
	{
		xtype: 'fieldset',
		layout: 'hbox',
		items:[
			{
				xtype: 'textfield',
				margin: '0 50 10 0 ',
				width : 500,
				label: 'Working Area',
				labelAlign: 'left',
				reference: 'refWorkingAreaHHT',
				placeholder: 'Working Area',
				allowBlank: true,
				editable:false,
			},{
				xtype: 'button',
				reference: 'refWorkingAreaButton',
				ui: 'raised',
				text: 'Working Area',
				iconCls: 'x-fa fa-search',
				handler: 'onSearchWorkingAreaHHT',
			}
			]
	},
	{
		xtype: 'fieldset',
		layout: 'hbox',
		items:[
			{
				xtype: 'textfield',
				margin: '0 50 10 0 ',
				width : 500,
				label: 'Common Code',
				labelAlign: 'left',
				reference: 'refCommonCodeHHT',
				placeholder: 'Select Common Code',
				allowBlank: true,
				editable:false,
			},{
				xtype: 'button',
				reference: 'refCommonCodeButton',
				ui: 'raised',
				text: 'Common Code',
				iconCls: 'x-fa fa-search',
				handler: 'onSearchCommonCodeHHT',
			}
			]
	}            
    ]
});
