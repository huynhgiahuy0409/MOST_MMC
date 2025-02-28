package com.tsb.most.basebiz.dataitem.configuration;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class WhConfigurationItem extends DataItem {

	private String workingStatus;
    private String no;
    private String chk;
   
    private String locNm;
    private String locDivCd;
    private String locDivNm;
    private String leftX;
    private String topY;
    private String len;
    private String wth;
    private String tier;
    private String totDims;
    private String bayQty;
    private String rowwQty;
    private String bayLen;
    private String rowwLen;
    private String areaPBlk;
    private String fbCapa;
    private String locTpCd;
    private String toLocTpCd;
    private String rcntRentNo;
    private String lckYn;
    private String rentYn;
    private String locUseYn;
    private String vldYn;
    private String useCd;
    private String edYn;
    private String nonEdYn;
    private String dgYn;
    private String foreColr;
    private String bkColr;
    private String areaId;
    private String whId;
    private String bayId;
    private String rowwId;
    private String tierId;
    private String tierIdx;
    private String rowwIdx;
    private String bayIdx;
    private String rmk;
    private String cnt;
    private String insertType;
    private String rentTpCd;		//Term, TMT_RENT.RENT_TP_CD
    private String tnnt;			//Tenant, TMT_RENT.TNNT
    private String isExistedCargo;
    
    private String locRange;
    //additional Data Items for Warehouse.
    private String conttNo;
    private String opeClassCd;		//CM.OPE_CLASS_CD
    private String opeClassNm;		//CM.OPE_CLASS_CD
    private String vslCallId;		//GR.VSL_CALL_ID
    private String delvTpCd;		//CM.DELV_TP_CD
    private String cgTpCd;			//CM.CG_TP_CD
    private String blSn;			//DECODE(CM.OPE_CLASS_CD, 'I', CM.BL_NO, 'E', CM.SHIPG_NOTE_NO, NVL(CM.SHIPG_NOTE_NO,CM.BL_NO)) / MBL.BL_NO
    private String shipgAgnt;		//CM.SHIPG_AGNT
    private String fwrAgnt;			//CM.FWR_AGNT
    private String cngshp;			//DECODE(CM.OPE_CLASS_CD, 'I', CM.CNSNE_NM, 'E', CM.SHPR_NM, NVL(CM.SHPR_NM,CM.CNSNE_NM)) / CM.CNSNE_NM
    private String descr;			//TCM_CMDT.DESCR
    private String cgNo;			//CM.CG_NO
    private String currLocId;		//CM.CURR_LOC_ID
    private String nxLocId;			//CM.NX_LOC_ID
    private String pkgQty;			//GR.PKG_QTY
    private double wgt;				//GR.WGT
    private double msrmt;			//GR.MSRMT
    private String blNo;
    
    private String reqNo;
    private String reqSeq;

    
    //Warehouse report : Daily WH Occupanccy report
    private String customer ; //(Shipper or Consignee)
    private String occupiedBays; 
    private String availableSpace ; //available
    private String usage ;
    private String availableBays ;
    private String groupCustomer ; // Break page if the customers are over 7 
    private String customerIndex ; //Indicate from 1-7
    private String totOccupiedBays;		//20101104 : total occupied bays in one loc_id (not concerned about customer)
    
    private String vslName;
    
    //sunny
    private String whTpCd;
    private String rhdlMode;//R:Return to Shipper C: Change to Vessel
    private String fmLocId;// from location id  cf) to location = locId
    private String locId;// to location 
    private String toLocId;
    private String dumpPkgQty;			//Loading Auto PKG_QTY
    private double dumpWgt;				//Loading Auto WGT
    private double dumpMsrmt;			//Loading Auto MSRMT
    
    //PMTuan 03/03/2009 - Request date and Requestor for WH View
    private String reqR ;
    private String reqDt ;
    private String storedDt;
    
    private String spCaCoCd;
    private String spCaCoCdNm;
    private String whTpCdNm;
    
    private String vslTp;
    
    private int fmPkgQty;
    private double fmMsrmt;
    private double fmWgt;
    private String whLocId;
    private String whLocId2;
    
    private String shipgNoteNo;
    private String rhdlNo;
    private String commodity;
    
    private String occPercentage;
    private String planPercentage;
    
    private List cell;
    private List bay;
    private List row;
    private List unused;
    private List cargo;
    private List rental;
    private List spacemovement;    
    
    private String pkgTpCd;
    private String pkgTpNm;
    private String lotNo;
    private String refNo;
    
    public String getWhLocId2() {
        return whLocId2;
    }
    public void setWhLocId2(String whLocId2) {
        this.whLocId2 = whLocId2;
    }
    public String getIsExistedCargo() {
        return isExistedCargo;
    }
    public void setIsExistedCargo(String isExistedCargo) {
        this.isExistedCargo = isExistedCargo;
    }
    /**
     * @return Returns the opeClassNm.
     */
    public String getOpeClassNm() {
        return opeClassNm;
    }
    /**
     * @param opeClassNm The opeClassNm to set.
     */
    public void setOpeClassNm(String opeClassNm) {
        this.opeClassNm = opeClassNm;
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
     * @return Returns the whLocId.
     */
    public String getWhLocId() {
        return whLocId;
    }
    /**
     * @param whLocId The whLocId to set.
     */
    public void setWhLocId(String whLocId) {
        this.whLocId = whLocId;
    }
    /**
     * @return Returns the vslTp.
     */
    public String getVslTp() {
        return vslTp;
    }
    /**
     * @param vslTp The vslTp to set.
     */
    public void setVslTp(String vslTp) {
        this.vslTp = vslTp;
    }
    /**
     * @return Returns the spCaCoCdNm.
     */
    public String getSpCaCoCdNm() {
        return spCaCoCdNm;
    }
    /**
     * @param spCaCoCdNm The spCaCoCdNm to set.
     */
    public void setSpCaCoCdNm(String spCaCoCdNm) {
        this.spCaCoCdNm = spCaCoCdNm;
    }
    /**
     * @return Returns the whTpCdNm.
     */
    public String getWhTpCdNm() {
        return whTpCdNm;
    }
    /**
     * @param whTpCdNm The whTpCdNm to set.
     */
    public void setWhTpCdNm(String whTpCdNm) {
        this.whTpCdNm = whTpCdNm;
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
     * @return Returns the areaId.
     */
    public String getAreaId() {
        return areaId;
    }
    /**
     * @param areaId The areaId to set.
     */
    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }
    /**
     * @return Returns the areaPBlk.
     */
    public String getAreaPBlk() {
        return areaPBlk;
    }
    /**
     * @param areaPBlk The areaPBlk to set.
     */
    public void setAreaPBlk(String areaPBlk) {
        this.areaPBlk = areaPBlk;
    }
    /**
     * @return Returns the bayId.
     */
    public String getBayId() {
        return bayId;
    }
    /**
     * @param bayId The bayId to set.
     */
    public void setBayId(String bayId) {
        this.bayId = bayId;
    }
    /**
     * @return Returns the bayIdx.
     */
    public String getBayIdx() {
        return bayIdx;
    }
    /**
     * @param bayIdx The bayIdx to set.
     */
    public void setBayIdx(String bayIdx) {
        this.bayIdx = bayIdx;
    }
    /**
     * @return Returns the bayLen.
     */
    public String getBayLen() {
        return bayLen;
    }
    /**
     * @param bayLen The bayLen to set.
     */
    public void setBayLen(String bayLen) {
        this.bayLen = bayLen;
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
     * @return Returns the bkColr.
     */
    public String getBkColr() {
        return bkColr;
    }
    /**
     * @param bkColr The bkColr to set.
     */
    public void setBkColr(String bkColr) {
        this.bkColr = bkColr;
    }
    /**
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
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
     * @return Returns the chk.
     */
    public String getChk() {
        return chk;
    }
    /**
     * @param chk The chk to set.
     */
    public void setChk(String chk) {
        this.chk = chk;
    }
    /**
     * @return Returns the cngshp.
     */
    public String getCngshp() {
        return cngshp;
    }
    /**
     * @param cngshp The cngshp to set.
     */
    public void setCngshp(String cngshp) {
        this.cngshp = cngshp;
    }
    /**
     * @return Returns the cnt.
     */
    public String getCnt() {
        return cnt;
    }
    /**
     * @param cnt The cnt to set.
     */
    public void setCnt(String cnt) {
        this.cnt = cnt;
    }
    /**
     * @return Returns the conttNo.
     */
    public String getConttNo() {
        return conttNo;
    }
    /**
     * @param conttNo The conttNo to set.
     */
    public void setConttNo(String conttNo) {
        this.conttNo = conttNo;
    }
    /**
     * @return Returns the currLocId.
     */
    public String getCurrLocId() {
        return currLocId;
    }
    /**
     * @param currLocId The currLocId to set.
     */
    public void setCurrLocId(String currLocId) {
        this.currLocId = currLocId;
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
     * @return Returns the descr.
     */
    public String getDescr() {
        return descr;
    }
    /**
     * @param descr The descr to set.
     */
    public void setDescr(String descr) {
        this.descr = descr;
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
     * @return Returns the edYn.
     */
    public String getEdYn() {
        return edYn;
    }
    /**
     * @param edYn The edYn to set.
     */
    public void setEdYn(String edYn) {
        this.edYn = edYn;
    }
    /**
     * @return Returns the fbCapa.
     */
    public String getFbCapa() {
        return fbCapa;
    }
    /**
     * @param fbCapa The fbCapa to set.
     */
    public void setFbCapa(String fbCapa) {
        this.fbCapa = fbCapa;
    }
    /**
     * @return Returns the foreColr.
     */
    public String getForeColr() {
        return foreColr;
    }
    /**
     * @param foreColr The foreColr to set.
     */
    public void setForeColr(String foreColr) {
        this.foreColr = foreColr;
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
     * @return Returns the lckYn.
     */
    public String getLckYn() {
        return lckYn;
    }
    /**
     * @param lckYn The lckYn to set.
     */
    public void setLckYn(String lckYn) {
        this.lckYn = lckYn;
    }
    /**
     * @return Returns the leftX.
     */
    public String getLeftX() {
        return leftX;
    }
    /**
     * @param leftX The leftX to set.
     */
    public void setLeftX(String leftX) {
        this.leftX = leftX;
    }
    /**
     * @return Returns the len.
     */
    public String getLen() {
        return len;
    }
    /**
     * @param len The len to set.
     */
    public void setLen(String len) {
        this.len = len;
    }
    /**
     * @return Returns the locDivCd.
     */
    public String getLocDivCd() {
        return locDivCd;
    }
    /**
     * @param locDivCd The locDivCd to set.
     */
    public void setLocDivCd(String locDivCd) {
        this.locDivCd = locDivCd;
    }
    /**
     * @return Returns the locDivNm.
     */
    public String getLocDivNm() {
        return locDivNm;
    }
    /**
     * @param locDivNm The locDivNm to set.
     */
    public void setLocDivNm(String locDivNm) {
        this.locDivNm = locDivNm;
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
     * @return Returns the locRange.
     */
    public String getLocRange() {
        return locRange;
    }
    /**
     * @param locRange The locRange to set.
     */
    public void setLocRange(String locRange) {
        this.locRange = locRange;
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
     * @return Returns the locUseYn.
     */
    public String getLocUseYn() {
        return locUseYn;
    }
    /**
     * @param locUseYn The locUseYn to set.
     */
    public void setLocUseYn(String locUseYn) {
        this.locUseYn = locUseYn;
    }
    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }
    /**
     * @param msrmt The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
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
     * @return Returns the nonEdYn.
     */
    public String getNonEdYn() {
        return nonEdYn;
    }
    /**
     * @param nonEdYn The nonEdYn to set.
     */
    public void setNonEdYn(String nonEdYn) {
        this.nonEdYn = nonEdYn;
    }
    /**
     * @return Returns the nxLocId.
     */
    public String getNxLocId() {
        return nxLocId;
    }
    /**
     * @param nxLocId The nxLocId to set.
     */
    public void setNxLocId(String nxLocId) {
        this.nxLocId = nxLocId;
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
     * @return Returns the pkgQty.
     */
    public String getPkgQty() {
        return pkgQty;
    }
    /**
     * @param pkgQty The pkgQty to set.
     */
    public void setPkgQty(String pkgQty) {
        this.pkgQty = pkgQty;
    }
    /**
     * @return Returns the rcntRentNo.
     */
    public String getRcntRentNo() {
        return rcntRentNo;
    }
    /**
     * @param rcntRentNo The rcntRentNo to set.
     */
    public void setRcntRentNo(String rcntRentNo) {
        this.rcntRentNo = rcntRentNo;
    }
    /**
     * @return Returns the rentYn.
     */
    public String getRentYn() {
        return rentYn;
    }
    /**
     * @param rentYn The rentYn to set.
     */
    public void setRentYn(String rentYn) {
        this.rentYn = rentYn;
    }
    /**
     * @return Returns the rowwId.
     */
    public String getRowwId() {
        return rowwId;
    }
    /**
     * @param rowwId The rowwId to set.
     */
    public void setRowwId(String rowwId) {
        this.rowwId = rowwId;
    }
    /**
     * @return Returns the rowwIdx.
     */
    public String getRowwIdx() {
        return rowwIdx;
    }
    /**
     * @param rowwIdx The rowwIdx to set.
     */
    public void setRowwIdx(String rowwIdx) {
        this.rowwIdx = rowwIdx;
    }
    /**
     * @return Returns the rowwLen.
     */
    public String getRowwLen() {
        return rowwLen;
    }
    /**
     * @param rowwLen The rowwLen to set.
     */
    public void setRowwLen(String rowwLen) {
        this.rowwLen = rowwLen;
    }
    /**
     * @return Returns the rowwQty.
     */
    public String getRowwQty() {
        return rowwQty;
    }
    /**
     * @param rowwQty The rowwQty to set.
     */
    public void setRowwQty(String rowwQty) {
        this.rowwQty = rowwQty;
    }
    /**
     * @return Returns the shipgAgnt.
     */
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    /**
     * @param shipgAgnt The shipgAgnt to set.
     */
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    /**
     * @return Returns the tierId.
     */
    public String getTierId() {
        return tierId;
    }
    /**
     * @param tierId The tierId to set.
     */
    public void setTierId(String tierId) {
        this.tierId = tierId;
    }
    /**
     * @return Returns the tierIdx.
     */
    public String getTierIdx() {
        return tierIdx;
    }
    /**
     * @param tierIdx The tierIdx to set.
     */
    public void setTierIdx(String tierIdx) {
        this.tierIdx = tierIdx;
    }
    /**
     * @return Returns the topY.
     */
    public String getTopY() {
        return topY;
    }
    /**
     * @param topY The topY to set.
     */
    public void setTopY(String topY) {
        this.topY = topY;
    }
    /**
     * @return Returns the totDims.
     */
    public String getTotDims() {
        return totDims;
    }
    /**
     * @param totDims The totDims to set.
     */
    public void setTotDims(String totDims) {
        this.totDims = totDims;
    }
    /**
     * @return Returns the useCd.
     */
    public String getUseCd() {
        return useCd;
    }
    /**
     * @param useCd The useCd to set.
     */
    public void setUseCd(String useCd) {
        this.useCd = useCd;
    }
    /**
     * @return Returns the vldYn.
     */
    public String getVldYn() {
        return vldYn;
    }
    /**
     * @param vldYn The vldYn to set.
     */
    public void setVldYn(String vldYn) {
        this.vldYn = vldYn;
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
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the whId.
     */
    public String getWhId() {
        return whId;
    }
    /**
     * @param whId The whId to set.
     */
    public void setWhId(String whId) {
        this.whId = whId;
    }
    /**
     * @return Returns the wth.
     */
    public String getWth() {
        return wth;
    }
    /**
     * @param wth The wth to set.
     */
    public void setWth(String wth) {
        this.wth = wth;
    }
    /**
     * @return Returns the rentTpCd.
     */
    public String getRentTpCd() {
        return rentTpCd;
    }
    /**
     * @param rentTpCd The rentTpCd to set.
     */
    public void setRentTpCd(String rentTpCd) {
        this.rentTpCd = rentTpCd;
    }
    /**
     * @return Returns the tnnt.
     */
    public String getTnnt() {
        return tnnt;
    }
    /**
     * @param tnnt The tnnt to set.
     */
    public void setTnnt(String tnnt) {
        this.tnnt = tnnt;
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
     * @return Returns the tier.
     */
    public String getTier() {
        return tier;
    }
    /**
     * @param tier The tier to set.
     */
    public void setTier(String tier) {
        this.tier = tier;
    }
    /**
     * @return Returns the reqNo.
     */
    public String getReqNo() {
        return reqNo;
    }
    /**
     * @param reqNo The reqNo to set.
     */
    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }
    /**
     * @return Returns the reqSeq.
     */
    public String getReqSeq() {
        return reqSeq;
    }
    /**
     * @param reqSeq The reqSeq to set.
     */
    public void setReqSeq(String reqSeq) {
        this.reqSeq = reqSeq;
    }
    public String getCustomer() {
        return customer;
    }
    public void setCustomer(String customer) {
        this.customer = customer;
    }
    public String getOccupiedBays() {
        return occupiedBays;
    }
    public void setOccupiedBays(String occupiedBays) {
        this.occupiedBays = occupiedBays;
    }

    public String getAvailableBays() {
        return availableBays;
    }
    public void setAvailableBays(String availableBays) {
        this.availableBays = availableBays;
    }
    public String getAvailableSpace() {
        return availableSpace;
    }
    public void setAvailableSpace(String availableSpace) {
        this.availableSpace = availableSpace;
    }
    public String getUsage() {
        return usage;
    }
    public void setUsage(String usage) {
        this.usage = usage;
    }
    public String getGroupCustomer() {
        return groupCustomer;
    }
    public void setGroupCustomer(String groupCustomer) {
        this.groupCustomer = groupCustomer;
    }
    public String getCustomerIndex() {
        return customerIndex;
    }
    public void setCustomerIndex(String customerIndex) {
        this.customerIndex = customerIndex;
    }
    public String getWhTpCd() {
        return whTpCd;
    }
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    public String getVslName() {
        return vslName;
    }
    public void setVslName(String vslName) {
        this.vslName = vslName;
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
    /**
     * @return Returns the fmLocId.
     */
    public String getFmLocId() {
        return fmLocId;
    }
    /**
     * @param fmLocId The fmLocId to set.
     */
    public void setFmLocId(String fmLocId) {
        this.fmLocId = fmLocId;
    }
    /**
     * @return Returns the dumpMsrmt.
     */
    public double getDumpMsrmt() {
        return dumpMsrmt;
    }
    /**
     * @param dumpMsrmt The dumpMsrmt to set.
     */
    public void setDumpMsrmt(double dumpMsrmt) {
        this.dumpMsrmt = dumpMsrmt;
    }
    /**
     * @return Returns the dumpPkgQty.
     */
    public String getDumpPkgQty() {
        return dumpPkgQty;
    }
    /**
     * @param dumpPkgQty The dumpPkgQty to set.
     */
    public void setDumpPkgQty(String dumpPkgQty) {
        this.dumpPkgQty = dumpPkgQty;
    }
    /**
     * @return Returns the dumpWgt.
     */
    public double getDumpWgt() {
        return dumpWgt;
    }
    /**
     * @param dumpWgt The dumpWgt to set.
     */
    public void setDumpWgt(double dumpWgt) {
        this.dumpWgt = dumpWgt;
    }
    /**
     * @return Returns the toLocId.
     */
    public String getToLocId() {
        return toLocId;
    }
    /**
     * @param toLocId The toLocId to set.
     */
    public void setToLocId(String toLocId) {
        this.toLocId = toLocId;
    }
    public String getReqDt() {
        return reqDt;
    }
    public void setReqDt(String reqDt) {
        this.reqDt = reqDt;
    }
    public String getReqR() {
        return reqR;
    }
    public void setReqR(String reqR) {
        this.reqR = reqR;
    }
    public String getStoredDt() {
        return storedDt;
    }
    public void setStoredDt(String storedDt) {
        this.storedDt = storedDt;
    }
    /**
     * @return Returns the fmMsrmt.
     */
    public double getFmMsrmt() {
        return fmMsrmt;
    }
    /**
     * @param fmMsrmt The fmMsrmt to set.
     */
    public void setFmMsrmt(double fmMsrmt) {
        this.fmMsrmt = fmMsrmt;
    }
    /**
     * @return Returns the fmPkgQty.
     */
    public int getFmPkgQty() {
        return fmPkgQty;
    }
    /**
     * @param fmPkgQty The fmPkgQty to set.
     */
    public void setFmPkgQty(int fmPkgQty) {
        this.fmPkgQty = fmPkgQty;
    }
    /**
     * @return Returns the fmWgt.
     */
    public double getFmWgt() {
        return fmWgt;
    }
    /**
     * @param fmWgt The fmWgt to set.
     */
    public void setFmWgt(double fmWgt) {
        this.fmWgt = fmWgt;
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
     * @return Returns the commodity.
     */
    public String getCommodity() {
        return commodity;
    }
    /**
     * @param commodity The commodity to set.
     */
    public void setCommodity(String commodity) {
        this.commodity = commodity;
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
     * @return Returns the totalOccupiedBays.
     */
    public String getTotOccupiedBays() {
        return totOccupiedBays;
    }
    /**
     * @param totalOccupiedBays The totalOccupiedBays to set.
     */
    public void setTotOccupiedBays(String totalOccupiedBays) {
        this.totOccupiedBays = totalOccupiedBays;
    }
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public List getCell() {
		return cell;
	}
	public void setCell(List cell) {
		this.cell = cell;
	}
	public List getBay() {
		return bay;
	}
	public void setBay(List bay) {
		this.bay = bay;
	}
	public List getRow() {
		return row;
	}
	public void setRow(List row) {
		this.row = row;
	}
	public List getUnused() {
		return unused;
	}
	public void setUnused(List unused) {
		this.unused = unused;
	}
	public List getCargo() {
		return cargo;
	}
	public void setCargo(List cargo) {
		this.cargo = cargo;
	}
	public List getRental() {
		return rental;
	}
	public void setRental(List rental) {
		this.rental = rental;
	}
	public List getSpacemovement() {
		return spacemovement;
	}
	public void setSpacemovement(List spacemovement) {
		this.spacemovement = spacemovement;
	}
	public String getOccPercentage() {
		return occPercentage;
	}
	public void setOccPercentage(String occPercentage) {
		this.occPercentage = occPercentage;
	}
	public String getPlanPercentage() {
		return planPercentage;
	}
	public void setPlanPercentage(String planPercentage) {
		this.planPercentage = planPercentage;
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
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getToLocTpCd() {
		return toLocTpCd;
	}
	public void setToLocTpCd(String toLocTpCd) {
		this.toLocTpCd = toLocTpCd;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	
}
