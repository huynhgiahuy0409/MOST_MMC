/**
* CheckListVSRItem.java
*
* Created on   : 2007-12-31
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-12-31 Miss cnsook 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.common.SearchVesselCallListItem;
import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.framework.dataitem.DataItem;

/**
* use ListVORItem Class as parameters to CUD 
*
* @author Miss cnsook
* @version 1.0
*
* @see 
*/
public class VSRCheckListItem extends DataItem {
    private String vslCallID;
    private String scn;
    private String workYmd;
    private String workDate;
    private String shftId;
    private String rsNm;
    private String rsQty;
    private String refNo;
    private String refYn;
    private String verifyStatus;
    private String curPage;
    private String rn;
    private String rnm;
    private String totalPage;
    private String berthLoc;
    private String verifyDate;
    private String verifyBy;
    private String requester;
    private String cnrtcd_temp;
    private String mbscd_temp;
    
    private String workArea;
    
    private List<Object> empIdList;
    private List<Object> empIdCombo;
    
    //Added by Mandy 20/01/2019
    private ArrayList<VSRCheckListItem> checkVSRList;
    private ArrayList<MegaItem> megaFList;
    private ArrayList<MegaItem> megaMEList;
    private ArrayList<MegaItem> megaTRList;
    private ArrayList<MegaItem> megaPCList;
    private ArrayList<SearchVesselCallListItem> searchVesselCallItem;
    private String workingStatus;
    private String craneGroup;
    
    private ArrayList<VSRCheckListItem> flEmpList;
    private ArrayList<VSRCheckListItem> requesterList;
    private ArrayList<VSRCheckListItem> megaNoList;
    private ArrayList<VSRCheckListItem> pcDeployList;
    
    //Added by vt.dat 21/09/2019
    private ArrayList<VSRCheckListItem> megaFListHHT;
    private ArrayList<VSRCheckListItem> megaMEListHHT;
    private ArrayList<VSRCheckListItem> megaTRListHHT;
    private ArrayList<VSRCheckListItem> megaPCListHHT;
    
    private List vslReportList;
    private List sdShiftingCargoList;
    private List sdLateBookingList;
    private List sdSONWList;
    private List stvList;
    private List jpvcList;
    private String messageCd;
    public String getMessageCd() {
		return messageCd;
	}
	public void setMessageCd(String messageCd) {
		this.messageCd = messageCd;
	}
	public List getJpvcList() {
		return jpvcList;
	}
	public void setJpvcList(List jpvcList) {
		this.jpvcList = jpvcList;
	}
	public List getStvList() {
		return stvList;
	}
	public void setStvList(List stvList) {
		this.stvList = stvList;
	}
	public List getVslReportList() {
		return vslReportList;
	}
	public List getSdShiftingCargoList() {
		return sdShiftingCargoList;
	}
	public List getSdLateBookingList() {
		return sdLateBookingList;
	}
	public List getSdSONWList() {
		return sdSONWList;
	}
	public void setVslReportList(List vslReportList) {
		this.vslReportList = vslReportList;
	}
	public void setSdShiftingCargoList(List sdShiftingCargoList) {
		this.sdShiftingCargoList = sdShiftingCargoList;
	}
	public void setSdLateBookingList(List sdLateBookingList) {
		this.sdLateBookingList = sdLateBookingList;
	}
	public void setSdSONWList(List sdSONWList) {
		this.sdSONWList = sdSONWList;
	}
	public ArrayList<VSRCheckListItem> getMegaNoList() {
		return megaNoList;
	}
	public void setMegaNoList(ArrayList<VSRCheckListItem> megaNoList) {
		this.megaNoList = megaNoList;
	}
	public ArrayList<VSRCheckListItem> getRequesterList() {
		return requesterList;
	}
	public void setRequesterList(ArrayList<VSRCheckListItem> requesterList) {
		this.requesterList = requesterList;
	}
	public String getCraneGroup() {
    	return craneGroup;
    }
    public void setCraneGroup(String craneGroup) {
    	this.craneGroup = craneGroup;
    }
    
