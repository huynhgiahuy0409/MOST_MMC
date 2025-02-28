package com.tsb.most.biz.dataitem.monitoring;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoGatePassItem extends DataItem {

    private String cgNo;
    private String cgInOutCd;
    private String doNo;
    
    private int seq;
    private double  wgt;
    private String wgtUnit;
    private double  msrmt;
    private String msrmtUnit;
    private int pkgQty;
    private String pkgTpCd;
    private String cmdtCd;
    private String cmdtCdNm;
    private String cgTpCd;
    private String dgCgIdt;
    private String gateInDt;
    private String gateOutDt;
    private String tsptTpCd;
    private String fnlYn;
    private String grNo;
    private String locId;
    private String rmk;
    private String lorryNo;
    private String gatePassNo;
    private String gatePassIssueDt;
    private int issueCnt;
    private String updDt;
    private String updUserId;
    private String version;
    private String vslCallId;
    private int actlWgt;
    
    //add
    private String delvStat;
    private String issued;
    private String hdlOutDt;
    private String rehandle;
    private String blNo;

    private String catgCd;
    private String catgNm;
    
    private String tsptr;
    private String tsptcompnm;
    private String tsptTpNm;
    private String delvTpNm;
    private String noTrips;
    private String curPage;
    
    private String shftId;
    private String shftDt;
    private String shftNm;
    private String ConfirmBy;
    private String dateTime;
   
  
    private String rn;
    private String totalPage;
    private String gateTxnNo;
    private String customsStat;
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public String getWgtUnit() {
		return wgtUnit;
	}
	public void setWgtUnit(String wgtUnit) {
		this.wgtUnit = wgtUnit;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public String getMsrmtUnit() {
		return msrmtUnit;
	}
	public void setMsrmtUnit(String msrmtUnit) {
		this.msrmtUnit = msrmtUnit;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtCdNm() {
		return cmdtCdNm;
	}
	public void setCmdtCdNm(String cmdtCdNm) {
		this.cmdtCdNm = cmdtCdNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getDgCgIdt() {
		return dgCgIdt;
	}
	public void setDgCgIdt(String dgCgIdt) {
		this.dgCgIdt = dgCgIdt;
	}
	public String getGateInDt() {
		return gateInDt;
	}
	public void setGateInDt(String gateInDt) {
		this.gateInDt = gateInDt;
	}
	public String getGateOutDt() {
		return gateOutDt;
	}
	public void setGateOutDt(String gateOutDt) {
		this.gateOutDt = gateOutDt;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getFnlYn() {
		return fnlYn;
	}
	public void setFnlYn(String fnlYn) {
		this.fnlYn = fnlYn;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getGatePassIssueDt() {
		return gatePassIssueDt;
	}
	public void setGatePassIssueDt(String gatePassIssueDt) {
		this.gatePassIssueDt = gatePassIssueDt;
	}
	public int getIssueCnt() {
		return issueCnt;
	}
	public void setIssueCnt(int issueCnt) {
		this.issueCnt = issueCnt;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public int getActlWgt() {
		return actlWgt;
	}
	public void setActlWgt(int actlWgt) {
		this.actlWgt = actlWgt;
	}
	public String getDelvStat() {
		return delvStat;
	}
	public void setDelvStat(String delvStat) {
		this.delvStat = delvStat;
	}
	public String getIssued() {
		return issued;
	}
	public void setIssued(String issued) {
		this.issued = issued;
	}
	public String getHdlOutDt() {
		return hdlOutDt;
	}
	public void setHdlOutDt(String hdlOutDt) {
		this.hdlOutDt = hdlOutDt;
	}
	public String getRehandle() {
		return rehandle;
	}
	public void setRehandle(String rehandle) {
		this.rehandle = rehandle;
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
	public String getTsptr() {
		return tsptr;
	}
	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
	}
	public String getTsptcompnm() {
		return tsptcompnm;
	}
	public void setTsptcompnm(String tsptcompnm) {
		this.tsptcompnm = tsptcompnm;
	}
	public String getTsptTpNm() {
		return tsptTpNm;
	}
	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getNoTrips() {
		return noTrips;
	}
	public void setNoTrips(String noTrips) {
		this.noTrips = noTrips;
	}
	public String getCurPage() {
		return curPage;
	}
	public void setCurPage(String curPage) {
		this.curPage = curPage;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getShftDt() {
		return shftDt;
	}
	public void setShftDt(String shftDt) {
		this.shftDt = shftDt;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getConfirmBy() {
		return ConfirmBy;
	}
	public void setConfirmBy(String confirmBy) {
		ConfirmBy = confirmBy;
	}
	public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	public String getRn() {
		return rn;
	}
	public void setRn(String rn) {
		this.rn = rn;
	}
	public String getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getCustomsStat() {
		return customsStat;
	}
	public void setCustomsStat(String customsStat) {
		this.customsStat = customsStat;
	}

    
    
}
