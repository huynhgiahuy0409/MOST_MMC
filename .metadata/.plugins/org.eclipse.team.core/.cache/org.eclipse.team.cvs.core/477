Ext.define('MOST.view.planning.RosterConfigurationMonthlyController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'Ext.data.proxy.Rest',
		'Ext.calendar.model.Event'
	],

	alias: 'controller.rosterconfigurationmonthly',
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var shiftTypeStore = me.getStore('shiftTypeCombo');
		var calendar = refs.refRosterMonthCalendar;
		var startingDate = refs.refRosterMonthField;

		shiftTypeStore.load(
			{
				callback: function(record, operation, success) {
					if(success){
						if(record.length > 0) {
							refs.ctlShiftTypeCd.setValue(record[0].get('shftTpCd'));
						}
					}
				}
			}
		);
		calendar.getReferences().titleBar.setHidden(true);
		
		startingDate.setValue(new Date);
	},
	
	onMonthChange: function(calendar, context, eOpts){
		var me = this;
		var monthField = me.lookupReference('refRosterMonthField');
		var firstDateOfMonth = calendar.getValue();
		
		monthField.setValue(firstDateOfMonth);
	},

	onMonthFieldRender : function(picker, eOpts){
		var me = this;
		var firstDate = Ext.Date.getFirstDateOfMonth(new Date());
		
		picker.setValue(firstDate);
	},

	onMonthPicked : function(picker, date){
		var me = this;
		var refs = me.getReferences();
		var monthCal = refs.refRosterMonthCalendar;
		
		monthCal.setValue(date);
		
		var calendarStore = monthCal.getStore();
		var params = {};
		
	    params.shftDivCd = refs.ctlShiftTypeCd.getValue();
	    
	    calendarStore.getProxy().extraParams = params;
	    calendarStore.getEventStoreDefaults().proxy.extraParams = params;
	    calendarStore.load();
	},
	
	onCtlShiftTypeCd_changeEvent: function(){
		var me = this;
		var refs = me.getReferences();
		var monthCal = refs.refRosterMonthCalendar;
		var params = {};
		
		monthCal.setValue(refs.refRosterMonthField.getValue());
		
		var calendarStore = monthCal.getStore();
		
	    params.shftDivCd = refs.ctlShiftTypeCd.getValue();
	    
	    calendarStore.getProxy().extraParams = params;
	    calendarStore.getEventStoreDefaults().proxy.extraParams = params;
	    calendarStore.load();
		
	},
	
	onEventTap:  function(context, eOpts){ 		
		var me = this;
		var refs = me.getReferences();
		var popupAlias = null;
		var eventStore = context.getStore().getEventSource();
		var selectedYmd = eOpts.date.getFullYear().toString().concat((eOpts.date.getMonth() +1).toString().length > 1? (eOpts.date.getMonth() +1).toString() : '0' + (eOpts.date.getMonth() +1).toString(),eOpts.date.getDate().toString().length > 1? eOpts.date.getDate().toString() : '0' + eOpts.date.getDate().toString());
		var arr = [];
		
		popupAlias = "popup-shiftgroupmultipopup";
		
		arr.push(selectedYmd);
		arr.push(refs.ctlShiftTypeCd.getValue());
		
		eventStore.each(function(rec) {
			if (rec.data.id.startsWith(selectedYmd)) {
				arr.push(rec.data);
			}
		});
		
		if(popupAlias){
			var parent = me.getView();
			
			this.view.setEOpts(eOpts);
			this.view.setContext(context);
			
			ViewUtil.openCodePopup(parent.getController(),popupAlias, me.getView().reference, arr, me.afterSetCodePopupData(context, eOpts), me);
		}
    }, 
	
    afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent, context, eOpts){
    	var me = this;
		var refs = me.getReferences();
		
    	if(returnValue != null){
    		if(returnValue.status === 'Success'){ //save from Group List screen. 
    			var newEvent = new Ext.calendar.model.Event();
    			var store = this.view.getContext().getStore();
    			var eventStore = this.view.getContext().getStore().getEventSource();
    	    	var detailItem = new MOST.model.planning.RosterConfigurationMonthly();
    	    	var proxy = detailItem.getProxy();
    	    	var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
    	    	
    	    	proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/data';
    	    	detailItem.data.shftGrpCd = returnValue.code;
    	    	detailItem.data.rsnCd = 'DO';
    	    	detailItem.data.rstrYmd = this.view.getEOpts().date.getFullYear().toString().concat((this.view.getEOpts().date.getMonth() +1).toString().length > 1? (this.view.getEOpts().date.getMonth() +1).toString() : '0' + (this.view.getEOpts().date.getMonth() +1).toString(),this.view.getEOpts().date.getDate().toString().length > 1? this.view.getEOpts().date.getDate().toString() : '0' + this.view.getEOpts().date.getDate().toString()); 
    	    	detailItem.data.userId = MOST.config.Token.getUserId();
    	    	detailItem.data.shftTpCd = returnValue.shftTpCd;
    	    	
    			var isCreated = detailItem.phantom;
    			
    			updateParm.getProxy().url = proxy.url;
    			updateParm.phantom = isCreated;
    			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
    			updateParm.set('item', detailItem.data);
    			
    			updateParm.save({
    				success : function(records,success){
    					store.load();
    					MessageUtil.saveSuccess();
    				}
    			});
    		}
    	}
	},
	
    onPreview: function(){
    	var me = this;
		var refs = me.getReferences();		
		var params = {
				previewType : 'PREVIEW',
				scdLgv : 'VO',
				rsnCd : 'DO',
				userId : MOST.config.Token.getUserId()
    	};
		
		me.getView().detailViewAlias = 'app-rostermonthlyreportgeneratepdf';
		me.openDetailPopup(params, 'Preview');
	},
	
    onDownload: function(){
    	var me = this;
		var refs = me.getReferences();		
		var params = {
				previewType : 'DOWNLOAD',
				scdLgv : 'VO',
				rsnCd : 'DO',
				userId : MOST.config.Token.getUserId()
    	};
		
		me.getView().detailViewAlias = 'app-rostermonthlyreportgeneratepdf';
		me.openDetailPopup(params, 'Download');
	}
});
