package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.audit.AuditItem;

public class SSRListItem extends AuditItem {
    private String dateFrom ;
    private String dateTo ;
    private String ssrNo ;
    private String vslCallId ;
    private String issueDt ;
    private String berthNo ;
    private String whId ;
    private String payerCd ;
    private String payerName ;    
    private String payerTpCd ;
    private String payerTpName ;    
    private String ivPrfx ;
    private String refNo ;
    private String rmk ;
    private String ssrStatCd ;
    private String ivNo ;    
    private String no ;
    private String totalAmount ;
    private String totalAmt ;
    private String trfCd ;	
    private String subTrfCd ;	
    private String ssrTpCd ;
    private String unitQty1 ;
    private String unitQty2 ;
    private String unitQty3 ;
    private String aplyUnitPrc ;
    private String quantity ;
    private String amount ;
    private String vesselCd ;
    private String vesselName ;
    private String voyage ;
    private String sa ;
    private String berthLoc ;
    private String eta ;
    private String etd ;
    private String costCenter ;
    private String financialCode;
    private String accountNo ;
    private String trfDescr;
    private String stdRate ;
    private String seq;
    private String subStatus;
    private String gatherNo;
    private String atb;
    private String atw;
    private String atu;
    private String atc;
    private String grt;
    private String loa;
    private String paymentType;
    private String engSnm;
    private String addr;
    private String disSurAmount;
    private String disSurRate;
    private String wthAmount;
    private String wthValue;
    private String saNm;
    private String shipLineCd;
    private String shipLineNm;
    
    //GST issue
    private String gstAmount;
    private String gstValue;
    private String gstPercent;
    private String gstTpCd;
    private String gstDesc;
    private String gstValidFrom;
    private String gstValidTo;
    private String payableAmount;
    private String cType;
    private String aplyRate;
    private String vslNm;
    private String dueDt;
    private String paymentTerm;
    private String zipCd;
    private String telNo;
    private String gstRefId;
    private String count;
    private String unit1Val;
    private String unit2Val;
    private String unit3Val;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;
    private String ptnrCdNm;
    private String createdBy;
    private String whLocation;
    
    private String ssrTpName ;
    private String accountType;
    private String insertTime;
    private String updateUserId;
  	private String displayName;
  	private String scn;

    public SSRListItem(){}

    public SSRListItem(SSRListItem item){

    }

    private String workingStatus;
    private ArrayList<SSRListItem> arrSSRDetail;
    private ArrayList<SSRListItem> arrHeadSSR;
    
    public ArrayList<SSRListItem> getArrHeadSSR() {
		return arrHeadSSR;
	}
    public String getTrfDescr() {
        return trfDescr;
    }
    public void setTrfDescr(String trfDescr) {
        this.trfDescr = trfDescr;
    }
    public String getcType() {
		return cType;
	}
	public void setcType(String cType) {
		this.cType = cType;
	}
   
    public String getAddr() {
        return addr;
    }
    public void setAddr(String addr) {
        this.addr = addr;
    }
    public String getStdRate() {
        return stdRate;
    }
    public String getGatherNo() {
        return gatherNo;
    }
    public void setGatherNo(String gatherNo) {
        this.gatherNo = gatherNo;
    }
    public String getEngSnm() {
        return engSnm;
    }
    public void setEngSnm(String engSnm) {
        this.engSnm = engSnm;
    }
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getSubStatus() {
        return subStatus;
    }
    public void setSubStatus(String subStatus) {
        this.subStatus = subStatus;
    }
    
