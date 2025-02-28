Ext.define('MOST.view.document.DGDeclarationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
		
	],
		
	alias: 'controller.dgdeclaration',
	
	CALL_LOCATION_SHIPPING_NOTE : 'shippingnote',
	CALL_LOCATION_SHIPPING_NOTE_NONJPVC : 'shippingnotenonjpvc',
	CALL_LOCATION_FORWARD_NOMINATE : 'fwdnominate',
	CALL_LOCATION_BL : 'billoflading',
	CALL_LOCATION_VESSEL_INTERNAL : 'vesselscheduleinternal',
	CALL_LOCATION_VESSEL_EXTERNAL : 'vesselscheduleexternal',
	
	screenMode :'',
	parent: '',
	
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = null;
		var parentView = me.getParentView();
		me.parent = parentView;

		me.getView().center();
		
		if(parentView.getXType() === "app-shippingnotelist"){
			recvData = me.getView().recvData;		
			screenMode = me.CALL_LOCATION_SHIPPING_NOTE;
			
		}else if(parentView.getXType() === "app-blinquiry"){
			recvData = me.getView().recvData;
			screenMode = me.CALL_LOCATION_BL;

		}else if(parentView.getXType() === "app-shippingnoteNonJpvclist"){
			recvData = me.getView().recvData;
			screenMode = me.CALL_LOCATION_SHIPPING_NOTE_NONJPVC;
		}else if(parentView.getXType() === "app-vesselscheduleinternal"){
			recvData = me.getView().recvData;
			screenMode = me.CALL_LOCATION_VESSEL_INTERNAL;
		}else if(parentView.getXType() === "app-vesselscheduleexternal"){
			recvData = me.getView().recvData;
			screenMode = me.CALL_LOCATION_VESSEL_EXTERNAL;
		}
		
		if(recvData != null ){
			recvData.commit();
			this.setDGControl(recvData);
		}else{
			return null;
		}
	},
	
	// DG Screen Control Setting
	setDGControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var substanceCombo = me.getViewModel().getStore('substanceCombo');
		var dgDeclarationDetail = me.getStore('dgDeclarationDetail');
		var params = me.getSearchCondition(recvData);
		
		refs.ctlImdg.refs.ctlField.setEditable(false);
		
		if(screenMode === me.CALL_LOCATION_SHIPPING_NOTE_NONJPVC && recvData.data.cgNo == '' ){
			me.getViewModel().setData({theDG:recvData});
			substanceCombo.load({
				params: {
					unno : me.getViewModel().get('theDG').get("unno"),
					imdg : me.getViewModel().get('theDG').get("imdg")
				}
			});
		}else{
			var params = me.getSearchCondition(recvData);
			dgDeclarationDetail.load({
				params: params,
				
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {

							records[0].set("arrvSaId", recvData.get("arrvSaId"));
							records[0].set("vslNm", recvData.get("vslNm"));
							records[0].set("berthLoc", recvData.get("berthLoc"));
							records[0].set("voyage", recvData.get("voyage"));
							records[0].set("eta", recvData.get("eta"));
							records[0].set("portCd", recvData.get("portCd"));
							records[0].set("portCdNext", recvData.get("portCdNext"));
							records[0].set("catgCd", recvData.get("catgCd"));

							me.setDetailFileUploadControl(records[0].data);
							me.getViewModel().setData({ theDG: records[0] });

						} else {
							me.getViewModel().setData({ theDG: recvData });
						}
						
						var unno = me.getViewModel().get('theDG').get("unno");
						var imdg = me.getViewModel().get('theDG').get("imdg");
						var dg = me.getViewModel().get('theDG').get("imdg").split('/');
						if(dg.length === 2){
							imdg = dg[1];
						}
						
						substanceCombo.load({
							params: {
								unno : unno,
								imdg : imdg
							}
						});
					}
				}
			});
		}
	},
	
	setDetailFileUploadControl: function(masterItem) {
		var me = this;
		var fileUpload = me.getStore('dgUpload');
		
		fileUpload.setData(masterItem.uploadItems);
		fileUpload.commitChanges();
	},
	
	onCancel:function(){
		var me = this;		
		me.getParentView().getController().cancelDG();
	},
	
	onOk: function () {
		var me = this;
		var dgItem = me.getViewModel().get('theDG');
		var dgForm = me.getView().getForm();
		var dgCheck = dgItem.get('dgChk');

		if(dgCheck == 'S' || StringUtil.isNullorEmpty(dgCheck)) {
			if (dgForm.isValid()) {
				dgItem.commit();
				me.getParentView().getController().saveDGProcess(dgItem);
			} else {
				MessageUtil.mandatoryFieldInValid();
			}

		} else {
			MessageUtil.warning('warning_msg', 'dg_bock_save');
			me.getParentView().getController().saveDGProcess(dgItem);
			dgItem.reject();
			return;
		}		
	},
	
	saveDGProcess:function(){
		var me = this;
		var store = null;
		var grid = null;
		if(screenMode === me.CALL_LOCATION_SHIPPING_NOTE){
			
		}else if (screenMode === me.CALL_LOCATION_FORWARD_NOMINATE){
			store = me.getStore('forwarderNomination');
			grid = me.lookupReference('refForwarderNominationGrid');
		}
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var infoItem = me.getViewModel().get('theDG');
		var dgView = me.getDetailBizView();
		
		var dgForm = dgView.down('form').getForm();
		var model = new MOST.model.document.DGDeclaration(dgForm.getValues());
		
		selection.data.insDGYn = 'Y';
		selection.data.imdg = model.data.imdg;
		selection.data.unno = model.data.unno;
		selection.data.substance = model.data.substance;
		selection.data.freeZoneDiv = model.data.freeZoneDiv;
		selection.data.flashPnt = model.data.flashPnt;
		selection.data.hazChem = model.data.hazChem;
		selection.data.priCd = model.data.priCd;
		selection.data.priGrp = model.data.priGrp;
		selection.data.pkgTpCd = model.data.pkg;
		selection.data.pkgQty = model.data.pkgQty;
		selection.data.rmk1 = model.data.rmk1;
		selection.data.propSnm = model.data.propSnm;
		selection.data.contactNm = model.data.contactNm;
		selection.data.contactNo = model.data.contactNo;
		selection.commit();
		
		dgView.close();
	},
	
	getSearchCondition : function(recvData){
		var me = this;
     	var refs = me.getReferences();
     	var params = null;
     	if(screenMode === me.CALL_LOCATION_SHIPPING_NOTE){
     		
        	var params = {
					ixCd: recvData.data.ixCd,
					vslCallId: recvData.data.vslCallId,
					unno : recvData.data.unno,
    				imdg : recvData.data.imdg,
    				cgNo : recvData.data.cgNo,
    				vslCd : recvData.data.vslCd,
    				callSeq : recvData.data.callSeq,
    				callYear : recvData.data.callYear,
    				catgCd : recvData.get('vslCallId') + "|" +recvData.get('cgNo'),
    				pgmId : 'PN119',
    				seq : recvData.data.dgSeq,
    				searchType: 'detailList'
        	};
        	
     	}else if (screenMode === me.CALL_LOCATION_BL){
     		
        	var params = {
					ixCd: recvData.data.ixCd,
					vslCallId: recvData.data.vslCallId,
    				unno : recvData.data.unno,
    				imdg : recvData.data.imdgClass,
    				cgNo : recvData.data.cgNo,
    				vslCd : recvData.data.vslCd,
    				callSeq : recvData.data.callSeq,
    				callYear : recvData.data.callYear,
    				catgCd : recvData.get('vslCallId') + "|" +recvData.get('cgNo'),
    				pgmId : 'PN119',
    				seq : recvData.data.dgSeq,
    				searchType: 'detailList'
        	};
        	
     	}else if(screenMode === me.CALL_LOCATION_SHIPPING_NOTE_NONJPVC){
     		
        	var params = {
					vslCallId: recvData.data.vslCallId,
					unno : recvData.data.unno,
    				imdg : recvData.data.imdg,
    				cgNo : recvData.data.cgNo,
    				vslCd : recvData.data.vslCd,
    				callSeq : recvData.data.callSeq,
    				callYear : recvData.data.callYear,
    				catgCd : recvData.get('vslCallId') + "|" +recvData.get('cgNo'),
    				pgmId : 'PN119',
    				seq : recvData.data.dgSeq,
    				searchType: 'detailList'
        	};
        	
     	}else if(screenMode === me.CALL_LOCATION_VESSEL_INTERNAL){
     		
        	var params = {
					vslCallId: recvData.data.vslCallId,
					unno : recvData.data.unno,
    				imdg : recvData.data.imdg,
    				cgNo : recvData.data.cgNo,
    				vslCd : recvData.data.vslCd,
    				callSeq : recvData.data.callSeq,
    				callYear : recvData.data.callYear,
    				catgCd : recvData.get('seq'),
    				pgmId : 'PN119',
    				seq : recvData.data.seq,
    				searchType: 'detailList'
        	};
     	}else if(screenMode === me.CALL_LOCATION_VESSEL_EXTERNAL){
     		
        	var params = {
					vslCallId: recvData.data.vslCallId,
					unno : recvData.data.unno,
    				imdg : recvData.data.imdg,
    				cgNo : recvData.data.cgNo,
    				vslCd : recvData.data.vslCd,
    				callSeq : recvData.data.callSeq,
    				callYear : recvData.data.callYear,
    				catgCd : recvData.get('seq'),
    				pgmId : 'PN119',
    				seq : recvData.data.seq,
    				searchType: 'detailList'
        	};
     	}

     	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var substanceCombo = me.getViewModel().getStore('substanceCombo');
		if(targetControl == 'ctlImdg'){ 
			if(returnValue){
				refs.ctlUnno.setValue(returnValue.item.get("code"));
				refs.ctlImdg.setValue(returnValue.item.get("codeName"));
				
				refs.ctlProperShippingNm.clearValue();
				substanceCombo.load({
					params: {
						unno : returnValue.code,
						imdg : returnValue.codeName
					}
				});
			}
		}else if(targetControl == 'ctlPkg'){ 
			if(returnValue){
				refs.ctlPkg.setValue(returnValue.code);
				refs.ctlPkgNm.setValue(returnValue.codeName);
			}
		}
	},
	
	onAddForFileUpload: function(btn, fileField) {
		var me = this;
		var recvData = me.getView().recvData;
		var store = me.getStore('dgUpload');
    	var input = document.querySelector("input[id='dgFileUpload-button-fileInputEl']");
    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		file = input.files[i];
    		
    		record.set('pgmId', 'PN119');
    		if(screenMode === me.CALL_LOCATION_VESSEL_INTERNAL || screenMode === me.CALL_LOCATION_VESSEL_EXTERNAL){
    			record.set('catgCd', recvData.get('refNo'));
         	}else{
				if (recvData.get('cgNo')) {
					record.set('catgCd', recvData.get('vslCallId') + "|" + recvData.get('cgNo'));
				} else {
					record.set('catgCd', recvData.get('vslCallId'));
				}
         	}

    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onDgFileUploadGridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refDGUploadGrid');
		var store = me.getStore('dgUpload');		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		document.querySelector("input[id='dgFileUpload-button-fileInputEl']").value = '';
		var input = document.querySelector("input[id='dgFileUpload-button-fileInputEl']");
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var recvData = me.getView().recvData;
		var grid = me.lookupReference('refDGUploadGrid');
		var store = me.getStore('dgDownload');
		var pgmId;
		var catgCd;

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(screenMode === me.CALL_LOCATION_VESSEL_INTERNAL  || screenMode === me.CALL_LOCATION_VESSEL_EXTERNAL){
//			catgCd =  recvData.get('refNo');
			catgCd =  selection.data.catgCd; // Update by Harry
     	}else{
     		catgCd =  recvData.get('vslCallId') + "|" +recvData.get('cgNo');
     	}
		
		store.load({
			params : {
				'pgmId' : 'PN119',
				'catgCd' : catgCd,
				'ufileNm' : selection.get('ufileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
	onSelectSubstance: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		refs.ctlJpaGroup.setValue(combo.selection.get('imdgDiv'));
	},

	destroy: function () {
		var me = this;

		if (me.screenMode == me.CALL_LOCATION_SHIPPING_NOTE) {
			me.parent.detailViewAlias = 'app-shippingnotedetail';
		} else if (me.screenMode == me.CALL_LOCATION_BL) {
			me.parent.detailViewAlias = 'app-bldetail';
		}
	}
	
});