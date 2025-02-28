
package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.codes.CodeMasterItem;
import com.tsb.most.basebiz.dataitem.codes.PartnerCodeItem;
import com.tsb.most.basebiz.dataitem.common.SearchVesselCallListItem;
import com.tsb.most.framework.dataitem.DataItem;


public class VOperationDeployItem extends DataItem {
    private static final long serialVersionUID = -8509599537184347772L;
    private String vslCallId;
    private String vslNm;
    private String eta;
    private String etb;
    private String seq;
    private String workYmd;
    private String rptWorkYmd;
    private String rptWorkYmd2;
    private String purpType;
    private String purpTpCd;
    private String purpTpCdNm;
    private String rsDivCd;
    private String shftId;
    private String shftNm;
    private String whworkDivCd;
    private String workLoc;
    private String roleCd;
    private String roleCdNm;
    private String empId;
    private String eqDivCd;
    private String eqDivCdNm;
    private String eqTpCd;
    private String eqTpCdNm;
    private String eqNo;
    private String eqQty;
    private String eqGrp;
    private String intExtDivCd;
    private String driver;
    private String rmk;
    private String workMode;
    private String workModeNm;
    private String workCd;
    private String megaNo;
    private String confmQty;
    private String whQty;
    private String nofJpbOper;
    private String nofContOper;
    private String whUpdYn;
    private String saId;
    private String manpowerYn;
    private String portCrnYn;
    private String forkliftYn;
    private String updUserId;
    private String updDt;
    private String engNm;
    private String insertType; //manpower, equipment, forklift
    private String pageNumber;
    private String fridayYn;
    private String gazaHld;
    private String hiddenEmpId;
    private String driverHidden;
    private String changeShft;
    private String grp;
    private String colColor;
    private String berthLoc;
    private String svcDate;
    private String atd;
    private String cgTpCd;
    private String cgTpNm;
    private String shftGrpCd;
    private String grdCd;
    private String stfGrp;
    private String hoWorkDivCd;
    private String hiWorkDivCd;
    private String nosStr;
    private String capaStr;
    
    private ArrayList<VOperationDeployItem> megaSummaryList;
    private ArrayList<VOperationDeployItem> megaSumOperatorList;
    private ArrayList<VOperationDeployItem> megaRemarkList;
    private ArrayList<VOperationDeployItem> vesselOperationDeployStaffList;
    private ArrayList<VOperationDeployItem> megaSumShipCraneList;
    private ArrayList<VOperationDeployItem> megaSumPortCraneList;
    private ArrayList<VOperationDeployItem> megaSumForkliftList;
    private ArrayList<VOperationDeployItem> portCraneDeployedList;
    private ArrayList<VOperationDeployItem> forkliftDeployedList;
    private ArrayList<VOperationDeployItem> stevedoreCompanyList;
    private ArrayList<VOperationDeployItem> groupComboList;
    private ArrayList<VOperationDeployItem> roleComboList;
    private ArrayList<VOperationDeployItem> standardStaffGroupList;
    private ArrayList<VOperationDeployItem> standardStaffList;
    private ArrayList<VOperationDeployItem> standardGroupList;
    private ArrayList<VOperationDeployItem> otherStaffGroupList;
    private ArrayList<VOperationDeployItem> newStaffList;
    private ArrayList<VOperationDeployItem> extraStaffGroupList;
    private ArrayList<VOperationDeployItem> extraStaffList;
    private ArrayList<VOperationDeployItem> extraGroupList;
    private ArrayList<SearchVesselCallListItem> vslList;
    private ArrayList<CodeMasterItem> equipmentTypeCodeList;
    private ArrayList<VOperationDeployItem> staffRoleList;
    private ArrayList<VOperationDeployItem> groupRoleList;
    private ArrayList<VOperationDeployItem> allRoleList;
    private ArrayList<ShiftGroupDefItem> shiftList;
    private ArrayList<VOperationDeployItem> equipmentList;
    private ArrayList<PartnerCodeItem> partnerCodeList;
    private ArrayList<VOperationDeployItem> forkliftList;
    private ArrayList<VOperationDeployStaffItem> roleOther;
    private ArrayList<VOperationDeployItem> deployedStaffList;
    private ArrayList<CodeMasterItem> workingModeList;
    
    private ArrayList<VOperationDeployItem> megaSumPortAndShipCraneList;
    private ArrayList<VOperationDeployItem> megaSumShoreCraneList;
    
    private String workingStatus;
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
    
	public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    private String flStatus;
    
    
    public String getFlStatus() {
        return flStatus;
    }
    public void setFlStatus(String flStatus) {
        this.flStatus = flStatus;
    }
    public String getGrp() {
        return grp;
    }
    public void setGrp(String grp) {
        this.grp = grp;
    }
    public String getChangeShft() {
        return changeShft;
    }
    public void setChangeShft(String changeShft) {
        this.changeShft = changeShft;
    }
    public String getDriverHidden() {
        return driverHidden;
    }
    public void setDriverHidden(String driverHidden) {
        this.driverHidden = driverHidden;
    }
    public String getHiddenEmpId() {
        return hiddenEmpId;
    }
    public void setHiddenEmpId(String hiddenEmpId) {
        this.hiddenEmpId = hiddenEmpId;
    }
    public String getGazaHld() {
        return gazaHld;
    }
    public void setGazaHld(String gazaHld) {
        this.gazaHld = gazaHld;
    }
    public String getFridayYn() {
        return fridayYn;
    }
    public void setFridayYn(String fridayYn) {
        this.fridayYn = fridayYn;
    }
    /**
     * @return Returns the pageNumber.
     */
    public String getPageNumber() {
        return pageNumber;
    }
    /**
     * @param pageNumber The pageNumber to set.
     */
    public void setPageNumber(String pageNumber) {
        this.pageNumber = pageNumber;
    }
    private String eqFacNo;
    private String eqFacNm;
    private String divCd;
    private String ownDivCd;
    private String ownDivCdNm;
    private String statCd;
    private String statCdNm;
    private String capaCd;
    private String capaDescr;
    private String locDiv;
    private String locId;
    private String nofPort;
    private String nofCntt;
    private String capa;
    private String stvdComp;
    private String stvdCompNm;
    private String trmgComp;
    private String no;
    private String purpLgvCd;
    private String depyShftId; //Deploy Shift Id
    
