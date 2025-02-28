/**
* DelayCodeParm.java
*
* Created on   : 2008-03-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	           REVISION    	
* 2008-03-28   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;


public class SearchDelayCodeParm extends BaseBizParm {
	private static final long serialVersionUID = -1387578401720032111L;
   
	private String dlyCd;
    private String dlyCatgCd;
    private String chagYN;
    private String bulkTp;
	private String dlyTp;
	private String opUseYn;
	private String nonOpUseYn;
    
	public String getChagYN() {
	    return chagYN;
	}
	public void setChagYN(String chagYN) {
	    this.chagYN = chagYN;
	}
	public String getBulkTp() {
	    return bulkTp;
	}
	public void setBulkTp(String bulkTp) {
	    this.bulkTp = bulkTp;
	}
	public String getDlyCatgCd() {
	    return dlyCatgCd;
	}
	public void setDlyCatgCd(String dlyCatgCd) {
	    this.dlyCatgCd = dlyCatgCd;
	}
	public String getDlyCd() {
	    return dlyCd;
	}
	public void setDlyCd(String dlyCd) {
	    this.dlyCd = dlyCd;
	}
	public String getDlyTp() {
	    return dlyTp;
	}
	public void setDlyTp(String dlyTp) {
	    this.dlyTp = dlyTp;
	}
	public String getOpUseYn() {
	    return opUseYn;
	}
	public void setOpUseYn(String opUseYn) {
	    this.opUseYn = opUseYn;
	}
	public String getNonOpUseYn() {
	    return nonOpUseYn;
	}
	public void setNonOpUseYn(String nonOpUseYn) {
	    this.nonOpUseYn = nonOpUseYn;
	}
}
