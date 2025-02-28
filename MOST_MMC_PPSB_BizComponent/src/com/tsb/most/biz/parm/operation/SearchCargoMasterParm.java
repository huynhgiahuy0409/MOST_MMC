package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoMasterParm extends BaseBizParm {
    
    private String vslCallId;
    private String cgNo;
    private String opeClassCd;
    private String tsptTpCd;
    private String markNo;
    private String statCd;
    private String dmgYn;
    private String delvTpCd;
    private String tmnlInDt;
    private String tmnlOutDt;
    private String blNo;
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String shipgNoteNo;
    private String cgBookReq;	//CBR
    private String delvOrder;	//DO
    private String grNo;		//GR
    private String gatePassNo;		//GP : GatePassNo
    private String isMov;		//Loc /LocMov
    private String currLocId;	//WH: Warehouse
    private String isSubItems;	//SN/BN or GR/items
    private String locDivCd;
    private String cgInOutCd;
    private String lorryNo;
    private String eta; 
    private String etd;
    private String berthLoc;
    private String arrvDtFm;
    private String arrvDtTo;
    private String searchType;
    private String opType;
    private String blSn;
    private String authority;
    private String ptnrCode;
    private String userType;
    private String locId;
    private String fromDate;
    private String toDate;
    private String packingSeq;
    private String catgCd;
    private String fwrAgnt;
    private String shftId;
    private String mfDocId;
    private String gateTxnNo;
    private String imtNo;
    private String lotNo;
    private String cmdtCd;
    private String cnsneCd;
    private String locTpCd;
    private String sdoNo;
    private String unitNo;
    private String cargoTp;
    private String driverId;
    private String scn;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getTmnlInDt() {
		return tmnlInDt;
	}
	public void setTmnlInDt(String tmnlInDt) {
		this.tmnlInDt = tmnlInDt;
	}
	public String getTmnlOutDt() {
		return tmnlOutDt;
	}
	public void setTmnlOutDt(String tmnlOutDt) {
		this.tmnlOutDt = tmnlOutDt;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getPortOfLoad() {
		return portOfLoad;
	}
	public void setPortOfLoad(String portOfLoad) {
		this.portOfLoad = portOfLoad;
	}
	public String getPortOfDis() {
		return portOfDis;
	}
	public void setPortOfDis(String portOfDis) {
		this.portOfDis = portOfDis;
	}
	public String getFdest() {
		return fdest;
	}
	public void setFdest(String fdest) {
		this.fdest = fdest;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getCgBookReq() {
		return cgBookReq;
	}
	public void setCgBookReq(String cgBookReq) {
		this.cgBookReq = cgBookReq;
	}
	public String getDelvOrder() {
		return delvOrder;
	}
	public void setDelvOrder(String delvOrder) {
		this.delvOrder = delvOrder;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getIsMov() {
		return isMov;
	}
	public void setIsMov(String isMov) {
		this.isMov = isMov;
	}
	public String getCurrLocId() {
		return currLocId;
	}
	public void setCurrLocId(String currLocId) {
		this.currLocId = currLocId;
	}
	public String getIsSubItems() {
		return isSubItems;
	}
	public void setIsSubItems(String isSubItems) {
		this.isSubItems = isSubItems;
	}
	public String getLocDivCd() {
		return locDivCd;
	}
	public void setLocDivCd(String locDivCd) {
		this.locDivCd = locDivCd;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
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
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getArrvDtFm() {
		return arrvDtFm;
	}
	public void setArrvDtFm(String arrvDtFm) {
		this.arrvDtFm = arrvDtFm;
	}
	public String getArrvDtTo() {
		return arrvDtTo;
	}
	public void setArrvDtTo(String arrvDtTo) {
		this.arrvDtTo = arrvDtTo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getOpType() {
		return opType;
	}
	public void setOpType(String opType) {
		this.opType = opType;
	}
	public String getBlSn() {
		return blSn;
	}
	public void setBlSn(String blSn) {
		this.blSn = blSn;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getPackingSeq() {
		return packingSeq;
	}
	public void setPackingSeq(String packingSeq) {
		this.packingSeq = packingSeq;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getFwrAgnt() {
		return fwrAgnt;
	}
	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getImtNo() {
		return imtNo;
	}
	public void setImtNo(String imtNo) {
		this.imtNo = imtNo;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getLocTpCd() {
		return locTpCd;
	}
	public void setLocTpCd(String locTpCd) {
		this.locTpCd = locTpCd;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getCargoTp() {
		return cargoTp;
	}
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
