package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.framework.dataitem.DataItem;

public class CargoHandlingOutItem extends DataItem {
    private String vslCd;
    private String callYear;
    private String callSeq;
	
	private String cgNo;
    private String shipgNoteNo;
    private String vslCallId;
    private String scn;
    private String vslNm;
   
    private int actQty;
    private double  actMt;
    private double  actM3;
    
    private int qty;//general 
    private double  mt;//general 
    private double  m3;//general 
    
    private int shuQty;
    private double  shuMt;
    private double  shuM3;
    
    private int dmgQty;
    private double  dmgMt;
    private double  dmgM3;
    
    private int balQty;
    private double  balMt;
    private double  balM3;
    private int loadQty;
    private double  loadMt;
    private double  loadM3;
    private String blNo;
    private String grNo;
    private String doNo;
    private String gateInDt;
    private String stat;
    private String startDt;
    private String endDt;
    private String delvTpCd;
    private String hatchNo;
    private String shftId;
    private String shftDt;
    private String shftNm;
    private String tsptr;
    private String tsptrNm;
    private String tsptTpCd;//stat
    private String locId;
    private String sprLocId;
    private String lorryId;
    private String catgCd;
    private String catgNm;// Imoport, Export, Transhipment -->
    private String hoDt;
    private String whFnlDelvYn;
    private String actlDelvTpCd;//'Direct D','indirect i' both b
    private String cmdtCd;
    private String cmdtGrpCd;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;
    private String  fwrAgnt;
    private String  shpgAgent;
    private String  cntryOfOrg;
    private String cgTpCd;
    private String cgTpNm;
    private String hdlOutDt;//handling in / out all date    
    private String pkgTpCd;
    private String rePkgTpCd;
    private String wgtUnit;
    private String msrmtUnit;//measurementUnit
    private String tmnlInDt;
    private String tmnlOutDt;
    
    //  add JobItem
    private String jobPurpCd;
    private String fnlDelvYn;
    private String jobTpCd;
    private String balStatCd;//balCode//DMG,SHU
    private int cntrQty;
    private String eqNo;
    private String forkliftNo;
    private String primeNo;
    private String fmLocId;
    private String toLocId;
    private String toHatchNo;
    private String hatchDrt;
    private String gangNo;
    private String locArea;
    private int locQty;
    private double  locWgt;
    private double  locMsrmt;
    private String jobNo;
    private String jobGroup;
    private String gateTxnNo;
    private String wbTransactionNo;
    
    //add ArrvDelv
    private String cgInOutCd;//Arrv-I, Delv-O //key 
    private String gatePassNo;  
    private String gatePassIssueDt;
    private String fnlYn;// if final y is, gate in DT or out DT
    private String rmk;        
    private String disEndDt;
    private String shuYn;
    private String dmgYn;
    private String rhdlMode;
    
    // ADD handlingIn/Out List
    private String blSn;
    private String shpCng;
    private String currLocId;

    private String whTpCd;//type G, S, D
    private String whLocTpCd;
    private String crud;
    private String userId; 
    private String cargo;
    private int docQty;
    private double docMt;
    private double docM3;

    private String dgYn;
    private String dgStatus;
    private String disStDt;
    private String jobPurpNm;// screen category HI , HO 
    private String grGp;
    private String grDo;

    private String custMode;
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;//Overlanded : O, Spare : S
	private String rhdlNo;
	private String rhdlGroupNo;
    private String repkgTypeCd;
    private String pkgNo;
    private String scaleAmt;
    private String rcYn;
    private String spYn;//Specail cargo condition
    
    private String whStartDt;		//The Start Day cargo got out of warehouse
    private String inWhDtNo;		//The Total Day cargo lied in warehouse
    private int locCount;
    private String autoLocFlag;//if autoFlag is true, Loading is auto-De-Allocation
    private String autoNorLocFlag;//normal case flag

    private String packingSeq;
    private int packingQty;
    private double packingMT;
    private double packingM3;
  
