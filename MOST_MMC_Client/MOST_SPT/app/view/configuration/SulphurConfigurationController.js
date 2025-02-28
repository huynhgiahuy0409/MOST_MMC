Ext.define('MOST.view.configuration.SulphurConfigurationController', {
    extend: 'MOST.view.foundation.BaseViewController',
        
        requires: [
        ],
        
        /**
         * =========================================================================================================================
         * CONSTANT START
         */
        MAIN_STORE_NAME: 'sulphurConfigurationItems',
        /**
         * CONSTANT END
         * =========================================================================================================================
         */
        
        alias: 'controller.sulphurconfiguration',
        
        onLoad: function(){
            let me = this;
            let sulphurConfigurationStore = me.getStore(me.MAIN_STORE_NAME);
            sulphurConfigurationStore.load();
        },
            
        onSave:function(){
            let me = this;
            MessageUtil.question('Sulphur Configuration', 'sulphurConf_save_message',null,
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
            let sulphurConfigurationStore = me.getStore(me.MAIN_STORE_NAME);
            let sulphurItem = me.getViewModel().get('theSulphur');
            let updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
            let isCreated = false;
            
            if (sulphurItem == null) {
                return;
            }
            
            sulphurItem.userId =  MOST.config.Token.getUserId();
            sulphurItem.useScts ? sulphurItem.useScts = 'Y' : sulphurItem.useScts = 'N';
            sulphurItem.fbCapa = refs.refFbCapacity.getValue();
            
            isCreated = sulphurItem.phantom;
            updateParm.getProxy().url = sulphurConfigurationStore.getProxy().url;
            updateParm.phantom = isCreated;
            updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
            updateParm.set('item', sulphurItem);
            updateParm.save({
                success: function(record) {
                    MessageUtil.saveSuccess(); // Success Message
                    me.onLoad();
                }
            });
        },
        
        onAddCapacityChange: function(){
            let me = this;
            let sulphurItem = me.getViewModel().get('theSulphur');
            let refs = me.getReferences();
            let addCapa = refs.refAddCapacity.getValue();
            
            if(sulphurItem == null){
                return;
            }
            
            refs.refFbCapacity.setValue((sulphurItem.fbCapa || 0) + addCapa);
        },
    
        onWarehouseSelect: function(combo, record, eOpts) {
            let me = this;
            let refs = me.getReferences();
            
            me.getViewModel().setData({theSulphur:record.data});
            refs.refWarehouseCombo.setValue(record.data.locNm);
            refs.refStockpileCapacity.setValue(record.data.fbCapa);
            refs.refFbCapacity.setValue(record.data.fbCapa);
            refs.refAddCapacity.setValue();
        }
    });