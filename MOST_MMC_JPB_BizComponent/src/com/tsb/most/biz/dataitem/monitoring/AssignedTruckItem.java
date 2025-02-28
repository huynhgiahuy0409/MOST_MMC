/**
* AssignmentLorrysItem.java
*
* Created on   : 2008-01-15
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-15   Miss Nam-Sook Chang  1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.monitoring;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author USER
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class AssignedTruckItem extends DataItem {

    private String vslCallId;
    private String blNo;
    private String estDt; 
    private String tsptCd;
    private String lorryNo;
    private String driver;
    private String exprDt;
    private String licsNo;
    private String gateInDt;
    private String ptnrCd;
    private String seq;
    private String aplyYmd;
    private String shipgNoteNo;
    private String exprYmd;
    private String gateOutDt;
    private String driverId;
    private String lorryId;
   
    private String vslNm;
    private String doNo;
    private String consignee;
    private String shipper;
    private String eta;
    private String atb;
    private String atu;
    private String workingMode;
    private String berthLocation;
    private String commodity;
    private String storageLocation;
    private String status;
    private String delvTpCd;
    private String delvTpNm;
    private String whLoc;
    
    private String gateTxnNo;
    private String grNo;
    private String sdoNo;
    
    private String printCIR;
    private String firstWgtTime;
    private String secondWgtTime;
    private String weightCheckYn;
    
    private String chassisNo;
    private String rmk;
    private String shpCsnNm;
    private String validDt;
    private String tsptrQty;
    private String firstWgt;
    private String secondWgt;
    private String actMt;
    private String actM3;
    private String actQty;
    private String actMtIndirect;
    private String actM3Indirect;
    private String actQtyIndirect;
    private String mfDocId;
    private String securityIn;
    private String loadCargo;
    private String dischargeCargo;
    private String handlingIn;
    private String handlingOut;
    private String cirRmk;
    private String lotNo;
    private String gateNm;
    private String whLocNm;
    private String cargoNm;
    private String cgTpCd;
    private String cgTpNm;
    private String unitNo;
    private String masterBlNo;
    private String bookingNo;
    private String brandCd;
    private String modelCd;
    private String unitWgt;
    private String scn;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getEstDt() {
		return estDt;
	}
	public void setEstDt(String estDt) {
		this.estDt = estDt;
	}
	public String getTsptCd() {
		return tsptCd;
	}
	public void setTsptCd(String tsptCd) {
		this.tsptCd = tsptCd;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getExprDt() {
		return exprDt;
	}
	public void setExprDt(String exprDt) {
		this.exprDt = exprDt;
	}
	public String getLicsNo() {
		return licsNo;
	}
	public void setLicsNo(String licsNo) {
		this.licsNo = licsNo;
	}
	public String getGateInDt() {
		return gateInDt;
	}
	public void setGateInDt(String gateInDt) {
		this.gateInDt = gateInDt;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getAplyYmd() {
		return aplyYmd;
	}
	public void setAplyYmd(String aplyYmd) {
		this.aplyYmd = aplyYmd;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getExprYmd() {
		return exprYmd;
	}
	public void setExprYmd(String exprYmd) {
		this.exprYmd = exprYmd;
	}
	public String getGateOutDt() {
		return gateOutDt;
	}
	public void setGateOutDt(String gateOutDt) {
		this.gateOutDt = gateOutDt;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getConsignee() {
		return consignee;
	}
	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}
	public String getShipper() {
		return shipper;
	}
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
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
	public String getWorkingMode() {
		return workingMode;
	}
	public void setWorkingMode(String workingMode) {
		this.workingMode = workingMode;
	}
	public String getBerthLocation() {
		return berthLocation;
	}
	public void setBerthLocation(String berthLocation) {
		this.berthLocation = berthLocation;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getStorageLocation() {
		return storageLocation;
	}
	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getPrintCIR() {
		return printCIR;
	}
	public void setPrintCIR(String printCIR) {
		this.printCIR = printCIR;
	}
	public String getFirstWgtTime() {
		return firstWgtTime;
	}
	public void setFirstWgtTime(String firstWgtTime) {
		this.firstWgtTime = firstWgtTime;
	}
	public String getSecondWgtTime() {
		return secondWgtTime;
	}
	public void setSecondWgtTime(String secondWgtTime) {
		this.secondWgtTime = secondWgtTime;
	}
	public String getWeightCheckYn() {
		return weightCheckYn;
	}
	public void setWeightCheckYn(String weightCheckYn) {
		this.weightCheckYn = weightCheckYn;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getShpCsnNm() {
		return shpCsnNm;
	}
	public void setShpCsnNm(String shpCsnNm) {
		this.shpCsnNm = shpCsnNm;
	}
	public String getValidDt() {
		return validDt;
	}
	public void setValidDt(String validDt) {
		this.validDt = validDt;
	}
	public String getTsptrQty() {
		return tsptrQty;
	}
	public void setTsptrQty(String tsptrQty) {
		this.tsptrQty = tsptrQty;
	}
	public String getFirstWgt() {
		return firstWgt;
	}
	public void setFirstWgt(String firstWgt) {
		this.firstWgt = firstWgt;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}
	public String getActMt() {
		return actMt;
	}
	public void setActMt(String actMt) {
		this.actMt = actMt;
	}
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getActMtIndirect() {
		return actMtIndirect;
	}
	public void setActMtIndirect(String actMtIndirect) {
		this.actMtIndirect = actMtIndirect;
	}
	public String getActQtyIndirect() {
		return actQtyIndirect;
	}
	public void setActQtyIndirect(String actQtyIndirect) {
		this.actQtyIndirect = actQtyIndirect;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getSecurityIn() {
		return securityIn;
	}
	public void setSecurityIn(String securityIn) {
		this.securityIn = securityIn;
	}
	public String getLoadCargo() {
		return loadCargo;
	}
	public void setLoadCargo(String loadCargo) {
		this.loadCargo = loadCargo;
	}
	public String getDischargeCargo() {
		return dischargeCargo;
	}
	public void setDischargeCargo(String dischargeCargo) {
		this.dischargeCargo = dischargeCargo;
	}
	public String getHandlingIn() {
		return handlingIn;
	}
	public void setHandlingIn(String handlingIn) {
		this.handlingIn = handlingIn;
	}
	public String getHandlingOut() {
		return handlingOut;
	}
	public void setHandlingOut(String handlingOut) {
		this.handlingOut = handlingOut;
	}
	public String getCirRmk() {
		return cirRmk;
	}
	public void setCirRmk(String cirRmk) {
		this.cirRmk = cirRmk;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getGateNm() {
		return gateNm;
	}
	public void setGateNm(String gateNm) {
		this.gateNm = gateNm;
	}
	public String getWhLocNm() {
		return whLocNm;
	}
	public void setWhLocNm(String whLocNm) {
		this.whLocNm = whLocNm;
	}
	public String getCargoNm() {
		return cargoNm;
	}
	public void setCargoNm(String cargoNm) {
		this.cargoNm = cargoNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getUnitWgt() {
		return unitWgt;
	}
	public void setUnitWgt(String unitWgt) {
		this.unitWgt = unitWgt;
	}
	public String getActM3() {
		return actM3;
	}
	public void setActM3(String actM3) {
		this.actM3 = actM3;
	}
	public String getActM3Indirect() {
		return actM3Indirect;
	}
	public void setActM3Indirect(String actM3Indirect) {
		this.actM3Indirect = actM3Indirect;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
}
