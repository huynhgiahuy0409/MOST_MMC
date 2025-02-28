package com.tsb.most.biz.dataitem.monitoring;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;


public class HandlingInItem extends DataItem {

    private String cgNo;
    private String grNo;
    private String stat;
    private String shipgNoteNo;
    private String vslCallId;
    private String hdlInDt;//handling in / out all date
    private String vslNm;
    private int snQty;
    private double  snMt;
    private double  snM3;
    private int grQty;
    private double  grMt;
    private double  grM3;
    private int balQty;
    private double  balMt;
    private double  balM3;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;//measurement

    private String delvTpCd;
    private String opDelvTpCd;//job type saved deliveryType
    private String shftId;
    private String shftNm;
    private String shftDt;
    private String tsptr;//Transper CompanyCD//-
    private String tsptrNm;//name
    private String lorryId;
    private String locId;
    private String locNm;
    private String shuLocId;
    private String dmgLocId;
    private String spLocId;
    private String locArea;
    
    private String rhdlNo;
    
    //add when insert
    private String pkgTpCd;
    private String wgtUnit;
    private String msrmtUnit;//measurementUnit
    private String cgTpCd;//Dry, Break, liquid
    private String catgCd;// Imoport, Export, Transhipment -->
    private String catgNm;// Imoport, Export, Transhipment -->
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String cmdtCd;
    private String tsptTpCd;//stat
    private String  fwrAgnt;
    private String  shpgAgent;
    private String  cntryOfOrg;
    
//  add ArrvDelv
    private String cgInOutCd;//Arrv-I//key 
    private String gateInDt;//-
    private String rmk;
    private boolean lorryFlag;//add For lorry is and is not checked 2008.10.30 BY SUNNY
    private String seq; //add 2008.10.30
    
//  add JobItem
    private String jobPurpCd;//GW
    private String fnlDelvYn;
    private String fnlOpeYn;//Handling in all final
    private String jobTpCd;//LD
    private String jobNo;//
    private String jobGroup;

    private String spYn;//Specail cargo condition

    // ADD handlingIn/Out List 2008.03.12
    private String blSn;
    private String shpCng;
    private String currLocId;
    //  ADD 20081113 shipper and consignee
    private String shpr;
    private String shprNm;
    private String cnsne;
    private String cnsneNm;
    
    
    //add rehandling mode 20080629
    private String shutRhdlMode;//20080102
    private String dmgRhdlMode;//20080102
    private String rhdlYn;//using tmt_cg_mst.rhdlMode
    private int shuQty;
    private double   shuMt;
    private double  shuM3;
    private int dmgQty;
    private double  dmgMt;
    private double  dmgM3;
    private String loadCnclMode;//YN
    private boolean gatePassYn;
    private String shuYn;//add 20080626 by sunny
    private String dmgYn;
    private String cgCoCd;//cargo condition code
//    private String rhdlMode;//using tmt_rhdl_cg
    private String balStatCd;//balCode//DMG,SHU
    
    //invLocationAmt sunnykim
    private int locQty;
    private double  locWgt;
    private double  locMsrmt;//measurement
    private String whTpCd;//type G, S, D
    
    //add RhdlItem
    private String nxVslCallId;
    private String nxRefNo;
    private String stsYn;
    private String rhdlMode;//using tmt_rhdl_cg
    
    //ADD "Accumulative Amount"
    private int accuSumQty;
    private double  accuSumWgt;
    private double  accuSumMsrmt;
    
    private String cargo;
    
    //ADD Handlingin-out list -- 2008.10.18
    private int docQty;
    private double docMt;
    private double docM3;
    
    //ADD HI List 2008.11.17
    private String dgYn;
    private String dgStatus;
    private String loadStDt;
    private String jobPurpNm;// screen category HI , HO 
    private String grGp;
    private String grDo;
    
//  add sunny job condition code
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;//Overlanded : O, Spare : S

	 //add package
    private String repkgTypeCd;
    private String pkgNo;
    
	private String scaleAmt;
	private String rcYn;
	private String gatePassNo;
	
	private String whStartDt;	//the date the cargo got out from wh (loading or handling out), added on 20100610 by DongPhuong
	private String inWhDtNo;	//the total date the cargo lied in wh , added on 20100610 by DongPhuong
	
