Ext.define('MOST.view.operation.CargoMonitoringPickupSulphurController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cargomonitoringpickupsulphur',
	
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
	CONVEYOR_GRID_REF_NAME : 'refConveyourSulphurGrid',
    CONVEYOR_STORE_NAME : 'conveyorSulphurList',
    
    SILO_GRID_REF_NAME: 'refSiloSulphurGrid',
    SILO_STORE_NAME: 'siloSulphurList',	
	
	OPERATION_STORE_NAME: 'updatingPickupSulphurList',
	
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
		
		me.setDateInDays('ctlFrom');
		me.setDateInDays('ctlTo');
		me.onSearchInfo();
    },
	
	onSearch: function() {
		let me = this,
			conveyorStore = me.getStore(me.CONVEYOR_STORE_NAME),
			siloStore = me.getStore(me.SILO_STORE_NAME),
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
		
		siloStore.load({
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
						refs.ctlTotalSiloWeight.setValue(totalWeight);
					}
				}
			}
		})
		
		if (conveyorStore.getCount() === 0 && siloStore.getCount() === 0) {
			MessageUtil.noMatchData();
			return;
		}
	},
	
	onSearchInfo: function() {
		let me = this,
			refs = me.getReferences(),
			store = me.getStore('nonJPVCSNList');
		
		Ext.MessageBox.show({
			title : 'Non JPVCSN',
			msg: 'Progressing...',
			width: 320,
			height: 0,
			wait: true,
			waitConfig: {interval:200, text:''}
		});
		
		store.load({
			params: {
				from: Ext.Date.format(refs.ctlFrom.getValue(), 'd/m/Y H:i:s'),
				to: Ext.Date.format(refs.ctlTo.getValue(), 'd/m/Y H:i:s')
			},
			callback: function(records, operation, success) {
				Ext.MessageBox.hide();
			}
		})
	},
	
	onConfirmSulphur: function() {
		let me = this,
			refs = me.getReferences(),
			totalSiloWeight = refs.ctlTotalSiloWeight.getValue(),
			totalConveyorWeight = refs.ctlTotalConveyorWeight.getValue(),
			totalSulphurWeight = refs.ctlTotalSulphurWeight.getValue(),
			shipgNoteNo = refs.ctlNonJPVCSN.getValue();
		
		if (shipgNoteNo == null || shipgNoteNo == '') {
			MessageUtil.error('warning_msg', 'Please select the S/N to complete!');
			return;
		}
		
		if (me.onValidateSulphur()) {
			if(me.useStcs && totalSiloWeight != totalConveyorWeight &&(totalSulphurWeight < (totalSiloWeight - totalSiloWeight * 0.1)  || confirmWgt > (totalSiloWeight + totalSiloWeight * 0.1))){
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
	        sulphurItem = Ext.create('MOST.model.operation.CargoMonitoringPickupSulphur'),
			updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
		sulphurItem.set('shipgNoteNo', refs.ctlNonJPVCSN.getValue());
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
			siloStore = me.getStore(me.SILO_STORE_NAME),
			totalSiloWeight = refs.ctlTotalSiloWeight.getValue(),
			totalConveyorWeight = refs.ctlTotalConveyorWeight.getValue(),
			totalSulphurWeight = refs.ctlTotalSulphurWeight.getValue(),
			conveyorCount = conveyorStore.getCount(),
			siloCount = siloStore.getCount();
	
		if ((conveyorCount <= 0 && me.useStcs) || siloCount <= 0) {
			MessageUtil.error('warning_msg', 'There is no data for completing. You have to inquiry data of a specific Shipping Note first.');
			return false;
		}
	
		if (siloCount > 0) {
			let shipgNoteNo = siloStore.getAt(0).get('shipgNoteNo'),
				shipgNoteNoArray = siloStore.collect('shipgNoteNo').slice(1);
	
			if (shipgNoteNoArray.includes(shipgNoteNo)) {
				MessageUtil.error('warning_msg', 'There is more than 1 Shipping Note in the SILO list. In case of completing operation, you should inquiry data of a specific Shipping Note.');
				return false;
			}
		}

		if ((totalSulphurWeight !== null && totalSulphurWeight !== '') && totalSiloWeight !== totalConveyorWeight) {
			MessageUtil.error('warning_msg', 'The Total Weight of STCS is different from the Total Weight of SILO. Please fill the Confirmation Weight and try again!');
			return false;
		}
	
		return true;
	},
	
	getSearchCondition: function() {
		let me = this,
			refs = me.getReferences(),
			from = refs.ctlFrom.getValue(),
			to = refs.ctlTo.getValue(),
			shipgNoteNo = null;
		
		if (to < from) {
			MessageUtil.error('warning_msg', 'The "From" date must be earlier than the "To" date.');
			return;
		}
		
		if(refs.ctlNonJPVCSN.getValue() != null && refs.ctlNonJPVCSN.getValue() != '') {			
			shipgNoteNo = refs.ctlNonJPVCSN.getValue();
		}
		
		let params = {
			from: Ext.Date.format(from, 'd/m/Y H:i:s'),
			to: Ext.Date.format(to, 'd/m/Y H:i:s'),
			shipgNoteNo: shipgNoteNo
		};
		
		return params;
	}
});