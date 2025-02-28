Ext.define('MOST.view.planning.berth.BerthVesselSchDetailInfo', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-berthvesselschinfo',
	
	requires: [
	   'MOST.config.Locale',
	   'TSB.ux.form.field.DateTimeField',
	   'TSB.ux.form.field.DateTimePicker',
	   'MOST.view.planning.berth.BerthExplorerController'
	],
   
	layout: 'anchor',
	defaults:{
		anchor: '100%'
	},
	bodyPadding: 5,
   
	scrollable: true,
   
	lblVVD: {type: 'bundle', key: 'vvd'},
	lblLOA: {type: 'bundle', key: 'loa'},
	lblAlongside: {type: 'bundle', key: 'alongside'},
	lblEta: {type: 'bundle', key: 'eta'},
	lblEtb: {type: 'bundle', key: 'etb'},
	lblEtu: {type: 'bundle', key: 'etu'},
	lblEtd: {type: 'bundle', key: 'etd'},
	lblAta: {type: 'bundle', key: 'ata'},
	lblAtb: {type: 'bundle', key: 'atb'},
	lblAtu: {type: 'bundle', key: 'atu'},
	lblAtd: {type: 'bundle', key: 'atd'},
	lblCancel: {type: 'bundle', key: 'cancel'},
	lblSave: {type: 'bundle', key: 'save'},
   
	initComponent: function() {
		var me = this;
 
		var berthAlongside = Ext.create('Ext.data.Store', {
			fields: ['value', 'name'],
			data: [
				{'value':'S', 'name':'Starboard'},
				{'value':'P', 'name':'Port'},
				{'value':'T', 'name':'Top'},
				{'value':'B', 'name':'Bottom'}
			]
	   });

	   Ext.apply(me, {
		   	defaultType: 'textfield',
		   	items: [{
		        fieldLabel: me.lblVVD,
		        name: 'vvd',
		        readOnly: true,
	        	editable: false,
		        bind: '{selectedBerthPlan.vesselCallId}',
		        allowBlank: false
		    },{
		        fieldLabel: me.lblLOA,
		        name: 'loa',
		        readOnly: true,
	        	editable: false,
		        bind: '{selectedBerthPlan.loa}',
		        allowBlank: false
		    },{
		        fieldLabel: me.lblAlongside,
		        name: 'alongside',
	        	xtype: 'combo',
        		displayField:'name',
        		valueField:'value',
	        	store : berthAlongside,
        		bind: '{selectedBerthPlan.berthAlongside}',
		        allowBlank: false
		    },{
		        fieldLabel: me.lblEta,
		        reference: 'refEtaForBerth',
        		xtype: 'datetimefield',
		        bind: '{selectedBerthPlan.eta}',
	        	editable: false,
		        allowBlank: true
		    },{
		        fieldLabel: me.lblEtd,
		        reference: 'refEtdForBerth',
        		xtype: 'datetimefield',
    			dateFormat: 'Y-m-d H:i',		        
		        bind: '{selectedBerthPlan.etd}',
	        	editable: false,
		        allowBlank: true
		    },{
		        fieldLabel: me.lblAta,
		        reference: 'refAtaForBerth',
        		xtype: 'datetimefield',
    			dateFormat: 'Y-m-d H:i',		        
		        bind: '{selectedBerthPlan.ata}',
	        	editable: false,
		        allowBlank: true
		    },{
		        fieldLabel: me.lblAtd,
		        reference: 'refAtdForBerth',
        		xtype: 'datetimefield',
    			dateFormat: 'Y-m-d H:i',		        
		        bind: '{selectedBerthPlan.atd}',
	        	editable: false,
		        allowBlank: true
		    }],
		    buttons: [{
		        text: me.lblCancel,
		        handler: 'cancelUpdateVesselSchedule'
		    },{
		        text: me.lblSave,
		        formBind: true,
		        disabled: true,
		        handler: 'updateVesselSchedule'
		    }]
	   });
		
	   me.callParent();
   	}
});