	// KHH.2019.01.31
    private Date hdlInEndDt;
    private Date hdlInStDt;
    private Date gatePassIssueDt;
    
	// KHH.2019.01.30
	private List items;
	private List cargoTypeList;
	private List deliveryList;
//	private ArrayList<WhConfigurationItem> whConfigurationItems;
//	
//	public CargoHandlingInItem() {
//		this.whConfigurationItems = new ArrayList<WhConfigurationItem>();
//	}
//	
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
//    public String getCurrPos() {
//        return currPos;
//    }
//    public void setCurrPos(String currPos) {
//        this.currPos = currPos;
//    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
//    public String getGateOutDt() {
//        return gateOutDt;
//    }
//    public void setGateOutDt(String gateOutDt) {
//        this.gateOutDt = gateOutDt;
//    }
    public double  getGrM3() {
        return grM3;
    }
    public void setGrM3(double  grM3) {
        this.grM3 = grM3;
    }
    public double  getGrMt() {
        return grMt;
    }
    public void setGrMt(double  grMt) {
        this.grMt = grMt;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public int getGrQty() {
        return grQty;
    }
    public void setGrQty(int grQty) {
        this.grQty = grQty;
    }
    public Date getHdlInEndDt() {
        return hdlInEndDt;
    }
    public void setHdlInEndDt(Date hdlInEndDt) {
        this.hdlInEndDt = hdlInEndDt;
    }
    public Date getHdlInStDt() {
        return hdlInStDt;
    }
    public void setHdlInStDt(Date hdlInStDt) {
        this.hdlInStDt = hdlInStDt;
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
    public double  getSnM3() {
        return snM3;
    }
    public void setSnM3(double  snM3) {
        this.snM3 = snM3;
    }
    public double  getSnMt() {
        return snMt;
    }
    public void setSnMt(double  snMt) {
        this.snMt = snMt;
    }
    public int getSnQty() {
        return snQty;
    }
    public void setSnQty(int snQty) {
        this.snQty = snQty;
    }
    public String getSpYn() {
        return spYn;
    }
    public void setSpYn(String spYn) {
        this.spYn = spYn;
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

    public String getTsptrNm() {
        return tsptrNm;
    }
    public void setTsptrNm(String tsptrNm) {
        this.tsptrNm = tsptrNm;
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
    public double  getWgt() {
        return wgt;
    }
    public void setWgt(double  wgt) {
        this.wgt = wgt;
    }
    public String getOpDelvTpCd() {
        return opDelvTpCd;
    }
    public void setOpDelvTpCd(String opDelvTpCd) {
        this.opDelvTpCd = opDelvTpCd;
    }
	public String getCgInOutCd() {
	    return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
	    this.cgInOutCd = cgInOutCd;
	}
    public String getCmdtCd() {
        return cmdtCd;
    }
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    public String getCntryOfOrg() {
        return cntryOfOrg;
    }
    public void setCntryOfOrg(String cntryOfOrg) {
        this.cntryOfOrg = cntryOfOrg;
    }
    public String getFdest() {
        return fdest;
    }
    public void setFdest(String fdest) {
        this.fdest = fdest;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public String getGateInDt() {
        return gateInDt;
    }
    public void setGateInDt(String gateInDt) {
        this.gateInDt = gateInDt;
    }
    public String getJobPurpCd() {
    return jobPurpCd;
    }
    public void setJobPurpCd(String jobPurpCd) {
    this.jobPurpCd = jobPurpCd;
    }
    public String getFnlDelvYn() {
        return fnlDelvYn;
    }
    public void setFnlDelvYn(String fnlDelvYn) {
        this.fnlDelvYn = fnlDelvYn;
    }
    public String getJobTpCd() {
        return jobTpCd;
    }
    public void setJobTpCd(String jobTpCd) {
        this.jobTpCd = jobTpCd;
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
    public String getShpgAgent() {
        return shpgAgent;
    }
    public void setShpgAgent(String shpgAgent) {
        this.shpgAgent = shpgAgent;
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
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
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
    public String getLocNm() {
        return locNm;
    }
    public void setLocNm(String locNm) {
        this.locNm = locNm;
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
    public String getDmgRhdlMode() {
        return dmgRhdlMode;
    }
    public void setDmgRhdlMode(String dmgRhdlMode) {
        this.dmgRhdlMode = dmgRhdlMode;
    }
    public String getLoadCnclMode() {
        return loadCnclMode;
    }
    public void setLoadCnclMode(String loadCnclMode) {
        this.loadCnclMode = loadCnclMode;
    }
    public String getRhdlYn() {
        return rhdlYn;
    }
    public void setRhdlYn(String rhdlYn) {
        this.rhdlYn = rhdlYn;
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
	public String getShutRhdlMode() {
	    return shutRhdlMode;
	}
	public void setShutRhdlMode(String shutRhdlMode) {
	    this.shutRhdlMode = shutRhdlMode;
	}
	public boolean getGatePassYn() {
	    return gatePassYn;
	}
	
	public void setGatePassYn(boolean gatePassYn) {
	     this.gatePassYn = gatePassYn;
	}
	
	public void setGatePassYn(String gatePassYn) {
	  if(gatePassYn == null){
	      this.gatePassYn = false;
	  }else if(gatePassYn.equals("Y")){
	      this.gatePassYn = true;
	  }else if(gatePassYn.equals("true")){
	      this.gatePassYn = true;
	  }else{
	      this.gatePassYn = false;
	  }
	}
	public Date getGatePassIssueDt() {
	    return gatePassIssueDt;
	}
	public void setGatePassIssueDt(Date gatePassIssueDt) {
	    this.gatePassIssueDt = gatePassIssueDt;
	}
    public String getDmgYn() {
        return dmgYn;
    }
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    public String getShuYn() {
        return shuYn;
    }
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    public String getRhdlMode() {
        return rhdlMode;
    }
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getBalStatCd() {
        return balStatCd;
    }
    public void setBalStatCd(String balStatCd) {
        this.balStatCd = balStatCd;
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
    public String getDmgLocId() {
        return dmgLocId;
    }
    public void setDmgLocId(String dmgLocId) {
        this.dmgLocId = dmgLocId;
    }
    public String getShuLocId() {
        return shuLocId;
    }
    public void setShuLocId(String shuLocId) {
        this.shuLocId = shuLocId;
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
    public String getLocArea() {
        return locArea;
    }
    public void setLocArea(String locArea) {
        this.locArea = locArea;
    }
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getWhTpCd() {
        return whTpCd;
    }
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    public String getJobGroup() {
        return jobGroup;
    }
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
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
     * @return Returns the crud.
     */
    public String getCrud() {
        return crud;
    }
    /**
     * @param crud The crud to set.
     */
    public void setCrud(String crud) {
        this.crud = crud;
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
     * @return Returns the loadStDt.
     */
    public String getLoadStDt() {
        return loadStDt;
    }
    /**
     * @param loadStDt The loadStDt to set.
     */
    public void setLoadStDt(String loadStDt) {
        this.loadStDt = loadStDt;
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
     * @return Returns the fnlOpeYn.
     */
    public String getFnlOpeYn() {
        return fnlOpeYn;
    }
    /**
     * @param fnlOpeYn The fnlOpeYn to set.
     */
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
     * @return Returns the hdlDt.
     */
    public String getHdlInDt() {
        return hdlInDt;
    }
    /**
     * @param hdlDt The hdlDt to set.
     */
    public void setHdlInDt(String hdlInDt) {
        this.hdlInDt = hdlInDt;
    }
    /**
     * @return Returns the gatePassNo.
     */
    public String getGatePassNo() {
        return gatePassNo;
    }
    /**
     * @param gatePassNo The gatePassNo to set.
     */
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    /**
     * @return Returns the spLocId.
     */
    public String getSpLocId() {
        return spLocId;
    }
    /**
     * @param spLocId The spLocId to set.
     */
    public void setSpLocId(String spLocId) {
        this.spLocId = spLocId;
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
	public List getDeliveryList() {
		return deliveryList;
	}
	public void setDeliveryList(List deliveryList) {
		this.deliveryList = deliveryList;
	}
//	public ArrayList<WhConfigurationItem> getWhConfigurationItems() {
//		return whConfigurationItems;
//	}
//	public void setWhConfigurationItems(ArrayList<WhConfigurationItem> whConfigurationItems) {
//		this.whConfigurationItems = whConfigurationItems;
//	}

	public String getRhdlNo() {
		return rhdlNo;
	}

	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
}
