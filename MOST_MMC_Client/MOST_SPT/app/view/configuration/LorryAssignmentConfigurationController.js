Ext.define('MOST.view.configuration.LorryAssignmentConfigurationController', {
    extend: 'MOST.view.foundation.BaseViewController',
        
    requires: [
    ],
        
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_STORE_NAME: 'lorryAssignmentConfiguration',
    /**
     * CONSTANT END
     * =========================================================================================================================
     */
        
    alias: 'controller.lorryassignmentconfiguration',
        
    onLoad: function(){
        let me = this;
        let refs = me.getReferences();
        let lorryAssignmentConfigurationStore = me.getStore(me.MAIN_STORE_NAME);
        lorryAssignmentConfigurationStore.load({
            callback: function(record, operation, success) {
                if(success) {
                    refs.ctlRedNumber.setValue(record[0].data.scdVal);
                    refs.ctlYellowNumber.setValue(record[1].data.scdVal);
                }
            }
        });
    },
        
    onSave:function(){
        let me = this;
        MessageUtil.question('Lorry Assignment Configuration', 'lorryAssignmentConf_save_message',null,
                function(button){
                    if (button === 'ok') {
                        me.saveProcess();
                    }else if(button === 'cancel'){
                        
                    };
                }
        );
    },
        
    saveProcess:function(){
        let me = this;
        let refs = me.getReferences();
        let lorryAssignmentConfigurationStore = me.getStore(me.MAIN_STORE_NAME);
        let updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        let arrItems = new Array();
        let ylwValue = refs.ctlYellowNumber.getValue();
        let redValue = refs.ctlRedNumber.getValue();
        let isCreated = false;
        
        if(ylwValue == null || ylwValue == 0) {
            ylwValue = 0;
        }else if(redValue == null || redValue == 0) {
            redValue = 0;
        }
        arrItems.push({scd: 'YLW', scdVal: ylwValue});
        arrItems.push({scd: 'RED', scdVal: redValue});
            
        updateParm.getProxy().url = lorryAssignmentConfigurationStore.getProxy().url;
        updateParm.phantom = isCreated;
        updateParm.set('workingStatus', WorkingStatus.UPDATE);
        updateParm.set('items', arrItems);
        updateParm.save({
            success: function(record) {
                MessageUtil.saveSuccess(); // Success Message
                me.onLoad();
            }
        });
    },
});