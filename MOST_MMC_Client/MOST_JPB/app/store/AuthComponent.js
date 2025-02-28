Ext.define('MOST.store.AuthComponent',{
    extend: 'Ext.data.Store',
    alternateClassName: 'AuthComponentStore',
    singleton: true,
    model: 'MOST.model.administrator.AuthButtonItem',
    proxy : {
        type: 'rest'
    }
});