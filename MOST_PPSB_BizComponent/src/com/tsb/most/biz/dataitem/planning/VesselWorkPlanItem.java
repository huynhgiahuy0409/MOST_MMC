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

public class VesselWorkPlanItem extends DataItem{

    private String vslCallId;
    
    private String seq; 
    private String vslSeq;   
    private String blSNNo;       
    private String craneNo;        
    private String hatchNo;         
    private String deckLoc;    
    private String hatchSeq;         
    private String catgCd;        
    private String mt;        
    private String qty;       
    private String rmk;       
    private String userId;       
    private String updTime;       
    private String pod;       
    private String commodity;       
    private String pkgType;       
    private String fwd;     
    private String dg;  
    private String btnNo;  
    private String btnSeq;
    
    
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getBlSNNo() {
		return blSNNo;
	}
	public void setBlSNNo(String blSNNo) {
		this.blSNNo = blSNNo;
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
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslSeq() {
		return vslSeq;
	}
	public void setVslSeq(String vslSeq) {
		this.vslSeq = vslSeq;
	}
	public String getCraneNo() {
		return craneNo;
	}
	public void setCraneNo(String craneNo) {
		this.craneNo = craneNo;
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
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getPkgType() {
		return pkgType;
	}
	public void setPkgType(String pkgType) {
		this.pkgType = pkgType;
	}
	public String getFwd() {
		return fwd;
	}
	public void setFwd(String fwd) {
		this.fwd = fwd;
	}
	public String getDg() {
		return dg;
	}
	public void setDg(String dg) {
		this.dg = dg;
	}
    
}
