Ext.define("MOST.model.authority.PtnrInfo", {
    extend: "MOST.model.foundation.dataitem.DataItem",
    requires: [
        //'MOST.model.admin.PartnerSelection'
    ],
    fields: [
        {
            name: "ptnrCode",
            type: "string",
        },
        {
            name: "oldPtnrCode",
            type: "string",
        },
        {
            name: "engSnm",
            type: "string",
        },
        {
            name: "addr",
            type: "string",
        },
        {
            name: "telNo",
            type: "string",
        },
        {
            name: "faxNo",
            type: "string",
        },
        {
            name: "holdChk",
            type: "boolean",
            convert: function (value) {
                return value === "Y" || value === true ? true : false;
            },
        },
        {
            name: "accountHold",
            type: "boolean",
            convert: function (value) {
                return value === "Y" || value === true ? true : false;
            },
        },
        {
            name: "extSHA",
            type: "boolean",
            convert: function (value) {
                return value === "Y" || value === true ? true : false;
            },
        },
        {
            name: "extFWD",
            type: "boolean",
            convert: function (value) {
                return value === "Y" || value === true ? true : false;
            },
        },
        {
            name: "col1",
            type: "string",
        },
        {
            name: "col2",
            type: "string",
        },
        {
            name: "representative",
            type: "string",
        },
        {
            name: "regNo",
            type: "string",
        },
        {
            name: "zipCd",
            type: "string",
        },
        {
            name: "staffCd",
            type: "string",
        },
        {
            name: "accNo",
            type: "string",
        },
        {
            name: "connType",
            type: "string",
        },
        {
            name: "connQty",
            type: "string",
        },
        {
            name: "email",
            type: "string",
        },
        {
            name: "remark",
            type: "string",
        },
        {
            name: "updDt",
            type: "string",
        },
        {
            name: "customEdateSHA",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "customSdateSHA",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "customRefSha",
            type: "string",
        },
        {
            name: "customEdateFWD",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "customSdateFWD",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "customSFWD",
            type: "string",
        },
        {
            name: "customEFWD",
            type: "string",
        },
        {
            name: "customRefFwd",
            type: "string",
        },
        {
            name: "gstRegDt",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "gstApplyDt",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "gstExpiredDt",
            type: "date",
            dateFormat: "d/m/Y",
        },
        {
            name: "initPtnrSHA",
            type: "string",
        },
        {
            name: "initPtnrFWD",
            type: "string",
        },
        //	{
        //		name: 'ptnrTypes',
        //		mapping: 'ptnrTypeList'
        //	}, {
        //		name: 'shippingLines',
        //		mapping: 'shpList'
        //	}
    ],

    associations: [
        //	{
        //		type: 'hasMany',
        //		name: 'ptnrTypeList',
        //		model: 'MOST.model.authority.PtnrType'
        //	},{
        //		type: 'hasMany',
        //		name: 'shpList',
        //		model: 'MOST.model.authority.ShippingLine'
        //	}
    ],
});
