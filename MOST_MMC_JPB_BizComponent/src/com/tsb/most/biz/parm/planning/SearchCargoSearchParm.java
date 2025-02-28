/**
* CargoMasterParm.java
*
* Created on   : 2007-09-07
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-07     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoSearchParm extends BaseBizParm {
    
    private String vslCallId;
    private String cgNo;
    private String opeClassCd;
    private String tsptTpCd;
    private String markNo;
    private String statCd;
    private String dmgYn;
    private String delvTpCd;
    private String tmnlInDt;
    private String tmnlOutDt;
    private String blNo;
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String shipgNoteNo;
    
    //add Mov and subItems checkbox for Cargo searching
    private String cgBookReq;	//CBR
    private String delvOrder;	//DO
    private String grNo;		//GR
    private String gatePassNo;		//GP : GatePassNo
    private String isMov;		//Loc /LocMov
    private String currLocId;	//WH: Warehouse
    private String isSubItems;	//SN/BN or GR/items

    //add WH info
    private String locDivCd;

    //add Arrv_delv
    private String cgInOutCd;
    private String lorryNo;
    
    //add search jpvc
    private String eta; 
    private String etd;
    private String berthLoc;
    
    //for nonJPVC
    private String arrvDtFm;
    private String arrvDtTo;

    private String searchType;
    
    private String opType;
    
    private String blSn;
    private String authority;
    private String ptnrCode;
    private String userType;
    private String locId;
    private String fromDate;
    private String toDate;
    
    //MOLF
    private String packingSeq;
    
    private String catgCd;
    private String fwrAgnt;
    
    private String shftId;
    private String mfDocId;
    
    private String scn;
   
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
    public String getUserType() {
        return userType;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }
    /**
     * @return Returns the authority.
     */
    public String getAuthority() {
        return authority;
    }
    /**
     * @param authority The authority to set.
     */
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    /**
     * @return Returns the ptnrCode.
     */
    public String getPtnrCode() {
        return ptnrCode;
    }
    /**
     * @param ptnrCode The ptnrCode to set.
     */
    public void setPtnrCode(String ptnrCode) {
        this.ptnrCode = ptnrCode;
    }
    /**
     * @return Returns the arrvDtFm.
     */
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    /**
     * @param arrvDtFm The arrvDtFm to set.
     */
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    /**
     * @return Returns the arrvDtTo.
     */
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    /**
     * @param arrvDtTo The arrvDtTo to set.
     */
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
    }
    /**
     * @return Returns the berthLoc.
     */
    public String getBerthLoc() {
        return berthLoc;
    }
    /**
     * @param berthLoc The berthLoc to set.
     */
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
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
     * @return Returns the cgBookReq.
     */
    public String getCgBookReq() {
        return cgBookReq;
    }
    /**
     * @param cgBookReq The cgBookReq to set.
     */
    public void setCgBookReq(String cgBookReq) {
        this.cgBookReq = cgBookReq;
    }
    /**
     * @return Returns the cgInOutCd.
     */
    public String getCgInOutCd() {
        return cgInOutCd;
    }
    /**
     * @param cgInOutCd The cgInOutCd to set.
     */
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
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
     * @return Returns the delvOrder.
     */
    public String getDelvOrder() {
        return delvOrder;
    }
    /**
     * @param delvOrder The delvOrder to set.
     */
    public void setDelvOrder(String delvOrder) {
        this.delvOrder = delvOrder;
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
     * @return Returns the etd.
     */
    public String getEtd() {
        return etd;
    }
    /**
     * @param etd The etd to set.
     */
    public void setEtd(String etd) {
        this.etd = etd;
    }
    /**
     * @return Returns the fdest.
     */
    public String getFdest() {
        return fdest;
    }
    /**
     * @param fdest The fdest to set.
     */
    public void setFdest(String fdest) {
        this.fdest = fdest;
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
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }
    /**
     * @param grNo The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    /**
     * @return Returns the isMov.
     */
    public String getIsMov() {
        return isMov;
    }
    /**
     * @param isMov The isMov to set.
     */
    public void setIsMov(String isMov) {
        this.isMov = isMov;
    }
    /**
     * @return Returns the isSubItems.
     */
    public String getIsSubItems() {
        return isSubItems;
    }
    /**
     * @param isSubItems The isSubItems to set.
     */
    public void setIsSubItems(String isSubItems) {
        this.isSubItems = isSubItems;
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
     * @return Returns the lorryNo.
     */
    public String getLorryNo() {
        return lorryNo;
    }
    /**
     * @param lorryNo The lorryNo to set.
     */
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    /**
     * @return Returns the markNo.
     */
    public String getMarkNo() {
        return markNo;
    }
    /**
     * @param markNo The markNo to set.
     */
    public void setMarkNo(String markNo) {
        this.markNo = markNo;
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
     * @return Returns the portOfDis.
     */
    public String getPortOfDis() {
        return portOfDis;
    }
    /**
     * @param portOfDis The portOfDis to set.
     */
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    /**
     * @return Returns the portOfLoad.
     */
    public String getPortOfLoad() {
        return portOfLoad;
    }
    /**
     * @param portOfLoad The portOfLoad to set.
     */
    public void setPortOfLoad(String portOfLoad) {
        this.portOfLoad = portOfLoad;
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
     * @return Returns the tmnlInDt.
     */
    public String getTmnlInDt() {
        return tmnlInDt;
    }
    /**
     * @param tmnlInDt The tmnlInDt to set.
     */
    public void setTmnlInDt(String tmnlInDt) {
        this.tmnlInDt = tmnlInDt;
    }
    /**
     * @return Returns the tmnlOutDt.
     */
    public String getTmnlOutDt() {
        return tmnlOutDt;
    }
    /**
     * @param tmnlOutDt The tmnlOutDt to set.
     */
    public void setTmnlOutDt(String tmnlOutDt) {
        this.tmnlOutDt = tmnlOutDt;
    }
    /**
     * @return Returns the tsptTpCd.
     */
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    /**
     * @param tsptTpCd The tsptTpCd to set.
     */
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
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
     * @return Returns the opType.
     */
    public String getOpType() {
        return opType;
    }
    /**
     * @param opType The opType to set.
     */
    public void setOpType(String opType) {
        this.opType = opType;
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
    
    public String getFromDate() {
        return fromDate;
    }
    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }
    public String getToDate() {
        return toDate;
    }
    public void setToDate(String toDate) {
        this.toDate = toDate;
    }
    public String getPackingSeq() {
        return packingSeq;
    }
    public void setPackingSeq(String packingSeq) {
        this.packingSeq = packingSeq;
    }
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getFwrAgnt() {
		return fwrAgnt;
	}
	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
