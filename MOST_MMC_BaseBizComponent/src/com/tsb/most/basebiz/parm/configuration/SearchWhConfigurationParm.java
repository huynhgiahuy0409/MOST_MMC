package com.tsb.most.basebiz.parm.configuration;

import java.util.List;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchWhConfigurationParm extends BaseBizParm {
    
    private String locRange;
    private String locId;
    private String whId;
    private String locNm;
    private String locDivCd;
    private String locTpCd;
    private String areaId;
    private String locUseYn;
    private String searchType;
    private String tyCd;
    private String unusedYn;
    private String stLocId;
    private String endLocId;

    //additional Data Items for Warehouse.
    private String conttNo;
    private String opeClassCd;		//CM.OPE_CLASS_CD
    private String vslCallId;		//GR.VSL_CALL_ID
    private String delvTpCd;		//CM.DELV_TP_CD
    private String blSn;			//DECODE(CM.OPE_CLASS_CD, 'I', CM.BL_NO, 'E', CM.SHIPG_NOTE_NO, NVL(CM.SHIPG_NOTE_NO,CM.BL_NO)) / MBL.BL_NO
    private String shipgAgnt;		//CM.SHIPG_AGNT
    private String fwrAgnt;			//CM.FWR_AGNT
    private String cngshp;			//DECODE(CM.OPE_CLASS_CD, 'I', CM.CNSNE_NM, 'E', CM.SHPR_NM, NVL(CM.SHPR_NM,CM.CNSNE_NM)) / CM.CNSNE_NM
    private String descr;			//TCM_CMDT.DESCR
    private String cgNo;			//CM.CG_NO
    private String currLocId;		//CM.CURR_LOC_ID
    private String nxLocId;			//CM.NX_LOC_ID
    private String pkgQty;			//GR.PKG_QTY
    private String wgt;				//GR.WGT
    private String msrmt;			//GR.MSRMT
    private String grNo;			//WH View enhancement 2009/03/18
    private String shipgNoteNo;
    //for Bay/Row Design
    private String bayQty;
    private String rowQty;

    //for check overlap
    private String leftWh ;
    private String topWh ;
    private String lenghtWh ;
    private String widthWh ;
    private String color;
    private String whTpCd;
    private String spCaCoCd;
    private String reqTpCd;
    
    private String hhtCgNo;
    private List cgNoList;
    private String rhdlMode;
    private String packingSeq;
    private String jobNoStr;
    private String cargoType;
    
    public String getPackingSeq() {
        return packingSeq;
    }
    public void setPackingSeq(String packingSeq) {
        this.packingSeq = packingSeq;
    }
    /**
     * @return Returns the chNoList.
     */
    public List getCgNoList() {
        return cgNoList;
    }
    /**
     * @param chNoList The chNoList to set.
     */
    public void setCgNoList(List chNoList) {
        this.cgNoList = chNoList;
    }
    /**
     * @return Returns the hhtCgNo.
     */
    public String getHhtCgNo() {
        return hhtCgNo;
    }
    /**
     * @param hhtCgNo The hhtCgNo to set.
     */
    public void setHhtCgNo(String hhtCgNo) {
        this.hhtCgNo = hhtCgNo;
    }
    /**
     * @return Returns the reqTpCd.
     */
    public String getReqTpCd() {
        return reqTpCd;
    }
    /**
     * @param reqTpCd The reqTpCd to set.
     */
    public void setReqTpCd(String reqTpCd) {
        this.reqTpCd = reqTpCd;
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
    * Function set a locId value
    * @param locId. 
    * @return void.
    */        
    public void setLocId(String locId)
    {
        this.locId       = locId;
    }

    /**
    * Return a locId Value
    * @param void. 
    * @return String.
    */  
    public String getLocId()
    {
        return locId;
    }

    /**
    * Function set a whId value
    * @param whId. 
    * @return void.
    */        
    public void setWhId(String whId)
    {
        this.whId       = whId;
    }

    /**
    * Return a whId Value
    * @param void. 
    * @return String.
    */  
    public String getWhId()
    {
        return whId;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getAreaId() {
        return areaId;
    }
    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }
    public String getLocDivCd() {
        return locDivCd;
    }
    public void setLocDivCd(String locDivCd) {
        this.locDivCd = locDivCd;
    }
    public String getLocNm() {
        return locNm;
    }
    public void setLocNm(String locNm) {
        this.locNm = locNm;
    }
    public String getLocUseYn() {
        return locUseYn;
    }
    public void setLocUseYn(String locUseYn) {
        this.locUseYn = locUseYn;
    }

    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    public String getUnusedYn() {
        return unusedYn;
    }
    public void setUnusedYn(String unusedYn) {
        this.unusedYn = unusedYn;
    }
    public String getLocRange() {
        return locRange;
    }
    public void setLocRange(String locRange) {
        this.locRange = locRange;
    }
    public String getBlSn() {
        return blSn;
    }
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    public String getCngshp() {
        return cngshp;
    }
    public void setCngshp(String cngshp) {
        this.cngshp = cngshp;
    }
    public String getConttNo() {
        return conttNo;
    }
    public void setConttNo(String conttNo) {
        this.conttNo = conttNo;
    }
    public String getCurrLocId() {
        return currLocId;
    }
    public void setCurrLocId(String currLocId) {
        this.currLocId = currLocId;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public String getMsrmt() {
        return msrmt;
    }
    public void setMsrmt(String msrmt) {
        this.msrmt = msrmt;
    }
    public String getNxLocId() {
        return nxLocId;
    }
    public void setNxLocId(String nxLocId) {
        this.nxLocId = nxLocId;
    }
    public String getOpeClassCd() {
        return opeClassCd;
    }
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    public String getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(String pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getWgt() {
        return wgt;
    }
    public void setWgt(String wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the bayQty.
     */
    public String getBayQty() {
        return bayQty;
    }
    /**
     * @param bayQty The bayQty to set.
     */
    public void setBayQty(String bayQty) {
        this.bayQty = bayQty;
    }
    /**
     * @return Returns the rowQty.
     */
    public String getRowQty() {
        return rowQty;
    }
    /**
     * @param rowQty The rowQty to set.
     */
    public void setRowQty(String rowQty) {
        this.rowQty = rowQty;
    }
    /**
     * @return Returns the locTpCd.
     */
    public String getLocTpCd() {
        return locTpCd;
    }
    /**
     * @param locTpCd The locTpCd to set.
     */
    public void setLocTpCd(String locTpCd) {
        this.locTpCd = locTpCd;
    }
    /**
     * @return Returns the endLocId.
     */
    public String getEndLocId() {
        return endLocId;
    }
    /**
     * @param endLocId The endLocId to set.
     */
    public void setEndLocId(String endLocId) {
        this.endLocId = endLocId;
    }
    /**
     * @return Returns the stLocId.
     */
    public String getStLocId() {
        return stLocId;
    }
    /**
     * @param stLocId The stLocId to set.
     */
    public void setStLocId(String stLocId) {
        this.stLocId = stLocId;
    }
    public String getLeftWh() {
        return leftWh;
    }
    public void setLeftWh(String leftWh) {
        this.leftWh = leftWh;
    }
    public String getLenghtWh() {
        return lenghtWh;
    }
    public void setLenghtWh(String lenghtWh) {
        this.lenghtWh = lenghtWh;
    }
    public String getTopWh() {
        return topWh;
    }
    public void setTopWh(String topWh) {
        this.topWh = topWh;
    }
    public String getWidthWh() {
        return widthWh;
    }
    public void setWidthWh(String widthWh) {
        this.widthWh = widthWh;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getJobNoStr() {
        return jobNoStr;
    }
    public void setJobNoStr(String jobNoStr) {
        this.jobNoStr = jobNoStr;
    }
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
}
