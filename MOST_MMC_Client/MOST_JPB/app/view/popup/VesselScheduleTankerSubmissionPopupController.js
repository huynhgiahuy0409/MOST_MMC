Ext.define('MOST.view.popup.VesselScheduleTankerSubmissionPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselscheduletankersubmissionpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

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
        var recvData = me.getView().recvData;  

        me.getViewModel().setData({theTanker : me.createNewTheTanker()});
        me.onSearch();
    },

    onSearch: function(){
        var me = this;
        var refs = me.getReferences(); 
        var theTanker = me.getViewModel().get('theTanker');
        var store = me.getStore('tankerSubmission')
        store.load({
            params: {
                vslCallId: theTanker.get('vslCallId')
            },
            success: function(records, operation, success){

            }
        });
    },

	onAddTankerSubmission: function(){
        var me = this;
        var refs = me.getReferences();
        var form = this.getView().up('window').down('form')
        var store = refs.refTankerSubmissionGrid.getStore()
        var theTanker = me.getViewModel().get('theTanker');
        var tmnlOpr = refs.ctlTmnlOpr.getValue();
        var foundRecord = store.findRecord('tmnlOpr', tmnlOpr); 

        if(!form.isValid()){
            MessageUtil.warning('warning_msg', 'Please fill in the required fields.');
            return
        }else if(foundRecord){
            MessageUtil.warning('warning_msg', 'Terminal already exists.');
            return;
        }else if(!me.onValidateTankerSubmission()){
            return
        }
        var {tmnlOpr, stDt, endDt, hoseOnDt, hoseOffDt, cgWgt} = theTanker.data
        var insertItem = me.createNewTheTanker();
        insertItem.set({
            tmnlOpr,
            stDt,
            endDt,
            hoseOnDt,
            hoseOffDt,
            cgWgt,
            seq: '',
            userId: Token.getUserId(),
            workingStatus: WorkingStatus.INSERT
        });
        store.add(insertItem)
    },

    createNewTheTanker: function(){
        var me = this;
        var recvData = me.getView().recvData;  

        var theTanker = Ext.create('MOST.model.planning.VesselSchedule');
        Ext.Object.merge(theTanker.data, recvData);

        return theTanker;
    },

    onDblClick: function(){
        var me = this;
        var refs = me.getReferences();
        var store = refs.refTankerSubmissionGrid.getStore();
        var selectedRecord = refs.refTankerSubmissionGrid.getSelectionModel().getSelection()[0];
        var theTanker = me.getViewModel().get('theTanker');
        theTanker.set(selectedRecord.getData());
    },
    onSaveTankerSubmission: function(){
        var me = this;
        var refs = me.getReferences();
        var store = refs.refTankerSubmissionGrid.getStore();
        var arrItems = new Array();
		
        store.getRemovedRecords().forEach(function(record, index, array){
            arrItems.push(record.data);
        });

		// CREATE, UPDATE RECORD
		store.getModifiedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
        if(arrItems.length > 0){
			MessageUtil.question('confirm', 'Do you want to submit Tanker?',null, 
					function(button){
						if (button === 'ok') {
                            var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
                            updateParm.getProxy().url = store.getProxy().url;
                            updateParm.phantom = true;		
                            updateParm.set('items', arrItems);
                            
                            updateParm.save({
                                success:function(){
                                    store.commitChanges();
                                    MessageUtil.saveSuccess(); 
                                    me.onSearch();
                                }
                            })
						}
					}
				);
		}
    },
    onUpdateTankerSubmission: function(){
        var me = this;
        var refs = me.getReferences();
        var store = refs.refTankerSubmissionGrid.getStore();
        var selectedRecord = refs.refTankerSubmissionGrid.getSelectionModel().getSelection()[0];
        var theTanker = me.getViewModel().get('theTanker');
        if(selectedRecord){
            if(selectedRecord.get('workingStatus') !== WorkingStatus.INSERT){
                theTanker.set('workingStatus', WorkingStatus.UPDATE);
            }
            theTanker.set('userId', Token.getUserId());
            if(!me.onValidateTankerSubmission()){
                return
            }
            selectedRecord.set(theTanker.getData());
        }                       
    },
    onRemoveTankerSubmission: function(){
        var me = this;
        var refs = me.getReferences();
        var store = refs.refTankerSubmissionGrid.getStore();
        var selectedRecord = refs.refTankerSubmissionGrid.getSelectionModel().getSelection()[0];
        if(selectedRecord){
            store.remove(selectedRecord);
            selectedRecord.set('userId', Token.getUserId());
            selectedRecord.set('workingStatus', WorkingStatus.DELETE);
        }
    },

    onValidateTankerSubmission: function(){
        var me = this;
        var theTanker = me.getViewModel().get('theTanker');
        var {stDt, endDt, hoseOnDt, hoseOffDt, cgWgt} = theTanker.getData();
        var isValid = false
        if(!stDt || !endDt || !hoseOnDt || !hoseOffDt || !cgWgt){
            MessageUtil.warning('warning_msg', 'Please fill in the required fields.');
        }else if(!(hoseOnDt < stDt && stDt < endDt && endDt < hoseOffDt)){
            MessageUtil.warning('warning_msg', 'Invalid date order! Ensure: Hose On Date < Start Date < End Date < Hose Off Date.');
        }else if(cgWgt <= 0){
            MessageUtil.warning('warning_msg', 'Cargo Weight must be greater than 0.');
        }else{
            isValid = true
        }
        return isValid
    }
});