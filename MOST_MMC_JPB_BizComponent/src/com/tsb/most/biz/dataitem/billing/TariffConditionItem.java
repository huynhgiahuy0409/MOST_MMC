package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

public class TariffConditionItem extends DataItem{
    private String trfRegNo;
    private String seq;
    private String trfCd;
    private String subTrfCd;
    private String prptCd;
    private String oprIdtCd;
    private String chrVal;
    private String noVal;
    private String dtVal;
    private String tierVal1;
    private String tierVal2;
    private String bndVal1;
    private String bndVal2;
    
    private String prptNm;
    private String dataTpCd;
    private String dataLen;
    
    private String sytmId;
    private String prcTpCd;
    
    public TariffConditionItem(){
        super();
    }
    public TariffConditionItem(TariffConditionItem item) {
        super();
        this.trfRegNo = item.getTrfRegNo();
        this.seq = item.getSeq();
        this.trfCd = item.getTrfCd();
        this.subTrfCd = item.getSubTrfCd();
        this.prptCd = item.getPrptCd();
        this.oprIdtCd = item.getOprIdtCd();
        this.chrVal = item.getChrVal();
        this.noVal = item.getNoVal();
        this.dtVal = item.getDtVal();
        this.tierVal1 = item.getTierVal1();
        this.tierVal2 = item.getTierVal2();
        this.bndVal1 = item.getBndVal1();
        this.bndVal2 = item.getBndVal2();
        this.prptNm = item.getPrptNm();
        this.dataTpCd = item.getDataTpCd();
        this.dataLen = item.getDataLen();
        this.sytmId = item.getSytmId();
        this.userId = item.getUserId();
        this.crud = item.getCrud();
        this.functionId = item.getFunctionId();
        this.key = item.getKey();
        this.newVersion = item.getNewVersion();
        this.updateTime = item.getUpdateTime();
        this.version = item.getVersion();
    }
    
    public String getDataLen() {
        return dataLen;
    }
    public void setDataLen(String dataLen) {
        this.dataLen = dataLen;
    }
    public String getDataTpCd() {
        return dataTpCd;
    }
    public void setDataTpCd(String dataTpCd) {
        this.dataTpCd = dataTpCd;
    }
    public String getPrptNm() {
        return prptNm;
    }
    public void setPrptNm(String prptNm) {
        this.prptNm = prptNm;
    }
    public String getBndVal1() {
        return bndVal1;
    }
    public void setBndVal1(String bndVal1) {
        this.bndVal1 = bndVal1;
    }
    public String getBndVal2() {
        return bndVal2;
    }
    public void setBndVal2(String bndVal2) {
        this.bndVal2 = bndVal2;
    }
    public String getChrVal() {
        return chrVal;
    }
    public void setChrVal(String chrVal) {
        this.chrVal = chrVal;
    }
    public String getDtVal() {
        return dtVal;
    }
    public void setDtVal(String dtVal) {
        this.dtVal = dtVal;
    }
    public String getNoVal() {
        return noVal;
    }
    public void setNoVal(String noVal) {
        this.noVal = noVal;
    }
    public String getOprIdtCd() {
        return oprIdtCd;
    }
    public void setOprIdtCd(String oprIdtCd) {
        this.oprIdtCd = oprIdtCd;
    }
    public String getPrptCd() {
        return prptCd;
    }
    public void setPrptCd(String prptCd) {
        this.prptCd = prptCd;
    }
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getSytmId() {
        return sytmId;
    }
    public void setSytmId(String sytmId) {
        this.sytmId = sytmId;
    }
    public String getTierVal1() {
        return tierVal1;
    }
    public void setTierVal1(String tierVal1) {
        this.tierVal1 = tierVal1;
    }
    public String getTierVal2() {
        return tierVal2;
    }
    public void setTierVal2(String tierVal2) {
        this.tierVal2 = tierVal2;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getTrfRegNo() {
        return trfRegNo;
    }
    public void setTrfRegNo(String trfRegNo) {
        this.trfRegNo = trfRegNo;
    }
	public String getPrcTpCd() {
		return prcTpCd;
	}
	public void setPrcTpCd(String prcTpCd) {
		this.prcTpCd = prcTpCd;
	}
}