    //Map it from TMT_SHFT - Daily Deployment of Staf&Equipment Report
    private String equipment1;
    private String equipment2;
    private String equipment3;
    private String stvd1; 
    private String stvd2;
    private String stvd3;
    private String trmg1; 
    private String trmg2;
    private String trmg3;
    private String nonWorkers1; 
    private String nonWorkers2;
    private String nonWorkers3;
    private String wharf;
    private String consignee; 
    private String shipper;
    private String gangNo1;
    private String gangNo2;
    private String gangNo3;
    
    //Report header
    private String roleOE1;
    private String roleOE2;
    private String roleOE3;
    private String roleCS1;
    private String roleCS2;
    private String roleCS3;
    private String roleCC1;
    private String roleCC2;
    private String roleCC3;
    private String roleLS1;
    private String roleLS2;
    private String roleLS3;
    private String roleOS1;
    private String roleOS2;
    private String roleOS3;
    private String roleOC1;
    private String roleOC2;
    private String roleOC3;
    
    //Report footer
    private String ws1;
    private String ws2;
    private String ws3;
    private String whId1;
    private String whId2;
    
    private List collection2;
    
    public String getWs1() {
        return ws1;
    }
    public void setWs1(String ws1) {
        this.ws1 = ws1;
    }
    public String getWs2() {
        return ws2;
    }
    public void setWs2(String ws2) {
        this.ws2 = ws2;
    }
    public String getWs3() {
        return ws3;
    }
    public void setWs3(String ws3) {
        this.ws3 = ws3;
    }
    private String whId3;
    private String forkliftDriver1;
    private String forkliftDriver2;
    private String forkliftDriver3;
    private String standby1;
    private String standby2;
    private String standby3;
    private String lightDuty1;
    private String lightDuty2;
    private String lightDuty3;
    private String unavaiable1;
    private String unavaiable2;
    private String unavaiable3;
    
    //Report conditional
    private String fstShft;
    private String sndShft;
    private String trdShft;
    private String roleOE;
    private String roleCS;
    private String roleCC;
    private String roleLS;
    private String roleOS;
    private String roleOC;
    private String mdLTDT;
    private String mdSTBY;
    
    //Stevedore summary
    private String bulkDiv;
    private String company;
    private String gangQty;
    private String nofSprr;
    private String nofNonTon;
    private String dspReqhhmm;
    private String oprNm;
    private String oprQty;
    private String opeComp;
    
    private String reqr;            // Requester
    private String reqrNm;          // Requester Name
    
    //  Daily Deployment of Warehouse Report
    private String roleWS;
    private String roleOD;
  
    private String roleOD1;
    private String roleOD2;
    private String roleOD3;
    private String vslInfo;
    private String sa1;
    private String sa2;
    private String sa3;
    private String capa1;
    private String capa2;
    private String capa3;
    private String nos1;
    private String nos2;
    private String nos3;
    private String log;
    private String frTime;
    private String toTime;
    private String endTime;
    /**
     * @return Returns the frTime.
     */
    
    
    public String getFrTime() {
        return frTime;
    }
    public ArrayList<PartnerCodeItem> getPartnerCodeList() {
		return partnerCodeList;
	}
	public void setPartnerCodeList(ArrayList<PartnerCodeItem> partnerCodeList) {
		this.partnerCodeList = partnerCodeList;
	}
	public ArrayList<CodeMasterItem> getEquipmentTypeCodeList() {
		return equipmentTypeCodeList;
	}
	public void setEquipmentTypeCodeList(ArrayList<CodeMasterItem> equipmentTypeCodeList) {
		this.equipmentTypeCodeList = equipmentTypeCodeList;
	}
	public ArrayList<CodeMasterItem> getWorkingModeList() {
		return workingModeList;
	}
	public void setWorkingModeList(ArrayList<CodeMasterItem> workingModeList) {
		this.workingModeList = workingModeList;
	}
	/**
     * @param frTime The frTime to set.
     */
    public void setFrTime(String frTime) {
        this.frTime = frTime;
    }
    /**
     * @return Returns the toTime.
     */
    public String getToTime() {
        return toTime;
    }
    /**
     * @param toTime The toTime to set.
     */
    public void setToTime(String toTime) {
        this.toTime = toTime;
    }
    /**
     * @return Returns the scd.
     */
    public String getScd() {
        return scd;
    }
    /**
     * @param scd The scd to set.
     */
    public void setScd(String scd) {
        this.scd = scd;
    }
    /**
     * @return Returns the scdNm.
     */
    public String getScdNm() {
        return scdNm;
    }
    /**
     * @param scdNm The scdNm to set.
     */
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    /**
     * @param collection2 The collection2 to set.
     */
    /*public void setCollection2(ArrayList collection2) {
        this.collection2 = collection2;
    }*/
    private String scd;
    private String scdNm;
    
    /**
     * @return Returns the gpcd1.
     */
    public String getGpcd1() {
        return gpcd1;
    }
    /**
     * @param gpcd1 The gpcd1 to set.
     */
    public void setGpcd1(String gpcd1) {
        this.gpcd1 = gpcd1;
    }
    private String gpcd1;
    
    //private ArrayList collection2 = new ArrayList();
    
    public String getRptWorkYmd2() {
        return rptWorkYmd2;
    }
    public void setRptWorkYmd2(String rptWorkYmd2) {
        this.rptWorkYmd2 = rptWorkYmd2;
    }
    public String getLog() {
        return log;
    }
    public void setLog(String log) {
        this.log = log;
    }
    public String getCapa1() {
        return capa1;
    }
    public void setCapa1(String capa1) {
        this.capa1 = capa1;
    }
    public String getCapa2() {
        return capa2;
    }
    public void setCapa2(String capa2) {
        this.capa2 = capa2;
    }
    public String getCapa3() {
        return capa3;
    }
    public void setCapa3(String capa3) {
        this.capa3 = capa3;
    }
    public String getNos1() {
        return nos1;
    }
    public void setNos1(String nos1) {
        this.nos1 = nos1;
    }
    public String getNos2() {
        return nos2;
    }
    public void setNos2(String nos2) {
        this.nos2 = nos2;
    }
    public String getNos3() {
        return nos3;
    }
    public void setNos3(String nos3) {
        this.nos3 = nos3;
    }
    public String getSa1() {
        return sa1;
    }
    public void setSa1(String sa1) {
        this.sa1 = sa1;
    }
    public String getSa2() {
        return sa2;
    }
    public void setSa2(String sa2) {
        this.sa2 = sa2;
    }
    public String getSa3() {
        return sa3;
    }
    public void setSa3(String sa3) {
        this.sa3 = sa3;
    }
    public String getVslInfo() {
        return vslInfo;
    }
    public void setVslInfo(String vslInfo) {
        this.vslInfo = vslInfo;
    }
    /*public void setCollection2(List list) {
        this.collection2 = (ArrayList) list;
    }
    
    public List getCollection2() {
        return collection2;
    }
    
    public List getCollection2(int index){
        return (List)collection2.get(index);
    }*/
    
