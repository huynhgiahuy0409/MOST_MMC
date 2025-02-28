/**
* VesselScheduleItem.java
*
* Created on   : 2007-07-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-03   Mr Luis Lee	1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselBaplieForGCItem extends DataItem{

    private String vslCallId;          
    private String blNo;       
    private String btnSeq;        
    private String hatchNo;         
    private String deckLoc;    
    private String hatchSeq;         
    private String catgCd;        
    private String mt;        
    private String qty;       
    private String rmk;       
    private String userId;       
    private String updTime;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getBtnSeq() {
		return btnSeq;
	}
	public void setBtnSeq(String btnSeq) {
		this.btnSeq = btnSeq;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getDeckLoc() {
		return deckLoc;
	}
	public void setDeckLoc(String deckLoc) {
		this.deckLoc = deckLoc;
	}
	public String getHatchSeq() {
		return hatchSeq;
	}
	public void setHatchSeq(String hatchSeq) {
		this.hatchSeq = hatchSeq;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
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
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUpdTime() {
		return updTime;
	}
	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}
    
	
}
