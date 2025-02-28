/**
* CargoRehandlingItem.java
*
* Created on   : 2007-10-19
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-19     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class RehandleGCItem extends DataItem {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String workingStatus;
    private String rhdlNo;//seq
    private int seq;// RHDL DETAIL
    private String vslCallId;
    private String vslCd;
	private String callYear;
    private String callSeq;
    private String mfDocId;
    private String nxMfDocId;
    private String orgRefNo;//sn, bl
    private String orgVslCallId;
    private String orgBlSn;
    private String orgCgNo;//sunykim add 20090721
    private String cgNo;
    private String nxVslCallId;
    private String nxRefNo;
    private String nxGrNo;
    private String opeClassCd;
    private String caTgNm;//add sunnyKim 20081208
    private String caTgCd;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;
    private String stsYn;
    private String orgGrNo;//cg_mst export CG_NO
    private String rhdlYn;
    private String rhdlMode;
    private String rhdlModeNm;
    private String updDt;
    private Date updateDt;
    
    //add 2008.03.31 -rehandle mode list
    private int rhdlPkgQty;
    private double rhdlWgt;
    private double rhdlMsrmt;
    private double eachWgt;
    private double eachMsrmt;
    
    private int balPkgQty;// DOCAMT - RHDLAMT
    private double balWgt;// DOCAMT - RHDLAMT
    private double balMsrmt;// DOCAMT - RHDLAMT
    private String chk;//crudmodechekc for grid
    private int no;//gridNumber
    private String userId;//Update Id
    
    private String cgCoCd;//cargo condition //sunny 20081205
    private String spCaCoCd;//Special cargo condition //sunny 20090424
    private String cgCoNm;
    private String spCaCoNm;
    private String rhdlChk;
    
    private String shuYn;
    private String dmgYn;
    
    private String jobNo;    
    private String blSn;    
    private String cgTpCd;   
    private String cgTpNm;   
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
    
    // regarding case of change to vessel, increase rhdlGroupNo ++, (vsl_call_id, org_ref_no) 20091014 by sunny
    private String rhdlGroupNo;
    private String rhdlGroupYn; // if rhdlGroupCount > 1, same groups have made oneItem
    
    
    // add 2010.09.01 ask for mantis no 0022761 - Linked Doc
    private String linked;
    // add 2010.09.02 WhLoc - by Mantis from sunny
    private String whLocIds; //LOC_ID
    
    private String whTpCd; // Type of Cargo: G,....
    private String whId; // Type of Cargo: G,....
    private String whLocTp; // Yard,...
    private String refNo; //  SN/BL
    
    //-- start ADD 20090521 tnkytn Need for HHT
    private String crud;
    private ArrayList collection = new ArrayList();
    //-- end   ADD 20090521 tnkytn Need for HHT

    private String delvTpCd;
    
    // TAM ANH -FIXED ISSUE : 0026219 07/02/2013
    private String stRhdl;
    private String endRhdl;
    
    // KHH.2019.01.28
    private List categoryList;
    private List rehandlingModeList;
    private List cargoConditionList;
    private List specialCgList;
    private List snList;
    private List blList;
    private List blSnList;
    private List commodityGroupList;
    private ArrayList<RehandleGCItem> items;

    private String shiftDt;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String shiftId;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private List hatchList;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private List modeOfOprList;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private List operationSetHatchList;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String loadCnclMode;//added by Vin - 20190307 - Confirm Rehandle Loading screen
    private String scd;
    private String scdNm;
    private String cmdtGrCd;
    private String cmdtGrNm;
    private String cmdtCd;
    private String cmdtNm;
    private String pkgTpCd;
    private String pkgTpNm;
    private String pkgNo;
    private String markAndNumber;
    private String goodsRemark;
    private String shipgAgentCd;
    private String shipgAgentNm;
    private String cnsneCd;
    private String cnsneNm;
    
    private String isUpdateRhdl;
    private String sumChgVslWgt;
    private String sumChgVslVol;
    private String sumChgVslQty;
    
    private int oldRhdlPkgQty;
    private double oldRhdlWgt;
    private double oldRhdlMsrmt;
    
    private String canUpdateRts;
    private String canUpdateChgVsl;
    private String updateCgTp;
    private String sumChgVslUpdateWgt;  
    private String sumChgVslUpdateMsrmt;
    private String sumChgVslUpdateQty;
    private String sumChgVslInvUpdateWgt;  
    private String sumChgVslInvUpdateMsrmt;
    private String sumChgVslInvUpdateQty;
    private String canDeleteRts;
    private String canDeleteChgVsl;
    private String isExistRtsOpe;
    private String actMt;
    private String actM3;
    private String actQty;
    private String flag;
    private String locId;
    
    private String scn;
    private String nxScn;
    
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
	public ArrayList<RehandleGCItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<RehandleGCItem> items) {
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
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getRhdlYn() {
		return rhdlYn;
	}
	public void setRhdlYn(String rhdlYn) {
		this.rhdlYn = rhdlYn;
	}
	public String getCaTgCd() {
		return caTgCd;
	}
	public void setCaTgCd(String caTgCd) {
		this.caTgCd = caTgCd;
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
	public String getWhTpCd() {
		return whTpCd;
	}
	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}
	public String getWhLocTp() {
		return whLocTp;
	}
	public void setWhLocTp(String whLocTp) {
		this.whLocTp = whLocTp;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getWhId() {
		return whId;
	}
	public void setWhId(String whId) {
		this.whId = whId;
	}
	public String getNxMfDocId() {
		return nxMfDocId;
	}
	public void setNxMfDocId(String nxMfDocId) {
		this.nxMfDocId = nxMfDocId;
	}
	public Date getUpdateDt() {
		return updateDt;
	}
	public void setUpdateDt(Date updateDt) {
		this.updateDt = updateDt;
	}
	public double getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(double eachWgt) {
		this.eachWgt = eachWgt;
	}
	public double getEachMsrmt() {
		return eachMsrmt;
	}
	public void setEachMsrmt(double eachMsrmt) {
		this.eachMsrmt = eachMsrmt;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getScd() {
		return scd;
	}
	public void setScd(String scd) {
		this.scd = scd;
	}
	public String getScdNm() {
		return scdNm;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public List getCommodityGroupList() {
		return commodityGroupList;
	}
	public void setCommodityGroupList(List commodityGroupList) {
		this.commodityGroupList = commodityGroupList;
	}
	public String getCmdtGrCd() {
		return cmdtGrCd;
	}
	public void setCmdtGrCd(String cmdtGrCd) {
		this.cmdtGrCd = cmdtGrCd;
	}
	public String getCmdtGrNm() {
		return cmdtGrNm;
	}
	public void setCmdtGrNm(String cmdtGrNm) {
		this.cmdtGrNm = cmdtGrNm;
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
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getMarkAndNumber() {
		return markAndNumber;
	}
	public void setMarkAndNumber(String markAndNumber) {
		this.markAndNumber = markAndNumber;
	}
	public String getGoodsRemark() {
		return goodsRemark;
	}
	public void setGoodsRemark(String goodsRemark) {
		this.goodsRemark = goodsRemark;
	}
	public String getShipgAgentCd() {
		return shipgAgentCd;
	}
	public void setShipgAgentCd(String shipgAgentCd) {
		this.shipgAgentCd = shipgAgentCd;
	}
	public String getShipgAgentNm() {
		return shipgAgentNm;
	}
	public void setShipgAgentNm(String shipgAgentNm) {
		this.shipgAgentNm = shipgAgentNm;
	}
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getIsUpdateRhdl() {
		return isUpdateRhdl;
	}
	public void setIsUpdateRhdl(String isUpdateRhdl) {
		this.isUpdateRhdl = isUpdateRhdl;
	}
	public String getSumChgVslWgt() {
		return sumChgVslWgt;
	}
	public void setSumChgVslWgt(String sumChgVslWgt) {
		this.sumChgVslWgt = sumChgVslWgt;
	}
	public String getSumChgVslVol() {
		return sumChgVslVol;
	}
	public void setSumChgVslVol(String sumChgVslVol) {
		this.sumChgVslVol = sumChgVslVol;
	}
	public String getSumChgVslQty() {
		return sumChgVslQty;
	}
	public void setSumChgVslQty(String sumChgVslQty) {
		this.sumChgVslQty = sumChgVslQty;
	}
	public int getOldRhdlPkgQty() {
		return oldRhdlPkgQty;
	}
	public void setOldRhdlPkgQty(int oldRhdlPkgQty) {
		this.oldRhdlPkgQty = oldRhdlPkgQty;
	}
	public double getOldRhdlWgt() {
		return oldRhdlWgt;
	}
	public void setOldRhdlWgt(double oldRhdlWgt) {
		this.oldRhdlWgt = oldRhdlWgt;
	}
	public double getOldRhdlMsrmt() {
		return oldRhdlMsrmt;
	}
	public void setOldRhdlMsrmt(double oldRhdlMsrmt) {
		this.oldRhdlMsrmt = oldRhdlMsrmt;
	}
	public String getCanUpdateRts() {
		return canUpdateRts;
	}
	public void setCanUpdateRts(String canUpdateRts) {
		this.canUpdateRts = canUpdateRts;
	}
	public String getCanUpdateChgVsl() {
		return canUpdateChgVsl;
	}
	public void setCanUpdateChgVsl(String canUpdateChgVsl) {
		this.canUpdateChgVsl = canUpdateChgVsl;
	}
	public String getUpdateCgTp() {
		return updateCgTp;
	}
	public void setUpdateCgTp(String updateCgTp) {
		this.updateCgTp = updateCgTp;
	}
	public String getSumChgVslUpdateWgt() {
		return sumChgVslUpdateWgt;
	}
	public void setSumChgVslUpdateWgt(String sumChgVslUpdateWgt) {
		this.sumChgVslUpdateWgt = sumChgVslUpdateWgt;
	}
	public String getSumChgVslUpdateMsrmt() {
		return sumChgVslUpdateMsrmt;
	}
	public void setSumChgVslUpdateMsrmt(String sumChgVslUpdateMsrmt) {
		this.sumChgVslUpdateMsrmt = sumChgVslUpdateMsrmt;
	}
	public String getSumChgVslUpdateQty() {
		return sumChgVslUpdateQty;
	}
	public void setSumChgVslUpdateQty(String sumChgVslUpdateQty) {
		this.sumChgVslUpdateQty = sumChgVslUpdateQty;
	}
	public String getSumChgVslInvUpdateWgt() {
		return sumChgVslInvUpdateWgt;
	}
	public void setSumChgVslInvUpdateWgt(String sumChgVslInvUpdateWgt) {
		this.sumChgVslInvUpdateWgt = sumChgVslInvUpdateWgt;
	}
	public String getSumChgVslInvUpdateMsrmt() {
		return sumChgVslInvUpdateMsrmt;
	}
	public void setSumChgVslInvUpdateMsrmt(String sumChgVslInvUpdateMsrmt) {
		this.sumChgVslInvUpdateMsrmt = sumChgVslInvUpdateMsrmt;
	}
	public String getSumChgVslInvUpdateQty() {
		return sumChgVslInvUpdateQty;
	}
	public void setSumChgVslInvUpdateQty(String sumChgVslInvUpdateQty) {
		this.sumChgVslInvUpdateQty = sumChgVslInvUpdateQty;
	}
	public String getCanDeleteRts() {
		return canDeleteRts;
	}
	public void setCanDeleteRts(String canDeleteRts) {
		this.canDeleteRts = canDeleteRts;
	}
	public String getCanDeleteChgVsl() {
		return canDeleteChgVsl;
	}
	public void setCanDeleteChgVsl(String canDeleteChgVsl) {
		this.canDeleteChgVsl = canDeleteChgVsl;
	}
	public String getIsExistRtsOpe() {
		return isExistRtsOpe;
	}
	public void setIsExistRtsOpe(String isExistRtsOpe) {
		this.isExistRtsOpe = isExistRtsOpe;
	}
	public String getActMt() {
		return actMt;
	}
	public void setActMt(String actMt) {
		this.actMt = actMt;
	}
	public String getActM3() {
		return actM3;
	}
	public void setActM3(String actM3) {
		this.actM3 = actM3;
	}
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getNxScn() {
		return nxScn;
	}
	public void setNxScn(String nxScn) {
		this.nxScn = nxScn;
	}
	
}
