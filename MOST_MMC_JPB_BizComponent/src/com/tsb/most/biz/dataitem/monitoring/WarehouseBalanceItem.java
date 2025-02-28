package com.tsb.most.biz.dataitem.monitoring;

import com.tsb.most.framework.dataitem.DataItem;

public class WarehouseBalanceItem extends DataItem {
	private String vslCallId;
	private String vslNm;
	private String mfDocId;
	private String userRefNo;
    private String shipgNoteNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String cmdtCd;
    private String cmdtNm;
    private String statusCd;
    private String statusNm;


    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String shpCd;
    private String shpNm;
    private String cnsneCd;
    private String cnsneNm;
    
    private double docMt;
    private double docM3;
    private int docQty;
    private double storedMt;
    private double storedM3;
    private int storedQty;
    private double balMt;
    private double balM3;
    private int balQty;
    private double totalBalMt;
    private double totalBalM3;
    private int totalBalQty;
    
    private String whId;
    private String whTpCd;
    private String whTpNm;
    private String locId;
    private String tsptTpCd;
    private String tsptTpNm;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getCatgNm() {
		return catgNm;
	}
	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getShpCd() {
		return shpCd;
	}
	public void setShpCd(String shpCd) {
		this.shpCd = shpCd;
	}
	public String getShpNm() {
		return shpNm;
	}
	public void setShpNm(String shpNm) {
		this.shpNm = shpNm;
	}
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public double getStoredMt() {
		return storedMt;
	}
	public void setStoredMt(double storedMt) {
		this.storedMt = storedMt;
	}
	public double getStoredM3() {
		return storedM3;
	}
	public void setStoredM3(double storedM3) {
		this.storedM3 = storedM3;
	}
	public int getStoredQty() {
		return storedQty;
	}
	public void setStoredQty(int storedQty) {
		this.storedQty = storedQty;
	}
	public double getBalMt() {
		return balMt;
	}
	public void setBalMt(double balMt) {
		this.balMt = balMt;
	}
	public double getBalM3() {
		return balM3;
	}
	public void setBalM3(double balM3) {
		this.balM3 = balM3;
	}
	public int getBalQty() {
		return balQty;
	}
	public void setBalQty(int balQty) {
		this.balQty = balQty;
	}
	public double getTotalBalMt() {
		return totalBalMt;
	}
	public void setTotalBalMt(double totalBalMt) {
		this.totalBalMt = totalBalMt;
	}
	public double getTotalBalM3() {
		return totalBalM3;
	}
	public void setTotalBalM3(double totalBalM3) {
		this.totalBalM3 = totalBalM3;
	}
	public int getTotalBalQty() {
		return totalBalQty;
	}
	public void setTotalBalQty(int totalBalQty) {
		this.totalBalQty = totalBalQty;
	}
	public String getWhId() {
		return whId;
	}
	public void setWhId(String whId) {
		this.whId = whId;
	}
	public String getWhTpCd() {
		return whTpCd;
	}
	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}
	public String getWhTpNm() {
		return whTpNm;
	}
	public void setWhTpNm(String whTpNm) {
		this.whTpNm = whTpNm;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public double getDocMt() {
		return docMt;
	}
	public void setDocMt(double docMt) {
		this.docMt = docMt;
	}
	public double getDocM3() {
		return docM3;
	}
	public void setDocM3(double docM3) {
		this.docM3 = docM3;
	}
	public int getDocQty() {
		return docQty;
	}
	public void setDocQty(int docQty) {
		this.docQty = docQty;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public String getStatusNm() {
		return statusNm;
	}
	public void setStatusNm(String statusNm) {
		this.statusNm = statusNm;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getTsptTpNm() {
		return tsptTpNm;
	}
	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}
}
