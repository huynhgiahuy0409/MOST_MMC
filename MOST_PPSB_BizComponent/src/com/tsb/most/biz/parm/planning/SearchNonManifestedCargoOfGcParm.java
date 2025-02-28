package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchNonManifestedCargoOfGcParm extends BaseBizParm {

	private static final long serialVersionUID = -498294786470203056L;
	
	private String vslCallId;
	private String searchType;			
	private String blNo;		
	private String snNo;
	private String cgNo;
	private String shftDt;
	private String shftId;
	
	//cargo job
	private String jobNo;
    private String workStDt;
    private String workEndDt;
    private String jobTpCd;
    private String eqNo;
    private String eqTpCd;
    private String hatchNo;
    private String fmLocId;
    private String delvTpCd;
    private String opeClassCd;
    private String grNo;
    private String blSn;
    private String rhdlGroupNo;
    private String cgCoCd;
    
    private String jobGroup;
    private String rhdlNo;
    private String ptnrCd;
    
    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String fromRow;
    private String toRow;
    
    private String jobPurpCd;
    private String divSearch;
    
    //cargo master
    private String tsptTpCd;
    private String markNo;
    private String statCd;
    private String dmgYn;
    private String tmnlInDt;
    private String tmnlOutDt;
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String shipgNoteNo;
    private String cgBookReq;	//CBR
    private String delvOrder;	//DO
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
    private String opType;
    private String authority;
    private String ptnrCode;
    private String userType;
    private String locId;
    private String fromDate;
    private String toDate;
    private String packingSeq;
    private String catgCd;
    private String fwrAgnt;
    
	public String getShftDt() {
		return shftDt;
	}
	public void setShftDt(String shftDt) {
		this.shftDt = shftDt;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
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
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getWorkStDt() {
		return workStDt;
	}
	public void setWorkStDt(String workStDt) {
		this.workStDt = workStDt;
	}
	public String getWorkEndDt() {
		return workEndDt;
	}
	public void setWorkEndDt(String workEndDt) {
		this.workEndDt = workEndDt;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getEqNo() {
		return eqNo;
	}
	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getFmLocId() {
		return fmLocId;
	}
	public void setFmLocId(String fmLocId) {
		this.fmLocId = fmLocId;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getBlSn() {
		return blSn;
	}
	public void setBlSn(String blSn) {
		this.blSn = blSn;
	}
	public String getRhdlGroupNo() {
		return rhdlGroupNo;
	}
	public void setRhdlGroupNo(String rhdlGroupNo) {
		this.rhdlGroupNo = rhdlGroupNo;
	}
	public String getCgCoCd() {
		return cgCoCd;
	}
	public void setCgCoCd(String cgCoCd) {
		this.cgCoCd = cgCoCd;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(String currentPage) {
		this.currentPage = currentPage;
	}
	public String getNumbPerPage() {
		return numbPerPage;
	}
	public void setNumbPerPage(String numbPerPage) {
		this.numbPerPage = numbPerPage;
	}
	public String getPageType() {
		return pageType;
	}
	public void setPageType(String pageType) {
		this.pageType = pageType;
	}
	public String getFromRow() {
		return fromRow;
	}
	public void setFromRow(String fromRow) {
		this.fromRow = fromRow;
	}
	public String getToRow() {
		return toRow;
	}
	public void setToRow(String toRow) {
		this.toRow = toRow;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getDivSearch() {
		return divSearch;
	}
	public void setDivSearch(String divSearch) {
		this.divSearch = divSearch;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
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
	public String getOpType() {
		return opType;
	}
	public void setOpType(String opType) {
		this.opType = opType;
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
}