	public ArrayList<SearchVesselCallListItem> getSearchJPVCItem() {
		return searchVesselCallItem;
	}
	public void setSearchJPVCItem(ArrayList<SearchVesselCallListItem> searchVesselCallItem) {
		this.searchVesselCallItem = searchVesselCallItem;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<MegaItem> getMegaFList() {
		return megaFList;
	}
	public void setMegaFList(ArrayList<MegaItem> megaFList) {
		this.megaFList = megaFList;
	}
	public ArrayList<MegaItem> getMegaMEList() {
		return megaMEList;
	}
	public void setMegaMEList(ArrayList<MegaItem> megaMEList) {
		this.megaMEList = megaMEList;
	}
	public ArrayList<MegaItem> getMegaTRList() {
		return megaTRList;
	}
	public void setMegaTRList(ArrayList<MegaItem> megaTRList) {
		this.megaTRList = megaTRList;
	}
	public ArrayList<MegaItem> getMegaPCList() {
		return megaPCList;
	}
	public void setMegaPCList(ArrayList<MegaItem> megaPCList) {
		this.megaPCList = megaPCList;
	}
	public ArrayList<VSRCheckListItem> getCheckVSRList() {
		return checkVSRList;
	}
	public void setCheckVSRList(ArrayList<VSRCheckListItem> checkVSRList) {
		this.checkVSRList = checkVSRList;
	}
	public List<Object> getEmpIdList() {
		return empIdList;
	}
	public void setEmpIdList(List<Object> empIdList) {
		this.empIdList = empIdList;
	}
	public List<Object> getEmpIdCombo() {
		return empIdCombo;
	}
	public void setEmpIdCombo(List<Object> empIdCombo) {
		this.empIdCombo = empIdCombo;
	}
	public String getRnm() {
        return rnm;
    }
    public void setRnm(String rnm) {
        this.rnm = rnm;
    }
    public String getMbscd_temp() {
        return mbscd_temp;
    }
    public void setMbscd_temp(String mbscd_temp) {
        this.mbscd_temp = mbscd_temp;
    }
    public String getRequester() {
        return requester;
    }
    public void setRequester(String requester) {
        this.requester = requester;
    }
    public String getRefYn() {
        return refYn;
    }
    public void setRefYn(String refYn) {
        this.refYn = refYn;
    }
    public String getRefNo() {
        return refNo;
    }
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    public String getWorkDate() {
        return workDate;
    }
    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }
    private String mbsCd;
    private String cnrtCd;
    private String operator;
    private String opeCompCd;
    private String opeCompNm;
    private String chagYN;
    private String rmk;
    private String divCd;
    private String updateId;
    private String workLoc;
    private String workLocTp;
    private String workLocTpNm;
    private String capa;
    private String workStDt;
    private String workEndDt;
    private String workOdrNo;
    private String sumitBy;
    private String sumitDt;
    private int seq;
    private int no;
    private String capaCd;
    private String capaDescr;
    private String userId;
    private String engNm;
    private String empId;
    //for loading mega no
    private String megaNo;
   
    private String hatchNo;
    private String hatchDir;
    //for loading equipment no
    private String eqNo,driver;
    
    //for searching empployee
    private String empNm,roleCd;

    //-- start ADD 20080804 tnkytn Need for HHT
    private String crud;
    //-- end   ADD 20080804 tnkytn Need for HHT
    
    private String IsME;
    private String IsFL;
    private String IsPC;
    private String IsSD;
    private String IsST;
    private String IsTR;
    private String atb;
    private String vslName;
    private String updateDt;
    private String shftNm;
    private String shftLb;
    private double shftCg;
    private String nosLb;
    
    private String payer;
    private String delvTpCd;
    private String delvTpNm;
    private String purpose;
    private String purposeNm;
    private int direct;
    private int indirect;
    private String setupTime;
    private String cgTpCd;
    private String cgTpNm;
    
