/**
* InvoicingAdviceItem.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dataitem.audit.AuditItem;

/**
 * @author pmtuan
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class InvoiceAdviceItem extends AuditItem {
	private String vesselCallingID;
	private String vesselName;
	private String adviceNo;
	private String isExisted; /* Y N or NULL */
	private String partnerTypeCode;
	private String partnerTypeName;
	private String partnerCode;
	private String partnerName;
	private String tarrifTypeCode;
	private String tarrifTypeName;
	private String operationTypeCode;
	private String operationTypeName;
	private String commodityCode;
	private String handleAmount;
	private String ackStatusCode;
	private String eta;
	private String etd;
	private String shippingAgent;
	private String loadding;
	private String discharging;
	private String advSeq;
	private String no; // fix bug caused by flex
	private String searchType; // ACK action
	private String updUserId;
	private String rmk;
	private String itChk;
	private String workingStatus;

	// detail
	private String payerTpCd;
	private String payerTpName;
	private String payerCd;
	private String payerName;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String callSign;
	private String vslNm;
	private String inbVoy;
	private String outbVoy;
	private String etaVessel;
	private String etdVessel;
	private String etbVessel;
	private String etwVessel;
	private String vslTp;
	private String vslOperator;
	private String voyage;
	private String berthLoc;
	private String codeCostCenter;
	private String codeFinancial;
	private String codeDescription;
	private String codeSBU;
	private String typeDelivery;
	private String typeCargo;
	private String dateUpdate;

