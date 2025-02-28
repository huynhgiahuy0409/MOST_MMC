package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.framework.dataitem.DataItem;

public class NonManifestedCargoOfGcItem extends DataItem{

	private static final long serialVersionUID = -4403740210439928240L;
	
	private String cd;
	private String cdNm;
	private String vslCallId;
	private String orgBlSnNo;
	private String orgCgNo;
	private String orgGrNo;
	private String nonManifestedMt;
	private String nonManifestedM3;
	private String nonManifestedQty;
	private String nonManifestedLocId;
	
	private String linkageBlNo;
	private String linkageSnNo;
	private String linkageGrNo;
	private String linkageMblBookingNo;
	private String linkageBlSnNo;
	private String linkageCgNo;
	private String catgCd;
	private String catgNm;
	private String cgTpCd;
	private String cgTpNm;
	private String delvTpCd;
	private String delvTpNm;
	private String cmdtCd;
	private String cmdtNm;
	private String shaCd;
	private String shaNm;
	private String fwdCd;
	private String fwdNm;
	private String cnsCd;
	private String cnsNm;
	private String remark;
	private String updDate;
	private String updUserId;			
	private String whTpCd;
	private String nonManifestedStatus;
	private String jobGroup;
	private String currentCgNo;
	private String isDeleteValidated;
	private String markNos;
	private String jobPurpCd;
	private String jobTpCd;
	private String craneNo;
	private String hdlInStDt;
	private String hdlInEndDt;
	private String pkgQty;
	private String wgt;
	private String m3;
	private String jobNo;
	private String shftId;
	private String shftNm;
	private String shftDt;
	
	//job info
	private String jobRoot;
	private String jobRootYn;
	private String jobPurpNm;
	private String jobTpNm;
	private String jobCoCd;
	private String jobCoNm;
	private String gateTxnNo;
	
	//work date
	private Date workStDt;
	private Date workEndDt;
	
	//shift
	private String shftLvlCd;
	
	private String eqNo;
	private String eqTpCd;
	private String statCd;
	private String odrNo;
	private String gangNo;
	
	//location
	private String locId;
	private String fmLocId;
	private String toLocId;
	private String locArea;
	private String hatchNo;
	private String hatchDrt;
	private String toHatchNo;
	
	//doc no
	private String shipgNoteNo;
	private String cgNo;
	private String grNo;
	private String blNo;
	private String gatePassNo;
	
	//type code
	private String pkgTpCd;
	private String tsptTpNm;
	private String tsptTpCd;

	//condition
	private String opeClassCd;
	private String opeClassNm;
	private String cgCoCd;
	private String spCaCoCd;
	private String spCaCoNm;
	private String rcCoCd;
	private String rcCoNm;
	private String fnlOpeYn;
	private String fnlDelvYn;
	
	private String dmgYn;
	private String stsYn;
	private String shuYn;
	private String shortYn;
	private String rhdlYn;

	//rehandle
	private int rcCount;
	private int rhdlCount;
	private String rhdlNo;
	private String rhdlNos;
	private String rhdlMode;
	private String rhdlModeNm;
	private String rhdlGroupNo;
	private String nxRefNo;
	private String nxVslCallId;
	private String nxCgNo;
	private String cgInOutCd;
	
	//amount
	private int cntrQty;
	private double msrmt;
	private int locQty;
	private double locWgt;
	private double locMsrmt;
	
	//package
	private String pkgNo;
	private String repkgTypeCd;
	
	//job history
	private String snBlNo;
	private String grDoNo;
	private String hiDate;
	private String hoDate;
	private String rmk;
	
	//etc
	private int no;
	private String crud;
	private String cudYn;
	private String updDt;
	private String searchType;
	private boolean isCheck;
	private List childItems;
	private ArrayList collection = new ArrayList();
    
    //MOLF
    private String packingSeq;
    private String packingRefNo;
    private int packingQty;
    private double packingMT;
    private double packingM3;
    private String chk;
    private String jobType;
    private String stat;
    
    // LIST - KHH 2019.01.16
    private List oprList;
    private List hatchNoList;
    private List packageTypeList;
    
    //from APMTC
    private String nonManifestedRmk;
    
