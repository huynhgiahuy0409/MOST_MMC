/**
* ConfirmationSlipItem.java
*
* Created on   : 2007-08-29
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-08-29     Mr Jason Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
//import com.tsb.most.biz.dataitem.controller.VORLiquidBulkItem;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.framework.dataitem.DataItem;

public class ConfirmationSlipItem extends DataItem {

	// ConfirmationSlip Header
	private String vslCallId;
	private String opeTpCd;
	private String shreTk;
	private String fileCatgCd;
	private String shipper;
	private String consignee;
	private String forwarder;
	private String csStatus;
	
	// ConfirmationSlip Detail
	private String cgTpCd;
	private String cgTpNm;
	private String cmdtCd;
	private String cmdtCdNm;
	private String workHatchNo;
	private String pkgTpCd;
	private String clnCd;
	private String topCgCd;
	private String topCln; //merging Clean Code and Top Cargo Code
	private String tmnlOpr;
	private String shprCnsne;
	private String unno;
	private String imdg;
	private String fdest;
	private String tkNo;
	private String blNo;
	private String dgTol;
	private String dgSeq;		// DG_SEQ column of TMT_DG table
	private String dgChk;
	private String remark;
	
	private String cgOptTpCd;	// Cargo Operation
	private String cgOptTpNm;	// Cargo Operation Name
	private String opeTpNm;		// Operation Type Name
	
	private String priorityYn;
	private String mthrVslCallId;
	private String dbYn;
	private String pol;
	private String cnsne;
	private String opeType;
	
	private Date sumitDt;
	private Date tempRedyDt;
	private Date docRedyDt;
	private Date cgRedyDt;
	private Date ultgRedyDt;
	private Date tkRedyDt;  
	
	private String workingStatus;
	
	private int seq;
	private int dschHoseQty;
	private int loadHoseQty;
	private int dschArmQty;
	private int loadArmQty;
	private int crc;
	private long nofLines;
	private long workDd;
	private double opeHr;
	private double wgt;
	private double msrmt;
	private double qty;
	
	// Combo List
	private List operationType;
	private List cargoTypeUnLiquid;
	private List cargoTypeLiquid;
	private List workableHatch;
	private List cargoOperation;
	private List confirmationSlipOperationType;
	private List purposeOfCall;
	private List cargoToDischarge;
	private List berthInfo;
	private List commodityCode;
	private List partnerCode;
	private List pkgTpList;
	private List portList;
	private List imdgList;
	
	
	// Tab Detail Item
	private VesselScheduleItem vesselScheduleListDetail;
	private List confirmationSlip;
	private List confirmationSlipDryBreakBulk;
	private List confirmationSlipLiquidBulk;
	private List vesselInformation;
	private List passengerSummary;
	private List passenger;
	private List isps1;
	private List isps2;
	private List isps3;
	
	private ArrayList<ConfirmationSlipItem> items;
	private ArrayList<FileUploadItem> uploadItems;
	private ArrayList<DGDeclarationItem> dgItems;
	private ArrayList<VesselScheduleItem> cargoSummary;
	
	private String cnsneNm;
	private String cnsneAddr;
	private String shpNm;
	private String shpAddr;
	private String pkgTpNm;
	private String cmdtGrCd;
    private String cmdtGr;
	
    public ArrayList<DGDeclarationItem> getDgItems() {
		return dgItems;
	}
	public void setDgItems(ArrayList<DGDeclarationItem> dgItems) {
		this.dgItems = dgItems;
	}
	public String getOpeType() {
        return opeType;
    }
    public void setOpeType(String opeType) {
        this.opeType = opeType;
    }
    /**
     * @return Returns the cgOptTpNm.
     */
    public String getCgOptTpNm() {
        return cgOptTpNm;
    }
    /**
     * @param cgOptTpNm The cgOptTpNm to set.
     */
    public void setCgOptTpNm(String cgOptTpNm) {
        this.cgOptTpNm = cgOptTpNm;
    }
    /**
     * @return Returns the dbYn.
     */
    public String getDbYn() {
        return dbYn;
    }
    /**
     * @param dbYn The dbYn to set.
     */
    public void setDbYn(String dbYn) {
        this.dbYn = dbYn;
    }
    /**
     * @return Returns the mthrVslCallId.
     */
    public String getMthrVslCallId() {
        return mthrVslCallId;
    }
    /**
     * @param mthrVslCallId The mthrVslCallId to set.
     */
    public void setMthrVslCallId(String mthrVslCallId) {
        this.mthrVslCallId = mthrVslCallId;
    }
    /**
     * @return Returns the priorityYn.
     */
    public String getPriorityYn() {
        return priorityYn;
    }
    /**
     * @param priorityYn The priorityYn to set.
     */
    public void setPriorityYn(String priorityYn) {
        this.priorityYn = priorityYn;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the cgTpCd.
     */
    public String getCgTpCd() {
        return cgTpCd;
    }
    /**
     * @param cgTpCd The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    /**
     * @return Returns the cgTpNm.
     */
    public String getCgTpNm() {
        return cgTpNm;
    }
    /**
     * @param cgTpNm The cgTpNm to set.
     */
    public void setCgTpNm(String cgTpNm) {
        this.cgTpNm = cgTpNm;
    }
    /**
     * @return Returns the clnCd.
     */
    public String getClnCd() {
        return clnCd;
    }
    /**
     * @param clnCd The clnCd to set.
     */
    public void setClnCd(String clnCd) {
        this.clnCd = clnCd;
    }
    /**
     * @return Returns the cmdtCd.
     */
    public String getCmdtCd() {
        return cmdtCd;
    }
    /**
     * @param cmdtCd The cmdtCd to set.
     */
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    /**
     * @return Returns the cmdtCdNm.
     */
    public String getCmdtCdNm() {
        return cmdtCdNm;
    }
    /**
     * @param cmdtCdNm The cmdtCdNm to set.
     */
    public void setCmdtCdNm(String cmdtCdNm) {
        this.cmdtCdNm = cmdtCdNm;
    }
    /**
     * @return Returns the consignee.
     */
    public String getConsignee() {
        return consignee;
    }
    /**
     * @param consignee The consignee to set.
     */
    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }
    /**
     * @return Returns the crc.
     */
    public int getCrc() {
        return crc;
    }
    /**
     * @param crc The crc to set.
     */
    public void setCrc(int crc) {
        this.crc = crc;
    }
    /**
     * @return Returns the dgTol.
     */
    public String getDgTol() {
        return dgTol;
    }
    /**
     * @param dgTol The dgTol to set.
     */
    public void setDgTol(String dgTol) {
        this.dgTol = dgTol;
    }
    /**
     * @return Returns the dschArmQty.
     */
    public int getDschArmQty() {
        return dschArmQty;
    }
    /**
     * @param dschArmQty The dschArmQty to set.
     */
    public void setDschArmQty(int dschArmQty) {
        this.dschArmQty = dschArmQty;
    }
    /**
     * @return Returns the dschHoseQty.
     */
    public int getDschHoseQty() {
        return dschHoseQty;
    }
    /**
     * @param dschHoseQty The dschHoseQty to set.
     */
    public void setDschHoseQty(int dschHoseQty) {
        this.dschHoseQty = dschHoseQty;
    }
    /**
     * @return Returns the fdest.
     */
    public String getFdest() {
        return fdest;
    }
    /**
     * @param fdest The fdest to set.
     */
    public void setFdest(String fdest) {
        this.fdest = fdest;
    }
    /**
     * @return Returns the fileCatgCd.
     */
    public String getFileCatgCd() {
        return fileCatgCd;
    }
    /**
     * @param fileCatgCd The fileCatgCd to set.
     */
    public void setFileCatgCd(String fileCatgCd) {
        this.fileCatgCd = fileCatgCd;
    }
    /**
     * @return Returns the forwarder.
     */
    public String getForwarder() {
        return forwarder;
    }
    /**
     * @param forwarder The forwarder to set.
     */
    public void setForwarder(String forwarder) {
        this.forwarder = forwarder;
    }
    /**
     * @return Returns the imdg.
     */
    public String getImdg() {
        return imdg;
    }
    /**
     * @param imdg The imdg to set.
     */
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    /**
     * @return Returns the loadArmQty.
     */
    public int getLoadArmQty() {
        return loadArmQty;
    }
    /**
     * @param loadArmQty The loadArmQty to set.
     */
    public void setLoadArmQty(int loadArmQty) {
        this.loadArmQty = loadArmQty;
    }
    /**
     * @return Returns the loadHoseQty.
     */
    public int getLoadHoseQty() {
        return loadHoseQty;
    }
    /**
     * @param loadHoseQty The loadHoseQty to set.
     */
    public void setLoadHoseQty(int loadHoseQty) {
        this.loadHoseQty = loadHoseQty;
    }
    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }
    /**
     * @param msrmt The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
    }
    /**
     * @return Returns the nofLines.
     */
    public long getNofLines() {
        return nofLines;
    }
    /**
     * @param nofLines The nofLines to set.
     */
    public void setNofLines(long nofLines) {
        this.nofLines = nofLines;
    }
    /**
     * @return Returns the opeHr.
     */
    public double getOpeHr() {
        return opeHr;
    }
    /**
     * @param opeHr The opeHr to set.
     */
    public void setOpeHr(double opeHr) {
        this.opeHr = opeHr;
    }
    /**
     * @return Returns the opeTpCd.
     */
    public String getOpeTpCd() {
        return opeTpCd;
    }
    /**
     * @param opeTpCd The opeTpCd to set.
     */
    public void setOpeTpCd(String opeTpCd) {
        this.opeTpCd = opeTpCd;
    }
    /**
     * @return Returns the pkgTpCd.
     */
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    /**
     * @param pkgTpCd The pkgTpCd to set.
     */
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    /**
     * @return Returns the qty.
     */
    public double getQty() {
        return qty;
    }
    /**
     * @param qty The qty to set.
     */
    public void setQty(double qty) {
        this.qty = qty;
    }
    /**
     * @return Returns the seq.
     */
    public int getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(int seq) {
        this.seq = seq;
    }
    /**
     * @return Returns the shipper.
     */
    public String getShipper() {
        return shipper;
    }
    /**
     * @param shipper The shipper to set.
     */
    public void setShipper(String shipper) {
        this.shipper = shipper;
    }
    /**
     * @return Returns the shprCnsne.
     */
    public String getShprCnsne() {
        return shprCnsne;
    }
    /**
     * @param shprCnsne The shprCnsne to set.
     */
    public void setShprCnsne(String shprCnsne) {
        this.shprCnsne = shprCnsne;
    }
    /**
     * @return Returns the shreTk.
     */
    public String getShreTk() {
        return shreTk;
    }
    /**
     * @param shreTk The shreTk to set.
     */
    public void setShreTk(String shreTk) {
        this.shreTk = shreTk;
    }
    /**
     * @return Returns the tkNo.
     */
    public String getTkNo() {
        return tkNo;
    }
    /**
     * @param tkNo The tkNo to set.
     */
    public void setTkNo(String tkNo) {
        this.tkNo = tkNo;
    }
    /**
     * @return Returns the tmnlOpr.
     */
    public String getTmnlOpr() {
        return tmnlOpr;
    }
    /**
     * @param tmnlOpr The tmnlOpr to set.
     */
    public void setTmnlOpr(String tmnlOpr) {
        this.tmnlOpr = tmnlOpr;
    }
    /**
     * @return Returns the topCgCd.
     */
    public String getTopCgCd() {
        return topCgCd;
    }
    /**
     * @param topCgCd The topCgCd to set.
     */
    public void setTopCgCd(String topCgCd) {
        this.topCgCd = topCgCd;
    }
    /**
     * @return Returns the unno.
     */
    public String getUnno() {
        return unno;
    }
    /**
     * @param unno The unno to set.
     */
    public void setUnno(String unno) {
        this.unno = unno;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the workDd.
     */
    public long getWorkDd() {
        return workDd;
    }
    /**
     * @param workDd The workDd to set.
     */
    public void setWorkDd(long workDd) {
        this.workDd = workDd;
    }
    /**
     * @return Returns the workHatchNo.
     */
    public String getWorkHatchNo() {
        return workHatchNo;
    }
    /**
     * @param workHatchNo The workHatchNo to set.
     */
    public void setWorkHatchNo(String workHatchNo) {
        this.workHatchNo = workHatchNo;
    }
    public String getTopCln() {
        return topCln;
    }
    public void setTopCln(String topCln) {
        this.topCln = topCln;
    }
    
    /**
     * @return Returns the cgOptTpCd.
     */
    public String getCgOptTpCd() {
        return cgOptTpCd;
    }
    /**
     * @param cgOptTpCd The cgOptTpCd to set.
     */
    public void setCgOptTpCd(String cgOptTpCd) {
        this.cgOptTpCd = cgOptTpCd;
    }
    
    /**
     * @return Returns the opeTpNm.
     */
    public String getOpeTpNm() {
        return opeTpNm;
    }
    /**
     * @param opeTpNm The opeTpNm to set.
     */
    public void setOpeTpNm(String opeTpNm) {
        this.opeTpNm = opeTpNm;
    }
    
    
    /**
     * @return Returns the dgSeq.
     */
    public String getDgSeq() {
        return dgSeq;
    }
    /**
     * @param dgSeq The dgSeq to set.
     */
    public void setDgSeq(String dgSeq) {
        this.dgSeq = dgSeq;
    }
    
    /**
     * @return Returns the dgChk.
     */
    public String getDgChk() {
        return dgChk;
    }
    /**
     * @param dgChk The dgChk to set.
     */
    public void setDgChk(String dgChk) {
        this.dgChk = dgChk;
    }
    public String getCnsne() {
        return cnsne;
    }
    public void setCnsne(String cnsne) {
        this.cnsne = cnsne;
    }
    public String getPol() {
        return pol;
    }
    public void setPol(String pol) {
        this.pol = pol;
    }
	public Date getSumitDt() {
		return sumitDt;
	}
	public void setSumitDt(Date sumitDt) {
		this.sumitDt = sumitDt;
	}
	public Date getTempRedyDt() {
		return tempRedyDt;
	}
	public void setTempRedyDt(Date tempRedyDt) {
		this.tempRedyDt = tempRedyDt;
	}
	public Date getDocRedyDt() {
		return docRedyDt;
	}
	public void setDocRedyDt(Date docRedyDt) {
		this.docRedyDt = docRedyDt;
	}
	public Date getCgRedyDt() {
		return cgRedyDt;
	}
	public void setCgRedyDt(Date cgRedyDt) {
		this.cgRedyDt = cgRedyDt;
	}
	public Date getUltgRedyDt() {
		return ultgRedyDt;
	}
	public void setUltgRedyDt(Date ultgRedyDt) {
		this.ultgRedyDt = ultgRedyDt;
	}
	public Date getTkRedyDt() {
		return tkRedyDt;
	}
	public void setTkRedyDt(Date tkRedyDt) {
		this.tkRedyDt = tkRedyDt;
	}
	public List getOperationType() {
		return operationType;
	}
	public void setOperationType(List operationType) {
		this.operationType = operationType;
	}
	public List getCargoTypeUnLiquid() {
		return cargoTypeUnLiquid;
	}
	public void setCargoTypeUnLiquid(List cargoTypeUnLiquid) {
		this.cargoTypeUnLiquid = cargoTypeUnLiquid;
	}
	public List getCargoTypeLiquid() {
		return cargoTypeLiquid;
	}
	public void setCargoTypeLiquid(List cargoTypeLiquid) {
		this.cargoTypeLiquid = cargoTypeLiquid;
	}
	public List getWorkableHatch() {
		return workableHatch;
	}
	public void setWorkableHatch(List workableHatch) {
		this.workableHatch = workableHatch;
	}
	public List getCargoOperation() {
		return cargoOperation;
	}
	public void setCargoOperation(List cargoOperation) {
		this.cargoOperation = cargoOperation;
	}
	public List getConfirmationSlipOperationType() {
		return confirmationSlipOperationType;
	}
	public void setConfirmationSlipOperationType(List confirmationSlipOperationType) {
		this.confirmationSlipOperationType = confirmationSlipOperationType;
	}
	public List getPurposeOfCall() {
		return purposeOfCall;
	}
	public void setPurposeOfCall(List purposeOfCall) {
		this.purposeOfCall = purposeOfCall;
	}
	public List getCargoToDischarge() {
		return cargoToDischarge;
	}
	public void setCargoToDischarge(List cargoToDischarge) {
		this.cargoToDischarge = cargoToDischarge;
	}
	public List getBerthInfo() {
		return berthInfo;
	}
	public void setBerthInfo(List berthInfo) {
		this.berthInfo = berthInfo;
	}
	public VesselScheduleItem getVesselScheduleListDetail() {
		return vesselScheduleListDetail;
	}
	public void setVesselScheduleListDetail(VesselScheduleItem vesselScheduleListDetail) {
		this.vesselScheduleListDetail = vesselScheduleListDetail;
	}
	public List getConfirmationSlip() {
		return confirmationSlip;
	}
	public void setConfirmationSlip(List confirmationSlip) {
		this.confirmationSlip = confirmationSlip;
	}
	public List getConfirmationSlipDryBreakBulk() {
		return confirmationSlipDryBreakBulk;
	}
	public void setConfirmationSlipDryBreakBulk(List confirmationSlipDryBreakBulk) {
		this.confirmationSlipDryBreakBulk = confirmationSlipDryBreakBulk;
	}
	public List getConfirmationSlipLiquidBulk() {
		return confirmationSlipLiquidBulk;
	}
	public void setConfirmationSlipLiquidBulk(List confirmationSlipLiquidBulk) {
		this.confirmationSlipLiquidBulk = confirmationSlipLiquidBulk;
	}
	public List getVesselInformation() {
		return vesselInformation;
	}
	public void setVesselInformation(List vesselInformation) {
		this.vesselInformation = vesselInformation;
	}
	public List getPassengerSummary() {
		return passengerSummary;
	}
	public void setPassengerSummary(List passengerSummary) {
		this.passengerSummary = passengerSummary;
	}
	public List getPassenger() {
		return passenger;
	}
	public void setPassenger(List passenger) {
		this.passenger = passenger;
	}
	public List getIsps1() {
		return isps1;
	}
	public void setIsps1(List isps1) {
		this.isps1 = isps1;
	}
	public List getIsps2() {
		return isps2;
	}
	public void setIsps2(List isps2) {
		this.isps2 = isps2;
	}
	public List getIsps3() {
		return isps3;
	}
	public void setIsps3(List isps3) {
		this.isps3 = isps3;
	}
	public List getCommodityCode() {
		return commodityCode;
	}
	public void setCommodityCode(List commodityCode) {
		this.commodityCode = commodityCode;
	}
	public ArrayList<ConfirmationSlipItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<ConfirmationSlipItem> items) {
		this.items = items;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public List getPartnerCode() {
		return partnerCode;
	}
	public void setPartnerCode(List partnerCode) {
		this.partnerCode = partnerCode;
	}
	public List getPkgTpList() {
		return pkgTpList;
	}
	public void setPkgTpList(List pkgTpList) {
		this.pkgTpList = pkgTpList;
	}
	public List getPortList() {
		return portList;
	}
	public void setPortList(List portList) {
		this.portList = portList;
	}
	public List getImdgList() {
		return imdgList;
	}
	public void setImdgList(List imdgList) {
		this.imdgList = imdgList;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCsStatus() {
		return csStatus;
	}
	public void setCsStatus(String csStatus) {
		this.csStatus = csStatus;
	}
//	public ArrayList<VORLiquidBulkItem> getCargoSummary() {
//		return cargoSummary;
//	}
//	public void setCargoSummary(ArrayList<VORLiquidBulkItem> cargoSummary) {
//		this.cargoSummary = cargoSummary;
//	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public String getCnsneAddr() {
		return cnsneAddr;
	}
	public String getShpNm() {
		return shpNm;
	}
	public String getShpAddr() {
		return shpAddr;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public void setCnsneAddr(String cnsneAddr) {
		this.cnsneAddr = cnsneAddr;
	}
	public void setShpNm(String shpNm) {
		this.shpNm = shpNm;
	}
	public void setShpAddr(String shpAddr) {
		this.shpAddr = shpAddr;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	 public String getCmdtGr() {
        return cmdtGr;
    }
    public void setCmdtGr(String cmdtGr) {
        this.cmdtGr = cmdtGr;
    }
    public String getCmdtGrCd() {
        return cmdtGrCd;
    }
    public void setCmdtGrCd(String cmdtGrCd) {
        this.cmdtGrCd = cmdtGrCd;
    }
	public ArrayList<VesselScheduleItem> getCargoSummary() {
		return cargoSummary;
	}
	public void setCargoSummary(ArrayList<VesselScheduleItem> cargoSummary) {
		this.cargoSummary = cargoSummary;
	}

}