//    private String advSeq ;
	private String blNo;
	private String shipgNoteNo;
	private String wgt;
	private String msrmt;
	private String qty;
	private String cargoTp;
	private String accNo;
	private String addr;
	private String docNo;
	private String confirm;
	private String loadingTotalWgt;
	private String loadingTotalMsrmt;
	private String loadingTotalQty;
	private String dischargingTotalWgt;
	private String dischargingTotalMsrmt;
	private String dischargingTotalQty;

	// Invoicing Advice History
	private String chgDt;
	private String oldVal;
	private String newVal;
	private String histSeq;
	private String validateNumber;
	private String arrvSaId;

	private int totalTariffs;
	private String confirmAcceptPayment;

	// List
	private List commodityCodeList;
	private List partnerCodedTypeList;
	private List detailList;

	private Date updateTimeField;
	private ArrayList<InvoiceAdviceDetailItem> items;

	private String authCd;

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	/**
	 * @return Returns the updUserId.
	 */
	public String getUpdUserId() {
		return updUserId;
	}

	/**
	 * @param updUserId The updUserId to set.
	 */
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}

	public String getAckStatusCode() {
		return ackStatusCode;
	}

	public void setAckStatusCode(String ackStatusCode) {
		this.ackStatusCode = ackStatusCode;
	}

	public String getAdviceNo() {
		return adviceNo;
	}

	public void setAdviceNo(String adviceNo) {
		this.adviceNo = adviceNo;
	}

	public String getCommodityCode() {
		return commodityCode;
	}

	public void setCommodityCode(String commodityCode) {
		this.commodityCode = commodityCode;
	}

	public String getDischarging() {
		return discharging;
	}

	public void setDischarging(String discharging) {
		this.discharging = discharging;
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

	public String getHandleAmount() {
		return handleAmount;
	}

	public void setHandleAmount(String handleAmount) {
		this.handleAmount = handleAmount;
	}

	public String getLoadding() {
		return loadding;
	}

	public void setLoadding(String loadding) {
		this.loadding = loadding;
	}

	public String getOperationTypeCode() {
		return operationTypeCode;
	}

	public void setOperationTypeCode(String operationTypeCode) {
		this.operationTypeCode = operationTypeCode;
	}

	public String getOperationTypeName() {
		return operationTypeName;
	}

	public void setOperationTypeName(String operationTypeName) {
		this.operationTypeName = operationTypeName;
	}

	public String getPartnerCode() {
		return partnerCode;
	}

	public void setPartnerCode(String partnerCode) {
		this.partnerCode = partnerCode;
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getPartnerTypeCode() {
		return partnerTypeCode;
	}

	public void setPartnerTypeCode(String partnerTypeCode) {
		this.partnerTypeCode = partnerTypeCode;
	}

	public String getPartnerTypeName() {
		return partnerTypeName;
	}

	public void setPartnerTypeName(String partnerTypeName) {
		this.partnerTypeName = partnerTypeName;
	}

	public String getShippingAgent() {
		return shippingAgent;
	}

	public void setShippingAgent(String shippingAgent) {
		this.shippingAgent = shippingAgent;
	}

	public String getTarrifTypeCode() {
		return tarrifTypeCode;
	}

	public void setTarrifTypeCode(String tarrifTypeCode) {
		this.tarrifTypeCode = tarrifTypeCode;
	}

	public String getTarrifTypeName() {
		return tarrifTypeName;
	}

	public void setTarrifTypeName(String tarrifTypeName) {
		this.tarrifTypeName = tarrifTypeName;
	}

	public String getVesselCallingID() {
		return vesselCallingID;
	}

	public void setVesselCallingID(String vesselCallingID) {
		this.vesselCallingID = vesselCallingID;
	}

	public String getVesselName() {
		return vesselName;
	}

	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}

	public String getAdvSeq() {
		return advSeq;
	}

	public void setAdvSeq(String advSeq) {
		this.advSeq = advSeq;
	}

	public String getIsExisted() {
		return isExisted;
	}

	public void setIsExisted(String isExisted) {
		this.isExisted = isExisted;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public Date getUpdateTimeField() {
		return updateTimeField;
	}

	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}

	public ArrayList<InvoiceAdviceDetailItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<InvoiceAdviceDetailItem> items) {
		this.items = items;
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

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

	public String getCallYear() {
		return callYear;
	}

	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}

	public String getCallSeq() {
		return callSeq;
	}

	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}

	public String getCallSign() {
		return callSign;
	}

	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getInbVoy() {
		return inbVoy;
	}

	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}

	public String getOutbVoy() {
		return outbVoy;
	}

	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}

	public String getEtaVessel() {
		return etaVessel;
	}

	public void setEtaVessel(String etaVessel) {
		this.etaVessel = etaVessel;
	}

	public String getEtdVessel() {
		return etdVessel;
	}

	public void setEtdVessel(String etdVessel) {
		this.etdVessel = etdVessel;
	}

	public String getEtbVessel() {
		return etbVessel;
	}

	public void setEtbVessel(String etbVessel) {
		this.etbVessel = etbVessel;
	}

	public String getEtwVessel() {
		return etwVessel;
	}

	public void setEtwVessel(String etwVessel) {
		this.etwVessel = etwVessel;
	}

	public String getVslTp() {
		return vslTp;
	}

	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}

	public String getVslOperator() {
		return vslOperator;
	}

	public void setVslOperator(String vslOperator) {
		this.vslOperator = vslOperator;
	}

	public String getVoyage() {
		return voyage;
	}

	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}

	public String getBerthLoc() {
		return berthLoc;
	}

	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}

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

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getCargoTp() {
		return cargoTp;
	}

	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
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

	public String getDocNo() {
		return docNo;
	}

	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}

	public String getItChk() {
		return itChk;
	}

	public void setItChk(String itChk) {
		this.itChk = itChk;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getLoadingTotalWgt() {
		return loadingTotalWgt;
	}

	public void setLoadingTotalWgt(String loadingTotalWgt) {
		this.loadingTotalWgt = loadingTotalWgt;
	}

	public String getLoadingTotalMsrmt() {
		return loadingTotalMsrmt;
	}

	public void setLoadingTotalMsrmt(String loadingTotalMsrmt) {
		this.loadingTotalMsrmt = loadingTotalMsrmt;
	}

	public String getLoadingTotalQty() {
		return loadingTotalQty;
	}

	public void setLoadingTotalQty(String loadingTotalQty) {
		this.loadingTotalQty = loadingTotalQty;
	}

	public String getDischargingTotalWgt() {
		return dischargingTotalWgt;
	}

	public void setDischargingTotalWgt(String dischargingTotalWgt) {
		this.dischargingTotalWgt = dischargingTotalWgt;
	}

	public String getDischargingTotalMsrmt() {
		return dischargingTotalMsrmt;
	}

	public void setDischargingTotalMsrmt(String dischargingTotalMsrmt) {
		this.dischargingTotalMsrmt = dischargingTotalMsrmt;
	}

	public String getDischargingTotalQty() {
		return dischargingTotalQty;
	}

	public void setDischargingTotalQty(String dischargingTotalQty) {
		this.dischargingTotalQty = dischargingTotalQty;
	}

	public String getChgDt() {
		return chgDt;
	}

	public void setChgDt(String chgDt) {
		this.chgDt = chgDt;
	}

	public String getOldVal() {
		return oldVal;
	}

	public void setOldVal(String oldVal) {
		this.oldVal = oldVal;
	}

	public String getNewVal() {
		return newVal;
	}

	public void setNewVal(String newVal) {
		this.newVal = newVal;
	}

	public String getHistSeq() {
		return histSeq;
	}

	public void setHistSeq(String histSeq) {
		this.histSeq = histSeq;
	}

	public String getValidateNumber() {
		return validateNumber;
	}

	public void setValidateNumber(String validateNumber) {
		this.validateNumber = validateNumber;
	}

	public String getArrvSaId() {
		return arrvSaId;
	}

	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}

	public int getTotalTariffs() {
		return totalTariffs;
	}

	public void setTotalTariffs(int totalTariffs) {
		this.totalTariffs = totalTariffs;
	}

	public String getConfirmAcceptPayment() {
		return confirmAcceptPayment;
	}

	public void setConfirmAcceptPayment(String confirmAcceptPayment) {
		this.confirmAcceptPayment = confirmAcceptPayment;
	}

	public List getCommodityCodeList() {
		return commodityCodeList;
	}

	public void setCommodityCodeList(List commodityCodeList) {
		this.commodityCodeList = commodityCodeList;
	}

	public List getPartnerCodedTypeList() {
		return partnerCodedTypeList;
	}

	public void setPartnerCodedTypeList(List partnerCodedTypeList) {
		this.partnerCodedTypeList = partnerCodedTypeList;
	}

	public List getDetailList() {
		return detailList;
	}

	public void setDetailList(List detailList) {
		this.detailList = detailList;
	}

