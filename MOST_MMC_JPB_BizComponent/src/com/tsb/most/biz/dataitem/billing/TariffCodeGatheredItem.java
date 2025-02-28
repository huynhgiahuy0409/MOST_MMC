package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

public class TariffCodeGatheredItem extends DataItem{
	private static final long serialVersionUID = 1L;
	
	private String trfCd="";			
	private String trfTpCd="";			     
	private String subTrfCd="";		   
	private String subsTrfCd="";		    
	private String descr="";			
	private String unitPrc="";			      
	private String trfRegNo="";		       
	private String aplyYmd="";		      
	private String exprYmd="";	  
	private String minVal1="";		  
	private String minVal2="";		    
	private String minVal3="";		  
	private String maxAmt="";			
	private String pkgNm="";			
	private String pkgTrfNo="";		
	private String prcTpCd="";	
	private String billTpCd="";		      
	private String ssrTpCd="";		   
	private String costCentCd="";		      
	private String financialCode="";
	private String payer="";			 
	private String ivUnit1="";		    
	private String ivUnit2="";	  
	private String ivUnit3="";		    
	private String vldYn="";			    
	private String aplyRuleCd="";		      
	private String subsUnitVal="";	       
	private String subsRate="";	     
	private String prptCd="";			
	private String oprIdtCd="";		    
	private String chrVal="";			
	private String noVal="";			    
	private String dtVal="";			
	private String tierVal1="";		
	private String tierVal2="";		     
	private String bndVal1="";		  
	private String bndVal2="";		    
	private String sytmId="";			
	private String tarSeq="";			
	private String configTsAR="";		
	private String configTsDP="";		  
	private String configPlAR="";		
	private String configPlDP="";		
	private String configMrAR="";		
	private String configMrDP="";		  
	private String configEsAR="";		
	private String configEsDP="";		
	private String tmnl="";
	private String aplyAmt="";
	
	private String gstTpCd;
	private String gstRate;
	private String gstAmt;
	private String totalAmt;	// aplyAmt + gstAmt
	
	private String unit1Val;	
	private String unit2Val;
	private String unit3Val;
	private String svcDtFrom;
	private String svcDtTo;
	
	private String ptnrCd;
	private String vslCallId;
	
	private String erpCostCent;
	private String modeofOpr;
	private String wgtChk;
	
    private TariffCodeStroageItem freeStorageDays;
    private TariffCodeStroageItem storageDays;
    
    private String stdRate;
    private String opeMode;
    private String opeClass;
    
