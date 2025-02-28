package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoGeneralParm extends BaseBizParm {
    private String vslCallId;
    private String shipgNoteNo;
    private String blNo;
    private String gdsRecvNo;
    private String etd;
    private String eta;
    private String berthLoc;
    private String gatePassNo;
    private boolean isIndicator;
    private String searchType;
    private String arrvDtFm;
    private String arrvDtTo;
    private String scn;
    
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
     * @return Returns the gdsRecvNo.
     */
    public String getGdsRecvNo() {
        return gdsRecvNo;
    }
    /**
     * @param gdsRecvNo The gdsRecvNo to set.
     */
    public void setGdsRecvNo(String gdsRecvNo) {
        this.gdsRecvNo = gdsRecvNo;
    }
    /**
     * @return Returns the isIndicator.
     */
    public boolean getIsIndicator() {
        return isIndicator;
    }
    /**
     * @param isIndicator The isIndicator to set.
     */
    public void setIsIndicator(boolean isIndicator) {
        this.isIndicator = isIndicator;
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
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
