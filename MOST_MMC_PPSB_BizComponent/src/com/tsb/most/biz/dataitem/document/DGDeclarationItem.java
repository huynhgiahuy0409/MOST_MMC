/**
* DGDeclarationItem.java
*
* Created on   : 2008-04-02
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-04-02   Miss Nam-Sook Chang  1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class DGDeclarationItem extends DataItem {
  private String crudDG;
  private String vslCd;
  private String callYear;
  private String callSeq;
  private String cgNo;
  private String imdg;
  private String unno;
  private String substance;
  private String ixCd;
  private String delv;
  private double wgt;
  private String block;
  private String bay;
  private String roww;
  private String tier;
  private String bayIdx;
  private String rowIdx;
  private String dgChk;
  private String cmplChk;
  private String packingGrp;
  private String rmk1;
  private String rmk;
  private String yardId;
  private String empCd;
  private String priCd;
  private String priGrp;
  private String confmBy;
  private String confmDt;
  private String rejBy;
  private String rejDt;
  private String pkg;
  private String pkgTpCd;
  private double pkgQty;
  private String hazChem;
  private String propSnm;
  private String refNo;
  private String rmk2;
  private String impNm;
  private String impAddr;
  private String flashPnt;
  private String expNm;
  private String expAddr;
  private String freeZoneDiv;
  private String userId;
  private String catgCd;
  private String lstPortNm;
  private String dgStatus;
  private String telNo;
  private String mobileNo;
  private String engNm;
  private String idNo;
  private String desgination;
  private String docSNNo;
  private String terminal;
  private ArrayList<FileUploadItem> uploadItems;
  
public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
  
  public String getTerminal() {
		return terminal;
	}
	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}
public String getDocSNNo() {
    return docSNNo;
}
public void setDocSNNo(String docSNNo) {
    this.docSNNo = docSNNo;
}
public String getTelNo() {
    return telNo;
}
public void setTelNo(String telNo) {
    this.telNo = telNo;
}
public String getMobileNo() {
    return mobileNo;
}
public void setMobileNo(String mobileNo) {
    this.mobileNo = mobileNo;
}
public String getEngNm() {
    return engNm;
}
public void setEngNm(String engNm) {
    this.engNm = engNm;
}
public String getIdNo() {
    return idNo;
}
public void setIdNo(String idNo) {
    this.idNo = idNo;
}
public String getDesgination() {
    return desgination;
}
public void setDesgination(String desgination) {
    this.desgination = desgination;
}
public String getDgStatus() {
    return dgStatus;
}
public void setDgStatus(String dgStatus) {
    this.dgStatus = dgStatus;
}
public String getLstPortNm() {
    return lstPortNm;
}
public void setLstPortNm(String lstPortNm) {
    this.lstPortNm = lstPortNm;
}
public String getDgDiv() {
    return dgDiv;
}
public void setDgDiv(String dgDiv) {
    this.dgDiv = dgDiv;
}
public String getVslCallId() {
    return vslCallId;
}
public void setVslCallId(String vslCallId) {
    this.vslCallId = vslCallId;
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
public String getDclrDt() {
    return dclrDt;
}
public void setDclrDt(String dclrDt) {
    this.dclrDt = dclrDt;
}
public String getShipgAgncy() {
    return shipgAgncy;
}
public void setShipgAgncy(String shipgAgncy) {
    this.shipgAgncy = shipgAgncy;
}
public String getFwrd() {
    return fwrd;
}
public void setFwrd(String fwrd) {
    this.fwrd = fwrd;
}
public String getShpr() {
    return shpr;
}
public void setShpr(String shpr) {
    this.shpr = shpr;
}
public String getCnsne() {
    return cnsne;
}
public void setCnsne(String cnsne) {
    this.cnsne = cnsne;
}
public String getDgSeq() {
    return dgSeq;
}
public void setDgSeq(String dgSeq) {
    this.dgSeq = dgSeq;
}
public String getTranshipment() {
    return transhipment;
}
public void setTranshipment(String transhipment) {
    this.transhipment = transhipment;
}
public String getCmdtDesc() {
    return cmdtDesc;
}
public void setCmdtDesc(String cmdtDesc) {
    this.cmdtDesc = cmdtDesc;
}
public String getVslTp() {
    return vslTp;
}
public void setVslTp(String vslTp) {
    this.vslTp = vslTp;
}
private String seq;
  private String pkgtpcdnm;
  
  // Vessel Detail Info Item add
  private String arrvSaId;  		// Agent
  private String vslNm;	   			// Name of Vessel
  private String eta;		   		// eta 
  private String berthLoc;   		// Berth Location
  private String inbVoy;			// Voyage Code 
  private String lastPort;		   	// Last Port of Call
  private String nxtPort;		    // Next Port of Call  
 
  private String snDoDiv;
  private String imdgDiv;
  private String pgmId;
  private String catgCdFileUpload;
  private String fileName;
  private String fileSize;
  private String ufileName;
  private String fileUpload;
  private String contactNm;
  private String contactNo;


 ///tung 
  private String dgDiv;    // DG Category
  private String vslCallId;
  private String scn;
  private String cgTpCd;  // Cargo Type 
  private String cmdtCd;  // Commodity 
  private String dclrDt; //Declaration Date
  private String shipgAgncy;  // S/A 
  private String fwrd;  // F/A 
  private String shpr;  // Shipper
  private String cnsne;  // Consignee
  private String dgSeq;  // dg seq
  private String transhipment;  // transhipment
  private String cmdtDesc;
  private String vslTp;
  
public String getContactNm() {
    return contactNm;
}
public void setContactNm(String contactNm) {
    this.contactNm = contactNm;
}
public String getContactNo() {
    return contactNo;
}
public void setContactNo(String contactNo) {
    this.contactNo = contactNo;
}
public String getPgmId() {
    return pgmId;
}
public void setPgmId(String pgmId) {
    this.pgmId = pgmId;
}
public String getCatgCdFileUpload() {
    return catgCdFileUpload;
}
public void setCatgCdFileUpload(String catgCdFileUpload) {
    this.catgCdFileUpload = catgCdFileUpload;
}
public String getFileName() {
    return fileName;
}
public void setFileName(String fileName) {
    this.fileName = fileName;
}
public String getFileSize() {
    return fileSize;
}
public void setFileSize(String fileSize) {
    this.fileSize = fileSize;
}
public String getUfileName() {
    return ufileName;
}
public void setUfileName(String ufileName) {
    this.ufileName = ufileName;
}
public String getFileUpload() {
    return fileUpload;
}
public void setFileUpload(String fileUpload) {
    this.fileUpload = fileUpload;
}
/**
 * @return Returns the imdgDiv.
 */
