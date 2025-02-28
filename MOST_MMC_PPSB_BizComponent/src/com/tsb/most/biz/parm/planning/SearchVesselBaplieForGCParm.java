/**
* VesselScheduleParm.java
*
* Created on   : 2007-07-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-03   Mr Yang-Min Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @author kimyangmin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchVesselBaplieForGCParm extends BaseBizParm{
    private String vslCallId;
    private String hatchNo;
    private String deckLocation;
    private String hackSeq;
    private String btnNo;
    private String btnSeq;
    private String marksNo;
    private String mt;
    private String qty;
    private String rmk;
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getDeckLocation() {
		return deckLocation;
	}
	public void setDeckLocation(String deckLocation) {
		this.deckLocation = deckLocation;
	}
	public String getHackSeq() {
		return hackSeq;
	}
	public void setHackSeq(String hackSeq) {
		this.hackSeq = hackSeq;
	}
	public String getBtnNo() {
		return btnNo;
	}
	public void setBtnNo(String btnNo) {
		this.btnNo = btnNo;
	}
	public String getBtnSeq() {
		return btnSeq;
	}
	public void setBtnSeq(String btnSeq) {
		this.btnSeq = btnSeq;
	}
	public String getMarksNo() {
		return marksNo;
	}
	public void setMarksNo(String marksNo) {
		this.marksNo = marksNo;
	}
	public String getMt() {
		return mt;
	}
	public void setMt(String mt) {
		this.mt = mt;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
    
    
}
