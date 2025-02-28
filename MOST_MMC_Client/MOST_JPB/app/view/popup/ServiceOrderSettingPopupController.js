Ext.define('MOST.view.popup.ServiceOrderSettingPopupController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.serviceordersettingpopup',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */

    COMBO_ALL_OPTION: {
        scd: '',
        scdNm: 'All'
    },

    /**
     * CONSTANT END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * INITIALIZE START
     */

    onLoad: function(){
        var me = this;
        var store = me.getStore("serviceOrderSettingPopupListStore");
        
        store.load();
        me.loadFilterStores();
    },

    loadFilterStores: function () {
        var me = this;

        me.initializeFilterStores();
        me.loadFilterComboStore('category1PopupFilterComboStore', CodeConstants.MCD_MT_SVCORDCTG1, null,
            function (refs) {
                refs.refCategory1FilterCombo.setValue('');
            });
    },

    initializeFilterStores: function () {
        var me = this;
        
        me.getStore('category1PopupFilterComboStore').add(me.COMBO_ALL_OPTION);
        me.getStore('category2PopupFilterComboStore').add(me.COMBO_ALL_OPTION);
        me.getStore('category3PopupFilterComboStore').add(me.COMBO_ALL_OPTION);
    },

    /**
     * INITIALIZE END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * EVENT HANDLER START
     */

    onCategoryChange: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        var filterRegex = /(filter)/gi;

        me.removeComboData(combo.getReference());

        if (newValue !== null && newValue !== '') {
            me.loadCategoryFilterStore(combo, newValue);
        }
    },

    loadCategoryFilterStore: function (combo, newValue) {
        var me = this;
        var filterStoreNm, mcd, scdLgv;
        
        if (combo.getReference() === 'refCategory1FilterCombo') {
            filterStoreNm = 'category2PopupFilterComboStore';
            mcd = CodeConstants.MCD_MT_SVCORDCTG2;
            scdLgv = newValue;

        } else if (combo.getReference() === 'refCategory2FilterCombo') {
            filterStoreNm = 'category3PopupFilterComboStore';
            mcd = CodeConstants.MCD_MT_SVCORDCTG3;
            scdLgv = newValue;

        } else {
            return;
        }

        me.loadFilterComboStore(filterStoreNm, mcd, scdLgv,
            function (refs) {
                refs.refCategory3FilterCombo.setValue('');
                if (combo.getReference() === 'refCategory1FilterCombo') {
                    refs.refCategory2FilterCombo.setValue('');
                }
            });
    },

    onRetrieve: function(){
        var me = this;
        var refs = me.getReferences();
        var store = me.getStore("serviceOrderSettingPopupListStore");
        var params = {
            category1 : refs.refCategory1FilterCombo.getValue(),
            category2 : refs.refCategory2FilterCombo.getValue(),
            category3 : refs.refCategory3FilterCombo.getValue()
        }

        store.load({ params : params });
    },

    onGridItemDoubleClick : function(grid, record, item, index, e, eOpts){
        var me = this;
        var window = me.getView().up('window');
        
        window.returnValue = record.getData();
        window.close();
    },

    /**
     * EVENT HANDLER END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */

    loadFilterComboStore: function (filterStoreNm, mcd, scdLgv, callback) {
        var me = this;
        var refs = me.getReferences();
        var filterStore = me.getStore(filterStoreNm);

        filterStore.load({
            params: {
                lcd: CodeConstants.LCD_MOST,
                mcd: mcd,
                scdLgv: scdLgv
            },

            callback: function (records, operation, success) {
                if (success) {
                    if (filterStore) {
                        filterStore.insert(0, me.COMBO_ALL_OPTION);
                    }

                    if (callback) {
                        callback(refs);
                    }
                }
            }
        });
    },

    removeComboData: function (reference) {
        var me = this;
        
        me.removeFilterCategoryCombo(reference);
    },

    removeFilterCategoryCombo: function (reference) {
        var me = this;
        var refs = me.getReferences();
        
        refs.refCategory3FilterCombo.getStore().removeAll();
        refs.refCategory3FilterCombo.getStore().add(me.COMBO_ALL_OPTION);
        refs.refCategory3FilterCombo.setValue('');

        if (reference === 'refCategory1FilterCombo') {
            refs.refCategory2FilterCombo.getStore().removeAll();
            refs.refCategory2FilterCombo.getStore().add(me.COMBO_ALL_OPTION);
            refs.refCategory2FilterCombo.setValue('');
        }
    },

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * DETAIL START
     */


    /**
     * DETAIL END
     * =========================================================================================================================
     */

});