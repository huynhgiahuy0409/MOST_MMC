/**
* UnclosedOperationItem.java
*
* Created on   : 2009-04-20
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR            REVISION     
* 2008-04-20   Kisik Jeong    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.monitoring;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;


public class UnclosedOperationListItem extends DataItem {
    private String vslCallId;
    private String vslNm;
    private String vslTp;
    private String cgOpTp;
    private String blSn;
    private String grNo;
    private String cgCond;
    private String rsn;
    private String atb;
    private String atu;
    private String jobStrip;
    private List shiftList;
    private String docMt;
    private String docM3;
    private String docQty;
    private String actMt;
    private String actM3;
    private String actQty;
    private String whLoc;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getCgOpTp() {
		return cgOpTp;
	}
	public void setCgOpTp(String cgOpTp) {
		this.cgOpTp = cgOpTp;
	}
	public String getBlSn() {
		return blSn;
	}
	public void setBlSn(String blSn) {
		this.blSn = blSn;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getCgCond() {
		return cgCond;
	}
	public void setCgCond(String cgCond) {
		this.cgCond = cgCond;
	}
	public String getRsn() {
		return rsn;
	}
	public void setRsn(String rsn) {
		this.rsn = rsn;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getJobStrip() {
		return jobStrip;
	}
	public void setJobStrip(String jobStrip) {
		this.jobStrip = jobStrip;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getActMt() {
		return actMt;
	}
	public void setActMt(String actMt) {
		this.actMt = actMt;
	}
	public String getActM3() {
		return actM3;
	}
	public void setActM3(String actM3) {
		this.actM3 = actM3;
	}
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
}