    private String hdlOutStDt;
    private String hdlOutEndDt;
    
    private List items;
    private List cargoTypeList;
    
    private String shpgAgentNm;
    private String cngShp;
    private String isExistedCargo;
    private String shpr;
    private String shprNm;
    private String cnsne;
    private String cnsneNm;
    private String hdlInStDt;
    private String tsptTpNo;
    private String ovrQty;
    private String ovrWgt;
    private String shuWgt;
    private String dmgWgt;
    private double  ovrM3;
	
	private String ovrShuQty;
	private String ovrShuWgt;
	private String ovrShuM3;
	private String chkDt;	
	private String fnlOpeYn;
	private String cgOpeStat;
	private String delvTpNm;
	private String statCd;
	private String statNm;
	
	private String cnsneeCd;  // Consignee Code
	private String cnsneeNm;  // Consingee Name
	private String cnsnorCd;  // Consignor Code
	private String cnsnorNm;  // Consignor Name
	private String workingStatus;
    private String caTyCd;
    private String eachVol;
    private String eachWgt;
    
    private String domesticChk;
    private String mfDocId;
    private String isMultiCargo;
    private String sdoNo;
    private String weightCheckYn;
    private String lotNo;
    private String lorryNo;
	private String chassisNo;
	private String firstWgt;
	private String secondWgt;
	private String firstWgtDt;
	private String secondWgtDt;
	private String rehandleCheck;
	private String unitNo;
	private String driverId;
    
    private ArrayList<PackageJobItem> packageItems;
    
    private ArrayList<WhConfigurationItem> whConfigurationItems;
    
