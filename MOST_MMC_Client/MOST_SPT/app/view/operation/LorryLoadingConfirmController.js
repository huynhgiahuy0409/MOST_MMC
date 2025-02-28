Ext.define('MOST.view.operation.LorryLoadingConfirmController', {
    extend: 'MOST.view.foundation.BaseViewController',
        
    requires: [
    ],
        
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_STORE_NAME: 'lorryLoadingConfirmItems',
    /**
     * CONSTANT END
     * =========================================================================================================================
     */
        
    alias: 'controller.lorryloadingconfirm',
        
    onSave:function(){
        let me = this;
        MessageUtil.question('Lorry Loading Confirm', 'lorryLoadingConfirm_save_message',null,
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
        let lorryLoadingConfirmStore = me.getStore(me.MAIN_STORE_NAME);
        let lorryItem = me.getViewModel().get('theLorry');
        let updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        
        if (lorryItem == null) {
            return;
        }
        
        lorryItem.userId =  MOST.config.Token.getUserId();
        
        updateParm.getProxy().url = lorryLoadingConfirmStore.getProxy().url;
        updateParm.phantom = isCreated;
        updateParm.set('workingStatus', WorkingStatus.INSERT);
        updateParm.set('item', lorryItem);
        updateParm.save({
            success: function(record) {
                MessageUtil.saveSuccess(); // Success Message
                me.onLoad();
            }
        });
    },
});