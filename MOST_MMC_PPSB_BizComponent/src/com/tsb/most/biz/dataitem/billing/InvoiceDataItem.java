/**
* InvoiceDataItem.java
*
* Created on   : 2007-12-18
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-12-18   Hugh Lim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.audit.AuditItem;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;

/**
 * @author Hugh
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class InvoiceDataItem extends AuditItem {
	private String checkRole;
	private String trfCd;
	private String trfTpCd;
	private String subTrfCd;
	private String payer;
	private String gatherNo;
	private int seq;
	// to be deleted
	private String divCd;
	private String billTpCd;
	private String ivPrfx;
	private String trfDescr;
	private String unit1Val;
	private String unit2Val;
	private String unit3Val;
	private String statCd;
	private String ivNo;
	private String refNo;
	private String gatherDt;
	private String calFmYmd;
	private String calToYmd;
	private String pkgTrfNm;
	private String aplyRate;
	private String aplyAmt;
	private String stdRate;
	private String adhocYn;
	private String revsRate;
	private String revsAmt;
	private String revsUnit1Val;
	private String revsUnit2Val;
	private String revsUnit3Val;
	private String gatherSytmId;
	private String rentTpCd;
	private String area;
	private String frgnAmt;
	private String billDays;
	private String sytmId;
	private String payTpCd;
	private String currency;
	private String exRate;
	private String reportAmt;// total amount for report RBL004
	private int curPage;
	private String pagingSearchType;
	private int pageSize;
	private int test1;
	private int test2;
	private String totalPage;
	private String rn;
	private String totalAmt;
	private String gstAmt;
	private String frgnGstAmt;
	private String gstType;
	private String totalFrgn;
	private String gstValueHidden;
	private String appliedAmt;
	private String diffAmt;
	private String workingStatus;
	private String paymentTerm;

	private ArrayList<InvoicePayerItem> payerList;
	private ArrayList<InvoicePayerItem> invoiceNoList;
	private ArrayList<InvoiceDataItem> invoiceList;
	private ArrayList<InvoiceDataItem> amtCalcList;
	private ArrayList<InvoicePayerItem> ivPrfxlists;
	private ArrayList<FileUploadItem> uploadItemsList;

	private String vslOperator;
	private String shipCallNo;
	private String isFileAtt;
	private String ivAmt;
	private String payDocNo;
	private String payAmt;

	private String payDt;
	private String ivSytmId;
	private String vwDt;
	private String vwUserId;

	private List ivNos;
	private String prUserId;
	private String prDt;
	private String erpStatCd;

	private String crDate; // blackberry add this code to show the create date in screen.
	private String userId; // add by Joseph
	private String transferStatus;
	private String invoiceTrfList;
	private String messageCode = "";

	private String paidStOrg;

	private String totalWithAmt;
	private String isUpdatePaid;
	private String tmpIvNo;
	private String rowNumber;
	private String chkTrf;

	private String gstAmountRpt;
	private String totalAmountRpt;
	private String gstAmount;
	private String totalAmount;

	private String gstTpCd;
	private String gstValue;
	private String payableAmount;

	private String gstPercent;

	private String telNo; // For payer
	private String gstRefId;

	private String tmnlNm; // Terminal Name
	private String comRegNo; // For Terminal
	private String gstRegNo;

	private String tmnlAddr;
	private String tmnlTel;
	private String tmnlFax;

	private String isSelected;
	private String isNotMatch;

	// values from vesselschedule (from screen)
	// valuables from VesselScheduleItem
	// private String jpvcNo;
	private String paidSt;
	private String vslCallId; // jpvcNo.
	private String vslNm;
	private String berthLoc;

	private String atb;
	private String atu;
	private String voyage;
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

	private String isPrfx;

	private String bbtCheck;
	private String waiverDescr;

	private String sytmUseId;
	private String dmyVslCallYn;

	// values for Invoice List with Detail report
	private String costCentCd;
	private String scrId;
	private String isWhRental;
	private String sdate;
	private String edate;
	private String prdTpCd;
	// for loading the DESC from comodity
	private String desCom;

	/* 20090626 */
	private String refNo1;
	private String refNo2;
	private String refNo3;
	private String refNo4;

	/* for Rental Contract */
	private String conttNo;
	private String rentRefNo;
	private String sShf;
	private String eShf;
	private String ediSendYn;
	private String ediSendDt;
	private String cType;
	private String cud;
	private String payerTpCd;
	private String ivTpCd;
	private String financialCode;
	
	private String svcDtFrom;
	private String svcDtTo;

	private List statusList;
	private List invoiceTypeList;
	private List prefixList;
	
	private String cgNo;
	private String jobNo;
	private String rmk;
	private String erpIvTpCd;
	private String blNo;
	private String snNo;
	private String masterBl;
	private String bookingNo;
	private String payerTaxNo;
	private String gstRate;
	private String dcAmt;
	private String ivUnit1;
	private String ivUnit2;
	private String ivUnit3;
	
	private String delvTpCd;
	private String prfUnit1Val;
	private String prfAmt;

	//added by Brian (for Service Order)
	private String parentGatherNo;
	private String svcId;
	private String svcSeq;
	
	private String disSurAmount;
    private String disSurRate;
    private String wthAmount;
    private String wthValue;
    private String ptnrCdNm;
    
    private String createdBy;
    private String crcyCd;
    
    private String imVrfChk;
    private String exVrfChk;
    
    private String custCd;
    private String payerNm;
    private String taxCd;
    private String taxValue;
    private String taxAmt;
    private String payerAddr;
    private String accNm;
    private String bankNm;
    private String payerTaxCd;
    
    //MMC - Settlement
    private String expectedDeliveryDay;
    private String deliveredDate;
    private String freeStorageEndDate;
    private String groupingFields;
    private String minAmount;
    private int erpLineNo;
    private String applyFreeDays;
    private String totalAmtString;
    private String scn;
    
	public String getMessageCode() {
		return messageCode;
	}

	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}

	public String getInvoiceTrfList() {
		return invoiceTrfList;
	}

	public void setInvoiceTrfList(String invoiceTrfList) {
		this.invoiceTrfList = invoiceTrfList;
	}

	public String getChkTrf() {
		return chkTrf;
	}

	public void setChkTrf(String chkTrf) {
		this.chkTrf = chkTrf;
	}

	public String getGstValueHidden() {
		return gstValueHidden;
	}

	public void setGstValueHidden(String gstValueHidden) {
		this.gstValueHidden = gstValueHidden;
	}

	public String getTotalFrgn() {
		return totalFrgn;
	}

	public void setTotalFrgn(String totalFrgn) {
		this.totalFrgn = totalFrgn;
	}

	public String getGstType() {
		return gstType;
	}

	public void setGstType(String gstType) {
		this.gstType = gstType;
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

	public String getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}

	public String getRn() {
		return rn;
	}

	public void setRn(String rn) {
		this.rn = rn;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getPagingSearchType() {
		return pagingSearchType;
	}

	public void setPagingSearchType(String pagingSearchType) {
		this.pagingSearchType = pagingSearchType;
	}

	public int getTest1() {
		return test1;
	}

	public void setTest1(int test1) {
		this.test1 = test1;
	}

	public int getTest2() {
		return test2;
	}

	public void setTest2(int test2) {
		this.test2 = test2;
	}

	/**
	 * @return Returns the billDays.
	 */
	public String getBillDays() {
		return billDays;
	}

	/**
	 * @param billDays
	 *            The billDays to set.
	 */
	public void setBillDays(String billDays) {
		this.billDays = billDays;
	}

	/**
	 * @return Returns the cType.
	 */
	public String getCType() {
		return cType;
	}

	/**
	 * @param type
	 *            The cType to set.
	 */
	public void setCType(String type) {
		cType = type;
	}

	public String getDesCom() {
		return desCom;
	}

	public void setDesCom(String desCom) {
		this.desCom = desCom;
	}

	/**
	 * @return Returns the prdTpCd.
	 */
	public String getPrdTpCd() {
		return prdTpCd;
	}

	/**
	 * @param prdTpCd
	 *            The prdTpCd to set.
	 */
	public void setPrdTpCd(String prdTpCd) {
		this.prdTpCd = prdTpCd;
	}

	/**
	 * @return Returns the edate.
	 */
	public String getEdate() {
		return edate;
	}

	/**
	 * @param edate
	 *            The edate to set.
	 */
	public void setEdate(String edate) {
		this.edate = edate;
	}

	/**
	 * @return Returns the sdate.
	 */
	public String getSdate() {
		return sdate;
	}

	/**
	 * @param sdate
	 *            The sdate to set.
	 */
	public void setSdate(String sdate) {
		this.sdate = sdate;
	}

	/**
	 * @return Returns the isWhRental.
	 */
	public String getIsWhRental() {
		return isWhRental;
	}

	/**
	 * @param isWhRental
	 *            The isWhRental to set.
	 */
	public void setIsWhRental(String isWhRental) {
		this.isWhRental = isWhRental;
	}

	public String getAdhocYn() {
		return adhocYn;
	}

	public void setAdhocYn(String adhocYn) {
		this.adhocYn = adhocYn;
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

	public String getDivCd() {
		return divCd;
	}

	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}

	public String getGatherDt() {
		return gatherDt;
	}

	public void setGatherDt(String gatherDt) {
		this.gatherDt = gatherDt;
	}

	public String getGatherNo() {
		return gatherNo;
	}

	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}

	public String getGatherSytmId() {
		return gatherSytmId;
	}

	public void setGatherSytmId(String gatherSytmId) {
		this.gatherSytmId = gatherSytmId;
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

	// public String getPayer() {
	// return payer;
	// }
	// public void setPayer(String payer) {
	// this.payer = payer;
	// }
	public String getPkgTrfNm() {
		return pkgTrfNm;
	}

	public void setPkgTrfNm(String pkgTrfNm) {
		this.pkgTrfNm = pkgTrfNm;
	}

	public String getRefNo() {
		return refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public String getRentTpCd() {
		return rentTpCd;
	}

	public void setRentTpCd(String rentTpCd) {
		this.rentTpCd = rentTpCd;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getStatCd() {
		return statCd;
	}

	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}

	public String getTrfCd() {
		return trfCd;
	}

	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}

	public String getTrfDescr() {
		return trfDescr;
	}

	public void setTrfDescr(String trfDescr) {
		this.trfDescr = trfDescr;
	}

	public String getIsSelected() {
		return isSelected;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public String getAplyAmt() {
		return aplyAmt;
	}

	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}

	public String getAplyRate() {
		return aplyRate;
	}

	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}

	public String getRevsAmt() {
		return revsAmt;
	}

	public void setRevsAmt(String revsAmt) {
		this.revsAmt = revsAmt;
	}

	public String getRevsRate() {
		return revsRate;
	}

	public void setRevsRate(String revsRate) {
		this.revsRate = revsRate;
	}

	public String getRevsUnit1Val() {
		return revsUnit1Val;
	}

	public void setRevsUnit1Val(String revsUnit1Val) {
		this.revsUnit1Val = revsUnit1Val;
	}

	public String getStdRate() {
		return stdRate;
	}

	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
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

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getRevsUnit2Val() {
		return revsUnit2Val;
	}

	public void setRevsUnit2Val(String revsUnit2Val) {
		this.revsUnit2Val = revsUnit2Val;
	}

	public String getRevsUnit3Val() {
		return revsUnit3Val;
	}

	public void setRevsUnit3Val(String revsUnit3Val) {
		this.revsUnit3Val = revsUnit3Val;
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

	public String getBerthLoc() {
		return berthLoc;
	}

	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}

	public String getEngSnm() {
		return engSnm;
	}

	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getPtnrTpCd() {
		return ptnrTpCd;
	}

	public void setPtnrTpCd(String ptnrTpCd) {
		this.ptnrTpCd = ptnrTpCd;
	}

	public String getVoyage() {
		return voyage;
	}

	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getArrvSaId() {
		return arrvSaId;
	}

	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	// public String getJpvcNo() {
	// return jpvcNo;
	// }
	// public void setJpvcNo(String jpvcNo) {
	// this.jpvcNo = jpvcNo;
	// }
	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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

	public String getIsPrfx() {
		return isPrfx;
	}

	public void setIsPrfx(String isPrfx) {
		this.isPrfx = isPrfx;
	}

	public String getAtc() {
		return atc;
	}

	public void setAtc(String atc) {
		this.atc = atc;
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

	public String getStdAmt() {
		return stdAmt;
	}

	public void setStdAmt(String stdAmt) {
		this.stdAmt = stdAmt;
	}

	public String getSubTrfCd() {
		return subTrfCd;
	}

	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}

	public String getBillTpCd() {
		return billTpCd;
	}

	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}

	public String getTrfTpCd() {
		return trfTpCd;
	}

	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}

	public String getBbtCheck() {
		return bbtCheck;
	}

	public void setBbtCheck(String bbtCheck) {
		this.bbtCheck = bbtCheck;
	}

	public String getWaiverDescr() {
		return waiverDescr;
	}

	public void setWaiverDescr(String waiverDescr) {
		this.waiverDescr = waiverDescr;
	}

	public String getAtd() {
		return atd;
	}

	public void setAtd(String atd) {
		this.atd = atd;
	}

	public String getCostCentCd() {
		return costCentCd;
	}

	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public String getDmyVslCallYn() {
		return dmyVslCallYn;
	}

	public void setDmyVslCallYn(String dmyVslCallYn) {
		this.dmyVslCallYn = dmyVslCallYn;
	}

	public String getSytmUseId() {
		return sytmUseId;
	}

	public void setSytmUseId(String sytmUseId) {
		this.sytmUseId = sytmUseId;
	}

	/**
	 * @return Returns the isNotMatch.
	 */
	public String getIsNotMatch() {
		return isNotMatch;
	}

	/**
	 * @param isNotMatch
	 *            The isNotMatch to set.
	 */
	public void setIsNotMatch(String isNotMatch) {
		this.isNotMatch = isNotMatch;
	}

	/**
	 * @return Returns the frgnAmt.
	 */
	public String getFrgnAmt() {
		return frgnAmt;
	}

	/**
	 * @param frgnAmt
	 *            The frgnAmt to set.
	 */
	public void setFrgnAmt(String frgnAmt) {
		this.frgnAmt = frgnAmt;
	}

	/**
	 * @return Returns the scrId.
	 */
	public String getScrId() {
		return scrId;
	}

	/**
	 * @param scrId
	 *            The scrId to set.
	 */
	public void setScrId(String scrId) {
		this.scrId = scrId;
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

	/**
	 * @return Returns the conttNo.
	 */
	public String getConttNo() {
		return conttNo;
	}

	/**
	 * @param conttNo
	 *            The conttNo to set.
	 */
	public void setConttNo(String conttNo) {
		this.conttNo = conttNo;
	}

	/**
	 * @return Returns the eShf.
	 */
	public String getEShf() {
		return eShf;
	}

	/**
	 * @param shf
	 *            The eShf to set.
	 */
	public void setEShf(String shf) {
		eShf = shf;
	}

	/**
	 * @return Returns the sShf.
	 */
	public String getSShf() {
		return sShf;
	}

	/**
	 * @param shf
	 *            The sShf to set.
	 */
	public void setSShf(String shf) {
		sShf = shf;
	}

	/**
	 * @return Returns the rentRefNo.
	 */
	public String getRentRefNo() {
		return rentRefNo;
	}

	/**
	 * @param rentRefNo
	 *            The rentRefNo to set.
	 */
	public void setRentRefNo(String rentRefNo) {
		this.rentRefNo = rentRefNo;
	}

	public String getEdiSendDt() {
		return ediSendDt;
	}

	public void setEdiSendDt(String ediSendDt) {
		this.ediSendDt = ediSendDt;
	}

	public String getEdiSendYn() {
		return ediSendYn;
	}

	public void setEdiSendYn(String ediSendYn) {
		this.ediSendYn = ediSendYn;
	}

	/**
	 * @return Returns the sytmId.
	 */
	public String getSytmId() {
		return sytmId;
	}

	/**
	 * @param sytmId
	 *            The sytmId to set.
	 */
	public void setSytmId(String sytmId) {
		this.sytmId = sytmId;
	}

	/**
	 * @return Returns the payTpCd.
	 */
	public String getPayTpCd() {
		return payTpCd;
	}

	/**
	 * @param payTpCd
	 *            The payTpCd to set.
	 */
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

	public String getReportAmt() {
		return reportAmt;
	}

	public void setReportAmt(String reportAmt) {
		this.reportAmt = reportAmt;
	}

	public String getCheckRole() {
		return checkRole;
	}

	public void setCheckRole(String checkRole) {
		this.checkRole = checkRole;
	}

	public String getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	public String getGstAmount() {
		return gstAmount;
	}

	public void setGstAmount(String gstAmount) {
		this.gstAmount = gstAmount;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getGstTpCd() {
		return gstTpCd;
	}

	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}

	public String getGstValue() {
		return gstValue;
	}

	public void setGstValue(String gstValue) {
		this.gstValue = gstValue;
	}

	public String getPayableAmount() {
		return payableAmount;
	}

	public void setPayableAmount(String payableAmount) {
		this.payableAmount = payableAmount;
	}

	public String getComRegNo() {
		return comRegNo;
	}

	public void setComRegNo(String comRegNo) {
		this.comRegNo = comRegNo;
	}

	public String getGstPercent() {
		return gstPercent;
	}

	public void setGstPercent(String gstPercent) {
		this.gstPercent = gstPercent;
	}

	public String getGstRefId() {
		return gstRefId;
	}

	public void setGstRefId(String gstRefId) {
		this.gstRefId = gstRefId;
	}

	public String getGstRegNo() {
		return gstRegNo;
	}

	public void setGstRegNo(String gstRegNo) {
		this.gstRegNo = gstRegNo;
	}

	public String getTelNo() {
		return telNo;
	}

	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	public String getTmnlNm() {
		return tmnlNm;
	}

	public void setTmnlNm(String tmnlNm) {
		this.tmnlNm = tmnlNm;
	}

	public String getGstAmountRpt() {
		return gstAmountRpt;
	}

	public void setGstAmountRpt(String gstAmountRpt) {
		this.gstAmountRpt = gstAmountRpt;
	}

	public String getTotalAmountRpt() {
		return totalAmountRpt;
	}

	public void setTotalAmountRpt(String totalAmountRpt) {
		this.totalAmountRpt = totalAmountRpt;
	}

	public String getTmnlAddr() {
		return tmnlAddr;
	}

	public void setTmnlAddr(String tmnlAddr) {
		this.tmnlAddr = tmnlAddr;
	}

	public String getTmnlFax() {
		return tmnlFax;
	}

	public void setTmnlFax(String tmnlFax) {
		this.tmnlFax = tmnlFax;
	}

	public String getTmnlTel() {
		return tmnlTel;
	}

	public void setTmnlTel(String tmnlTel) {
		this.tmnlTel = tmnlTel;
	}

	public String getPaidSt() {
		return paidSt;
	}

	public void setPaidSt(String paidSt) {
		this.paidSt = paidSt;
	}

	public String getRefNo4() {
		return refNo4;
	}

	public void setRefNo4(String refNo4) {
		this.refNo4 = refNo4;
	}

	public List getStatusList() {
		return statusList;
	}

	public void setStatusList(List statusList) {
		this.statusList = statusList;
	}

	public List getInvoiceTypeList() {
		return invoiceTypeList;
	}

	public void setInvoiceTypeList(List invoiceTypeList) {
		this.invoiceTypeList = invoiceTypeList;
	}

	public List getPrefixList() {
		return prefixList;
	}

	public void setPrefixList(List prefixList) {
		this.prefixList = prefixList;
	}

	public ArrayList<InvoicePayerItem> getPayerList() {
		return payerList;
	}

	public void setPayerList(ArrayList<InvoicePayerItem> payerList) {
		this.payerList = payerList;
	}

	public ArrayList<InvoicePayerItem> getInvoiceNoList() {
		return invoiceNoList;
	}

	public void setInvoiceNoList(ArrayList<InvoicePayerItem> invoiceNoList) {
		this.invoiceNoList = invoiceNoList;
	}

	public ArrayList<InvoiceDataItem> getInvoiceList() {
		return invoiceList;
	}

	public void setInvoiceList(ArrayList<InvoiceDataItem> invoiceList) {
		this.invoiceList = invoiceList;
	}

	public ArrayList<InvoiceDataItem> getAmtCalcList() {
		return amtCalcList;
	}

	public void setAmtCalcList(ArrayList<InvoiceDataItem> amtCalcList) {
		this.amtCalcList = amtCalcList;
	}

	public String getAppliedAmt() {
		return appliedAmt;
	}

	public void setAppliedAmt(String appliedAmt) {
		this.appliedAmt = appliedAmt;
	}

	public String getDiffAmt() {
		return diffAmt;
	}

	public void setDiffAmt(String diffAmt) {
		this.diffAmt = diffAmt;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getVslOperator() {
		return vslOperator;
	}

	public void setVslOperator(String vslOperator) {
		this.vslOperator = vslOperator;
	}

	public String getShipCallNo() {
		return shipCallNo;
	}

	public void setShipCallNo(String shipCallNo) {
		this.shipCallNo = shipCallNo;
	}

	public String getIsFileAtt() {
		return isFileAtt;
	}

	public void setIsFileAtt(String isFileAtt) {
		this.isFileAtt = isFileAtt;
	}

	public String getIvAmt() {
		return ivAmt;
	}

	public void setIvAmt(String ivAmt) {
		this.ivAmt = ivAmt;
	}

	public String getPayDocNo() {
		return payDocNo;
	}

	public void setPayDocNo(String payDocNo) {
		this.payDocNo = payDocNo;
	}

	public String getPayAmt() {
		return payAmt;
	}

	public void setPayAmt(String payAmt) {
		this.payAmt = payAmt;
	}

	public String getPayDt() {
		return payDt;
	}

	public void setPayDt(String payDt) {
		this.payDt = payDt;
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

	public List getIvNos() {
		return ivNos;
	}

	public void setIvNos(List ivNos) {
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

	public String getErpStatCd() {
		return erpStatCd;
	}

	public void setErpStatCd(String erpStatCd) {
		this.erpStatCd = erpStatCd;
	}

	public String getCrDate() {
		return crDate;
	}

	public void setCrDate(String crDate) {
		this.crDate = crDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTransferStatus() {
		return transferStatus;
	}

	public void setTransferStatus(String transferStatus) {
		this.transferStatus = transferStatus;
	}

	public String getPaidStOrg() {
		return paidStOrg;
	}

	public void setPaidStOrg(String paidStOrg) {
		this.paidStOrg = paidStOrg;
	}

	public String getsShf() {
		return sShf;
	}

	public void setsShf(String sShf) {
		this.sShf = sShf;
	}

	public String geteShf() {
		return eShf;
	}

	public void seteShf(String eShf) {
		this.eShf = eShf;
	}

	public String getcType() {
		return cType;
	}

	public void setcType(String cType) {
		this.cType = cType;
	}

	public String getTotalWithAmt() {
		return totalWithAmt;
	}

	public void setTotalWithAmt(String totalWithAmt) {
		this.totalWithAmt = totalWithAmt;
	}

	public String getIsUpdatePaid() {
		return isUpdatePaid;
	}

	public void setIsUpdatePaid(String isUpdatePaid) {
		this.isUpdatePaid = isUpdatePaid;
	}

	public String getCud() {
		return cud;
	}

	public void setCud(String cud) {
		this.cud = cud;
	}

	public String getTmpIvNo() {
		return tmpIvNo;
	}

	public void setTmpIvNo(String tmpIvNo) {
		this.tmpIvNo = tmpIvNo;
	}

	public ArrayList<InvoicePayerItem> getIvPrfxlists() {
		return ivPrfxlists;
	}

	public void setIvPrfxlists(ArrayList<InvoicePayerItem> ivPrfxlists) {
		this.ivPrfxlists = ivPrfxlists;
	}

	public ArrayList<FileUploadItem> getUploadItemsList() {
		return uploadItemsList;
	}

	public void setUploadItemsList(ArrayList<FileUploadItem> uploadItemsList) {
		this.uploadItemsList = uploadItemsList;
	}

	public String getRowNumber() {
		return rowNumber;
	}

	public void setRowNumber(String rowNumber) {
		this.rowNumber = rowNumber;
	}

	public String getPayerTpCd() {
		return payerTpCd;
	}

	public void setPayerTpCd(String payerTpCd) {
		this.payerTpCd = payerTpCd;
	}

	public String getIvTpCd() {
		return ivTpCd;
	}

	public void setIvTpCd(String ivTpCd) {
		this.ivTpCd = ivTpCd;
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

	public String getFinancialCode() {
		return financialCode;
	}

	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}

	public String getCgNo() {
		return cgNo;
	}

	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}

	public String getJobNo() {
		return jobNo;
	}

	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	public String getErpIvTpCd() {
		return erpIvTpCd;
	}

	public void setErpIvTpCd(String erpIvTpCd) {
		this.erpIvTpCd = erpIvTpCd;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getSnNo() {
		return snNo;
	}

	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}

	public String getMasterBl() {
		return masterBl;
	}

	public void setMasterBl(String masterBl) {
		this.masterBl = masterBl;
	}

	public String getBookingNo() {
		return bookingNo;
	}

	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}

	public String getPayerTaxNo() {
		return payerTaxNo;
	}

	public void setPayerTaxNo(String payerTaxNo) {
		this.payerTaxNo = payerTaxNo;
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

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}

	public String getPrfUnit1Val() {
		return prfUnit1Val;
	}

	public void setPrfUnit1Val(String prfUnit1Val) {
		this.prfUnit1Val = prfUnit1Val;
	}

	public String getPrfAmt() {
		return prfAmt;
	}

	public void setPrfAmt(String prfAmt) {
		this.prfAmt = prfAmt;
	}
	
	public String getParentGatherNo() {
		return parentGatherNo;
	}

	public void setParentGatherNo(String parentGatherNo) {
		this.parentGatherNo = parentGatherNo;
	}

	public String getSvcId() {
		return svcId;
	}

	public void setSvcId(String svcId) {
		this.svcId = svcId;
	}

	public String getSvcSeq() {
		return svcSeq;
	}

	public void setSvcSeq(String svcSeq) {
		this.svcSeq = svcSeq;
	}
	
	public String getCrcyCd() {
		return crcyCd;
	}

	public void setCrcyCd(String crcyCd) {
		this.crcyCd = crcyCd;
	}

	public String getImVrfChk() {
		return imVrfChk;
	}

	public void setImVrfChk(String imVrfChk) {
		this.imVrfChk = imVrfChk;
	}

	public String getExVrfChk() {
		return exVrfChk;
	}

	public void setExVrfChk(String exVrfChk) {
		this.exVrfChk = exVrfChk;
	}

	public String getCustCd() {
		return custCd;
	}

	public void setCustCd(String custCd) {
		this.custCd = custCd;
	}

	public String getPayerNm() {
		return payerNm;
	}

	public void setPayerNm(String payerNm) {
		this.payerNm = payerNm;
	}

	public String getTaxCd() {
		return taxCd;
	}

	public void setTaxCd(String taxCd) {
		this.taxCd = taxCd;
	}

	public String getTaxValue() {
		return taxValue;
	}

	public void setTaxValue(String taxValue) {
		this.taxValue = taxValue;
	}

	public String getTaxAmt() {
		return taxAmt;
	}

	public void setTaxAmt(String taxAmt) {
		this.taxAmt = taxAmt;
	}

	public String getPayerAddr() {
		return payerAddr;
	}

	public void setPayerAddr(String payerAddr) {
		this.payerAddr = payerAddr;
	}

	public String getAccNm() {
		return accNm;
	}

	public void setAccNm(String accNm) {
		this.accNm = accNm;
	}

	public String getBankNm() {
		return bankNm;
	}

	public void setBankNm(String bankNm) {
		this.bankNm = bankNm;
	}

	public String getPayerTaxCd() {
		return payerTaxCd;
	}

	public void setPayerTaxCd(String payerTaxCd) {
		this.payerTaxCd = payerTaxCd;
	}

	public String getExpectedDeliveryDay() {
		return expectedDeliveryDay;
	}

	public void setExpectedDeliveryDay(String expectedDeliveryDay) {
		this.expectedDeliveryDay = expectedDeliveryDay;
	}

	public String getDeliveredDate() {
		return deliveredDate;
	}

	public void setDeliveredDate(String deliveredDate) {
		this.deliveredDate = deliveredDate;
	}

	public String getFreeStorageEndDate() {
		return freeStorageEndDate;
	}

	public void setFreeStorageEndDate(String freeStorageEndDate) {
		this.freeStorageEndDate = freeStorageEndDate;
	}

	public String getGroupingFields() {
		return groupingFields;
	}

	public void setGroupingFields(String groupingFields) {
		this.groupingFields = groupingFields;
	}

	public String getMinAmount() {
		return minAmount;
	}

	public void setMinAmount(String minAmount) {
		this.minAmount = minAmount;
	}

	public int getErpLineNo() {
		return erpLineNo;
	}

	public void setErpLineNo(int erpLineNo) {
		this.erpLineNo = erpLineNo;
	}

	public String getApplyFreeDays() {
		return applyFreeDays;
	}

	public void setApplyFreeDays(String applyFreeDays) {
		this.applyFreeDays = applyFreeDays;
	}

	public String getTotalAmtString() {
		return totalAmtString;
	}

	public void setTotalAmtString(String totalAmtString) {
		this.totalAmtString = totalAmtString;
	}

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}
}
