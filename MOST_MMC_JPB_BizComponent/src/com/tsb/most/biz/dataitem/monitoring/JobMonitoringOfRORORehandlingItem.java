package com.tsb.most.biz.dataitem.monitoring;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class JobMonitoringOfRORORehandlingItem extends DataItem {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String delvTpCd;
    private String delvTpNm;
    private String doNo;
    private String nosOfUnit;

    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String unitNo;
    private String dischargedDate;
    private String inDate;
    private String unitYardLoc;

    private String cdNm;
    private String cd;
    private String roroSeq;
    private String outDate;
    
    private String loginId;
    private String statCd;
    private String jobPurpCd;
    private String ioMode;
    private String ioSeq;
    private String action;
    private String statNm;
    private String confirmedDate;
    private String gateInDate;
    private String gateOutDate;
    private String sdoNo;
    private String gateTicketNo;
    
    private String driverId;
    private String driverNm;
    private String truckNo;
    
    private String mt;
    private String m3;
    private String qty;
    private String jobPurpNm;
    private String jobSeq;
    
    //statistic report
    private String vslCd;
    private String vslNm;
    private String vslManifestNo;
    private String docMt;
    private String docQty;
    private String releasedMt;
    private String releasedQty;
    private String actMt;
    private String actQty;
    private String remainedD;
    private String remainedY;
    private String remainedH;
    private String workingDate;
    private String shiftNm;
    private String hatchNo;
    private String opeTypeNm;
    private String direction;
    
    private String lastVinOfGateTicketYn;
    private List cargoTypeItems;
    //Export RORO
    private String loadingTime;
    private String crane;
    private String stevedoreId;
    private String bookingNo;
    private String shipgNoteNo;
    private String serviceOrderNo;
    private String rhdlNo;
    private String rhdlMode;
    private String prevDirection;
    private String grNo;
    private String deletingGiYn;
    
    //Rehandling
    private String rhdlModeNm;
    private String nosOfChangeVesel;
    private String nosOfReturnToShipper;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getCatgNm() {
		return catgNm;
	}
	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
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
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getNosOfUnit() {
		return nosOfUnit;
	}
	public void setNosOfUnit(String nosOfUnit) {
		this.nosOfUnit = nosOfUnit;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getDischargedDate() {
		return dischargedDate;
	}
	public void setDischargedDate(String dischargedDate) {
		this.dischargedDate = dischargedDate;
	}
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
	}
	public String getUnitYardLoc() {
		return unitYardLoc;
	}
	public void setUnitYardLoc(String unitYardLoc) {
		this.unitYardLoc = unitYardLoc;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
	}
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getIoMode() {
		return ioMode;
	}
	public void setIoMode(String ioMode) {
		this.ioMode = ioMode;
	}
	public String getIoSeq() {
		return ioSeq;
	}
	public void setIoSeq(String ioSeq) {
		this.ioSeq = ioSeq;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}
	public String getConfirmedDate() {
		return confirmedDate;
	}
	public void setConfirmedDate(String confirmedDate) {
		this.confirmedDate = confirmedDate;
	}
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getGateOutDate() {
		return gateOutDate;
	}
	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getGateTicketNo() {
		return gateTicketNo;
	}
	public void setGateTicketNo(String gateTicketNo) {
		this.gateTicketNo = gateTicketNo;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getMt() {
		return mt;
	}
	public void setMt(String mt) {
		this.mt = mt;
	}
	public String getM3() {
		return m3;
	}
	public void setM3(String m3) {
		this.m3 = m3;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getJobPurpNm() {
		return jobPurpNm;
	}
	public void setJobPurpNm(String jobPurpNm) {
		this.jobPurpNm = jobPurpNm;
	}
	public String getJobSeq() {
		return jobSeq;
	}
	public void setJobSeq(String jobSeq) {
		this.jobSeq = jobSeq;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getVslManifestNo() {
		return vslManifestNo;
	}
	public void setVslManifestNo(String vslManifestNo) {
		this.vslManifestNo = vslManifestNo;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getReleasedMt() {
		return releasedMt;
	}
	public void setReleasedMt(String releasedMt) {
		this.releasedMt = releasedMt;
	}
	public String getReleasedQty() {
		return releasedQty;
	}
	public void setReleasedQty(String releasedQty) {
		this.releasedQty = releasedQty;
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
	public String getRemainedD() {
		return remainedD;
	}
	public void setRemainedD(String remainedD) {
		this.remainedD = remainedD;
	}
	public String getRemainedY() {
		return remainedY;
	}
	public void setRemainedY(String remainedY) {
		this.remainedY = remainedY;
	}
	public String getRemainedH() {
		return remainedH;
	}
	public void setRemainedH(String remainedH) {
		this.remainedH = remainedH;
	}
	public String getWorkingDate() {
		return workingDate;
	}
	public void setWorkingDate(String workingDate) {
		this.workingDate = workingDate;
	}
	public String getShiftNm() {
		return shiftNm;
	}
	public void setShiftNm(String shiftNm) {
		this.shiftNm = shiftNm;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getOpeTypeNm() {
		return opeTypeNm;
	}
	public void setOpeTypeNm(String opeTypeNm) {
		this.opeTypeNm = opeTypeNm;
	}
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public String getLastVinOfGateTicketYn() {
		return lastVinOfGateTicketYn;
	}
	public void setLastVinOfGateTicketYn(String lastVinOfGateTicketYn) {
		this.lastVinOfGateTicketYn = lastVinOfGateTicketYn;
	}
	public String getLoadingTime() {
		return loadingTime;
	}
	public void setLoadingTime(String loadingTime) {
		this.loadingTime = loadingTime;
	}
	public String getCrane() {
		return crane;
	}
	public void setCrane(String crane) {
		this.crane = crane;
	}
	public String getStevedoreId() {
		return stevedoreId;
	}
	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getServiceOrderNo() {
		return serviceOrderNo;
	}
	public void setServiceOrderNo(String serviceOrderNo) {
		this.serviceOrderNo = serviceOrderNo;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getPrevDirection() {
		return prevDirection;
	}
	public void setPrevDirection(String prevDirection) {
		this.prevDirection = prevDirection;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getDeletingGiYn() {
		return deletingGiYn;
	}
	public void setDeletingGiYn(String deletingGiYn) {
		this.deletingGiYn = deletingGiYn;
	}
	public String getRhdlModeNm() {
		return rhdlModeNm;
	}
	public void setRhdlModeNm(String rhdlModeNm) {
		this.rhdlModeNm = rhdlModeNm;
	}
	public String getNosOfChangeVesel() {
		return nosOfChangeVesel;
	}
	public void setNosOfChangeVesel(String nosOfChangeVesel) {
		this.nosOfChangeVesel = nosOfChangeVesel;
	}
	public String getNosOfReturnToShipper() {
		return nosOfReturnToShipper;
	}
	public void setNosOfReturnToShipper(String nosOfReturnToShipper) {
		this.nosOfReturnToShipper = nosOfReturnToShipper;
	}
	public List getCargoTypeItems() {
		return cargoTypeItems;
	}
	public void setCargoTypeItems(List cargoTypeItems) {
		this.cargoTypeItems = cargoTypeItems;
	}

}
