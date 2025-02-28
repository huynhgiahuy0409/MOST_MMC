package com.tsb.most.biz.dataitem.operation;

import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class StevedoreTrimmingItem extends DataItem {
	private String vslCallId;
    private String cgTpCd;
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
    private String loa;
    private String etw;
    private String ata;
    private String atu;    
    private String atd;
    private String loadCargoQty;
    private String dischCargoQty;
    private String vslCd;
    private String eta;
    private String sa;
    private String atw;
    private String atc;
    private String useYN;
    private String preAtu;
    //detail of handing
    private String hatchNo;
    private String shipgNoteNo;
    private Date workStDt;
    private Date workEndDt;
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
    private String workStDtStr;
    private String workEndDtStr;
    private String workYmdStr;
    
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
    private String facility ;
    private String facilityName ;
    private String roleName ;
    private String remark;
    private double spr ; //supervisor for workers
    private double winch ;
    private double signal ;
    private double deck ;
    private double hoper ;
    private double general ;
    private double supervisor;
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
    private String tallyWorker;
    private String callYear;
    private String callSeq;
    private String scn;
    
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getInsertType() {
		return insertType;
	}
	public void setInsertType(String insertType) {
		this.insertType = insertType;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
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
	public String getLoa() {
		return loa;
	}
	public void setLoa(String loa) {
		this.loa = loa;
	}
	public String getEtw() {
		return etw;
	}
	public void setEtw(String etw) {
		this.etw = etw;
	}
	public String getAta() {
		return ata;
	}
	public void setAta(String ata) {
		this.ata = ata;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getAtd() {
		return atd;
	}
	public void setAtd(String atd) {
		this.atd = atd;
	}
	public String getLoadCargoQty() {
		return loadCargoQty;
	}
	public void setLoadCargoQty(String loadCargoQty) {
		this.loadCargoQty = loadCargoQty;
	}
	public String getDischCargoQty() {
		return dischCargoQty;
	}
	public void setDischCargoQty(String dischCargoQty) {
		this.dischCargoQty = dischCargoQty;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getSa() {
		return sa;
	}
	public void setSa(String sa) {
		this.sa = sa;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public String getAtc() {
		return atc;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}
	public String getUseYN() {
		return useYN;
	}
	public void setUseYN(String useYN) {
		this.useYN = useYN;
	}
	public String getPreAtu() {
		return preAtu;
	}
	public void setPreAtu(String preAtu) {
		this.preAtu = preAtu;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
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
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public double getMeasurement() {
		return measurement;
	}
	public void setMeasurement(double measurement) {
		this.measurement = measurement;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getCtt() {
		return ctt;
	}
	public void setCtt(String ctt) {
		this.ctt = ctt;
	}
	public String getCgRefNo() {
		return cgRefNo;
	}
	public void setCgRefNo(String cgRefNo) {
		this.cgRefNo = cgRefNo;
	}
	public String getClnCd() {
		return clnCd;
	}
	public void setClnCd(String clnCd) {
		this.clnCd = clnCd;
	}
	public String getTopCgCd() {
		return topCgCd;
	}
	public void setTopCgCd(String topCgCd) {
		this.topCgCd = topCgCd;
	}
	public String getGangNo() {
		return gangNo;
	}
	public void setGangNo(String gangNo) {
		this.gangNo = gangNo;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getWorkStDtStr() {
		return workStDtStr;
	}
	public void setWorkStDtStr(String workStDtStr) {
		this.workStDtStr = workStDtStr;
	}
	public String getWorkEndDtStr() {
		return workEndDtStr;
	}
	public void setWorkEndDtStr(String workEndDtStr) {
		this.workEndDtStr = workEndDtStr;
	}
	public String getWorkYmdStr() {
		return workYmdStr;
	}
	public void setWorkYmdStr(String workYmdStr) {
		this.workYmdStr = workYmdStr;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getWorkLoc() {
		return workLoc;
	}
	public void setWorkLoc(String workLoc) {
		this.workLoc = workLoc;
	}
	public String getOs() {
		return os;
	}
	public void setOs(String os) {
		this.os = os;
	}
	public String getWh() {
		return wh;
	}
	public void setWh(String wh) {
		this.wh = wh;
	}
	public String getGw() {
		return gw;
	}
	public void setGw(String gw) {
		this.gw = gw;
	}
	public String getTw() {
		return tw;
	}
	public void setTw(String tw) {
		this.tw = tw;
	}
	public String getFd() {
		return fd;
	}
	public void setFd(String fd) {
		this.fd = fd;
	}
	public String getSm() {
		return sm;
	}
	public void setSm(String sm) {
		this.sm = sm;
	}
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
	public String getHm() {
		return hm;
	}
	public void setHm(String hm) {
		this.hm = hm;
	}
	public String getNw() {
		return nw;
	}
	public void setNw(String nw) {
		this.nw = nw;
	}
	public String getEw() {
		return ew;
	}
	public void setEw(String ew) {
		this.ew = ew;
	}
	public String getSw() {
		return sw;
	}
	public void setSw(String sw) {
		this.sw = sw;
	}
	public String getOsChk() {
		return osChk;
	}
	public void setOsChk(String osChk) {
		this.osChk = osChk;
	}
	public String getWhChk() {
		return whChk;
	}
	public void setWhChk(String whChk) {
		this.whChk = whChk;
	}
	public String getGwChk() {
		return gwChk;
	}
	public void setGwChk(String gwChk) {
		this.gwChk = gwChk;
	}
	public String getTwChk() {
		return twChk;
	}
	public void setTwChk(String twChk) {
		this.twChk = twChk;
	}
	public String getFdChk() {
		return fdChk;
	}
	public void setFdChk(String fdChk) {
		this.fdChk = fdChk;
	}
	public String getSmChk() {
		return smChk;
	}
	public void setSmChk(String smChk) {
		this.smChk = smChk;
	}
	public String getDmChk() {
		return dmChk;
	}
	public void setDmChk(String dmChk) {
		this.dmChk = dmChk;
	}
	public String getHmChk() {
		return hmChk;
	}
	public void setHmChk(String hmChk) {
		this.hmChk = hmChk;
	}
	public String getNwChk() {
		return nwChk;
	}
	public void setNwChk(String nwChk) {
		this.nwChk = nwChk;
	}
	public String getEwChk() {
		return ewChk;
	}
	public void setEwChk(String ewChk) {
		this.ewChk = ewChk;
	}
	public String getSwChk() {
		return swChk;
	}
	public void setSwChk(String swChk) {
		this.swChk = swChk;
	}
	public String getBg() {
		return bg;
	}
	public void setBg(String bg) {
		this.bg = bg;
	}
	public String getLl() {
		return ll;
	}
	public void setLl(String ll) {
		this.ll = ll;
	}
	public String getCu() {
		return cu;
	}
	public void setCu(String cu) {
		this.cu = cu;
	}
	public String getWharf() {
		return wharf;
	}
	public void setWharf(String wharf) {
		this.wharf = wharf;
	}
	public String getHatch() {
		return hatch;
	}
	public void setHatch(String hatch) {
		this.hatch = hatch;
	}
	public String getYard() {
		return yard;
	}
	public void setYard(String yard) {
		this.yard = yard;
	}
	public String getConventional() {
		return conventional;
	}
	public void setConventional(String conventional) {
		this.conventional = conventional;
	}
	public String getRsDivCd() {
		return rsDivCd;
	}
	public void setRsDivCd(String rsDivCd) {
		this.rsDivCd = rsDivCd;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public double getWkerQty() {
		return wkerQty;
	}
	public void setWkerQty(double wkerQty) {
		this.wkerQty = wkerQty;
	}
	public String getCrudFlag() {
		return crudFlag;
	}
	public void setCrudFlag(String crudFlag) {
		this.crudFlag = crudFlag;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getHatchDrtCd() {
		return hatchDrtCd;
	}
	public void setHatchDrtCd(String hatchDrtCd) {
		this.hatchDrtCd = hatchDrtCd;
	}
	public String getWorkComp() {
		return workComp;
	}
	public void setWorkComp(String workComp) {
		this.workComp = workComp;
	}
	public String getCompTpCd() {
		return compTpCd;
	}
	public void setCompTpCd(String compTpCd) {
		this.compTpCd = compTpCd;
	}
	public String getMbsCd() {
		return mbsCd;
	}
	public void setMbsCd(String mbsCd) {
		this.mbsCd = mbsCd;
	}
	public String getRoleCdNm() {
		return roleCdNm;
	}
	public void setRoleCdNm(String roleCdNm) {
		this.roleCdNm = roleCdNm;
	}
	public String getPurpCd() {
		return purpCd;
	}
	public void setPurpCd(String purpCd) {
		this.purpCd = purpCd;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getEqFacNm() {
		return eqFacNm;
	}
	public void setEqFacNm(String eqFacNm) {
		this.eqFacNm = eqFacNm;
	}
	public String getEqName() {
		return eqName;
	}
	public void setEqName(String eqName) {
		this.eqName = eqName;
	}
	public String getFacility() {
		return facility;
	}
	public void setFacility(String facility) {
		this.facility = facility;
	}
	public String getFacilityName() {
		return facilityName;
	}
	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
	public double getSupervisor() {
		return supervisor;
	}
	public void setSupervisor(double supervisor) {
		this.supervisor = supervisor;
	}
	public double getNonworker() {
		return nonworker;
	}
	public void setNonworker(double nonworker) {
		this.nonworker = nonworker;
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
	public String getWithGears() {
		return withGears;
	}
	public void setWithGears(String withGears) {
		this.withGears = withGears;
	}
	public String getDptAgent() {
		return dptAgent;
	}
	public void setDptAgent(String dptAgent) {
		this.dptAgent = dptAgent;
	}
	public String getChkAgent() {
		return chkAgent;
	}
	public void setChkAgent(String chkAgent) {
		this.chkAgent = chkAgent;
	}
	public String getVslShiftingSeq() {
		return vslShiftingSeq;
	}
	public void setVslShiftingSeq(String vslShiftingSeq) {
		this.vslShiftingSeq = vslShiftingSeq;
	}
	public String getVslShiftingYN() {
		return vslShiftingYN;
	}
	public void setVslShiftingYN(String vslShiftingYN) {
		this.vslShiftingYN = vslShiftingYN;
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
	public String getLashingCompCd() {
		return lashingCompCd;
	}
	public void setLashingCompCd(String lashingCompCd) {
		this.lashingCompCd = lashingCompCd;
	}
	public double getLashingGangNos() {
		return lashingGangNos;
	}
	public void setLashingGangNos(double lashingGangNos) {
		this.lashingGangNos = lashingGangNos;
	}
	public String getShipsCrewYn() {
		return shipsCrewYn;
	}
	public void setShipsCrewYn(String shipsCrewYn) {
		this.shipsCrewYn = shipsCrewYn;
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
	public void setEquipmentCombo2(List<Object> equipmentCombo2) {
		this.equipmentCombo2 = equipmentCombo2;
	}
	public List<Object> getFacilityCombo() {
		return facilityCombo;
	}
	public void setFacilityCombo(List<Object> facilityCombo) {
		this.facilityCombo = facilityCombo;
	}
	public List<Object> getRoleDivSCombo() {
		return roleDivSCombo;
	}
	public void setRoleDivSCombo(List<Object> roleDivSCombo) {
		this.roleDivSCombo = roleDivSCombo;
	}
	public List<Object> getRoleDivTCombo() {
		return roleDivTCombo;
	}
	public void setRoleDivTCombo(List<Object> roleDivTCombo) {
		this.roleDivTCombo = roleDivTCombo;
	}
	public String getSystem() {
		return system;
	}
	public void setSystem(String system) {
		this.system = system;
	}
	public String getTallyWorker() {
		return tallyWorker;
	}
	public void setTallyWorker(String tallyWorker) {
		this.tallyWorker = tallyWorker;
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
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
    
}
