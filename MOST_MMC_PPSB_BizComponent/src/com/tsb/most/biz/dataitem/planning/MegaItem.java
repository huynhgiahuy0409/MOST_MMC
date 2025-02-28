/**
* MegaItem.java
*
* Created on   : 2007-11-26
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-11-26 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tsb.most.basebiz.dataitem.administrator.UserRegisterItem;
import com.tsb.most.basebiz.dataitem.codes.CodeMasterItem;
import com.tsb.most.basebiz.dataitem.common.SearchVesselCallListItem;
import com.tsb.most.framework.dataitem.DataItem;

/**
* use MegaItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
@JsonIgnoreProperties({"handler"})
public class MegaItem extends DataItem {

    private static final long serialVersionUID = 6082514047501393309L;

    private String relationKey;
    private String workingStatus;
  
    private String megaNo;			//Mega No
    
    //Mega Item
    private String purpTpCd;
    private String purpType;
    private String purpTpCdNm;
    private String refNo;
    private String flStatus;

    private String shftId;
    private String shftNm;
    private String statCd;
    private String statCdNm;
    private String vslCallId;
    private String vslCd;
    private String vslNm;
    private String whApprYn;		// Y:Warehouse Supervisor Approval
    private String megaWhYn;		// Y:InternalMega
    private String megaTpCd;		// C:Copy, A:Amend, H:History
    private String megaTpCdNm;
    private String reqr;			// Requester
    private String reqrNm;			// Requester
    private String reqComp;			// Request Company
    private String appr;			// Approver By
    private String rejYn;			// Rejected(Y/N)
    private String cnclBy;			// Cancel By
    private String rmk;
    private String rejRmk;
    private String saId;
    private String ptnrTpNm;		// S/A, F/A, both
    private String depyYn;			// Deployment YN
    private String gearsYn;			// Gears YN 
    private String forkliftYn;		// Forklift YN
    private String trailerYn;		// Trailer YN
    private String mechanicalYn;	// Mechanical YN
    private String portCrnYn;		// PortCrane YN
    private String cgDtlYn;			// CargoDetail YN
    private String copyMegaNo;		// Copy Mega No
    private String copyType;		// C:Copy
    private String penaltyCd;		// Late Booking, Cancellation, Amendment
    private String penaltyNm;		// Late Booking, Cancellation, Amendment
    
    //Mega Detail Item
    private int seq;
    private int megaIdx;
    private String divCd;
    private String dspReqhhmm;
    
    //Mega Detail (Vessel Schedule)
    private String cmdt;
    private String cmdtCd;
    private String cgTpCd;
    private String cgTpNm;
    private String shipgNoteNo;
    private String dono;
    private String locDivCd;		//Location Division Code
    private String locDivNm;		//Location Division
    private String sndo;
    
    //Mega Detail (Stevedore)
    private String shipClewYn;
    private String stvdComp;
    private String stvdCompNm;
    private String trmgComp;
    private String trmgCompNm;
    private String berthLoc;
    private String deployed;
    
    //Added by Joseph 18/04/2014
    private String amountAmd;
    
    //Added by Joseph 06/05/2014
    private String oldPenaltyCd;
    
    private String eqNo;
    
    //CR-49540 - Adding tally field for tab Stevedore
    private String tallyYn;
    
    //Issue 51137
    private String lashingYn;
    
    //Mega Detail (Equipment)
    private String eqDivCd;
    private String eqDivCdNm;
    private String capaCd;
    private String capaDescr;
    private String colColor;
    private String shftIdx;
    private String accountNo;
    private String engNm;
    
    private String locType;
    
    //Mega Detail (Forklift)
    private String locId;
    private String locIdNm;
    private String whChgYn;
    private String opeCompCd;
    private String opeCompNm;
    private String empId;
    private String empNm;
    private String cnrtCd;
    private String submitBy;
    private String apprvBy;
    //HTT Mega Company Code
    private String megaCompCd;
    private String megaCompNm;
    private String no;
    private String insertType;
    private String userMegaYn;
    private String payer;
    private String chk;
    private String crtBy;
    private String rejBy; // Reject By
    private String amdBy; // Amend By
    private String viewType;
    private String hatchNo1;
   
    // Number - KHH
    private int reqTime;
    private int reqMin;
    private long whQty;
    private long reqQty;
    private long confmQty;
    private long actQty;
    private long chagQty;
    private long nofGang;
    private long nofOprSprr;
    private long nofOprClerk;
    private long nofStvdSprr;
    private long nofWchmn;
    private long nofStvdGwker;
    private long nofHatch;
    private long nofTrmgSprr;
    private long nofSglmn;
    private long nofDekmn;
    private long nofHopmn;
    private long nofTrmgGwker;
    private long trmgNonTon;
    private long nofOpe;
    private long stvdNonTon;
    private double cgTon;
    
    // Date
    private Date workYmd;
    private Date amdDt; // Amend Date
    private Date reqDt;			// Requested Date, <SUMIT_DT>
    private Date appDt;			// Approved Date
    private Date rejDt;			// Reject Date
    private Date cnclDt;			// Cancel Date
    private Date etw;
    
    private String workStDt;
    private String workEndDt;
    // List
	private List confirmationSlipDryBreakBulk;
    private List purposeList;
    private List shiftList;
    private List patnerList;
    private List vesselCallIdList;
    private List megaStatusList;
    private List cargoTypeList;
    private List cscPurposeList;
    private List DetailList;
    private List cargoDetailOperationList;
    private List warehouseLocationList;
    private List cargoDetailList;
    private List commodityCodeList;
    private List packageList;
    private List mechanicalEquipmentTypeList;
    private List portCraneEquipmentTypeList;
    private List categoryList;
    private List workingAreaList;
    private List companyList;
    private List gearsRequisitionList;
    private List forkliftEquipmentList;
    private List trailerEquipmentList;
    private List snList;
    private List doList;
    private ArrayList<MegaItem> items;
    private ArrayList<MegaItem> operInfoItems;
    private ArrayList<MegaItem> operInfoItemsForGears;
    private ArrayList<MegaItem> operInfoItemsForForklift;
    private ArrayList<MegaItem> operInfoItemsForTrailer;
    private ArrayList<MegaItem> operInfoItemsForMechanical;
    private ArrayList<MegaItem> operInfoItemsForPortCrane;
    private ArrayList<MegaItem> stevedoreItems;
    private ArrayList<MegaItem> gearsItems;
    private ArrayList<MegaItem> forkliftItems;
    private ArrayList<MegaItem> trailerItems;
    private ArrayList<MegaItem> mechenicalItems;
    private ArrayList<MegaItem> portCraneItems;
    private ArrayList<MegaItem> cargoDetailItems;
    private ArrayList<MegaItem> operInfoDeleteItems;
    private ArrayList<MegaItem> megaStevedoreList;
    private ArrayList<MegaItem> equipmentList;
    private ArrayList<MegaItem> companyInfo;
    private ArrayList<MegaItem> flList;
    private ArrayList<MegaItem> trList;
    private ArrayList<MegaItem> grList;
    private ArrayList<MegaItem> mcList;
    
    private String eta;
    private String etb;
    private String rptWorkYmd;
    private String rptWorkYmd2;
    private String rsDivCd;
    private String whworkDivCd;
    private String workLoc;
    private String roleCd;
    private String roleCdNm;
    private String eqTpCd;
    private String eqTpCdNm;
    private String eqQty;
    private String eqGrp;
    private String intExtDivCd;
    private String driver;
    private String workMode;
    private String workModeNm;
    private String workCd;
    private String nofJpbOper;
    private String nofContOper;
    private String whUpdYn;
    private String manpowerYn;
    private String updUserId;
    private String updDt;
    private String pageNumber;
    private String fridayYn;
    private String gazaHld;
    private String hiddenEmpId;
    private String driverHidden;
    private String changeShft;
    private String grp;
    private String svcDate;
    private String atd;
    private String shftGrpCd;
    private String grdCd;
    private String stfGrp;
    private String hoWorkDivCd;
    private String hiWorkDivCd;
    private String nosStr;
    private String capaStr;
    
    private ArrayList<MegaItem> megaSummaryList;
    private ArrayList<MegaItem> megaSumOperatorList;
    private ArrayList<MegaItem> megaRemarkList;
    private ArrayList<MegaItem> vesselOperationDeployStaffList;
    private ArrayList<MegaItem> megaSumShipCraneList;
    private ArrayList<MegaItem> megaSumPortCraneList;
    private ArrayList<MegaItem> megaSumForkliftList;
    private ArrayList<MegaItem> portCraneDeployedList;
    private ArrayList<MegaItem> forkliftDeployedList;
    private ArrayList<MegaItem> stevedoreCompanyList;
    private ArrayList<MegaItem> groupComboList;
    private ArrayList<MegaItem> roleComboList;
    private ArrayList<MegaItem> standardStaffGroupList;
    private ArrayList<MegaItem> standardStaffList;
    private ArrayList<MegaItem> standardGroupList;
    private ArrayList<MegaItem> otherStaffGroupList;
    private ArrayList<MegaItem> newStaffList;
    private ArrayList<MegaItem> extraStaffGroupList;
    private ArrayList<MegaItem> extraStaffList;
    private ArrayList<MegaItem> extraGroupList;
    private ArrayList<SearchVesselCallListItem> vslList;
    private ArrayList<CodeMasterItem> equipmentTypeCodeList;
    private ArrayList<MegaItem> staffRoleList;
    private ArrayList<MegaItem> groupRoleList;
    private ArrayList<MegaItem> allRoleList;
    private ArrayList<UserRegisterItem> partnerCodeList;
    private ArrayList<MegaItem> forkliftList;
    private ArrayList<VOperationDeployStaffItem> roleOther;
    private ArrayList<MegaItem> deployedStaffList;
    private ArrayList<CodeMasterItem> workingModeList;
    
    private ArrayList<MegaItem> megaSumPortAndShipCraneList;
    private ArrayList<MegaItem> megaSumShoreCraneList;
    
    private String locNm;
    private String groupCd;
    private String groupNm;
    private String frmTime;
    private String fmHhmm;
    private String toHhmm;
    private String isGazetteHoliday;
    private String isSpecialCase;
    private String jpbiDriverYn;
    private String status;
    
    private String eqFacNo;
    private String opeDivCd;
    
    private String hatchNo;
    private String cgDescCd;
    private String cgDescNm;
    private String cgDescVal;
    private String deliUpdateCd;
    private String deliDeleteCd;
    private String hatchNo2;
    private String hatchNo3;
    private String hatchNo4;
    private String hatchNo5;
    private String hatchNo6;
    private String hatchNo7;
    private String hatchNo8;
    private String hatchNo9;
    private String hatchNo10;
    private String hatchNo11;
    private String hatchNo12;
    private String hatchNo13;
    private String hatchNo14;
    private String hatchNo15;
    private String hatchNo16;
    private String hatchNo17;
    private String hatchNo18;
    private String hatchNo19;
    private String hatchNo20;
    private String hatchNo21;
    private String hatchNo22;
    private String hatchNo23;
    private String hatchNo24;
    private String hatchNo25;
    private String hatchNo26;
    private String hatchNo27;
    private String hatchNo28;
    private String hatchNo29;
    private String hatchNo30;
    
    private String isValidated;
    
    private String opeTpCd;
    
    private String cmdtGrCd;
    private String cmdtGr;
    private String opeHr;
    private String workDd;
    
    public ArrayList<MegaItem> getOperInfoDeleteItems() {
		return operInfoDeleteItems;
	}
	public void setOperInfoDeleteItems(ArrayList<MegaItem> operInfoDeleteItems) {
		this.operInfoDeleteItems = operInfoDeleteItems;
	}
	public String getRelationKey() {
		return relationKey;
	}
	public void setRelationKey(String relationKey) {
		this.relationKey = relationKey;
	}
	public int getMegaIdx() {
		return megaIdx;
	}
	public void setMegaIdx(int megaIdx) {
		this.megaIdx = megaIdx;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
   
    public String getFlStatus() {
        return flStatus;
    }
    public void setFlStatus(String flStatus) {
        this.flStatus = flStatus;
    }
    /**
     * @return Returns the refNo.
     */
    public String getRefNo() {
        return refNo;
    }
    /**
     * @param refNo The refNo to set.
     */
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }

    public String getAccountNo() {
        return accountNo;
    }
    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }
    public String getEngNm() {
        return engNm;
    }
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }
    /**
     * @return Returns the shftIdx.
     */
    public String getShftIdx() {
        return shftIdx;
    }
    /**
     * @param shftIdx The shftIdx to set.
     */
    public void setShftIdx(String shftIdx) {
        this.shftIdx = shftIdx;
    }
    /**
     * @return Returns the apprvBy.
     */
    public String getApprvBy() {
        return apprvBy;
    }
    /**
     * @param apprvBy The apprvBy to set.
     */
    public void setApprvBy(String apprvBy) {
        this.apprvBy = apprvBy;
    }
    /**
     * @return Returns the submitBy.
     */
    public String getSubmitBy() {
        return submitBy;
    }
    /**
     * @param submitBy The submitBy to set.
     */
    public void setSubmitBy(String submitBy) {
        this.submitBy = submitBy;
    }
    /**
     * @return Returns the crtBy.
     */
    public String getCrtBy() {
        return crtBy;
    }
    /**
     * @param crtBy The crtBy to set.
     */
    public void setCrtBy(String crtBy) {
        this.crtBy = crtBy;
    }
    /**
     * @return Returns the appr.
     */
    public String getAppr() {
        return appr;
    }
    /**
     * @param appr The appr to set.
     */
    public void setAppr(String appr) {
        this.appr = appr;
    }
    /**
     * @return Returns the capaCd.
     */
    public String getCapaCd() {
        return capaCd;
    }
    /**
     * @param capaCd The capaCd to set.
     */
    public void setCapaCd(String capaCd) {
        this.capaCd = capaCd;
    }
    /**
     * @return Returns the capaDescr.
     */
    public String getCapaDescr() {
        return capaDescr;
    }
    /**
     * @param capaDescr The capaDescr to set.
     */
    public void setCapaDescr(String capaDescr) {
        this.capaDescr = capaDescr;
    }
    /**
     * @return Returns the cgDtlYn.
     */
    public String getCgDtlYn() {
        return cgDtlYn;
    }
    /**
     * @param cgDtlYn The cgDtlYn to set.
     */
    public void setCgDtlYn(String cgDtlYn) {
        this.cgDtlYn = cgDtlYn;
    }
    /**
     * @return Returns the cgTon.
     */
    public double getCgTon() {
        return cgTon;
    }
    /**
     * @param cgTon The cgTon to set.
     */
    public void setCgTon(double cgTon) {
        this.cgTon = cgTon;
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
     * @return Returns the cgTpNm.
     */
    public String getCgTpNm() {
        return cgTpNm;
    }
    /**
     * @param cgTpNm The cgTpNm to set.
     */
    public void setCgTpNm(String cgTpNm) {
        this.cgTpNm = cgTpNm;
    }
    /**
     * @return Returns the chk.
     */
    public String getChk() {
        return chk;
    }
    /**
     * @param chk The chk to set.
     */
    public void setChk(String chk) {
        this.chk = chk;
    }
    /**
     * @return Returns the cmdt.
     */
    public String getCmdt() {
        return cmdt;
    }
    /**
     * @param cmdt The cmdt to set.
     */
    public void setCmdt(String cmdt) {
        this.cmdt = cmdt;
    }
    /**
     * @return Returns the cnclBy.
     */
    public String getCnclBy() {
        return cnclBy;
    }
    /**
     * @param cnclBy The cnclBy to set.
     */
    public void setCnclBy(String cnclBy) {
        this.cnclBy = cnclBy;
    }
    /**
     * @return Returns the cnrtCd.
     */
    public String getCnrtCd() {
        return cnrtCd;
    }
    /**
     * @param cnrtCd The cnrtCd to set.
     */
    public void setCnrtCd(String cnrtCd) {
        this.cnrtCd = cnrtCd;
    }
    /**
     * @return Returns the colColor.
     */
    public String getColColor() {
        return colColor;
    }
    /**
     * @param colColor The colColor to set.
     */
    public void setColColor(String colColor) {
        this.colColor = colColor;
    }
    /**
     * @return Returns the copyMegaNo.
     */
    public String getCopyMegaNo() {
        return copyMegaNo;
    }
    /**
     * @param copyMegaNo The copyMegaNo to set.
     */
    public void setCopyMegaNo(String copyMegaNo) {
        this.copyMegaNo = copyMegaNo;
    }
    /**
     * @return Returns the copyType.
     */
    public String getCopyType() {
        return copyType;
    }
    /**
     * @param copyType The copyType to set.
     */
    public void setCopyType(String copyType) {
        this.copyType = copyType;
    }
    /**
     * @return Returns the depyYn.
     */
    public String getDepyYn() {
        return depyYn;
    }
    /**
     * @param depyYn The depyYn to set.
     */
    public void setDepyYn(String depyYn) {
        this.depyYn = depyYn;
    }
    /**
     * @return Returns the divCd.
     */
    public String getDivCd() {
        return divCd;
    }
    /**
     * @param divCd The divCd to set.
     */
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    /**
     * @return Returns the dono.
     */
    public String getDono() {
        return dono;
    }
    /**
     * @param dono The dono to set.
     */
    public void setDono(String dono) {
        this.dono = dono;
    }
    /**
     * @return Returns the dspReqhhmm.
     */
    public String getDspReqhhmm() {
        return dspReqhhmm;
    }
    /**
     * @param dspReqhhmm The dspReqhhmm to set.
     */
    public void setDspReqhhmm(String dspReqhhmm) {
        this.dspReqhhmm = dspReqhhmm;
    }
    /**
     * @return Returns the empId.
     */
    public String getEmpId() {
        return empId;
    }
    /**
     * @param empId The empId to set.
     */
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    /**
     * @return Returns the empNm.
     */
    public String getEmpNm() {
        return empNm;
    }
    /**
     * @param empNm The empNm to set.
     */
    public void setEmpNm(String empNm) {
        this.empNm = empNm;
    }
    /**
     * @return Returns the eqDivCd.
     */
    public String getEqDivCd() {
        return eqDivCd;
    }
    /**
     * @param eqDivCd The eqDivCd to set.
     */
    public void setEqDivCd(String eqDivCd) {
        this.eqDivCd = eqDivCd;
    }
    /**
     * @return Returns the eqDivCdNm.
     */
    public String getEqDivCdNm() {
        return eqDivCdNm;
    }
    /**
     * @param eqDivCdNm The eqDivCdNm to set.
     */
    public void setEqDivCdNm(String eqDivCdNm) {
        this.eqDivCdNm = eqDivCdNm;
    }
    /**
     * @return Returns the forkliftYn.
     */
    public String getForkliftYn() {
        return forkliftYn;
    }
    /**
     * @param forkliftYn The forkliftYn to set.
     */
    public void setForkliftYn(String forkliftYn) {
        this.forkliftYn = forkliftYn;
    }
    /**
     * @return Returns the gearsYn.
     */
    public String getGearsYn() {
        return gearsYn;
    }
    /**
     * @param gearsYn The gearsYn to set.
     */
    public void setGearsYn(String gearsYn) {
        this.gearsYn = gearsYn;
    }
    /**
     * @return Returns the insertType.
     */
    public String getInsertType() {
        return insertType;
    }
    /**
     * @param insertType The insertType to set.
     */
    public void setInsertType(String insertType) {
        this.insertType = insertType;
    }
    /**
     * @return Returns the locDivCd.
     */
    public String getLocDivCd() {
        return locDivCd;
    }
    /**
     * @param locDivCd The locDivCd to set.
     */
    public void setLocDivCd(String locDivCd) {
        this.locDivCd = locDivCd;
    }
    /**
     * @return Returns the locDivNm.
     */
    public String getLocDivNm() {
        return locDivNm;
    }
    /**
     * @param locDivNm The locDivNm to set.
     */
    public void setLocDivNm(String locDivNm) {
        this.locDivNm = locDivNm;
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
     * @return Returns the locIdNm.
     */
    public String getLocIdNm() {
        return locIdNm;
    }
    /**
     * @param locIdNm The locIdNm to set.
     */
    public void setLocIdNm(String locIdNm) {
        this.locIdNm = locIdNm;
    }
    /**
     * @return Returns the mechanicalYn.
     */
    public String getMechanicalYn() {
        return mechanicalYn;
    }
    /**
     * @param mechanicalYn The mechanicalYn to set.
     */
    public void setMechanicalYn(String mechanicalYn) {
        this.mechanicalYn = mechanicalYn;
    }
    /**
     * @return Returns the megaCompCd.
     */
    public String getMegaCompCd() {
        return megaCompCd;
    }
    /**
     * @param megaCompCd The megaCompCd to set.
     */
    public void setMegaCompCd(String megaCompCd) {
        this.megaCompCd = megaCompCd;
    }
    /**
     * @return Returns the megaCompNm.
     */
    public String getMegaCompNm() {
        return megaCompNm;
    }
    /**
     * @param megaCompNm The megaCompNm to set.
     */
    public void setMegaCompNm(String megaCompNm) {
        this.megaCompNm = megaCompNm;
    }
    /**
     * @return Returns the megaNo.
     */
    public String getMegaNo() {
        return megaNo;
    }
    /**
     * @param megaNo The megaNo to set.
     */
    public void setMegaNo(String megaNo) {
        this.megaNo = megaNo;
    }
    /**
     * @return Returns the megaTpCd.
     */
    public String getMegaTpCd() {
        return megaTpCd;
    }
    /**
     * @param megaTpCd The megaTpCd to set.
     */
    public void setMegaTpCd(String megaTpCd) {
        this.megaTpCd = megaTpCd;
    }
    /**
     * @return Returns the megaTpCdNm.
     */
    public String getMegaTpCdNm() {
        return megaTpCdNm;
    }
    /**
     * @param megaTpCdNm The megaTpCdNm to set.
     */
    public void setMegaTpCdNm(String megaTpCdNm) {
        this.megaTpCdNm = megaTpCdNm;
    }
    /**
     * @return Returns the megaWhYn.
     */
    public String getMegaWhYn() {
        return megaWhYn;
    }
    /**
     * @param megaWhYn The megaWhYn to set.
     */
    public void setMegaWhYn(String megaWhYn) {
        this.megaWhYn = megaWhYn;
    }
    /**
     * @return Returns the no.
     */
    public String getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(String no) {
        this.no = no;
    }
    /**
     * @return Returns the nofDekmn.
     */
    /**
     * @return Returns the opeCompCd.
     */
    public String getOpeCompCd() {
        return opeCompCd;
    }
    /**
     * @param opeCompCd The opeCompCd to set.
     */
    public void setOpeCompCd(String opeCompCd) {
        this.opeCompCd = opeCompCd;
    }
    /**
     * @return Returns the opeCompNm.
     */
    public String getOpeCompNm() {
        return opeCompNm;
    }
    /**
     * @param opeCompNm The opeCompNm to set.
     */
    public void setOpeCompNm(String opeCompNm) {
        this.opeCompNm = opeCompNm;
    }
    /**
     * @return Returns the payer.
     */
    public String getPayer() {
        return payer;
    }
    /**
     * @param payer The payer to set.
     */
    public void setPayer(String payer) {
        this.payer = payer;
    }
    /**
     * @return Returns the penaltyCd.
     */
    public String getPenaltyCd() {
        return penaltyCd;
    }
    /**
     * @param penaltyCd The penaltyCd to set.
     */
    public void setPenaltyCd(String penaltyCd) {
        this.penaltyCd = penaltyCd;
    }
    /**
     * @return Returns the penaltyNm.
     */
    public String getPenaltyNm() {
        return penaltyNm;
    }
    /**
     * @param penaltyNm The penaltyNm to set.
     */
    public void setPenaltyNm(String penaltyNm) {
        this.penaltyNm = penaltyNm;
    }
    /**
     * @return Returns the portCrnYn.
     */
    public String getPortCrnYn() {
        return portCrnYn;
    }
    /**
     * @param portCrnYn The portCrnYn to set.
     */
    public void setPortCrnYn(String portCrnYn) {
        this.portCrnYn = portCrnYn;
    }
    /**
     * @return Returns the ptnrTpNm.
     */
    public String getPtnrTpNm() {
        return ptnrTpNm;
    }
    /**
     * @param ptnrTpNm The ptnrTpNm to set.
     */
    public void setPtnrTpNm(String ptnrTpNm) {
        this.ptnrTpNm = ptnrTpNm;
    }
    /**
     * @return Returns the purpTpCd.
     */
    public String getPurpTpCd() {
        return purpTpCd;
    }
    /**
     * @param purpTpCd The purpTpCd to set.
     */
    public void setPurpTpCd(String purpTpCd) {
        this.purpTpCd = purpTpCd;
    }
    /**
     * @return Returns the purpTpCdNm.
     */
    public String getPurpTpCdNm() {
        return purpTpCdNm;
    }
    /**
     * @param purpTpCdNm The purpTpCdNm to set.
     */
    public void setPurpTpCdNm(String purpTpCdNm) {
        this.purpTpCdNm = purpTpCdNm;
    }
    /**
     * @return Returns the purpType.
     */
    public String getPurpType() {
        return purpType;
    }
    /**
     * @param purpType The purpType to set.
     */
    public void setPurpType(String purpType) {
        this.purpType = purpType;
    }
    /**
     * @return Returns the rejBy.
     */
    public String getRejBy() {
        return rejBy;
    }
    /**
     * @param rejBy The rejBy to set.
     */
    public void setRejBy(String rejBy) {
        this.rejBy = rejBy;
    }
    /**
     * @return Returns the rejRmk.
     */
    public String getRejRmk() {
        return rejRmk;
    }
    /**
     * @param rejRmk The rejRmk to set.
     */
    public void setRejRmk(String rejRmk) {
        this.rejRmk = rejRmk;
    }
    /**
     * @return Returns the rejYn.
     */
    public String getRejYn() {
        return rejYn;
    }
    /**
     * @param rejYn The rejYn to set.
     */
    public void setRejYn(String rejYn) {
        this.rejYn = rejYn;
    }
    /**
     * @return Returns the reqComp.
     */
    public String getReqComp() {
        return reqComp;
    }
    /**
     * @param reqComp The reqComp to set.
     */
    public void setReqComp(String reqComp) {
        this.reqComp = reqComp;
    }
    /**
     * @return Returns the reqMin.
     */
    public int getReqMin() {
        return reqMin;
    }
    /**
     * @param reqMin The reqMin to set.
     */
    public void setReqMin(int reqMin) {
        this.reqMin = reqMin;
    }
    /**
     * @return Returns the reqr.
     */
    public String getReqr() {
        return reqr;
    }
    /**
     * @param reqr The reqr to set.
     */
    public void setReqr(String reqr) {
        this.reqr = reqr;
    }
    /**
     * @return Returns the reqrNm.
     */
    public String getReqrNm() {
        return reqrNm;
    }
    /**
     * @param reqrNm The reqrNm to set.
     */
    public void setReqrNm(String reqrNm) {
        this.reqrNm = reqrNm;
    }
    /**
     * @return Returns the reqTime.
     */
    public int getReqTime() {
        return reqTime;
    }
    /**
     * @param reqTime The reqTime to set.
     */
    public void setReqTime(int reqTime) {
        this.reqTime = reqTime;
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
     * @return Returns the saId.
     */
    public String getSaId() {
        return saId;
    }
    /**
     * @param saId The saId to set.
     */
    public void setSaId(String saId) {
        this.saId = saId;
    }
    /**
     * @return Returns the seq.
     */
    public int getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(int seq) {
        this.seq = seq;
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
     * @return Returns the shipClewYn.
     */
    public String getShipClewYn() {
        return shipClewYn;
    }
    /**
     * @param shipClewYn The shipClewYn to set.
     */
    public void setShipClewYn(String shipClewYn) {
        this.shipClewYn = shipClewYn;
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
     * @return Returns the sndo.
     */
    public String getSndo() {
        return sndo;
    }
    /**
     * @param sndo The sndo to set.
     */
    public void setSndo(String sndo) {
        this.sndo = sndo;
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
     * @return Returns the statCdNm.
     */
    public String getStatCdNm() {
        return statCdNm;
    }
    /**
     * @param statCdNm The statCdNm to set.
     */
    public void setStatCdNm(String statCdNm) {
        this.statCdNm = statCdNm;
    }
    /**
     * @return Returns the stvdComp.
     */
    public String getStvdComp() {
        return stvdComp;
    }
    /**
     * @param stvdComp The stvdComp to set.
     */
    public void setStvdComp(String stvdComp) {
        this.stvdComp = stvdComp;
    }
    /**
     * @return Returns the stvdCompNm.
     */
    public String getStvdCompNm() {
        return stvdCompNm;
    }
    /**
     * @param stvdCompNm The stvdCompNm to set.
     */
    public void setStvdCompNm(String stvdCompNm) {
        this.stvdCompNm = stvdCompNm;
    }
    /**
     * @return Returns the stvdNonTon.
     */
    public long getStvdNonTon() {
        return stvdNonTon;
    }
    /**
     * @param stvdNonTon The stvdNonTon to set.
     */
    public void setStvdNonTon(long stvdNonTon) {
        this.stvdNonTon = stvdNonTon;
    }
    /**
     * @return Returns the trailerYn.
     */
    public String getTrailerYn() {
        return trailerYn;
    }
    /**
     * @param trailerYn The trailerYn to set.
     */
    public void setTrailerYn(String trailerYn) {
        this.trailerYn = trailerYn;
    }
    /**
     * @return Returns the trmgComp.
     */
    public String getTrmgComp() {
        return trmgComp;
    }
    /**
     * @param trmgComp The trmgComp to set.
     */
    public void setTrmgComp(String trmgComp) {
        this.trmgComp = trmgComp;
    }
    /**
     * @return Returns the trmgCompNm.
     */
    public String getTrmgCompNm() {
        return trmgCompNm;
    }
    /**
     * @param trmgCompNm The trmgCompNm to set.
     */
    public void setTrmgCompNm(String trmgCompNm) {
        this.trmgCompNm = trmgCompNm;
    }
    /**
     * @return Returns the userMegaYn.
     */
    public String getUserMegaYn() {
        return userMegaYn;
    }
    /**
     * @param userMegaYn The userMegaYn to set.
     */
    public void setUserMegaYn(String userMegaYn) {
        this.userMegaYn = userMegaYn;
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
     * @return Returns the vslNm.
     */
    public String getVslNm() {
        return vslNm;
    }
    /**
     * @param vslNm The vslNm to set.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    /**
     * @return Returns the whApprYn.
     */
    public String getWhApprYn() {
        return whApprYn;
    }
    /**
     * @param whApprYn The whApprYn to set.
     */
    public void setWhApprYn(String whApprYn) {
        this.whApprYn = whApprYn;
    }
    /**
     * @return Returns the whChgYn.
     */
    public String getWhChgYn() {
        return whChgYn;
    }
    /**
     * @param whChgYn The whChgYn to set.
     */
    public void setWhChgYn(String whChgYn) {
        this.whChgYn = whChgYn;
    }
    /**
     * @return Returns the workYmd.
     */
    public Date getWorkYmd() {
        return workYmd;
    }
    /**
     * @param workYmd The workYmd to set.
     */
    public void setWorkYmd(Date workYmd) {
        this.workYmd = workYmd;
    }
    
    public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	public long getWhQty() {
		return whQty;
	}
	public void setWhQty(long whQty) {
		this.whQty = whQty;
	}
	public long getReqQty() {
		return reqQty;
	}
	public void setReqQty(long reqQty) {
		this.reqQty = reqQty;
	}
	public long getConfmQty() {
		return confmQty;
	}
	public void setConfmQty(long confmQty) {
		this.confmQty = confmQty;
	}
	public long getActQty() {
		return actQty;
	}
	public void setActQty(long actQty) {
		this.actQty = actQty;
	}
	public long getChagQty() {
		return chagQty;
	}
	public void setChagQty(long chagQty) {
		this.chagQty = chagQty;
	}
	public long getNofGang() {
		return nofGang;
	}
	public void setNofGang(long nofGang) {
		this.nofGang = nofGang;
	}
	public long getNofOprSprr() {
		return nofOprSprr;
	}
	public void setNofOprSprr(long nofOprSprr) {
		this.nofOprSprr = nofOprSprr;
	}
	public long getNofOprClerk() {
		return nofOprClerk;
	}
	public void setNofOprClerk(long nofOprClerk) {
		this.nofOprClerk = nofOprClerk;
	}
	public long getNofStvdSprr() {
		return nofStvdSprr;
	}
	public void setNofStvdSprr(long nofStvdSprr) {
		this.nofStvdSprr = nofStvdSprr;
	}
	public long getNofWchmn() {
		return nofWchmn;
	}
	public void setNofWchmn(long nofWchmn) {
		this.nofWchmn = nofWchmn;
	}
	public long getNofStvdGwker() {
		return nofStvdGwker;
	}
	public void setNofStvdGwker(long nofStvdGwker) {
		this.nofStvdGwker = nofStvdGwker;
	}
	public long getNofHatch() {
		return nofHatch;
	}
	public void setNofHatch(long nofHatch) {
		this.nofHatch = nofHatch;
	}
	public long getNofTrmgSprr() {
		return nofTrmgSprr;
	}
	public void setNofTrmgSprr(long nofTrmgSprr) {
		this.nofTrmgSprr = nofTrmgSprr;
	}
	public long getNofSglmn() {
		return nofSglmn;
	}
	public void setNofSglmn(long nofSglmn) {
		this.nofSglmn = nofSglmn;
	}
	public long getNofDekmn() {
		return nofDekmn;
	}
	public void setNofDekmn(long nofDekmn) {
		this.nofDekmn = nofDekmn;
	}
	public long getNofHopmn() {
		return nofHopmn;
	}
	public void setNofHopmn(long nofHopmn) {
		this.nofHopmn = nofHopmn;
	}
	public long getNofTrmgGwker() {
		return nofTrmgGwker;
	}
	public void setNofTrmgGwker(long nofTrmgGwker) {
		this.nofTrmgGwker = nofTrmgGwker;
	}
	public long getTrmgNonTon() {
		return trmgNonTon;
	}
	public void setTrmgNonTon(long trmgNonTon) {
		this.trmgNonTon = trmgNonTon;
	}
	public long getNofOpe() {
		return nofOpe;
	}
	public void setNofOpe(long nofOpe) {
		this.nofOpe = nofOpe;
	}
	public String getAmdBy() {
        return amdBy;
    }
    public void setAmdBy(String amdBy) {
        this.amdBy = amdBy;
    }
    public String getAmountAmd() {
        return amountAmd;
    }
    public void setAmountAmd(String amountAmd) {
        this.amountAmd = amountAmd;
    }
    public String getOldPenaltyCd() {
        return oldPenaltyCd;
    }
    public void setOldPenaltyCd(String oldPenaltyCd) {
        this.oldPenaltyCd = oldPenaltyCd;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    public String getTallyYn() {
        return tallyYn;
    }
    public void setTallyYn(String tallyYn) {
        this.tallyYn = tallyYn;
    }
    public String getLocType() {
        return locType;
    }
    public void setLocType(String locType) {
        this.locType = locType;
    }
    public String getLashingYn() {
        return lashingYn;
    }
    public void setLashingYn(String lashingYn) {
        this.lashingYn = lashingYn;
    }
    public String getDeployed() {
        return deployed;
    }
    public void setDeployed(String deployed) {
        this.deployed = deployed;
    }
	public Date getAmdDt() {
		return amdDt;
	}
	public void setAmdDt(Date amdDt) {
		this.amdDt = amdDt;
	}
	public Date getReqDt() {
		return reqDt;
	}
	public void setReqDt(Date reqDt) {
		this.reqDt = reqDt;
	}
	public Date getAppDt() {
		return appDt;
	}
	public void setAppDt(Date appDt) {
		this.appDt = appDt;
	}
	public Date getRejDt() {
		return rejDt;
	}
	public void setRejDt(Date rejDt) {
		this.rejDt = rejDt;
	}
	public Date getCnclDt() {
		return cnclDt;
	}
	public void setCnclDt(Date cnclDt) {
		this.cnclDt = cnclDt;
	}
	public Date getEtw() {
		return etw;
	}
	public void setEtw(Date etw) {
		this.etw = etw;
	}
	public String getHatchNo1() {
		return hatchNo1;
	}
	public void setHatchNo1(String hatchNo1) {
		this.hatchNo1 = hatchNo1;
	}
	public List getPurposeList() {
		return purposeList;
	}
	public void setPurposeList(List purposeList) {
		this.purposeList = purposeList;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getPatnerList() {
		return patnerList;
	}
	public void setPatnerList(List patnerList) {
		this.patnerList = patnerList;
	}
	public List getVesselCallIdList() {
		return vesselCallIdList;
	}
	public void setVesselCallIdList(List vesselCallIdList) {
		this.vesselCallIdList = vesselCallIdList;
	}
	public List getMegaStatusList() {
		return megaStatusList;
	}
	public void setMegaStatusList(List megaStatusList) {
		this.megaStatusList = megaStatusList;
	}
	public List getCargoTypeList() {
		return cargoTypeList;
	}
	public void setCargoTypeList(List cargoTypeList) {
		this.cargoTypeList = cargoTypeList;
	}
	public List getCscPurposeList() {
		return cscPurposeList;
	}
	public void setCscPurposeList(List cscPurposeList) {
		this.cscPurposeList = cscPurposeList;
	}
	public List getDetailList() {
		return DetailList;
	}
	public void setDetailList(List detailList) {
		DetailList = detailList;
	}
	public List getCompanyList() {
		return companyList;
	}
	public void setCompanyList(List companyList) {
		this.companyList = companyList;
	}
	public List getMechanicalEquipmentTypeList() {
		return mechanicalEquipmentTypeList;
	}
	public void setMechanicalEquipmentTypeList(List mechanicalEquipmentTypeList) {
		this.mechanicalEquipmentTypeList = mechanicalEquipmentTypeList;
	}
	public List getPortCraneEquipmentTypeList() {
		return portCraneEquipmentTypeList;
	}
	public void setPortCraneEquipmentTypeList(List portCraneEquipmentTypeList) {
		this.portCraneEquipmentTypeList = portCraneEquipmentTypeList;
	}
	public List getCargoDetailOperationList() {
		return cargoDetailOperationList;
	}
	public void setCargoDetailOperationList(List cargoDetailOperationList) {
		this.cargoDetailOperationList = cargoDetailOperationList;
	}
	public List getWarehouseLocationList() {
		return warehouseLocationList;
	}
	public void setWarehouseLocationList(List warehouseLocationList) {
		this.warehouseLocationList = warehouseLocationList;
	}
	public List getWorkingAreaList() {
		return workingAreaList;
	}
	public void setWorkingAreaList(List workingAreaList) {
		this.workingAreaList = workingAreaList;
	}
	public List getForkliftEquipmentList() {
		return forkliftEquipmentList;
	}
	public void setForkliftEquipmentList(List forkliftEquipmentList) {
		this.forkliftEquipmentList = forkliftEquipmentList;
	}
	public List getTrailerEquipmentList() {
		return trailerEquipmentList;
	}
	public void setTrailerEquipmentList(List trailerEquipmentList) {
		this.trailerEquipmentList = trailerEquipmentList;
	}
	public List getSnList() {
		return snList;
	}
	public void setSnList(List snList) {
		this.snList = snList;
	}
	public List getDoList() {
		return doList;
	}
	public void setDoList(List doList) {
		this.doList = doList;
	}
	public ArrayList<MegaItem> getItems() {
		return items;
	}
	public List getCargoDetailList() {
		return cargoDetailList;
	}
	public void setCargoDetailList(List cargoDetailList) {
		this.cargoDetailList = cargoDetailList;
	}
	public List getCommodityCodeList() {
		return commodityCodeList;
	}
	public void setCommodityCodeList(List commodityCodeList) {
		this.commodityCodeList = commodityCodeList;
	}
	public List getGearsRequisitionList() {
		return gearsRequisitionList;
	}
	public void setGearsRequisitionList(List gearsRequisitionList) {
		this.gearsRequisitionList = gearsRequisitionList;
	}
	public List getPackageList() {
		return packageList;
	}
	public void setPackageList(List packageList) {
		this.packageList = packageList;
	}
	public List getCategoryList() {
		return categoryList;
	}
	public void setCategoryList(List categoryList) {
		this.categoryList = categoryList;
	}
	public void setItems(ArrayList<MegaItem> items) {
		this.items = items;
	}
	public ArrayList<MegaItem> getStevedoreItems() {
		return stevedoreItems;
	}
	public void setStevedoreItems(ArrayList<MegaItem> stevedoreItems) {
		this.stevedoreItems = stevedoreItems;
	}
	public ArrayList<MegaItem> getGearsItems() {
		return gearsItems;
	}
	public void setGearsItems(ArrayList<MegaItem> gearsItems) {
		this.gearsItems = gearsItems;
	}
	public ArrayList<MegaItem> getForkliftItems() {
		return forkliftItems;
	}
	public void setForkliftItems(ArrayList<MegaItem> forkliftItems) {
		this.forkliftItems = forkliftItems;
	}
	public ArrayList<MegaItem> getTrailerItems() {
		return trailerItems;
	}
	public void setTrailerItems(ArrayList<MegaItem> trailerItems) {
		this.trailerItems = trailerItems;
	}
	public ArrayList<MegaItem> getMechenicalItems() {
		return mechenicalItems;
	}
	public void setMechenicalItems(ArrayList<MegaItem> mechenicalItems) {
		this.mechenicalItems = mechenicalItems;
	}
	public ArrayList<MegaItem> getPortCraneItems() {
		return portCraneItems;
	}
	public void setPortCraneItems(ArrayList<MegaItem> portCraneItems) {
		this.portCraneItems = portCraneItems;
	}
	public ArrayList<MegaItem> getCargoDetailItems() {
		return cargoDetailItems;
	}
	public void setCargoDetailItems(ArrayList<MegaItem> cargoDetailItems) {
		this.cargoDetailItems = cargoDetailItems;
	}
	public ArrayList<MegaItem> getOperInfoItems() {
		return operInfoItems;
	}
	public void setOperInfoItems(ArrayList<MegaItem> operInfoItems) {
		this.operInfoItems = operInfoItems;
	}
	public ArrayList<MegaItem> getOperInfoItemsForGears() {
		return operInfoItemsForGears;
	}
	public void setOperInfoItemsForGears(ArrayList<MegaItem> operInfoItemsForGears) {
		this.operInfoItemsForGears = operInfoItemsForGears;
	}
	public ArrayList<MegaItem> getOperInfoItemsForForklift() {
		return operInfoItemsForForklift;
	}
	public void setOperInfoItemsForForklift(ArrayList<MegaItem> operInfoItemsForForklift) {
		this.operInfoItemsForForklift = operInfoItemsForForklift;
	}
	public ArrayList<MegaItem> getOperInfoItemsForTrailer() {
		return operInfoItemsForTrailer;
	}
	public void setOperInfoItemsForTrailer(ArrayList<MegaItem> operInfoItemsForTrailer) {
		this.operInfoItemsForTrailer = operInfoItemsForTrailer;
	}
	public ArrayList<MegaItem> getOperInfoItemsForMechanical() {
		return operInfoItemsForMechanical;
	}
	public void setOperInfoItemsForMechanical(ArrayList<MegaItem> operInfoItemsForMechanical) {
		this.operInfoItemsForMechanical = operInfoItemsForMechanical;
	}
	public ArrayList<MegaItem> getOperInfoItemsForPortCrane() {
		return operInfoItemsForPortCrane;
	}
	public void setOperInfoItemsForPortCrane(ArrayList<MegaItem> operInfoItemsForPortCrane) {
		this.operInfoItemsForPortCrane = operInfoItemsForPortCrane;
	}
	public ArrayList<MegaItem> getMegaStevedoreList() {
		return megaStevedoreList;
	}
	public void setMegaStevedoreList(ArrayList<MegaItem> megaStevedoreList) {
		this.megaStevedoreList = megaStevedoreList;
	}
	public ArrayList<MegaItem> getEquipmentList() {
		return equipmentList;
	}
	public void setEquipmentList(ArrayList<MegaItem> equipmentList) {
		this.equipmentList = equipmentList;
	}
	public ArrayList<MegaItem> getCompanyInfo() {
		return companyInfo;
	}
	public void setCompanyInfo(ArrayList<MegaItem> companyInfo) {
		this.companyInfo = companyInfo;
	}
	public ArrayList<MegaItem> getFlList() {
		return flList;
	}
	public void setFlList(ArrayList<MegaItem> flList) {
		this.flList = flList;
	}
	public ArrayList<MegaItem> getTrList() {
		return trList;
	}
	public void setTrList(ArrayList<MegaItem> trList) {
		this.trList = trList;
	}
	public ArrayList<MegaItem> getGrList() {
		return grList;
	}
	public void setGrList(ArrayList<MegaItem> grList) {
		this.grList = grList;
	}
	public ArrayList<MegaItem> getMcList() {
		return mcList;
	}
	public void setMcList(ArrayList<MegaItem> mcList) {
		this.mcList = mcList;
	}
	public List getConfirmationSlipDryBreakBulk() {
		return confirmationSlipDryBreakBulk;
	}
	public void setConfirmationSlipDryBreakBulk(List confirmationSlipDryBreakBulk) {
		this.confirmationSlipDryBreakBulk = confirmationSlipDryBreakBulk;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
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
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtb() {
		return etb;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public String getRptWorkYmd() {
		return rptWorkYmd;
	}
	public void setRptWorkYmd(String rptWorkYmd) {
		this.rptWorkYmd = rptWorkYmd;
	}
	public String getRptWorkYmd2() {
		return rptWorkYmd2;
	}
	public void setRptWorkYmd2(String rptWorkYmd2) {
		this.rptWorkYmd2 = rptWorkYmd2;
	}
	public String getRsDivCd() {
		return rsDivCd;
	}
	public void setRsDivCd(String rsDivCd) {
		this.rsDivCd = rsDivCd;
	}
	public String getWhworkDivCd() {
		return whworkDivCd;
	}
	public void setWhworkDivCd(String whworkDivCd) {
		this.whworkDivCd = whworkDivCd;
	}
	public String getWorkLoc() {
		return workLoc;
	}
	public void setWorkLoc(String workLoc) {
		this.workLoc = workLoc;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getRoleCdNm() {
		return roleCdNm;
	}
	public void setRoleCdNm(String roleCdNm) {
		this.roleCdNm = roleCdNm;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getEqTpCdNm() {
		return eqTpCdNm;
	}
	public void setEqTpCdNm(String eqTpCdNm) {
		this.eqTpCdNm = eqTpCdNm;
	}
	public String getEqQty() {
		return eqQty;
	}
	public void setEqQty(String eqQty) {
		this.eqQty = eqQty;
	}
	public String getEqGrp() {
		return eqGrp;
	}
	public void setEqGrp(String eqGrp) {
		this.eqGrp = eqGrp;
	}
	public String getIntExtDivCd() {
		return intExtDivCd;
	}
	public void setIntExtDivCd(String intExtDivCd) {
		this.intExtDivCd = intExtDivCd;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getWorkMode() {
		return workMode;
	}
	public void setWorkMode(String workMode) {
		this.workMode = workMode;
	}
	public String getWorkModeNm() {
		return workModeNm;
	}
	public void setWorkModeNm(String workModeNm) {
		this.workModeNm = workModeNm;
	}
	public String getWorkCd() {
		return workCd;
	}
	public void setWorkCd(String workCd) {
		this.workCd = workCd;
	}
	public String getNofJpbOper() {
		return nofJpbOper;
	}
	public void setNofJpbOper(String nofJpbOper) {
		this.nofJpbOper = nofJpbOper;
	}
	public String getNofContOper() {
		return nofContOper;
	}
	public void setNofContOper(String nofContOper) {
		this.nofContOper = nofContOper;
	}
	public String getWhUpdYn() {
		return whUpdYn;
	}
	public void setWhUpdYn(String whUpdYn) {
		this.whUpdYn = whUpdYn;
	}
	public String getManpowerYn() {
		return manpowerYn;
	}
	public void setManpowerYn(String manpowerYn) {
		this.manpowerYn = manpowerYn;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}
	public String getFridayYn() {
		return fridayYn;
	}
	public void setFridayYn(String fridayYn) {
		this.fridayYn = fridayYn;
	}
	public String getGazaHld() {
		return gazaHld;
	}
	public void setGazaHld(String gazaHld) {
		this.gazaHld = gazaHld;
	}
	public String getHiddenEmpId() {
		return hiddenEmpId;
	}
	public void setHiddenEmpId(String hiddenEmpId) {
		this.hiddenEmpId = hiddenEmpId;
	}
	public String getDriverHidden() {
		return driverHidden;
	}
	public void setDriverHidden(String driverHidden) {
		this.driverHidden = driverHidden;
	}
	public String getChangeShft() {
		return changeShft;
	}
	public void setChangeShft(String changeShft) {
		this.changeShft = changeShft;
	}
	public String getGrp() {
		return grp;
	}
	public void setGrp(String grp) {
		this.grp = grp;
	}
	public String getSvcDate() {
		return svcDate;
	}
	public void setSvcDate(String svcDate) {
		this.svcDate = svcDate;
	}
	public String getAtd() {
		return atd;
	}
	public void setAtd(String atd) {
		this.atd = atd;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public String getGrdCd() {
		return grdCd;
	}
	public void setGrdCd(String grdCd) {
		this.grdCd = grdCd;
	}
	public String getStfGrp() {
		return stfGrp;
	}
	public void setStfGrp(String stfGrp) {
		this.stfGrp = stfGrp;
	}
	public String getHoWorkDivCd() {
		return hoWorkDivCd;
	}
	public void setHoWorkDivCd(String hoWorkDivCd) {
		this.hoWorkDivCd = hoWorkDivCd;
	}
	public String getHiWorkDivCd() {
		return hiWorkDivCd;
	}
	public void setHiWorkDivCd(String hiWorkDivCd) {
		this.hiWorkDivCd = hiWorkDivCd;
	}
	public String getNosStr() {
		return nosStr;
	}
	public void setNosStr(String nosStr) {
		this.nosStr = nosStr;
	}
	public String getCapaStr() {
		return capaStr;
	}
	public void setCapaStr(String capaStr) {
		this.capaStr = capaStr;
	}
	public ArrayList<MegaItem> getMegaSummaryList() {
		return megaSummaryList;
	}
	public void setMegaSummaryList(ArrayList<MegaItem> megaSummaryList) {
		this.megaSummaryList = megaSummaryList;
	}
	public ArrayList<MegaItem> getMegaSumOperatorList() {
		return megaSumOperatorList;
	}
	public void setMegaSumOperatorList(ArrayList<MegaItem> megaSumOperatorList) {
		this.megaSumOperatorList = megaSumOperatorList;
	}
	public ArrayList<MegaItem> getMegaRemarkList() {
		return megaRemarkList;
	}
	public void setMegaRemarkList(ArrayList<MegaItem> megaRemarkList) {
		this.megaRemarkList = megaRemarkList;
	}
	public ArrayList<MegaItem> getVesselOperationDeployStaffList() {
		return vesselOperationDeployStaffList;
	}
	public void setVesselOperationDeployStaffList(ArrayList<MegaItem> vesselOperationDeployStaffList) {
		this.vesselOperationDeployStaffList = vesselOperationDeployStaffList;
	}
	public ArrayList<MegaItem> getMegaSumShipCraneList() {
		return megaSumShipCraneList;
	}
	public void setMegaSumShipCraneList(ArrayList<MegaItem> megaSumShipCraneList) {
		this.megaSumShipCraneList = megaSumShipCraneList;
	}
	public ArrayList<MegaItem> getMegaSumPortCraneList() {
		return megaSumPortCraneList;
	}
	public void setMegaSumPortCraneList(ArrayList<MegaItem> megaSumPortCraneList) {
		this.megaSumPortCraneList = megaSumPortCraneList;
	}
	public ArrayList<MegaItem> getMegaSumForkliftList() {
		return megaSumForkliftList;
	}
	public void setMegaSumForkliftList(ArrayList<MegaItem> megaSumForkliftList) {
		this.megaSumForkliftList = megaSumForkliftList;
	}
	public ArrayList<MegaItem> getPortCraneDeployedList() {
		return portCraneDeployedList;
	}
	public void setPortCraneDeployedList(ArrayList<MegaItem> portCraneDeployedList) {
		this.portCraneDeployedList = portCraneDeployedList;
	}
	public ArrayList<MegaItem> getForkliftDeployedList() {
		return forkliftDeployedList;
	}
	public void setForkliftDeployedList(ArrayList<MegaItem> forkliftDeployedList) {
		this.forkliftDeployedList = forkliftDeployedList;
	}
	public ArrayList<MegaItem> getStevedoreCompanyList() {
		return stevedoreCompanyList;
	}
	public void setStevedoreCompanyList(ArrayList<MegaItem> stevedoreCompanyList) {
		this.stevedoreCompanyList = stevedoreCompanyList;
	}
	public ArrayList<MegaItem> getGroupComboList() {
		return groupComboList;
	}
	public void setGroupComboList(ArrayList<MegaItem> groupComboList) {
		this.groupComboList = groupComboList;
	}
	public ArrayList<MegaItem> getRoleComboList() {
		return roleComboList;
	}
	public void setRoleComboList(ArrayList<MegaItem> roleComboList) {
		this.roleComboList = roleComboList;
	}
	public ArrayList<MegaItem> getStandardStaffGroupList() {
		return standardStaffGroupList;
	}
	public void setStandardStaffGroupList(ArrayList<MegaItem> standardStaffGroupList) {
		this.standardStaffGroupList = standardStaffGroupList;
	}
	public ArrayList<MegaItem> getStandardStaffList() {
		return standardStaffList;
	}
	public void setStandardStaffList(ArrayList<MegaItem> standardStaffList) {
		this.standardStaffList = standardStaffList;
	}
	public ArrayList<MegaItem> getStandardGroupList() {
		return standardGroupList;
	}
	public void setStandardGroupList(ArrayList<MegaItem> standardGroupList) {
		this.standardGroupList = standardGroupList;
	}
	public ArrayList<MegaItem> getOtherStaffGroupList() {
		return otherStaffGroupList;
	}
	public void setOtherStaffGroupList(ArrayList<MegaItem> otherStaffGroupList) {
		this.otherStaffGroupList = otherStaffGroupList;
	}
	public ArrayList<MegaItem> getNewStaffList() {
		return newStaffList;
	}
	public void setNewStaffList(ArrayList<MegaItem> newStaffList) {
		this.newStaffList = newStaffList;
	}
	public ArrayList<MegaItem> getExtraStaffGroupList() {
		return extraStaffGroupList;
	}
	public void setExtraStaffGroupList(ArrayList<MegaItem> extraStaffGroupList) {
		this.extraStaffGroupList = extraStaffGroupList;
	}
	public ArrayList<MegaItem> getExtraStaffList() {
		return extraStaffList;
	}
	public void setExtraStaffList(ArrayList<MegaItem> extraStaffList) {
		this.extraStaffList = extraStaffList;
	}
	public ArrayList<MegaItem> getExtraGroupList() {
		return extraGroupList;
	}
	public void setExtraGroupList(ArrayList<MegaItem> extraGroupList) {
		this.extraGroupList = extraGroupList;
	}
	public ArrayList<SearchVesselCallListItem> getVslList() {
		return vslList;
	}
	public void setVslList(ArrayList<SearchVesselCallListItem> vslList) {
		this.vslList = vslList;
	}
	public ArrayList<CodeMasterItem> getEquipmentTypeCodeList() {
		return equipmentTypeCodeList;
	}
	public void setEquipmentTypeCodeList(ArrayList<CodeMasterItem> equipmentTypeCodeList) {
		this.equipmentTypeCodeList = equipmentTypeCodeList;
	}
	public ArrayList<MegaItem> getStaffRoleList() {
		return staffRoleList;
	}
	public void setStaffRoleList(ArrayList<MegaItem> staffRoleList) {
		this.staffRoleList = staffRoleList;
	}
	public ArrayList<MegaItem> getGroupRoleList() {
		return groupRoleList;
	}
	public void setGroupRoleList(ArrayList<MegaItem> groupRoleList) {
		this.groupRoleList = groupRoleList;
	}
	public ArrayList<MegaItem> getAllRoleList() {
		return allRoleList;
	}
	public void setAllRoleList(ArrayList<MegaItem> allRoleList) {
		this.allRoleList = allRoleList;
	}
	public ArrayList<UserRegisterItem> getPartnerCodeList() {
		return partnerCodeList;
	}
	public void setPartnerCodeList(ArrayList<UserRegisterItem> partnerCodeList) {
		this.partnerCodeList = partnerCodeList;
	}
	public ArrayList<MegaItem> getForkliftList() {
		return forkliftList;
	}
	public void setForkliftList(ArrayList<MegaItem> forkliftList) {
		this.forkliftList = forkliftList;
	}
	public ArrayList<VOperationDeployStaffItem> getRoleOther() {
		return roleOther;
	}
	public void setRoleOther(ArrayList<VOperationDeployStaffItem> roleOther) {
		this.roleOther = roleOther;
	}
	public ArrayList<MegaItem> getDeployedStaffList() {
		return deployedStaffList;
	}
	public void setDeployedStaffList(ArrayList<MegaItem> deployedStaffList) {
		this.deployedStaffList = deployedStaffList;
	}
	public ArrayList<CodeMasterItem> getWorkingModeList() {
		return workingModeList;
	}
	public void setWorkingModeList(ArrayList<CodeMasterItem> workingModeList) {
		this.workingModeList = workingModeList;
	}
	public ArrayList<MegaItem> getMegaSumPortAndShipCraneList() {
		return megaSumPortAndShipCraneList;
	}
	public void setMegaSumPortAndShipCraneList(ArrayList<MegaItem> megaSumPortAndShipCraneList) {
		this.megaSumPortAndShipCraneList = megaSumPortAndShipCraneList;
	}
	public ArrayList<MegaItem> getMegaSumShoreCraneList() {
		return megaSumShoreCraneList;
	}
	public void setMegaSumShoreCraneList(ArrayList<MegaItem> megaSumShoreCraneList) {
		this.megaSumShoreCraneList = megaSumShoreCraneList;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getGroupNm() {
		return groupNm;
	}
	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}
	public String getFrmTime() {
		return frmTime;
	}
	public void setFrmTime(String frmTime) {
		this.frmTime = frmTime;
	}
	public String getFmHhmm() {
		return fmHhmm;
	}
	public void setFmHhmm(String fmHhmm) {
		this.fmHhmm = fmHhmm;
	}
	public String getToHhmm() {
		return toHhmm;
	}
	public void setToHhmm(String toHhmm) {
		this.toHhmm = toHhmm;
	}
	public String getIsGazetteHoliday() {
		return isGazetteHoliday;
	}
	public void setIsGazetteHoliday(String isGazetteHoliday) {
		this.isGazetteHoliday = isGazetteHoliday;
	}
	public String getIsSpecialCase() {
		return isSpecialCase;
	}
	public void setIsSpecialCase(String isSpecialCase) {
		this.isSpecialCase = isSpecialCase;
	}
	public String getJpbiDriverYn() {
		return jpbiDriverYn;
	}
	public void setJpbiDriverYn(String jpbiDriverYn) {
		this.jpbiDriverYn = jpbiDriverYn;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getOpeDivCd() {
		return opeDivCd;
	}
	public void setOpeDivCd(String opeDivCd) {
		this.opeDivCd = opeDivCd;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getCgDescCd() {
		return cgDescCd;
	}
	public void setCgDescCd(String cgDescCd) {
		this.cgDescCd = cgDescCd;
	}
	public String getCgDescNm() {
		return cgDescNm;
	}
	public void setCgDescNm(String cgDescNm) {
		this.cgDescNm = cgDescNm;
	}
	public String getCgDescVal() {
		return cgDescVal;
	}
	public void setCgDescVal(String cgDescVal) {
		this.cgDescVal = cgDescVal;
	}
	public String getDeliUpdateCd() {
		return deliUpdateCd;
	}
	public void setDeliUpdateCd(String deliUpdateCd) {
		this.deliUpdateCd = deliUpdateCd;
	}
	public String getDeliDeleteCd() {
		return deliDeleteCd;
	}
	public void setDeliDeleteCd(String deliDeleteCd) {
		this.deliDeleteCd = deliDeleteCd;
	}
	public String getHatchNo2() {
		return hatchNo2;
	}
	public void setHatchNo2(String hatchNo2) {
		this.hatchNo2 = hatchNo2;
	}
	public String getHatchNo3() {
		return hatchNo3;
	}
	public void setHatchNo3(String hatchNo3) {
		this.hatchNo3 = hatchNo3;
	}
	public String getHatchNo4() {
		return hatchNo4;
	}
	public void setHatchNo4(String hatchNo4) {
		this.hatchNo4 = hatchNo4;
	}
	public String getHatchNo5() {
		return hatchNo5;
	}
	public void setHatchNo5(String hatchNo5) {
		this.hatchNo5 = hatchNo5;
	}
	public String getHatchNo6() {
		return hatchNo6;
	}
	public void setHatchNo6(String hatchNo6) {
		this.hatchNo6 = hatchNo6;
	}
	public String getHatchNo7() {
		return hatchNo7;
	}
	public void setHatchNo7(String hatchNo7) {
		this.hatchNo7 = hatchNo7;
	}
	public String getHatchNo8() {
		return hatchNo8;
	}
	public void setHatchNo8(String hatchNo8) {
		this.hatchNo8 = hatchNo8;
	}
	public String getHatchNo9() {
		return hatchNo9;
	}
	public void setHatchNo9(String hatchNo9) {
		this.hatchNo9 = hatchNo9;
	}
	public String getHatchNo10() {
		return hatchNo10;
	}
	public void setHatchNo10(String hatchNo10) {
		this.hatchNo10 = hatchNo10;
	}
	public String getHatchNo11() {
		return hatchNo11;
	}
	public void setHatchNo11(String hatchNo11) {
		this.hatchNo11 = hatchNo11;
	}
	public String getHatchNo12() {
		return hatchNo12;
	}
	public void setHatchNo12(String hatchNo12) {
		this.hatchNo12 = hatchNo12;
	}
	public String getHatchNo13() {
		return hatchNo13;
	}
	public void setHatchNo13(String hatchNo13) {
		this.hatchNo13 = hatchNo13;
	}
	public String getHatchNo14() {
		return hatchNo14;
	}
	public void setHatchNo14(String hatchNo14) {
		this.hatchNo14 = hatchNo14;
	}
	public String getHatchNo15() {
		return hatchNo15;
	}
	public void setHatchNo15(String hatchNo15) {
		this.hatchNo15 = hatchNo15;
	}
	public String getHatchNo16() {
		return hatchNo16;
	}
	public void setHatchNo16(String hatchNo16) {
		this.hatchNo16 = hatchNo16;
	}
	public String getHatchNo17() {
		return hatchNo17;
	}
	public void setHatchNo17(String hatchNo17) {
		this.hatchNo17 = hatchNo17;
	}
	public String getHatchNo18() {
		return hatchNo18;
	}
	public void setHatchNo18(String hatchNo18) {
		this.hatchNo18 = hatchNo18;
	}
	public String getHatchNo19() {
		return hatchNo19;
	}
	public void setHatchNo19(String hatchNo19) {
		this.hatchNo19 = hatchNo19;
	}
	public String getHatchNo20() {
		return hatchNo20;
	}
	public void setHatchNo20(String hatchNo20) {
		this.hatchNo20 = hatchNo20;
	}
	public String getHatchNo21() {
		return hatchNo21;
	}
	public void setHatchNo21(String hatchNo21) {
		this.hatchNo21 = hatchNo21;
	}
	public String getHatchNo22() {
		return hatchNo22;
	}
	public void setHatchNo22(String hatchNo22) {
		this.hatchNo22 = hatchNo22;
	}
	public String getHatchNo23() {
		return hatchNo23;
	}
	public void setHatchNo23(String hatchNo23) {
		this.hatchNo23 = hatchNo23;
	}
	public String getHatchNo24() {
		return hatchNo24;
	}
	public void setHatchNo24(String hatchNo24) {
		this.hatchNo24 = hatchNo24;
	}
	public String getHatchNo25() {
		return hatchNo25;
	}
	public void setHatchNo25(String hatchNo25) {
		this.hatchNo25 = hatchNo25;
	}
	public String getHatchNo26() {
		return hatchNo26;
	}
	public void setHatchNo26(String hatchNo26) {
		this.hatchNo26 = hatchNo26;
	}
	public String getHatchNo27() {
		return hatchNo27;
	}
	public void setHatchNo27(String hatchNo27) {
		this.hatchNo27 = hatchNo27;
	}
	public String getHatchNo28() {
		return hatchNo28;
	}
	public void setHatchNo28(String hatchNo28) {
		this.hatchNo28 = hatchNo28;
	}
	public String getHatchNo29() {
		return hatchNo29;
	}
	public void setHatchNo29(String hatchNo29) {
		this.hatchNo29 = hatchNo29;
	}
	public String getHatchNo30() {
		return hatchNo30;
	}
	public void setHatchNo30(String hatchNo30) {
		this.hatchNo30 = hatchNo30;
	}
	public String getIsValidated() {
		return isValidated;
	}
	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	public String getOpeTpCd() {
		return opeTpCd;
	}
	public void setOpeTpCd(String opeTpCd) {
		this.opeTpCd = opeTpCd;
	}
	public String getCmdtGrCd() {
		return cmdtGrCd;
	}
	public void setCmdtGrCd(String cmdtGrCd) {
		this.cmdtGrCd = cmdtGrCd;
	}
	public String getCmdtGr() {
		return cmdtGr;
	}
	public void setCmdtGr(String cmdtGr) {
		this.cmdtGr = cmdtGr;
	}
	public String getOpeHr() {
		return opeHr;
	}
	public void setOpeHr(String opeHr) {
		this.opeHr = opeHr;
	}
	public String getWorkDd() {
		return workDd;
	}
	public void setWorkDd(String workDd) {
		this.workDd = workDd;
	}
}
