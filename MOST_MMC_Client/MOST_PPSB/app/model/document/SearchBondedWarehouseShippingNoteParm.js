Ext.define('MOST.model.document.SearchBondedWarehouseShippingNoteParm', {
    extend: 'MOST.model.foundation.parm.BizParm',
    fields: [
        {
            name: 'shippingNoteNo',
            type: 'string'
        },
        {
            name: 'docDateFrom',
            type: 'date',
            dateFormat: 'time'
        },
        {
            name: 'docDateTo',
            type: 'date',
            dateFormat: 'time'
        },
        {
            name: 'containerNo',
            type: 'string'
        },

    ],
});
