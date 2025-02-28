
package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;


public class TariffCodeConditionItem extends DataItem {
    private String trfCd="";
    private String subTrfCd="";
    private String prcTpCd="";
    private String prptCd = "";
    private String dataTpCd="";
    private String prptNm="";
    
    private String agreNo = "";
    private String oprIdtCd = "";
    private String chrVal="";
    private String noVal = "";
    private String dtVal = "";
    private String tierVal1="";
    private String tierVal2="";
    private String bndVal1="";
    private String bndVal2="";
    private String opeMode="";
    
    private boolean isSelected = false;

	public String getTrfCd() {
		return trfCd;
	}

	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}

	public String getSubTrfCd() {
		return subTrfCd;
	}

	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}

	public String getPrcTpCd() {
		return prcTpCd;
	}

	public void setPrcTpCd(String prcTpCd) {
		this.prcTpCd = prcTpCd;
	}

	public String getPrptCd() {
		return prptCd;
	}

	public void setPrptCd(String prptCd) {
		this.prptCd = prptCd;
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

	public String getAgreNo() {
		return agreNo;
	}

	public void setAgreNo(String agreNo) {
		this.agreNo = agreNo;
	}

	public String getOprIdtCd() {
		return oprIdtCd;
	}

	public void setOprIdtCd(String oprIdtCd) {
		this.oprIdtCd = oprIdtCd;
	}

	public String getChrVal() {
		return chrVal;
	}

	public void setChrVal(String chrVal) {
		this.chrVal = chrVal;
	}

	public String getNoVal() {
		return noVal;
	}

	public void setNoVal(String noVal) {
		this.noVal = noVal;
	}

	public String getDtVal() {
		return dtVal;
	}

	public void setDtVal(String dtVal) {
		this.dtVal = dtVal;
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

	public boolean isSelected() {
		return isSelected;
	}

	public void setSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}

	public String getOpeMode() {
		return opeMode;
	}

	public void setOpeMode(String opeMode) {
		this.opeMode = opeMode;
	}
    
    
}
