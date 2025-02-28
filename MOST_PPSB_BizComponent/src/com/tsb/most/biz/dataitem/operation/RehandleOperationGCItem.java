package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class RehandleOperationGCItem extends DataItem {

	private String workingStatus;
    private String rhdlNo;//seq
    private String vslCallId;
    private String orgRefNo;//sn, bl
    private String orgVslCallId;
    private String orgBlSn;
    private String orgCgNo;
    private String cgNo;
    private String nxVslCallId;
    private String nxRefNo;
    private String nxGrNo;
    private String opeClassCd;
    private String caTgNm;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;
    private String stsYn;
    private String orgGrNo;
    private String rhdlMode;
    private String rhdlModeNm;
    private String updDt;
    private int rhdlPkgQty;
    private double rhdlWgt;
    private double rhdlMsrmt;
    
    private int balPkgQty;// DOCAMT - RHDLAMT
    private double balWgt;// DOCAMT - RHDLAMT
    private double balMsrmt;// DOCAMT - RHDLAMT
    private String chk;//crudmodechekc for grid
    private int no;//gridNumber
    private String userId;//Update Id
    
    private String cgCoCd;
    private String spCaCoCd;//Special cargo condition
    private String cgCoNm;
    private String spCaCoNm;
    private String rhdlChk;
    
    private String shuYn;
    private String dmgYn;
    
    private String jobNo;    
    private String blSn;    
    private String cgTpCd;   
    private String nxCgNo;    
    private String shipgNoteNo;    
    private String searchType;    
    private String jobGroup;
    private String jobRhdlNo;
    
    private String stat;
    private String statNm;
    private String fnlLoadYn;
    private String fnlHoYn;
    private String grNo;
    private String rhdlGroupNo;
    private String rhdlGroupYn;
    
    private String linked;
    private String whLocIds;
    private String crud;
    private ArrayList collection = new ArrayList();

    private String delvTpCd;
    private String stRhdl;
    private String endRhdl;
    private List categoryList;
    private List rehandlingModeList;
    private List cargoConditionList;
    private List specialCgList;
    private List snList;
    private List blList;
    private List blSnList;
    private ArrayList<RehandleOperationGCItem> items;
    private String shiftDt;
    private String shiftId;
    private List hatchList;
    private List modeOfOprList;
    private List operationSetHatchList;
    private String loadCnclMode;
    
    public String getEndRhdl() {
        return endRhdl;
    }
    public void setEndRhdl(String endRhdl) {
        this.endRhdl = endRhdl;
    }
    public String getStRhdl() {
        return stRhdl;
    }
    public void setStRhdl(String stRhdl) {
        this.stRhdl = stRhdl;
    }
    
    
    public double  getMsrmt() {
        return msrmt;
    }
    public void setMsrmt(double  msrmt) {
        this.msrmt = msrmt;
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
    public String getOpeClassCd() {
        return opeClassCd;
    }
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    public String getOrgGrNo() {
        return orgGrNo;
    }
    public void setOrgGrNo(String orgGrNo) {
        this.orgGrNo = orgGrNo;
    }
    public String getOrgRefNo() {
        return orgRefNo;
    }
    public void setOrgRefNo(String orgRefNo) {
        this.orgRefNo = orgRefNo;
    }
    public int getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getRhdlMode() {
        return rhdlMode;
    }
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getRhdlNo() {
        return rhdlNo;
    }
    public void setRhdlNo(String rhdlNo) {
        this.rhdlNo = rhdlNo;
    }
    public String getStsYn() {
        return stsYn;
    }
    public void setStsYn(String stsYn) {
        this.stsYn = stsYn;
    }
    public String getUpdDt() {
        return updDt;
    }
    public void setUpdDt(String updDt) {
        this.updDt = updDt;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public double  getWgt() {
        return wgt;
    }
    public void setWgt(double  wgt) {
        this.wgt = wgt;
    }
    public double getRhdlMsrmt() {
        return rhdlMsrmt;
    }
    public void setRhdlMsrmt(double rhdlMsrmt) {
        this.rhdlMsrmt = rhdlMsrmt;
    }
    public int getRhdlPkgQty() {
        return rhdlPkgQty;
    }
    public void setRhdlPkgQty(int rhdlPkgQty) {
        this.rhdlPkgQty = rhdlPkgQty;
    }
    public double getRhdlWgt() {
        return rhdlWgt;
    }
    public void setRhdlWgt(double rhdlWgt) {
        this.rhdlWgt = rhdlWgt;
    }
    
    public double getBalMsrmt() {
        return balMsrmt;
    }
    public void setBalMsrmt(double balMsrmt) {
        this.balMsrmt = balMsrmt;
    }
    public int getBalPkgQty() {
        return balPkgQty;
    }
    public void setBalPkgQty(int balPkgQty) {
        this.balPkgQty = balPkgQty;
    }
    public double getBalWgt() {
        return balWgt;
    }
    public void setBalWgt(double balWgt) {
        this.balWgt = balWgt;
    }
    public String getChk() {
        return chk;
    }
    public void setChk(String chk) {
        this.chk = chk;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    /**
     * @return Returns the caTgNm.
     */
    public String getCaTgNm() {
        return caTgNm;
    }
    /**
     * @param caTgNm The caTgNm to set.
     */
    public void setCaTgNm(String caTgNm) {
        this.caTgNm = caTgNm;
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
     * @return Returns the cgCoNm.
     */
    public String getCgCoNm() {
        return cgCoNm;
    }
    /**
     * @param cgCoNm The cgCoNm to set.
     */
    public void setCgCoNm(String cgCoNm) {
        this.cgCoNm = cgCoNm;
    }
    /**
     * @return Returns the rhdlChk.
     */
    public String getRhdlChk() {
        return rhdlChk;
    }
    /**
     * @param rhdlChk The rhdlChk to set.
     */
    public void setRhdlChk(String rhdlChk) {
        if("Y".equals(rhdlChk)){
            this.rhdlChk = rhdlChk;
        }else{
            this.rhdlChk = "N";
        }
        
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
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    /**
     * @return Returns the cgTpCd.
     */
    public String getCgTpCd() {
        return cgTpCd;
    }
    /**
     * @param cgTpCd The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    /**
     * @return Returns the nxGrNo.
     */
    public String getNxGrNo() {
        return nxGrNo;
    }
    /**
     * @param nxGrNo The nxGrNo to set.
     */
    public void setNxGrNo(String nxGrNo) {
        this.nxGrNo = nxGrNo;
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
     * @return Returns the orgVslCallId.
     */
    public String getOrgVslCallId() {
        return orgVslCallId;
    }
    /**
     * @param orgVslCallId The orgVslCallId to set.
     */
    public void setOrgVslCallId(String orgVslCallId) {
        this.orgVslCallId = orgVslCallId;
    }
    /**
     * @return Returns the orgBlSn.
     */
    public String getOrgBlSn() {
        return orgBlSn;
    }
    /**
     * @param orgBlSn The orgBlSn to set.
     */
    public void setOrgBlSn(String orgBlSn) {
        this.orgBlSn = orgBlSn;
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
     * @return Returns the jobRhdlNo.
     */
    public String getJobRhdlNo() {
        return jobRhdlNo;
    }
    /**
     * @param jobRhdlNo The jobRhdlNo to set.
     */
    public void setJobRhdlNo(String jobRhdlNo) {
        this.jobRhdlNo = jobRhdlNo;
    }
    
    //-- start ADD 20090521 tnkytn Need for HHT
    public String getCrud() {
        return crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    public List getCollection() {
		return collection;
	}
	public void setCollection(List list) {
		this.collection = (ArrayList) list;
	}
    //-- end   ADD 20090521 tnkytn Need for HHT
    /**
     * @return Returns the stat.
     */
    public String getStat() {
        return stat;
    }
    /**
     * @param stat The stat to set.
     */
    public void setStat(String stat) {
        this.stat = stat;
    }
    /**
     * @return Returns the statNm.
     */
    public String getStatNm() {
        return statNm;
    }
    /**
     * @param statNm The statNm to set.
     */
    public void setStatNm(String statNm) {
        this.statNm = statNm;
    }
    /**
     * @return Returns the orgCgNo.
     */
    public String getOrgCgNo() {
        return orgCgNo;
    }
    /**
     * @param orgCgNo The orgCgNo to set.
     */
    public void setOrgCgNo(String orgCgNo) {
        this.orgCgNo = orgCgNo;
    }
    /**
     * @return Returns the fnlHoYn.
     */
    public String getFnlHoYn() {
        return fnlHoYn;
    }
    /**
     * @param fnlHoYn The fnlHoYn to set.
     */
    public void setFnlHoYn(String fnlHoYn) {
        this.fnlHoYn = fnlHoYn;
    }
    /**
     * @return Returns the fnlLoadYn.
     */
    public String getFnlLoadYn() {
        return fnlLoadYn;
    }
    /**
     * @param fnlLoadYn The fnlLoadYn to set.
     */
    public void setFnlLoadYn(String fnlLoadYn) {
        this.fnlLoadYn = fnlLoadYn;
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
     * @return Returns the rhdlGroupYn.
     */
    public String getRhdlGroupYn() {
        return rhdlGroupYn;
    }
    /**
     * @param rhdlGroupYn The rhdlGroupYn to set.
     */
    public void setRhdlGroupYn(String rhdlGroupYn) {
        this.rhdlGroupYn = rhdlGroupYn;
    }
    /**
     * @return Returns the linked.
     */
    public String getLinked() {
        return linked;
    }
    /**
     * @param linked The linked to set.
     */
    public void setLinked(String linked) {
        this.linked = linked;
    }
    /**
     * @return Returns the whLocIds.
     */
    public String getWhLocIds() {
        return whLocIds;
    }
    /**
     * @param whLocIds The whLocIds to set.
     */
    public void setWhLocIds(String whLocIds) {
        this.whLocIds = whLocIds;
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
	public List getCategoryList() {
		return categoryList;
	}
	public void setCategoryList(List categoryList) {
		this.categoryList = categoryList;
	}
	public List getRehandlingModeList() {
		return rehandlingModeList;
	}
	public void setRehandlingModeList(List rehandlingModeList) {
		this.rehandlingModeList = rehandlingModeList;
	}
	public List getCargoConditionList() {
		return cargoConditionList;
	}
	public void setCargoConditionList(List cargoConditionList) {
		this.cargoConditionList = cargoConditionList;
	}
	public List getSpecialCgList() {
		return specialCgList;
	}
	public void setSpecialCgList(List specialCgList) {
		this.specialCgList = specialCgList;
	}
	public List getSnList() {
		return snList;
	}
	public void setSnList(List snList) {
		this.snList = snList;
	}
	public List getBlList() {
		return blList;
	}
	public void setBlList(List blList) {
		this.blList = blList;
	}
	public List getBlSnList() {
		return blSnList;
	}
	public void setBlSnList(List blSnList) {
		this.blSnList = blSnList;
	}
	public ArrayList<RehandleOperationGCItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<RehandleOperationGCItem> items) {
		this.items = items;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getShiftDt() {
		return shiftDt;
	}
	public void setShiftDt(String shiftDt) {
		this.shiftDt = shiftDt;
	}
	public String getShiftId() {
		return shiftId;
	}
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}
	public List getHatchList() {
		return hatchList;
	}
	public void setHatchList(List hatchList) {
		this.hatchList = hatchList;
	}
	public List getModeOfOprList() {
		return modeOfOprList;
	}
	public void setModeOfOprList(List modeOfOprList) {
		this.modeOfOprList = modeOfOprList;
	}
	public List getOperationSetHatchList() {
		return operationSetHatchList;
	}
	public void setOperationSetHatchList(List operationSetHatchList) {
		this.operationSetHatchList = operationSetHatchList;
	}
	public String getLoadCnclMode() {
		return loadCnclMode;
	}
	public void setLoadCnclMode(String loadCnclMode) {
		this.loadCnclMode = loadCnclMode;
	}
	
}
