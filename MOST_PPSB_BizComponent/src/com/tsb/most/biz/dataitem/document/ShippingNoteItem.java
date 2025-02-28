/**
* DocumentItem.java
*
* Created on   : Aug 1, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.4 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Aug 1, 2007   Mr Dong-Yeob Lee 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author USER
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ShippingNoteItem extends DataItem { 
	private String callYear;
	private String callSeq;
	private String vslCd;
	private String vslCallId;
    private String delvTpCd;
    private String shipgNoteNo;
    private String newShipgNoteNo;
    private String cbrNo;
    private String mfDocId;
    private String newMfDocId;
    private String shprNm;
    private String cnsneNm;
    private double cgWgt;
    private double cgMsrmt;
    private String tsptTpCd;    
    private String statCd;
    private String portOfDis;
    private int pkgQty;
    private String pkgTpCd;
    private String ackDt;
    private String ackBy;
    private String crudFlag;
    private String chk;
    private String tsptComp;
    private String portOfLoad;
    private String cntryOfOrg;
    private String imdg;
    private String unno;    
    private String estArrvDt;
    private String estArrvDt1;//use for date time in grid- Mantis 91787
    private String jpbRefNo;
    private String markNo;
    private String cmdtCdDtl;
    private String cmdtCd;
    private String cmdtCdNm;
    private int pkgQtyDtl;
    private String pkgTpCdDtl;
    private String rmk;
    private String shpr;
    private String shprAddr;
    private String shprAddr1;
    private String shprAddr2;
    private String shprAddr3;
    private String shprAddr4;    
    private String cnsne;
    private String cnsneAddr;
    private String cnsneAddr1;
    private String cnsneAddr2;
    private String cnsneAddr3;
    private String cnsneAddr4; 
    private int seq;
    private String catgCd;
    private String catgCdNm;
    private String fwrd;
    private String blNo;
    private String cgTpCd;
    private String cgTpCdNm;
    private String fzRefNo;
    private String pkg;
    private String pkgNm;
    private String pkgTpCdNm;
    private String fwrdNm;
    private String fwrdAddr;
    private String tsptCompNm;    
    private double cgWth;
    private double cgHgt;
    private double cgLen;
    private String userId;
    private int no;
    private String fnlDest;
    private String delvTpCdNm;
    private String tsptTpCdNm;
    private String dgTol;
    private String shprTol;
    private String cnsneTol;
    private String tsptTpCdDtl;
    private String divCd;   
    private String wgtDtl;
    private String msrmtDtl;
    private double wgtConveyor;
    private double wgtWegon;
    private double wgtLorry;
    private int seqLorry;
    private int seqWegon;
    private int seqConveyor;
    private String fwrdSumitDt;
    private String saSumitDt;
    private String fwrdSumitBy;
    private String saSumitBy;
    private String sumitBy;
    private String sumitDt;
    private String authority;
    private String grYN;
    private String saveType;
    private String statCdNm;
    private String customsAprvDt;
    private String customsAprvStat;
    private String releaseNo;
    private String cntryOfDest;
    private String dgSeq;
    private String dgStatCd;
    private String dgStatNm;
    private String dgAprvDt;
    private String linked;
    private String ptnrCd;
    private String jpGroup;
    private String adminSubmitByFa;
    private String adminSubmitBySa;
    
    private String workingStatus;
    private String searchType;
    
    private String shippingNoteMode1;
    private String shippingNoteMT1;
    
    private String shippingNoteMode2;
    private String shippingNoteMT2;
    
    //added by Brian (2018/12/25)
    private ArrayList<ShippingNoteItem> goodsDetailItems;
    private ArrayList<ShippingNoteItem> blNoList;
    private ArrayList<ShippingNoteItem> dgSeqList;
    private ArrayList<ShippingNoteItem> shippingNoteList;
    
    
    //added by Brian (2018/12/31)
    //private ArrayList<CodeMasterListItem> deliveryMode;
    //private ArrayList<CodeMasterListItem> ownStatus;
    //private ArrayList<CodeMasterListItem> cargoType;
    
    //added by Mandy (2019/06/13)
    private ArrayList<FileUploadItem> uploadItems;
    private ArrayList<DGDeclarationItem> dgItems;
    private String scdNm;
    
    //For RORO
  	private String unitNo;
  	private String brandCd;
  	private String brandNm;
  	private String modelCd;
  	private String modelNm;
  	private String roroMt;
  	private String cbm;
  	private String newYn;
  	private String ixCd;
  	private String action;
  	private String roroSeq;
  	private ArrayList<ShippingNoteItem> unitItems;
  	private String grNo;
  	
  	//CUSP ADP:
  	private String cmdtGroupCd;
    private String cmdtGroupCdNm;
    private String hatchNo;
    private String mafiParentId;
	private String parentCmdt;
	private String goodsDescr;
	private double eachWgt; //each Gross Weight of package
	private double eachMsrmt; //each M3 of package
	private String pkgNumber; //PackageNumber
	private double freightTon; //freightTon
	
	private String cntryOfOrgNm;
	private String portOfDisNm;
	private String fnlDestNm;
	
	private String updUserId;
	private String insUserId;
	private Date updDt;
	private Date insDt;
    
	private String crudDG;
	private String substance;
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
	private String yardId;
	private String empCd;
	private String priCd;
	private String priGrp;
	private String confmBy;
	private String confmDt;
	private String rejBy;
	private String rejDt;
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
	private String lstPortNm;
	private String dgStatus;
	private String telNo;
	private String mobileNo;
	private String engNm;
	private String idNo;
	private String desgination;
	private String docSNNo;
	private String terminal;
	
	private String vslName;
	private String voyage;
	private String shippingAgent;
	private String status;
	private String statusNm;
	private String cancelReg;
	private String submissionDate;
	
	private String cgInoutTp;
	private String mfRefNo;
	private String mfRmk; 
	private String insDtm; 
	private String updDtm; 
	private String opClassCd; 
	
	private String inbVoy;
	private String outbVoy;
	private String vslTp;
	private String vslTpNm;
	private String container;
	private String cgOpTpNm;
	private String vslFlagCd;
	private String vslFlagNm;
	private String saCorpId;
	private String saCorpNm;
	private String lastPortCd;
	private String lastPortNm;
	private String nextPortCd;
	private String nextPortNm;
	private String berthLocNm;
	private String freezoneYn;
	private String terminalType;
	private String submitStat;
	private String docStatApprove;
	private String locCd;
	private String locNm;
	private String shippingAgentNm;
	private String cntrCount;
	private String blCount;
	
	private String nilMfYN;
	private String reqType;
	private String zb55Status;
	private String docApprvTpCd;
	private String rtnStatus;
	
	private Date etd;
	private Date atb;
	private Date atd;
	private Date ata;
	
	private String isValidated;
	
	private String pkgNo;
	private String pkgDesc;
	private String pkgMt;
	private String pkgM3;
	private String width;
	private String height;
	private String length;
	private String opeClassCd;
	private String domesticChk;
	private String projectCargo;
	private String wgtChk;
	
	private String bondedWhYn;
	private String additionalChk;
	private String lotNo;
	
	private String pkgRmk;
	
	private String rhdlNo;
	private String dmt;
	private String dm3;
	private String dqty;
	private String dLrMt;
	private String dLrM3;
	private String dLrQty;
	private String dVslMt;
	private String dVslM3;
	private String dVslQty;
	private String imt;
	private String im3;
	private String iqty;
	private String tmnlHoldFlag;
	private String locId;
	private String hsCode;
	private String hsNm;
	private String scn;
	
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	private ArrayList<ShippingNoteItem> pkgItems;
	
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public ArrayList<DGDeclarationItem> getDgItems() {
		return dgItems;
	}
	public void setDgItems(ArrayList<DGDeclarationItem> dgItems) {
		this.dgItems = dgItems;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<ShippingNoteItem> getDgSeqList() {
		return dgSeqList;
	}
	public void setDgSeqList(ArrayList<ShippingNoteItem> dgSeqList) {
		this.dgSeqList = dgSeqList;
	}
	public ArrayList<ShippingNoteItem> getGoodsDetailItems() {
		return goodsDetailItems;
	}
	public void setGoodsDetailItems(ArrayList<ShippingNoteItem> goodsDetailItems) {
		this.goodsDetailItems = goodsDetailItems;
	}
	
	public ArrayList<ShippingNoteItem> getBlNoList() {
		return blNoList;
	}
	public void setBlNoList(ArrayList<ShippingNoteItem> blNoList) {
		this.blNoList = blNoList;
	}
	public String getAdminSubmitBySa() {
        return adminSubmitBySa;
    }
    public void setAdminSubmitBySa(String adminSubmitBySa) {
        this.adminSubmitBySa = adminSubmitBySa;
    }
    public String getAdminSubmitByFa() {
        return adminSubmitByFa;
    }
    public void setAdminSubmitByFa(String adminSubmitByFa) {
        this.adminSubmitByFa = adminSubmitByFa;
    }
    public String getJpGroup() {
        return jpGroup;
    }
    public void setJpGroup(String jpGroup) {
        this.jpGroup = jpGroup;
    }
    public String getReleaseNo() {
        return releaseNo;
    }
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
    /**
     * @return Returns the newShipgNoteNo.
     */
    public String getNewShipgNoteNo() {
        return newShipgNoteNo;
    }
    /**
     * @param newShipgNoteNo The newShipgNoteNo to set.
     */
    public void setNewShipgNoteNo(String newShipgNoteNo) {
        this.newShipgNoteNo = newShipgNoteNo;
    }
    /**
     * @return Returns the ptnrCd.
     */
    public String getPtnrCd() {
        return ptnrCd;
    }
    /**
     * @param ptnrCd The ptnrCd to set.
     */
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getCatgCdNm() {
        return catgCdNm;
    }
    public void setCatgCdNm(String catgCdNm) {
        this.catgCdNm = catgCdNm;
    }
    public String getLinked() {
        return linked;
    }
    public void setLinked(String linked) {
        this.linked = linked;
    }
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }
    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }
    //for printing SN
    private String vslNm,inbVoyage,outbVoyage,sa,saCd,saAddr1,saAddr2,saAddr3,saAddr4,berthLoc,whLoc,eta,orgCntry,cgTpNm;
    
    public String getOutbVoyage() {
        return outbVoyage;
    }
    public void setOutbVoyage(String outbVoyage) {
        this.outbVoyage = outbVoyage;
    }
    public String getStatCdNm() {
        return statCdNm;
    }
    public void setStatCdNm(String statCdNm) {
        this.statCdNm = statCdNm;
    }
    public String getSaveType() {
        return saveType;
    }
    public void setSaveType(String saveType) {
        this.saveType = saveType;
    }
    public String getGrYN() {
        return grYN;
    }
    public void setGrYN(String grYN) {
        this.grYN = grYN;
    }
    public String getAuthority() {
        return authority;
    }
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getVslCd() {
		return vslCd;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
    public String getSumitDt() {
        return sumitDt;
    }
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    public String getSumitBy() {
        return sumitBy;
    }
    public void setSumitBy(String sumitBy) {
        this.sumitBy = sumitBy;
    }
    public String getFwrdSumitBy() {
        return fwrdSumitBy;
    }
    public void setFwrdSumitBy(String fwrdSumitBy) {
        this.fwrdSumitBy = fwrdSumitBy;
    }
    public String getFwrdSumitDt() {
        return fwrdSumitDt;
    }
    public void setFwrdSumitDt(String fwrdSumitDt) {
        this.fwrdSumitDt = fwrdSumitDt;
    }
    public String getSaSumitBy() {
        return saSumitBy;
    }
    public void setSaSumitBy(String saSumitBy) {
        this.saSumitBy = saSumitBy;
    }
    public String getSaSumitDt() {
        return saSumitDt;
    }
    public void setSaSumitDt(String saSumitDt) {
        this.saSumitDt = saSumitDt;
    }
    public int getSeqConveyor() {
        return seqConveyor;
    }
    public void setSeqConveyor(int seqConveyor) {
        this.seqConveyor = seqConveyor;
    }
    public int getSeqLorry() {
        return seqLorry;
    }
    public void setSeqLorry(int seqLorry) {
        this.seqLorry = seqLorry;
    }
    public int getSeqWegon() {
        return seqWegon;
    }
    public void setSeqWegon(int seqWegon) {
        this.seqWegon = seqWegon;
    }
    public String getCmdtCdDtl() {
        return cmdtCdDtl;
    }
    public void setCmdtCdDtl(String cmdtCdDtl) {
        this.cmdtCdDtl = cmdtCdDtl;
    }
    public double getWgtConveyor() {
        return wgtConveyor;
    }
    public void setWgtConveyor(double wgtConveyor) {
        this.wgtConveyor = wgtConveyor;
    }
    public double getWgtLorry() {
        return wgtLorry;
    }
    public void setWgtLorry(double wgtLorry) {
        this.wgtLorry = wgtLorry;
    }
    public double getWgtWegon() {
        return wgtWegon;
    }
    public void setWgtWegon(double wgtWegon) {
        this.wgtWegon = wgtWegon;
    }
    public String getMsrmtDtl() {
        return msrmtDtl;
    }
    public void setMsrmtDtl(String msrmtDtl) {
        this.msrmtDtl = msrmtDtl;
    }
    public String getWgtDtl() {
        return wgtDtl;
    }
    public void setWgtDtl(String wgtDtl) {
        this.wgtDtl = wgtDtl;
    }  
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getTsptTpCdDtl() {
        return tsptTpCdDtl;
    }
    public void setTsptTpCdDtl(String tsptTpCdDtl) {
        this.tsptTpCdDtl = tsptTpCdDtl;
    }
    public String getCmdtCdNm() {
        return cmdtCdNm;
    }
    public void setCmdtCdNm(String cmdtCdNm) {
        this.cmdtCdNm = cmdtCdNm;
    }
    public String getCnsneTol() {
        return cnsneTol;
    }
    public void setCnsneTol(String cnsneTol) {
        this.cnsneTol = cnsneTol;
    }
    public String getDgTol() {
        return dgTol;
    }
    public void setDgTol(String dgTol) {
        this.dgTol = dgTol;
    }
    public String getShprTol() {
        return shprTol;
    }
    public void setShprTol(String shprTol) {
        this.shprTol = shprTol;
    }
    public double getCgMsrmt() {
        return cgMsrmt;
    }
    public void setCgMsrmt(double cgMsrmt) {
        this.cgMsrmt = cgMsrmt;
    }
    public double getCgWgt() {
        return cgWgt;
    }
    public void setCgWgt(double cgWgt) {
        this.cgWgt = cgWgt;
    }
    public String getDelvTpCdNm() {
        return delvTpCdNm;
    }
    public void setDelvTpCdNm(String delvTpCdNm) {
        this.delvTpCdNm = delvTpCdNm;
    }
    public String getTsptTpCdNm() {
        return tsptTpCdNm;
    }
    public void setTsptTpCdNm(String tsptTpCdNm) {
        this.tsptTpCdNm = tsptTpCdNm;
    }
    public String getFnlDest() {
        return fnlDest;
    }
    public void setFnlDest(String fnlDest) {
        this.fnlDest = fnlDest;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    
    public double getCgHgt() {
        return cgHgt;
    }
    public void setCgHgt(double cgHgt) {
        this.cgHgt = cgHgt;
    }
    public double getCgLen() {
        return cgLen;
    }
    public void setCgLen(double cgLen) {
        this.cgLen = cgLen;
    }
    public double getCgWth() {
        return cgWth;
    }
    public void setCgWth(double cgWth) {
        this.cgWth = cgWth;
    }
    public String getFwrdNm() {
        return fwrdNm;
    }
    public void setFwrdNm(String fwrdNm) {
        this.fwrdNm = fwrdNm;
    }
    public String getPkgTpCdNm() {
        return pkgTpCdNm;
    }
    public void setPkgTpCdNm(String pkgTpCdNm) {
        this.pkgTpCdNm = pkgTpCdNm;
    }
    public String getTsptCompNm() {
        return tsptCompNm;
    }
    public void setTsptCompNm(String tsptCompNm) {
        this.tsptCompNm = tsptCompNm;
    }
    public String getPkgNm() {
        return pkgNm;
    }
    public void setPkgNm(String pkgNm) {
        this.pkgNm = pkgNm;
    }
    public String getPkg() {
        return pkg;
    }
    public void setPkg(String pkg) {
        this.pkg = pkg;
    }
    public String getFzRefNo() {
        return fzRefNo;
    }
    public void setFzRefNo(String fzRefNo) {
        this.fzRefNo = fzRefNo;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getFwrd() {
        return fwrd;
    }
    public void setFwrd(String fwrd) {
        this.fwrd = fwrd;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public int getSeq() {
        return seq;
    }
    public void setSeq(int seq) {
        this.seq = seq;
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
    public String getCnsneAddr() {
        return cnsneAddr;
    }
    public void setCnsneAddr(String cnsneAddr) {
        this.cnsneAddr = cnsneAddr;
    }
    public String getCnsneAddr4() {
        return cnsneAddr4;
    }
    public void setCnsneAddr4(String cnsneAddr4) {
        this.cnsneAddr4 = cnsneAddr4;
    }
    public String getCnsneAddr2() {
        return cnsneAddr2;
    }
    public void setCnsneAddr2(String cnsneAddr2) {
        this.cnsneAddr2 = cnsneAddr2;
    }
    public String getCnsneAddr3() {
        return cnsneAddr3;
    }
    public void setCnsneAddr3(String cnsneAddr3) {
        this.cnsneAddr3 = cnsneAddr3;
    }
    public String getCntryOfOrg() {
        return cntryOfOrg;
    }
    public void setCntryOfOrg(String cntryOfOrg) {
        this.cntryOfOrg = cntryOfOrg;
    }
    
//    public Date getEstArrvDt() {
//		return estArrvDt;
//	}
//	public void setEstArrvDt(Date estArrvDt) {
//		this.estArrvDt = estArrvDt;
//	}
	public String getImdg() {
        return imdg;
    }
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    public String getJpbRefNo() {
        return jpbRefNo;
    }
    public void setJpbRefNo(String jpbRefNo) {
        this.jpbRefNo = jpbRefNo;
    }
    public String getMarkNo() {
        return markNo;
    }
    public void setMarkNo(String markNo) {
        this.markNo = markNo;
    }
    public int getPkgQtyDtl() {
        return pkgQtyDtl;
    }
    public void setPkgQtyDtl(int pkgQtyDtl) {
        this.pkgQtyDtl = pkgQtyDtl;
    }
    public String getPkgTpCdDtl() {
        return pkgTpCdDtl;
    }
    public void setPkgTpCdDtl(String pkgTpCdDtl) {
        this.pkgTpCdDtl = pkgTpCdDtl;
    }
    public String getPortOfLoad() {
        return portOfLoad;
    }
    public void setPortOfLoad(String portOfLoad) {
        this.portOfLoad = portOfLoad;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }    

    public String getFwrdAddr() {
        return fwrdAddr;
    }
    public void setFwrdAddr(String fwrdAddr) {
        this.fwrdAddr = fwrdAddr;
    }
    public String getShpr() {
        return shpr;
    }
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    public String getShprAddr() {
        return shprAddr;
    }
    public void setShprAddr(String shprAddr) {
        this.shprAddr = shprAddr;
    }
    public String getShprAddr4() {
        return shprAddr4;
    }
    public void setShprAddr4(String shprAddr4) {
        this.shprAddr4 = shprAddr4;
    }
    public String getShprAddr2() {
        return shprAddr2;
    }
    public void setShprAddr2(String shprAddr2) {
        this.shprAddr2 = shprAddr2;
    }
    public String getShprAddr3() {
        return shprAddr3;
    }
    public void setShprAddr3(String shprAddr3) {
        this.shprAddr3 = shprAddr3;
    }
    public String getUnno() {
        return unno;
    }
    public void setUnno(String unno) {
        this.unno = unno;
    }
   
    public String getTsptComp() {
        return tsptComp;
    }
    public void setTsptComp(String tsptComp) {
        this.tsptComp = tsptComp;
    }
    public String getChk() {
        return chk;
    }
    public void setChk(String chk) {
        this.chk = chk;
    }
    public String getCrudFlag() {
        return crudFlag;
    }
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
    public String getAckBy() {
        return ackBy;
    }
    public void setAckBy(String ackBy) {
        this.ackBy = ackBy;
    }
    public String getAckDt() {
        return ackDt;
    }
    public void setAckDt(String ackDt) {
        this.ackDt = ackDt;
    }
    public String getCbrNo() {
        return cbrNo;
    }
    public void setCbrNo(String cbrNo) {
        this.cbrNo = cbrNo;
    }
    
    
    public String getCnsneNm() {
        return cnsneNm;
    }
    public void setCnsneNm(String cnsneNm) {
        this.cnsneNm = cnsneNm;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
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
    public String getPortOfDis() {
        return portOfDis;
    }
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getShprNm() {
        return shprNm;
    }
    public void setShprNm(String shprNm) {
        this.shprNm = shprNm;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }   
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    
    /**
     * @return Returns the customsAprvDt.
     */
    public String getCustomsAprvDt() {
        return customsAprvDt;
    }
    /**
     * @param customsAprvDt The customsAprvDt to set.
     */
    public void setCustomsAprvDt(String customAprvDt) {
        this.customsAprvDt = customAprvDt;
    }
    /**
     * @return Returns the customsAprvStat.
     */
    public String getCustomsAprvStat() {
        return customsAprvStat;
    }
    /**
     * @param customsAprvStat The customsAprvStat to set.
     */
    public void setCustomsAprvStat(String customAprvStat) {
        this.customsAprvStat = customAprvStat;
    }
    public String getCntryOfDest() {
        return cntryOfDest;
    }
    public void setCntryOfDest(String cntryOfDest) {
        this.cntryOfDest = cntryOfDest;
    }
    public String getInbVoyage() {
        return inbVoyage;
    }
    public void setInbVoyage(String inbVoyage) {
        this.inbVoyage = inbVoyage;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }
    public String getSaAddr1() {
        return saAddr1;
    }
    public void setSaAddr1(String saAddr1) {
        this.saAddr1 = saAddr1;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getWhLoc() {
        return whLoc;
    }
    public void setWhLoc(String whLoc) {
        this.whLoc = whLoc;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getCgTpNm() {
        return cgTpNm;
    }
    public void setCgTpNm(String cgTpNm) {
        this.cgTpNm = cgTpNm;
    }
    public String getOrgCntry() {
        return orgCntry;
    }
    public void setOrgCntry(String orgCntry) {
        this.orgCntry = orgCntry;
    }
    public String getSaAddr2() {
        return saAddr2;
    }
    public void setSaAddr2(String saAddr2) {
        this.saAddr2 = saAddr2;
    }
    public String getSaAddr3() {
        return saAddr3;
    }
    public void setSaAddr3(String saAddr3) {
        this.saAddr3 = saAddr3;
    }
    public String getSaAddr4() {
        return saAddr4;
    }
    public void setSaAddr4(String saAddr4) {
        this.saAddr4 = saAddr4;
    }
    public String getDgSeq() {
        return dgSeq;
    }
    public void setDgSeq(String dgSeq) {
        this.dgSeq = dgSeq;
    }
    public String getDgStatCd() {
        return dgStatCd;
    }
    public void setDgStatCd(String dgStatCd) {
        this.dgStatCd = dgStatCd;
    }
    public String getDgAprvDt() {
        return dgAprvDt;
    }
    public void setDgAprvDt(String aprvDt) {
        this.dgAprvDt = aprvDt;
    }
    public String getDgStatNm() {
        return dgStatNm;
    }
    public void setDgStatNm(String dgStatNm) {
        this.dgStatNm = dgStatNm;
    }
    
	public String getShippingNoteMode1() {
		return shippingNoteMode1;
	}
	public void setShippingNoteMode1(String shippingNoteMode1) {
		this.shippingNoteMode1 = shippingNoteMode1;
	}
	
	public String getShprAddr1() {
		return shprAddr1;
	}
	public void setShprAddr1(String shprAddr1) {
		this.shprAddr1 = shprAddr1;
	}
	public String getCnsneAddr1() {
		return cnsneAddr1;
	}
	public void setCnsneAddr1(String cnsneAddr1) {
		this.cnsneAddr1 = cnsneAddr1;
	}
	public String getShippingNoteMT1() {
		return shippingNoteMT1;
	}
	public void setShippingNoteMT1(String shippingNoteMT1) {
		this.shippingNoteMT1 = shippingNoteMT1;
	}
	public String getShippingNoteMode2() {
		return shippingNoteMode2;
	}
	public void setShippingNoteMode2(String shippingNoteMode2) {
		this.shippingNoteMode2 = shippingNoteMode2;
	}
	public String getShippingNoteMT2() {
		return shippingNoteMT2;
	}
	public void setShippingNoteMT2(String shippingNoteMT2) {
		this.shippingNoteMT2 = shippingNoteMT2;
	}
	
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	
	public ArrayList<ShippingNoteItem> getShippingNoteList() {
		return shippingNoteList;
	}
	public void setShippingNoteList(ArrayList<ShippingNoteItem> shippingNoteList) {
		this.shippingNoteList = shippingNoteList;
	}
	public String getEstArrvDt1() {
		return estArrvDt1;
	}
	public void setEstArrvDt1(String estArrvDt1) {
		this.estArrvDt1 = estArrvDt1;
	}

    public String getSaCd() {
        return saCd;
    }

    public void setSaCd(String saCd) {
        this.saCd = saCd;
    }
	public String getScdNm() {
		return this.shipgNoteNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getNewMfDocId() {
		return newMfDocId;
	}
	public void setNewMfDocId(String newMfDocId) {
		this.newMfDocId = newMfDocId;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getRoroMt() {
		return roroMt;
	}
	public void setRoroMt(String roroMt) {
		this.roroMt = roroMt;
	}
	public String getCbm() {
		return cbm;
	}
	public void setCbm(String cbm) {
		this.cbm = cbm;
	}
	public String getNewYn() {
		return newYn;
	}
	public void setNewYn(String newYn) {
		this.newYn = newYn;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
	}
	public ArrayList<ShippingNoteItem> getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(ArrayList<ShippingNoteItem> unitItems) {
		this.unitItems = unitItems;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getCmdtGroupCd() {
		return cmdtGroupCd;
	}
	public void setCmdtGroupCd(String cmdtGroupCd) {
		this.cmdtGroupCd = cmdtGroupCd;
	}
	public String getCmdtGroupCdNm() {
		return cmdtGroupCdNm;
	}
	public void setCmdtGroupCdNm(String cmdtGroupCdNm) {
		this.cmdtGroupCdNm = cmdtGroupCdNm;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getMafiParentId() {
		return mafiParentId;
	}
	public void setMafiParentId(String mafiParentId) {
		this.mafiParentId = mafiParentId;
	}
	public String getParentCmdt() {
		return parentCmdt;
	}
	public void setParentCmdt(String parentCmdt) {
		this.parentCmdt = parentCmdt;
	}
	public String getGoodsDescr() {
		return goodsDescr;
	}
	public void setGoodsDescr(String goodsDescr) {
		this.goodsDescr = goodsDescr;
	}
	public double getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(double eachWgt) {
		this.eachWgt = eachWgt;
	}
	public double getEachMsrmt() {
		return eachMsrmt;
	}
	public void setEachMsrmt(double eachMsrmt) {
		this.eachMsrmt = eachMsrmt;
	}
	public String getPkgNumber() {
		return pkgNumber;
	}
	public void setPkgNumber(String pkgNumber) {
		this.pkgNumber = pkgNumber;
	}
	public double getFreightTon() {
		return freightTon;
	}
	public void setFreightTon(double freightTon) {
		this.freightTon = freightTon;
	}
	public String getCntryOfOrgNm() {
		return cntryOfOrgNm;
	}
	public void setCntryOfOrgNm(String cntryOfOrgNm) {
		this.cntryOfOrgNm = cntryOfOrgNm;
	}
	public String getPortOfDisNm() {
		return portOfDisNm;
	}
	public void setPortOfDisNm(String portOfDisNm) {
		this.portOfDisNm = portOfDisNm;
	}
	public String getFnlDestNm() {
		return fnlDestNm;
	}
	public void setFnlDestNm(String fnlDestNm) {
		this.fnlDestNm = fnlDestNm;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public Date getUpdDt() {
		return updDt;
	}
	public void setUpdDt(Date updDt) {
		this.updDt = updDt;
	}
	public Date getInsDt() {
		return insDt;
	}
	public void setInsDt(Date insDt) {
		this.insDt = insDt;
	}
	public String getEstArrvDt() {
		return estArrvDt;
	}
	public void setEstArrvDt(String estArrvDt) {
		this.estArrvDt = estArrvDt;
	}
	public String getCrudDG() {
		return crudDG;
	}
	public void setCrudDG(String crudDG) {
		this.crudDG = crudDG;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getDelv() {
		return delv;
	}
	public void setDelv(String delv) {
		this.delv = delv;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public String getBlock() {
		return block;
	}
	public void setBlock(String block) {
		this.block = block;
	}
	public String getBay() {
		return bay;
	}
	public void setBay(String bay) {
		this.bay = bay;
	}
	public String getRoww() {
		return roww;
	}
	public void setRoww(String roww) {
		this.roww = roww;
	}
	public String getTier() {
		return tier;
	}
	public void setTier(String tier) {
		this.tier = tier;
	}
	public String getBayIdx() {
		return bayIdx;
	}
	public void setBayIdx(String bayIdx) {
		this.bayIdx = bayIdx;
	}
	public String getRowIdx() {
		return rowIdx;
	}
	public void setRowIdx(String rowIdx) {
		this.rowIdx = rowIdx;
	}
	public String getDgChk() {
		return dgChk;
	}
	public void setDgChk(String dgChk) {
		this.dgChk = dgChk;
	}
	public String getCmplChk() {
		return cmplChk;
	}
	public void setCmplChk(String cmplChk) {
		this.cmplChk = cmplChk;
	}
	public String getPackingGrp() {
		return packingGrp;
	}
	public void setPackingGrp(String packingGrp) {
		this.packingGrp = packingGrp;
	}
	public String getRmk1() {
		return rmk1;
	}
	public void setRmk1(String rmk1) {
		this.rmk1 = rmk1;
	}
	public String getYardId() {
		return yardId;
	}
	public void setYardId(String yardId) {
		this.yardId = yardId;
	}
	public String getEmpCd() {
		return empCd;
	}
	public void setEmpCd(String empCd) {
		this.empCd = empCd;
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
	public String getHazChem() {
		return hazChem;
	}
	public void setHazChem(String hazChem) {
		this.hazChem = hazChem;
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
	public String getRmk2() {
		return rmk2;
	}
	public void setRmk2(String rmk2) {
		this.rmk2 = rmk2;
	}
	public String getImpNm() {
		return impNm;
	}
	public void setImpNm(String impNm) {
		this.impNm = impNm;
	}
	public String getImpAddr() {
		return impAddr;
	}
	public void setImpAddr(String impAddr) {
		this.impAddr = impAddr;
	}
	public String getFlashPnt() {
		return flashPnt;
	}
	public void setFlashPnt(String flashPnt) {
		this.flashPnt = flashPnt;
	}
	public String getExpNm() {
		return expNm;
	}
	public void setExpNm(String expNm) {
		this.expNm = expNm;
	}
	public String getExpAddr() {
		return expAddr;
	}
	public void setExpAddr(String expAddr) {
		this.expAddr = expAddr;
	}
	public String getFreeZoneDiv() {
		return freeZoneDiv;
	}
	public void setFreeZoneDiv(String freeZoneDiv) {
		this.freeZoneDiv = freeZoneDiv;
	}
	public String getLstPortNm() {
		return lstPortNm;
	}
	public void setLstPortNm(String lstPortNm) {
		this.lstPortNm = lstPortNm;
	}
	public String getDgStatus() {
		return dgStatus;
	}
	public void setDgStatus(String dgStatus) {
		this.dgStatus = dgStatus;
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
	public String getDocSNNo() {
		return docSNNo;
	}
	public void setDocSNNo(String docSNNo) {
		this.docSNNo = docSNNo;
	}
	public String getTerminal() {
		return terminal;
	}
	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}
	public String getVslName() {
		return vslName;
	}
	public void setVslName(String vslName) {
		this.vslName = vslName;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getShippingAgent() {
		return shippingAgent;
	}
	public void setShippingAgent(String shippingAgent) {
		this.shippingAgent = shippingAgent;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusNm() {
		return statusNm;
	}
	public void setStatusNm(String statusNm) {
		this.statusNm = statusNm;
	}
	public String getCancelReg() {
		return cancelReg;
	}
	public void setCancelReg(String cancelReg) {
		this.cancelReg = cancelReg;
	}
	public String getSubmissionDate() {
		return submissionDate;
	}
	public void setSubmissionDate(String submissionDate) {
		this.submissionDate = submissionDate;
	}
	public String getCgInoutTp() {
		return cgInoutTp;
	}
	public void setCgInoutTp(String cgInoutTp) {
		this.cgInoutTp = cgInoutTp;
	}
	public String getMfRefNo() {
		return mfRefNo;
	}
	public void setMfRefNo(String mfRefNo) {
		this.mfRefNo = mfRefNo;
	}
	public String getMfRmk() {
		return mfRmk;
	}
	public void setMfRmk(String mfRmk) {
		this.mfRmk = mfRmk;
	}
	public String getInsDtm() {
		return insDtm;
	}
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}
	public String getUpdDtm() {
		return updDtm;
	}
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
	public String getOpClassCd() {
		return opClassCd;
	}
	public void setOpClassCd(String opClassCd) {
		this.opClassCd = opClassCd;
	}
	public String getInbVoy() {
		return inbVoy;
	}
	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}
	public String getOutbVoy() {
		return outbVoy;
	}
	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getVslTpNm() {
		return vslTpNm;
	}
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}
	public String getContainer() {
		return container;
	}
	public void setContainer(String container) {
		this.container = container;
	}
	public String getCgOpTpNm() {
		return cgOpTpNm;
	}
	public void setCgOpTpNm(String cgOpTpNm) {
		this.cgOpTpNm = cgOpTpNm;
	}
	public String getVslFlagCd() {
		return vslFlagCd;
	}
	public void setVslFlagCd(String vslFlagCd) {
		this.vslFlagCd = vslFlagCd;
	}
	public String getVslFlagNm() {
		return vslFlagNm;
	}
	public void setVslFlagNm(String vslFlagNm) {
		this.vslFlagNm = vslFlagNm;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
	public String getSaCorpNm() {
		return saCorpNm;
	}
	public void setSaCorpNm(String saCorpNm) {
		this.saCorpNm = saCorpNm;
	}
	public String getLastPortCd() {
		return lastPortCd;
	}
	public void setLastPortCd(String lastPortCd) {
		this.lastPortCd = lastPortCd;
	}
	public String getLastPortNm() {
		return lastPortNm;
	}
	public void setLastPortNm(String lastPortNm) {
		this.lastPortNm = lastPortNm;
	}
	public String getNextPortCd() {
		return nextPortCd;
	}
	public void setNextPortCd(String nextPortCd) {
		this.nextPortCd = nextPortCd;
	}
	public String getNextPortNm() {
		return nextPortNm;
	}
	public void setNextPortNm(String nextPortNm) {
		this.nextPortNm = nextPortNm;
	}
	public String getBerthLocNm() {
		return berthLocNm;
	}
	public void setBerthLocNm(String berthLocNm) {
		this.berthLocNm = berthLocNm;
	}
	public String getFreezoneYn() {
		return freezoneYn;
	}
	public void setFreezoneYn(String freezoneYn) {
		this.freezoneYn = freezoneYn;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public String getSubmitStat() {
		return submitStat;
	}
	public void setSubmitStat(String submitStat) {
		this.submitStat = submitStat;
	}
	public String getDocStatApprove() {
		return docStatApprove;
	}
	public void setDocStatApprove(String docStatApprove) {
		this.docStatApprove = docStatApprove;
	}
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getShippingAgentNm() {
		return shippingAgentNm;
	}
	public void setShippingAgentNm(String shippingAgentNm) {
		this.shippingAgentNm = shippingAgentNm;
	}
	public String getCntrCount() {
		return cntrCount;
	}
	public void setCntrCount(String cntrCount) {
		this.cntrCount = cntrCount;
	}
	public String getBlCount() {
		return blCount;
	}
	public void setBlCount(String blCount) {
		this.blCount = blCount;
	}
	public String getNilMfYN() {
		return nilMfYN;
	}
	public void setNilMfYN(String nilMfYN) {
		this.nilMfYN = nilMfYN;
	}
	public String getReqType() {
		return reqType;
	}
	public void setReqType(String reqType) {
		this.reqType = reqType;
	}
	public String getZb55Status() {
		return zb55Status;
	}
	public void setZb55Status(String zb55Status) {
		this.zb55Status = zb55Status;
	}
	public String getDocApprvTpCd() {
		return docApprvTpCd;
	}
	public void setDocApprvTpCd(String docApprvTpCd) {
		this.docApprvTpCd = docApprvTpCd;
	}
	public String getRtnStatus() {
		return rtnStatus;
	}
	public void setRtnStatus(String rtnStatus) {
		this.rtnStatus = rtnStatus;
	}
	public Date getEtd() {
		return etd;
	}
	public void setEtd(Date etd) {
		this.etd = etd;
	}
	public Date getAtb() {
		return atb;
	}
	public void setAtb(Date atb) {
		this.atb = atb;
	}
	public Date getAtd() {
		return atd;
	}
	public void setAtd(Date atd) {
		this.atd = atd;
	}
	public Date getAta() {
		return ata;
	}
	public void setAta(Date ata) {
		this.ata = ata;
	}
	public String getIsValidated() {
		return isValidated;
	}
	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getPkgDesc() {
		return pkgDesc;
	}
	public void setPkgDesc(String pkgDesc) {
		this.pkgDesc = pkgDesc;
	}
	public String getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(String pkgMt) {
		this.pkgMt = pkgMt;
	}
	public String getPkgM3() {
		return pkgM3;
	}
	public void setPkgM3(String pkgM3) {
		this.pkgM3 = pkgM3;
	}
	public ArrayList<ShippingNoteItem> getPkgItems() {
		return pkgItems;
	}
	public void setPkgItems(ArrayList<ShippingNoteItem> pkgItems) {
		this.pkgItems = pkgItems;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getProjectCargo() {
		return projectCargo;
	}
	public void setProjectCargo(String projectCargo) {
		this.projectCargo = projectCargo;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getBondedWhYn() {
		return bondedWhYn;
	}
	public void setBondedWhYn(String bondedWhYn) {
		this.bondedWhYn = bondedWhYn;
	}
	public String getAdditionalChk() {
		return additionalChk;
	}
	public void setAdditionalChk(String additionalChk) {
		this.additionalChk = additionalChk;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getPkgRmk() {
		return pkgRmk;
	}
	public void setPkgRmk(String pkgRmk) {
		this.pkgRmk = pkgRmk;
	}
	public String getDmt() {
		return dmt;
	}
	public void setDmt(String dmt) {
		this.dmt = dmt;
	}
	public String getDm3() {
		return dm3;
	}
	public void setDm3(String dm3) {
		this.dm3 = dm3;
	}
	public String getDqty() {
		return dqty;
	}
	public void setDqty(String dqty) {
		this.dqty = dqty;
	}
	public String getdLrMt() {
		return dLrMt;
	}
	public void setdLrMt(String dLrMt) {
		this.dLrMt = dLrMt;
	}
	public String getdLrM3() {
		return dLrM3;
	}
	public void setdLrM3(String dLrM3) {
		this.dLrM3 = dLrM3;
	}
	public String getdLrQty() {
		return dLrQty;
	}
	public void setdLrQty(String dLrQty) {
		this.dLrQty = dLrQty;
	}
	public String getdVslMt() {
		return dVslMt;
	}
	public void setdVslMt(String dVslMt) {
		this.dVslMt = dVslMt;
	}
	public String getdVslM3() {
		return dVslM3;
	}
	public void setdVslM3(String dVslM3) {
		this.dVslM3 = dVslM3;
	}
	public String getdVslQty() {
		return dVslQty;
	}
	public void setdVslQty(String dVslQty) {
		this.dVslQty = dVslQty;
	}
	public String getImt() {
		return imt;
	}
	public void setImt(String imt) {
		this.imt = imt;
	}
	public String getIm3() {
		return im3;
	}
	public void setIm3(String im3) {
		this.im3 = im3;
	}
	public String getIqty() {
		return iqty;
	}
	public void setIqty(String iqty) {
		this.iqty = iqty;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getTmnlHoldFlag() {
		return tmnlHoldFlag;
	}
	public void setTmnlHoldFlag(String tmnlHoldFlag) {
		this.tmnlHoldFlag = tmnlHoldFlag;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getHsCode() {
		return hsCode;
	}
	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	public String getHsNm() {
		return hsNm;
	}
	public void setHsNm(String hsNm) {
		this.hsNm = hsNm;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
