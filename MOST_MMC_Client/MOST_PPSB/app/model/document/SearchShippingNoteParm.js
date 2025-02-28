Ext.define('MOST.model.document.SearchShippingNoteParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
    fields: [
        {
            name:'vslCallId',
            type:'string'
        },
        {
            name:'scn',
            type:'string'
        },
        {
            name:'delvTpCd',
            type:'string'
        },
        {
            name:'shipgNoteNo',
            type:'string'
        },{
            name:'mfDocId',
            type:'string'
        },
        {
            name:'newShipgNoteNo',
            type:'string'
        },
        {
            name:'cbrNo',
            type:'string'
        },
        {
            name:'shprNm',
            type:'string'
        },
        {
            name:'cnsneNm',
            type:'string'
        },
        {
            name:'cgWgt',
            type:'float'
        },
        {
            name:'cgMsrmt',
            type:'float'
        },
        {
            name:'tsptTpCd',
            type:'string'
        },
        {
            name:'statCd',
            type:'string'
        },
        {
            name:'portOfDis',
            type:'string'
        },
        {
            name:'pkgQty',
            type:'int'
        },
        {
            name:'pkgTpCd',
            type:'string'
        },
        {
            name:'ackDt',
            type: 'string',
        },
        {
            name:'ackBy',
            type:'string'
        },
        {
            name:'crudFlag',
            type:'string'
        },
        {
            name:'chk',
            type:'string'
        },
        {
            name:'tsptComp',
            type:'string'
        },
        {
            name:'portOfLoad',
            type:'string'
        },
        {
            name:'cntryOfOrg',
            type:'string'
        },
        {
            name:'imdg',
            type:'string'
        },
        {
            name:'unno',
            type:'string'
        },
        {
            name:'estArrvDt',
            type: 'date',
            dateFormat: 'time'
        },
        {
            name:'estArrvDt1',
            type: 'string'
        },
        {
            name:'jpbRefNo',
            type:'string'
        },
        {
            name:'markNo',
            type:'string'
        },
        {
            name:'cmdtCdDtl',
            type:'string'
        },
        {
            name:'cmdtCd',
            type:'string'
        },
        {
            name:'cmdtCdNm',
            type:'string'
        },
        {
            name:'pkgQtyDtl',
            type:'int'
        },
        {
            name:'pkgTpCdDtl',
            type:'string'
        },
        {
            name:'rmk',
            type:'string'
        },
        {
            name:'shpr',
            type:'string'
        },
        {
            name:'shprAddr',
            type:'string'
        },
        {
            name:'shprAddr1',
            type:'string'
        },
        {
            name:'shprAddr2',
            type:'string'
        },
        {
            name:'shprAddr3',
            type:'string'
        },
        {
            name:'shprAddr4',
            type:'string'
        },
        {
            name:'cnsne',
            type:'string'
        },
        {
            name:'cnsneAddr',
            type:'string'
        },
        {
            name:'cnsneAddr1',
            type:'string'
        },
        {
            name:'cnsneAddr2',
            type:'string'
        },
        {
            name:'cnsneAddr3',
            type:'string'
        },
        {
            name:'cnsneAddr4',
            type:'string'
        },
        {
            name:'seq',
            type:'int'
        },
        {
            name:'catgCd',
            type:'string'
        },
        {
            name:'catgCdNm',
            type:'string'
        },
        {
            name:'fwrd',
            type:'string'
        },
        {
            name:'blNo',
            type:'string'
        },
        {
            name:'cgTpCd',
            type:'string'
        },
        {
            name:'cgTpCdNm',
            type:'string'
        },
        {
            name:'fzRefNo',
            type:'string'
        },
        {
            name:'pkg',
            type:'string'
        },
        {
            name:'pkgNm',
            type:'string'
        },
        {
            name:'pkgTpCdNm',
            type:'string'
        },
        {
            name:'fwrdNm',
            type:'string'
        },
        {
            name:'fwrdAddr',
            type:'string'
        },
        {
            name:'tsptCompNm',
            type:'string'
        },
        {
            name:'cgWth',
            type:'float'
        },
        {
            name:'cgHgt',
            type:'float'
        },
        {
            name:'cgLen',
            type:'float'
        },
        {
            name:'userId',
            type:'string'
        },
        {
            name:'no',
            type:'int'
        },
        {
            name:'fnlDest',
            type:'string'
        },
        {
            name:'delvTpCdNm',
            type:'string'
        },
        {
            name:'tsptTpCdNm',
            type:'string'
        },
        {
            name:'dgTol',
            type:'string'
        },
        {
            name:'shprTol',
            type:'string'
        },
        {
            name:'cnsneTol',
            type:'string'
        },
        {
            name:'tsptTpCdDtl',
            type:'string'
        },
        {
            name:'divCd',
            type:'string'
        },
        {
            name:'wgtDtl',
            type:'string'
        },
        {
            name:'msrmtDtl',
            type:'float'
        },
        {
            name:'wgtConveyor',
            type:'float'
        },
        {
            name:'wgtWegon',
            type:'float'
        },
        {
            name:'wgtLorry',
            type:'float'
        },
        {
            name:'seqLorry',
            type:'int'
        },
        {
            name:'seqWegon',
            type:'int'
        },
        {
            name:'seqConveyor',
            type:'int'
        },
        {
            name:'fwrdSumitDt',
            type:'string'
        },
        {
            name:'saCd',
            type:'string'
        },
        {
            name:'saSumitDt',
            type:'string'
        },
        {
            name:'fwrdSumitBy',
            type:'string'
        },
        {
            name:'saSumitBy',
            type:'string'
        },
        {
            name:'sumitBy',
            type:'string'
        },
        {
            name:'sumitDt',
            type:'string'
        },
        {
            name:'authority',
            type:'string'
        },
        {
            name:'grYN',
            type:'string'
        },
        {
            name:'saveType',
            type:'string'
        },
        {
            name:'statCdNm',
            type:'string'
        },
        {
            name:'customsAprvDt',
            type:'string'
        },
        {
            name:'customsAprvStat',
            type:'string'
        },
        {
            name:'releaseNo',
            type:'string'
        },
        {
            name:'cntryOfDest',
            type:'string'
        },
        {
            name:'dgSeq',
            type:'string'
        },
        {
            name:'dgStatCd',
            type:'string'
        },
        {
            name:'dgStatNm',
            type:'string'
        },
        {
            name:'dgAprvDt',
            type:'string'
        },
        {
            name:'linked',
            type:'string'
        },
        {
            name:'ptnrCd',
            type:'string'
        },
        {
            name:'jpGroup',
            type:'string'
        },
        {
            name:'adminSubmitByFa',
            type:'string'
        },
        {
            name:'adminSubmitBySa',
            type:'string'
        },
        {
            name:'workingStatus',
            type:'string'
        },
        {
            name:'searchType',
            type:'string'
        },
        {
            name:'vslNm',
            type:'string'
        },
        {
            name:'shippingNoteMode1',
            type:'string',
            calculate:function(data){
                if(data.tsptTpCd == "LC" || data.tsptTpCd == "LW" || data.tsptTpCd == "LR"){
                    return "Lorry";
                }else if (data.tsptTpCd == "CV") {
                    return "Conveyor";
                }else if (data.tsptTpCd == "WG") {
                    return "Wagon";
                }else if (data.tsptTpCd == "SE") {
                    return "SEA";
                }
            }
        },
        {
            name:'shippingNoteMT1',
            type:'string',
            calculate:function(data){
                if(data.tsptTpCd == "LC" || data.tsptTpCd == "LW"){
                    return data.wgtLorry.toString();
                }else if (data.tsptTpCd == "CV") {
                    return data.wgtConveyor.toString();
                }else if (data.tsptTpCd == "SE") {
                    return data.cgWgt.toString();
                }else if (data.tsptTpCd == "LR" || data.tsptTpCd == "WG") {
                    if(data.wgtLorry.toString !="" && data.wgtLorry.toString !="0.0"){
                        return data.wgtLorry.toString();
                    }else{
                        return data.cgWgt.toString();
                    }
                }
            }
        },
        {
            name:'shippingNoteMode2',
            type:'string',
            calculate:function(data){
                if(data.tsptTpCd == "LC"){
                    return "Conveyor";
                }else if (data.tsptTpCd == "LW") {
                    return "Wagon";
                }
            }
        },
        {
            name:'shippingNoteMT2',
            type:'string',
            calculate:function(data){
                if(data.tsptTpCd == "LC"){
                    return data.wgtConveyor.toString();
                }else if (data.tsptTpCd == "LW") {
                    return data.wgtWegon.toString();
                }
            }
        },
        {
            name: 'newVersion',
            type: 'string'
        },
        {
            name:'shippingNoteList',
            mapping:'OwnArrayMap'
        },
        {
            name:'goodsDetailItems',
            mapping:'OwnArrayMap'
        },
        {
            name:'blNoList',
            mapping:'OwnArrayMap'
        },
        {
            name:'dgSeqList',
            mapping:'OwnArrayMap'
        },	{
            name:'deliveryMode',
            mapping:'comboCommon'
        },	{
            name:'ownStatus',
            mapping:'comboCommon'
        },	{
            name:'cargoType',
            mapping:'comboCommon'
        }, {
            name:'uploadItems',
            mapping: 'dgUploadMap'
        }, {
            name:'dgItems',
            mapping: 'dgItemsMap'
        }, {
            name:'tyCd',
            mapping: 'string'
        }, {
            name:'lotNo',
            mapping: 'string'
        }, {
            name:'grNo',
            mapping: 'string'
        }
        
        ],
        associations: [{
            type: 'hasMany',
            name: 'dgUploadMap',
            model: 'MOST.model.common.FileUpload'
        }],
        associations: [{
            type: 'hasMany',
            name: 'dgItemsMap',
            model: 'MOST.model.document.DGDeclaration'
        }],
        associations: [{
            type: 'hasMany',
            name: 'OwnArrayMap',
            model: 'MOST.model.document.ShippingNote'
        }],
        associations: [{
            type: 'hasMany',
            name: 'comboCommon',
            model: 'MOST.model.common.codes.DetailCode'
        }]
    });
    