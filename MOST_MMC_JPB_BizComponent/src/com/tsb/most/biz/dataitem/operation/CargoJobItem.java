package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoJobItem extends DataItem {
	
	//job info
	private String jobNo;
	private String jobRoot;
	private String jobRootYn;
	private String jobPurpCd;
	private String jobPurpNm;
	private String jobTpCd;
	private String jobTpNm;
	private String jobGroup;
	private String jobCoCd;
	private String jobCoNm;
	private String gateTxnNo;
	private String wbTransactionNo;
	
	//work date
	private Date workStDt;
	private Date workEndDt;
	
	//shift
	private String shftId;
	private String shftNm;
	private String shftDt;
	private String shftLvlCd;
	
	private String eqNo;
	private String eqTpCd;
	private String statCd;
	private String odrNo;
	private String gangNo;
	private String cgTpCd;
	
	//location
	private String locId;
	private String fmLocId;
	private String toLocId;
	private String locArea;
	private String hatchNo;
	private String hatchDrt;
	private String toHatchNo;
	
	//doc no
	private String vslCallId;
	private String shipgNoteNo;
	private String cgNo;
	private String grNo;
	private String blNo;
	private String gatePassNo;
	
	//type code
	private String pkgTpCd;
	private String delvTpCd;
	private String delvTpNm;
	private String tsptTpNm;
	private String whTpCd;
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
	private int pkgQty;
	private double msrmt;
	private double wgt;
	private int locQty;
	private double locWgt;
	private double locMsrmt;
	private double eachWgt;
	private double eachVol;
	
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
	private String updUserId;
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
    private ArrayList<CargoJobItem> items;
    private List oprList;
    private List hatchNoList;
    private List packageTypeList;
    
    private ArrayList<CargoJobItem> whLocCombo;
    private ArrayList<CargoJobItem> shipgNoteCombo;
    private ArrayList<CargoJobItem> blCombo;
    
    //from APMTC
    private String currentCgNo;
    private String nonManifestedRmk;
    private String nonManifestedStatus;
    private String linkageCgNo;
    private String orgCgNo;
    
    //Mandy apply for CUSP 16/11/2021
    private String lorryId;
    private String cmdtCd;
    private String cmdtNm;
    private String sdoNo;
    private String bargeCheck;
    
    //LAIP OPR-010
    private double cgGrossWgt;
    private double bagWgt;
    
    private String chassisNo;
    private String mfDocId;
    private String grSdo;
    private String bargeNo;
    private String blSnDelvTpCd;
    private String grSdoDelvTpCd;
    private String blSn;
    private String updateBy;
    private String unitNos;
    private String driverId;
    private String canUpdate;
    
    ////added for rhdl Return to shipper by Tim 16/03/0224
    private String vslCd;
	private String callSeq;
    private String callYear;
    
    private String scn;
    
    public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
    
    
    public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public String getOrgCgNo() {
		return orgCgNo;
	}
	public void setOrgCgNo(String orgCgNo) {
		this.orgCgNo = orgCgNo;
	}
	public String getCurrentCgNo() {
		return currentCgNo;
	}
	public void setCurrentCgNo(String currentCgNo) {
		this.currentCgNo = currentCgNo;
	}
	public String getNonManifestedRmk() {
		return nonManifestedRmk;
	}
	public void setNonManifestedRmk(String nonManifestedRmk) {
		this.nonManifestedRmk = nonManifestedRmk;
	}
	public String getNonManifestedStatus() {
		return nonManifestedStatus;
	}
	public void setNonManifestedStatus(String nonManifestedStatus) {
		this.nonManifestedStatus = nonManifestedStatus;
	}
	public String getLinkageCgNo() {
		return linkageCgNo;
	}
	public void setLinkageCgNo(String linkageCgNo) {
		this.linkageCgNo = linkageCgNo;
	}
	/**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the cgCoCd.
     */
    public String getCgCoCd() {
        return cgCoCd;
    }
    /**
     * @param cgCoCd The cgCoCd to set.
     */
    public void setCgCoCd(String cgCoCd) {
        this.cgCoCd = cgCoCd;
    }
    /**
     * @return Returns the cgInOutCd.
     */
    public String getCgInOutCd() {
        return cgInOutCd;
    }
    /**
     * @param cgInOutCd The cgInOutCd to set.
     */
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
    }
    /**
     * @return Returns the cgNo.
     */
    public String getCgNo() {
        return cgNo;
    }
    /**
     * @param cgNo The cgNo to set.
     */
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    /**
     * @return Returns the childItems.
     */
    public List getChildItems() {
        return childItems;
    }
    /**
     * @param childItems The childItems to set.
     */
    public void setChildItems(List childItems) {
        this.childItems = childItems;
    }
    /**
     * @return Returns the cntrQty.
     */
    public int getCntrQty() {
        return cntrQty;
    }
    /**
     * @param cntrQty The cntrQty to set.
     */
    public void setCntrQty(int cntrQty) {
        this.cntrQty = cntrQty;
    }
    /**
     * @return Returns the collection.
     */
    public List getCollection() {
        return collection;
    }
    /**
     * @param collection The collection to set.
     */
    public void setCollection(List collection) {
        this.collection = (ArrayList) collection;
    }
    /**
     * @return Returns the crud.
     */
    public String getCrud() {
        return crud;
    }
    /**
     * @param crud The crud to set.
     */
    public void setCrud(String crud) {
        this.crud = crud;
    }
    /**
     * @return Returns the cudYn.
     */
    public String getCudYn() {
        return cudYn;
    }
    /**
     * @param cudYn The cudYn to set.
     */
    public void setCudYn(String cudYn) {
        this.cudYn = cudYn;
    }
    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }
    /**
     * @param delvTpCd The delvTpCd to set.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    /**
     * @return Returns the dmgYn.
     */
    public String getDmgYn() {
        return dmgYn;
    }
    /**
     * @param dmgYn The dmgYn to set.
     */
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    /**
     * @return Returns the eqNo.
     */
    public String getEqNo() {
        return eqNo;
    }
    /**
     * @param eqNo The eqNo to set.
     */
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    /**
     * @return Returns the eqTpCd.
     */
    public String getEqTpCd() {
        return eqTpCd;
    }
    /**
     * @param eqTpCd The eqTpCd to set.
     */
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    /**
     * @return Returns the fmLocId.
     */
    public String getFmLocId() {
        return fmLocId;
    }
    /**
     * @param fmLocId The fmLocId to set.
     */
    public void setFmLocId(String fmLocId) {
        this.fmLocId = fmLocId;
    }
    /**
     * @return Returns the fnlDelvYn.
     */
    public String getFnlDelvYn() {
        return fnlDelvYn;
    }
    /**
     * @param fnlDelvYn The fnlDelvYn to set.
     */
    public void setFnlDelvYn(String fnlDelvYn) {
        this.fnlDelvYn = fnlDelvYn;
    }
    /**
     * @return Returns the fnlOpeYn.
     */
    public String getFnlOpeYn() {
        return fnlOpeYn;
    }
    /**
     * @param fnlOpeYn The fnlOpeYn to set.
     */
    public void setFnlOpeYn(String fnlOpeYn) {
        this.fnlOpeYn = fnlOpeYn;
    }
    /**
     * @return Returns the gangNo.
     */
    public String getGangNo() {
        return gangNo;
    }
    /**
     * @param gangNo The gangNo to set.
     */
    public void setGangNo(String gangNo) {
        this.gangNo = gangNo;
    }
    /**
     * @return Returns the grDoNo.
     */
    public String getGrDoNo() {
        return grDoNo;
    }
    /**
     * @param grDoNo The grDoNo to set.
     */
    public void setGrDoNo(String grDoNo) {
        this.grDoNo = grDoNo;
    }
    /**
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }
    /**
     * @param grNo The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    /**
     * @return Returns the hatchDrt.
     */
    public String getHatchDrt() {
        return hatchDrt;
    }
    /**
     * @param hatchDrt The hatchDrt to set.
     */
    public void setHatchDrt(String hatchDrt) {
        this.hatchDrt = hatchDrt;
    }
    /**
     * @return Returns the hatchNo.
     */
    public String getHatchNo() {
        return hatchNo;
    }
    /**
     * @param hatchNo The hatchNo to set.
     */
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    /**
     * @return Returns the hiDate.
     */
    public String getHiDate() {
        return hiDate;
    }
    /**
     * @param hiDate The hiDate to set.
     */
    public void setHiDate(String hiDate) {
        this.hiDate = hiDate;
    }
    /**
     * @return Returns the hoDate.
     */
    public String getHoDate() {
        return hoDate;
    }
    /**
     * @param hoDate The hoDate to set.
     */
    public void setHoDate(String hoDate) {
        this.hoDate = hoDate;
    }
    /**
     * @return Returns the isCheck.
     */
    public boolean getIsCheck() {
        return isCheck;
    }
    /**
     * @param isCheck The isCheck to set.
     */
    public void setIsCheck(boolean isCheck) {
        this.isCheck = isCheck;
    }
    /**
     * @return Returns the jobCoCd.
     */
    public String getJobCoCd() {
        return jobCoCd;
    }
    /**
     * @param jobCoCd The jobCoCd to set.
     */
    public void setJobCoCd(String jobCoCd) {
        this.jobCoCd = jobCoCd;
    }
    /**
     * @return Returns the jobCoNm.
     */
    public String getJobCoNm() {
        return jobCoNm;
    }
    /**
     * @param jobCoNm The jobCoNm to set.
     */
    public void setJobCoNm(String jobCoNm) {
        this.jobCoNm = jobCoNm;
    }
    /**
     * @return Returns the jobGroup.
     */
    public String getJobGroup() {
        return jobGroup;
    }
    /**
     * @param jobGroup The jobGroup to set.
     */
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }
    /**
     * @return Returns the jobNo.
     */
    public String getJobNo() {
        return jobNo;
    }
    /**
     * @param jobNo The jobNo to set.
     */
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    /**
     * @return Returns the jobPurpCd.
     */
    public String getJobPurpCd() {
        return jobPurpCd;
    }
    /**
     * @param jobPurpCd The jobPurpCd to set.
     */
    public void setJobPurpCd(String jobPurpCd) {
        this.jobPurpCd = jobPurpCd;
    }
    /**
     * @return Returns the jobPurpNm.
     */
    public String getJobPurpNm() {
        return jobPurpNm;
    }
    /**
     * @param jobPurpNm The jobPurpNm to set.
     */
    public void setJobPurpNm(String jobPurpNm) {
        this.jobPurpNm = jobPurpNm;
    }
    /**
     * @return Returns the jobRoot.
     */
    public String getJobRoot() {
        return jobRoot;
    }
    /**
     * @param jobRoot The jobRoot to set.
     */
    public void setJobRoot(String jobRoot) {
        this.jobRoot = jobRoot;
    }
    /**
     * @return Returns the jobRootYn.
     */
    public String getJobRootYn() {
        return jobRootYn;
    }
    /**
     * @param jobRootYn The jobRootYn to set.
     */
    public void setJobRootYn(String jobRootYn) {
        this.jobRootYn = jobRootYn;
    }
    /**
     * @return Returns the jobTpCd.
     */
    public String getJobTpCd() {
        return jobTpCd;
    }
    /**
     * @param jobTpCd The jobTpCd to set.
     */
    public void setJobTpCd(String jobTpCd) {
        this.jobTpCd = jobTpCd;
    }
    /**
     * @return Returns the jobTpNm.
     */
    public String getJobTpNm() {
        return jobTpNm;
    }
    /**
     * @param jobTpNm The jobTpNm to set.
     */
    public void setJobTpNm(String jobTpNm) {
        this.jobTpNm = jobTpNm;
    }
    /**
     * @return Returns the locArea.
     */
    public String getLocArea() {
        return locArea;
    }
    /**
     * @param locArea The locArea to set.
     */
    public void setLocArea(String locArea) {
        this.locArea = locArea;
    }
    /**
     * @return Returns the locId.
     */
    public String getLocId() {
        return locId;
    }
    /**
     * @param locId The locId to set.
     */
    public void setLocId(String locId) {
        this.locId = locId;
    }
    /**
     * @return Returns the locMsrmt.
     */
    public double getLocMsrmt() {
        return locMsrmt;
    }
    /**
     * @param locMsrmt The locMsrmt to set.
     */
    public void setLocMsrmt(double locMsrmt) {
        this.locMsrmt = locMsrmt;
    }
    /**
     * @return Returns the locQty.
     */
    public int getLocQty() {
        return locQty;
    }
    /**
     * @param locQty The locQty to set.
     */
    public void setLocQty(int locQty) {
        this.locQty = locQty;
    }
    /**
     * @return Returns the locWgt.
     */
    public double getLocWgt() {
        return locWgt;
    }
    /**
     * @param locWgt The locWgt to set.
     */
    public void setLocWgt(double locWgt) {
        this.locWgt = locWgt;
    }
    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }
    /**
     * @param msrmt The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
    }
    /**
     * @return Returns the no.
     */
    public int getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(int no) {
        this.no = no;
    }
    /**
     * @return Returns the nxCgNo.
     */
    public String getNxCgNo() {
        return nxCgNo;
    }
    /**
     * @param nxCgNo The nxCgNo to set.
     */
    public void setNxCgNo(String nxCgNo) {
        this.nxCgNo = nxCgNo;
    }
    /**
     * @return Returns the nxRefNo.
     */
    public String getNxRefNo() {
        return nxRefNo;
    }
    /**
     * @param nxRefNo The nxRefNo to set.
     */
    public void setNxRefNo(String nxRefNo) {
        this.nxRefNo = nxRefNo;
    }
    /**
     * @return Returns the nxVslCallId.
     */
    public String getNxVslCallId() {
        return nxVslCallId;
    }
    /**
     * @param nxVslCallId The nxVslCallId to set.
     */
    public void setNxVslCallId(String nxVslCallId) {
        this.nxVslCallId = nxVslCallId;
    }
    /**
     * @return Returns the odrNo.
     */
    public String getOdrNo() {
        return odrNo;
    }
    /**
     * @param odrNo The odrNo to set.
     */
    public void setOdrNo(String odrNo) {
        this.odrNo = odrNo;
    }
    /**
     * @return Returns the opeClassCd.
     */
    public String getOpeClassCd() {
        return opeClassCd;
    }
    /**
     * @param opeClassCd The opeClassCd to set.
     */
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    /**
     * @return Returns the opeClassNm.
     */
    public String getOpeClassNm() {
        return opeClassNm;
    }
    /**
     * @param opeClassNm The opeClassNm to set.
     */
    public void setOpeClassNm(String opeClassNm) {
        this.opeClassNm = opeClassNm;
    }
    /**
     * @return Returns the pkgNo.
     */
    public String getPkgNo() {
        return pkgNo;
    }
    /**
     * @param pkgNo The pkgNo to set.
     */
    public void setPkgNo(String pkgNo) {
        this.pkgNo = pkgNo;
    }
    /**
     * @return Returns the pkgQty.
     */
    public int getPkgQty() {
        return pkgQty;
    }
    /**
     * @param pkgQty The pkgQty to set.
     */
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    /**
     * @return Returns the pkgTpCd.
     */
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    /**
     * @param pkgTpCd The pkgTpCd to set.
     */
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    /**
     * @return Returns the rcCoCd.
     */
    public String getRcCoCd() {
        return rcCoCd;
    }
    /**
     * @param rcCoCd The rcCoCd to set.
     */
    public void setRcCoCd(String rcCoCd) {
        this.rcCoCd = rcCoCd;
    }
    /**
     * @return Returns the rcCoNm.
     */
    public String getRcCoNm() {
        return rcCoNm;
    }
    /**
     * @param rcCoNm The rcCoNm to set.
     */
    public void setRcCoNm(String rcCoNm) {
        this.rcCoNm = rcCoNm;
    }
    /**
     * @return Returns the rcCount.
     */
    public int getRcCount() {
        return rcCount;
    }
    /**
     * @param rcCount The rcCount to set.
     */
    public void setRcCount(int rcCount) {
        this.rcCount = rcCount;
    }
    /**
     * @return Returns the repkgTypeCd.
     */
    public String getRepkgTypeCd() {
        return repkgTypeCd;
    }
    /**
     * @param repkgTypeCd The repkgTypeCd to set.
     */
    public void setRepkgTypeCd(String repkgTypeCd) {
        this.repkgTypeCd = repkgTypeCd;
    }
    /**
     * @return Returns the rhdlCount.
     */
    public int getRhdlCount() {
        return rhdlCount;
    }
    /**
     * @param rhdlCount The rhdlCount to set.
     */
    public void setRhdlCount(int rhdlCount) {
        this.rhdlCount = rhdlCount;
    }
    /**
     * @return Returns the rhdlGroupNo.
     */
    public String getRhdlGroupNo() {
        return rhdlGroupNo;
    }
    /**
     * @param rhdlGroupNo The rhdlGroupNo to set.
     */
    public void setRhdlGroupNo(String rhdlGroupNo) {
        this.rhdlGroupNo = rhdlGroupNo;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    /**
     * @return Returns the rhdlModeNm.
     */
    public String getRhdlModeNm() {
        return rhdlModeNm;
    }
    /**
     * @param rhdlModeNm The rhdlModeNm to set.
     */
    public void setRhdlModeNm(String rhdlModeNm) {
        this.rhdlModeNm = rhdlModeNm;
    }
    /**
     * @return Returns the rhdlNo.
     */
    public String getRhdlNo() {
        return rhdlNo;
    }
    /**
     * @param rhdlNo The rhdlNo to set.
     */
    public void setRhdlNo(String rhdlNo) {
        this.rhdlNo = rhdlNo;
    }
    /**
     * @return Returns the rhdlNos.
     */
    public String getRhdlNos() {
        return rhdlNos;
    }
    /**
     * @param rhdlNos The rhdlNos to set.
     */
    public void setRhdlNos(String rhdlNos) {
        this.rhdlNos = rhdlNos;
    }
    /**
     * @return Returns the rhdlYn.
     */
    public String getRhdlYn() {
        return rhdlYn;
    }
    /**
     * @param rhdlYn The rhdlYn to set.
     */
    public void setRhdlYn(String rhdlYn) {
        this.rhdlYn = rhdlYn;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the searchType.
     */
    public String getSearchType() {
        return searchType;
    }
    /**
     * @param searchType The searchType to set.
     */
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the shftDt.
     */
    public String getShftDt() {
        return shftDt;
    }
    /**
     * @param shftDt The shftDt to set.
     */
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    /**
     * @return Returns the shftId.
     */
    public String getShftId() {
        return shftId;
    }
    /**
     * @param shftId The shftId to set.
     */
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    /**
     * @return Returns the shftLvlCd.
     */
    public String getShftLvlCd() {
        return shftLvlCd;
    }
    /**
     * @param shftLvlCd The shftLvlCd to set.
     */
    public void setShftLvlCd(String shftLvlCd) {
        this.shftLvlCd = shftLvlCd;
    }
    /**
     * @return Returns the shftNm.
     */
    public String getShftNm() {
        return shftNm;
    }
    /**
     * @param shftNm The shftNm to set.
     */
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    /**
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    /**
     * @param shipgNoteNo The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    /**
     * @return Returns the shortYn.
     */
    public String getShortYn() {
        return shortYn;
    }
    /**
     * @param shortYn The shortYn to set.
     */
    public void setShortYn(String shortYn) {
        this.shortYn = shortYn;
    }
    /**
     * @return Returns the shuYn.
     */
    public String getShuYn() {
        return shuYn;
    }
    /**
     * @param shuYn The shuYn to set.
     */
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    /**
     * @return Returns the snBlNo.
     */
    public String getSnBlNo() {
        return snBlNo;
    }
    /**
     * @param snBlNo The snBlNo to set.
     */
    public void setSnBlNo(String snBlNo) {
        this.snBlNo = snBlNo;
    }
    /**
     * @return Returns the spCaCoCd.
     */
    public String getSpCaCoCd() {
        return spCaCoCd;
    }
    /**
     * @param spCaCoCd The spCaCoCd to set.
     */
    public void setSpCaCoCd(String spCaCoCd) {
        this.spCaCoCd = spCaCoCd;
    }
    /**
     * @return Returns the spCaCoNm.
     */
    public String getSpCaCoNm() {
        return spCaCoNm;
    }
    /**
     * @param spCaCoNm The spCaCoNm to set.
     */
    public void setSpCaCoNm(String spCaCoNm) {
        this.spCaCoNm = spCaCoNm;
    }
    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }
    /**
     * @param statCd The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    /**
     * @return Returns the stsYn.
     */
    public String getStsYn() {
        return stsYn;
    }
    /**
     * @param stsYn The stsYn to set.
     */
    public void setStsYn(String stsYn) {
        this.stsYn = stsYn;
    }
    /**
     * @return Returns the toHatchNo.
     */
    public String getToHatchNo() {
        return toHatchNo;
    }
    /**
     * @param toHatchNo The toHatchNo to set.
     */
    public void setToHatchNo(String toHatchNo) {
        this.toHatchNo = toHatchNo;
    }
    /**
     * @return Returns the toLocId.
     */
    public String getToLocId() {
        return toLocId;
    }
    /**
     * @param toLocId The toLocId to set.
     */
    public void setToLocId(String toLocId) {
        this.toLocId = toLocId;
    }
    /**
     * @return Returns the tsptTpCd.
     */
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    /**
     * @param tsptTpCd The tsptTpCd to set.
     */
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    /**
     * @return Returns the updDt.
     */
    public String getUpdDt() {
        return updDt;
    }
    /**
     * @param updDt The updDt to set.
     */
    public void setUpdDt(String updDt) {
        this.updDt = updDt;
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
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the whTpCd.
     */
    public String getWhTpCd() {
        return whTpCd;
    }
    /**
     * @param whTpCd The whTpCd to set.
     */
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    /**
     * @return Returns the workEndDt.
     */
    public Date getWorkEndDt() {
        return workEndDt;
    }
    /**
     * @param workEndDt The workEndDt to set.
     */
    public void setWorkEndDt(Date workEndDt) {
        this.workEndDt = workEndDt;
    }
    /**
     * @return Returns the workStDt.
     */
    public Date getWorkStDt() {
        return workStDt;
    }
    /**
     * @param workStDt The workStDt to set.
     */
    public void setWorkStDt(Date workStDt) {
        this.workStDt = workStDt;
    }
    /**
     * @return Returns the tsptTpNm.
     */
    public String getTsptTpNm() {
        return tsptTpNm;
    }
    /**
     * @param tsptTpNm The tsptTpNm to set.
     */
    public void setTsptTpNm(String tsptTpNm) {
        this.tsptTpNm = tsptTpNm;
    }
    /**
     * @return Returns the gatePassNo.
     */
    public String getGatePassNo() {
        return gatePassNo;
    }
    /**
     * @param gatePassNo The gatePassNo to set.
     */
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    public String getPackingSeq() {
        return packingSeq;
    }
    public void setPackingSeq(String packingSeq) {
        this.packingSeq = packingSeq;
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
    public double getPackingM3() {
        return packingM3;
    }
    public void setPackingM3(double packingM3) {
        this.packingM3 = packingM3;
    }
    public double getPackingMT() {
        return packingMT;
    }
    public void setPackingMT(double packingMT) {
        this.packingMT = packingMT;
    }
    public int getPackingQty() {
        return packingQty;
    }
    public void setPackingQty(int packingQty) {
        this.packingQty = packingQty;
    }
    public String getPackingRefNo() {
        return packingRefNo;
    }
    public void setPackingRefNo(String packingRefNo) {
        this.packingRefNo = packingRefNo;
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
	public ArrayList<CargoJobItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<CargoJobItem> items) {
		this.items = items;
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
	public ArrayList<CargoJobItem> getWhLocCombo() {
		return whLocCombo;
	}
	public void setWhLocCombo(ArrayList<CargoJobItem> whLocCombo) {
		this.whLocCombo = whLocCombo;
	}
	public ArrayList<CargoJobItem> getShipgNoteCombo() {
		return shipgNoteCombo;
	}
	public void setShipgNoteCombo(ArrayList<CargoJobItem> shipgNoteCombo) {
		this.shipgNoteCombo = shipgNoteCombo;
	}
	public ArrayList<CargoJobItem> getBlCombo() {
		return blCombo;
	}
	public void setBlCombo(ArrayList<CargoJobItem> blCombo) {
		this.blCombo = blCombo;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getBargeCheck() {
		return bargeCheck;
	}
	public void setBargeCheck(String bargeCheck) {
		this.bargeCheck = bargeCheck;
	}
	public double getCgGrossWgt() {
		return cgGrossWgt;
	}
	public void setCgGrossWgt(double cgGrossWgt) {
		this.cgGrossWgt = cgGrossWgt;
	}
	public double getBagWgt() {
		return bagWgt;
	}
	public void setBagWgt(double bagWgt) {
		this.bagWgt = bagWgt;
	}
	public double getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(double eachWgt) {
		this.eachWgt = eachWgt;
	}
	public double getEachVol() {
		return eachVol;
	}
	public void setEachVol(double eachVol) {
		this.eachVol = eachVol;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getGrSdo() {
		return grSdo;
	}
	public void setGrSdo(String grSdo) {
		this.grSdo = grSdo;
	}
	public String getBargeNo() {
		return bargeNo;
	}
	public void setBargeNo(String bargeNo) {
		this.bargeNo = bargeNo;
	}
	public String getBlSnDelvTpCd() {
		return blSnDelvTpCd;
	}
	public void setBlSnDelvTpCd(String blSnDelvTpCd) {
		this.blSnDelvTpCd = blSnDelvTpCd;
	}
	public String getGrSdoDelvTpCd() {
		return grSdoDelvTpCd;
	}
	public void setGrSdoDelvTpCd(String grSdoDelvTpCd) {
		this.grSdoDelvTpCd = grSdoDelvTpCd;
	}
	public String getBlSn() {
		return blSn;
	}
	public void setBlSn(String blSn) {
		this.blSn = blSn;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public String getUnitNos() {
		return unitNos;
	}
	public void setUnitNos(String unitNos) {
		this.unitNos = unitNos;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCanUpdate() {
		return canUpdate;
	}
	public void setCanUpdate(String canUpdate) {
		this.canUpdate = canUpdate;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
	
}