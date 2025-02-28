package com.tsb.most.biz.dataitem.operation;

import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoExportItem extends DataItem {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String cgNo;
    private String mfDocId;
    private String stat;//Reserved, Stored, Loaded, Gate-In
    private double msrmt;//tmt_cg_mst msrmt
    private double wgt;//tmt_cg_mst wgt
    private int pkgQty;//tmt_cg_mst pkgQty
    private String loadCnclMode;
    private String dmgYn;
    private String rcYn;
    private String isExistedCargo;
    private String shuYn;
    private String rhdlMode;
    private String prevPos;
    private String currPos;
    private String nxPos;
    private String cgOpeStat;
    private String shipgNoteNo;
    private String vslCallId;
    private String hdlInEndDt;
    private String sprYn;
    private String lorryId;   
    private String lorryNo;
    private String delvTpCd;//D Direct, I inDirect
    private String vslNm;
    private String grNo;
    private String hdlInStDt;
    private String hdlInDt;
    private String cgTpCd;
    private String cgTpCdNm;
    private String catgCd;//OpeClassCd
    private String catgNm;//OpeClassNM;
    private String delvTpNm;//Delvery Type Nm
    private String statCd;//Status Nm CGSTATUS
    private String statNm;//Status Nm CGSTATUS
    private double accLoadM3;//tmt_cg_mst msrmt
    private double accLoadMt;//tmt_cg_mst wgt
    private int accLoadQty;//tmt_cg_mst pkgQty
    private double docM3;//tmt_gr
    private double docMt;//tmt_gr wgt
    private int docQty;//tmt_gr pkgQty
    private String spYn;//special cargo condition exists?
    private String fnlOpeYn;//loading end EndTime is not null
    private String hiFnlYn;//Handling in end EndTime is not null
    private String whLocIds;
    private String pkgNo;
    private int dmgQty;
    private double dmgWgt;
    private double dmgM3;
    private String shpr; // Shipper Code
    private String shprNm; // Shipper Name
    private String loadEndDt;   
    private String hiddenStatus;
    private Date startDt;
    private Date endDt;
    private String modeOperation;
    private String custMode;    
    private String startDtStr;
    private String endDtStr;

    private List items;
    public int storedQty;
    public double storedMt;
    public double storedM3;

	public int loadedQty;
	public double loadedMt;
	public double loadedM3;

	public int gateInQty;
	public double gateInMt;
	public double gateInM3;
	
	//ADP: MT of YardTruck job
	public int yardTruckQty;
	public double yardTruckMt;
	public double yardTruckM3;
	
	private double eachWgt;
	private double eachMsrmt;
	
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String shpCnsCd;
    private String shpCnsNm;
    private String cmdtGrpCd;
    private String cmdtGrpNm;
    private String cmdtCd;
    private String cmdtNm;
    private String pkgTpCd;
    private String pkgTpNm;
    
    private String eachMt;
    private String eachM3;
    private String length;
    private String width;
    private String height;
    private String marksNo;
    private String goodsRmk;
    private String hatchNo;
    private String jobNo;
    private String opeClassCd;
    private String jobGroup;
    
    private String userRefNo;
    private String wbTransactionNo;
    private String secondWgt;
	private String remainUnit;
	private String brandNm;
	private String modelNm;
	private String tsptTpCd;
	private String grNoPlStr;
	
	private String driverId;

    private String atb; // check atb valid when loading
    
    private String projectCargo;
    
    private String scn;
    private String vslCd;
    private String callYear;
    private String callSeq;
    
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getHiddenStatus() {
        return hiddenStatus;
    }
    public void setHiddenStatus(String hiddenStatus) {
        this.hiddenStatus = hiddenStatus;
    }
    
  
	/**
     * @return Returns the loadEndDt.
     */
    public String getLoadEndDt() {
        return loadEndDt;
    }
    /**
     * @param loadEndDt The loadEndDt to set.
     */
    public void setLoadEndDt(String loadEndDt) {
        this.loadEndDt = loadEndDt;
    }
    //	QUANBTL 09-08-2012 fix G/R retrieve performance END

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
     * @return Returns the accLoadM3.
     */
    public double getAccLoadM3() {
        return accLoadM3;
    }

    /**
     * @param accLoadM3
     *            The accLoadM3 to set.
     */
    public void setAccLoadM3(double accLoadM3) {
        this.accLoadM3 = accLoadM3;
    }

    /**
     * @return Returns the accLoadMt.
     */
    public double getAccLoadMt() {
        return accLoadMt;
    }

    /**
     * @param accLoadMt
     *            The accLoadMt to set.
     */
    public void setAccLoadMt(double accLoadMt) {
        this.accLoadMt = accLoadMt;
    }

    /**
     * @return Returns the accLoadQty.
     */
    public int getAccLoadQty() {
        return accLoadQty;
    }

    /**
     * @param accLoadQty
     *            The accLoadQty to set.
     */
    public void setAccLoadQty(int accLoadQty) {
        this.accLoadQty = accLoadQty;
    }

    /**
     * @return Returns the catgCd.
     */
    public String getCatgCd() {
        return catgCd;
    }

    /**
     * @param catgCd
     *            The catgCd to set.
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
     * @param catgNm
     *            The catgNm to set.
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
     * @param cgNo
     *            The cgNo to set.
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
     * @param cgOpeStat
     *            The cgOpeStat to set.
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
     * @param cgTpCd
     *            The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }

    /**
     * @return Returns the cgTpCdNm.
     */
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }

    /**
     * @param cgTpCdNm
     *            The cgTpCdNm to set.
     */
    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }

    /**
     * @return Returns the currPos.
     */
    public String getCurrPos() {
        return currPos;
    }

    /**
     * @param currPos
     *            The currPos to set.
     */
    public void setCurrPos(String currPos) {
        this.currPos = currPos;
    }

    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }

    /**
     * @param delvTpCd
     *            The delvTpCd to set.
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
     * @param delvTpNm
     *            The delvTpNm to set.
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
     * @param dmgM3
     *            The dmgM3 to set.
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
     * @param dmgQty
     *            The dmgQty to set.
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
     * @param dmgWgt
     *            The dmgWgt to set.
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
     * @param dmgYn
     *            The dmgYn to set.
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
     * @param docM3
     *            The docM3 to set.
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
     * @param docMt
     *            The docMt to set.
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
     * @param docQty
     *            The docQty to set.
     */
    public void setDocQty(int docQty) {
        this.docQty = docQty;
    }

    /**
     * @return Returns the fnlOpeYn.
     */
    public String getFnlOpeYn() {
        return fnlOpeYn;
    }

    /**
     * @param fnlOpeYn
     *            The fnlOpeYn to set.
     */
    public void setFnlOpeYn(String fnlOpeYn) {
        this.fnlOpeYn = fnlOpeYn;
    }

    /**
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }

    /**
     * @param grNo
     *            The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }

    /**
     * @return Returns the hdlInDt.
     */
    public String getHdlInDt() {
        return hdlInDt;
    }

    /**
     * @param hdlInDt
     *            The hdlInDt to set.
     */
    public void setHdlInDt(String hdlInDt) {
        this.hdlInDt = hdlInDt;
    }

    /**
     * @return Returns the hdlInEndDt.
     */
    public String getHdlInEndDt() {
        return hdlInEndDt;
    }

    /**
     * @param hdlInEndDt
     *            The hdlInEndDt to set.
     */
    public void setHdlInEndDt(String hdlInEndDt) {
        this.hdlInEndDt = hdlInEndDt;
    }

    /**
     * @return Returns the hdlInStDt.
     */
    public String getHdlInStDt() {
        return hdlInStDt;
    }

    /**
     * @param hdlInStDt
     *            The hdlInStDt to set.
     */
    public void setHdlInStDt(String hdlInStDt) {
        this.hdlInStDt = hdlInStDt;
    }

    /**
     * @return Returns the hiFnlYn.
     */
    public String getHiFnlYn() {
        return hiFnlYn;
    }

    /**
     * @param hiFnlYn
     *            The hiFnlYn to set.
     */
    public void setHiFnlYn(String hiFnlYn) {
        this.hiFnlYn = hiFnlYn;
    }

    /**
     * @return Returns the loadCnclMode.
     */
    public String getLoadCnclMode() {
        return loadCnclMode;
    }

    /**
     * @param loadCnclMode
     *            The loadCnclMode to set.
     */
    public void setLoadCnclMode(String loadCnclMode) {
        this.loadCnclMode = loadCnclMode;
    }

    /**
     * @return Returns the lorryId.
     */
    public String getLorryId() {
        return lorryId;
    }

    /**
     * @param lorryId
     *            The lorryId to set.
     */
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
    }

    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }

    /**
     * @param msrmt
     *            The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
    }

    /**
     * @return Returns the nxPos.
     */
    public String getNxPos() {
        return nxPos;
    }

    /**
     * @param nxPos
     *            The nxPos to set.
     */
    public void setNxPos(String nxPos) {
        this.nxPos = nxPos;
    }

    /**
     * @return Returns the pkgNo.
     */
    public String getPkgNo() {
        return pkgNo;
    }

    /**
     * @param pkgNo
     *            The pkgNo to set.
     */
    public void setPkgNo(String pkgNo) {
        this.pkgNo = pkgNo;
    }

    /**
     * @return Returns the pkgQty.
     */
    public int getPkgQty() {
        return pkgQty;
    }

    /**
     * @param pkgQty
     *            The pkgQty to set.
     */
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }

    /**
     * @return Returns the prevPos.
     */
    public String getPrevPos() {
        return prevPos;
    }

    /**
     * @param prevPos
     *            The prevPos to set.
     */
    public void setPrevPos(String prevPos) {
        this.prevPos = prevPos;
    }

    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }

    /**
     * @param rhdlMode
     *            The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }

    /**
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }

    /**
     * @param shipgNoteNo
     *            The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }

    /**
     * @return Returns the shuYn.
     */
    public String getShuYn() {
        return shuYn;
    }

    /**
     * @param shuYn
     *            The shuYn to set.
     */
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }

    /**
     * @return Returns the sprYn.
     */
    public String getSprYn() {
        return sprYn;
    }

    /**
     * @param sprYn
     *            The sprYn to set.
     */
    public void setSprYn(String sprYn) {
        this.sprYn = sprYn;
    }

    /**
     * @return Returns the spYn.
     */
    public String getSpYn() {
        return spYn;
    }

    /**
     * @param spYn
     *            The spYn to set.
     */
    public void setSpYn(String spYn) {
        this.spYn = spYn;
    }

    /**
     * @return Returns the stat.
     */
    public String getStat() {
        return stat;
    }

    /**
     * @param stat
     *            The stat to set.
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
     * @param statCd
     *            The statCd to set.
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
     * @param statNm
     *            The statNm to set.
     */
    public void setStatNm(String statNm) {
        this.statNm = statNm;
    }

    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }

    /**
     * @param vslCallId
     *            The vslCallId to set.
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
     * @param vslNm
     *            The vslNm to set.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }

    /**
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }

    /**
     * @param wgt
     *            The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }

    /**
     * @return Returns the whLocIds.
     */
    public String getWhLocIds() {
        return whLocIds;
    }

    /**
     * @param whLocIds
     *            The whLocIds to set.
     */
    public void setWhLocIds(String whLocIds) {
        this.whLocIds = whLocIds;
    }
	public List getItems() {
		return items;
	}
	public void setItems(List items) {
		this.items = items;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public int getStoredQty() {
		return storedQty;
	}
	public void setStoredQty(int storedQty) {
		this.storedQty = storedQty;
	}
	public double getStoredMt() {
		return storedMt;
	}
	public void setStoredMt(double storedMt) {
		this.storedMt = storedMt;
	}
	public double getStoredM3() {
		return storedM3;
	}
	public void setStoredM3(double storedM3) {
		this.storedM3 = storedM3;
	}
	public int getLoadedQty() {
		return loadedQty;
	}
	public void setLoadedQty(int loadedQty) {
		this.loadedQty = loadedQty;
	}
	public double getLoadedMt() {
		return loadedMt;
	}
	public void setLoadedMt(double loadedMt) {
		this.loadedMt = loadedMt;
	}
	public double getLoadedM3() {
		return loadedM3;
	}
	public void setLoadedM3(double loadedM3) {
		this.loadedM3 = loadedM3;
	}
	public double getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(double eachWgt) {
		this.eachWgt = eachWgt;
	}
	public double getEachMsrmt() {
		return eachMsrmt;
	}
	public void setEachMsrmt(double eachMsrmt) {
		this.eachMsrmt = eachMsrmt;
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
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getShpCnsCd() {
		return shpCnsCd;
	}
	public void setShpCnsCd(String shpCnsCd) {
		this.shpCnsCd = shpCnsCd;
	}
	public String getShpCnsNm() {
		return shpCnsNm;
	}
	public void setShpCnsNm(String shpCnsNm) {
		this.shpCnsNm = shpCnsNm;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getEachMt() {
		return eachMt;
	}
	public void setEachMt(String eachMt) {
		this.eachMt = eachMt;
	}
	public String getEachM3() {
		return eachM3;
	}
	public void setEachM3(String eachM3) {
		this.eachM3 = eachM3;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getMarksNo() {
		return marksNo;
	}
	public void setMarksNo(String marksNo) {
		this.marksNo = marksNo;
	}
	public String getGoodsRmk() {
		return goodsRmk;
	}
	public void setGoodsRmk(String goodsRmk) {
		this.goodsRmk = goodsRmk;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public Date getStartDt() {
		return startDt;
	}
	public void setStartDt(Date startDt) {
		this.startDt = startDt;
	}
	public Date getEndDt() {
		return endDt;
	}
	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}
	public String getModeOperation() {
		return modeOperation;
	}
	public void setModeOperation(String modeOperation) {
		this.modeOperation = modeOperation;
	}
	public String getCustMode() {
		return custMode;
	}
	public void setCustMode(String custMode) {
		this.custMode = custMode;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
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
	public int getGateInQty() {
		return gateInQty;
	}
	public void setGateInQty(int gateInQty) {
		this.gateInQty = gateInQty;
	}
	public double getGateInMt() {
		return gateInMt;
	}
	public void setGateInMt(double gateInMt) {
		this.gateInMt = gateInMt;
	}
	public double getGateInM3() {
		return gateInM3;
	}
	public void setGateInM3(double gateInM3) {
		this.gateInM3 = gateInM3;
	}
	public int getYardTruckQty() {
		return yardTruckQty;
	}
	public void setYardTruckQty(int yardTruckQty) {
		this.yardTruckQty = yardTruckQty;
	}
	public double getYardTruckMt() {
		return yardTruckMt;
	}
	public void setYardTruckMt(double yardTruckMt) {
		this.yardTruckMt = yardTruckMt;
	}
	public double getYardTruckM3() {
		return yardTruckM3;
	}
	public void setYardTruckM3(double yardTruckM3) {
		this.yardTruckM3 = yardTruckM3;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
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
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
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
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	
	
	
}
