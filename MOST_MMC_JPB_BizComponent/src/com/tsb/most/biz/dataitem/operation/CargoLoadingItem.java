package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.framework.dataitem.DataItem;

public class CargoLoadingItem extends DataItem {

	private String vslCd;
    private String callYear;
    private String callSeq;
    
    private String cgNo;
    private String grNo;
    private String stat;
    private String loadCnclMode;
    private String dmgYn;
    
    private String prevPos;
    private String currPos;
    private String nxPos;
    private String shipgNoteNo;
    private String vslCallId;
    private String hdlInEndDt;
    private String sprYn;
    private String vslNm;
    private int docQty;
    private double  docMt;
    private double  docM3;
    private int qty;
    private double  mt;
    private double  m3;
    private int balQty;
    private double  balMt;
    private double  balM3;
    private int loadQty;
    private double  loadMt;
    private double  loadM3;
    private int pkgQty;
    private double  pkgMt;
    private double  pkgM3;
    private int shuQty;
    private double   shuMt;
    private double  shuM3;
    private int dmgQty;
    private double  dmgMt;
    private double  dmgM3;
    private String gateOutDt;
    private String delvTpCd;
    private String hatchNo;
    private String shftId;
    private String shftNm;
    private String tsptr;
    private String tsptrNm;
    private String locId;
    private String lorryId;
    private String lorryNo;
    private String custClrCd;
    private String clrYmd;
    private String custApprvCd;
    private String apprvYmd;
    private String tsptTpCd;
    private String catgCd;// Imoport, Export, Transhipment -->	
    private String opeClassCd;
    private String opDelvTpCd;//job type saved deliveryType
    private String fnlOpeYn;//Sn all final
    private String fnlLoadYn;//final loading end date is not null : 'Y'
    private String whFnlDelvYn;
    private String cmdtCd;
    private String cmdtGrpCd;
    private String pkgTpCd;
    private String rePkgTpCd;
    private String wgtUnit;
    private String msrmtUnit;//measurementUnit
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String cgTpCd;
    private String cgTpCdNm;  
    private int repkgQty;
    private double  repkgWgt;
    private double  repkgMsrmt;

    private String shutRhdlMode;
    private String dmgRhdlMode;
    private String rhdlYn;//using tmt_cg_mst.rhdlMode 
    private String cgInOutCd;//Arrv-I, Delv-O //key 
    private String gatePassYn;       
    private boolean lorryFlag = true;
    private String seq;
    
    //add cg_mst
    private String  fwrAgnt;
    private String  shpgAgent;
    private String  cntryOfOrg;
    
    //add JobItem
    private String jobPurpCd;
    private String fnlDelvYn;
    private String jobTpCd;
    private String balStatCd;//balCode//DMG,SHU
    private int cntrQty;
    private String eqNo;
    private String fmLocId;
    private String toLocId;
    private String toHatchNo;
    private String hatchDrt;
    private String gangNo;
    private String facNo;
    private String stevedore;
    private String shftDt;
    private String shuYn;
    private String jobGroup;
    private String jobNo;
    private String prevJobNo;
    
    //add RhdlItem
    private String nxVslCallId;
    private String nxRefNo;
    private String stsYn;
    private String rhdlMode;//using tmt_rhdl_cg
    private String cgCoCd;//cargo condition code
    private String dgCgIdt;
    private String gatePassNo;
    private String rmk;
    private boolean chkLoadDmgYn;
    private int loadDmgQty;
    private double  loadDmgMt;
    private double  loadDmgM3;
    private ArrayList collection = new ArrayList();
    private int accuSumQty;
    private double  accuSumWgt;
    private double  accuSumMsrmt;

    private String locArea;
    private int locQty;
    private double locWgt;
    private double locMsrmt;
    private String whTpCd;
    private String whLocTpCd;
    private String locNm;
    private String shuLocId;
    private String dmgLocId;

    private int snQty;
    private double  snMt;
    private double  snM3;

    private String shpr;
    private String shprNm;
    private String cnsne;
    private String cnsneNm;
    
    private int locCount;
    private int locDmgCount;
    private int locSprCount;
    private int locSprGrCount;
    
    private String autoLocFlag;//if autoFlag is true, Loading is auto-De-Allocation
    private String autoNorLocFlag; //Normal auto - de-Allocation
    private String autoDmgLocFlag; //Damage auto - de-Allocation
    private String autoSprLocFlag; //Spare auto - de-Allocation
    
    private String custMode;
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;//Overlanded : O, Spare : S
	private String orgOpeClassCd;//rhdl opeClassCd add sunny 20090508
	
    private int whDmgQty;
    private double  whDmgMt;
    private double  whDmgM3;
    private String whDmgLocId;
    
    private int whDmgBalQty;
    private double  whDmgBalMt;
    private double  whDmgBalM3;
    
    //add sprList
    private int sprQty;
    private double  sprMt;
    private double  sprM3;
    private String sprLocId;
    
