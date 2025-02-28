package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class VORDryBreakBulkItem extends DataItem {
    private String vslCallId;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String cgTpCd;
    private String cgTpCdNm;
    private String workYmd;
    private String shftNm;
    private String shftId;
    private String searchType; 
    private String insertType; 
    private String userId;
  
    //infomation
    private int wharfMarkFrom;
    private int wharfMarkTo;
    private String atb;    
    private String vslNm;
    private String vslTp;
    private String vslTpNm;
    private String loa;
    private String etw;
    private String ata;
    private String atu;    
    private String atd;
    private String loadCargoQty;
    private String dischCargoQty;
    private String eta;
    private String sa;
    private String atw;
    private String atc;
    private String useYN;
    private String preAtu;
   
    //detail of handing
    private String hatchNo;
    private String shipgNoteNo;
    private String workStDt;
    private String workEndDt;
    private String cmdtCd;
    private int pkgQty;
    private double measurement;    
    private double wgt;
    private String doNo;
    private String jobTpCd;
    private String ctt;
    private String cgRefNo;
    private String clnCd;
    private String topCgCd;  
    private String gangNo;
    private int no; 
    
    //daily roster   
    private String eqTpCd;
    private String workLoc;    
    private String os;
    private String wh;
    private String gw;
    private String tw;
    private String fd;
    private String sm;
    private String dm;
    private String hm;
    private String nw;
    private String ew;
    private String sw;
    private String osChk;
    private String whChk;
    private String gwChk;
    private String twChk;
    private String fdChk;
    private String smChk;
    private String dmChk;
    private String hmChk;
    private String nwChk;
    private String ewChk;
    private String swChk;
    private String bg;
    private String ll;
    private String cu;
    private String wharf;
    private String hatch;
    private String yard;
    private String conventional;    
    private String rsDivCd;    
    private String roleCd;    
    private String empId;
    private String driverId;
    private double wkerQty;    
    private String crudFlag;  
    private String seq;    
    private String hatchDrtCd;
    private String workComp;
    private String compTpCd;
    private String mbsCd;
    private String roleCdNm;
    
    private String purpCd;
    private String eqFacNo ;
    private String eqFacNm;
    private String eqName ;
    private String facilityName ;
    private String roleName ;
    private String remark;
    
    
    private double spr ; //supervisor for workers
    private double winch ;
    private double signal ;
    private double deck ;
    private double hoper ;
    private double general ;
    private double nonworker ;
    
    private String topClean;
    private String fmHhMm; //Shift difinition
    private String toHhMm; // --

    private String cwDiv;
    
    private String withGears;
    
    private String dptAgent;
    
    private String chkAgent;
    private String vslShiftingSeq;
    private String vslShiftingYN;
    private String wgtBbkDbk;
    private String wgtLq;
    private String lashingCompCd;
    private double lashingGangNos;
    private String shipsCrewYn;

    private List <Object> shiftCombo;
    private List <Object> equipmentCombo;
    private List <Object> equipmentCombo2;
    private List <Object> facilityCombo;
    private List <Object> roleDivSCombo;
    private List <Object> roleDivTCombo;
    private String system;
    private Date rts1Dt;
    private Date rtsDt;
    private int count;
    
    private ArrayList<VORDryBreakBulkItem> listVOR;
    private ArrayList<VORDryBreakBulkItem> handlingList;
    private ArrayList<VORDryBreakBulkItem> vesselInfoList;
    private ArrayList<VORDryBreakBulkItem> items;
    private ArrayList<VORDryBreakBulkItem> shiftedLocList;
    private ArrayList<VORDryBreakBulkItem> shiftingList;
    private ArrayList<VORDryBreakBulkItem> bankingList;
    
    private String loading;
    private String discharging;
    private String shifting;
    private String impWgt;
    private String expWgt;
    
    //shifting
    private String reqr;
    private String atuDt;
    private String atbDt;
    private String atwDt;
    private String atcDt;
    private String chagYN;
    private int markFM;
    private int markTO;
    private String rsnCd;
    private String rmk;  
    private String nxBerthNo;
    private String berthCd;
    private String berthNm;
    private String rsnCdNm;
    
    //banking
    private String dblBnkDiv;
    private String dblBnkShip;
    private String startDate;
    private String endDate;    
    private String dblBnkDivNm;
    
    private String chk;
    private String superVisor;
    
    private String verifySt;
    private String verifyBy;
    private String verifyDt;
    
    //Vessel Operation Rpt
    private String divCd;
    private String supervisor;
    private String operClerk;
    private String steveComp;
    private String trimmingComp;
    private ArrayList<VORDryBreakBulkItem> vesselInformation;
    private ArrayList<VORDryBreakBulkItem> vesselInfo; 
	private ArrayList<VORDryBreakBulkItem> detailHandling;
    private ArrayList<VORDryBreakBulkItem> stevedoreList;
    private ArrayList<VORDryBreakBulkItem> trimmingList;
    private ArrayList<VORDryBreakBulkItem> remarkList;
    private ArrayList<VORDryBreakBulkItem> facility;
    private ArrayList<VORDryBreakBulkItem> handlingSumList;
    private ArrayList<VORDryBreakBulkItem> holidayList;
    
    
    // VOR Report
    private String blNo;
    private String snNo;
    private String mfDocId;
    private String tsptTpCd;
    private String tsptTpNm;
    private String catgCd;
    private String catgCdNm;
    private String delvTpNm;
    private String pkgTpCd;
	private String pkgTpNm;
    private String cmdtCdNm;
    private String cmdtGrpNm;
    private String shpr;
	private String shprNm;
	private String cnsne;
	private String cnsneNm;
	private String pol;
	private String polNm;
	private String pod;
	private String podNm;
	private String docMt;
	private String docM3;
	private String docQty;
	private String actualMt;
	private String actualM3;
	private String actualQty;
	
	private String grSdo;
	private String grNo;
	private String sdoNo;
	
	
	//Port of Departure Report
	private String arrivalDraft;		// Forward Draft/ After Draft
	private String departurelDraft;		// Forward Draft/ After Draft
	private String arrivalTime;
	private String departureTime;
	private String portStayTime;		// ATU - ATB	(hrs)
	private String operatingTime ;		// ATC - ATW	(hrs)
	private String idleTime;			// Idle time 
	private String shrCrneOpr;			// Shore crane operating weight/Ton
	private String etu;
	private String etb;
	private String berthLocId;
	private String shaCd;
	private String shaNm;
	private String voyage;				// VOYAGE
	private String addr;
	
	private String scn;
	
	private ArrayList<VORDryBreakBulkItem> reportOprSrv;
	private ArrayList<VORDryBreakBulkItem> reportForm1;
	private ArrayList<VORDryBreakBulkItem> reportForm2;
	
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
	public String getSystem() {
		return system;
	}
	public void setSystem(String system) {
		this.system = system;
	}
    
    public List<Object> getShiftCombo() {
		return shiftCombo;
	}
	public void setShiftCombo(List<Object> shiftCombo) {
		this.shiftCombo = shiftCombo;
	}
	public List<Object> getEquipmentCombo() {
		return equipmentCombo;
	}
	public void setEquipmentCombo(List<Object> equipmentCombo) {
		this.equipmentCombo = equipmentCombo;
	}
	public List<Object> getEquipmentCombo2() {
		return equipmentCombo2;
	}
	public void setEquipmentCombo2(List<Object> equipmentCombo) {
		this.equipmentCombo2 = equipmentCombo;
	}
	public List<Object> getRoleDivSCombo() {
		return roleDivSCombo;
	}
	public void setRoleDivSCombo(List<Object> roleDivSCombo) {
		this.roleDivSCombo = roleDivSCombo;
	}
	public List<Object> getFacilityCombo() {
		return facilityCombo;
	}
	public void setFacilityCombo(List<Object> facilityCombo) {
		this.facilityCombo = facilityCombo;
	}
	public List<Object> getRoleDivTCombo() {
		return roleDivTCombo;
	}
	public void setRoleDivTCombo(List<Object> roleDivTCombo) {
		this.roleDivTCombo = roleDivTCombo;
	}
	public String getChkAgent() {
        return chkAgent;
    }
    public void setChkAgent(String chkAgent) {
        this.chkAgent = chkAgent;
    }
    public String getDptAgent() {
        return dptAgent;
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
	public void setDptAgent(String dptAgent) {
        this.dptAgent = dptAgent;
    }
    /**
     * @return Returns the withGears.
     */
    public String getWithGears() {
        return withGears;
    }
    /**
     * @param withGears The withGears to set.
     */
    public void setWithGears(String withGears) {
        this.withGears = withGears;
    }
    public String getAta() {
        return ata;
    }
    public void setAta(String ata) {
        this.ata = ata;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtd() {
        return atd;
    }
    public void setAtd(String atd) {
        this.atd = atd;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
    }
    public String getBg() {
        return bg;
    }
    public void setBg(String bg) {
        this.bg = bg;
    }
    public String getCgRefNo() {
        return cgRefNo;
    }
    public void setCgRefNo(String cgRefNo) {
        this.cgRefNo = cgRefNo;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getClnCd() {
        return clnCd;
    }
    public void setClnCd(String clnCd) {
        this.clnCd = clnCd;
    }
    public String getCmdtCd() {
        return cmdtCd;
    }
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    public String getCompTpCd() {
        return compTpCd;
    }
    public void setCompTpCd(String compTpCd) {
        this.compTpCd = compTpCd;
    }
    public String getConventional() {
        return conventional;
    }
    public void setConventional(String conventional) {
        this.conventional = conventional;
    }
    public String getCrudFlag() {
        return crudFlag;
    }
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
    public String getCtt() {
        return ctt;
    }
    public void setCtt(String ctt) {
        this.ctt = ctt;
    }
    public String getCu() {
        return cu;
    }
    public void setCu(String cu) {
        this.cu = cu;
    }
    public String getDischCargoQty() {
        return dischCargoQty;
    }
    public void setDischCargoQty(String dischCargoQty) {
        this.dischCargoQty = dischCargoQty;
    }
    public String getDm() {
        return dm;
    }
    public void setDm(String dm) {
        this.dm = dm;
    }
    public String getDmChk() {
        return dmChk;
    }
    public void setDmChk(String dmChk) {
        this.dmChk = dmChk;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    public String getEmpId() {
        return empId;
    }
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    public String getEqName() {
        return eqName;
    }
    public void setEqName(String eqName) {
        this.eqName = eqName;
    }
    public String getEqTpCd() {
        return eqTpCd;
    }
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getEtw() {
        return etw;
    }
    public void setEtw(String etw) {
        this.etw = etw;
    }
    public String getEw() {
        return ew;
    }
    public void setEw(String ew) {
        this.ew = ew;
    }
    public String getEwChk() {
        return ewChk;
    }
    public void setEwChk(String ewChk) {
        this.ewChk = ewChk;
    }

    public String getFacilityName() {
        return facilityName;
    }
    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }
    public String getFd() {
        return fd;
    }
    public void setFd(String fd) {
        this.fd = fd;
    }
    public String getFdChk() {
        return fdChk;
    }
    public void setFdChk(String fdChk) {
        this.fdChk = fdChk;
    }
    public String getGw() {
        return gw;
    }
    public void setGw(String gw) {
        this.gw = gw;
    }
    public String getGwChk() {
        return gwChk;
    }
    public void setGwChk(String gwChk) {
        this.gwChk = gwChk;
    }
    public String getHatch() {
        return hatch;
    }
    public void setHatch(String hatch) {
        this.hatch = hatch;
    }
    public String getHatchDrtCd() {
        return hatchDrtCd;
    }
    public void setHatchDrtCd(String hatchDrtCd) {
        this.hatchDrtCd = hatchDrtCd;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getHm() {
        return hm;
    }
    public void setHm(String hm) {
        this.hm = hm;
    }
    public String getHmChk() {
        return hmChk;
    }
    public void setHmChk(String hmChk) {
        this.hmChk = hmChk;
    }
    public String getInsertType() {
        return insertType;
    }
    public void setInsertType(String insertType) {
        this.insertType = insertType;
    }
    public String getJobTpCd() {
        return jobTpCd;
    }
    public void setJobTpCd(String jobTpCd) {
        this.jobTpCd = jobTpCd;
    }
    public String getLl() {
        return ll;
    }
    public void setLl(String ll) {
        this.ll = ll;
    }
    public String getLoa() {
        return loa;
    }
    public void setLoa(String loa) {
        this.loa = loa;
    }
    public String getLoadCargoQty() {
        return loadCargoQty;
    }
    public void setLoadCargoQty(String loadCargoQty) {
        this.loadCargoQty = loadCargoQty;
    }
    public String getMbsCd() {
        return mbsCd;
    }
    public void setMbsCd(String mbsCd) {
        this.mbsCd = mbsCd;
    }
    public double getMeasurement() {
        return measurement;
    }
    public void setMeasurement(double measurement) {
        this.measurement = measurement;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getNw() {
        return nw;
    }
    public void setNw(String nw) {
        this.nw = nw;
    }
    public String getNwChk() {
        return nwChk;
    }
    public void setNwChk(String nwChk) {
        this.nwChk = nwChk;
    }
    public String getOs() {
        return os;
    }
    public void setOs(String os) {
        this.os = os;
    }
    public String getOsChk() {
        return osChk;
    }
    public void setOsChk(String osChk) {
        this.osChk = osChk;
    }
    public int getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
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
    public String getRsDivCd() {
        return rsDivCd;
    }
    public void setRsDivCd(String rsDivCd) {
        this.rsDivCd = rsDivCd;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

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
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getSm() {
        return sm;
    }
    public void setSm(String sm) {
        this.sm = sm;
    }
    public String getSmChk() {
        return smChk;
    }
    public void setSmChk(String smChk) {
        this.smChk = smChk;
    }
    public String getSw() {
        return sw;
    }
    public void setSw(String sw) {
        this.sw = sw;
    }
    public String getSwChk() {
        return swChk;
    }
    public void setSwChk(String swChk) {
        this.swChk = swChk;
    }
    public String getTopCgCd() {
        return topCgCd;
    }
    public void setTopCgCd(String topCgCd) {
        this.topCgCd = topCgCd;
    }
    public String getTw() {
        return tw;
    }
    public void setTw(String tw) {
        this.tw = tw;
    }
    public String getTwChk() {
        return twChk;
    }
    public void setTwChk(String twChk) {
        this.twChk = twChk;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getVslTp() {
        return vslTp;
    }
    public void setVslTp(String vslTp) {
        this.vslTp = vslTp;
    }
    public double getWgt() {
        return wgt;
    }
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    public String getWh() {
        return wh;
    }
    public void setWh(String wh) {
        this.wh = wh;
    }
    public String getWharf() {
        return wharf;
    }
    public void setWharf(String wharf) {
        this.wharf = wharf;
    }
    public int getWharfMarkFrom() {
        return wharfMarkFrom;
    }
    public void setWharfMarkFrom(int wharfMarkFrom) {
        this.wharfMarkFrom = wharfMarkFrom;
    }
    public int getWharfMarkTo() {
        return wharfMarkTo;
    }
    public void setWharfMarkTo(int wharfMarkTo) {
        this.wharfMarkTo = wharfMarkTo;
    }
    public String getWhChk() {
        return whChk;
    }
    public void setWhChk(String whChk) {
        this.whChk = whChk;
    }

    public String getWorkComp() {
        return workComp;
    }
    public void setWorkComp(String workComp) {
        this.workComp = workComp;
    }
    public String getWorkLoc() {
        return workLoc;
    }
    public void setWorkLoc(String workLoc) {
        this.workLoc = workLoc;
    }
    public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getYard() {
        return yard;
    }
    public void setYard(String yard) {
        this.yard = yard;
    }
	public String getVslCallId() {
	    return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
	    this.vslCallId = vslCallId;
	}
    public String getUseYN() {
        return useYN;
    }
    public void setUseYN(String useYN) {
        this.useYN = useYN;
    }
    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public String getEqFacNm() {
        return eqFacNm;
    }
    public void setEqFacNm(String eqFacNm) {
        this.eqFacNm = eqFacNm;
    }
    public String getEqFacNo() {
        return eqFacNo;
    }
    public void setEqFacNo(String eqFacNo) {
        this.eqFacNo = eqFacNo;
    }
    public String getPurpCd() {
        return purpCd;
    }
    public void setPurpCd(String purpCd) {
        this.purpCd = purpCd;
    }
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getSeq() {
    	return seq;
    }
    public void setWkerQty(double wkerQty) {
        this.wkerQty = wkerQty;
    }
    public double getWkerQty() {
    	return wkerQty;
    }
    public String getGangNo() {
        return gangNo;
    }
    public void setGangNo(String gangNo) {
        this.gangNo = gangNo;
    }
    public String getTopClean() {
        return topClean;
    }
    public void setTopClean(String topClean) {
        this.topClean = topClean;
    }
    public String getFmHhMm() {
        return fmHhMm;
    }
    public void setFmHhMm(String fmHhMm) {
        this.fmHhMm = fmHhMm;
    }
    public String getToHhMm() {
        return toHhMm;
    }
    public void setToHhMm(String toHhMm) {
        this.toHhMm = toHhMm;
    }
    public String getCwDiv() {
        return cwDiv;
    }
    public void setCwDiv(String cwDiv) {
        this.cwDiv = cwDiv;
    }
    public String getVslShiftingSeq() {
        return vslShiftingSeq;
    }
    public void setVslShiftingSeq(String vslShiftingSeq) {
        this.vslShiftingSeq = vslShiftingSeq;
    }
    public String getWgtBbkDbk() {
        return wgtBbkDbk;
    }
    public void setWgtBbkDbk(String wgtBbkDbk) {
        this.wgtBbkDbk = wgtBbkDbk;
    }
    public String getWgtLq() {
        return wgtLq;
    }
    public void setWgtLq(String wgtLq) {
        this.wgtLq = wgtLq;
    }
    public String getPreAtu() {
        return preAtu;
    }
    public void setPreAtu(String preAtu) {
        this.preAtu = preAtu;
    }
    public String getVslShiftingYN() {
        return vslShiftingYN;
    }
    public void setVslShiftingYN(String vslShiftingYN) {
        this.vslShiftingYN = vslShiftingYN;
    }
    public double getSpr() {
		return spr;
	}
	public void setSpr(double spr) {
		this.spr = spr;
	}
	public double getWinch() {
		return winch;
	}
	public void setWinch(double winch) {
		this.winch = winch;
	}
	public double getSignal() {
		return signal;
	}
	public void setSignal(double signal) {
		this.signal = signal;
	}
	public double getDeck() {
		return deck;
	}
	public void setDeck(double deck) {
		this.deck = deck;
	}
	public double getHoper() {
		return hoper;
	}
	public void setHoper(double hoper) {
		this.hoper = hoper;
	}
	public double getGeneral() {
		return general;
	}
	public void setGeneral(double general) {
		this.general = general;
	}

	public double getNonworker() {
		return nonworker;
	}
	public void setNonworker(double nonworker) {
		this.nonworker = nonworker;
	}
	public double getLashingGangNos() {
		return lashingGangNos;
	}
	public void setLashingGangNos(double lashingGangNos) {
		this.lashingGangNos = lashingGangNos;
	}
	public String getLashingCompCd() {
        return lashingCompCd;
    }
    public void setLashingCompCd(String lashingCompCd) {
        this.lashingCompCd = lashingCompCd;
    }
	public String getShipsCrewYn() {
		return shipsCrewYn;
	}
	public void setShipsCrewYn(String shipsCrewYn) {
		this.shipsCrewYn = shipsCrewYn;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public Date getRts1Dt() {
		return rts1Dt;
	}
	public void setRtsDt1(Date rtsDt1) {
		this.rts1Dt = rtsDt1;
	}
	public Date getRtsDt() {
		return rtsDt;
	}
	public void setRtsDt(Date rtsDt) {
		this.rtsDt = rtsDt;
	}
	public ArrayList<VORDryBreakBulkItem> getListVOR() {
		return listVOR;
	}
	public void setListVOR(ArrayList<VORDryBreakBulkItem> listVOR) {
		this.listVOR = listVOR;
	}
	public ArrayList<VORDryBreakBulkItem> getHandlingList() {
		return handlingList;
	}
	public void setHandlingList(ArrayList<VORDryBreakBulkItem> handlingList) {
		this.handlingList = handlingList;
	}
	public ArrayList<VORDryBreakBulkItem> getVesselInfoList() {
		return vesselInfoList;
	}
	public void setVesselInfoList(ArrayList<VORDryBreakBulkItem> vesselInfoList) {
		this.vesselInfoList = vesselInfoList;
	}
	public ArrayList<VORDryBreakBulkItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<VORDryBreakBulkItem> items) {
		this.items = items;
	}
	public ArrayList<VORDryBreakBulkItem> getShiftedLocList() {
		return shiftedLocList;
	}
	public void setShiftedLocList(ArrayList<VORDryBreakBulkItem> shiftedLocList) {
		this.shiftedLocList = shiftedLocList;
	}
	public ArrayList<VORDryBreakBulkItem> getShiftingList() {
		return shiftingList;
	}
	public void setShiftingList(ArrayList<VORDryBreakBulkItem> shiftingList) {
		this.shiftingList = shiftingList;
	}
	public ArrayList<VORDryBreakBulkItem> getBankingList() {
		return bankingList;
	}
	public void setBankingList(ArrayList<VORDryBreakBulkItem> bankingList) {
		this.bankingList = bankingList;
	}
	public String getLoading() {
		return loading;
	}
	public void setLoading(String loading) {
		this.loading = loading;
	}
	public String getDischarging() {
		return discharging;
	}
	public void setDischarging(String discharging) {
		this.discharging = discharging;
	}
	public String getShifting() {
		return shifting;
	}
	public void setShifting(String shifting) {
		this.shifting = shifting;
	}
	public String getImpWgt() {
		return impWgt;
	}
	public void setImpWgt(String impWgt) {
		this.impWgt = impWgt;
	}
	public String getExpWgt() {
		return expWgt;
	}
	public void setExpWgt(String expWgt) {
		this.expWgt = expWgt;
	}
	public String getReqr() {
		return reqr;
	}
	public void setReqr(String reqr) {
		this.reqr = reqr;
	}
	public String getAtuDt() {
		return atuDt;
	}
	public void setAtuDt(String atuDt) {
		this.atuDt = atuDt;
	}
	public String getAtbDt() {
		return atbDt;
	}
	public void setAtbDt(String atbDt) {
		this.atbDt = atbDt;
	}
	public String getAtwDt() {
		return atwDt;
	}
	public void setAtwDt(String atwDt) {
		this.atwDt = atwDt;
	}
	public String getAtcDt() {
		return atcDt;
	}
	public void setAtcDt(String atcDt) {
		this.atcDt = atcDt;
	}
	public String getChagYN() {
		return chagYN;
	}
	public void setChagYN(String chagYN) {
		this.chagYN = chagYN;
	}
	public int getMarkFM() {
		return markFM;
	}
	public void setMarkFM(int markFM) {
		this.markFM = markFM;
	}
	public int getMarkTO() {
		return markTO;
	}
	public void setMarkTO(int markTO) {
		this.markTO = markTO;
	}
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getNxBerthNo() {
		return nxBerthNo;
	}
	public void setNxBerthNo(String nxBerthNo) {
		this.nxBerthNo = nxBerthNo;
	}
	public String getBerthCd() {
		return berthCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	public String getRsnCdNm() {
		return rsnCdNm;
	}
	public void setRsnCdNm(String rsnCdNm) {
		this.rsnCdNm = rsnCdNm;
	}
	public String getDblBnkDiv() {
		return dblBnkDiv;
	}
	public void setDblBnkDiv(String dblBnkDiv) {
		this.dblBnkDiv = dblBnkDiv;
	}
	public String getDblBnkShip() {
		return dblBnkShip;
	}
	public void setDblBnkShip(String dblBnkShip) {
		this.dblBnkShip = dblBnkShip;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getDblBnkDivNm() {
		return dblBnkDivNm;
	}
	public void setDblBnkDivNm(String dblBnkDivNm) {
		this.dblBnkDivNm = dblBnkDivNm;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getSuperVisor() {
		return superVisor;
	}
	public void setSuperVisor(String superVisor) {
		this.superVisor = superVisor;
	}
	public String getVerifySt() {
		return verifySt;
	}
	public void setVerifySt(String verifySt) {
		this.verifySt = verifySt;
	}
	public String getVerifyBy() {
		return verifyBy;
	}
	public void setVerifyBy(String verifyBy) {
		this.verifyBy = verifyBy;
	}
	public String getVerifyDt() {
		return verifyDt;
	}
	public void setVerifyDt(String verifyDt) {
		this.verifyDt = verifyDt;
	}
	public void setRts1Dt(Date rts1Dt) {
		this.rts1Dt = rts1Dt;
	}
	public ArrayList<VORDryBreakBulkItem> getVesselInformation() {
		return vesselInformation;
	}
	public void setVesselInformation(ArrayList<VORDryBreakBulkItem> vesselInformation) {
		this.vesselInformation = vesselInformation;
	}
	public ArrayList<VORDryBreakBulkItem> getVesselInfo() {
		return vesselInfo;
	}
	public void setVesselInfo(ArrayList<VORDryBreakBulkItem> vesselInfo) {
		this.vesselInfo = vesselInfo;
	}
	public ArrayList<VORDryBreakBulkItem> getDetailHandling() {
		return detailHandling;
	}
	public void setDetailHandling(ArrayList<VORDryBreakBulkItem> detailHandling) {
		this.detailHandling = detailHandling;
	}
	public ArrayList<VORDryBreakBulkItem> getStevedoreList() {
		return stevedoreList;
	}
	public void setStevedoreList(ArrayList<VORDryBreakBulkItem> stevedoreList) {
		this.stevedoreList = stevedoreList;
	}
	public ArrayList<VORDryBreakBulkItem> getTrimmingList() {
		return trimmingList;
	}
	public void setTrimmingList(ArrayList<VORDryBreakBulkItem> trimmingList) {
		this.trimmingList = trimmingList;
	}
	public ArrayList<VORDryBreakBulkItem> getRemarkList() {
		return remarkList;
	}
	public void setRemarkList(ArrayList<VORDryBreakBulkItem> remarkList) {
		this.remarkList = remarkList;
	}
	public ArrayList<VORDryBreakBulkItem> getFacility() {
		return facility;
	}
	public void setFacility(ArrayList<VORDryBreakBulkItem> facility) {
		this.facility = facility;
	}
	public ArrayList<VORDryBreakBulkItem> getHandlingSumList() {
		return handlingSumList;
	}
	public void setHandlingSumList(ArrayList<VORDryBreakBulkItem> handlingSumList) {
		this.handlingSumList = handlingSumList;
	}
	public ArrayList<VORDryBreakBulkItem> getHolidayList() {
		return holidayList;
	}
	public void setHolidayList(ArrayList<VORDryBreakBulkItem> holidayList) {
		this.holidayList = holidayList;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getSupervisor() {
		return supervisor;
	}
	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}
	public String getOperClerk() {
		return operClerk;
	}
	public void setOperClerk(String operClerk) {
		this.operClerk = operClerk;
	}
	public String getSteveComp() {
		return steveComp;
	}
	public void setSteveComp(String steveComp) {
		this.steveComp = steveComp;
	}
	public String getTrimmingComp() {
		return trimmingComp;
	}
	public void setTrimmingComp(String trimmingComp) {
		this.trimmingComp = trimmingComp;
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
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getCmdtCdNm() {
		return cmdtCdNm;
	}
	public void setCmdtCdNm(String cmdtCdNm) {
		this.cmdtCdNm = cmdtCdNm;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPolNm() {
		return polNm;
	}
	public void setPolNm(String polNm) {
		this.polNm = polNm;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getPodNm() {
		return podNm;
	}
	public void setPodNm(String podNm) {
		this.podNm = podNm;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getActualMt() {
		return actualMt;
	}
	public void setActualMt(String actualMt) {
		this.actualMt = actualMt;
	}
	public String getActualM3() {
		return actualM3;
	}
	public void setActualM3(String actualM3) {
		this.actualM3 = actualM3;
	}
	public String getActualQty() {
		return actualQty;
	}
	public void setActualQty(String actualQty) {
		this.actualQty = actualQty;
	}
	public String getCgTpCdNm() {
		return cgTpCdNm;
	}
	public void setCgTpCdNm(String cgTpCdNm) {
		this.cgTpCdNm = cgTpCdNm;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getCatgCdNm() {
		return catgCdNm;
	}
	public void setCatgCdNm(String catgCdNm) {
		this.catgCdNm = catgCdNm;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getTsptTpNm() {
		return tsptTpNm;
	}
	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getGrSdo() {
		return grSdo;
	}
	public void setGrSdo(String grSdo) {
		this.grSdo = grSdo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getPortStayTime() {
		return portStayTime;
	}
	public void setPortStayTime(String portStayTime) {
		this.portStayTime = portStayTime;
	}
	public String getArrivalDraft() {
		return arrivalDraft;
	}
	public void setArrivalDraft(String arrivalDraft) {
		this.arrivalDraft = arrivalDraft;
	}
	public String getDeparturelDraft() {
		return departurelDraft;
	}
	public void setDeparturelDraft(String departurelDraft) {
		this.departurelDraft = departurelDraft;
	}
	public String getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	public String getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	public String getOperatingTime() {
		return operatingTime;
	}
	public void setOperatingTime(String operatingTime) {
		this.operatingTime = operatingTime;
	}
	public String getIdleTime() {
		return idleTime;
	}
	public void setIdleTime(String idleTime) {
		this.idleTime = idleTime;
	}
	public String getShrCrneOpr() {
		return shrCrneOpr;
	}
	public void setShrCrneOpr(String shrCrneOpr) {
		this.shrCrneOpr = shrCrneOpr;
	}
	public String getEtu() {
		return etu;
	}
	public void setEtu(String etu) {
		this.etu = etu;
	}
	public String getEtb() {
		return etb;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public String getBerthLocId() {
		return berthLocId;
	}
	public void setBerthLocId(String berthLocId) {
		this.berthLocId = berthLocId;
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
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getVslTpNm() {
		return vslTpNm;
	}
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}
	public ArrayList<VORDryBreakBulkItem> getReportOprSrv() {
		return reportOprSrv;
	}
	public void setReportOprSrv(ArrayList<VORDryBreakBulkItem> reportOprSrv) {
		this.reportOprSrv = reportOprSrv;
	}
	public ArrayList<VORDryBreakBulkItem> getReportForm1() {
		return reportForm1;
	}
	public void setReportForm1(ArrayList<VORDryBreakBulkItem> reportForm1) {
		this.reportForm1 = reportForm1;
	}
	public ArrayList<VORDryBreakBulkItem> getReportForm2() {
		return reportForm2;
	}
	public void setReportForm2(ArrayList<VORDryBreakBulkItem> reportForm2) {
		this.reportForm2 = reportForm2;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
