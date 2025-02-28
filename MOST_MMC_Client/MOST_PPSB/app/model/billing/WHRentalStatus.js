Ext.define("MOST.model.billing.WHRentalStatus", {
    extend: "MOST.model.foundation.dataitem.DataItem",
    requires: [
        "MOST.model.planning.berth.MailItem"
    ],
    fields: [
        {
            name: "conttNo",
            type: "string",
        },
        {
            name: "refNo",
            type: "string",
        },
        {
            name: "payer",
            type: "string",
        },
        {
            name: "prdTpCd",
            type: "string",
        },
        {
            name: "sdate",
            type: "string",
        },
        {
            name: "edate",
            type: "string",
        },
        {
            name: "sShf",
            type: "string",
        },
        {
            name: "eShf",
            type: "string",
        },
        {
            name: "whCd",
            type: "string",
        },
        {
            name: "locId",
            type: "string",
        },
        {
            name: "rentUnit",
            type: "string",
        },
        {
            name: "unit1Val",
            type: "string",
        },
        {
            name: "aplyRate",
            type: "string",
        },
        {
            name: "aplyAmt",
            type: "string",
        },
        {
            name: "statCd",
            type: "string",
        },
        {
            name: "gstAmount",
            type: "string",
        },
        {
            name: "totalAmount",
            type: "string",
        },
        
    ],
});
