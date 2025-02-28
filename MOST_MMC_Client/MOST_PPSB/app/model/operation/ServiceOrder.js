Ext.define('MOST.model.operation.ServiceOrder', {
    extend: 'MOST.model.foundation.dataitem.DataItem',
    fields: [
        {
            name: "odrNo",
            type: "string"
        }, {
            name: "category1",
            type: "string"
        }, {
            name: "category1Nm",
            type: "string"
        }, {
            name: "category2",
            type: "string"
        }, {
            name: "category2Nm",
            type: "string"
        }, {
            name: "category3",
            type: "string"
        }, {
            name: "category3Nm",
            type: "string"
        }, {
            name: "svcDtFmt",
            type: "string"
        }, {
            name: "svcDtTp",
            type: "string"
        }, {
            name: "dt1Chk",
            type: "string"
        }, {
            name: "dt1Tit",
            type: "string"
        }, {
            name: "dt1Fmt",
            type: "string"
        }, {
            name: "dt1Tp",
            type: "string"
        }, {
            name: "dt2Chk",
            type: "string"
        }, {
            name: "dt2Tit",
            type: "string"
        }, {
            name: "dt2Fmt",
            type: "string"
        }, {
            name: "dt2Tp",
            type: "string"
        }, {
            name: "shftChk",
            type: "string"
        }, {
            name: "unitTit",
            type: "string"
        }, {
            name: "unitUom",
            type: "string"
        }, {
            name: "unitUomNm",
            type: "string"
        }, {
            name: "combo",
            type: "string"
        }, {
            name: "unitDec",
            type: "string"
        }, {
            name: "unit1Chk",
            type: "string"
        }, {
            name: "unit1Tit",
            type: "string"
        }, {
            name: "unit1Uom",
            type: "string"
        }, {
            name: "unit1UomNm",
            type: "string"
        }, {
            name: "unit1Dec",
            type: "string"
        }, {
            name: "unit2Chk",
            type: "string"
        }, {
            name: "unit2Tit",
            type: "string"
        }, {
            name: "unit2Uom",
            type: "string"
        }, {
            name: "unit2UomNm",
            type: "string"
        }, {
            name: "unit2Dec",
            type: "string"
        }, {
            name: "payTpCd",
            type: "string"
        }, {
            name: "payTpNm",
            type: "string"
        }, {
            name: "prcTpCd",
            type: "string"
        }, {
            name: "prcTpNm",
            type: "string"
        }, {
            name: "prcTpDesc",
            type: "string"
        }, {
            name: "locChk",
            type: "string"
        }, {
            name: "rmkChk",
            type: "string"
        }, {
            name: "cmdtyChk",
            type: "string"
        }, {
            name: "eqDivCd",
            type: "string"
        }, {
            name: "eqDivCdNm",
            type: "string"
        }, {
            name: "odrNo",
            type: "string"
        }, {
            name: "vslCallId",
            type: "string"
        }, {
            name: "callSeq",		//TESTING ONLY
            type: "string"
        }, {
            name: "callYear",		//TESTING ONLY
            type: "string"
        }, {
            name: "vslNm",
            type: "string"
        }, {
            name: "statCd",
            type: "string"
        }, {
            name: "statNm",
            type: "string"
        }, {
            name: "payer",
            type: "string"
        }, {
            name: "payerNm",
            type: "string"
        }, {
            name: "svcDtFm",
            type: "string"
        }, {
            name: "svcDtTo",
            type: "string"
        }, {
            name: "dt1Fm",
            type: "string"
        }, {
            name: "dt1To",
            type: "string"
        }, {
            name: "dt2Fm",
            type: "string"
        }, {
            name: "dt2To",
            type: "string"
        }, {
            name: "shftId",
            type: "string"
        }, {
            name: "shftNm",
            type: "string"
        }, {
            name: "unit",
            type: "number"
        }, {
            name: "unit1",
            type: "number"
        }, {
            name: "unit2",
            type: "number"
        }, {
            name: "capaCd",
            type: "string"
        }, {
            name: "capaDescr",
            type: "string"
        }, {
            name: "loc",
            type: "string"
        }, {
            name: "locId",
            type: "string"
        }, {
            name: "cmdtyCd",
            type: "string"
        }, {
            name: "cmdtyNm",
            type: "string"
        }, {
            name: "comCmdtyCd",
            type: "string"
        }, {
            name: "comCmdtyNm",
            type: "string"
        }, {
            name: "reqRmk",
            type: "string"
        }, {
            name: "rmk",
            type: "string"
        }, {
            name: "comChk",
            type: "string"
        }, {
            name: "comSvcDtFm",
            type: "string"
        }, {
            name: "comSvcDtTo",
            type: "string"
        }, {
            name: "comDt1Fm",
            type: "string"
        }, {
            name: "comDt1To",
            type: "string"
        }, {
            name: "comDt2Fm",
            type: "string"
        }, {
            name: "comDt2To",
            type: "string"
        }, {
            name: "comShftId",
            type: "string"
        }, {
            name: "comShftNm",
            type: "string"
        }, {
            name: "comUnit",
            type: "number"
        }, {
            name: "comUnit1",
            type: "number"
        }, {
            name: "comUnit2",
            type: "number"
        }, {
            name: "comCapaCd",
            type: "string"
        }, {
            name: "comCapaDescr",
            type: "string"
        }, {
            name: "comLoc",
            type: "string"
        }, {
            name: "comRmk",
            type: "string"
        }, {
            name: "sumitBy",
            type: "string"
        }, {
            name: "sumitDt",
            type: "string"
        }, {
            name: "apprvBy",
            type: "string"
        }, {
            name: "apprvDt",
            type: "string"
        }, {
            name: "rejBy",
            type: "string"
        }, {
            name: "rejDt",
            type: "string"
        }, {
            name: "cnclBy",
            type: "string"
        }, {
            name: "cnclDt",
            type: "string"
        }, {
            name: "comBy",
            type: "string"
        }, {
            name: "comDt",
            type: "string"
        }, {
            name: "ownerYn",
            type: "string"
        }, {
            name: "viewType",
            type: "string"
        }, {
            name: "userRole",
            type: "string"
        }, 
        {
            name: "userId",
            type: "string"
        },{
            name: "comLocId",
            type: "string"
        }, {
            name: "processItemList",
            type: "auto"
        }, {
            name: "cd",
            type: "string"
        },{
        	name:"blSNNo",
        	type:"string"
        },{
        	name:"blSNNoSearch",
        	type:"string"
        },{
            name: "cdNm",
            type: "string"
        },{
            name: "reqDocNo",
            type: "string"
        },{
            name: "comDocNo",
            type: "string"
        },{
            name: "reqUnitNo",
            type: "string"
        },{
            name: "comUnitNo",
            type: "string"
        },{
            name: "reqBlNo",
            type: "string"
        },{
            name: "reqShipgNoteNo",
            type: "string"
        },{
            name: "comShipgNoteNo",
            type: "string"
        },{
            name: "comShipgNoteNo",
            type: "string"
        },{
            name: "htmlTpl",
            calculate: function (data) {
                var me = this;

                function generateTitle(value, removeColon){
                    return '<b>' + value + '</b>' + ((removeColon) ? '' : '&nbsp;:&nbsp;');
                }

                function breakLine(){
                    return '<br/>'
                }

                function newField(){
                    return '&nbsp;&nbsp;';
                }

                function giveSpace(){
                    return '&nbsp;';
                }

                function isShow(){
                    var show = true
                    for(var i = 0; i < arguments.length; i++){
                        if(arguments[i] === 'N' || arguments[i] === null || arguments[i] === ''){
                            show = false;
                        }
                    }
                    return show;
                }

                var html = generateTitle('Service Order No') + data.odrNo + breakLine();
                html += generateTitle('Service Date') + data.svcDtFm + ((isShow(data.svcDtTp, data.svcDtTo)) ? ' ~ ' + data.svcDtTo : '') + newField();
                html += ((isShow(data.dt1Chk)) ? generateTitle(data.dt1Tit) + data.dt1Fm + ((isShow(data.dt1Tp, data.dt1To)) ? ' ~ ' + data.dt1To + newField() : newField()) : '');
                html += ((isShow(data.dt2Chk)) ? generateTitle(data.dt2Tit) + data.dt2Fm + ((isShow(data.dt2Tp, data.dt2To)) ? ' ~ ' + data.dt2To + newField() : newField()) : '');
                html += ((isShow(data.shftChk)) ? generateTitle('Shift') + data.shftNm : '') + breakLine();
                html += generateTitle(data.unitTit) + data.unit + giveSpace() + data.unitUomNm + newField();
                html += ((isShow(data.unit1Chk)) ? generateTitle(data.unit1Tit) + data.unit1 + giveSpace() + data.unit1UomNm : '') + newField();
                html += ((isShow(data.unit2Chk)) ? generateTitle(data.unit2Tit) + data.unit2 + giveSpace() + data.unit2UomNm : '') + breakLine();
                html += ((isShow(data.locChk)) ? generateTitle('Location') + data.locId + breakLine() : '');
                html += ((isShow(data.rmkChk)) ? generateTitle('Request Remark') + data.reqRmk + breakLine() : '');
                html += ((isShow(data.cmdtyChk)) ? generateTitle('Commodity') + data.cmdtyNm + breakLine() : '');
                html += '<br/>';

                if(data.comChk === 'Y'){
                    html += generateTitle('Completion Input', true) + breakLine();
                    html += generateTitle('Service Date') + data.comSvcDtFm + ((isShow(data.svcDtTp, data.comSvcDtTo)) ? ' ~ ' + data.comSvcDtTo : '') + newField();
                    html += ((isShow(data.dt1Chk)) ? generateTitle(data.dt1Tit) + data.comDt1Fm + ((isShow(data.dt1Tp, data.comDt1To)) ? ' ~ ' + data.comDt1To + newField() : newField()) : '');
                    html += ((isShow(data.dt2Chk)) ? generateTitle(data.dt2Tit)  + data.comDt2Fm + ((isShow(data.dt2Tp, data.comDt2To)) ? ' ~ ' + data.comDt2To + newField() : newField()) : '');
                    html += ((isShow(data.shftChk)) ? generateTitle('Shift') + data.comShftNm : '') + breakLine();
                    html += generateTitle(data.unitTit) + data.comUnit + giveSpace() + data.unitUomNm + newField();
                    html += ((isShow(data.unit1Chk)) ? generateTitle(data.unit1Tit) + data.comUnit1 + giveSpace() + data.unit1UomNm : '') + newField();
                    html += ((isShow(data.unit2Chk)) ? generateTitle(data.unit2Tit) + data.comUnit2 + giveSpace() + data.unit2UomNm : '') + breakLine();
                    html += ((isShow(data.locChk)) ? generateTitle('Location') + data.comLocId + breakLine() : '');
                    html += ((isShow(data.rmkChk)) ? generateTitle('Request Remark') + data.comRmk + breakLine() : '');
                    html += ((isShow(data.cmdtyChk)) ? generateTitle('Commodity') + data.comCmdtyNm + breakLine() : '');
                }

                return html;
            }
        }
    ]
});