    public String getRoleOD1() {
        return roleOD1;
    }
    public void setRoleOD1(String roleOD1) {
        this.roleOD1 = roleOD1;
    }
    public String getRoleOD2() {
        return roleOD2;
    }
    public void setRoleOD2(String roleOD2) {
        this.roleOD2 = roleOD2;
    }
    public String getRoleOD3() {
        return roleOD3;
    }
    public void setRoleOD3(String roleOD3) {
        this.roleOD3 = roleOD3;
    }
    public String getRoleWS() {
        return roleWS;
    }
    public void setRoleWS(String roleWS) {
        this.roleWS = roleWS;
    }
    public String getTrmgComp() {
        return trmgComp;
    }
    public void setTrmgComp(String trmgComp) {
        this.trmgComp = trmgComp;
    }
    public String getTrmg1() {
        return trmg1;
    }
    public void setTrmg1(String trmg1) {
        this.trmg1 = trmg1;
    }
    public String getTrmg2() {
        return trmg2;
    }
    public void setTrmg2(String trmg2) {
        this.trmg2 = trmg2;
    }
    public String getTrmg3() {
        return trmg3;
    }
    public void setTrmg3(String trmg3) {
        this.trmg3 = trmg3;
    }
    /**
     * @return Returns the bulkDiv.
     */
    public String getBulkDiv() {
        return bulkDiv;
    }
    /**
     * @param bulkDiv The bulkDiv to set.
     */
    public void setBulkDiv(String bulkDiv) {
        this.bulkDiv = bulkDiv;
    }
    /**
     * @return Returns the capa.
     */
    public String getCapa() {
        return capa;
    }
    /**
     * @param capa The capa to set.
     */
    public void setCapa(String capa) {
        this.capa = capa;
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
     * @return Returns the company.
     */
    public String getCompany() {
        return company;
    }
    /**
     * @param company The company to set.
     */
    public void setCompany(String company) {
        this.company = company;
    }
    /**
     * @return Returns the confmQty.
     */
    public String getConfmQty() {
        return confmQty;
    }
    /**
     * @param confmQty The confmQty to set.
     */
    public void setConfmQty(String confmQty) {
        this.confmQty = confmQty;
    }
    /**
     * @return Returns the consignee.
     */
    public String getConsignee() {
        return consignee;
    }
    /**
     * @param consignee The consignee to set.
     */
    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }
    /**
     * @return Returns the depyShftId.
     */
    public String getDepyShftId() {
        return depyShftId;
    }
    /**
     * @param depyShftId The depyShftId to set.
     */
    public void setDepyShftId(String depyShftId) {
        this.depyShftId = depyShftId;
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
     * @return Returns the driver.
     */
    public String getDriver() {
        return driver;
    }
    /**
     * @param driver The driver to set.
     */
    public void setDriver(String driver) {
        this.driver = driver;
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
     * @return Returns the engNm.
     */
    public String getEngNm() {
        return engNm;
    }
    /**
     * @param engNm The engNm to set.
     */
    public void setEngNm(String engNm) {
        this.engNm = engNm;
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
     * @return Returns the eqFacNm.
     */
    public String getEqFacNm() {
        return eqFacNm;
    }
    /**
     * @param eqFacNm The eqFacNm to set.
     */
    public void setEqFacNm(String eqFacNm) {
        this.eqFacNm = eqFacNm;
    }
    /**
     * @return Returns the eqFacNo.
     */
    public String getEqFacNo() {
        return eqFacNo;
    }
    /**
     * @param eqFacNo The eqFacNo to set.
     */
    public void setEqFacNo(String eqFacNo) {
        this.eqFacNo = eqFacNo;
    }
    /**
     * @return Returns the eqGrp.
     */
    public String getEqGrp() {
        return eqGrp;
    }
    /**
     * @param eqGrp The eqGrp to set.
     */
    public void setEqGrp(String eqGrp) {
        this.eqGrp = eqGrp;
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
     * @return Returns the eqQty.
     */
    public String getEqQty() {
        return eqQty;
    }
    /**
     * @param eqQty The eqQty to set.
     */
    public void setEqQty(String eqQty) {
        this.eqQty = eqQty;
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
     * @return Returns the eqTpCdNm.
     */
    public String getEqTpCdNm() {
        return eqTpCdNm;
    }
    /**
     * @param eqTpCdNm The eqTpCdNm to set.
     */
    public void setEqTpCdNm(String eqTpCdNm) {
        this.eqTpCdNm = eqTpCdNm;
    }
    /**
     * @return Returns the equipment1.
     */
    public String getEquipment1() {
        return equipment1;
    }
    /**
     * @param equipment1 The equipment1 to set.
     */
    public void setEquipment1(String equipment1) {
        this.equipment1 = equipment1;
    }
    /**
     * @return Returns the equipment2.
     */
    public String getEquipment2() {
        return equipment2;
    }
    /**
     * @param equipment2 The equipment2 to set.
     */
    public void setEquipment2(String equipment2) {
        this.equipment2 = equipment2;
    }
    /**
     * @return Returns the equipment3.
     */
    public String getEquipment3() {
        return equipment3;
    }
    /**
     * @param equipment3 The equipment3 to set.
     */
    public void setEquipment3(String equipment3) {
        this.equipment3 = equipment3;
    }
    /**
     * @return Returns the eta.
     */
    public String getEta() {
        return eta;
    }
    /**
     * @param eta The eta to set.
     */
    public void setEta(String eta) {
        this.eta = eta;
    }
    /**
     * @return Returns the etb.
     */
    public String getEtb() {
        return etb;
    }
    /**
     * @param etb The etb to set.
     */
    public void setEtb(String etb) {
        this.etb = etb;
    }
    /**
     * @return Returns the forkliftDriver1.
     */
    public String getForkliftDriver1() {
        return forkliftDriver1;
    }
    /**
     * @param forkliftDriver1 The forkliftDriver1 to set.
     */
    public void setForkliftDriver1(String forkliftDriver1) {
        this.forkliftDriver1 = forkliftDriver1;
    }
    /**
     * @return Returns the forkliftDriver2.
     */
    public String getForkliftDriver2() {
        return forkliftDriver2;
    }
    /**
     * @param forkliftDriver2 The forkliftDriver2 to set.
     */
    public void setForkliftDriver2(String forkliftDriver2) {
        this.forkliftDriver2 = forkliftDriver2;
    }
    /**
     * @return Returns the forkliftDriver3.
     */
    public String getForkliftDriver3() {
        return forkliftDriver3;
    }
    /**
     * @param forkliftDriver3 The forkliftDriver3 to set.
     */
    public void setForkliftDriver3(String forkliftDriver3) {
        this.forkliftDriver3 = forkliftDriver3;
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
     * @return Returns the fstShft.
     */
    public String getFstShft() {
        return fstShft;
    }
    /**
     * @param fstShft The fstShft to set.
     */
    public void setFstShft(String fstShft) {
        this.fstShft = fstShft;
    }
    /**
     * @return Returns the gangQty.
     */
    public String getGangQty() {
        return gangQty;
    }
    /**
     * @param gangQty The gangQty to set.
     */
    public void setGangQty(String gangQty) {
        this.gangQty = gangQty;
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
     * @return Returns the intExtDivCd.
     */
    public String getIntExtDivCd() {
        return intExtDivCd;
    }
    /**
     * @param intExtDivCd The intExtDivCd to set.
     */
    public void setIntExtDivCd(String intExtDivCd) {
        this.intExtDivCd = intExtDivCd;
    }
    /**
     * @return Returns the lightDuty1.
     */
    public String getLightDuty1() {
        return lightDuty1;
    }
    /**
     * @param lightDuty1 The lightDuty1 to set.
     */
    public void setLightDuty1(String lightDuty1) {
        this.lightDuty1 = lightDuty1;
    }
    /**
     * @return Returns the lightDuty2.
     */
    public String getLightDuty2() {
        return lightDuty2;
    }
    /**
     * @param lightDuty2 The lightDuty2 to set.
     */
    public void setLightDuty2(String lightDuty2) {
        this.lightDuty2 = lightDuty2;
    }
    /**
     * @return Returns the lightDuty3.
     */
    public String getLightDuty3() {
        return lightDuty3;
    }
    /**
     * @param lightDuty3 The lightDuty3 to set.
     */
    public void setLightDuty3(String lightDuty3) {
        this.lightDuty3 = lightDuty3;
    }
    /**
     * @return Returns the locDiv.
     */
    public String getLocDiv() {
        return locDiv;
    }
    /**
     * @param locDiv The locDiv to set.
     */
    public void setLocDiv(String locDiv) {
        this.locDiv = locDiv;
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
     * @return Returns the manpowerYn.
     */
    public String getManpowerYn() {
        return manpowerYn;
    }
    /**
     * @param manpowerYn The manpowerYn to set.
     */
    public void setManpowerYn(String manpowerYn) {
        this.manpowerYn = manpowerYn;
    }
    /**
     * @return Returns the mdLTDT.
     */
    public String getMdLTDT() {
        return mdLTDT;
    }
    /**
     * @param mdLTDT The mdLTDT to set.
     */
    public void setMdLTDT(String mdLTDT) {
        this.mdLTDT = mdLTDT;
    }
    /**
     * @return Returns the mdSTBY.
     */
    public String getMdSTBY() {
        return mdSTBY;
    }
    /**
     * @param mdSTBY The mdSTBY to set.
     */
    public void setMdSTBY(String mdSTBY) {
        this.mdSTBY = mdSTBY;
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
     * @return Returns the nofCntt.
     */
    public String getNofCntt() {
        return nofCntt;
    }
    /**
     * @param nofCntt The nofCntt to set.
     */
    public void setNofCntt(String nofCntt) {
        this.nofCntt = nofCntt;
    }
    /**
     * @return Returns the nofContOper.
     */
    public String getNofContOper() {
        return nofContOper;
    }
    /**
     * @param nofContOper The nofContOper to set.
     */
    public void setNofContOper(String nofContOper) {
        this.nofContOper = nofContOper;
    }
    /**
     * @return Returns the nofJpbOper.
     */
    public String getNofJpbOper() {
        return nofJpbOper;
    }
    /**
     * @param nofJpbOper The nofJpbOper to set.
     */
    public void setNofJpbOper(String nofJpbOper) {
        this.nofJpbOper = nofJpbOper;
    }
    /**
     * @return Returns the nofNonTon.
     */
    public String getNofNonTon() {
        return nofNonTon;
    }
    /**
     * @param nofNonTon The nofNonTon to set.
     */
    public void setNofNonTon(String nofNonTon) {
        this.nofNonTon = nofNonTon;
    }
    /**
     * @return Returns the nofPort.
     */
    public String getNofPort() {
        return nofPort;
    }
    /**
     * @param nofPort The nofPort to set.
     */
    public void setNofPort(String nofPort) {
        this.nofPort = nofPort;
    }
    /**
     * @return Returns the nofSprr.
     */
    public String getNofSprr() {
        return nofSprr;
    }
    /**
     * @param nofSprr The nofSprr to set.
     */
    public void setNofSprr(String nofSprr) {
        this.nofSprr = nofSprr;
    }
    /**
     * @return Returns the nonWorkers1.
     */
    public String getNonWorkers1() {
        return nonWorkers1;
    }
    /**
     * @param nonWorkers1 The nonWorkers1 to set.
     */
    public void setNonWorkers1(String nonWorkers1) {
        this.nonWorkers1 = nonWorkers1;
    }
    /**
     * @return Returns the nonWorkers2.
     */
    public String getNonWorkers2() {
        return nonWorkers2;
    }
    /**
     * @param nonWorkers2 The nonWorkers2 to set.
     */
    public void setNonWorkers2(String nonWorkers2) {
        this.nonWorkers2 = nonWorkers2;
    }
    /**
     * @return Returns the nonWorkers3.
     */
    public String getNonWorkers3() {
        return nonWorkers3;
    }
    /**
     * @param nonWorkers3 The nonWorkers3 to set.
     */
    public void setNonWorkers3(String nonWorkers3) {
        this.nonWorkers3 = nonWorkers3;
    }
    /**
     * @return Returns the opeComp.
     */
    public String getOpeComp() {
        return opeComp;
    }
    /**
     * @param opeComp The opeComp to set.
     */
    public void setOpeComp(String opeComp) {
        this.opeComp = opeComp;
    }
    /**
     * @return Returns the oprNm.
     */
    public String getOprNm() {
        return oprNm;
    }
    /**
     * @param oprNm The oprNm to set.
     */
    public void setOprNm(String oprNm) {
        this.oprNm = oprNm;
    }
    /**
     * @return Returns the oprQty.
     */
    public String getOprQty() {
        return oprQty;
    }
    /**
     * @param oprQty The oprQty to set.
     */
    public void setOprQty(String oprQty) {
        this.oprQty = oprQty;
    }
    /**
     * @return Returns the ownDivCd.
     */
    public String getOwnDivCd() {
        return ownDivCd;
    }
    /**
     * @param ownDivCd The ownDivCd to set.
     */
    public void setOwnDivCd(String ownDivCd) {
        this.ownDivCd = ownDivCd;
    }
    /**
     * @return Returns the ownDivCdNm.
     */
    public String getOwnDivCdNm() {
        return ownDivCdNm;
    }
    /**
     * @param ownDivCdNm The ownDivCdNm to set.
     */
    public void setOwnDivCdNm(String ownDivCdNm) {
        this.ownDivCdNm = ownDivCdNm;
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
     * @return Returns the purpLgvCd.
     */
    public String getPurpLgvCd() {
        return purpLgvCd;
    }
    /**
     * @param purpLgvCd The purpLgvCd to set.
     */
    public void setPurpLgvCd(String purpLgvCd) {
        this.purpLgvCd = purpLgvCd;
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
     * @return Returns the roleCC.
     */
    public String getRoleCC() {
        return roleCC;
    }
    /**
     * @param roleCC The roleCC to set.
     */
    public void setRoleCC(String roleCC) {
        this.roleCC = roleCC;
    }
    /**
     * @return Returns the roleCC1.
     */
    public String getRoleCC1() {
        return roleCC1;
    }
    /**
     * @param roleCC1 The roleCC1 to set.
     */
    public void setRoleCC1(String roleCC1) {
        this.roleCC1 = roleCC1;
    }
    /**
     * @return Returns the roleCC2.
     */
    public String getRoleCC2() {
        return roleCC2;
    }
    /**
     * @param roleCC2 The roleCC2 to set.
     */
    public void setRoleCC2(String roleCC2) {
        this.roleCC2 = roleCC2;
    }
    /**
     * @return Returns the roleCC3.
     */
    public String getRoleCC3() {
        return roleCC3;
    }
    /**
     * @param roleCC3 The roleCC3 to set.
     */
    public void setRoleCC3(String roleCC3) {
        this.roleCC3 = roleCC3;
    }
    /**
     * @return Returns the roleCd.
     */
    public String getRoleCd() {
        return roleCd;
    }
    /**
     * @param roleCd The roleCd to set.
     */
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }
    /**
     * @return Returns the roleCS.
     */
    public String getRoleCS() {
        return roleCS;
    }
    /**
     * @param roleCS The roleCS to set.
     */
    public void setRoleCS(String roleCS) {
        this.roleCS = roleCS;
    }
    /**
     * @return Returns the roleCS1.
     */
    public String getRoleCS1() {
        return roleCS1;
    }
    /**
     * @param roleCS1 The roleCS1 to set.
     */
    public void setRoleCS1(String roleCS1) {
        this.roleCS1 = roleCS1;
    }
    /**
     * @return Returns the roleCS2.
     */
    public String getRoleCS2() {
        return roleCS2;
    }
    /**
     * @param roleCS2 The roleCS2 to set.
     */
    public void setRoleCS2(String roleCS2) {
        this.roleCS2 = roleCS2;
    }
    /**
     * @return Returns the roleCS3.
     */
    public String getRoleCS3() {
        return roleCS3;
    }
    /**
     * @param roleCS3 The roleCS3 to set.
     */
    public void setRoleCS3(String roleCS3) {
        this.roleCS3 = roleCS3;
    }
    /**
     * @return Returns the roleLS.
     */
    public String getRoleLS() {
        return roleLS;
    }
    /**
     * @param roleLS The roleLS to set.
     */
    public void setRoleLS(String roleLS) {
        this.roleLS = roleLS;
    }
    /**
     * @return Returns the roleLS1.
     */
    public String getRoleLS1() {
        return roleLS1;
    }
    /**
     * @param roleLS1 The roleLS1 to set.
     */
    public void setRoleLS1(String roleLS1) {
        this.roleLS1 = roleLS1;
    }
    /**
     * @return Returns the roleLS2.
     */
    public String getRoleLS2() {
        return roleLS2;
    }
    /**
     * @param roleLS2 The roleLS2 to set.
     */
    public void setRoleLS2(String roleLS2) {
        this.roleLS2 = roleLS2;
    }
    /**
     * @return Returns the roleLS3.
     */
    public String getRoleLS3() {
        return roleLS3;
    }
    /**
     * @param roleLS3 The roleLS3 to set.
     */
    public void setRoleLS3(String roleLS3) {
        this.roleLS3 = roleLS3;
    }
    /**
     * @return Returns the roleOC.
     */
    public String getRoleOC() {
        return roleOC;
    }
    /**
     * @param roleOC The roleOC to set.
     */
    public void setRoleOC(String roleOC) {
        this.roleOC = roleOC;
    }
    /**
     * @return Returns the roleOC1.
     */
    public String getRoleOC1() {
        return roleOC1;
    }
    /**
     * @param roleOC1 The roleOC1 to set.
     */
    public void setRoleOC1(String roleOC1) {
        this.roleOC1 = roleOC1;
    }
    /**
     * @return Returns the roleOC2.
     */
    public String getRoleOC2() {
        return roleOC2;
    }
    /**
     * @param roleOC2 The roleOC2 to set.
     */
    public void setRoleOC2(String roleOC2) {
        this.roleOC2 = roleOC2;
    }
    /**
     * @return Returns the roleOC3.
     */
    public String getRoleOC3() {
        return roleOC3;
    }
    /**
     * @param roleOC3 The roleOC3 to set.
     */
    public void setRoleOC3(String roleOC3) {
        this.roleOC3 = roleOC3;
    }
    /**
     * @return Returns the roleOE.
     */
    public String getRoleOE() {
        return roleOE;
    }
    /**
     * @param roleOE The roleOE to set.
     */
    public void setRoleOE(String roleOE) {
        this.roleOE = roleOE;
    }
    /**
     * @return Returns the roleOE1.
     */
    public String getRoleOE1() {
        return roleOE1;
    }
    /**
     * @param roleOE1 The roleOE1 to set.
     */
    public void setRoleOE1(String roleOE1) {
        this.roleOE1 = roleOE1;
    }
    /**
     * @return Returns the roleOE2.
     */
    public String getRoleOE2() {
        return roleOE2;
    }
    /**
     * @param roleOE2 The roleOE2 to set.
     */
    public void setRoleOE2(String roleOE2) {
        this.roleOE2 = roleOE2;
    }
    /**
     * @return Returns the roleOE3.
     */
    public String getRoleOE3() {
        return roleOE3;
    }
    /**
     * @param roleOE3 The roleOE3 to set.
     */
    public void setRoleOE3(String roleOE3) {
        this.roleOE3 = roleOE3;
    }
    /**
     * @return Returns the roleOS.
     */
    public String getRoleOS() {
        return roleOS;
    }
    /**
     * @param roleOS The roleOS to set.
     */
    public void setRoleOS(String roleOS) {
        this.roleOS = roleOS;
    }
    /**
     * @return Returns the roleOS1.
     */
    public String getRoleOS1() {
        return roleOS1;
    }
    /**
     * @param roleOS1 The roleOS1 to set.
     */
    public void setRoleOS1(String roleOS1) {
        this.roleOS1 = roleOS1;
    }
    /**
     * @return Returns the roleOS2.
     */
    public String getRoleOS2() {
        return roleOS2;
    }
    /**
     * @param roleOS2 The roleOS2 to set.
     */
    public void setRoleOS2(String roleOS2) {
        this.roleOS2 = roleOS2;
    }
    /**
     * @return Returns the roleOS3.
     */
    public String getRoleOS3() {
        return roleOS3;
    }
    /**
     * @param roleOS3 The roleOS3 to set.
     */
    public void setRoleOS3(String roleOS3) {
        this.roleOS3 = roleOS3;
    }
    /**
     * @return Returns the rptWorkYmd.
     */
    public String getRptWorkYmd() {
        return rptWorkYmd;
    }
    /**
     * @param rptWorkYmd The rptWorkYmd to set.
     */
    public void setRptWorkYmd(String rptWorkYmd) {
        this.rptWorkYmd = rptWorkYmd;
    }
    /**
     * @return Returns the rsDivCd.
     */
    public String getRsDivCd() {
        return rsDivCd;
    }
    /**
     * @param rsDivCd The rsDivCd to set.
     */
    public void setRsDivCd(String rsDivCd) {
        this.rsDivCd = rsDivCd;
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
    public String getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(String seq) {
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
     * @return Returns the shipper.
     */
    public String getShipper() {
        return shipper;
    }
    /**
     * @param shipper The shipper to set.
     */
    public void setShipper(String shipper) {
        this.shipper = shipper;
    }
    /**
     * @return Returns the sndShft.
     */
    public String getSndShft() {
        return sndShft;
    }
    /**
     * @param sndShft The sndShft to set.
     */
    public void setSndShft(String sndShft) {
        this.sndShft = sndShft;
    }
    /**
     * @return Returns the standby1.
     */
    public String getStandby1() {
        return standby1;
    }
    /**
     * @param standby1 The standby1 to set.
     */
    public void setStandby1(String standby1) {
        this.standby1 = standby1;
    }
    /**
     * @return Returns the standby2.
     */
    public String getStandby2() {
        return standby2;
    }
    /**
     * @param standby2 The standby2 to set.
     */
    public void setStandby2(String standby2) {
        this.standby2 = standby2;
    }
    /**
     * @return Returns the standby3.
     */
    public String getStandby3() {
        return standby3;
    }
    /**
     * @param standby3 The standby3 to set.
     */
    public void setStandby3(String standby3) {
        this.standby3 = standby3;
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
     * @return Returns the stvd1.
     */
    public String getStvd1() {
        return stvd1;
    }
    /**
     * @param stvd1 The stvd1 to set.
     */
    public void setStvd1(String stvd1) {
        this.stvd1 = stvd1;
    }
    /**
     * @return Returns the stvd2.
     */
    public String getStvd2() {
        return stvd2;
    }
    /**
     * @param stvd2 The stvd2 to set.
     */
    public void setStvd2(String stvd2) {
        this.stvd2 = stvd2;
    }
    /**
     * @return Returns the stvd3.
     */
    public String getStvd3() {
        return stvd3;
    }
    /**
     * @param stvd3 The stvd3 to set.
     */
    public void setStvd3(String stvd3) {
        this.stvd3 = stvd3;
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
     * @return Returns the trdShft.
     */
    public String getTrdShft() {
        return trdShft;
    }
    /**
     * @param trdShft The trdShft to set.
     */
    public void setTrdShft(String trdShft) {
        this.trdShft = trdShft;
    }
    /**
     * @return Returns the unavaiable1.
     */
    public String getUnavaiable1() {
        return unavaiable1;
    }
    /**
     * @param unavaiable1 The unavaiable1 to set.
     */
    public void setUnavaiable1(String unavaiable1) {
        this.unavaiable1 = unavaiable1;
    }
    /**
     * @return Returns the unavaiable2.
     */
    public String getUnavaiable2() {
        return unavaiable2;
    }
    /**
     * @param unavaiable2 The unavaiable2 to set.
     */
    public void setUnavaiable2(String unavaiable2) {
        this.unavaiable2 = unavaiable2;
    }
    /**
     * @return Returns the unavaiable3.
     */
    public String getUnavaiable3() {
        return unavaiable3;
    }
    /**
     * @param unavaiable3 The unavaiable3 to set.
     */
    public void setUnavaiable3(String unavaiable3) {
        this.unavaiable3 = unavaiable3;
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
     * @return Returns the wharf.
     */
    public String getWharf() {
        return wharf;
    }
    /**
     * @param wharf The wharf to set.
     */
    public void setWharf(String wharf) {
        this.wharf = wharf;
    }
    /**
     * @return Returns the whId1.
     */
    public String getWhId1() {
        return whId1;
    }
    /**
     * @param whId1 The whId1 to set.
     */
    public void setWhId1(String whId1) {
        this.whId1 = whId1;
    }
    /**
     * @return Returns the whId2.
     */
    public String getWhId2() {
        return whId2;
    }
    /**
     * @param whId2 The whId2 to set.
     */
    public void setWhId2(String whId2) {
        this.whId2 = whId2;
    }
    /**
     * @return Returns the whId3.
     */
    public String getWhId3() {
        return whId3;
    }
    /**
     * @param whId3 The whId3 to set.
     */
    public void setWhId3(String whId3) {
        this.whId3 = whId3;
    }
    /**
     * @return Returns the whQty.
     */
    public String getWhQty() {
        return whQty;
    }
    /**
     * @param whQty The whQty to set.
     */
    public void setWhQty(String whQty) {
        this.whQty = whQty;
    }
    /**
     * @return Returns the whUpdYn.
     */
    public String getWhUpdYn() {
        return whUpdYn;
    }
    /**
     * @param whUpdYn The whUpdYn to set.
     */
    public void setWhUpdYn(String whUpdYn) {
        this.whUpdYn = whUpdYn;
    }
    /**
     * @return Returns the whworkDivCd.
     */
    public String getWhworkDivCd() {
        return whworkDivCd;
    }
    /**
     * @param whworkDivCd The whworkDivCd to set.
     */
    public void setWhworkDivCd(String whworkDivCd) {
        this.whworkDivCd = whworkDivCd;
    }
    /**
     * @return Returns the workCd.
     */
    public String getWorkCd() {
        return workCd;
    }
    /**
     * @param workCd The workCd to set.
     */
    public void setWorkCd(String workCd) {
        this.workCd = workCd;
    }
    /**
     * @return Returns the workLoc.
     */
    public String getWorkLoc() {
        return workLoc;
    }
    /**
     * @param workLoc The workLoc to set.
     */
    public void setWorkLoc(String workLoc) {
        this.workLoc = workLoc;
    }
    /**
     * @return Returns the workMode.
     */
    public String getWorkMode() {
        return workMode;
    }
    /**
     * @param workMode The workMode to set.
     */
    public void setWorkMode(String workMode) {
        this.workMode = workMode;
    }
    /**
     * @return Returns the workModeNm.
     */
    public String getWorkModeNm() {
        return workModeNm;
    }
    /**
     * @param workModeNm The workModeNm to set.
     */
    public void setWorkModeNm(String workModeNm) {
        this.workModeNm = workModeNm;
    }
    /**
     * @return Returns the workYmd.
     */
    public String getWorkYmd() {
        return workYmd;
    }
    /**
     * @param workYmd The workYmd to set.
     */
    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
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
    public String getGangNo1() {
        return gangNo1;
    }
    public void setGangNo1(String gangNo1) {
        this.gangNo1 = gangNo1;
    }
    public String getGangNo2() {
        return gangNo2;
    }
    public void setGangNo2(String gangNo2) {
        this.gangNo2 = gangNo2;
    }
    public String getGangNo3() {
        return gangNo3;
    }
    public void setGangNo3(String gangNo3) {
        this.gangNo3 = gangNo3;
    }
    public String getRoleCdNm() {
        return roleCdNm;
    }
    public void setRoleCdNm(String roleCdNm) {
        this.roleCdNm = roleCdNm;
    }
    public String getColColor() {
        return colColor;
    }
    public void setColColor(String colColor) {
        this.colColor = colColor;
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
	public ArrayList<VOperationDeployItem> getMegaSummaryList() {
		return megaSummaryList;
	}
	public void setMegaSummaryList(ArrayList<VOperationDeployItem> megaSummaryList) {
		this.megaSummaryList = megaSummaryList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumOperatorList() {
		return megaSumOperatorList;
	}
	public void setMegaSumOperatorList(ArrayList<VOperationDeployItem> megaSumOperatorList) {
		this.megaSumOperatorList = megaSumOperatorList;
	}
	public ArrayList<VOperationDeployItem> getMegaRemarkList() {
		return megaRemarkList;
	}
	public void setMegaRemarkList(ArrayList<VOperationDeployItem> megaRemarkList) {
		this.megaRemarkList = megaRemarkList;
	}
	public ArrayList<VOperationDeployItem> getVesselOperationDeployStaffList() {
		return vesselOperationDeployStaffList;
	}
	public void setVesselOperationDeployStaffList(ArrayList<VOperationDeployItem> vesselOperationDeployStaffList) {
		this.vesselOperationDeployStaffList = vesselOperationDeployStaffList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumShipCraneList() {
		return megaSumShipCraneList;
	}
	public void setMegaSumShipCraneList(ArrayList<VOperationDeployItem> megaSumShipCraneList) {
		this.megaSumShipCraneList = megaSumShipCraneList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumPortCraneList() {
		return megaSumPortCraneList;
	}
	public void setMegaSumPortCraneList(ArrayList<VOperationDeployItem> megaSumPortCraneList) {
		this.megaSumPortCraneList = megaSumPortCraneList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumForkliftList() {
		return megaSumForkliftList;
	}
	public void setMegaSumForkliftList(ArrayList<VOperationDeployItem> megaSumForkliftList) {
		this.megaSumForkliftList = megaSumForkliftList;
	}
	public ArrayList<VOperationDeployItem> getPortCraneDeployedList() {
		return portCraneDeployedList;
	}
	public void setPortCraneDeployedList(ArrayList<VOperationDeployItem> portCraneDeployedList) {
		this.portCraneDeployedList = portCraneDeployedList;
	}
	public ArrayList<VOperationDeployItem> getForkliftDeployedList() {
		return forkliftDeployedList;
	}
	public void setForkliftDeployedList(ArrayList<VOperationDeployItem> forkliftDeployedList) {
		this.forkliftDeployedList = forkliftDeployedList;
	}
	public ArrayList<VOperationDeployItem> getStevedoreCompanyList() {
		return stevedoreCompanyList;
	}
	public void setStevedoreCompanyList(ArrayList<VOperationDeployItem> stevedoreCompanyList) {
		this.stevedoreCompanyList = stevedoreCompanyList;
	}
	public ArrayList<VOperationDeployItem> getGroupComboList() {
		return groupComboList;
	}
	public void setGroupComboList(ArrayList<VOperationDeployItem> groupComboList) {
		this.groupComboList = groupComboList;
	}
	public ArrayList<VOperationDeployItem> getRoleComboList() {
		return roleComboList;
	}
	public void setRoleComboList(ArrayList<VOperationDeployItem> roleComboList) {
		this.roleComboList = roleComboList;
	}
	public ArrayList<VOperationDeployItem> getStandardStaffGroupList() {
		return standardStaffGroupList;
	}
	public void setStandardStaffGroupList(ArrayList<VOperationDeployItem> standardStaffGroupList) {
		this.standardStaffGroupList = standardStaffGroupList;
	}
	public ArrayList<VOperationDeployItem> getStandardStaffList() {
		return standardStaffList;
	}
	public void setStandardStaffList(ArrayList<VOperationDeployItem> standardStaffList) {
		this.standardStaffList = standardStaffList;
	}
	public ArrayList<VOperationDeployItem> getStandardGroupList() {
		return standardGroupList;
	}
	public void setStandardGroupList(ArrayList<VOperationDeployItem> standardGroupList) {
		this.standardGroupList = standardGroupList;
	}
	public ArrayList<VOperationDeployItem> getOtherStaffGroupList() {
		return otherStaffGroupList;
	}
	public void setOtherStaffGroupList(ArrayList<VOperationDeployItem> otherStaffGroupList) {
		this.otherStaffGroupList = otherStaffGroupList;
	}
	public ArrayList<VOperationDeployItem> getNewStaffList() {
		return newStaffList;
	}
	public void setNewStaffList(ArrayList<VOperationDeployItem> newStaffList) {
		this.newStaffList = newStaffList;
	}
	public ArrayList<VOperationDeployItem> getExtraStaffGroupList() {
		return extraStaffGroupList;
	}
	public void setExtraStaffGroupList(ArrayList<VOperationDeployItem> extraStaffGroupList) {
		this.extraStaffGroupList = extraStaffGroupList;
	}
	public ArrayList<VOperationDeployItem> getExtraStaffList() {
		return extraStaffList;
	}
	public void setExtraStaffList(ArrayList<VOperationDeployItem> extraStaffList) {
		this.extraStaffList = extraStaffList;
	}
	public ArrayList<SearchVesselCallListItem> getVslList() {
		return vslList;
	}
	public void setVslList(ArrayList<SearchVesselCallListItem> vslList) {
		this.vslList = vslList;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public ArrayList<VOperationDeployItem> getStaffRoleList() {
		return staffRoleList;
	}
	public void setStaffRoleList(ArrayList<VOperationDeployItem> staffRoleList) {
		this.staffRoleList = staffRoleList;
	}
	public ArrayList<VOperationDeployItem> getGroupRoleList() {
		return groupRoleList;
	}
	public void setGroupRoleList(ArrayList<VOperationDeployItem> groupRoleList) {
		this.groupRoleList = groupRoleList;
	}
	public String getGrdCd() {
		return grdCd;
	}
	public void setGrdCd(String grdCd) {
		this.grdCd = grdCd;
	}
	public ArrayList<VOperationDeployItem> getAllRoleList() {
		return allRoleList;
	}
	public void setAllRoleList(ArrayList<VOperationDeployItem> allRoleList) {
		this.allRoleList = allRoleList;
	}
	public String getStfGrp() {
		return stfGrp;
	}
	public void setStfGrp(String stfGrp) {
		this.stfGrp = stfGrp;
	}
	public ArrayList<ShiftGroupDefItem> getShiftList() {
		return shiftList;
	}
	public void setShiftList(ArrayList<ShiftGroupDefItem> shiftList) {
		this.shiftList = shiftList;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
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
	public ArrayList<VOperationDeployItem> getEquipmentList() {
		return equipmentList;
	}
	public void setEquipmentList(ArrayList<VOperationDeployItem> equipmentList) {
		this.equipmentList = equipmentList;
	}

	public String getJpbiDriverYn() {
		return jpbiDriverYn;
	}
	public void setJpbiDriverYn(String jpbiDriverYn) {
		this.jpbiDriverYn = jpbiDriverYn;
	}
	
	public ArrayList<VOperationDeployItem> getForkliftList() {
		return forkliftList;
	}
	public void setForkliftList(ArrayList<VOperationDeployItem> forkliftList) {
		this.forkliftList = forkliftList;
	}
	public ArrayList<VOperationDeployStaffItem> getRoleOther() {
		return roleOther;
	}
	public void setRoleOther(ArrayList<VOperationDeployStaffItem> roleOther) {
		this.roleOther = roleOther;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public ArrayList<VOperationDeployItem> getDeployedStaffList() {
		return deployedStaffList;
	}
	public void setDeployedStaffList(ArrayList<VOperationDeployItem> deployedStaffList) {
		this.deployedStaffList = deployedStaffList;
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
	public String getRoleOD() {
		return roleOD;
	}
	public void setRoleOD(String roleOD) {
		this.roleOD = roleOD;
	}
	
	public void setCollection2(List list) {
        this.collection2 = (ArrayList) list;
    }
    
    public List getCollection2() {
        return collection2;
    }
    
    public List getCollection2(int index){
        return (List)collection2.get(index);
    }
	public ArrayList<VOperationDeployItem> getExtraGroupList() {
		return extraGroupList;
	}
	public void setExtraGroupList(ArrayList<VOperationDeployItem> extraGroupList) {
		this.extraGroupList = extraGroupList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumPortAndShipCraneList() {
		return megaSumPortAndShipCraneList;
	}
	public ArrayList<VOperationDeployItem> getMegaSumShoreCraneList() {
		return megaSumShoreCraneList;
	}
	public void setMegaSumPortAndShipCraneList(ArrayList<VOperationDeployItem> megaSumPortAndShipCraneList) {
		this.megaSumPortAndShipCraneList = megaSumPortAndShipCraneList;
	}
	public void setMegaSumShoreCraneList(ArrayList<VOperationDeployItem> megaSumShoreCraneList) {
		this.megaSumShoreCraneList = megaSumShoreCraneList;
	}
}