    //MMC - Settlement
    private String ptnrRate;
    
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getTrfTpCd() {
		return trfTpCd;
	}
	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}
	public String getSubTrfCd() {
		return subTrfCd;
	}
	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}
	public String getSubsTrfCd() {
		return subsTrfCd;
	}
	public void setSubsTrfCd(String subsTrfCd) {
		this.subsTrfCd = subsTrfCd;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getUnitPrc() {
		return unitPrc;
	}
	public void setUnitPrc(String unitPrc) {
		this.unitPrc = unitPrc;
	}
	public String getTrfRegNo() {
		return trfRegNo;
	}
	public void setTrfRegNo(String trfRegNo) {
		this.trfRegNo = trfRegNo;
	}
	public String getAplyYmd() {
		return aplyYmd;
	}
	public void setAplyYmd(String aplyYmd) {
		this.aplyYmd = aplyYmd;
	}
	public String getExprYmd() {
		return exprYmd;
	}
	public void setExprYmd(String exprYmd) {
		this.exprYmd = exprYmd;
	}
	public String getMinVal1() {
		return minVal1;
	}
	public void setMinVal1(String minVal1) {
		this.minVal1 = minVal1;
	}
	public String getMinVal2() {
		return minVal2;
	}
	public void setMinVal2(String minVal2) {
		this.minVal2 = minVal2;
	}
	public String getMinVal3() {
		return minVal3;
	}
	public void setMinVal3(String minVal3) {
		this.minVal3 = minVal3;
	}
	public String getMaxAmt() {
		return maxAmt;
	}
	public void setMaxAmt(String maxAmt) {
		this.maxAmt = maxAmt;
	}
	public String getPkgNm() {
		return pkgNm;
	}
	public void setPkgNm(String pkgNm) {
		this.pkgNm = pkgNm;
	}
	public String getPkgTrfNo() {
		return pkgTrfNo;
	}
	public void setPkgTrfNo(String pkgTrfNo) {
		this.pkgTrfNo = pkgTrfNo;
	}
	public String getPrcTpCd() {
		return prcTpCd;
	}
	public void setPrcTpCd(String prcTpCd) {
		this.prcTpCd = prcTpCd;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getSsrTpCd() {
		return ssrTpCd;
	}
	public void setSsrTpCd(String ssrTpCd) {
		this.ssrTpCd = ssrTpCd;
	}
	public String getCostCentCd() {
		return costCentCd;
	}
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}
	public String getFinancialCode() {
		return financialCode;
	}
	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getIvUnit1() {
		return ivUnit1;
	}
	public void setIvUnit1(String ivUnit1) {
		this.ivUnit1 = ivUnit1;
	}
	public String getIvUnit2() {
		return ivUnit2;
	}
	public void setIvUnit2(String ivUnit2) {
		this.ivUnit2 = ivUnit2;
	}
	public String getIvUnit3() {
		return ivUnit3;
	}
	public void setIvUnit3(String ivUnit3) {
		this.ivUnit3 = ivUnit3;
	}
	public String getVldYn() {
		return vldYn;
	}
	public void setVldYn(String vldYn) {
		this.vldYn = vldYn;
	}
	public String getAplyRuleCd() {
		return aplyRuleCd;
	}
	public void setAplyRuleCd(String aplyRuleCd) {
		this.aplyRuleCd = aplyRuleCd;
	}
	public String getSubsUnitVal() {
		return subsUnitVal;
	}
	public void setSubsUnitVal(String subsUnitVal) {
		this.subsUnitVal = subsUnitVal;
	}
	public String getSubsRate() {
		return subsRate;
	}
	public void setSubsRate(String subsRate) {
		this.subsRate = subsRate;
	}
	public String getPrptCd() {
		return prptCd;
	}
	public void setPrptCd(String prptCd) {
		this.prptCd = prptCd;
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
	public String getSytmId() {
		return sytmId;
	}
	public void setSytmId(String sytmId) {
		this.sytmId = sytmId;
	}
	public String getTarSeq() {
		return tarSeq;
	}
	public void setTarSeq(String tarSeq) {
		this.tarSeq = tarSeq;
	}
	public String getConfigTsAR() {
		return configTsAR;
	}
	public void setConfigTsAR(String configTsAR) {
		this.configTsAR = configTsAR;
	}
	public String getConfigTsDP() {
		return configTsDP;
	}
	public void setConfigTsDP(String configTsDP) {
		this.configTsDP = configTsDP;
	}
	public String getConfigPlAR() {
		return configPlAR;
	}
	public void setConfigPlAR(String configPlAR) {
		this.configPlAR = configPlAR;
	}
	public String getConfigPlDP() {
		return configPlDP;
	}
	public void setConfigPlDP(String configPlDP) {
		this.configPlDP = configPlDP;
	}
	public String getConfigMrAR() {
		return configMrAR;
	}
	public void setConfigMrAR(String configMrAR) {
		this.configMrAR = configMrAR;
	}
	public String getConfigMrDP() {
		return configMrDP;
	}
	public void setConfigMrDP(String configMrDP) {
		this.configMrDP = configMrDP;
	}
	public String getConfigEsAR() {
		return configEsAR;
	}
	public void setConfigEsAR(String configEsAR) {
		this.configEsAR = configEsAR;
	}
	public String getConfigEsDP() {
		return configEsDP;
	}
	public void setConfigEsDP(String configEsDP) {
		this.configEsDP = configEsDP;
	}
	public String getTmnl() {
		return tmnl;
	}
	public void setTmnl(String tmnl) {
		this.tmnl = tmnl;
	}
	public String getAplyAmt() {
		return aplyAmt;
	}
	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}
	public String getGstTpCd() {
		return gstTpCd;
	}
	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}
	public String getGstRate() {
		return gstRate;
	}
	public void setGstRate(String gstRate) {
		this.gstRate = gstRate;
	}
	public String getGstAmt() {
		return gstAmt;
	}
	public void setGstAmt(String gstAmt) {
		this.gstAmt = gstAmt;
	}
	public String getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getUnit1Val() {
		return unit1Val;
	}
	public void setUnit1Val(String unit1Val) {
		this.unit1Val = unit1Val;
	}
	public String getUnit2Val() {
		return unit2Val;
	}
	public void setUnit2Val(String unit2Val) {
		this.unit2Val = unit2Val;
	}
	public String getUnit3Val() {
		return unit3Val;
	}
	public void setUnit3Val(String unit3Val) {
		this.unit3Val = unit3Val;
	}
	public String getSvcDtFrom() {
		return svcDtFrom;
	}
	public void setSvcDtFrom(String svcDtFrom) {
		this.svcDtFrom = svcDtFrom;
	}
	public String getSvcDtTo() {
		return svcDtTo;
	}
	public void setSvcDtTo(String svcDtTo) {
		this.svcDtTo = svcDtTo;
	}
	public String getErpCostCent() {
		return erpCostCent;
	}
	public void setErpCostCent(String erpCostCent) {
		this.erpCostCent = erpCostCent;
	}
	public TariffCodeStroageItem getFreeStorageDays() {
		return freeStorageDays;
	}
	public void setFreeStorageDays(TariffCodeStroageItem freeStorageDays) {
		this.freeStorageDays = freeStorageDays;
	}
	public TariffCodeStroageItem getStorageDays() {
		return storageDays;
	}
	public void setStorageDays(TariffCodeStroageItem storageDays) {
		this.storageDays = storageDays;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getModeofOpr() {
		return modeofOpr;
	}
	public void setModeofOpr(String modeofOpr) {
		this.modeofOpr = modeofOpr;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getStdRate() {
		return stdRate;
	}
	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
	}
	public String getOpeMode() {
		return opeMode;
	}
	public void setOpeMode(String opeMode) {
		this.opeMode = opeMode;
	}
	public String getOpeClass() {
		return opeClass;
	}
	public void setOpeClass(String opeClass) {
		this.opeClass = opeClass;
	}
	public String getPtnrRate() {
		return ptnrRate;
	}
	public void setPtnrRate(String ptnrRate) {
		this.ptnrRate = ptnrRate;
	}
	
}
