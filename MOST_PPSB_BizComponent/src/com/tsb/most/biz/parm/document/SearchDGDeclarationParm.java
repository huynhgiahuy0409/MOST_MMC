/**
* DGDeclarationParm.java
*
* Created on   : 2008-04-02
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-04-02   Miss Nam-Sook Chang  1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchDGDeclarationParm extends BaseBizParm {
   private String vslCd;
   private String callYear;
   private String callSeq;
   private String cgNo;
   private String imdg;
   private String substance;
   private String unno;
   private String searchType;
   private String seq;
   // to distingue the vlsCallId and NonCallId in DG List
   private String vslCallId;
   private String catgCd;
   private String pgmId;
   
   private String impCd;
   private String expCd;
   
public String getCatgCd() {
	return catgCd;
}
public void setCatgCd(String catgCd) {
	this.catgCd = catgCd;
}
public String getPgmId() {
	return pgmId;
}
public void setPgmId(String pgmId) {
	this.pgmId = pgmId;
}
/**
 * @return Returns the substance.
 */
public String getSubstance() {
    return substance;
}
/**
 * @param substance The substance to set.
 */
public void setSubstance(String substance) {
    this.substance = substance;
}

public String getVslCallId() {
    return vslCallId;
}
public void setVslCallId(String vslCallId) {
    this.vslCallId = vslCallId;
}
public String getSeq() {
    return seq;
}
public void setSeq(String seq) {
    this.seq = seq;
}
	public String getSearchType() {
	    return searchType;
	}
	public void setSearchType(String searchType) {
	    this.searchType = searchType;
	}
	public String getCallSeq() {
	    return callSeq;
	}
	public void setCallSeq(String callSeq) {
	    this.callSeq = callSeq;
	}
	public String getCallYear() {
	    return callYear;
	}
	public void setCallYear(String callYear) {
	    this.callYear = callYear;
	}
	public String getCgNo() {
	    return cgNo;
	}
	public void setCgNo(String cgNo) {
	    this.cgNo = cgNo;
	}
	public String getImdg() {
	    return imdg;
	}
	public void setImdg(String imdg) {
	    this.imdg = imdg;
	}
	public String getUnno() {
	    return unno;
	}
	public void setUnno(String unno) {
	    this.unno = unno;
	}
	public String getVslCd() {
	    return vslCd;
	}
	public void setVslCd(String vslCd) {
	    this.vslCd = vslCd;
	}
	public String getImpCd() {
		return impCd;
	}
	public String getExpCd() {
		return expCd;
	}
	public void setImpCd(String impCd) {
		this.impCd = impCd;
	}
	public void setExpCd(String expCd) {
		this.expCd = expCd;
	}
}
