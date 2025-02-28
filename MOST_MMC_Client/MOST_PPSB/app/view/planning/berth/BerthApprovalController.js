Ext.define('MOST.view.planning.berth.BerthApprovalController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [  
       
    ],

    alias: 'controller.berthapproval',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAX_PERIOD_DAY : 62,	// MAX PERIOD DATE
	alertYN : 'N',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var vesselTypeCombo = me.getStore('vesselTypeCombo');
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var vesselStatusCombo = me.getStore('vesselStatusCombo');
		
		me.setDateInDays('ctlEtaFromDt');

		vesselTypeCombo.load({
			params: {
				lcd : 'VC',
				mcd : 'VSLTP',
				scdUse: 'Y'
			}
		});
		cargoTypeCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'CGTP'
			}
		});
		vesselStatusCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'MPTSSTAT'
			}
		});
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			me.alertYN = 'Y';
	     	me.onSearch();
		}
	},
	
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlPlanCombo.setValue('');
		refs.ctlStatusCombo.setValue('');
		refs.ctlVesselTypeCombo.setValue('');
		refs.ctlCargoTypeCombo.setValue('');
		refs.ctlJpvc.setValue('');
		
		me.setDateInDays('ctlEtaFromDt');
		me.onSearch();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	
	onSearchBtn: function() {
		var me = this;
		
     	me.alertYN = 'N';
     	me.onSearch();
	},
	
	onSearch: function() {
		var me = this;
    	var store = me.getStore('berthApprovalList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlEtaFromDt){
			me.setDateInDaysByDate('ctlEtaToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlEtaFromDt', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},	
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refBerthApprovallistGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection, "Berth Approval Detail", false);
	},

	onDetailLoad:function(){
		var me = this;
		var billingTypeCombo = me.getStore('billingTypeCombo');
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var partnerType = me.getStore('partnerType');
		
		partnerType.load();
		billingTypeCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'BILLINGTP'
			}
		});
		cargoTypeCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'CGTP'
			}
		});
		
		me.setDetailInitialize();
	},

	// Detail Initialize
	setDetailInitialize:function(){
		 var me = this;
		 var detailView = me.getDetailBizView();
		 var recvData = detailView.items.get(0).recvData;
		 var vesselInfo = me.getStore('vesselinformation');
		 
		 vesselInfo.load({
			params: {
				agencyCode : recvData.data.arrvSaId,
				vslCd : recvData.data.vslCd,
				callYear: recvData.data.callYear,
				callSeq: recvData.data.callSeq
			},
			callback: function(records, operation, success) {
				if (success) {
					me.getViewModel().set('vesselInfo', records[0].data);
					var calculationItem = Ext.create('MOST.model.planning.berth.CalculationItems');
					calculationItem.set('loa', records[0].data.loa);
					calculationItem.set('pecent', 10);
					me.getViewModel().set('calculation', calculationItem);
				}
			}
		 });
		 
		 var partnerInfo = me.getStore('partnerInfo');
		 var businessHistory = me.getStore('businessHistory');
		 
		 partnerInfo.load({
			params: {
				agencyCode : recvData.data.arrvSaId,
				vslCd : recvData.data.vslCd,
				callYear: recvData.data.callYear,
				callSeq: recvData.data.callSeq
			},
			callback: function(records, operation, success) {
				if (success) {
					businessHistory.load({
						params: {
							agencyCode : recvData.data.arrvSaId,
							vslCd : recvData.data.vslCd,
							callYear: recvData.data.callYear,
							callSeq: recvData.data.callSeq
						}
					});
					
					me.getViewModel().set('partnerInfo', records[0]);
					
					if(records[0].data.collection){
						 var ptnrArray = new Array();
						 
						 for(var i = 0; i<records[0].data.collection.length; i++){
							 var record = records[0].data.collection[i];
							 console.log(record.ptnrType);
							 ptnrArray.push(record.ptnrType)
						 }
						 
						 me.getViewModel().set('partnerTypeArray', ptnrArray);
						 
						 var refs = me.getReferences();
						 var selectRec = refs.refBerthApprovallistGrid.getSelection()[0];
						 
						 refs.ctlStatus.setValue('Status : <span style="color:green;">' + selectRec.data.mptsStatNm + '</span>');
					}
				}
			}
		});
	},	
	
	onCalculationClear:function(){
		var me = this;
		var vesselInfo = me.getViewModel().get('vesselInfo');
		var calculationItem = Ext.create('MOST.model.planning.berth.CalculationItems');
		
		if(vesselInfo){
			calculationItem.set('loa', vesselInfo.loa);
		}
		
		calculationItem.set('pecent', 10);
		me.getViewModel().set('calculation', calculationItem);
	},

	onEmailSenderlLoad:function(){
		var me = this;
		var emailTemplate = me.getStore('emailTemplate');
		
		emailTemplate.load({
			params: {
				pgmNm : 'BERTH APPROVAL',
			},
			callback: function(records, operation, success) {
				if (success) {
					
				}
			}
		});
	},
	
	onEmailTemplateComboSelect: function(combo, record, index) {
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().set('selectedTemplate', record);
		
		if(record.data.collection){
			var to = new Array();
			var cc = new Array();
			
			for(var i = 0; i< record.data.collection.length; i++){
				var receiver = record.data.collection[i];
				
				if(receiver.recvTp === 'RC'){
					to.push(receiver.email);
				}else{
					cc.push(receiver.email);
				}
			}
			
			me.getViewModel().set('to', to);
			me.getViewModel().set('cc', cc);
		};
		
		refs.ctlTo.setValue('');
		refs.ctlCc.setValue('');
		refs.ctlSubject.setValue('');
		refs.ctlContent.setValue('');
	},
	
	onApplyiClick:function(){
		var me = this;
		var refs = me.getReferences();
		var tempSubject = refs.ctlTempSubject.getValue();
		var tempContent = refs.ctlTempContent.getValue();
		var tempTo = refs.ctlTempTo.getValue();
		var tempCc = refs.ctlTempCc.getValue();
		
		refs.ctlTo.setValue(tempTo);
		refs.ctlCc.setValue(tempCc);
		refs.ctlSubject.setValue(tempSubject);
		refs.ctlContent.setValue(tempContent);
	},
	
	onSubmitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('berthApprovalList');
		var selectRec = me.getReferences().refBerthApprovallistGrid.getSelection()[0];
		
		if(selectRec){
			MessageUtil.question('confirm', 'berth_reject_message',null, 
				function(button){
					if (button === 'ok') {
						selectRec.set('mptsStat','RJ');
						selectRec.set('mptsStatNm','REJECTED');
						var from = refs.ctlFrom.getValue();
						var to = refs.ctlTo.getValue();true
						var cc = refs.ctlCc.getValue();
						var subject = refs.ctlSubject.getValue();
						var content = refs.ctlContent.getValue();
						var mailItem = Ext.create('MOST.model.planning.berth.MailItem', {
							from : from,
							recipientTo : to,
							recipientCc : cc,
							subject: subject,
							content: content
						}); 
						var mailList = new Array();
						
						mailList.push(mailItem);
						
						selectRec.set('mailItem', mailItem.data);
						
						store.sync({
							success: function(records){
								var refs = me.getReferences();
								var selectRec = refs.refBerthApprovallistGrid.getSelection()[0];
								
								refs.ctlStatus.setValue('Status : <span style="color:green;">REJECTED</span>');
								MessageUtil.saveSuccess();
								
								var win = refs.refEmailSenderDialog;
								
							   	if (win) {
							   		win.close();
							   	}
							}
						});
					}
				}
			);
		}
	},

	onCancelClick: function(){
		var me = this;
		var refs = me.getReferences();
		var win = refs.refEmailSenderDialog;
		
	   	if (win) {
	   		win.close();
	   	}
	},
	
	onBusinessHistorySearch:function(){
		 var me = this;
		 var refs = me.getReferences();
		 var detailView = me.getDetailBizView();
		 var recvData = detailView.items.get(0).recvData;
		 var vslCallId = refs.ctlJpvcDetail.getValue();
		 var cargoType = refs.ctlCargoType.getValue();
		 var billingType = refs.ctlBillingType.getValue();
		 var vslNm = refs.ctlVesselName.getValue();
		 var fromDt = refs.ctlFromDt.getValue();
		 var toDt = refs.ctlToDt.getValue();
		 var businessHistory = me.getStore('businessHistory');
		 
		 businessHistory.load({
			params: {
				agencyCode : recvData.data.arrvSaId,
				vslCallId: vslCallId,
				vslNm: vslNm,
				fromDt:fromDt,
				toDt:toDt,
				cargoType: cargoType,
				billingType: billingType
			}
		});
	},
	
	onApproveVessel:function(btn){
		var me = this;
		
		if(btn.value === 'AP') {
			var store = me.getStore('berthApprovalList');
			var selectRec = me.getReferences().refBerthApprovallistGrid.getSelection()[0];
			
			if(selectRec){
				MessageUtil.question('confirm', 'berth_approval_message',null, 
					function(button){
						if (button === 'ok') {
							selectRec.set('mptsStat','AP');
							selectRec.set('mptsStatNm','APPROVED');
							
							store.sync({
								success: function(records){
									var refs = me.getReferences();
									var selectRec = refs.refBerthApprovallistGrid.getSelection()[0];
									
									refs.ctlStatus.setValue('Status : <span style="color:green;">APPROVED</span>');
									MessageUtil.saveSuccess();
								}
							});
						}
					}
				);
			}
		} else if (btn.value === 'RJ'){
			var refs = me.getReferences();
			var win = refs.refEmailSenderDialog;
			var selectedItem = me.getViewModel().get('selectedTemplate');
			var toItem = me.getViewModel().get('to');
			var ccItem = me.getViewModel().get('cc');
			
		   	if (!win) {
		   		win = Ext.create('Ext.window.Window', {
		        	reference: 'refEmailSenderDialog',
		        	title: 'Email',
		        	layout: 'fit',
		        	width: 1000,
		            height: 610,
		            resizable: true,
		            resizeHandles: 'all', 
		            closeAction: 'destroy',
		            constrain: false,
		            maximizable : false,
		            scrollable: true,
		            stateId: 'stateEmailSenderDialog',
		            stateful: true,
		            items: [{
		            	xtype: 'app-berthapprovalemailsender',
		            	layout: 'fit'
		            }]
				});
		       
	       		me.getView().add(win);
	       }
		   	
    	   if(selectedItem){
    		   me.getViewModel().set('selectedTemplate', null);
    	   }
    	   
    	   if(toItem){
    		   me.getViewModel().set('to', null);
    	   }
    	   
    	   if(ccItem){
    		   me.getViewModel().set('cc', null);
    	   }
	      
	       win.show();
	       win.toFront();
		}else{
			var win = me.lookupReference('app-berthapprovaldetail');
			
		   	if (win) {
		   		win.close();
		   	}
		}
	},
	
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		return '';
	},

	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
    	var planCd = refs.ctlPlanCombo.getValue();
    	var vesselType = refs.ctlVesselTypeCombo.getValue();
    	var etaFrom = Ext.Date.format(refs.ctlEtaFromDt.getValue(), MOST.config.Locale.getShortDate());
    	var etaTo =  Ext.Date.format(refs.ctlEtaToDt.getValue(), MOST.config.Locale.getShortDate());
    	var vslCallId = refs.ctlJpvc.getValue();
    	var statusCd = refs.ctlStatusCombo.getValue();
    	var cargoType = refs.ctlCargoTypeCombo.getValue();
    	var params = {
			etaFrom : etaFrom,
			etaTo : etaTo,
			cgTpCd : cargoType,
			vslCallId : vslCallId,
			planned : planCd,
			vslStatus : statusCd,
			vslTp : vesselType,
			alertYn: me.alertYN
		};
    		
    	return params;
	},

    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Berth Approval',
            fileName: 'Berth_Approval' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refBerthApprovallistGrid;
        grid.saveDocumentAs(cfg);
    }
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	

	});


var task = new Ext.util.DelayedTask(function() {
	var me = this;
});