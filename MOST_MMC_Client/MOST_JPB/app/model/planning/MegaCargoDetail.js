Ext.define("MOST.model.planning.MegaCargoDetail", {
    extend: "MOST.model.foundation.dataitem.DataItem",
    fields: [
        {
            name: "megaNo",
            type: "string",
        },
        {
            name: "seq",
            type: "int",
        },
        {
            name: "divCd",
            type: "string",
        },
        {
            name: "hatchNo",
            type: "string",
        },
        {
            name: "cgDescCd",
            type: "string",
        },
        {
            name: "cgDescNm",
            type: "string",
        },
        {
            name: "cgDescVal",
            type: "string",
        },
        {
            name: "cgDescAmd",
            type: "int",
        },
        {
            name: "cgDescOriginal",
            type: "int",
        },
    ],
});
