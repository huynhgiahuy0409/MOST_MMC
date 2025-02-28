package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author jackey
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class GatePassImportParm extends BaseBizParm {
    private String jpvcNo;
	private String blNo;		//B/L No
	private String doNo;
	private String inbVoy;		//Voyage
	private String outbVoy;		//Voyage
	private String scn;
	private String berthLoc;
	private String eta;
	private String flag;
	private String storageLoc;
	private String shipgAgnt;
	private String shipgAgntNm;
	private String lastPortCall;
    private String searchType;
    private String gatePassNo; //for report
    private String cgNo;
    private String cgInOutCd;
    private String seq;
    private String userId;
    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getShipgAgntNm() {
        return shipgAgntNm;
    }
    public void setShipgAgntNm(String shipgAgntNm) {
        this.shipgAgntNm = shipgAgntNm;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getFlag() {
        return flag;
    }
    public void setFlag(String flag) {
        this.flag = flag;
    }
    public String getInbVoy() {
        return inbVoy;
    }
    public void setInbVoy(String inbVoy) {
        this.inbVoy = inbVoy;
    }
    public String getJpvcNo() {
        return jpvcNo;
    }
    public void setJpvcNo(String jpvcNo) {
        this.jpvcNo = jpvcNo;
    }
    public String getLastPortCall() {
        return lastPortCall;
    }
    public void setLastPortCall(String lastPortCall) {
        this.lastPortCall = lastPortCall;
    }
    public String getOutbVoy() {
        return outbVoy;
    }
    public void setOutbVoy(String outbVoy) {
        this.outbVoy = outbVoy;
    }
    public String getScn() {
        return scn;
    }
    public void setScn(String scn) {
        this.scn = scn;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    public String getStorageLoc() {
        return storageLoc;
    }
    public void setStorageLoc(String storageLoc) {
        this.storageLoc = storageLoc;
    }
    public String getGatePassNo() {
        return gatePassNo;
    }
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
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
}
