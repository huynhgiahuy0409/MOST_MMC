package com.tsb.most.basebiz.parm.administrator;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchAccidentDamageReportParm extends BaseBizParm{
	private String searchType;
    private String docNo;
    private String evtTpCd;
    private String evtDt;
    private String evtStDt;
    private String evtEndDt;
    private String evtPlc;
    private String evtCd;
    private String evtSeq;
    private String evtStatCd;

	public String getEvtSeq() {
	    return evtSeq;
	}
	public void setEvtSeq(String evtSeq) {
	    this.evtSeq = evtSeq;
	}
	public String getDocNo() {
	    return docNo;
	}
	public void setDocNo(String docNo) {
	    this.docNo = docNo;
	}	
    /**
     * @return Returns the evtDt.
     */
    public String getEvtDt() {
        return evtDt;
    }
    /**
     * @param evtDt The evtDt to set.
     */
    public void setEvtDt(String evtDt) {
        this.evtDt = evtDt;
    }
	/**
	 * @return Returns the evtEndDt.
	 */
	public String getEvtEndDt() {
	    return evtEndDt;
	}
	/**
	 * @param evtEndDt The evtEndDt to set.
	 */
	public void setEvtEndDt(String evtEndDt) {
	    this.evtEndDt = evtEndDt;
	}
	/**
	 * @return Returns the evtStDt.
	 */
	public String getEvtStDt() {
	    return evtStDt;
	}
	/**
	 * @param evtStDt The evtStDt to set.
	 */
	public void setEvtStDt(String evtStDt) {
	    this.evtStDt = evtStDt;
	}
	public String getEvtPlc() {
	    return evtPlc;
	}
	public void setEvtPlc(String evtPlc) {
	    this.evtPlc = evtPlc;
	}
	public String getEvtTpCd() {
	    return evtTpCd;
	}
	public void setEvtTpCd(String evtTpCd) {
	    this.evtTpCd = evtTpCd;
	}
	public String getSearchType() {
	    return searchType;
	}
	public void setSearchType(String searchType) {
	    this.searchType = searchType;
	}
	public String getEvtCd() {
	    return evtCd;
	}
	public void setEvtCd(String evtCd) {
	    this.evtCd = evtCd;
	}
	public String getEvtStatCd() {
		return evtStatCd;
	}
	public void setEvtStatCd(String evtStatCd) {
		this.evtStatCd = evtStatCd;
	}
}
