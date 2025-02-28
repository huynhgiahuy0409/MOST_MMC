package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class ExportReconcileForLiquidItem extends DataItem {
	private String vslCallId;
    private String seq;
    private String workYmd;
    private String shftId;
    private String no;
    private String blNo;
    private String dgClass;
    private String doNo;
    private String billWgt;
    private String handleMT;
    private String fwrAgnt;
    private String cnsne;
    private String cnsneNm;
    private String cgTpCd;
    private String oldCgTpCd;
    private String cmdtCd;
    private String oldCmdtCd;
    private String pol;
    private String snNo;
    private String cbrNo;
    private String grNo;
    private String shpr;
    private String shprNm;
    private String pod;
    private String lorryNo;
    private String opeTp;
    private String oldOpeTp;
    private String cmdtDescr;
    private String pkgTpCd;
    private String oldPkgTpCd;
    private String jobTpCd;
    private String vslNm;
    private String atu;
    private String atb;
    
    private String docMt;
    private String docM3;
    private String docQty;
    private String actMt;
    private String actM3;
    private String actQty;
    private String diffMt;
    private String diffM3;
    private String diffQty;
    private String fwrd;
    private String fwrdNm;
    private String mfDocId;
    private String docId;
    private String jobNo;
    private String submitDate;
    private String cgDescr;
    private String status;
    private String workingStatus;
    
    private ArrayList<ExportReconcileForLiquidItem> items;
    private ArrayList<ExportReconcileForLiquidItem> statusitems;
    
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
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getDgClass() {
		return dgClass;
	}
	public void setDgClass(String dgClass) {
		this.dgClass = dgClass;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getBillWgt() {
		return billWgt;
	}
	public void setBillWgt(String billWgt) {
		this.billWgt = billWgt;
	}
	public String getHandleMT() {
		return handleMT;
	}
	public void setHandleMT(String handleMT) {
		this.handleMT = handleMT;
	}
	public String getFwrAgnt() {
		return fwrAgnt;
	}
	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getOldCgTpCd() {
		return oldCgTpCd;
	}
	public void setOldCgTpCd(String oldCgTpCd) {
		this.oldCgTpCd = oldCgTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getOldCmdtCd() {
		return oldCmdtCd;
	}
	public void setOldCmdtCd(String oldCmdtCd) {
		this.oldCmdtCd = oldCmdtCd;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getCbrNo() {
		return cbrNo;
	}
	public void setCbrNo(String cbrNo) {
		this.cbrNo = cbrNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getOpeTp() {
		return opeTp;
	}
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}
	public String getOldOpeTp() {
		return oldOpeTp;
	}
	public void setOldOpeTp(String oldOpeTp) {
		this.oldOpeTp = oldOpeTp;
	}
	public String getCmdtDescr() {
		return cmdtDescr;
	}
	public void setCmdtDescr(String cmdtDescr) {
		this.cmdtDescr = cmdtDescr;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getOldPkgTpCd() {
		return oldPkgTpCd;
	}
	public void setOldPkgTpCd(String oldPkgTpCd) {
		this.oldPkgTpCd = oldPkgTpCd;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
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
	public String getDiffMt() {
		return diffMt;
	}
	public void setDiffMt(String diffMt) {
		this.diffMt = diffMt;
	}
	public String getDiffM3() {
		return diffM3;
	}
	public void setDiffM3(String diffM3) {
		this.diffM3 = diffM3;
	}
	public String getDiffQty() {
		return diffQty;
	}
	public void setDiffQty(String diffQty) {
		this.diffQty = diffQty;
	}
	public String getFwrd() {
		return fwrd;
	}
	public void setFwrd(String fwrd) {
		this.fwrd = fwrd;
	}
	public String getFwrdNm() {
		return fwrdNm;
	}
	public void setFwrdNm(String fwrdNm) {
		this.fwrdNm = fwrdNm;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getSubmitDate() {
		return submitDate;
	}
	public void setSubmitDate(String submitDate) {
		this.submitDate = submitDate;
	}
	public String getCgDescr() {
		return cgDescr;
	}
	public void setCgDescr(String cgDescr) {
		this.cgDescr = cgDescr;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<ExportReconcileForLiquidItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<ExportReconcileForLiquidItem> items) {
		this.items = items;
	}
	public ArrayList<ExportReconcileForLiquidItem> getStatusitems() {
		return statusitems;
	}
	public void setStatusitems(ArrayList<ExportReconcileForLiquidItem> statusitems) {
		this.statusitems = statusitems;
	}

}
