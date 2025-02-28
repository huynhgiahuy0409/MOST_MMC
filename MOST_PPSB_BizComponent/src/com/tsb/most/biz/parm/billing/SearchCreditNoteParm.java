/**
* WhRentalStateParm.java
*
* Created on   : 2009-06-26
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2009-06-26   Charles,Kim 		   1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCreditNoteParm extends BaseBizParm {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8277460092890425518L;
	
	private String vslCallId;
	private String fromDate;
	private String toDate;
	private String ivNo;
	private String ivPrfx;
	private String searchType;
	private String creditNoteNo;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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

	public String getIvNo() {
		return ivNo;
	}

	public void setIvNo(String ivNo) {
		this.ivNo = ivNo;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getIvPrfx() {
		return ivPrfx;
	}

	public void setIvPrfx(String ivPrfx) {
		this.ivPrfx = ivPrfx;
	}

	public String getCreditNoteNo() {
		return creditNoteNo;
	}

	public void setCreditNoteNo(String creditNoteNo) {
		this.creditNoteNo = creditNoteNo;
	}

}