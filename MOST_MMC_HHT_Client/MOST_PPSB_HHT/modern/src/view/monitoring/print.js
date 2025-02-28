Ext.define('MOST.view.popup.print', {
	extend: 'Ext.Panel',
	alias: 'widget.app-print',

	requires: [
//		'Ext.grid.plugin.Exporter',
//		'Ext.grid.plugin.Clipboard',
//		'Ext.grid.plugin.ColumnResizing',
		'MOST.view.controller.GatePassListController',
		'MOST.view.controller.GatePassListModel',
    ],

    controller: 'gatepasslist',
	
	viewModel: {
		type: 'gatepasslist'
	},
    
	
    autoSize: true,
    shadow: false,
    layout: 'vbox',
    width : 400,
    height : 600,
    scrollable: true,	
	padding: '0 0 0 0',
	margin: '0 0 0 0',
    initialize : function(){
		var me = this;
		me.setItems(
		{
			xtype: 'container',			
			id: 'print',
			padding: '0 0 0 0',
			margin: '0 0 0 0',
			defaults:{
				margin:'0 0 0 0',
				style: 'font-family:Tahoma; font-size :8px;'
			},
			items: [
			{//Date Time
                xtype: 'label',
                style: 'text-align:left;font-size :9px;font-family:Tahoma;',
                reference: 'refDateTimePrint',
		    },
			{
                xtype: 'label',
                style: 'text-align:center; font-weight:bold;font-size :18px;font-family:Tahoma; font-weight:bold;',
                html: 'JOHOR PORT BERHAD'
		    },
			{
                xtype: 'label',
                style: 'text-align:center; font-weight:bold;font-size :16px;font-family:Tahoma; font-weight:bold;',
                html: 'BULK & BREAK BULK TERMINAL'
		    },
		    {
		    	//GatePass NO
                xtype: 'label',
                style: 'font-size :12px;text-align:right;font-family:Tahoma; font-weight:bold;',
                reference: 'refGPNo',
		    },
		    {
                xtype: 'label',
                style: 'text-align:center;font-size :13px;font-family:Tahoma; font-weight:bold;',
                html: 'GATE PASS SLIP'
		    },
		    {
		    	//BL or GR NO
                xtype: 'displayfield',
                reference: 'refBLGRNo',
		    },
		    {
		    	//DO/SN
                xtype: 'label',
                reference: 'refDOSN',
		    },
		    {
		    	//VSL
                xtype: 'label',
                reference: 'refVSL',
		    },
		    {
		    	//JPVC
                xtype: 'label',
                reference: 'refJPVC',
		    },
		    {
		    	//POD/POL
                xtype: 'label',
                reference: 'refPODPOL',
		    },
		    {
		    	xtype : 'container',
		    	layout : 'hbox',
		    	items:[{
			    	//POD/POL
	                xtype: 'label',
	                style: 'font-family:Tahoma; font-size :8px;',
	                reference: 'refHatchNo',
	                margin : '0 30 0 0'
			    },{
			    	//POD/POL
	                xtype: 'label',
	                style: 'font-family:Tahoma; font-size :8px;',
	                reference: 'refWharf',
			    }]
		    },
		    {
		    	//Shipper Name
                xtype: 'label',
                reference: 'refShipper',
		    },
		    {
		    	//Consignee Name
                xtype: 'label',
                reference: 'refConsignee',
		    },
		    {
		    	//Final Dest
                xtype: 'label',
                reference: 'refFinalDest',
		    },
		    {
		    	//Custom/fz appr
                xtype: 'label',
                reference: 'refCustomFZAppr',
				hidden: true
		    },
		    {
		    	//ReleaseNO
                xtype: 'label',
                reference: 'refReleaseNo',
				hidden: true
		    },
		    {
		    	//DG Approval
                xtype: 'label',
                reference: 'refDGApproval',
				hidden: true
		    },
		    {
		    	xtype : 'container',
		    	layout : 'hbox',
				defaults:{
					margin:'0 0 0 0',
					style: 'font-family:Tahoma; font-size :8px;'
				},		    	
		    	items:[{
			    	//LORRY/WAGON
	                xtype: 'label',
	                reference: 'refLorry',
	                margin : '0 30 0 0'
			    },{
			    	//T/PORTER
	                xtype: 'label',
	                reference: 'refTPorter',
	                
			    }]
		    },{
		    	xtype : 'container',
		    	layout : 'hbox',
				defaults:{
					margin:'0 0 0 0',
					style: 'font-family:Tahoma; font-size :8px;'
				},		    	
		    	items:[{
			    	//NO TRIPS
	                xtype: 'label',
	                reference: 'refNoTrips',
	                margin : '0 30 0 0'
			    },{
			    	//OPRMode
	                xtype: 'label',
	                reference: 'refOPRMode',
			    }]
		    },
		    {
		    	//DG Approval
                xtype: 'label',
                reference: 'refPackingNo',
		    },
		    {
		    	//Commodity
                xtype: 'label',
                reference: 'refCommodity',
		    },
		    {
		    	//Cargo State
                xtype: 'label',
                reference: 'refCargoStatus',
		    },
		    {
		    	//Cargo State
                xtype: 'label',
                reference: 'refCargoStatus',
		    },
		    {
	    		//DOC AMT MT
                xtype: 'label',
                reference: 'refDOCAMTMT',

		    },
		    {
		    	//ACT AMT MT
                xtype: 'label',
                reference: 'refACTAMTMT',
		    },
		    {
		    	//Delivery MT
                xtype: 'label',
                reference: 'refDeliverMT',
		    },
		    {
		    	//Cargo Delivery
                xtype: 'label',
                reference: 'refCargoDelivery',
		    },
		    {
		    	//Remark
                xtype: 'label',
                reference: 'refRemark',
		    },
		    {
		    
                xtype: 'label',
                style: 'font-family:Tahoma;text-align:justify;font-size :7px; width: 280px',
                //html:'<br>Hereby affirm that cargos delivered to m1e/us are in apparent good order and <br> condition. I/We also acknowledge that the Johor Port Berhad is not responsible <br> for the contents or condition thereof. <br> Dengan ini mengesahkan bahawa kargo yang diserah kepada saya/kami adalah <br> di dalam kedudukan dan keadaan baik pada zahirnya. Saya/kami juga maklum <br> bahawa Johor Port Berhad tidak bertanggungjawab terhadap isi kandungan atau keadaana.'
                html: 'Hereby affirm that cargos delivered to me/us are in apparent good order and condition. I/We also acknowledge that the Johor Port Berhad is not responsible for the contents or condition thereof. Dengan ini mengesahkan bahawa kargo yang diserah kepada saya/kami adalah di dalam kedudukan dan keadaan baik pada zahirnya. Saya/kami juga maklum bahawa Johor Port Berhad tidak bertanggungjawab terhadap isi kandungan atau keadaannya.'
		    },
		    {
		    	//Confirmed 
                xtype: 'label',
                reference: 'refConfirmed',
		    },
		    {
		    	//UPdate Date 
                xtype: 'label',
                reference: 'refUpdateDate',
		    },
		    {
		    	//Printed  
                xtype: 'label',
                reference: 'refPrinted',
		    },
		    {
		    	//Print Date 
                xtype: 'label',
                reference: 'refPrintDate',
		    },
		    {
                xtype: 'label',
                style: 'font-family:Tahoma;text-align:left;font-size :7px;',
                html:'<p style="text-align:center;font-size :12px;">DISCLAIMER</p>This transaction is subject to JPB’s Terms and Conditions of Business (TCB). <br> This slip is computer generated and no signature is required.'
		    },
		    
		    ]			
		});	
		me.callParent();
    },
	
	afterRender : function() {
		var me = this;
		me.getController().setHHTPrint();
		me.callParent(arguments);
	}
});
