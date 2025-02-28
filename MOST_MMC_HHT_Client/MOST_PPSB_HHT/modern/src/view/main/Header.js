Ext.define('MOST.view.main.Header', {
	extend : 'Ext.Toolbar',
	alias: 'widget.app-mainheader',

	requires: [
    ],

    reference : 'refmainheaderbar',
    itemId: 'mainheaderbar',    
    
    ui: 'md-toolbar',
    docked: 'top',
    padding: 0,          

	/**
	 * Label Start:
	*/
	lblVslCallId: {type: 'bundle', key: 'hht_vslcallid'},
	lblVesselName: {type: 'bundle', key: 'hht_vslname'},
	lblWorkDate: {type: 'bundle', key: 'hht_workdate'},
	lblShift: {type: 'bundle', key: 'hht_shift'},
	/**Label End*/

	items: [
		{
			xtype: 'button',
			ui: 'hd_button',
			iconCls: 'x-fa fa-bars txt_green',
			handler: 'onToggleMenu',
			width: 50,
			margin: '10 10 10 20'
		},
		{
			xtype: 'spacer',
			width: 3
		},
		{
			xtype: 'button',
			ui: 'retrieve-button-modern',
			width: 40,
			reference: 'refVesselScheduleButton',    			
			text: null,
			iconCls: 'x-fa fa-ship',
			handler: 'onMoveScheduleTabClick'
		},
		{
			xtype: 'spacer',
			width: 3
		},
		{
			xtype: 'label',
			reference: 'refHeaderNonJpvcLabel',

			margin: '0 0 0 0',
			bind: {
				html: '{!globalVesselCallIdCheck ? "STORAGE-VESSEL" : ""}',
				hidden: '{globalVesselCallIdCheck}',
			},
			listeners: {
				element: 'element',
				click: 'onMoveScheduleTabClick'
			},
			handler: 'onMoveScheduleTabClick'
		},
//		{
//			xtype: 'spacer',
//			width: 10
//		},
//		{
//			xtype: 'label',
//			reference: 'refHeaderJpvcLabel',
//			margin: '0 0 0 0',
//			bind: {
//				html: 'VslCallId: <b>{globalVesselCallId}</b>'
//						+ '</br>Vessel: <b>{globalVesselName}</b>',
//	        	hidden: '{!globalVesselCallIdCheck}'
//	        },
//	        listeners: {
//	            element: 'element',
//	            click: 'onMoveScheduleTabClick'
//	        },
//	        handler: 'onMoveScheduleTabClick'
//		},
	    {//Working Shift Date
	    	xtype: 'container',
			margin: '0 0 0 5',
			layout: {
				type: 'vbox',
			},
			items:[
				{
					xtype: 'container',
					defaults: {
						margin: '0 5 0 0',
					},
					layout: {
						type: 'hbox',
					},
					items: [
						{
							xtype: 'label',
							width: 60,
							style: {
								'text-align': 'right'
							},
							html: 'Date' //{type: 'bundle', key: 'hht_workdate'}
						},
						{
							xtype: 'label',
							style: {
								'text-align': 'left'
							},
					    	bind: {
					    		html: '<b>{globalWorkDate}</b>'
					    	},
						},
					]
				},
				{
					xtype: 'container',
					defaults: {
						margin: '0 5 0 0',
					},
					layout: {
						type: 'hbox',
					},
					items: [
						{
							xtype: 'label',
							width: 60,
							style: {
								'text-align': 'right'
							},
							html: 'Shift' //{type: 'bundle', key: 'hht_shift'}
						},
						{
							xtype: 'label',
							style: {
								'text-align': 'left'
							},
					    	bind: {
					    		html: '<b>{globalWorkShiftDisplay}</b>'
					    	},
						},
					]
				},
			] 
	    },
		{//Vessel
	    	xtype: 'container',
			margin: '0 0 0 5',
			layout: {
				type: 'vbox',
			},
			items:[
				{
					xtype: 'container',
					defaults: {
						margin: '0 5 0 0',
					},
					layout: {
						type: 'hbox',
					},
					items: [
						{
							xtype: 'label',
							width: 70,
							style: {
								'text-align': 'right'
							},
							html: 'VesselCallId' //{type: 'bundle', key: 'hht_vslcallid'}
						},
						{
							xtype: 'label',
							style: {
								'text-align': 'left'
							},
					    	bind: {
					    		html: '<b>{globalVesselCallId}</b>',
					    	},
						},
					]
				},
				{
					xtype: 'container',
					defaults: {
						margin: '0 5 0 0',
					},
					layout: {
						type: 'hbox',
					},
					items: [
						{
							xtype: 'label',
							width: 70,
							style: {
								'text-align': 'right'
							},
							html: 'VesselName' //{type: 'bundle', key: 'hht_vslname'}
						},
						{
							xtype: 'label',
							style: {
								'text-align': 'left'
							},
					    	bind: {
					    		html: '<b>{globalVesselName}</b>'
					    	},
						},
					]
				},
			],
			bind: {
	        	hidden: '{!globalVesselCallIdCheck}'
	    	},
	    	listeners: {
	            element: 'element',
	            click: 'onMoveScheduleTabClick'
	        },
	    },
//		{
//	    	xtype: 'label',
//			margin: '0 0 0 10',
//	    	bind: {
//	    		html: 'Work: <b>{globalWorkDate}</b></br>Shift: <b>{globalWorkShiftDisplay}</b>'
//	    	},
//	    	width: 115
//	    },
		{
			xtype: 'spacer',
			flex:1
		},
	    {
	    	xtype: 'container',
	    	margin: 0,
	    	layout: {
	    		type: 'hbox',
                pack: 'end'
	    	},
	    	minWidth: 200,
	    	items: [
	    		{
		    		xtype: 'label',
		    		margin: '7 5 0 0',
		    		style: {
		    			'text-align': 'right',
		    		},    		
		    		reference: 'refUserIdLabel',
		    		html: '',
		    		handler: 'onHhtLogout'
		    	}, 
		    	{
		    		xtype: 'button',
					margin: '0 10 0 0',
		    		iconCls: 'x-fa fa-sign-out',
		    		ui: 'delete-button-modern',
		    		reference: 'refUserLogoutButton',
		    		text: 'LOGOUT',
		    		handler: 'onHhtLogout'
		    	}
	    	]
		}
	]
});
 