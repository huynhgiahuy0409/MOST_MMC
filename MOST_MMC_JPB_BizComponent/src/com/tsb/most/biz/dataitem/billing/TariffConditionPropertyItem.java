package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

public class TariffConditionPropertyItem extends DataItem{
    private String trfCd;
    private String subTrfCd;
    private String prcTpCd;
    private String prptCd;
    private String prptNm;
    private String dataTpCd;
    private String dataLen;
    private String colNm;
    private String priSeq;
    private String unitTpCd;
    
    private String sytmId;
    
    public String getSytmId() {
        return sytmId;
    }
    public void setSytmId(String sytmId) {
        this.sytmId = sytmId;
    }
    public String getDataTpCd() {
        return dataTpCd;
    }
    public void setDataTpCd(String dataTpCd) {
        this.dataTpCd = dataTpCd;
    }
    public String getDataLen() {
        return dataLen;
    }
    public void setDataLen(String dataVal) {
        this.dataLen = dataVal;
    }
    public String getColNm() {
        return colNm;
    }
    public void setColNm(String fmVal) {
        this.colNm = fmVal;
    }
   
    public String getPrcTpCd() {
        return prcTpCd;
    }
    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
    }
    public String getPrptNm() {
        return prptNm;
    }
    public void setPrptNm(String prptNm) {
        this.prptNm = prptNm;
    }
    public String getPrptCd() {
        return prptCd;
    }
    public void setPrptCd(String prptTpCd) {
        this.prptCd = prptTpCd;
    }
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getPriSeq() {
        return priSeq;
    }
    public void setPriSeq(String toVal) {
        this.priSeq = toVal;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getUnitTpCd() {
        return unitTpCd;
    }
    public void setUnitTpCd(String unitTpCd) {
        this.unitTpCd = unitTpCd;
    }
}
