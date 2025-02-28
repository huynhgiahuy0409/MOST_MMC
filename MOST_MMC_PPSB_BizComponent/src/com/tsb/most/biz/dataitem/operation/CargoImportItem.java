package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoImportItem extends DataItem {

	private String cgNo;
	private String vslCallId;
	private String scn;
	private String vslNm;
	private String fwrAgnt;
	private String shpgAgent;   // Shipping Agent Code
	private String shpgAgentNm; // Shipping Agent Name
	private String cngShp;
	private String cargo;
	private String dmgYn;
	private String rcYn;
	private String isExistedCargo;
	
	private String shpr;
	private String shprNm;
	private String cnsne;
	private String cnsneNm;
	private String masterBL;
	
	private int qty;
	private double  mt;
	private double  m3;
	private int docQty;
	private double docMt;
	private double  docM3;
	private String  blNo;
	private String doNo;
	private String gateInDt;
	private String hdlInStDt;
	private String hdlOutDt;
	private String tsptTpNo;
	private String stat;
	private int ovrQty;
	private int shuQty;
	private int dmgQty;
	private double  ovrWgt;
	private double  shuWgt;
	private double  dmgWgt;
	private double  ovrM3;
	private double  shuM3;
	private double  dmgM3;
	private String ovrShuQty;
	private String ovrShuWgt;
	private String ovrShuM3;
	private String chkDt;
	private String delvTpCd;
	private String fnlDelvYn;
	private String fnlOpeYn;
	
	private String cgOpeStat;
	
	private String cgTpCd;
	
	private String cmdtCd;
	private String catgCd;
	private String cmdtGrpNm;
	private String pkgTpCd;
	private String pkgTpNm;
	private String cgTpCdNm;
	private String cmdtNm;
	
	private String catgNm;
	private String delvTpNm;
	private String statCd;
	private String statNm;

	private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, Overlanded : O, Spare : A
	
	private String cnsneeCd;  // Consignee Code
	private String cnsneeNm;  // Consingee Name
	private String cnsnorCd;  // Consignor Code
	private String cnsnorNm;  // Consignor Name
	
	private String gateOutQty;
	private String gateOutM3;
	private String gateOutMT;
	private String storedQty;
	private String storedM3;
	private String storedMT;
	private String dischargedQty;
	private String dischargedM3;
	private String hatchNo;
	private String dischargedMT;
	private String height;
	private String width;
	private String length;
	private String eachVolume;
	private String eachWeight;
	private String truckNo;
	private String shiftId;
	private String shiftNm;
	private String modeOperation;
	private String startDate;
	private String endDate;
	private String yardTruckQty;
	private String yardTruckM3;
	private String yardTruckMT;
	private String jobNo;
	private String opeClassCd;
	private String jobGroup;
	private String lorryNo;
	private String custMode;
	private String pkgNo;
	private String marksNo;
	private String userRefNo;
	private String sdoNo;
	private String wbTransactionNo;
	private String secondWgt;
	private double msrmt;//tmt_cg_mst msrmt
    private double wgt;//tmt_cg_mst wgt
    private int pkgQty;//tmt_cg_mst pkgQty
	private String remainUnit;
	private String brandNm;
	private String modelNm;
	private String tsptTpCd;
	private String sdoDelvTpCd;
	
	//added for checking atb valid or not when discharging 20/03/2024
	private String atb;
	
	
	
	
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getGateOutQty() {
		return gateOutQty;
	}
	public void setGateOutQty(String gateOutQty) {
		this.gateOutQty = gateOutQty;
	}
	public String getGateOutM3() {
		return gateOutM3;
	}
	public void setGateOutM3(String gateOutM3) {
		this.gateOutM3 = gateOutM3;
	}
	public String getGateOutMT() {
		return gateOutMT;
	}
	public void setGateOutMT(String gateOutMT) {
		this.gateOutMT = gateOutMT;
	}
	public String getStoredQty() {
		return storedQty;
	}
	public void setStoredQty(String storedQty) {
		this.storedQty = storedQty;
	}
	public String getStoredM3() {
		return storedM3;
	}
	public void setStoredM3(String storedM3) {
		this.storedM3 = storedM3;
	}
	public String getStoredMT() {
		return storedMT;
	}
	public void setStoredMT(String storedMT) {
		this.storedMT = storedMT;
	}
	public String getDischargedQty() {
		return dischargedQty;
	}
	public void setDischargedQty(String dischargedQty) {
		this.dischargedQty = dischargedQty;
	}
	public String getDischargedM3() {
		return dischargedM3;
	}
	public void setDischargedM3(String dischargedM3) {
		this.dischargedM3 = dischargedM3;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getDischargedMT() {
		return dischargedMT;
	}
	public void setDischargedMT(String dischargedMT) {
		this.dischargedMT = dischargedMT;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getEachVolume() {
		return eachVolume;
	}
	public void setEachVolume(String eachVolume) {
		this.eachVolume = eachVolume;
	}
	public String getEachWeight() {
		return eachWeight;
	}
	public void setEachWeight(String eachWeight) {
		this.eachWeight = eachWeight;
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
    public String getIsExistedCargo() {
        return isExistedCargo;
    }
    public void setIsExistedCargo(String isExistedCargo) {
        this.isExistedCargo = isExistedCargo;
    }
    public String getRcYn() {
        return rcYn;
    }
    public void setRcYn(String rcYn) {
        this.rcYn = rcYn;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
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
     * @return Returns the catgCd.
     */
    public String getCatgCd() {
        return catgCd;
    }
    /**
     * @param catgCd The catgCd to set.
     */
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
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
     * @return Returns the cgOpeStat.
     */
    public String getCgOpeStat() {
        return cgOpeStat;
    }
    /**
     * @param cgOpeStat The cgOpeStat to set.
     */
    public void setCgOpeStat(String cgOpeStat) {
        this.cgOpeStat = cgOpeStat;
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
     * @return Returns the chkDt.
     */
    public String getChkDt() {
        return chkDt;
    }
    /**
     * @param chkDt The chkDt to set.
     */
    public void setChkDt(String chkDt) {
        this.chkDt = chkDt;
    }
    /**
     * @return Returns the cmdtCd.
     */
    public String getCmdtCd() {
        return cmdtCd;
    }
    /**
     * @param cmdtCd The cmdtCd to set.
     */
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    /**
     * @return Returns the cngShp.
     */
    public String getCngShp() {
        return cngShp;
    }
    /**
     * @param cngShp The cngShp to set.
     */
    public void setCngShp(String cngShp) {
        this.cngShp = cngShp;
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
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    /**
     * @return Returns the dmgM3.
     */
    public double getDmgM3() {
        return dmgM3;
    }
    /**
     * @param dmgM3 The dmgM3 to set.
     */
    public void setDmgM3(double dmgM3) {
        this.dmgM3 = dmgM3;
    }
    /**
     * @return Returns the dmgQty.
     */
    public int getDmgQty() {
        return dmgQty;
    }
    /**
     * @param dmgQty The dmgQty to set.
     */
    public void setDmgQty(int dmgQty) {
        this.dmgQty = dmgQty;
    }
    /**
     * @return Returns the dmgWgt.
     */
    public double getDmgWgt() {
        return dmgWgt;
    }
    /**
     * @param dmgWgt The dmgWgt to set.
     */
    public void setDmgWgt(double dmgWgt) {
        this.dmgWgt = dmgWgt;
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
     * @return Returns the doNo.
     */
    public String getDoNo() {
        return doNo;
    }
    /**
     * @param doNo The doNo to set.
     */
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    /**
     * @return Returns the fnlDelvYn.
     */
    public String getFnlDelvYn() {
        return fnlDelvYn;
    }
    /**
     * @param fnlDelvYn The fnlDelvYn to set.
     */
    public void setFnlDelvYn(String fnlDelvYn) {
        this.fnlDelvYn = fnlDelvYn;
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
        this.fnlOpeYn = fnlOpeYn;
    }
    /**
     * @return Returns the fwrAgnt.
     */
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    /**
     * @param fwrAgnt The fwrAgnt to set.
     */
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    /**
     * @return Returns the gateInDt.
     */
    public String getGateInDt() {
        return gateInDt;
    }
    /**
     * @param gateInDt The gateInDt to set.
     */
    public void setGateInDt(String gateInDt) {
        this.gateInDt = gateInDt;
    }
    /**
     * @return Returns the hdlInStDt.
     */
    public String getHdlInStDt() {
        return hdlInStDt;
    }
    /**
     * @param hdlInStDt The hdlInStDt to set.
     */
    public void setHdlInStDt(String hdlInStDt) {
        this.hdlInStDt = hdlInStDt;
    }
    /**
     * @return Returns the hdlOutDt.
     */
    public String getHdlOutDt() {
        return hdlOutDt;
    }
    /**
     * @param hdlOutDt The hdlOutDt to set.
     */
    public void setHdlOutDt(String hdlOutDt) {
        this.hdlOutDt = hdlOutDt;
    }
    /**
     * @return Returns the jobCoCd.
     */
    public String getJobCoCd() {
        return jobCoCd;
    }
    /**
     * @param jobCoCd The jobCoCd to set.
     */
    public void setJobCoCd(String jobCoCd) {
        this.jobCoCd = jobCoCd;
    }
    /**
     * @return Returns the m3.
     */
    public double getM3() {
        return m3;
    }
    /**
     * @param m3 The m3 to set.
     */
    public void setM3(double m3) {
        this.m3 = m3;
    }
    /**
     * @return Returns the mt.
     */
    public double getMt() {
        return mt;
    }
    /**
     * @param mt The mt to set.
     */
    public void setMt(double mt) {
        this.mt = mt;
    }
    /**
     * @return Returns the ovrM3.
     */
    public double getOvrM3() {
        return ovrM3;
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
     * @param ovrM3 The ovrM3 to set.
     */
    public void setOvrM3(double ovrM3) {
        this.ovrM3 = ovrM3;
    }
    /**
     * @return Returns the ovrQty.
     */
    public int getOvrQty() {
        return ovrQty;
    }
    /**
     * @param ovrQty The ovrQty to set.
     */
    public void setOvrQty(int ovrQty) {
        this.ovrQty = ovrQty;
    }
    /**
     * @return Returns the ovrShuM3.
     */
    public String getOvrShuM3() {
        return ovrShuM3;
    }
    /**
     * @param ovrShuM3 The ovrShuM3 to set.
     */
    public void setOvrShuM3(String ovrShuM3) {
        this.ovrShuM3 = ovrShuM3;
    }
    /**
     * @return Returns the ovrShuQty.
     */
    public String getOvrShuQty() {
        return ovrShuQty;
    }
    /**
     * @param ovrShuQty The ovrShuQty to set.
     */
    public void setOvrShuQty(String ovrShuQty) {
        this.ovrShuQty = ovrShuQty;
    }
    /**
     * @return Returns the ovrShuWgt.
     */
    public String getOvrShuWgt() {
        return ovrShuWgt;
    }
    /**
     * @param ovrShuWgt The ovrShuWgt to set.
     */
    public void setOvrShuWgt(String ovrShuWgt) {
        this.ovrShuWgt = ovrShuWgt;
    }
    /**
     * @return Returns the ovrWgt.
     */
    public double getOvrWgt() {
        return ovrWgt;
    }
    /**
     * @param ovrWgt The ovrWgt to set.
     */
    public void setOvrWgt(double ovrWgt) {
        this.ovrWgt = ovrWgt;
    }
    /**
     * @return Returns the qty.
     */
    public int getQty() {
        return qty;
    }
    /**
     * @param qty The qty to set.
     */
    public void setQty(int qty) {
        this.qty = qty;
    }
    /**
     * @return Returns the shpgAgent.
     */
    public String getShpgAgent() {
        return shpgAgent;
    }
    /**
     * @param shpgAgent The shpgAgent to set.
     */
    public void setShpgAgent(String shpgAgent) {
        this.shpgAgent = shpgAgent;
    }
    
    public String getShpgAgentNm() {
        return shpgAgentNm;
    }
    
    public void setShpgAgentNm(String shpgAgentNm) {
        this.shpgAgentNm = shpgAgentNm;
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
     * @return Returns the shuM3.
     */
    public double getShuM3() {
        return shuM3;
    }
    /**
     * @param shuM3 The shuM3 to set.
     */
    public void setShuM3(double shuM3) {
        this.shuM3 = shuM3;
    }
    /**
     * @return Returns the shuQty.
     */
    public int getShuQty() {
        return shuQty;
    }
    /**
     * @param shuQty The shuQty to set.
     */
    public void setShuQty(int shuQty) {
        this.shuQty = shuQty;
    }
    /**
     * @return Returns the shuWgt.
     */
    public double getShuWgt() {
        return shuWgt;
    }
    /**
     * @param shuWgt The shuWgt to set.
     */
    public void setShuWgt(double shuWgt) {
        this.shuWgt = shuWgt;
    }
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
     * @return Returns the tsptTpNo.
     */
    public String getTsptTpNo() {
        return tsptTpNo;
    }
    /**
     * @param tsptTpNo The tsptTpNo to set.
     */
    public void setTsptTpNo(String tsptTpNo) {
        this.tsptTpNo = tsptTpNo;
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
    
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }

    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }
    public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	 public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getShiftId() {
		return shiftId;
	}
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}
	public String getShiftNm() {
		return shiftNm;
	}
	public void setShiftNm(String shiftNm) {
		this.shiftNm = shiftNm;
	}
	public String getModeOperation() {
		return modeOperation;
	}
	public void setModeOperation(String modeOperation) {
		this.modeOperation = modeOperation;
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
	public String getYardTruckQty() {
		return yardTruckQty;
	}
	public void setYardTruckQty(String yardTruckQty) {
		this.yardTruckQty = yardTruckQty;
	}
	public String getYardTruckM3() {
		return yardTruckM3;
	}
	public void setYardTruckM3(String yardTruckM3) {
		this.yardTruckM3 = yardTruckM3;
	}
	public String getYardTruckMT() {
		return yardTruckMT;
	}
	public void setYardTruckMT(String yardTruckMT) {
		this.yardTruckMT = yardTruckMT;
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
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getCustMode() {
		return custMode;
	}
	public void setCustMode(String custMode) {
		this.custMode = custMode;
	}
	public String getMasterBL() {
		return masterBL;
	}
	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getMarksNo() {
		return marksNo;
	}
	public void setMarksNo(String marksNo) {
		this.marksNo = marksNo;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
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
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getRemainUnit() {
		return remainUnit;
	}
	public void setRemainUnit(String remainUnit) {
		this.remainUnit = remainUnit;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getSdoDelvTpCd() {
		return sdoDelvTpCd;
	}
	public void setSdoDelvTpCd(String sdoDelvTpCd) {
		this.sdoDelvTpCd = sdoDelvTpCd;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	
}