public String getImdgDiv() {
    return imdgDiv;
}
/**
 * @param imdgDiv The imdgDiv to set.
 */
public void setImdgDiv(String imdgDiv) {
    this.imdgDiv = imdgDiv;
}
	/**
	 * @return Returns the snDoDiv.
	 */
	public String getSnDoDiv() {
	    return snDoDiv;
	}
	/**
	 * @param snDoDiv The snDoDiv to set.
	 */
	public void setSnDoDiv(String snDoDiv) {
	    this.snDoDiv = snDoDiv;
	}
	
	public String getSeq() {
	    return seq;
	}
	public void setSeq(String seq) {
	    this.seq = seq;
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
	public String getBay() {
	    return bay;
	}
	public void setBay(String bay) {
	    this.bay = bay;
	}
	public String getBayIdx() {
	    return bayIdx;
	}
	public void setBayIdx(String bayIdx) {
	    this.bayIdx = bayIdx;
	}
	public String getBlock() {
	    return block;
	}
	public void setBlock(String block) {
	    this.block = block;
	}
	public String getCallSeq() {
	    return callSeq;
	}
	public void setCallSeq(String callSeq) {
	    this.callSeq = callSeq;
	}
	public String getCallYear() {
	    return callYear;
	}
	public void setCallYear(String callYear) {
	    this.callYear = callYear;
	}
	public String getCgNo() {
	    return cgNo;
	}
	public void setCgNo(String cgNo) {
	    this.cgNo = cgNo;
	}
	public String getCmplChk() {
	    return cmplChk;
	}
	public void setCmplChk(String cmplChk) {
	    this.cmplChk = cmplChk;
	}
	public String getConfmBy() {
	    return confmBy;
	}
	public void setConfmBy(String confmBy) {
	    this.confmBy = confmBy;
	}
	public String getConfmDt() {
	    return confmDt;
	}
	public void setConfmDt(String confmDt) {
	    this.confmDt = confmDt;
	}
	public String getCrudDG() {
	    return crudDG;
	}
	public void setCrudDG(String crudDG) {
	    this.crudDG = crudDG;
	}
	public String getDelv() {
	    return delv;
	}
	public void setDelv(String delv) {
	    this.delv = delv;
	}
	public String getDgChk() {
	    return dgChk;
	}
	public void setDgChk(String dgChk) {
	    this.dgChk = dgChk;
	}
	public String getEmpCd() {
	    return empCd;
	}
	public void setEmpCd(String empCd) {
	    this.empCd = empCd;
	}
	public String getExpAddr() {
	    return expAddr;
	}
	public void setExpAddr(String expAddr) {
	    this.expAddr = expAddr;
	}
	public String getExpNm() {
	    return expNm;
	}
	public void setExpNm(String expNm) {
	    this.expNm = expNm;
	}
	public String getFlashPnt() {
	    return flashPnt;
	}
	public void setFlashPnt(String flashPnt) {
	    this.flashPnt = flashPnt;
	}
	public String getFreeZoneDiv() {
	    return freeZoneDiv;
	}
	public void setFreeZoneDiv(String freeZoneDiv) {
	    this.freeZoneDiv = freeZoneDiv;
	}
	public String getHazChem() {
	    return hazChem;
	}
	public void setHazChem(String hazChem) {
	    this.hazChem = hazChem;
	}
	public String getImdg() {
	    return imdg;
	}
	public void setImdg(String imdg) {
	    this.imdg = imdg;
	}
	public String getImpAddr() {
	    return impAddr;
	}
	public void setImpAddr(String impAddr) {
	    this.impAddr = impAddr;
	}
	public String getImpNm() {
	    return impNm;
	}
	public void setImpNm(String impNm) {
	    this.impNm = impNm;
	}
	public String getIxCd() {
	    return ixCd;
	}
	public void setIxCd(String ixCd) {
	    this.ixCd = ixCd;
	}
	public String getPackingGrp() {
	    return packingGrp;
	}
	public void setPackingGrp(String packingGrp) {
	    this.packingGrp = packingGrp;
	}
	public String getPkg() {
	    return pkg;
	}
	public void setPkg(String pkg) {
	    this.pkg = pkg;
	}
	public double getPkgQty() {
	    return pkgQty;
	}
	public void setPkgQty(double pkgQty) {
	    this.pkgQty = pkgQty;
	}
	public String getPriCd() {
	    return priCd;
	}
	public void setPriCd(String priCd) {
	    this.priCd = priCd;
	}
	public String getPriGrp() {
	    return priGrp;
	}
	public void setPriGrp(String priGrp) {
	    this.priGrp = priGrp;
	}
	public String getPropSnm() {
	    return propSnm;
	}
	public void setPropSnm(String propSnm) {
	    this.propSnm = propSnm;
	}
	public String getRefNo() {
	    return refNo;
	}
	public void setRefNo(String refNo) {
	    this.refNo = refNo;
	}
	public String getRejBy() {
	    return rejBy;
	}
	public void setRejBy(String rejBy) {
	    this.rejBy = rejBy;
	}
	public String getRejDt() {
	    return rejDt;
	}
	public void setRejDt(String rejDt) {
	    this.rejDt = rejDt;
	}
	public String getRmk1() {
	    return rmk1;
	}
	public void setRmk1(String rmk1) {
	    this.rmk1 = rmk1;
	}
	public String getRmk2() {
	    return rmk2;
	}
	public void setRmk2(String rmk2) {
	    this.rmk2 = rmk2;
	}
	public String getRowIdx() {
	    return rowIdx;
	}
	public void setRowIdx(String rowIdx) {
	    this.rowIdx = rowIdx;
	}
	public String getRoww() {
	    return roww;
	}
	public void setRoww(String roww) {
	    this.roww = roww;
	}
	public String getSubstance() {
	    return substance;
	}
	public void setSubstance(String substance) {
	    this.substance = substance;
	}
	public String getTier() {
	    return tier;
	}
	public void setTier(String tier) {
	    this.tier = tier;
	}
	public String getUnno() {
	    return unno;
	}
	public void setUnno(String unno) {
	    this.unno = unno;
	}
	public String getVslCd() {
	    return vslCd;
	}
	public void setVslCd(String vslCd) {
	    this.vslCd = vslCd;
	}
	public double getWgt() {
	    return wgt;
	}
	public void setWgt(double wgt) {
	    this.wgt = wgt;
	}
	public String getYardId() {
	    return yardId;
	}
	public void setYardId(String yardId) {
	    this.yardId = yardId;
	}
	
	
	/**
	 * @return Returns the arrvSaId.
	 */
	public String getArrvSaId() {
	    return arrvSaId;
	}
	/**
	 * @param arrvSaId The arrvSaId to set.
	 */
	public void setArrvSaId(String arrvSaId) {
	    this.arrvSaId = arrvSaId;
	}
	/**
	 * @return Returns the berthLoc.
	 */
	public String getBerthLoc() {
	    return berthLoc;
	}
	/**
	 * @param berthLoc The berthLoc to set.
	 */
	public void setBerthLoc(String berthLoc) {
	    this.berthLoc = berthLoc;
	}
	/**
	 * @return Returns the eta.
	 */
	public String getEta() {
	    return eta;
	}
	/**
	 * @param eta The eta to set.
	 */
	public void setEta(String eta) {
	    this.eta = eta;
	}
	/**
	 * @return Returns the inbVoy.
	 */
	public String getInbVoy() {
	    return inbVoy;
	}
	/**
	 * @param inbVoy The inbVoy to set.
	 */
	public void setInbVoy(String inbVoy) {
	    this.inbVoy = inbVoy;
	}
	/**
	 * @return Returns the lastPort.
	 */
	public String getLastPort() {
	    return lastPort;
	}
	/**
	 * @param lastPort The lastPort to set.
	 */
	public void setLastPort(String lastPort) {
	    this.lastPort = lastPort;
	}
	/**
	 * @return Returns the nxtPort.
	 */
	public String getNxtPort() {
	    return nxtPort;
	}
	/**
	 * @param nxtPort The nxtPort to set.
	 */
	public void setNxtPort(String nxtPort) {
	    this.nxtPort = nxtPort;
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

	public String getPkgtpcdnm() {
	    return pkgtpcdnm;
	}
	public void setPkgtpcdnm(String pkgtpcdnm) {
	    this.pkgtpcdnm = pkgtpcdnm;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
