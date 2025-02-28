Ext.define('MOST.view.configuration.TerminalDefinitionController', {
extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME: 'terminalDefinitionItems',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	alias: 'controller.terminaldefinition',
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalDefinitionStore = me.getStore(me.MAIN_STORE_NAME);
		terminalDefinitionStore.load({
			callback: function(record, ope, success){
    			if(success){
    				me.getViewModel().setData({theTerminal:record[0].data});
    			}
    		}
		});
	},
	
	onSave:function(){
		var me = this;
		MessageUtil.question('Terminal Definition', 'tmnlDef_save_message',null,
				function(button){
					if (button === 'ok') {
						me.saveProcess();
			        }else if(button === 'cancel'){
			        	
			        };
				}
		);
	},
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		var terminalDefinitionStore = me.getStore(me.MAIN_STORE_NAME);
		var terminalItem = me.getViewModel().get('theTerminal');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = terminalItem.phantom;
		
		if (terminalItem == null) {
			return;
		}
		
		terminalItem.userId =  MOST.config.Token.getUserId();
		
		updateParm.getProxy().url = terminalDefinitionStore.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', terminalItem);
		updateParm.save({
			success: function(record) {
				MessageUtil.saveSuccess(); // Success Message
				me.onLoad();
				MessageUtil.saveSuccess();
			}
		});
	}

});