	public String getEachVol() {
		return eachVol;
	}
	public void setEachVol(String eachVol) {
		this.eachVol = eachVol;
	}
	public String getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(String eachWgt) {
		this.eachWgt = eachWgt;
	}
	
	
    public double  getBalM3() {
        return balM3;
    }
    
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
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
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getEndDt() {
        return endDt;
    }
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    public String getGateInDt() {
        return gateInDt;
    }
    public void setGateInDt(String gateInDt) {
        this.gateInDt = gateInDt;
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
    public String getLorryId() {
        return lorryId;
    }
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
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
    public int getQty() {
        return qty;
    }
    public void setQty(int qty) {
        this.qty = qty;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getStartDt() {
        return startDt;
    }
    public void setStartDt(String startDt) {
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
    public String getHoDt() {
        return hoDt;
    }
    public void setHoDt(String hoDt) {
        this.hoDt = hoDt;
    }
    public String getWhFnlDelvYn() {
        return whFnlDelvYn;
    }    

    public void setWhFnlDelvYn(String whFnlDelvYn) {
        if(whFnlDelvYn == null){
            this.whFnlDelvYn = "N";
        }else if(whFnlDelvYn.equals("Y")){
            this.whFnlDelvYn = "Y";
        }else if(whFnlDelvYn.equals("true")){
            this.whFnlDelvYn = "Y";
        }else{
            this.whFnlDelvYn = "N";
        }
    }
    public String getActlDelvTpCd() {
        return actlDelvTpCd;
    }
    public void setActlDelvTpCd(String actlDelvTpCd) {
        this.actlDelvTpCd = actlDelvTpCd;
    }
    
    public String getDisEndDt() {
        return disEndDt;
    }
    public void setDisEndDt(String disEndDt) {
        this.disEndDt = disEndDt;
    }
    public String getCntryOfOrg() {
        return cntryOfOrg;
    }
    public void setCntryOfOrg(String cntryOfOrg) {
        this.cntryOfOrg = cntryOfOrg;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public double  getMsrmt() {
        return msrmt;
    }
    public void setMsrmt(double  msrmt) {
        this.msrmt = msrmt;
    }
    public int getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getShpgAgent() {
        return shpgAgent;
    }
    public void setShpgAgent(String shpgAgent) {
        this.shpgAgent = shpgAgent;
    }
    public double  getWgt() {
        return wgt;
    }
    public void setWgt(double  wgt) {
        this.wgt = wgt;
    }
    public String getBalStatCd() {
        return balStatCd;
    }
    public void setBalStatCd(String balStatCd) {
        this.balStatCd = balStatCd;
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
    public String getForkliftNo() {
        return forkliftNo;
    }
    public void setForkliftNo(String forkliftNo) {
        this.forkliftNo = forkliftNo;
    }
    public String getPrimeNo() {
        return primeNo;
    }
    public void setPrimeNo(String primeNo) {
        this.primeNo = primeNo;
    }
    public String getFmLocId() {
        return fmLocId;
    }
    public void setFmLocId(String fmLocId) {
        this.fmLocId = fmLocId;
    }
    public String getFnlDelvYn() {
        return fnlDelvYn;
    }
    public void setFnlDelvYn(String fnlDelvYn) {
        this.fnlDelvYn = fnlDelvYn;
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
    public String getToHatchNo() {
        return toHatchNo;
    }
    public void setToHatchNo(String toHatchNo) {
        this.toHatchNo = toHatchNo;
    }
    public String getToLocId() {
        return toLocId;
    }
    public void setToLocId(String toLocId) {
        this.toLocId = toLocId;
    }
    public String getCgInOutCd() {
        return cgInOutCd;
    }
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
    }
    public String getGatePassIssueDt() {
        return gatePassIssueDt;
    }
    public void setGatePassIssueDt(String gatePassIssueDt) {
        this.gatePassIssueDt = gatePassIssueDt;
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
    
    public String getHdlOutEndDt() {
        return hdlOutEndDt;
    }
    public void setHdlOutEndDt(String hdlOutEndDt) {
        this.hdlOutEndDt = hdlOutEndDt;
    }
    public String getHdlOutStDt() {
        return hdlOutStDt;
    }
    public void setHdlOutStDt(String hdlOutStDt) {
        this.hdlOutStDt = hdlOutStDt;
    }
    public String getFnlYn() {
        return fnlYn;
    }
    public void setFnlYn(String fnlYn) {
        this.fnlYn = fnlYn;
    }
    public String getMsrmtUnit() {
        return msrmtUnit;
    }
    public void setMsrmtUnit(String msrmtUnit) {
        this.msrmtUnit = msrmtUnit;
    }
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    public String getWgtUnit() {
        return wgtUnit;
    }
    public void setWgtUnit(String wgtUnit) {
        this.wgtUnit = wgtUnit;
    }
    public String getTmnlInDt() {
        return tmnlInDt;
    }
    public void setTmnlInDt(String tmnlInDt) {
        this.tmnlInDt = tmnlInDt;
    }
    public String getTmnlOutDt() {
        return tmnlOutDt;
    }
    public void setTmnlOutDt(String tmnlOutDt) {
        this.tmnlOutDt = tmnlOutDt;
    }
    public String getCmdtCd() {
        return cmdtCd;
    }
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    public String getcmdtGrpCd() {
    	return cmdtGrpCd;
    }
    public void setcmdtGrpCd(String cmdtGrpCd) {
    	this.cmdtGrpCd = cmdtGrpCd;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getDmgYn() {
        return dmgYn;
    }
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    public String getTsptrNm() {
        return tsptrNm;
    }
    public void setTsptrNm(String tsptrNm) {
        this.tsptrNm = tsptrNm;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getBlSn() {
        return blSn;
    }
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    public String getCurrLocId() {
        return currLocId;
    }
    public void setCurrLocId(String currLocId) {
        this.currLocId = currLocId;
    }
    public String getShpCng() {
        return shpCng;
    }
    public void setShpCng(String shpCng) {
        this.shpCng = shpCng;
    }
    public String getWhTpCd() {
        return whTpCd;
    }
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    
    public String getWhLocTpCd() {
		return whLocTpCd;
	}
	public void setWhLocTpCd(String whLocTpCd) {
		this.whLocTpCd = whLocTpCd;
	}
	//add 20080707
    public double getActM3() {
        return actM3;
    }
    public void setActM3(double actM3) {
        this.actM3 = actM3;
    }
    public double getActMt() {
        return actMt;
    }
    public void setActMt(double actMt) {
        this.actMt = actMt;
    }
    public int getActQty() {
        return actQty;
    }
    public void setActQty(int actQty) {
        this.actQty = actQty;
    }
    public double getDmgM3() {
        return dmgM3;
    }
    public void setDmgM3(double dmgM3) {
        this.dmgM3 = dmgM3;
    }
    public double getDmgMt() {
        return dmgMt;
    }
    public void setDmgMt(double dmgMt) {
        this.dmgMt = dmgMt;
    }
    public int getDmgQty() {
        return dmgQty;
    }
    public void setDmgQty(int dmgQty) {
        this.dmgQty = dmgQty;
    }
    public double getShuM3() {
        return shuM3;
    }
    public void setShuM3(double shuM3) {
        this.shuM3 = shuM3;
    }
    public double getShuMt() {
        return shuMt;
    }
    public void setShuMt(double shuMt) {
        this.shuMt = shuMt;
    }
    public int getShuQty() {
        return shuQty;
    }
    public void setShuQty(int shuQty) {
        this.shuQty = shuQty;
    }
    public String getLocArea() {
        return locArea;
    }
    public void setLocArea(String locArea) {
        this.locArea = locArea;
    }
    public double getLocMsrmt() {
        return locMsrmt;
    }
    public void setLocMsrmt(double locMsrmt) {
        this.locMsrmt = locMsrmt;
    }
    public int getLocQty() {
        return locQty;
    }
    public void setLocQty(int locQty) {
        this.locQty = locQty;
    }
    public double getLocWgt() {
        return locWgt;
    }
    public void setLocWgt(double locWgt) {
        this.locWgt = locWgt;
    }
    public String getRhdlMode() {
        return rhdlMode;
    }
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getShuYn() {
        return shuYn;
    }
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getJobNo() {
        return jobNo;
    }
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    public String getJobGroup() {
        return jobGroup;
    }
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }

    //-- start ADD 20080827 tnkytn Need for HHT
    public String getCrud() {
        return crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    //-- end   ADD 20080827 tnkytn Need for HHT
    /**
     * @return Returns the cargo.
     */
    public String getCargo() {
        return cargo;
    }
    /**
     * @param cargo The cargo to set.
     */
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    /**
     * @return Returns the docM3.
     */
    public double getDocM3() {
        return docM3;
    }
    /**
     * @param docM3 The docM3 to set.
     */
    public void setDocM3(double docM3) {
        this.docM3 = docM3;
    }
    /**
     * @return Returns the docMt.
     */
    public double getDocMt() {
        return docMt;
    }
    /**
     * @param docMt The docMt to set.
     */
    public void setDocMt(double docMt) {
        this.docMt = docMt;
    }
    /**
     * @return Returns the docQty.
     */
    public int getDocQty() {
        return docQty;
    }
    /**
     * @param docQty The docQty to set.
     */
    public void setDocQty(int docQty) {
        this.docQty = docQty;
    }
    /**
     * @return Returns the dgStatus.
     */
    public String getDgStatus() {
        return dgStatus;
    }
    /**
     * @param dgStatus The dgStatus to set.
     */
    public void setDgStatus(String dgStatus) {
        this.dgStatus = dgStatus;
    }
    /**
     * @return Returns the dgYn.
     */
    public String getDgYn() {
        return dgYn;
    }
    /**
     * @param dgYn The dgYn to set.
     */
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    /**
     * @return Returns the disStDt.
     */
    public String getDisStDt() {
        return disStDt;
    }
    /**
     * @param disStDt The disStDt to set.
     */
    public void setDisStDt(String disStDt) {
        this.disStDt = disStDt;
    }
    /**
     * @return Returns the grGp.
     */
    public String getGrGp() {
        return grGp;
    }
    /**
     * @param grGp The grGp to set.
     */
    public void setGrGp(String grGp) {
        this.grGp = grGp;
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
     * @return Returns the scaleAmt.
     */
    public String getScaleAmt() {
        return scaleAmt;
    }
    /**
     * @param scaleAmt The scaleAmt to set.
     */
    public void setScaleAmt(String scaleAmt) {
        this.scaleAmt = scaleAmt;
    }
    /**
     * @return Returns the grDo.
     */
    public String getGrDo() {
        return grDo;
    }
    /**
     * @param grDo The grDo to set.
     */
    public void setGrDo(String grDo) {
        this.grDo = grDo;
    }
    /**
     * @return Returns the rcYn.
     */
    public String getRcYn() {
        return rcYn;
    }
    /**
     * @param rcYn The rcYn to set.
     */
    public void setRcYn(String rcYn) {
        this.rcYn = rcYn;
    }
    /**
     * @return Returns the catgNm.
     */
    public String getCatgNm() {
        return catgNm;
    }
    /**
     * @param catgNm The catgNm to set.
     */
    public void setCatgNm(String catgNm) {
        this.catgNm = catgNm;
    }
    /**
     * @return Returns the spYn.
     */
    public String getSpYn() {
        return spYn;
    }
    /**
     * @param spYn The spYn to set.
     */
    public void setSpYn(String spYn) {
        this.spYn = spYn;
    }
    /**
     * @return Returns the hdlDt.
     */
    public String getHdlOutDt() {
        return hdlOutDt;
    }
    /**
     * @param hdlDt The hdlDt to set.
     */
    public void setHdlOutDt(String hdlOutDt) {
        this.hdlOutDt = hdlOutDt;
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
     * @return Returns the inWhDtNo.
     */
    public String getInWhDtNo() {
        return inWhDtNo;
    }
    /**
     * @param inWhDtNo The inWhDtNo to set.
     */
    public void setInWhDtNo(String inWhDtNo) {
        this.inWhDtNo = inWhDtNo;
    }
    /**
     * @return Returns the whStartDt.
     */
    public String getWhStartDt() {
        return whStartDt;
    }
    /**
     * @param whStartDt The whStartDt to set.
     */
    public void setWhStartDt(String whStartDt) {
        this.whStartDt = whStartDt;
    }
    public String getPackingSeq() {
        return packingSeq;
    }
    public void setPackingSeq(String packingSeq) {
        this.packingSeq = packingSeq;
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
	public List getItems() {
		return items;
	}
	public void setItems(List items) {
		this.items = items;
	}
	public List getCargoTypeList() {
		return cargoTypeList;
	}
	public void setCargoTypeList(List cargoTypeList) {
		this.cargoTypeList = cargoTypeList;
	}
	public String getShpgAgentNm() {
		return shpgAgentNm;
	}
	public void setShpgAgentNm(String shpgAgentNm) {
		this.shpgAgentNm = shpgAgentNm;
	}
	public String getCngShp() {
		return cngShp;
	}
	public void setCngShp(String cngShp) {
		this.cngShp = cngShp;
	}
	public String getIsExistedCargo() {
		return isExistedCargo;
	}
	public void setIsExistedCargo(String isExistedCargo) {
		this.isExistedCargo = isExistedCargo;
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
	public String getHdlInStDt() {
		return hdlInStDt;
	}
	public void setHdlInStDt(String hdlInStDt) {
		this.hdlInStDt = hdlInStDt;
	}
	public String getTsptTpNo() {
		return tsptTpNo;
	}
	public void setTsptTpNo(String tsptTpNo) {
		this.tsptTpNo = tsptTpNo;
	}
	public String getOvrQty() {
		return ovrQty;
	}
	public void setOvrQty(String ovrQty) {
		this.ovrQty = ovrQty;
	}
	public String getOvrWgt() {
		return ovrWgt;
	}
	public void setOvrWgt(String ovrWgt) {
		this.ovrWgt = ovrWgt;
	}
	public String getShuWgt() {
		return shuWgt;
	}
	public void setShuWgt(String shuWgt) {
		this.shuWgt = shuWgt;
	}
	public String getDmgWgt() {
		return dmgWgt;
	}
	public void setDmgWgt(String dmgWgt) {
		this.dmgWgt = dmgWgt;
	}
	public double getOvrM3() {
		return ovrM3;
	}
	public void setOvrM3(double ovrM3) {
		this.ovrM3 = ovrM3;
	}
	public String getOvrShuQty() {
		return ovrShuQty;
	}
	public void setOvrShuQty(String ovrShuQty) {
		this.ovrShuQty = ovrShuQty;
	}
	public String getOvrShuWgt() {
		return ovrShuWgt;
	}
	public void setOvrShuWgt(String ovrShuWgt) {
		this.ovrShuWgt = ovrShuWgt;
	}
	public String getOvrShuM3() {
		return ovrShuM3;
	}
	public void setOvrShuM3(String ovrShuM3) {
		this.ovrShuM3 = ovrShuM3;
	}
	public String getChkDt() {
		return chkDt;
	}
	public void setChkDt(String chkDt) {
		this.chkDt = chkDt;
	}
	public String getFnlOpeYn() {
		return fnlOpeYn;
	}
	public void setFnlOpeYn(String fnlOpeYn) {
		this.fnlOpeYn = fnlOpeYn;
	}
	public String getCgOpeStat() {
		return cgOpeStat;
	}
	public void setCgOpeStat(String cgOpeStat) {
		this.cgOpeStat = cgOpeStat;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}
	public String getCnsneeCd() {
		return cnsneeCd;
	}
	public void setCnsneeCd(String cnsneeCd) {
		this.cnsneeCd = cnsneeCd;
	}
	public String getCnsneeNm() {
		return cnsneeNm;
	}
	public void setCnsneeNm(String cnsneeNm) {
		this.cnsneeNm = cnsneeNm;
	}
	public String getCnsnorCd() {
		return cnsnorCd;
	}
	public void setCnsnorCd(String cnsnorCd) {
		this.cnsnorCd = cnsnorCd;
	}
	public String getCnsnorNm() {
		return cnsnorNm;
	}
	public void setCnsnorNm(String cnsnorNm) {
		this.cnsnorNm = cnsnorNm;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getCaTyCd() {
		return caTyCd;
	}
	public void setCaTyCd(String caTyCd) {
		this.caTyCd = caTyCd;
	}
	public ArrayList<WhConfigurationItem> getWhConfigurationItems() {
		return whConfigurationItems;
	}
	public void setWhConfigurationItems(ArrayList<WhConfigurationItem> whConfigurationItems) {
		this.whConfigurationItems = whConfigurationItems;
	}		
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getIsMultiCargo() {
		return isMultiCargo;
	}
	public void setIsMultiCargo(String isMultiCargo) {
		this.isMultiCargo = isMultiCargo;
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
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getWeightCheckYn() {
		return weightCheckYn;
	}
	public void setWeightCheckYn(String weightCheckYn) {
		this.weightCheckYn = weightCheckYn;
	}
	public String getRePkgTpCd() {
		return rePkgTpCd;
	}
	public void setRePkgTpCd(String rePkgTpCd) {
		this.rePkgTpCd = rePkgTpCd;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getFirstWgt() {
		return firstWgt;
	}
	public void setFirstWgt(String firstWgt) {
		this.firstWgt = firstWgt;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}
	public String getFirstWgtDt() {
		return firstWgtDt;
	}
	public void setFirstWgtDt(String firstWgtDt) {
		this.firstWgtDt = firstWgtDt;
	}
	public String getSecondWgtDt() {
		return secondWgtDt;
	}
	public void setSecondWgtDt(String secondWgtDt) {
		this.secondWgtDt = secondWgtDt;
	}
	public String getRehandleCheck() {
		return rehandleCheck;
	}
	public void setRehandleCheck(String rehandleCheck) {
		this.rehandleCheck = rehandleCheck;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
}