    private String shpCrew;
    
    //Stevedore 
    private String stvdComp;
    private String stvdCompNm;
    private String nofStvdSprr;
    private String stvdNonTon;
    
    private String ownDivCdNm; 
    private String mt;
    private String NOS_SF1;
    private String NOS_SF2;
    private String NOS_SF3;
    private String nosCapa;
    private String crudFlag;
    private String sRoleCd;
    
    //Add for HHT
    private int megaSeq;
    
    public double getShftCg() {
        return shftCg;
    }
    public void setShftCg(double shftCg) {
        this.shftCg = shftCg;
    }
    public String getNosLb() {
        return nosLb;
    }
    public void setNosLb(String nosLb) {
        this.nosLb = nosLb;
    }
    public String getShftLb() {
        return shftLb;
    }
    public void setShftLb(String shftLb) {
        this.shftLb = shftLb;
    }
    public String getNosCapa() {
        return nosCapa;
    }
    public void setNosCapa(String nosCapa) {
        this.nosCapa = nosCapa;
    }
    public String getOpeCompCd() {
        return opeCompCd;
    }
    public void setOpeCompCd(String opeCompCd) {
        this.opeCompCd = opeCompCd;
    }
    public String getOpeCompNm() {
        return opeCompNm;
    }
    public void setOpeCompNm(String opeCompNm) {
        this.opeCompNm = opeCompNm;
    }
    public String getOwnDivCdNm() {
        return ownDivCdNm;
    }
    public void setOwnDivCdNm(String ownDivCdNm) {
        this.ownDivCdNm = ownDivCdNm;
    }
    public String getSumitDt() {
        return sumitDt;
    }
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    public String getNofStvdSprr() {
        return nofStvdSprr;
    }
    public void setNofStvdSprr(String nofStvdSprr) {
        this.nofStvdSprr = nofStvdSprr;
    }
    public String getStvdComp() {
        return stvdComp;
    }
    public void setStvdComp(String stvdComp) {
        this.stvdComp = stvdComp;
    }
    public String getStvdCompNm() {
        return stvdCompNm;
    }
    public void setStvdCompNm(String stvdCompNm) {
        this.stvdCompNm = stvdCompNm;
    }
    public String getStvdNonTon() {
        return stvdNonTon;
    }
    public void setStvdNonTon(String stvdNonTon) {
        this.stvdNonTon = stvdNonTon;
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator;
    }
    public String getWorkLocTpNm() {
        return workLocTpNm;
    }
    public void setWorkLocTpNm(String workLocTpNm) {
        this.workLocTpNm = workLocTpNm;
    }
    public String getWorkLocTp() {
        return workLocTp;
    }
    public void setWorkLocTp(String workLocTp) {
        this.workLocTp = workLocTp;
    }
    public String getPurposeNm() {
        return purposeNm;
    }
    public void setPurposeNm(String purposeNm) {
        this.purposeNm = purposeNm;
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
    public String getPurpose() {
        return purpose;
    }
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
    public String getShpCrew() {
        return shpCrew;
    }
    public void setShpCrew(String shpCrew) {
        this.shpCrew = shpCrew;
    }
    public String getCgTpNm() {
        return cgTpNm;
    }
    public void setCgTpNm(String cgTpNm) {
        this.cgTpNm = cgTpNm;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public int getDirect() {
        return direct;
    }

    public int getIndirect() {
        return indirect;
    }
    public void setIndirect(int indirect) {
        this.indirect = indirect;
    }
    public void setDirect(int direct) {
        this.direct = direct;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getSetupTime() {
        return setupTime;
    }
    public void setSetupTime(String setupTime) {
        this.setupTime = setupTime;
    }
    public String getUpdateDt() {
        return updateDt;
    }
    public void setUpdateDt(String updateDt) {
        this.updateDt = updateDt;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
//    public String getCrud() {
//        return crud;
//    }
//    public void setCrud(String crud) {
//        this.crud = crud;
//    }
    public String getIsFL() {
        return IsFL;
    }
    public void setIsFL(String isFL) {
        IsFL = isFL;
    }
    public String getIsME() {
        return IsME;
    }
    public void setIsME(String isME) {
        IsME = isME;
    }
    public String getIsPC() {
        return IsPC;
    }
    public void setIsPC(String isPC) {
        IsPC = isPC;
    }
    public String getIsST() {
        return IsST;
    }
    public void setIsST(String isST) {
        IsST = isST;
    }
    public String getIsSD() {
        return IsSD;
    }
    public String getIsTR() {
        return IsTR;
    }
    public void setIsTR(String isTR) {
        IsTR = isTR;
    }
    public void setIsSD(String isSD) {
        IsSD = isSD;
    }
    public String getVslName() {
        return vslName;
    }
    public void setVslName(String vslName) {
        this.vslName = vslName;
    }
    public String getEmpId() {
        return empId;
    }
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    public String getEngNm() {
        return engNm;
    }
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getCapaDescr() {
        return capaDescr;
    }
    public void setCapaDescr(String capaDescr) {
        this.capaDescr = capaDescr;
    }
    public String getUpdateId() {
        return updateId;
    }
    public void setUpdateId(String updateId) {
        this.updateId = updateId;
    }
    public String getCapaCd() {
        return capaCd;
    }
    public void setCapaCd(String capaCd) {
        this.capaCd = capaCd;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public int getSeq() {
        return seq;
    }
    public void setSeq(int seq) {
        this.seq = seq;
    }
    public String getSumitBy() {
        return sumitBy;
    }
    public void setSumitBy(String sumitBy) {
        this.sumitBy = sumitBy;
    }
    
    
    public String getChagYN() {
        return chagYN;
    }
    public void setChagYN(String chagYN) {
        this.chagYN = chagYN;
    }
    public String getCnrtCd() {
        return cnrtCd;
    }
    public void setCnrtCd(String cnrtCd) {
        this.cnrtCd = cnrtCd;
    }
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getMbsCd() {
        return mbsCd;
    }
    public void setMbsCd(String mbsCd) {
        this.mbsCd = mbsCd;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getRsNm() {
        return rsNm;
    }
    public void setRsNm(String rsNm) {
        this.rsNm = rsNm;
    }
  
    public String getCapa() {
        return capa;
    }
    public void setCapa(String capa) {
        this.capa = capa;
    }

    public String getRsQty() {
        return rsQty;
    }
    public void setRsQty(String rsQty) {
        this.rsQty = rsQty;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
   
    public String getVslCallID() {
        return vslCallID;
    }
    public void setVslCallID(String vslCallID) {
        this.vslCallID = vslCallID;
    }
    public String getWorkEndDt() {
        return workEndDt;
    }
    public void setWorkEndDt(String workEndDt) {
        this.workEndDt = workEndDt;
    }
    public String getWorkLoc() {
        return workLoc;
    }
    public void setWorkLoc(String workLoc) {
        this.workLoc = workLoc;
    }
    public String getWorkOdrNo() {
        return workOdrNo;
    }
    public void setWorkOdrNo(String workOdrNo) {
        this.workOdrNo = workOdrNo;
    }
    public String getWorkStDt() {
        return workStDt;
    }
    public void setWorkStDt(String workStDt) {
        this.workStDt = workStDt;
    }
    public String getWorkYmd() {
        return workYmd;
    }
    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
    }
    public String getHatchDir() {
        return hatchDir;
    }
    public void setHatchDir(String apFp) {
        this.hatchDir = apFp;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatch) {
        this.hatchNo = hatch;
    }
    public String getMegaNo() {
        return megaNo;
    }
    public void setMegaNo(String megaNo) {
        this.megaNo = megaNo;
    }
    public String getDriver() {
        return driver;
    }
    public void setDriver(String driver) {
        this.driver = driver;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    public String getEmpNm() {
        return empNm;
    }
    public void setEmpNm(String empNm) {
        this.empNm = empNm;
    }
    public String getRoleCd() {
        return roleCd;
    }
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }

    //-- start ADD 20080804 tnkytn Need for HHT
    public String getCrud() {
        return this.crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    //-- end   ADD 20080804 tnkytn Need for HHT
   public String getMt() {
        return mt;
    }
    public void setMt(String mt) {
        this.mt = mt;
    }
    public String getNOS_SF1() {
        return NOS_SF1;
    }
    public void setNOS_SF1(String nos_sf1) {
        NOS_SF1 = nos_sf1;
    }
    public String getNOS_SF2() {
        return NOS_SF2;
    }
    public void setNOS_SF2(String nos_sf2) {
        NOS_SF2 = nos_sf2;
    }
    public String getNOS_SF3() {
        return NOS_SF3;
    }
    public void setNOS_SF3(String nos_sf3) {
        NOS_SF3 = nos_sf3;
    }
    public String getCurPage() {
        return curPage;
    }
    public void setCurPage(String curPage) {
        this.curPage = curPage;
    }
    public String getRn() {
        return rn;
    }
    public void setRn(String rn) {
        this.rn = rn;
    }
    public String getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getCrudFlag() {
        return crudFlag;
    }
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
    public String getVerifyStatus() {
        return verifyStatus;
    }
    public void setVerifyStatus(String verifyStatus) {
        this.verifyStatus = verifyStatus;
    }
    public String getVerifyBy() {
        return verifyBy;
    }
    public void setVerifyBy(String verifyBy) {
        this.verifyBy = verifyBy;
    }
    public String getVerifyDate() {
        return verifyDate;
    }
    public void setVerifyDate(String verifyDate) {
        this.verifyDate = verifyDate;
    }
    public String getCnrtcd_temp() {
        return cnrtcd_temp;
    }
    public void setCnrtcd_temp(String cnrtcd_temp) {
        this.cnrtcd_temp = cnrtcd_temp;
    }
    public String getWorkArea() {
        return workArea;
    }
    public void setWorkArea(String workArea) {
        this.workArea = workArea;
    }
	public ArrayList<VSRCheckListItem> getFlEmpList() {
		return flEmpList;
	}
	public void setFlEmpList(ArrayList<VSRCheckListItem> flEmpList) {
		this.flEmpList = flEmpList;
	}
	public ArrayList<VSRCheckListItem> getPcDeployList() {
		return pcDeployList;
	}
	public void setPcDeployList(ArrayList<VSRCheckListItem> pcDeployList) {
		this.pcDeployList = pcDeployList;
	}
	public ArrayList<VSRCheckListItem> getMegaFListHHT() {
		return megaFListHHT;
	}
	public void setMegaFListHHT(ArrayList<VSRCheckListItem> megaFListHHT) {
		this.megaFListHHT = megaFListHHT;
	}
	public ArrayList<VSRCheckListItem> getMegaMEListHHT() {
		return megaMEListHHT;
	}
	public void setMegaMEListHHT(ArrayList<VSRCheckListItem> megaMEListHHT) {
		this.megaMEListHHT = megaMEListHHT;
	}
	public ArrayList<VSRCheckListItem> getMegaTRListHHT() {
		return megaTRListHHT;
	}
	public void setMegaTRListHHT(ArrayList<VSRCheckListItem> megaTRListHHT) {
		this.megaTRListHHT = megaTRListHHT;
	}
	public ArrayList<VSRCheckListItem> getMegaPCListHHT() {
		return megaPCListHHT;
	}
	public void setMegaPCListHHT(ArrayList<VSRCheckListItem> megaPCListHHT) {
		this.megaPCListHHT = megaPCListHHT;
	}
	public int getMegaSeq() {
		return megaSeq;
	}
	public void setMegaSeq(int megaSeq) {
		this.megaSeq = megaSeq;
	}
	public String getsRoleCd() {
		return sRoleCd;
	}
	public void setsRoleCd(String sRoleCd) {
		this.sRoleCd = sRoleCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
