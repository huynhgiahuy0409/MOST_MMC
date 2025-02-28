/**
* ProformaInvoiceItem.java
*
* Created on   : 2021-11-13
* Target OS    : Java VM 1.8
* CVS revision : $Revision: 1.3 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2021-11-13   nd.hiep 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;
import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;
/**
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ProformaInvoiceItem extends DataItem {
	
	private String creditNote;		//P: Proforma Invoice, C: Credit Note, A: Additional Invoice
	private String creditNoteYn; 	//Y: Credit Note, N: Proforma, Additional
	private String vslCallId ;
    private String category ;
    private String docNo ;
    private String proformaInvoiceNo ;
    private String finalInvoiceNo ;
    private String docMT ;
    private String issuedMT ;
    private String operationMT ;
    private String issuedStatus ;
    private String cntDoc;
    private String adviceNo;
    private String adviceSeq;
    private String customerType;
    private String payerCd;
    private String payerTp;
    private String responsibilityCompanyCd;
    private String responsibilityCompanyTpCd;
    private String operTpCd;
    private String refInvNo;
    private String addCreditIvNo;
	private String shaCd; //Shipping Agent
	private String fwdCd; //Forwarder Agent
	private String shpCd; //Shipper
	private String cnsCd; //Consignee
 
	private String trfCd;
    private String subTrf;
    private String trfDesc;
    private String vatChk;
	private String detraccionChk;
	private String ivDetraccionChk;
    private String ivTp;
    private String ivTpNm;
    private String ivPrfx;
    private String ivAddr;
    private String ivNo;
    private String rowID;
    private String ivAmt;
    
    private String gatherNo;
    private String gatherSeq;
    private String gatherTpCd;
    private String billTpCd;
    private String applyRate;
    private String applyAmt;
    private String stdRate;
    
    private String cgTpCd;
    private String wgt;
    private String msrmt;
    private String pkgQty;
    private String fwrAgent;
    private String shipper;
    private String consignee;
    
    private String taxPrtg;
    private String taxAmt;
    private String totalAmt;
    private String netAmt;
    private String rmk;
    private String prUserId;
    private String opClassCd;		
	private String delvTpCd;
	private String delvTpNm;
	private String pkgTpCd;	
	private String imdgClass;		
	private String transportTpCd;
	private String cmdtCd;
	private String allowCreateAddCredit;
	private String updateUserId;
	
	private String tmnlUnitOfCharge;
	private String tmnlDetraccionChk;
	private String tmnlActCd;
	private String tmnlCostCenter;
	private String tmnlAccountCd;
	private String tmnlAccountDesc;
	private String apmtTariffDefinition;
	private String cancelYn;
	
	private String finalInvNo;
	private String adaviceSeq;
	//private String chk;
	
	private String payerNm;
	private String payerAddr;
	private String payerTaxNo;
	private String payerTel;
	private String trfTpCd;
	private String trfTpNm;
	private String blSnNo;
	private String unitPrc;
	private String cd;
	private String cdNm;
	private String paidYn;
	private String costCenter;
	private String ivDt;
	private String unit1Val;
	private String unit2Val;
	private String unit3Val;
	private String paymentType;
	private String statusCd;
	private String estDt;
	private String svcDtFrom;
	private String svcDtTo;
	private String itemStatus;
	private String hgFlag;
	private String action;
	private String financialCode;
	private String refNo3;
	
	private String tmnlNm;
	private String tmnlAddr;
	private String tmnlTel;
	private String tmnlFax;
	private String tmnlTaxNo;
	private String vslNm;
	private String groupingField;
	private String adhocYn;
	
	private ArrayList<ProformaInvoiceItem> blItems;
    private ArrayList<ProformaInvoiceItem> snItems;
    private ArrayList<ProformaInvoiceItem> mfItems;
	
	private String ivUnit1;
	private String ivUnit2;
	private String ivUnit3;
	
	//proforma report
	private String berthLoc;
	private String payer;
	private String engSnm;
	private String grt;
	private String loa;
	private String trfDescr;
	private String crcyCd;
	private String taxCd;
	private String taxValue;
	private String refNo;
	private String accNo;
	private String accNm;
	private String bankNm;
	private String aplyRate;
	private String exRate;
	private String aplyAmt;
	private String eta;
	private String etd;
	private String etw;
	private String etc;
	private String payerTaxCd;
	
	// MMC - Settlement
	private String expectedDeliveryDay;
	private String svcId;
	private String svcSeq;
	private String applyFreeDays;
	private String refNo2;
	
    //MMC - Settlement - Cash Receipt
    private String firstChargeDate;
	private String lastChargeDate;
	private String atb;
	private String atu;
	private String atc;
	private String atd;
	private String paymentStorageDate;
	private String freeStorageEndDate;
	private String totalAmtString;
	
	public String getFinalInvNo() {
		return finalInvNo;
	}
	public void setFinalInvNo(String finalInvNo) {
		this.finalInvNo = finalInvNo;
	}
	public String getAdaviceSeq() {
		return adaviceSeq;
	}
	public void setAdaviceSeq(String adaviceSeq) {
		this.adaviceSeq = adaviceSeq;
	}
//	public String getChk() {
//		return chk;
//	}
//	public void setChk(String chk) {
//		this.chk = chk;
//	}
	public String getCreditNote() {
		return creditNote;
	}
	public void setCreditNote(String creditNote) {
		this.creditNote = creditNote;
	}
	public String getCreditNoteYn() {
		return creditNoteYn;
	}
	public void setCreditNoteYn(String creditNoteYn) {
		this.creditNoteYn = creditNoteYn;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getProformaInvoiceNo() {
		return proformaInvoiceNo;
	}
	public void setProformaInvoiceNo(String proformaInvoiceNo) {
		this.proformaInvoiceNo = proformaInvoiceNo;
	}
	public String getFinalInvoiceNo() {
		return finalInvoiceNo;
	}
	public void setFinalInvoiceNo(String finalInvoiceNo) {
		this.finalInvoiceNo = finalInvoiceNo;
	}
	public String getDocMT() {
		return docMT;
	}
	public void setDocMT(String docMT) {
		this.docMT = docMT;
	}
	public String getIssuedMT() {
		return issuedMT;
	}
	public void setIssuedMT(String issuedMT) {
		this.issuedMT = issuedMT;
	}
	public String getOperationMT() {
		return operationMT;
	}
	public void setOperationMT(String operationMT) {
		this.operationMT = operationMT;
	}
	public String getIssuedStatus() {
		return issuedStatus;
	}
	public void setIssuedStatus(String issuedStatus) {
		this.issuedStatus = issuedStatus;
	}
	public String getCntDoc() {
		return cntDoc;
	}
	public void setCntDoc(String cntDoc) {
		this.cntDoc = cntDoc;
	}
	public String getAdviceNo() {
		return adviceNo;
	}
	public void setAdviceNo(String adviceNo) {
		this.adviceNo = adviceNo;
	}
	public String getAdviceSeq() {
		return adviceSeq;
	}
	public void setAdviceSeq(String adviceSeq) {
		this.adviceSeq = adviceSeq;
	}
	public String getCustomerType() {
		return customerType;
	}
	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
	public String getPayerCd() {
		return payerCd;
	}
	public void setPayerCd(String payerCd) {
		this.payerCd = payerCd;
	}
	public String getPayerTp() {
		return payerTp;
	}
	public void setPayerTp(String payerTp) {
		this.payerTp = payerTp;
	}
	public String getResponsibilityCompanyCd() {
		return responsibilityCompanyCd;
	}
	public void setResponsibilityCompanyCd(String responsibilityCompanyCd) {
		this.responsibilityCompanyCd = responsibilityCompanyCd;
	}
	public String getResponsibilityCompanyTpCd() {
		return responsibilityCompanyTpCd;
	}
	public void setResponsibilityCompanyTpCd(String responsibilityCompanyTpCd) {
		this.responsibilityCompanyTpCd = responsibilityCompanyTpCd;
	}
	public String getOperTpCd() {
		return operTpCd;
	}
	public void setOperTpCd(String operTpCd) {
		this.operTpCd = operTpCd;
	}
	public String getRefInvNo() {
		return refInvNo;
	}
	public void setRefInvNo(String refInvNo) {
		this.refInvNo = refInvNo;
	}
	public String getAddCreditIvNo() {
		return addCreditIvNo;
	}
	public void setAddCreditIvNo(String addCreditIvNo) {
		this.addCreditIvNo = addCreditIvNo;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getShpCd() {
		return shpCd;
	}
	public void setShpCd(String shpCd) {
		this.shpCd = shpCd;
	}
	public String getCnsCd() {
		return cnsCd;
	}
	public void setCnsCd(String cnsCd) {
		this.cnsCd = cnsCd;
	}
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getSubTrf() {
		return subTrf;
	}
	public void setSubTrf(String subTrf) {
		this.subTrf = subTrf;
	}
	public String getVatChk() {
		return vatChk;
	}
	public void setVatChk(String vatChk) {
		this.vatChk = vatChk;
	}
	public String getIvTp() {
		return ivTp;
	}
	public void setIvTp(String ivTp) {
		this.ivTp = ivTp;
	}
	public String getIvPrfx() {
		return ivPrfx;
	}
	public String getIvAddr() {
		return ivAddr;
	}
	public void setIvAddr(String ivAddr) {
		this.ivAddr = ivAddr;
	}
	public void setIvPrfx(String ivPrfx) {
		this.ivPrfx = ivPrfx;
	}
	public String getIvNo() {
		return ivNo;
	}
	public void setIvNo(String ivNo) {
		this.ivNo = ivNo;
	}
	public String getRowID() {
		return rowID;
	}
	public void setRowID(String rowID) {
		this.rowID = rowID;
	}
	public String getIvAmt() {
		return ivAmt;
	}
	public void setIvAmt(String ivAmt) {
		this.ivAmt = ivAmt;
	}
	public String getGatherNo() {
		return gatherNo;
	}
	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}
	public String getGatherSeq() {
		return gatherSeq;
	}
	public void setGatherSeq(String gatherSeq) {
		this.gatherSeq = gatherSeq;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getGatherTpCd() {
		return gatherTpCd;
	}
	public void setGatherTpCd(String gatherTpCd) {
		this.gatherTpCd = gatherTpCd;
	}
	public String getTrfDesc() {
		return trfDesc;
	}
	public void setTrfDesc(String trfDesc) {
		this.trfDesc = trfDesc;
	}
	public String getApplyRate() {
		return applyRate;
	}
	public void setApplyRate(String applyRate) {
		this.applyRate = applyRate;
	}
	public String getApplyAmt() {
		return applyAmt;
	}
	public void setApplyAmt(String applyAmt) {
		this.applyAmt = applyAmt;
	}
	public String getStdRate() {
		return stdRate;
	}
	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
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
	public String getFwrAgent() {
		return fwrAgent;
	}
	public void setFwrAgent(String fwrAgent) {
		this.fwrAgent = fwrAgent;
	}
	public String getShipper() {
		return shipper;
	}
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	public String getConsignee() {
		return consignee;
	}
	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}
	public String getTaxPrtg() {
		return taxPrtg;
	}
	public void setTaxPrtg(String taxPrtg) {
		this.taxPrtg = taxPrtg;
	}
	public String getTaxAmt() {
		return taxAmt;
	}
	public void setTaxAmt(String taxAmt) {
		this.taxAmt = taxAmt;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getPrUserId() {
		return prUserId;
	}
	public void setPrUserId(String prUserId) {
		this.prUserId = prUserId;
	}
	public String getOpClassCd() {
		return opClassCd;
	}
	public void setOpClassCd(String opClassCd) {
		this.opClassCd = opClassCd;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getImdgClass() {
		return imdgClass;
	}
	public void setImdgClass(String imdgClass) {
		this.imdgClass = imdgClass;
	}
	public String getTransportTpCd() {
		return transportTpCd;
	}
	public void setTransportTpCd(String transportTpCd) {
		this.transportTpCd = transportTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getAllowCreateAddCredit() {
		return allowCreateAddCredit;
	}
	public void setAllowCreateAddCredit(String allowCreateAddCredit) {
		this.allowCreateAddCredit = allowCreateAddCredit;
	}
	public String getDetraccionChk() {
		return detraccionChk;
	}
	public void setDetraccionChk(String detraccionChk) {
		this.detraccionChk = detraccionChk;
	}
	public String getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getNetAmt() {
		return netAmt;
	}
	public void setNetAmt(String netAmt) {
		this.netAmt = netAmt;
	}
	public String getIvDetraccionChk() {
		return ivDetraccionChk;
	}
	public void setIvDetraccionChk(String ivDetraccionChk) {
		this.ivDetraccionChk = ivDetraccionChk;
	}
	public String getTmnlUnitOfCharge() {
		return tmnlUnitOfCharge;
	}
	public void setTmnlUnitOfCharge(String tmnlUnitOfCharge) {
		this.tmnlUnitOfCharge = tmnlUnitOfCharge;
	}
	public String getTmnlDetraccionChk() {
		return tmnlDetraccionChk;
	}
	public void setTmnlDetraccionChk(String tmnlDetraccionChk) {
		this.tmnlDetraccionChk = tmnlDetraccionChk;
	}
	public String getTmnlActCd() {
		return tmnlActCd;
	}
	public void setTmnlActCd(String tmnlActCd) {
		this.tmnlActCd = tmnlActCd;
	}
	public String getTmnlCostCenter() {
		return tmnlCostCenter;
	}
	public void setTmnlCostCenter(String tmnlCostCenter) {
		this.tmnlCostCenter = tmnlCostCenter;
	}
	public String getTmnlAccountCd() {
		return tmnlAccountCd;
	}
	public void setTmnlAccountCd(String tmnlAccountCd) {
		this.tmnlAccountCd = tmnlAccountCd;
	}
	public String getTmnlAccountDesc() {
		return tmnlAccountDesc;
	}
	public void setTmnlAccountDesc(String tmnlAccountDesc) {
		this.tmnlAccountDesc = tmnlAccountDesc;
	}
	public String getApmtTariffDefinition() {
		return apmtTariffDefinition;
	}
	public void setApmtTariffDefinition(String apmtTariffDefinition) {
		this.apmtTariffDefinition = apmtTariffDefinition;
	}
	public String getCancelYn() {
		return cancelYn;
	}
	public void setCancelYn(String cancelYn) {
		this.cancelYn = cancelYn;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
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
	public String getBlSnNo() {
		return blSnNo;
	}
	public void setBlSnNo(String blSnNo) {
		this.blSnNo = blSnNo;
	}
	public String getUnitPrc() {
		return unitPrc;
	}
	public void setUnitPrc(String unitPrc) {
		this.unitPrc = unitPrc;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public ArrayList<ProformaInvoiceItem> getBlItems() {
		return blItems;
	}
	public void setBlItems(ArrayList<ProformaInvoiceItem> blItems) {
		this.blItems = blItems;
	}
	public ArrayList<ProformaInvoiceItem> getSnItems() {
		return snItems;
	}
	public void setSnItems(ArrayList<ProformaInvoiceItem> snItems) {
		this.snItems = snItems;
	}
	public String getIvTpNm() {
		return ivTpNm;
	}
	public void setIvTpNm(String ivTpNm) {
		this.ivTpNm = ivTpNm;
	}
	public String getPaidYn() {
		return paidYn;
	}
	public void setPaidYn(String paidYn) {
		this.paidYn = paidYn;
	}
	public String getCostCenter() {
		return costCenter;
	}
	public void setCostCenter(String costCenter) {
		this.costCenter = costCenter;
	}
	public String getIvDt() {
		return ivDt;
	}
	public void setIvDt(String ivDt) {
		this.ivDt = ivDt;
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
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public ArrayList<ProformaInvoiceItem> getMfItems() {
		return mfItems;
	}
	public void setMfItems(ArrayList<ProformaInvoiceItem> mfItems) {
		this.mfItems = mfItems;
	}
	public String getEstDt() {
		return estDt;
	}
	public void setEstDt(String estDt) {
		this.estDt = estDt;
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
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getItemStatus() {
		return itemStatus;
	}
	public void setItemStatus(String itemStatus) {
		this.itemStatus = itemStatus;
	}
	public String getHgFlag() {
		return hgFlag;
	}
	public void setHgFlag(String hgFlag) {
		this.hgFlag = hgFlag;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getFinancialCode() {
		return financialCode;
	}
	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}
	public String getRefNo3() {
		return refNo3;
	}
	public void setRefNo3(String refNo3) {
		this.refNo3 = refNo3;
	}
	public String getPayerTaxNo() {
		return payerTaxNo;
	}
	public void setPayerTaxNo(String payerTaxNo) {
		this.payerTaxNo = payerTaxNo;
	}
	public String getPayerTel() {
		return payerTel;
	}
	public void setPayerTel(String payerTel) {
		this.payerTel = payerTel;
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
	public String getTmnlTaxNo() {
		return tmnlTaxNo;
	}
	public void setTmnlTaxNo(String tmnlTaxNo) {
		this.tmnlTaxNo = tmnlTaxNo;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getGroupingField() {
		return groupingField;
	}
	public void setGroupingField(String groupingField) {
		this.groupingField = groupingField;
	}
	public String getAdhocYn() {
		return adhocYn;
	}
	public void setAdhocYn(String adhocYn) {
		this.adhocYn = adhocYn;
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
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getEngSnm() {
		return engSnm;
	}
	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
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
	public String getTrfDescr() {
		return trfDescr;
	}
	public void setTrfDescr(String trfDescr) {
		this.trfDescr = trfDescr;
	}
	public String getCrcyCd() {
		return crcyCd;
	}
	public void setCrcyCd(String crcyCd) {
		this.crcyCd = crcyCd;
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
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
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
	public String getAplyRate() {
		return aplyRate;
	}
	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}
	public String getExRate() {
		return exRate;
	}
	public void setExRate(String exRate) {
		this.exRate = exRate;
	}
	public String getAplyAmt() {
		return aplyAmt;
	}
	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
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
	public String getEtw() {
		return etw;
	}
	public void setEtw(String etw) {
		this.etw = etw;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
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
	public String getApplyFreeDays() {
		return applyFreeDays;
	}
	public void setApplyFreeDays(String applyFreeDays) {
		this.applyFreeDays = applyFreeDays;
	}
	public String getRefNo2() {
		return refNo2;
	}
	public void setRefNo2(String refNo2) {
		this.refNo2 = refNo2;
	}
	public String getFirstChargeDate() {
		return firstChargeDate;
	}
	public void setFirstChargeDate(String firstChargeDate) {
		this.firstChargeDate = firstChargeDate;
	}
	public String getLastChargeDate() {
		return lastChargeDate;
	}
	public void setLastChargeDate(String lastChargeDate) {
		this.lastChargeDate = lastChargeDate;
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
	public String getPaymentStorageDate() {
		return paymentStorageDate;
	}
	public void setPaymentStorageDate(String paymentStorageDate) {
		this.paymentStorageDate = paymentStorageDate;
	}
	public String getFreeStorageEndDate() {
		return freeStorageEndDate;
	}
	public void setFreeStorageEndDate(String freeStorageEndDate) {
		this.freeStorageEndDate = freeStorageEndDate;
	}
	public String getTotalAmtString() {
		return totalAmtString;
	}
	public void setTotalAmtString(String totalAmtString) {
		this.totalAmtString = totalAmtString;
	}

}