    private int sprBalQty;
    private double  sprBalMt;
    private double  sprBalM3;
    private ArrayList<WhConfigurationItem> sprItems;
    private ArrayList<WhConfigurationItem> whDmgItems;
    private ArrayList<WhConfigurationItem> shutItems;
    private ArrayList<WhConfigurationItem> dmgItems;
    private ArrayList childItems = new ArrayList();
    
    private String whInOutCd;
    private String searchType;
    private String orgGrNo;
    private String orgCgNo;// blNo and GrNo
    private String orgVslCallId;
    private String orgBlSn;
    private String rhdlNo;
    private String rhdlGroupNo;
    private int rhdlGroupCnt;
    private String grYn;
    private String repkgTypeCd;
    private String pkgNo;
    private String snLdYn;
    private String rcCoCd;//CC change condition, GD : normal to damage
    private String cbrNo;
    private String shipCallNo;
    private Date gatePassIssueDt;
    private Date startDt;
    private Date endDt;
    private String startDtStr;
    private String endDtStr; 
    private List modeOfOprList;
    private List deliveryList;
    private List cargoTypeList;
    private List hatchNoList;
    private ArrayList<CargoLoadingItem> items;
    
    private String shiftStartDt;
    private String shiftEndDt;
    private List operationSetHatchList;
    private String eqNm;
    private String facNm;
    
    private ArrayList<WhConfigurationItem> whConfigurationItems;
    private ArrayList<CargoLoadingItem> orgCgItems;
  	private double eachMt;
  	private double eachM3;
  	
  	private double avBalMt;
  	private double avBalM3;
  	private int avBalQty;
  	private String gateTxnNo;
  	private String mfDocId;
  	private String bargeNo;
  	private String additionalCheckYn;
  	private String weightCheckYn;
  	private String wbTransactionNo;
  	private String secondWgt;
  	private String domesticChk;
  	private String grNoPlStr;
  	
  	private String driverId;
  	
  	private String atb; // check ATB valid for loading
  	
  	private ArrayList<PackageJobItem> packageItems;
  	private ArrayList<HangingScaleItem> hangingScaleItems;
  	
  	private String projectCargo;
  	
  	private String scn;
    
