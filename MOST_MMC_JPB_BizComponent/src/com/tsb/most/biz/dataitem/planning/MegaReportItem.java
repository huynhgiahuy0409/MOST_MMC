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
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class MegaReportItem extends DataItem {

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
    private String reqTime;
    private String reqMin;
    private String whQty;
    private String reqQty;
    private String confmQty;
    private String actQty;
    private String chagQty;
    private String nofGang;
    private String nofOprSprr;
    private String nofOprClerk;
    private String nofStvdSprr;
    private String nofWchmn;
    private String nofStvdGwker;
    private String nofHatch;
    private String nofTrmgSprr;
    private String nofSglmn;
    private String nofDekmn;
    private String nofHopmn;
    private String nofTrmgGwker;
    private String trmgNonTon;
    private String nofOpe;
    private String stvdNonTon;
    private String cgTon;
    
    // Date
    private String workYmd;
    private String amdDt; // Amend Date
    private String reqDt;			// Requested Date, <SUMIT_DT>
    private String appDt;			// Approved Date
    private String rejDt;			// Reject Date
    private String cnclDt;			// Cancel Date
    private String etw;
    
    // List
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
    private ArrayList<MegaReportItem> items;
    private ArrayList operInfoItems;
    private ArrayList operInfoItemsForGears;
    private ArrayList operInfoItemsForForklift;
    private ArrayList operInfoItemsForTrailer;
    private ArrayList operInfoItemsForMechanical;
    private ArrayList operInfoItemsForPortCrane;
    private ArrayList<MegaReportItem> stevedoreItems;
    private ArrayList<MegaReportItem> gearsItems;
    private ArrayList<MegaReportItem> forkliftItems;
    private ArrayList<MegaReportItem> trailerItems;
    private ArrayList<MegaReportItem> mechenicalItems;
    private ArrayList<MegaReportItem> portCraneItems;
    private ArrayList<MegaReportItem> cargoDetailItems;
    private ArrayList operInfoDeleteItems;
    private ArrayList<MegaReportItem> megaStevedoreList;
    private ArrayList<MegaReportItem> equipmentList;
    private ArrayList<MegaReportItem> companyInfo;
    private ArrayList<MegaReportItem> flList;
    private ArrayList<MegaReportItem> trList;
    private ArrayList<MegaReportItem> grList;
    private ArrayList<MegaReportItem> mcList;
    
    public ArrayList getOperInfoDeleteItems() {
		return operInfoDeleteItems;
	}
	public void setOperInfoDeleteItems(ArrayList operInfoDeleteItems) {
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
    //public Date getWorkYmd() {
        //return workYmd;
    //}
    /**
     * @param workYmd The workYmd to set.
     */
    //public void setWorkYmd(Date workYmd) {
        //this.workYmd = workYmd;
    //}
    
    public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
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
	public ArrayList<MegaReportItem> getItems() {
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
	public void setItems(ArrayList<MegaReportItem> items) {
		this.items = items;
	}
	public ArrayList<MegaReportItem> getStevedoreItems() {
		return stevedoreItems;
	}
	public void setStevedoreItems(ArrayList<MegaReportItem> stevedoreItems) {
		this.stevedoreItems = stevedoreItems;
	}
	public ArrayList<MegaReportItem> getGearsItems() {
		return gearsItems;
	}
	public void setGearsItems(ArrayList<MegaReportItem> gearsItems) {
		this.gearsItems = gearsItems;
	}
	public ArrayList<MegaReportItem> getForkliftItems() {
		return forkliftItems;
	}
	public void setForkliftItems(ArrayList<MegaReportItem> forkliftItems) {
		this.forkliftItems = forkliftItems;
	}
	public ArrayList<MegaReportItem> getTrailerItems() {
		return trailerItems;
	}
	public void setTrailerItems(ArrayList<MegaReportItem> trailerItems) {
		this.trailerItems = trailerItems;
	}
	public ArrayList<MegaReportItem> getMechenicalItems() {
		return mechenicalItems;
	}
	public void setMechenicalItems(ArrayList<MegaReportItem> mechenicalItems) {
		this.mechenicalItems = mechenicalItems;
	}
	public ArrayList<MegaReportItem> getPortCraneItems() {
		return portCraneItems;
	}
	public void setPortCraneItems(ArrayList<MegaReportItem> portCraneItems) {
		this.portCraneItems = portCraneItems;
	}
	public ArrayList<MegaReportItem> getCargoDetailItems() {
		return cargoDetailItems;
	}
	public void setCargoDetailItems(ArrayList<MegaReportItem> cargoDetailItems) {
		this.cargoDetailItems = cargoDetailItems;
	}
	public ArrayList getOperInfoItems() {
		return operInfoItems;
	}
	public void setOperInfoItems(ArrayList operInfoItems) {
		this.operInfoItems = operInfoItems;
	}
	public ArrayList getOperInfoItemsForGears() {
		return operInfoItemsForGears;
	}
	public void setOperInfoItemsForGears(ArrayList operInfoItemsForGears) {
		this.operInfoItemsForGears = operInfoItemsForGears;
	}
	public ArrayList getOperInfoItemsForForklift() {
		return operInfoItemsForForklift;
	}
	public void setOperInfoItemsForForklift(ArrayList operInfoItemsForForklift) {
		this.operInfoItemsForForklift = operInfoItemsForForklift;
	}
	public ArrayList getOperInfoItemsForTrailer() {
		return operInfoItemsForTrailer;
	}
	public void setOperInfoItemsForTrailer(ArrayList operInfoItemsForTrailer) {
		this.operInfoItemsForTrailer = operInfoItemsForTrailer;
	}
	public ArrayList getOperInfoItemsForMechanical() {
		return operInfoItemsForMechanical;
	}
	public void setOperInfoItemsForMechanical(ArrayList operInfoItemsForMechanical) {
		this.operInfoItemsForMechanical = operInfoItemsForMechanical;
	}
	public ArrayList getOperInfoItemsForPortCrane() {
		return operInfoItemsForPortCrane;
	}
	public void setOperInfoItemsForPortCrane(ArrayList operInfoItemsForPortCrane) {
		this.operInfoItemsForPortCrane = operInfoItemsForPortCrane;
	}
	public ArrayList<MegaReportItem> getMegaStevedoreList() {
		return megaStevedoreList;
	}
	public void setMegaStevedoreList(ArrayList<MegaReportItem> megaStevedoreList) {
		this.megaStevedoreList = megaStevedoreList;
	}
	public ArrayList<MegaReportItem> getEquipmentList() {
		return equipmentList;
	}
	public void setEquipmentList(ArrayList<MegaReportItem> equipmentList) {
		this.equipmentList = equipmentList;
	}
	public ArrayList<MegaReportItem> getCompanyInfo() {
		return companyInfo;
	}
	public void setCompanyInfo(ArrayList<MegaReportItem> companyInfo) {
		this.companyInfo = companyInfo;
	}
	public ArrayList<MegaReportItem> getFlList() {
		return flList;
	}
	public void setFlList(ArrayList<MegaReportItem> flList) {
		this.flList = flList;
	}
	public ArrayList<MegaReportItem> getTrList() {
		return trList;
	}
	public void setTrList(ArrayList<MegaReportItem> trList) {
		this.trList = trList;
	}
	public ArrayList<MegaReportItem> getGrList() {
		return grList;
	}
	public void setGrList(ArrayList<MegaReportItem> grList) {
		this.grList = grList;
	}
	public ArrayList<MegaReportItem> getMcList() {
		return mcList;
	}
	public void setMcList(ArrayList<MegaReportItem> mcList) {
		this.mcList = mcList;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getAmdDt() {
		return amdDt;
	}
	public void setAmdDt(String amdDt) {
		this.amdDt = amdDt;
	}
	public String getReqDt() {
		return reqDt;
	}
	public void setReqDt(String reqDt) {
		this.reqDt = reqDt;
	}
	public String getAppDt() {
		return appDt;
	}
	public void setAppDt(String appDt) {
		this.appDt = appDt;
	}
	public String getRejDt() {
		return rejDt;
	}
	public void setRejDt(String rejDt) {
		this.rejDt = rejDt;
	}
	public String getCnclDt() {
		return cnclDt;
	}
	public void setCnclDt(String cnclDt) {
		this.cnclDt = cnclDt;
	}
	public String getEtw() {
		return etw;
	}
	public void setEtw(String etw) {
		this.etw = etw;
	}
	public String getReqTime() {
		return reqTime;
	}
	public void setReqTime(String reqTime) {
		this.reqTime = reqTime;
	}
	public String getReqMin() {
		return reqMin;
	}
	public void setReqMin(String reqMin) {
		this.reqMin = reqMin;
	}
	public String getWhQty() {
		return whQty;
	}
	public void setWhQty(String whQty) {
		this.whQty = whQty;
	}
	public String getReqQty() {
		return reqQty;
	}
	public void setReqQty(String reqQty) {
		this.reqQty = reqQty;
	}
	public String getConfmQty() {
		return confmQty;
	}
	public void setConfmQty(String confmQty) {
		this.confmQty = confmQty;
	}
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getChagQty() {
		return chagQty;
	}
	public void setChagQty(String chagQty) {
		this.chagQty = chagQty;
	}
	public String getNofGang() {
		return nofGang;
	}
	public void setNofGang(String nofGang) {
		this.nofGang = nofGang;
	}
	public String getNofOprSprr() {
		return nofOprSprr;
	}
	public void setNofOprSprr(String nofOprSprr) {
		this.nofOprSprr = nofOprSprr;
	}
	public String getNofOprClerk() {
		return nofOprClerk;
	}
	public void setNofOprClerk(String nofOprClerk) {
		this.nofOprClerk = nofOprClerk;
	}
	public String getNofStvdSprr() {
		return nofStvdSprr;
	}
	public void setNofStvdSprr(String nofStvdSprr) {
		this.nofStvdSprr = nofStvdSprr;
	}
	public String getNofWchmn() {
		return nofWchmn;
	}
	public void setNofWchmn(String nofWchmn) {
		this.nofWchmn = nofWchmn;
	}
	public String getNofStvdGwker() {
		return nofStvdGwker;
	}
	public void setNofStvdGwker(String nofStvdGwker) {
		this.nofStvdGwker = nofStvdGwker;
	}
	public String getNofHatch() {
		return nofHatch;
	}
	public void setNofHatch(String nofHatch) {
		this.nofHatch = nofHatch;
	}
	public String getNofTrmgSprr() {
		return nofTrmgSprr;
	}
	public void setNofTrmgSprr(String nofTrmgSprr) {
		this.nofTrmgSprr = nofTrmgSprr;
	}
	public String getNofSglmn() {
		return nofSglmn;
	}
	public void setNofSglmn(String nofSglmn) {
		this.nofSglmn = nofSglmn;
	}
	public String getNofDekmn() {
		return nofDekmn;
	}
	public void setNofDekmn(String nofDekmn) {
		this.nofDekmn = nofDekmn;
	}
	public String getNofHopmn() {
		return nofHopmn;
	}
	public void setNofHopmn(String nofHopmn) {
		this.nofHopmn = nofHopmn;
	}
	public String getNofTrmgGwker() {
		return nofTrmgGwker;
	}
	public void setNofTrmgGwker(String nofTrmgGwker) {
		this.nofTrmgGwker = nofTrmgGwker;
	}
	public String getTrmgNonTon() {
		return trmgNonTon;
	}
	public void setTrmgNonTon(String trmgNonTon) {
		this.trmgNonTon = trmgNonTon;
	}
	public String getNofOpe() {
		return nofOpe;
	}
	public void setNofOpe(String nofOpe) {
		this.nofOpe = nofOpe;
	}
	
	public String getCgTon() {
		return cgTon;
	}
	public void setCgTon(String cgTon) {
		this.cgTon = cgTon;
	}
	public String getStvdNonTon() {
		return stvdNonTon;
	}
	
	public void setStvdNonTon(String stvdNonTon) {
		this.stvdNonTon = stvdNonTon;
	}
	
    
}