    //Mandy apply for CUSP 16/11/2021
    private String lorryId;
	    
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getShftDt() {
		return shftDt;
	}
	public void setShftDt(String shftDt) {
		this.shftDt = shftDt;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getWgt() {
		return wgt;
	}
	public void setWgt(String wgt) {
		this.wgt = wgt;
	}
	public String getM3() {
		return m3;
	}
	public void setM3(String m3) {
		this.m3 = m3;
	}
	public String getHdlInStDt() {
		return hdlInStDt;
	}
	public void setHdlInStDt(String hdlInStDt) {
		this.hdlInStDt = hdlInStDt;
	}
	public String getHdlInEndDt() {
		return hdlInEndDt;
	}
	public void setHdlInEndDt(String hdlInEndDt) {
		this.hdlInEndDt = hdlInEndDt;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getCraneNo() {
		return craneNo;
	}
	public void setCraneNo(String craneNo) {
		this.craneNo = craneNo;
	}
	public String getMarkNos() {
		return markNos;
	}
	public void setMarkNos(String markNos) {
		this.markNos = markNos;
	}
	public String getIsDeleteValidated() {
		return isDeleteValidated;
	}
	public void setIsDeleteValidated(String isDeleteValidated) {
		this.isDeleteValidated = isDeleteValidated;
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
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getOrgBlSnNo() {
		return orgBlSnNo;
	}
	public void setOrgBlSnNo(String orgBlSnNo) {
		this.orgBlSnNo = orgBlSnNo;
	}
	public String getOrgCgNo() {
		return orgCgNo;
	}
	public void setOrgCgNo(String orgCgNo) {
		this.orgCgNo = orgCgNo;
	}
	public String getNonManifestedMt() {
		return nonManifestedMt;
	}
	public void setNonManifestedMt(String nonManifestedMt) {
		this.nonManifestedMt = nonManifestedMt;
	}
	public String getNonManifestedM3() {
		return nonManifestedM3;
	}
	public void setNonManifestedM3(String nonManifestedM3) {
		this.nonManifestedM3 = nonManifestedM3;
	}
	public String getNonManifestedQty() {
		return nonManifestedQty;
	}
	public void setNonManifestedQty(String nonManifestedQty) {
		this.nonManifestedQty = nonManifestedQty;
	}
	public String getNonManifestedLocId() {
		return nonManifestedLocId;
	}
	public void setNonManifestedLocId(String nonManifestedLocId) {
		this.nonManifestedLocId = nonManifestedLocId;
	}
	public String getLinkageBlNo() {
		return linkageBlNo;
	}
	public void setLinkageBlNo(String linkageBlNo) {
		this.linkageBlNo = linkageBlNo;
	}
	public String getLinkageSnNo() {
		return linkageSnNo;
	}
	public void setLinkageSnNo(String linkageSnNo) {
		this.linkageSnNo = linkageSnNo;
	}
	public String getLinkageGrNo() {
		return linkageGrNo;
	}
	public void setLinkageGrNo(String linkageGrNo) {
		this.linkageGrNo = linkageGrNo;
	}
	public String getLinkageMblBookingNo() {
		return linkageMblBookingNo;
	}
	public void setLinkageMblBookingNo(String linkageMblBookingNo) {
		this.linkageMblBookingNo = linkageMblBookingNo;
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
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getCnsCd() {
		return cnsCd;
	}
	public void setCnsCd(String cnsCd) {
		this.cnsCd = cnsCd;
	}
	public String getCnsNm() {
		return cnsNm;
	}
	public void setCnsNm(String cnsNm) {
		this.cnsNm = cnsNm;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUpdDate() {
		return updDate;
	}
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getWhTpCd() {
		return whTpCd;
	}
	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}
	public String getNonManifestedStatus() {
		return nonManifestedStatus;
	}
	public void setNonManifestedStatus(String nonManifestedStatus) {
		this.nonManifestedStatus = nonManifestedStatus;
	}
	public String getOrgGrNo() {
		return orgGrNo;
	}
	public void setOrgGrNo(String orgGrNo) {
		this.orgGrNo = orgGrNo;
	}
	public String getLinkageBlSnNo() {
		return linkageBlSnNo;
	}
	public void setLinkageBlSnNo(String linkageBlSnNo) {
		this.linkageBlSnNo = linkageBlSnNo;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}
	public String getCurrentCgNo() {
		return currentCgNo;
	}
	public void setCurrentCgNo(String currentCgNo) {
		this.currentCgNo = currentCgNo;
	}
	public String getLinkageCgNo() {
		return linkageCgNo;
	}
	public void setLinkageCgNo(String linkageCgNo) {
		this.linkageCgNo = linkageCgNo;
	}
	public String getJobRoot() {
		return jobRoot;
	}
	public void setJobRoot(String jobRoot) {
		this.jobRoot = jobRoot;
	}
	public String getJobRootYn() {
		return jobRootYn;
	}
	public void setJobRootYn(String jobRootYn) {
		this.jobRootYn = jobRootYn;
	}
	public String getJobPurpNm() {
		return jobPurpNm;
	}
	public void setJobPurpNm(String jobPurpNm) {
		this.jobPurpNm = jobPurpNm;
	}
	public String getJobTpNm() {
		return jobTpNm;
	}
	public void setJobTpNm(String jobTpNm) {
		this.jobTpNm = jobTpNm;
	}
	public String getJobCoCd() {
		return jobCoCd;
	}
	public void setJobCoCd(String jobCoCd) {
		this.jobCoCd = jobCoCd;
	}
	public String getJobCoNm() {
		return jobCoNm;
	}
	public void setJobCoNm(String jobCoNm) {
		this.jobCoNm = jobCoNm;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public Date getWorkStDt() {
		return workStDt;
	}
	public void setWorkStDt(Date workStDt) {
		this.workStDt = workStDt;
	}
	public Date getWorkEndDt() {
		return workEndDt;
	}
	public void setWorkEndDt(Date workEndDt) {
		this.workEndDt = workEndDt;
	}
	public String getShftLvlCd() {
		return shftLvlCd;
	}
	public void setShftLvlCd(String shftLvlCd) {
		this.shftLvlCd = shftLvlCd;
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
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getOdrNo() {
		return odrNo;
	}
	public void setOdrNo(String odrNo) {
		this.odrNo = odrNo;
	}
	public String getGangNo() {
		return gangNo;
	}
	public void setGangNo(String gangNo) {
		this.gangNo = gangNo;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getFmLocId() {
		return fmLocId;
	}
	public void setFmLocId(String fmLocId) {
		this.fmLocId = fmLocId;
	}
	public String getToLocId() {
		return toLocId;
	}
	public void setToLocId(String toLocId) {
		this.toLocId = toLocId;
	}
	public String getLocArea() {
		return locArea;
	}
	public void setLocArea(String locArea) {
		this.locArea = locArea;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getHatchDrt() {
		return hatchDrt;
	}
	public void setHatchDrt(String hatchDrt) {
		this.hatchDrt = hatchDrt;
	}
	public String getToHatchNo() {
		return toHatchNo;
	}
	public void setToHatchNo(String toHatchNo) {
		this.toHatchNo = toHatchNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getTsptTpNm() {
		return tsptTpNm;
	}
	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getOpeClassNm() {
		return opeClassNm;
	}
	public void setOpeClassNm(String opeClassNm) {
		this.opeClassNm = opeClassNm;
	}
	public String getCgCoCd() {
		return cgCoCd;
	}
	public void setCgCoCd(String cgCoCd) {
		this.cgCoCd = cgCoCd;
	}
	public String getSpCaCoCd() {
		return spCaCoCd;
	}
	public void setSpCaCoCd(String spCaCoCd) {
		this.spCaCoCd = spCaCoCd;
	}
	public String getSpCaCoNm() {
		return spCaCoNm;
	}
	public void setSpCaCoNm(String spCaCoNm) {
		this.spCaCoNm = spCaCoNm;
	}
	public String getRcCoCd() {
		return rcCoCd;
	}
	public void setRcCoCd(String rcCoCd) {
		this.rcCoCd = rcCoCd;
	}
	public String getRcCoNm() {
		return rcCoNm;
	}
	public void setRcCoNm(String rcCoNm) {
		this.rcCoNm = rcCoNm;
	}
	public String getFnlOpeYn() {
		return fnlOpeYn;
	}
	public void setFnlOpeYn(String fnlOpeYn) {
		this.fnlOpeYn = fnlOpeYn;
	}
	public String getFnlDelvYn() {
		return fnlDelvYn;
	}
	public void setFnlDelvYn(String fnlDelvYn) {
		this.fnlDelvYn = fnlDelvYn;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public String getStsYn() {
		return stsYn;
	}
	public void setStsYn(String stsYn) {
		this.stsYn = stsYn;
	}
	public String getShuYn() {
		return shuYn;
	}
	public void setShuYn(String shuYn) {
		this.shuYn = shuYn;
	}
	public String getShortYn() {
		return shortYn;
	}
	public void setShortYn(String shortYn) {
		this.shortYn = shortYn;
	}
	public String getRhdlYn() {
		return rhdlYn;
	}
	public void setRhdlYn(String rhdlYn) {
		this.rhdlYn = rhdlYn;
	}
	public int getRcCount() {
		return rcCount;
	}
	public void setRcCount(int rcCount) {
		this.rcCount = rcCount;
	}
	public int getRhdlCount() {
		return rhdlCount;
	}
	public void setRhdlCount(int rhdlCount) {
		this.rhdlCount = rhdlCount;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getRhdlNos() {
		return rhdlNos;
	}
	public void setRhdlNos(String rhdlNos) {
		this.rhdlNos = rhdlNos;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getRhdlModeNm() {
		return rhdlModeNm;
	}
	public void setRhdlModeNm(String rhdlModeNm) {
		this.rhdlModeNm = rhdlModeNm;
	}
	public String getRhdlGroupNo() {
		return rhdlGroupNo;
	}
	public void setRhdlGroupNo(String rhdlGroupNo) {
		this.rhdlGroupNo = rhdlGroupNo;
	}
	public String getNxRefNo() {
		return nxRefNo;
	}
	public void setNxRefNo(String nxRefNo) {
		this.nxRefNo = nxRefNo;
	}
	public String getNxVslCallId() {
		return nxVslCallId;
	}
	public void setNxVslCallId(String nxVslCallId) {
		this.nxVslCallId = nxVslCallId;
	}
	public String getNxCgNo() {
		return nxCgNo;
	}
	public void setNxCgNo(String nxCgNo) {
		this.nxCgNo = nxCgNo;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public int getCntrQty() {
		return cntrQty;
	}
	public void setCntrQty(int cntrQty) {
		this.cntrQty = cntrQty;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public int getLocQty() {
		return locQty;
	}
	public void setLocQty(int locQty) {
		this.locQty = locQty;
	}
	public double getLocWgt() {
		return locWgt;
	}
	public void setLocWgt(double locWgt) {
		this.locWgt = locWgt;
	}
	public double getLocMsrmt() {
		return locMsrmt;
	}
	public void setLocMsrmt(double locMsrmt) {
		this.locMsrmt = locMsrmt;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getRepkgTypeCd() {
		return repkgTypeCd;
	}
	public void setRepkgTypeCd(String repkgTypeCd) {
		this.repkgTypeCd = repkgTypeCd;
	}
	public String getSnBlNo() {
		return snBlNo;
	}
	public void setSnBlNo(String snBlNo) {
		this.snBlNo = snBlNo;
	}
	public String getGrDoNo() {
		return grDoNo;
	}
	public void setGrDoNo(String grDoNo) {
		this.grDoNo = grDoNo;
	}
	public String getHiDate() {
		return hiDate;
	}
	public void setHiDate(String hiDate) {
		this.hiDate = hiDate;
	}
	public String getHoDate() {
		return hoDate;
	}
	public void setHoDate(String hoDate) {
		this.hoDate = hoDate;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getCrud() {
		return crud;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
	public String getCudYn() {
		return cudYn;
	}
	public void setCudYn(String cudYn) {
		this.cudYn = cudYn;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public boolean isCheck() {
		return isCheck;
	}
	public void setCheck(boolean isCheck) {
		this.isCheck = isCheck;
	}
	public List getChildItems() {
		return childItems;
	}
	public void setChildItems(List childItems) {
		this.childItems = childItems;
	}
	public ArrayList getCollection() {
		return collection;
	}
	public void setCollection(ArrayList collection) {
		this.collection = collection;
	}
	public String getPackingSeq() {
		return packingSeq;
	}
	public void setPackingSeq(String packingSeq) {
		this.packingSeq = packingSeq;
	}
	public String getPackingRefNo() {
		return packingRefNo;
	}
	public void setPackingRefNo(String packingRefNo) {
		this.packingRefNo = packingRefNo;
	}
	public int getPackingQty() {
		return packingQty;
	}
	public void setPackingQty(int packingQty) {
		this.packingQty = packingQty;
	}
	public double getPackingMT() {
		return packingMT;
	}
	public void setPackingMT(double packingMT) {
		this.packingMT = packingMT;
	}
	public double getPackingM3() {
		return packingM3;
	}
	public void setPackingM3(double packingM3) {
		this.packingM3 = packingM3;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	public String getStat() {
		return stat;
	}
	public void setStat(String stat) {
		this.stat = stat;
	}
	public List getOprList() {
		return oprList;
	}
	public void setOprList(List oprList) {
		this.oprList = oprList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}
	public List getPackageTypeList() {
		return packageTypeList;
	}
	public void setPackageTypeList(List packageTypeList) {
		this.packageTypeList = packageTypeList;
	}
	public String getNonManifestedRmk() {
		return nonManifestedRmk;
	}
	public void setNonManifestedRmk(String nonManifestedRmk) {
		this.nonManifestedRmk = nonManifestedRmk;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