    public double  getBalM3() {
        return balM3;
    }
    public void setBalM3(double  balM3) {
        this.balM3 = balM3;
    }
    public double  getBalMt() {
        return balMt;
    }
    public void setBalMt(double  balMt) {
        this.balMt = balMt;
    }
    public int getBalQty() {
        return balQty;
    }
    public void setBalQty(int balQty) {
        this.balQty = balQty;
    }
    public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    public String getCurrPos() {
        return currPos;
    }
    public void setCurrPos(String currPos) {
        this.currPos = currPos;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public double  getDmgM3() {
        return dmgM3;
    }
    public void setDmgM3(double  dmgM3) {
        this.dmgM3 = dmgM3;
    }
    public int getDmgQty() {
        return dmgQty;
    }
    public void setDmgQty(int dmgQty) {
        this.dmgQty = dmgQty;
    }
    public String getDmgYn() {
        return dmgYn;
    }
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    public double  getDmgMt() {
        return dmgMt;
    }
    public void setDmgMt(double  dmgMt) {
        this.dmgMt = dmgMt;
    }
    public Date getEndDt() {
        return endDt;
    }
    public void setEndDt(Date endDt) {
        this.endDt = endDt;
    }
//    public String getFinalChk() {
//        return finalChk;
//    }
//    public void setFinalChk(String finalChk) {
//        this.finalChk = finalChk;
//    }
//    public String getFpAp() {
//        return fpAp;
//    }
//    public void setFpAp(String fpAp) {
//        this.fpAp = fpAp;
//    }
    public String getGateOutDt() {
        return gateOutDt;
    }
    public void setGateOutDt(String gateOutDt) {
        this.gateOutDt = gateOutDt;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getHdlInEndDt() {
        return hdlInEndDt;
    }
    public void setHdlInEndDt(String hdlInEndDt) {
        this.hdlInEndDt = hdlInEndDt;
    }
    public String getLoadCnclMode() {
        return loadCnclMode;
    }
    public void setLoadCnclMode(String loadCnclMode) {
        this.loadCnclMode = loadCnclMode;
    }
    public double  getLoadM3() {
        return loadM3;
    }
    public void setLoadM3(double  loadM3) {
        this.loadM3 = loadM3;
    }
    public double  getLoadMt() {
        return loadMt;
    }
    public void setLoadMt(double  loadMt) {
        this.loadMt = loadMt;
    }
    public int getLoadQty() {
        return loadQty;
    }
    public void setLoadQty(int loadQty) {
        this.loadQty = loadQty;
    }
    public String getLocId() {
        return locId;
    }
    public void setLocId(String locId) {
        this.locId = locId;
    }
    public double  getM3() {
        return m3;
    }
    public void setM3(double  m3) {
        this.m3 = m3;
    }
    public double  getMt() {
        return mt;
    }
    public void setMt(double  mt) {
        this.mt = mt;
    }
    public String getNxPos() {
        return nxPos;
    }
    public void setNxPos(String nxPos) {
        this.nxPos = nxPos;
    }
    public double  getPkgM3() {
        return pkgM3;
    }
    public void setPkgM3(double  pkgM3) {
        this.pkgM3 = pkgM3;
    }
    public double  getPkgMt() {
        return pkgMt;
    }
    public void setPkgMt(double  pkgMt) {
        this.pkgMt = pkgMt;
    }
    public String getPrevPos() {
        return prevPos;
    }
    public void setPrevPos(String prevPos) {
        this.prevPos = prevPos;
    }
    public int getQty() {
        return qty;
    }
    public void setQty(int qty) {
        this.qty = qty;
    }
    public String getRhdlMode() {
        return rhdlMode;
    }
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public double  getShuM3() {
        return shuM3;
    }
    public void setShuM3(double  shuM3) {
        this.shuM3 = shuM3;
    }
    public double  getShuMt() {
        return shuMt;
    }
    public void setShuMt(double  shuMt) {
        this.shuMt = shuMt;
    }
    public int getShuQty() {
        return shuQty;
    }
    public void setShuQty(int shuQty) {
        this.shuQty = shuQty;
    }
    public String getSprYn() {
        return sprYn;
    }
    public void setSprYn(String sprYn) {
        this.sprYn = sprYn;
    }
    public Date getStartDt() {
        return startDt;
    }
    public void setStartDt(Date startDt) {
        this.startDt = startDt;
    }
    public String getStat() {
        return stat;
    }
    public void setStat(String stat) {
        this.stat = stat;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public int getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getLorryId() {
        return lorryId;
    }
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getCmdtCd() {
        return cmdtCd;
    }
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    public String getCmdtGrpCd() {
    	return cmdtGrpCd;
    }
    public void setCmdtGrpCd(String cmdtGrpCd) {
    	this.cmdtGrpCd = cmdtGrpCd;
    }
    public String getFdest() {
        return fdest;
    }
    public void setFdest(String fdest) {
        this.fdest = fdest;
    }
    public String getFnlOpeYn() {
        return fnlOpeYn;
    }

//    public void setFnlOpeYn(boolean fnlOpeYn) {
//        this.fnlOpeYn = fnlOpeYn;
//    }       
    public void setFnlOpeYn(String fnlOpeYn) {
        if(fnlOpeYn == null){
            this.fnlOpeYn =  "N";
        }else if(fnlOpeYn.equals("Y")){
            this.fnlOpeYn = "Y";
        }else if(fnlOpeYn.equals("true")){
            this.fnlOpeYn = "Y";
        }else{
            this.fnlOpeYn = "N";
        }
    }
    public String getMsrmtUnit() {
        return msrmtUnit;
    }
    public void setMsrmtUnit(String msrmtUnit) {
        this.msrmtUnit = msrmtUnit;
    }
    public String getOpDelvTpCd() {
        return opDelvTpCd;
    }
    public void setOpDelvTpCd(String opDelvTpCd) {
        this.opDelvTpCd = opDelvTpCd;
    }
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    public String getPortOfDis() {
        return portOfDis;
    }
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    public String getPortOfLoad() {
        return portOfLoad;
    }
    public void setPortOfLoad(String portOfLoad) {
        this.portOfLoad = portOfLoad;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getWgtUnit() {
        return wgtUnit;
    }
    public void setWgtUnit(String wgtUnit) {
        this.wgtUnit = wgtUnit;
    }
    public String getWhFnlDelvYn() {
        return whFnlDelvYn;
    }    

    
//    public void setWhFnlDelvYn(boolean whFnlDelvYn) {
//        this.whFnlDelvYn = whFnlDelvYn;
//    }
    public void setWhFnlDelvYn(String whFnlDelvYn) {
        if(whFnlDelvYn == null){
            this.whFnlDelvYn =  "N";
        }else if(whFnlDelvYn.equals("Y")){
            this.whFnlDelvYn = "Y";
        }else if(whFnlDelvYn.equals("true")){
            this.whFnlDelvYn = "Y";
        }else{
            this.whFnlDelvYn = "N";
        }
    }
    public String getTsptrNm() {
        return tsptrNm;
    }
    public void setTsptrNm(String tsptrNm) {
        this.tsptrNm = tsptrNm;
    }
    public double  getRepkgMsrmt() {
        return repkgMsrmt;
    }
    public void setRepkgMsrmt(double  repkgMsrmt) {
        this.repkgMsrmt = repkgMsrmt;
    }
    public int getRepkgQty() {
        return repkgQty;
    }
    public void setRepkgQty(int repkgQty) {
        this.repkgQty = repkgQty;
    }

    public double  getRepkgWgt() {
        return repkgWgt;
    }
    public void setRepkgWgt(double  repkgWgt) {
        this.repkgWgt = repkgWgt;
    }
    public String getFnlDelvYn() {
        return fnlDelvYn;
    }
    public void setFnlDelvYn(String fnlDelvYn) {
        this.fnlDelvYn = fnlDelvYn;
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
    public String getBalStatCd() {
        return balStatCd;
    }
    public void setBalStatCd(String balStatCd) {
        this.balStatCd = balStatCd;
    }
    public String getCgInOutCd() {
        return cgInOutCd;
    }
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
    }
    public String getGatePassYn() {
        return gatePassYn;
    }

//    public void setGatePassYn(boolean gatePassYn) {
//         this.gatePassYn = gatePassYn;
//    }
    
    public void setGatePassYn(String gatePassYn) {
        if(gatePassYn == null){
            this.gatePassYn =  "N";
        }else if(gatePassYn.equals("Y")){
            this.gatePassYn = "Y";
        }else if(gatePassYn.equals("true")){
            this.gatePassYn = "Y";
        }else{
            this.gatePassYn = "N";
        }
    }
    public Date getGatePassIssueDt() {
        return gatePassIssueDt;
    }
    public void setGatePassIssueDt(Date gatePassIssueDt) {
        this.gatePassIssueDt = gatePassIssueDt;
    }
    public String getCntryOfOrg() {
        return cntryOfOrg;
    }
    public void setCntryOfOrg(String cntryOfOrg) {
        this.cntryOfOrg = cntryOfOrg;
    }
    
    public String getShpgAgent() {
        return shpgAgent;
    }
    public void setShpgAgent(String shpgAgent) {
        this.shpgAgent = shpgAgent;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public int getCntrQty() {
        return cntrQty;
    }
    public void setCntrQty(int cntrQty) {
        this.cntrQty = cntrQty;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
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
    public String getGangNo() {
        return gangNo;
    }
    public void setGangNo(String gangNo) {
        this.gangNo = gangNo;
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
    public String getStsYn() {
        return stsYn;
    }
    public void setStsYn(String stsYn) {
        this.stsYn = stsYn;
    }
    public String getDgCgIdt() {
        return dgCgIdt;
    }
    public void setDgCgIdt(String dgCgIdt) {
        this.dgCgIdt = dgCgIdt;
    }
    public String getGatePassNo() {
        return gatePassNo;
    }
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    
    public double  getLoadDmgM3() {
        return loadDmgM3;
    }
    public void setLoadDmgM3(double  loadDmgM3) {
        this.loadDmgM3 = loadDmgM3;
    }
    public double  getLoadDmgMt() {
        return loadDmgMt;
    }
    public void setLoadDmgMt(double  loadDmgMt) {
        this.loadDmgMt = loadDmgMt;
    }
    public int getLoadDmgQty() {
        return loadDmgQty;
    }
    public void setLoadDmgQty(int loadDmgQty) {
        this.loadDmgQty = loadDmgQty;
    }
    public String getDmgRhdlMode() {
        return dmgRhdlMode;
    }
    public void setDmgRhdlMode(String dmgRhdlMode) {
        this.dmgRhdlMode = dmgRhdlMode;
    }
    public String getShutRhdlMode() {
        return shutRhdlMode;
    }
    public void setShutRhdlMode(String shutRhdlMode) {
        this.shutRhdlMode = shutRhdlMode;
    }
    public String getRhdlYn() {
        return rhdlYn;
    }
    public void setRhdlYn(String rhdlYn) {// String 'Y','N'
        this.rhdlYn = rhdlYn;
    }
    public String getFacNo() {
        return facNo;
    }
    public void setFacNo(String facNo) {
        this.facNo = facNo;
    }
    public String getStevedore() {
        return stevedore;
    }
    public void setStevedore(String stevedore) {
        this.stevedore = stevedore;
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
    public String getShuYn() {
        return shuYn;
    }
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    //-- end   ADD 20080718 tnkytn Need for HHT
    public String getJobGroup() {
        return jobGroup;
    }
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }
    public String getJobNo() {
        return jobNo;
    }
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    public double getDocM3() {
        return docM3;
    }
    public void setDocM3(double docM3) {
        this.docM3 = docM3;
    }
    public double getDocMt() {
        return docMt;
    }
    public void setDocMt(double docMt) {
        this.docMt = docMt;
    }
    public int getDocQty() {
        return docQty;
    }
    public void setDocQty(int docQty) {
        this.docQty = docQty;
    }
    public String getApprvYmd() {
        return apprvYmd;
    }
    public void setApprvYmd(String apprvYmd) {
        this.apprvYmd = apprvYmd;
    }
    public String getClrYmd() {
        return clrYmd;
    }
    public void setClrYmd(String clrYmd) {
        this.clrYmd = clrYmd;
    }
    public String getCustApprvCd() {
        return custApprvCd;
    }
    public void setCustApprvCd(String custApprvCd) {
        this.custApprvCd = custApprvCd;
    }
    public String getCustClrCd() {
        return custClrCd;
    }
    public void setCustClrCd(String custClrCd) {
        this.custClrCd = custClrCd;
    }
    /**
     * @return Returns the accuSumMsrmt.
     */
    public double getAccuSumMsrmt() {
        return accuSumMsrmt;
    }
    /**
     * @param accuSumMsrmt The accuSumMsrmt to set.
     */
    public void setAccuSumMsrmt(double accuSumMsrmt) {
        this.accuSumMsrmt = accuSumMsrmt;
    }
    /**
     * @return Returns the accuSumQty.
     */
    public int getAccuSumQty() {
        return accuSumQty;
    }
    /**
     * @param accuSumQty The accuSumQty to set.
     */
    public void setAccuSumQty(int accuSumQty) {
        this.accuSumQty = accuSumQty;
    }
    /**
     * @return Returns the accuSumWgt.
     */
    public double getAccuSumWgt() {
        return accuSumWgt;
    }
    /**
     * @param accuSumWgt The accuSumWgt to set.
     */
    public void setAccuSumWgt(double accuSumWgt) {
        this.accuSumWgt = accuSumWgt;
    }
    /**
     * @return Returns the chkLoadDmgYn.
     */
    public boolean getChkLoadDmgYn() {
        return chkLoadDmgYn;
    }
    /**
     * @param chkLoadDmgYn The chkLoadDmgYn to set.
     */
    public void setChkLoadDmgYn(boolean chkLoadDmgYn) {
        this.chkLoadDmgYn = chkLoadDmgYn;
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
     * @return Returns the locNm.
     */
    public String getLocNm() {
        return locNm;
    }
    /**
     * @param locNm The locNm to set.
     */
    public void setLocNm(String locNm) {
        this.locNm = locNm;
    }
    /**
     * @return Returns the dmgLocId.
     */
    public String getDmgLocId() {
        return dmgLocId;
    }
    /**
     * @param dmgLocId The dmgLocId to set.
     */
    public void setDmgLocId(String dmgLocId) {
        this.dmgLocId = dmgLocId;
    }
    /**
     * @return Returns the shuLocId.
     */
    public String getShuLocId() {
        return shuLocId;
    }
    /**
     * @param shuLocId The shuLocId to set.
     */
    public void setShuLocId(String shuLocId) {
        this.shuLocId = shuLocId;
    }
    /**
     * @return Returns the snM3.
     */
    public double getSnM3() {
        return snM3;
    }
    /**
     * @param snM3 The snM3 to set.
     */
    public void setSnM3(double snM3) {
        this.snM3 = snM3;
    }
    /**
     * @return Returns the snMt.
     */
    public double getSnMt() {
        return snMt;
    }
    /**
     * @param snMt The snMt to set.
     */
    public void setSnMt(double snMt) {
        this.snMt = snMt;
    }
    /**
     * @return Returns the snQty.
     */
    public int getSnQty() {
        return snQty;
    }
    /**
     * @param snQty The snQty to set.
     */
    public void setSnQty(int snQty) {
        this.snQty = snQty;
    }
    /**
     * @return Returns the lorryFlag.
     */
    public boolean getLorryFlag() {
        return lorryFlag;
    }
    /**
     * @param lorryFlag The lorryFlag to set.
     */
    public void setLorryFlag(boolean lorryFlag) {
        this.lorryFlag = lorryFlag;
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
     * @return Returns the cnsne.
     */
    public String getCnsne() {
        return cnsne;
    }
    /**
     * @param cnsne The cnsne to set.
     */
    public void setCnsne(String cnsne) {
        this.cnsne = cnsne;
    }
    /**
     * @return Returns the cnsneNm.
     */
    public String getCnsneNm() {
        return cnsneNm;
    }
    /**
     * @param cnsneNm The cnsneNm to set.
     */
    public void setCnsneNm(String cnsneNm) {
        this.cnsneNm = cnsneNm;
    }
    /**
     * @return Returns the shpr.
     */
    public String getShpr() {
        return shpr;
    }
    /**
     * @param shpr The shpr to set.
     */
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    /**
     * @return Returns the shprNm.
     */
    public String getShprNm() {
        return shprNm;
    }
    /**
     * @param shprNm The shprNm to set.
     */
    public void setShprNm(String shprNm) {
        this.shprNm = shprNm;
    }
    
    public List getCollection() {
		return collection;
	}
	public void setCollection(List list) {
		this.collection = (ArrayList) list;
	}
    /**
     * @return Returns the locCount.
     */
    public int getLocCount() {
        return locCount;
    }
    /**
     * @param locCount The locCount to set.
     */
    public void setLocCount(int locCount) {
        this.locCount = locCount;
    }
    /**
     * @return Returns the autoLocFlag.
     */
    public String getAutoLocFlag() {
        return autoLocFlag;
    }
    /**
     * @param autoLocFlag The autoLocFlag to set.
     */
    public void setAutoLocFlag(String autoLocFlag) {
        this.autoLocFlag = autoLocFlag;
    }
    /**
     * @return Returns the custMode.
     */
    public String getCustMode() {
        return custMode;
    }
    /**
     * @param custMode The custMode to set.
     */
    public void setCustMode(String custMode) {
        this.custMode = custMode;
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
	 * @return Returns the jobCdCd.
	 */
	public String getJobCoCd() {
	    return jobCoCd;
	}
	/**
	 * @param jobCdCd The jobCdCd to set.
	 */
	public void setJobCoCd(String jobCoCd) {
	    this.jobCoCd = jobCoCd;
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
     * @return Returns the sprBalM3.
     */
    public double getSprBalM3() {
        return sprBalM3;
    }
    /**
     * @param sprBalM3 The sprBalM3 to set.
     */
    public void setSprBalM3(double sprBalM3) {
        this.sprBalM3 = sprBalM3;
    }
    /**
     * @return Returns the sprBalMt.
     */
    public double getSprBalMt() {
        return sprBalMt;
    }
    /**
     * @param sprBalMt The sprBalMt to set.
     */
    public void setSprBalMt(double sprBalMt) {
        this.sprBalMt = sprBalMt;
    }
    /**
     * @return Returns the sprBalQty.
     */
    public int getSprBalQty() {
        return sprBalQty;
    }
    /**
     * @param sprBalQty The sprBalQty to set.
     */
    public void setSprBalQty(int sprBalQty) {
        this.sprBalQty = sprBalQty;
    }
    /**
     * @return Returns the sprItems.
     */
    public ArrayList<WhConfigurationItem> getSprItems() {
        return sprItems;
    }
    /**
     * @param sprItems The sprItems to set.
     */
    public void setSprItems(ArrayList<WhConfigurationItem> sprItems) {
        this.sprItems = sprItems;
    }
    /**
     * @return Returns the sprLocId.
     */
    public String getSprLocId() {
        return sprLocId;
    }
    /**
     * @param sprLocId The sprLocId to set.
     */
    public void setSprLocId(String sprLocId) {
        this.sprLocId = sprLocId;
    }
    /**
     * @return Returns the sprM3.
     */
    public double getSprM3() {
        return sprM3;
    }
    /**
     * @param sprM3 The sprM3 to set.
     */
    public void setSprM3(double sprM3) {
        this.sprM3 = sprM3;
    }
    /**
     * @return Returns the sprMt.
     */
    public double getSprMt() {
        return sprMt;
    }
    /**
     * @param sprMt The sprMt to set.
     */
    public void setSprMt(double sprMt) {
        this.sprMt = sprMt;
    }
    /**
     * @return Returns the sprQty.
     */
    public int getSprQty() {
        return sprQty;
    }
    /**
     * @param sprQty The sprQty to set.
     */
    public void setSprQty(int sprQty) {
        this.sprQty = sprQty;
    }
    /**
     * @return Returns the whDmgBalM3.
     */
    public double getWhDmgBalM3() {
        return whDmgBalM3;
    }
    /**
     * @param whDmgBalM3 The whDmgBalM3 to set.
     */
    public void setWhDmgBalM3(double whDmgBalM3) {
        this.whDmgBalM3 = whDmgBalM3;
    }
    /**
     * @return Returns the whDmgBalMt.
     */
    public double getWhDmgBalMt() {
        return whDmgBalMt;
    }
    /**
     * @param whDmgBalMt The whDmgBalMt to set.
     */
    public void setWhDmgBalMt(double whDmgBalMt) {
        this.whDmgBalMt = whDmgBalMt;
    }
    /**
     * @return Returns the whDmgBalQty.
     */
    public int getWhDmgBalQty() {
        return whDmgBalQty;
    }
    /**
     * @param whDmgBalQty The whDmgBalQty to set.
     */
    public void setWhDmgBalQty(int whDmgBalQty) {
        this.whDmgBalQty = whDmgBalQty;
    }
    /**
     * @return Returns the whDmgLocId.
     */
    public String getWhDmgLocId() {
        return whDmgLocId;
    }
    /**
     * @param whDmgLocId The whDmgLocId to set.
     */
    public void setWhDmgLocId(String whDmgLocId) {
        this.whDmgLocId = whDmgLocId;
    }
    /**
     * @return Returns the whDmgM3.
     */
    public double getWhDmgM3() {
        return whDmgM3;
    }
    /**
     * @param whDmgM3 The whDmgM3 to set.
     */
    public void setWhDmgM3(double whDmgM3) {
        this.whDmgM3 = whDmgM3;
    }
    /**
     * @return Returns the whDmgMt.
     */
    public double getWhDmgMt() {
        return whDmgMt;
    }
    /**
     * @param whDmgMt The whDmgMt to set.
     */
    public void setWhDmgMt(double whDmgMt) {
        this.whDmgMt = whDmgMt;
    }
    /**
     * @return Returns the whDmgQty.
     */
    public int getWhDmgQty() {
        return whDmgQty;
    }
    /**
     * @param whDmgQty The whDmgQty to set.
     */
    public void setWhDmgQty(int whDmgQty) {
        this.whDmgQty = whDmgQty;
    }
    /**
     * @return Returns the whDmgItems.
     */
    public ArrayList<WhConfigurationItem> getWhDmgItems() {
        return whDmgItems;
    }
    /**
     * @param whDmgItems The whDmgItems to set.
     */
    public void setWhDmgItems(ArrayList<WhConfigurationItem> whDmgItems) {
        this.whDmgItems = whDmgItems;
    }
    
    public List getChildItems(){
        return childItems;
    }
    
    public void setChildItems(List childItems) {
        this.childItems = (ArrayList)childItems;
    }
    
    /**
     * @return Returns the whInOutCd.
     */
    public String getWhInOutCd() {
        return whInOutCd;
    }
    /**
     * @param whInOutCd The whInOutCd to set.
     */
    public void setWhInOutCd(String whInOutCd) {
        this.whInOutCd = whInOutCd;
    }
    /**
     * @return Returns the dmgItems.
     */
    public ArrayList<WhConfigurationItem> getDmgItems() {
        return dmgItems;
    }
    /**
     * @param dmgItems The dmgItems to set.
     */
    public void setDmgItems(ArrayList<WhConfigurationItem> dmgItems) {
        this.dmgItems = dmgItems;
    }
    /**
     * @return Returns the shutItems.
     */
    public ArrayList<WhConfigurationItem> getShutItems() {
        return shutItems;
    }
    /**
     * @param shutItems The shutItems to set.
     */
    public void setShutItems(ArrayList<WhConfigurationItem> shutItems) {
        this.shutItems = shutItems;
    }
    /**
     * @return Returns the locDmgCount.
     */
    public int getLocDmgCount() {
        return locDmgCount;
    }
    /**
     * @param locDmgCount The locDmgCount to set.
     */
    public void setLocDmgCount(int locDmgCount) {
        this.locDmgCount = locDmgCount;
    }
    /**
     * @return Returns the locSprCount.
     */
    public int getLocSprCount() {
        return locSprCount;
    }
    /**
     * @param locSprCount The locSprCount to set.
     */
    public void setLocSprCount(int locSprCount) {
        this.locSprCount = locSprCount;
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
     * @return Returns the orgGrNo.
     */
    public String getOrgGrNo() {
        return orgGrNo;
    }
    /**
     * @param orgGrNo The orgGrNo to set.
     */
    public void setOrgGrNo(String orgGrNo) {
        this.orgGrNo = orgGrNo;
    }
    /**
     * @return Returns the orgOpeClassCd.
     */
    public String getOrgOpeClassCd() {
        return orgOpeClassCd;
    }
    /**
     * @param orgOpeClassCd The orgOpeClassCd to set.
     */
    public void setOrgOpeClassCd(String orgOpeClassCd) {
        this.orgOpeClassCd = orgOpeClassCd;
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
     * @return Returns the snLdYn.
     */
    public String getSnLdYn() {
        return snLdYn;
    }
    /**
     * @param snLdYn The snLdYn to set.
     */
    public void setSnLdYn(String snLdYn) {
        this.snLdYn = snLdYn;
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
     * @return Returns the autoDmgLocFlag.
     */
    public String getAutoDmgLocFlag() {
        return autoDmgLocFlag;
    }
    /**
     * @param autoDmgLocFlag The autoDmgLocFlag to set.
     */
    public void setAutoDmgLocFlag(String autoDmgLocFlag) {
        this.autoDmgLocFlag = autoDmgLocFlag;
    }
    /**
     * @return Returns the autoNorLocFlag.
     */
    public String getAutoNorLocFlag() {
        return autoNorLocFlag;
    }
    /**
     * @param autoNorLocFlag The autoNorLocFlag to set.
     */
    public void setAutoNorLocFlag(String autoNorLocFlag) {
        this.autoNorLocFlag = autoNorLocFlag;
    }
    /**
     * @return Returns the autoSprLocFlag.
     */
    public String getAutoSprLocFlag() {
        return autoSprLocFlag;
    }
    /**
     * @param autoSprLocFlag The autoSprLocFlag to set.
     */
    public void setAutoSprLocFlag(String autoSprLocFlag) {
        this.autoSprLocFlag = autoSprLocFlag;
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
     * @return Returns the locSprGrCount.
     */
    public int getLocSprGrCount() {
        return locSprGrCount;
    }
    /**
     * @param locSprGrCount The locSprGrCount to set.
     */
    public void setLocSprGrCount(int locSprGrCount) {
        this.locSprGrCount = locSprGrCount;
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
     * @return Returns the cbrNo.
     */
    public String getCbrNo() {
        return cbrNo;
    }
    /**
     * @param cbrNo The cbrNo to set.
     */
    public void setCbrNo(String cbrNo) {
        this.cbrNo = cbrNo;
    }
    /**
     * @return Returns the shipCallNo.
     */
    public String getShipCallNo() {
        return shipCallNo;
    }
    /**
     * @param shipCallNo The shipCallNo to set.
     */
    public void setShipCallNo(String shipCallNo) {
        this.shipCallNo = shipCallNo;
    }
    /**
     * @return Returns the rhdlGroupCnt.
     */
    public int getRhdlGroupCnt() {
        return rhdlGroupCnt;
    }
    /**
     * @param rhdlGroupCnt The rhdlGroupCnt to set.
     */
    public void setRhdlGroupCnt(int rhdlGroupCnt) {
        this.rhdlGroupCnt = rhdlGroupCnt;
    }
    /**
     * @return Returns the grYn.
     */
    public String getGrYn() {
        return grYn;
    }
    /**
     * @param grYn The grYn to set.
     */
    public void setGrYn(String grYn) {
        this.grYn = grYn;
    }
	public List getModeOfOprList() {
		return modeOfOprList;
	}
	public void setModeOfOprList(List modeOfOprList) {
		this.modeOfOprList = modeOfOprList;
	}
	public List getDeliveryList() {
		return deliveryList;
	}
	public void setDeliveryList(List deliveryList) {
		this.deliveryList = deliveryList;
	}
	public ArrayList<CargoLoadingItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<CargoLoadingItem> items) {
		this.items = items;
	}
	public List getCargoTypeList() {
		return cargoTypeList;
	}
	public void setCargoTypeList(List cargoTypeList) {
		this.cargoTypeList = cargoTypeList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}
	public String getShiftStartDt() {
		return shiftStartDt;
	}
	public void setShiftStartDt(String shiftStartDt) {
		this.shiftStartDt = shiftStartDt;
	}
	public String getShiftEndDt() {
		return shiftEndDt;
	}
	public void setShiftEndDt(String shiftEndDt) {
		this.shiftEndDt = shiftEndDt;
	}
	public List getOperationSetHatchList() {
		return operationSetHatchList;
	}
	public void setOperationSetHatchList(List operationSetHatchList) {
		this.operationSetHatchList = operationSetHatchList;
	}
	public String getEqNm() {
		return eqNm;
	}
	public void setEqNm(String eqNm) {
		this.eqNm = eqNm;
	}
	public String getFacNm() {
		return facNm;
	}
	public void setFacNm(String facNm) {
		this.facNm = facNm;
	}
	public ArrayList<WhConfigurationItem> getWhConfigurationItems() {
		return whConfigurationItems;
	}
	public void setWhConfigurationItems(ArrayList<WhConfigurationItem> whConfigurationItems) {
		this.whConfigurationItems = whConfigurationItems;
	}
	public ArrayList<CargoLoadingItem> getOrgCgItems() {
		return orgCgItems;
	}
	public void setOrgCgItems(ArrayList<CargoLoadingItem> orgCgItems) {
		this.orgCgItems = orgCgItems;
	}
	public double getEachMt() {
		return eachMt;
	}
	public void setEachMt(double eachMt) {
		this.eachMt = eachMt;
	}
	public double getEachM3() {
		return eachM3;
	}
	public void setEachM3(double eachM3) {
		this.eachM3 = eachM3;
	}
	public double getAvBalMt() {
		return avBalMt;
	}
	public void setAvBalMt(double avBalMt) {
		this.avBalMt = avBalMt;
	}
	public double getAvBalM3() {
		return avBalM3;
	}
	public void setAvBalM3(double avBalM3) {
		this.avBalM3 = avBalM3;
	}
	public int getAvBalQty() {
		return avBalQty;
	}
	public void setAvBalQty(int avBalQty) {
		this.avBalQty = avBalQty;
	}
	public String getStartDtStr() {
		return startDtStr;
	}
	public void setStartDtStr(String startDtStr) {
		this.startDtStr = startDtStr;
	}
	public String getEndDtStr() {
		return endDtStr;
	}
	public void setEndDtStr(String endDtStr) {
		this.endDtStr = endDtStr;
	}
	
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getPrevJobNo() {
		return prevJobNo;
	}
	public void setPrevJobNo(String prevJobNo) {
		this.prevJobNo = prevJobNo;
	}
	public String getCgTpCdNm() {
		return cgTpCdNm;
	}
	public void setCgTpCdNm(String cgTpCdNm) {
		this.cgTpCdNm = cgTpCdNm;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getBargeNo() {
		return bargeNo;
	}
	public void setBargeNo(String bargeNo) {
		this.bargeNo = bargeNo;
	}
	public String getAdditionalCheckYn() {
		return additionalCheckYn;
	}
	public void setAdditionalCheckYn(String additionalCheckYn) {
		this.additionalCheckYn = additionalCheckYn;
	}
	public ArrayList<PackageJobItem> getPackageItems() {
		return packageItems;
	}
	public void setPackageItems(ArrayList<PackageJobItem> packageItems) {
		this.packageItems = packageItems;
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
	public ArrayList<HangingScaleItem> getHangingScaleItems() {
		return hangingScaleItems;
	}
	public void setHangingScaleItems(ArrayList<HangingScaleItem> hangingScaleItems) {
		this.hangingScaleItems = hangingScaleItems;
	}
	public String getWeightCheckYn() {
		return weightCheckYn;
	}
	public void setWeightCheckYn(String weightCheckYn) {
		this.weightCheckYn = weightCheckYn;
	}
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getRePkgTpCd() {
		return rePkgTpCd;
	}
	public void setRePkgTpCd(String rePkgTpCd) {
		this.rePkgTpCd = rePkgTpCd;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getGrNoPlStr() {
		return grNoPlStr;
	}
	public void setGrNoPlStr(String grNoPlStr) {
		this.grNoPlStr = grNoPlStr;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getProjectCargo() {
		return projectCargo;
	}
	public void setProjectCargo(String projectCargo) {
		this.projectCargo = projectCargo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getWhLocTpCd() {
		return whLocTpCd;
	}
	public void setWhLocTpCd(String whLocTpCd) {
		this.whLocTpCd = whLocTpCd;
	}
	
	
	
}