	public void setArrSSRDetail(ArrayList<SSRListItem> arrSSRDetail) {
		this.arrSSRDetail = arrSSRDetail;
	}
	public ArrayList<SSRListItem> getArrSSRDetail() {
		return arrSSRDetail;
	}
	public void setArrHeadSSR(ArrayList<SSRListItem> arrHeadSSR) {
		this.arrHeadSSR = arrHeadSSR;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	/**
     * @return Returns the paymentType.
     */
    public String getPaymentType() {
        return paymentType;
    }
    /**
     * @param paymentType The paymentType to set.
     */
    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }
    /**
     * @return Returns the insertTime.
     */
    public String getInsertTime() {
        return insertTime;
    }
    /**
     * @param insertTime The insertTime to set.
     */
    public void setInsertTime(String insertTime) {
        this.insertTime = insertTime;
    }
    /**
     * @return Returns the updateUserId.
     */
    public String getUpdateUserId() {
        return updateUserId;
    }
    /**
     * @param updateUserId The updateUserId to set.
     */
    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public String getBerthNo() {
        return berthNo;
    }
    public void setBerthNo(String berthNo) {
        this.berthNo = berthNo;
    }
    public String getDateFrom() {
        return dateFrom;
    }
    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }
    public String getDateTo() {
        return dateTo;
    }
    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
    public String getIssueDt() {
        return issueDt;
    }
    public void setIssueDt(String issueDt) {
        this.issueDt = issueDt;
    }
    public String getIvNo() {
        return ivNo;
    }
    public void setIvNo(String ivNo) {
        this.ivNo = ivNo;
    }
    public String getIvPrfx() {
        return ivPrfx;
    }
    public void setIvPrfx(String ivPrfx) {
        this.ivPrfx = ivPrfx;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getPayerCd() {
        return payerCd;
    }
    public void setPayerCd(String payerCd) {
        this.payerCd = payerCd;
    }
    public String getPayerName() {
        return payerName;
    }
    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }
    public String getPayerTpCd() {
        return payerTpCd;
    }
    public void setPayerTpCd(String payerTpCd) {
        this.payerTpCd = payerTpCd;
    }
    public String getPayerTpName() {
        return payerTpName;
    }
    public void setPayerTpName(String payerTpName) {
        this.payerTpName = payerTpName;
    }
    public String getRefNo() {
        return refNo;
    }
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getSsrNo() {
        return ssrNo;
    }
    public void setSsrNo(String ssrNo) {
        this.ssrNo = ssrNo;
    }
    public String getSsrStatCd() {
        return ssrStatCd;
    }
    public void setSsrStatCd(String ssrStatCd) {
        this.ssrStatCd = ssrStatCd;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getWhId() {
        return whId;
    }
    public void setWhId(String whId) {
        this.whId = whId;
    }
    public String getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }
    public String getAmount() {
        return amount;
    }
    public void setAmount(String amount) {
        this.amount = amount;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getEtd() {
        return etd;
    }
    public void setEtd(String etd) {
        this.etd = etd;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }
    public String getVesselCd() {
        return vesselCd;
    }
    public void setVesselCd(String vesselCd) {
        this.vesselCd = vesselCd;
    }
    public String getVesselName() {
        return vesselName;
    }
    public void setVesselName(String vesselName) {
        this.vesselName = vesselName;
    }
    public String getVoyage() {
        return voyage;
    }
    public void setVoyage(String voyage) {
        this.voyage = voyage;
    }
    public String getSsrTpCd() {
        return ssrTpCd;
    }
    public void setSsrTpCd(String ssrTpCd) {
        this.ssrTpCd = ssrTpCd;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getSsrTpName() {
        return ssrTpName;
    }
    public void setSsrTpName(String ssrTpName) {
        this.ssrTpName = ssrTpName;
    }
    public String getWhLocation() {
        return whLocation;
    }
    public void setWhLocation(String whLocation) {
        this.whLocation = whLocation;
    }
    public String getAccountNo() {
        return accountNo;
    }
    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }
    public String getAccountType() {
        return accountType;
    }
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
    }
    public String getGrt() {
        return grt;
    }
    public void setGrt(String grt) {
        this.grt = grt;
    }
    public String getLoa() {
        return loa;
    }
    public void setLoa(String loa) {
        this.loa = loa;
    }
    public String getGstAmount() {
        return gstAmount;
    }
    public void setGstAmount(String gstAmount) {
        this.gstAmount = gstAmount;
    }
    public String getPayableAmount() {
        return payableAmount;
    }
    public void setPayableAmount(String payableAmount) {
        this.payableAmount = payableAmount;
    }
    
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    
    public String getUnitQty1() {
        return unitQty1;
    }
    public void setUnitQty1(String unitQty1) {
        this.unitQty1 = unitQty1;
    }
    public String getUnitQty2() {
        return unitQty2;
    }
    public void setUnitQty2(String unitQty2) {
        this.unitQty2 = unitQty2;
    }
    public String getUnitQty3() {
        return unitQty3;
    }
    public void setUnitQty3(String unitQty3) {
        this.unitQty3 = unitQty3;
    }
    public String getAplyUnitPrc() {
        return aplyUnitPrc;
    }
    public void setAplyUnitPrc(String aplyUnitPrc) {
        this.aplyUnitPrc = aplyUnitPrc;
    }
    public String getCostCenter() {
        return costCenter;
    }
    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

	public String getFinancialCode() {
		return financialCode;
	}

	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
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

	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
	}

	public String getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getDisSurAmount() {
		return disSurAmount;
	}

	public void setDisSurAmount(String disSurAmount) {
		this.disSurAmount = disSurAmount;
	}

	public String getDisSurRate() {
		return disSurRate;
	}

	public void setDisSurRate(String disSurRate) {
		this.disSurRate = disSurRate;
	}

	public String getWthAmount() {
		return wthAmount;
	}

	public void setWthAmount(String wthAmount) {
		this.wthAmount = wthAmount;
	}

	public String getWthValue() {
		return wthValue;
	}

	public void setWthValue(String wthValue) {
		this.wthValue = wthValue;
	}

	public String getAplyRate() {
		return aplyRate;
	}

	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getDueDt() {
		return dueDt;
	}

	public void setDueDt(String dueDt) {
		this.dueDt = dueDt;
	}

	public String getPaymentTerm() {
		return paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}

	public String getZipCd() {
		return zipCd;
	}

	public void setZipCd(String zipCd) {
		this.zipCd = zipCd;
	}

	public String getTelNo() {
		return telNo;
	}

	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	public String getGstRefId() {
		return gstRefId;
	}

	public void setGstRefId(String gstRefId) {
		this.gstRefId = gstRefId;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
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

	public String getPtnrCdNm() {
		return ptnrCdNm;
	}

	public void setPtnrCdNm(String ptnrCdNm) {
		this.ptnrCdNm = ptnrCdNm;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getGstValue() {
		return gstValue;
	}

	public void setGstValue(String gstValue) {
		this.gstValue = gstValue;
	}

	public String getGstPercent() {
		return gstPercent;
	}

	public void setGstPercent(String gstPercent) {
		this.gstPercent = gstPercent;
	}

	public String getGstTpCd() {
		return gstTpCd;
	}

	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}

	public String getGstDesc() {
		return gstDesc;
	}

	public void setGstDesc(String gstDesc) {
		this.gstDesc = gstDesc;
	}

	public String getGstValidFrom() {
		return gstValidFrom;
	}

	public void setGstValidFrom(String gstValidFrom) {
		this.gstValidFrom = gstValidFrom;
	}

	public String getGstValidTo() {
		return gstValidTo;
	}

	public void setGstValidTo(String gstValidTo) {
		this.gstValidTo = gstValidTo;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getSaNm() {
		return saNm;
	}

	public void setSaNm(String saNm) {
		this.saNm = saNm;
	}

	public String getShipLineCd() {
		return shipLineCd;
	}

	public void setShipLineCd(String shipLineCd) {
		this.shipLineCd = shipLineCd;
	}

	public String getShipLineNm() {
		return shipLineNm;
	}

	public void setShipLineNm(String shipLineNm) {
		this.shipLineNm = shipLineNm;
	}

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}
}