//	public List getJpvcList() {
//		return jpvcList;
//	}
//	public void setJpvcList(List jpvcList) {
//		this.jpvcList = jpvcList;
//	}
//	public List getBlList() {
//		return blList;
//	}
//	public void setBlList(List blList) {
//		this.blList = blList;
//	}
//	public List getSnList() {
//		return snList;
//	}
//	public void setSnList(List snList) {
//		this.snList = snList;
//	}
	public String getAuthCd() {
		return authCd;
	}

	public void setAuthCd(String authCd) {
		this.authCd = authCd;
	}

	public String getCodeCostCenter() {
		return codeCostCenter;
	}

	public void setCodeCostCenter(String codeCostCenter) {
		this.codeCostCenter = codeCostCenter;
	}

	public String getCodeFinancial() {
		return codeFinancial;
	}

	public void setCodeFinancial(String codeFinancial) {
		this.codeFinancial = codeFinancial;
	}

	public String getCodeDescription() {
		return codeDescription;
	}

	public void setCodeDescription(String codeDescription) {
		this.codeDescription = codeDescription;
	}

	public String getCodeSBU() {
		return codeSBU;
	}

	public void setCodeSBU(String codeSBU) {
		this.codeSBU = codeSBU;
	}

	public String getTypeDelivery() {
		return typeDelivery;
	}

	public void setTypeDelivery(String typeDelivery) {
		this.typeDelivery = typeDelivery;
	}

	public String getTypeCargo() {
		return typeCargo;
	}

	public void setTypeCargo(String typeCargo) {
		this.typeCargo = typeCargo;
	}

	public String getDateUpdate() {
		return dateUpdate;
	}

	public void setDateUpdate(String dateUpdate) {
		this.dateUpdate = dateUpdate;
	}

}
