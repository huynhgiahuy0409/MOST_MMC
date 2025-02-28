Ext.define('MOST.view.operation.CargoMonitoringExportSulphurController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cargomonitoringexportsulphur',
	
	/**
	 * =========================================================================================================================
	 * Author: LamLong - Justin
	 * Version: 0.1 (2025-02-11)
	 * =========================================================================================================================
	 */
	/**
	 * 
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    
	CONVEYOR_GRID_REF_NAME: 'refConveyourSulphurGrid',
    CONVEYOR_STORE_NAME: 'conveyorSulphurList',
     
    SNL_GRID_REF_NAME: 'refSnlSulphurGrid',
    SNL_STORE_NAME: 'snlSulphurList',
	
	OPERATION_STORE_NAME: 'updatingExportSulphurList',
	
	useStcs: true,
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
		let me = this,
			refs = me.getReferences();
		
		// me.setDateInDays('ctlFrom');
		// me.setDateInDays('ctlTo');
		// me.onSearchInfo();
    },
	
	onSearch: function() {
		let me = this,
			conveyorStore = me.getStore(me.CONVEYOR_STORE_NAME),
			snlStore = me.getStore(me.SNL_STORE_NAME),
			params = me.getSearchCondition();
		
		if (params == null) {
			return null;
		}
		
		conveyorStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						let conveyorWgt = 0,
							conveyorWgtY = 0,
							lastestDtConveyorWgtY = null;
							
						records.forEach(record => {
							let stcsWgt = record.get('stcsWgt'),
								stcsEndTime = record.get('stcsEndTime');
							
							if (record.get('stcsFinalYn') === 'Y' && (!lastestDtConveyorWgtY || stcsEndTime > lastestDtConveyorWgtY)) {
								conveyorWgtY = stcsWgt;
								lastestDtConveyorWgtY = stcsEndTime;
							} else {
								conveyorWgt += stcsWgt;
							}
						});
						
						conveyorWgt = conveyorWgtY > 0 ? conveyorWgtY : conveyorWgt;
						refs.ctlTotalConveyorWeight.setValue(conveyorWgt);
					}
				}
			}
		})
		
		snlStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						let totalWeight = 0;
						
						records.forEach(record => {
							let stcsWgt = record.get('stcsWgt');
							if (stcsWgt) {
								totalWeight += stcsWgt;
							}
						});
						
						refs.ctlTotalSnlWeight.setValue(totalWeight);
					}
				}
			}
		})
		
		if (conveyorStore.getCount() === 0 && snlStore.getCount() === 0) {
			MessageUtil.noMatchData();
			return;
		}
	},
	
	onConfirmSulphur: function() {
		let me = this,
			refs = me.getReferences(),
			totalSnlWeight = refs.ctlTotalSnlWeight.getValue(),
			totalConveyorWeight = refs.ctlTotalConveyorWeight.getValue(),
			totalSulphurWeight = refs.ctlTotalSulphurWeight.getValue(),
			shipgNoteNo = refs.ctlNonJPVCSN.getValue();
		
		if (shipgNoteNo == null || shipgNoteNo == '') {
			MessageUtil.error('warning_msg', 'Please select the S/N to complete!');
			return;
		}
		
		if (me.onValidateSulphur()) {
			if(me.useStcs && totalSnlWeight != totalConveyorWeight && (totalSulphurWeight < (totalSnlWeight - totalSnlWeight * 0.1) || confirmWgt > (totalSnlWeight + totalSnlWeight * 0.1))) {
				MessageUtil.question('Confirm', 'Total amount you entered is more/less than 10% of amount recorded by STCS. Please further verify before confirm. This data will be sent to SAP system.', null, function(button) {
					if (button === 'ok') {
						me.onConfirmOperation();
					}
				});
			} else {
				me.onConfirmOperation();
			}
		}
	},
	
	onConfirmOperation: function() {
		let me = this,
			refs = me.getReferences(),
	        store = me.getStore(me.OPERATION_STORE_NAME),
	        sulphurItem = Ext.create('MOST.model.operation.CargoMonitoringExportSulphur'),
			updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
		sulphurItem.set('vslCallId', refs.ctlSuphurJpvcfield.getValue());
		sulphurItem.set('sulphurWeight', refs.ctlTotalSulphurWeight.getValue());
		sulphurItem.set('remark', refs.ctlRemark.getValue());
		sulphurItem.set('sapStatus', 'Submitted');
		sulphurItem.set('userId', MOST.config.Token.getUserId());
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', sulphurItem.data);
		updateParm.save({
			success: function() {
				MessageUtil.saveSuccess();
			}
		});
	},
	
	onValidateSulphur: function() {
		let me = this,
			refs = me.getReferences(),
			conveyorStore = me.getStore(me.CONVEYOR_STORE_NAME),
			snlStore = me.getStore(me.SNL_STORE_NAME),
			totalSnlWeight = refs.ctlTotalSnlWeight.getValue(),
			totalConveyorWeight = refs.ctlTotalConveyorWeight.getValue(),
			totalSulphurWeight = refs.ctlTotalSulphurWeight.getValue(),
			conveyorCount = conveyorStore.getCount(),
			snlCount = snlStore.getCount();
	
		if ((conveyorCount <= 0 && me.useStcs) || snlCount <= 0) {
			MessageUtil.error('warning_msg', 'There is no data for completing. You have to inquiry data of specific vessel first.');
			return false;
		}
	
		if (snlCount > 0) {
			let vslCallId = snlStore.getAt(0).get('vslCallId'),
				vslCallArray = snlStore.collect('vslCallId').slice(1);
	
			if (vslCallArray.includes(vslCallId)) {
				MessageUtil.error('warning_msg', 'There are date of over 1 JPVC into Shipping Note list. In case of completing operation, you should inquiry data of specific vessel.');
				return false;
			}
		}

		if ((totalSulphurWeight !== null && totalSulphurWeight !== '') && totalSnlWeight !== totalConveyorWeight) {
			MessageUtil.error('warning_msg', 'The Total Weight of STCS is different from the Total Weight of Shipping Note. Please fill the Cofirmation Weight and try again!');
			return false;
		}
	
		return true;
	},
	
	getSearchCondition: function() {
		let me = this,
			refs = me.getReferences(),
			vslCallId = refs.ctlSuphurJpvcfield.getValue();
			
		if (vslCallId == null || vslCallId == '') {
			MessageUtil.error('warning_msg', 'Please specify the vessel field.');
			return;
		}
		
		let params = {
			vslCallId: vslCallId,
		};
		
		return params;
	}
});