package com.tsb.most.biz.dataitem.billing;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CreditNoteItem extends DataItem {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1582967817534201942L;

	private String blNo;
	private String shipgNoteNo;
	private String bookingNo;
	private String masterBlNo;
	private String trfCd;
	private String trfTpCd;
	private String trfTpNm;
	private String trfDescr;
	private String subTrfCd;
	private String payer;
	private String payerNm;
	private String payerAddr;
	private String payerTpCd;
	private String customerTp;
	private String gatherNo;
	private String gatherDt;
	private String gatherTpCd;
	private int seq;
	private String ivNo;
	private String ivPrfx;
	private String ivTp;
	private String ivTpNm;
	private String ivAddr;
	private String remark;
	private String shipgAgnt;
	private String fwdAgnt;
	private String shpr;
	private String cnsne;
	private String originalIvNo;
	private String grNo;
	private String doNo;

	private String divCd;
	private String billTpCd;
	private String draftIvNo;
	private String refIvNo;

	private String unit1Val;
	private String unit2Val;
	private String unit3Val;
	private String wgt;
	private String msrmt;
	private String pkgQty;
	private String opeClassCd;
	private String statCd;
	private String statNm;
	private String refNo;
	private String erpStatCd;
	private String crnStatCd; // Credit Note status Code
	private String crnStatNm;

	private String gstTpCd;
	private String gstRate;

	private String calFmYmd;
	private String calToYmd;
	private String pkgTrfNm;
	private String aplyRate;
	private String aplyAmt;
	private String aplyTaxPercent;
	private String aplyTaxAmt;
	private String aplyTotalAmt;
	private String gstAmt;
	private String totalAmt;
	private String ivAmt;
	private String stdRate;
	private String trfRegNo;
	private String cgNo;
	private String cgTpCd;
	private String refNo1;
	private String refNo2;
	private String refNo3;
	private String refNo4;
	private String delvTpCd;
	private String cmdtCd;
	private String tsptTpCd;
	private String pkgTpCd;
	private String freeStrgDd;
	private String svcOdrNo;
	private String svcSeq;
	private String sysCloneId;
	private String unno;
	private String vinNo;
	private String lorryNo;
	private String adhocYn;
	private String dcAmt;
	private String frgnAmt;
	private String frgnGstAmt;
	private String frgnTotalAmt;
	private String billDays;
	private String sytmId;
	private String payTpCd;
	private String crcyCd;
	private String currency;
	private String exchgVal;
	private String exRate;
	private String totalIvAmt;
	private String isFileAtt;
	private String invoiceNo;
	private String creditNoteNo;
	private String ivSytmId;
	private String vwDt;
	private String vwUserId;
	private List<CreditNoteItem> ivNos;
	private String prUserId;
	private String prDt;
	private String proformaYn;
	private String oldIvNo;
	private String costCentCd;
	private String scrId;
	private String reasonCd;
	private String reasonNm;

	// values from vesselschedule (from screen)
	private String vslCallId;
	private String vslNm;
	private String berthLoc;
	private String atb;
	private String atu;
	private String arrvSaId;

	// values from ptnr (from screen)
	private String ptnrCd; // payer
	private String engSnm;
	private String ptnrTpCd;
	private String accNo;
	private String addr;

	// Values for external user screen
	private String loa;
	private String grt;
	private String atw;
	private String atc;
	private String atd;

	private String no;
	private String stdAmt;

	// for InvoiceItem
	private String ivDt;
	private String ivDueDt;
	private String tmnlCd;
	private String sytmUseId;
	private String dmyVslCallYn;
	private String bankCd;
	private String bankNm;
	private String erpIvTpCd;
	private String ivUnit1;
	private String ivUnit2;
	private String ivUnit3;
	private String updateUserId;
	private String createdBy;
	private String createdDt;

	// print value
	private String ivRmk;
	private String tmnlNm;
	private String tmnlAddr;
	private String tmnlTel;
	private String tmnlFax;
	private String tmnlRegNo;
	private String telNo;
	private String crnIvDt;
	private String crnIvDueDt;
	private String crnUnit1Val;
	private String crnUnit2Val;
	private String crnUnit3Val;
	private String crnApplyRate;
	private String crnApplyAmt;
	private String crnGstAmt;
	private String crnTotalAmt;
	private String ivApplyAmt;
	private String ivGstAmt;
	private String payerTaxNo;

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getShipgNoteNo() {
		return shipgNoteNo;
	}

	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}

	public String getBookingNo() {
		return bookingNo;
	}

	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}

	public String getMasterBlNo() {
		return masterBlNo;
	}

	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}

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

	public String getTrfTpNm() {
		return trfTpNm;
	}

	public void setTrfTpNm(String trfTpNm) {
		this.trfTpNm = trfTpNm;
	}

	public String getTrfDescr() {
		return trfDescr;
	}

	public void setTrfDescr(String trfDescr) {
		this.trfDescr = trfDescr;
	}

	public String getSubTrfCd() {
		return subTrfCd;
	}

	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public String getPayerNm() {
		return payerNm;
	}

	public void setPayerNm(String payerNm) {
		this.payerNm = payerNm;
	}

	public String getPayerAddr() {
		return payerAddr;
	}

	public void setPayerAddr(String payerAddr) {
		this.payerAddr = payerAddr;
	}

	public String getPayerTpCd() {
		return payerTpCd;
	}

	public void setPayerTpCd(String payerTpCd) {
		this.payerTpCd = payerTpCd;
	}

	public String getCustomerTp() {
		return customerTp;
	}

	public void setCustomerTp(String customerTp) {
		this.customerTp = customerTp;
	}

	public String getGatherNo() {
		return gatherNo;
	}

	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}

	public String getGatherDt() {
		return gatherDt;
	}

	public void setGatherDt(String gatherDt) {
		this.gatherDt = gatherDt;
	}

	public String getGatherTpCd() {
		return gatherTpCd;
	}

	public void setGatherTpCd(String gatherTpCd) {
		this.gatherTpCd = gatherTpCd;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
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

	public String getIvTp() {
		return ivTp;
	}

	public void setIvTp(String ivTp) {
		this.ivTp = ivTp;
	}

	public String getIvTpNm() {
		return ivTpNm;
	}

	public void setIvTpNm(String ivTpNm) {
		this.ivTpNm = ivTpNm;
	}

	public String getIvAddr() {
		return ivAddr;
	}

	public void setIvAddr(String ivAddr) {
		this.ivAddr = ivAddr;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getShipgAgnt() {
		return shipgAgnt;
	}

	public void setShipgAgnt(String shipgAgnt) {
		this.shipgAgnt = shipgAgnt;
	}

	public String getFwdAgnt() {
		return fwdAgnt;
	}

	public void setFwdAgnt(String fwdAgnt) {
		this.fwdAgnt = fwdAgnt;
	}

	public String getShpr() {
		return shpr;
	}

	public void setShpr(String shpr) {
		this.shpr = shpr;
	}

	public String getCnsne() {
		return cnsne;
	}

	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}

	public String getOriginalIvNo() {
		return originalIvNo;
	}

	public void setOriginalIvNo(String originalIvNo) {
		this.originalIvNo = originalIvNo;
	}

	public String getGrNo() {
		return grNo;
	}

	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	public String getDoNo() {
		return doNo;
	}

	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}

	public String getDivCd() {
		return divCd;
	}

	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}

	public String getBillTpCd() {
		return billTpCd;
	}

	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}

	public String getDraftIvNo() {
		return draftIvNo;
	}

	public void setDraftIvNo(String draftIvNo) {
		this.draftIvNo = draftIvNo;
	}

	public String getRefIvNo() {
		return refIvNo;
	}

	public void setRefIvNo(String refIvNo) {
		this.refIvNo = refIvNo;
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

	public String getWgt() {
		return wgt;
	}

	public void setWgt(String wgt) {
		this.wgt = wgt;
	}

	public String getMsrmt() {
		return msrmt;
	}

	public void setMsrmt(String msrmt) {
		this.msrmt = msrmt;
	}

	public String getPkgQty() {
		return pkgQty;
	}

	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}

	public String getOpeClassCd() {
		return opeClassCd;
	}

	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}

	public String getStatCd() {
		return statCd;
	}

	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}

	public String getStatNm() {
		return statNm;
	}

	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}

	public String getRefNo() {
		return refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public String getCalFmYmd() {
		return calFmYmd;
	}

	public void setCalFmYmd(String calFmYmd) {
		this.calFmYmd = calFmYmd;
	}

	public String getCalToYmd() {
		return calToYmd;
	}

	public void setCalToYmd(String calToYmd) {
		this.calToYmd = calToYmd;
	}

	public String getPkgTrfNm() {
		return pkgTrfNm;
	}

	public void setPkgTrfNm(String pkgTrfNm) {
		this.pkgTrfNm = pkgTrfNm;
	}

	public String getAplyRate() {
		return aplyRate;
	}

	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}

	public String getAplyAmt() {
		return aplyAmt;
	}

	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}

	public String getAplyTaxPercent() {
		return aplyTaxPercent;
	}

	public void setAplyTaxPercent(String aplyTaxPercent) {
		this.aplyTaxPercent = aplyTaxPercent;
	}

	public String getAplyTaxAmt() {
		return aplyTaxAmt;
	}

	public void setAplyTaxAmt(String aplyTaxAmt) {
		this.aplyTaxAmt = aplyTaxAmt;
	}

	public String getAplyTotalAmt() {
		return aplyTotalAmt;
	}

	public void setAplyTotalAmt(String aplyTotalAmt) {
		this.aplyTotalAmt = aplyTotalAmt;
	}

	public String getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}

	public String getIvAmt() {
		return ivAmt;
	}

	public void setIvAmt(String ivAmt) {
		this.ivAmt = ivAmt;
	}

	public String getStdRate() {
		return stdRate;
	}

	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
	}

	public String getExchgVal() {
		return exchgVal;
	}

	public void setExchgVal(String exchgVal) {
		this.exchgVal = exchgVal;
	}

	public String getCrcyCd() {
		return crcyCd;
	}

	public void setCrcyCd(String crcyCd) {
		this.crcyCd = crcyCd;
	}

	public String getTrfRegNo() {
		return trfRegNo;
	}

	public void setTrfRegNo(String trfRegNo) {
		this.trfRegNo = trfRegNo;
	}

	public String getCgNo() {
		return cgNo;
	}

	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getRefNo1() {
		return refNo1;
	}

	public void setRefNo1(String refNo1) {
		this.refNo1 = refNo1;
	}

	public String getRefNo2() {
		return refNo2;
	}

	public void setRefNo2(String refNo2) {
		this.refNo2 = refNo2;
	}

	public String getRefNo3() {
		return refNo3;
	}

	public void setRefNo3(String refNo3) {
		this.refNo3 = refNo3;
	}

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}

	public String getCmdtCd() {
		return cmdtCd;
	}

	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}

	public String getTsptTpCd() {
		return tsptTpCd;
	}

	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}

	public String getPkgTpCd() {
		return pkgTpCd;
	}

	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}

	public String getFreeStrgDd() {
		return freeStrgDd;
	}

	public void setFreeStrgDd(String freeStrgDd) {
		this.freeStrgDd = freeStrgDd;
	}

	public String getSvcOdrNo() {
		return svcOdrNo;
	}

	public void setSvcOdrNo(String svcOdrNo) {
		this.svcOdrNo = svcOdrNo;
	}

	public String getUnno() {
		return unno;
	}

	public void setUnno(String unno) {
		this.unno = unno;
	}

	public String getVinNo() {
		return vinNo;
	}

	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}

	public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public String getAdhocYn() {
		return adhocYn;
	}

	public void setAdhocYn(String adhocYn) {
		this.adhocYn = adhocYn;
	}

	public String getFrgnAmt() {
		return frgnAmt;
	}

	public void setFrgnAmt(String frgnAmt) {
		this.frgnAmt = frgnAmt;
	}

	public String getBillDays() {
		return billDays;
	}

	public void setBillDays(String billDays) {
		this.billDays = billDays;
	}

	public String getSytmId() {
		return sytmId;
	}

	public void setSytmId(String sytmId) {
		this.sytmId = sytmId;
	}

	public String getPayTpCd() {
		return payTpCd;
	}

	public void setPayTpCd(String payTpCd) {
		this.payTpCd = payTpCd;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getExRate() {
		return exRate;
	}

	public void setExRate(String exRate) {
		this.exRate = exRate;
	}

	public String getTotalIvAmt() {
		return totalIvAmt;
	}

	public void setTotalIvAmt(String totalIvAmt) {
		this.totalIvAmt = totalIvAmt;
	}

	public String getIsFileAtt() {
		return isFileAtt;
	}

	public void setIsFileAtt(String isFileAtt) {
		this.isFileAtt = isFileAtt;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getIvSytmId() {
		return ivSytmId;
	}

	public void setIvSytmId(String ivSytmId) {
		this.ivSytmId = ivSytmId;
	}

	public String getVwDt() {
		return vwDt;
	}

	public void setVwDt(String vwDt) {
		this.vwDt = vwDt;
	}

	public String getVwUserId() {
		return vwUserId;
	}

	public void setVwUserId(String vwUserId) {
		this.vwUserId = vwUserId;
	}

	public List<CreditNoteItem> getIvNos() {
		return ivNos;
	}

	public void setIvNos(List<CreditNoteItem> ivNos) {
		this.ivNos = ivNos;
	}

	public String getPrUserId() {
		return prUserId;
	}

	public void setPrUserId(String prUserId) {
		this.prUserId = prUserId;
	}

	public String getPrDt() {
		return prDt;
	}

	public void setPrDt(String prDt) {
		this.prDt = prDt;
	}

	public String getProformaYn() {
		return proformaYn;
	}

	public void setProformaYn(String proformaYn) {
		this.proformaYn = proformaYn;
	}

	public String getOldIvNo() {
		return oldIvNo;
	}

	public void setOldIvNo(String oldIvNo) {
		this.oldIvNo = oldIvNo;
	}

	public String getCostCentCd() {
		return costCentCd;
	}

	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}

	public String getScrId() {
		return scrId;
	}

	public void setScrId(String scrId) {
		this.scrId = scrId;
	}

	public String getReasonCd() {
		return reasonCd;
	}

	public void setReasonCd(String reasonCd) {
		this.reasonCd = reasonCd;
	}

	public String getReasonNm() {
		return reasonNm;
	}

	public void setReasonNm(String reasonNm) {
		this.reasonNm = reasonNm;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getBerthLoc() {
		return berthLoc;
	}

	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}

	public String getAtb() {
		return atb;
	}

	public void setAtb(String atb) {
		this.atb = atb;
	}

	public String getAtu() {
		return atu;
	}

	public void setAtu(String atu) {
		this.atu = atu;
	}

	public String getArrvSaId() {
		return arrvSaId;
	}

	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getEngSnm() {
		return engSnm;
	}

	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
	}

	public String getPtnrTpCd() {
		return ptnrTpCd;
	}

	public void setPtnrTpCd(String ptnrTpCd) {
		this.ptnrTpCd = ptnrTpCd;
	}

	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getLoa() {
		return loa;
	}

	public void setLoa(String loa) {
		this.loa = loa;
	}

	public String getGrt() {
		return grt;
	}

	public void setGrt(String grt) {
		this.grt = grt;
	}

	public String getAtw() {
		return atw;
	}

	public void setAtw(String atw) {
		this.atw = atw;
	}

	public String getAtc() {
		return atc;
	}

	public void setAtc(String atc) {
		this.atc = atc;
	}

	public String getAtd() {
		return atd;
	}

	public void setAtd(String atd) {
		this.atd = atd;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getStdAmt() {
		return stdAmt;
	}

	public void setStdAmt(String stdAmt) {
		this.stdAmt = stdAmt;
	}

	public String getIvDt() {
		return ivDt;
	}

	public void setIvDt(String ivDt) {
		this.ivDt = ivDt;
	}

	public String getIvDueDt() {
		return ivDueDt;
	}

	public void setIvDueDt(String ivDueDt) {
		this.ivDueDt = ivDueDt;
	}

	public String getSytmUseId() {
		return sytmUseId;
	}

	public void setSytmUseId(String sytmUseId) {
		this.sytmUseId = sytmUseId;
	}

	public String getDmyVslCallYn() {
		return dmyVslCallYn;
	}

	public void setDmyVslCallYn(String dmyVslCallYn) {
		this.dmyVslCallYn = dmyVslCallYn;
	}

	public String getIvUnit1() {
		return ivUnit1;
	}

	public void setIvUnit1(String ivUnit1) {
		this.ivUnit1 = ivUnit1;
	}

	public String getBankCd() {
		return bankCd;
	}

	public void setBankCd(String bankCd) {
		this.bankCd = bankCd;
	}

	public String getBankNm() {
		return bankNm;
	}

	public void setBankNm(String bankNm) {
		this.bankNm = bankNm;
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

	public String getUpdateUserId() {
		return updateUserId;
	}

	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreditNoteNo() {
		return creditNoteNo;
	}

	public void setCreditNoteNo(String creditNoteNo) {
		this.creditNoteNo = creditNoteNo;
	}

	public String getCreatedDt() {
		return createdDt;
	}

	public void setCreatedDt(String createdDt) {
		this.createdDt = createdDt;
	}

	public String getErpStatCd() {
		return erpStatCd;
	}

	public void setErpStatCd(String erpStatCd) {
		this.erpStatCd = erpStatCd;
	}

	public String getCrnStatCd() {
		return crnStatCd;
	}

	public void setCrnStatCd(String crnStatCd) {
		this.crnStatCd = crnStatCd;
	}

	public String getCrnStatNm() {
		return crnStatNm;
	}

	public void setCrnStatNm(String crnStatNm) {
		this.crnStatNm = crnStatNm;
	}

	public String getFrgnGstAmt() {
		return frgnGstAmt;
	}

	public void setFrgnGstAmt(String frgnGstAmt) {
		this.frgnGstAmt = frgnGstAmt;
	}

	public String getGstAmt() {
		return gstAmt;
	}

	public void setGstAmt(String gstAmt) {
		this.gstAmt = gstAmt;
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

	public String getDcAmt() {
		return dcAmt;
	}

	public void setDcAmt(String dcAmt) {
		this.dcAmt = dcAmt;
	}

	public String getSvcSeq() {
		return svcSeq;
	}

	public void setSvcSeq(String svcSeq) {
		this.svcSeq = svcSeq;
	}

	public String getSysCloneId() {
		return sysCloneId;
	}

	public void setSysCloneId(String sysCloneId) {
		this.sysCloneId = sysCloneId;
	}

	public String getErpIvTpCd() {
		return erpIvTpCd;
	}

	public void setErpIvTpCd(String erpIvTpCd) {
		this.erpIvTpCd = erpIvTpCd;
	}

	public String getFrgnTotalAmt() {
		return frgnTotalAmt;
	}

	public void setFrgnTotalAmt(String frgnTotalAmt) {
		this.frgnTotalAmt = frgnTotalAmt;
	}

	public String getRefNo4() {
		return refNo4;
	}

	public void setRefNo4(String refNo4) {
		this.refNo4 = refNo4;
	}

	public String getIvRmk() {
		return ivRmk;
	}

	public void setIvRmk(String ivRmk) {
		this.ivRmk = ivRmk;
	}

	public String getTmnlNm() {
		return tmnlNm;
	}

	public void setTmnlNm(String tmnlNm) {
		this.tmnlNm = tmnlNm;
	}

	public String getTmnlAddr() {
		return tmnlAddr;
	}

	public void setTmnlAddr(String tmnlAddr) {
		this.tmnlAddr = tmnlAddr;
	}

	public String getTmnlTel() {
		return tmnlTel;
	}

	public void setTmnlTel(String tmnlTel) {
		this.tmnlTel = tmnlTel;
	}

	public String getTmnlFax() {
		return tmnlFax;
	}

	public void setTmnlFax(String tmnlFax) {
		this.tmnlFax = tmnlFax;
	}

	public String getTelNo() {
		return telNo;
	}

	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	public String getCrnUnit1Val() {
		return crnUnit1Val;
	}

	public void setCrnUnit1Val(String crnUnit1Val) {
		this.crnUnit1Val = crnUnit1Val;
	}

	public String getCrnUnit2Val() {
		return crnUnit2Val;
	}

	public void setCrnUnit2Val(String crnUnit2Val) {
		this.crnUnit2Val = crnUnit2Val;
	}

	public String getCrnUnit3Val() {
		return crnUnit3Val;
	}

	public void setCrnUnit3Val(String crnUnit3Val) {
		this.crnUnit3Val = crnUnit3Val;
	}

	public String getCrnApplyRate() {
		return crnApplyRate;
	}

	public void setCrnApplyRate(String crnApplyRate) {
		this.crnApplyRate = crnApplyRate;
	}

	public String getCrnApplyAmt() {
		return crnApplyAmt;
	}

	public void setCrnApplyAmt(String crnApplyAmt) {
		this.crnApplyAmt = crnApplyAmt;
	}

	public String getIvApplyAmt() {
		return ivApplyAmt;
	}

	public void setIvApplyAmt(String ivApplyAmt) {
		this.ivApplyAmt = ivApplyAmt;
	}

	public String getIvGstAmt() {
		return ivGstAmt;
	}

	public void setIvGstAmt(String ivGstAmt) {
		this.ivGstAmt = ivGstAmt;
	}

	public String getCrnTotalAmt() {
		return crnTotalAmt;
	}

	public void setCrnTotalAmt(String crnTotalAmt) {
		this.crnTotalAmt = crnTotalAmt;
	}

	public String getCrnGstAmt() {
		return crnGstAmt;
	}

	public void setCrnGstAmt(String crnGstAmt) {
		this.crnGstAmt = crnGstAmt;
	}

	public String getPayerTaxNo() {
		return payerTaxNo;
	}

	public void setPayerTaxNo(String payerTaxNo) {
		this.payerTaxNo = payerTaxNo;
	}

	public String getCrnIvDt() {
		return crnIvDt;
	}

	public void setCrnIvDt(String crnIvDt) {
		this.crnIvDt = crnIvDt;
	}

	public String getCrnIvDueDt() {
		return crnIvDueDt;
	}

	public void setCrnIvDueDt(String crnIvDueDt) {
		this.crnIvDueDt = crnIvDueDt;
	}

	public String getTmnlRegNo() {
		return tmnlRegNo;
	}

	public void setTmnlRegNo(String tmnlRegNo) {
		this.tmnlRegNo = tmnlRegNo;
	}

	public String getTmnlCd() {
		return tmnlCd;
	}

	public void setTmnlCd(String tmnlCd) {
		this.tmnlCd = tmnlCd;
	}
}
