/**
* ImportExportReconcileItem.java
*
* Created on   : Jan 9, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Jan 9, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class ExportReconcileItem extends DataItem {
	private String vslCallId;
	private String mfDocId;
	private String crgNo;
	private String blNo;
	private String doNo;
	private String docWgt;
	private String docMsrmt;
	private String docPkgQty;
	private String billWgt;
	private String billMsrmt;
	private String billPkgQty;
	private String pkgQty;
	private String msrmt;
	private String wgt;
	private String delvTpCd;
	private String tsptTpCd;
	private String fwrAgnt;
	private String cnsne;
	private String cgTpCd;
	private String cmdtCd;
	private String pkgTpCd;
	private String dgClass;
	private String pol;

	private String snNo;
	private String cbrNo;
	private String grNo;
	private String shpr;
	private String pod;
	private String lorryNo;
	private String cmdtDescr;
	private String opeTp;
	private String jobTpCd;
	private String vslNm;
	private String atb;
	private String atu;
	private String catgCd;
	private String seq;
	private String userId;
	private String status; // from ExportReconcileStatusItem
	private String editable; // from ExportReconcileStatusItem

	// Added by Joseph for iss 46027
	private String oldTsptTpCd;

	// Added by LGT
	private Date updateTimeField;
	private List sumList;
	private List recclList;
	private List mfList;
	private List outturnList;
	private List transportTypeList;
	private List packageTypeList;
	private String workingStatus;

	private ArrayList<ExportReconcileItem> items;
	private ArrayList<ExportReconcileItem> statusitems;

	private List exportStatusList;
	private List exportList;
	private List exportManifestList;

	private int count;

	private String whTp;
    private String whTpNm;
    private String roroJobNo;
	/**
	 * @return Returns the cmdtDescr.
	 */
	public String getCmdtDescr() {
		return cmdtDescr;
	}

	/**
	 * @param cmdtDescr The cmdtDescr to set.
	 */
	public void setCmdtDescr(String cmdtDescr) {
		this.cmdtDescr = cmdtDescr;
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

	public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public String getPod() {
		return pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getShpr() {
		return shpr;
	}

	public void setShpr(String shpr) {
		this.shpr = shpr;
	}

	public String getSnNo() {
		return snNo;
	}

	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}

	private String no;

	public String getCrgNo() {
		return crgNo;
	}

	public void setCrgNo(String crgNo) {
		this.crgNo = crgNo;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getBillMsrmt() {
		return billMsrmt;
	}

	public void setBillMsrmt(String billMsrmt) {
		this.billMsrmt = billMsrmt;
	}

	public String getBillPkgQty() {
		return billPkgQty;
	}

	public void setBillPkgQty(String billPkgQty) {
		this.billPkgQty = billPkgQty;
	}

	public String getBillWgt() {
		return billWgt;
	}

	public void setBillWgt(String billWgt) {
		this.billWgt = billWgt;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getCmdtCd() {
		return cmdtCd;
	}

	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}

	public String getCnsne() {
		return cnsne;
	}

	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
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

	public String getFwrAgnt() {
		return fwrAgnt;
	}

	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}

	public String getMsrmt() {
		return msrmt;
	}

	public void setMsrmt(String msrmt) {
		this.msrmt = msrmt;
	}

	public String getPkgQty() {
		return pkgQty;
	}

	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}

	public String getPkgTpCd() {
		return pkgTpCd;
	}

	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}

	public String getPol() {
		return pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}

	public String getTsptTpCd() {
		return tsptTpCd;
	}

	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	
	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}

	public String getWgt() {
		return wgt;
	}

	public void setWgt(String wgt) {
		this.wgt = wgt;
	}

	public String getDocMsrmt() {
		return docMsrmt;
	}

	public void setDocMsrmt(String docMsrmt) {
		this.docMsrmt = docMsrmt;
	}

	public String getDocPkgQty() {
		return docPkgQty;
	}

	public void setDocPkgQty(String docPkgQty) {
		this.docPkgQty = docPkgQty;
	}

	public String getDocWgt() {
		return docWgt;
	}

	public void setDocWgt(String docWgt) {
		this.docWgt = docWgt;
	}

	/**
	 * @return Returns the jobTpCd.
	 */
	public String getJobTpCd() {
		return jobTpCd;
	}

	/**
	 * @param jobTpCd The jobTpCd to set.
	 */
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}

	/**
	 * @return Returns the opeTp.
	 */
	public String getOpeTp() {
		return opeTp;
	}

	/**
	 * @param opeTp The opeTp to set.
	 */
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}

	/**
	 * @return Returns the vslNm.
	 */
	public String getVslNm() {
		return vslNm;
	}

	/**
	 * @param vslNm The vslNm to set.
	 */
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	/**
	 * @return Returns the atb.
	 */
	public String getAtb() {
		return atb;
	}

	/**
	 * @param atb The atb to set.
	 */
	public void setAtb(String atb) {
		this.atb = atb;
	}

	/**
	 * @return Returns the atu.
	 */
	public String getAtu() {
		return atu;
	}

	/**
	 * @param atu The atu to set.
	 */
	public void setAtu(String atu) {
		this.atu = atu;
	}

	public String getOldTsptTpCd() {
		return oldTsptTpCd;
	}

	public void setOldTsptTpCd(String oldTsptTpCd) {
		this.oldTsptTpCd = oldTsptTpCd;
	}

	public Date getUpdateTimeField() {
		return updateTimeField;
	}

	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}

	public List getSumList() {
		return sumList;
	}

	public void setSumList(List sumList) {
		this.sumList = sumList;
	}

	public List getRecclList() {
		return recclList;
	}

	public void setRecclList(List recclList) {
		this.recclList = recclList;
	}

	public List getMfList() {
		return mfList;
	}

	public void setMfList(List mfList) {
		this.mfList = mfList;
	}

	public List getOutturnList() {
		return outturnList;
	}

	public void setOutturnList(List outturnList) {
		this.outturnList = outturnList;
	}

	public List getTransportTypeList() {
		return transportTypeList;
	}

	public void setTransportTypeList(List transportTypeList) {
		this.transportTypeList = transportTypeList;
	}

	public List getPackageTypeList() {
		return packageTypeList;
	}

	public void setPackageTypeList(List packageTypeList) {
		this.packageTypeList = packageTypeList;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public ArrayList<ExportReconcileItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<ExportReconcileItem> items) {
		this.items = items;
	}

	public ArrayList<ExportReconcileItem> getStatusitems() {
		return statusitems;
	}

	public void setStatusitems(ArrayList<ExportReconcileItem> statusitems) {
		this.statusitems = statusitems;
	}

	public List getExportStatusList() {
		return exportStatusList;
	}

	public void setExportStatusList(List exportStatusList) {
		this.exportStatusList = exportStatusList;
	}

	public List getExportList() {
		return exportList;
	}

	public void setExportList(List exportList) {
		this.exportList = exportList;
	}

	public List getExportManifestList() {
		return exportManifestList;
	}

	public void setExportManifestList(List exportManifestList) {
		this.exportManifestList = exportManifestList;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEditable() {
		return editable;
	}

	public void setEditable(String editable) {
		this.editable = editable;
	}

	public String getCatgCd() {
		return catgCd;
	}

	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getWhTp() {
		return whTp;
	}

	public void setWhTp(String whTp) {
		this.whTp = whTp;
	}

	public String getWhTpNm() {
		return whTpNm;
	}

	public void setWhTpNm(String whTpNm) {
		this.whTpNm = whTpNm;
	}

	public String getRoroJobNo() {
		return roroJobNo;
	}

	public void setRoroJobNo(String roroJobNo) {
		this.roroJobNo = roroJobNo;
	}
	
}
