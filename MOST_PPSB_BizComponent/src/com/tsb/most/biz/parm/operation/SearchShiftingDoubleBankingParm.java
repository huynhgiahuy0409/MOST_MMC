package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchShiftingDoubleBankingParm extends BaseBizParm{    
   private String vslCallId;
   private String vslCd;
   private String searchType;
   private String cgOptTpCd;
   private String dblBnkShip1;
   
   private String vslShiftingYN;
   private String vslShiftingSeq;
   
   private String vslTp;
   
	/**
	 * @return Returns the dblBnkShip1.
	 */
	public String getDblBnkShip1() {
	    return dblBnkShip1;
	}
	/**
	 * @param dblBnkShip1 The dblBnkShip1 to set.
	 */
	public void setDblBnkShip1(String dblBnkShip1) {
	    this.dblBnkShip1 = dblBnkShip1;
	}
	public String getSearchType() {
	    return searchType;
	}
	public void setSearchType(String searchType) {
	    this.searchType = searchType;
	}
	public String getVslShiftingYN() {
        return vslShiftingYN;
    }
    public void setVslShiftingYN(String vslShiftingYN) {
        this.vslShiftingYN = vslShiftingYN;
    }
    public String getVslCd() {
	    return vslCd;
	}
	public void setVslCd(String vslCd) {
	    this.vslCd = vslCd;
	}
	public String getVslCallId() {
	    return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
	    this.vslCallId = vslCallId;
	}
	
	/**
	 * @return Returns the cgOptTpCd.
	 */
	public String getCgOptTpCd() {
	    return cgOptTpCd;
	}
	/**
	 * @param cgOptTpCd The cgOptTpCd to set.
	 */
	public void setCgOptTpCd(String cgOptTpCd) {
	    this.cgOptTpCd = cgOptTpCd;
	}
    public String getVslShiftingSeq() {
        return vslShiftingSeq;
    }
    public void setVslShiftingSeq(String vslShiftingSeq) {
        this.vslShiftingSeq = vslShiftingSeq;
    }
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
}
