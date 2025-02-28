package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class TruckAssignmentItem extends DataItem {
	private static final long serialVersionUID = 1L;
	private String vslCallId;
	private String divCd;
	private String ptnrCd;
	private String cd;
	private String cdNm;
	private String tyCd;
	private String seq;
	private String lorryNo;
	private String driverId;
	private String lorryId;
	private String driverNm;
	private String userId;
	private String no;
	private String shipgNoteNo;
	private String blNo;
	private String delvTpCd;
	private String cmdtCd;
	private String licsNo;
	private String licsExprYmd;
	private String tsptr;
	private String tsptrNm;
	private String snBlNo;
	private String grNo;
	private String lorryTsptr;
	private String driverTsptr;
	private String doNo;
	private String dmt;
	private String dm3;
	private String dqty;
	private String imt, im3, iqty;
	private String pkgqty;
	private String wgt;
	private String vol;
	private String workingStatus;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String transport;
	private String chassisNo;
	private String allowWgt;
	private String allowWgtVal;
	private String truckMode;
	private String subDoNo;
	private String permitYn;
	
	private String qrNo;
	private String gateNo;
	private String scaleNo;
	private String locationNo;
	private String cmdtNm;
	private String shp;
	private String shpNm;
	private String shpAddr;
	private String cnsne;
	private String cnsneNm;
	private String cnsneAddr;
	private String sha;
	private String shaNm;
	private String shaAddr;
	private String cgTpCd;
	private String cgTpNm;
	private String inbVoyage;
	private String vslNm;
	private String delvTpNm;
	private String lotNo;
	private String pkgTpCd;
	private String pkgTpNm;
	private String validDate;
	private String cmdtGrpCd;
	private String cmdtGrpNm;
	private String balWgt;
	private String lorryRegValidDate;
	private String chassisRegValidDate;
	private String lorryTareWgt;
	private String chassisTareWgt;
	private String wbIfYn;
	private String customsReleasedYn;
	private String sdoNo;
	private String mfDocId;
	private String gateTxnNo;
	private String wbTransactionNo;
	private String weightCheckYn;
	private String gateInDate;
	private String gateOutDate;
	private String firstWgt;
	private String secondWgt;
	private String sdormk;
	private String truckVerify;
	private String chassisVerify;
	private String masterBlNo;
	private String imtNo;
	private String markNo;
	private String delivered;
	private String domesticChk;
	private String balVol;
	
	private String scn;
	
	private ArrayList<FileUploadItem> uploadItems;
	private String advMt;
	private String advM3;
	private String advQty;
	
	
	public String getAdvMt() {
		return advMt;
	}
	public void setAdvMt(String advMt) {
		this.advMt = advMt;
	}
	public String getAdvM3() {
		return advM3;
	}
	public void setAdvM3(String advM3) {
		this.advM3 = advM3;
	}
	public String getAdvQty() {
		return advQty;
	}
	public void setAdvQty(String advQty) {
		this.advQty = advQty;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getTyCd() {
		return tyCd;
	}
	public void setTyCd(String tyCd) {
		this.tyCd = tyCd;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
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
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getLicsNo() {
		return licsNo;
	}
	public void setLicsNo(String licsNo) {
		this.licsNo = licsNo;
	}
	public String getLicsExprYmd() {
		return licsExprYmd;
	}
	public void setLicsExprYmd(String licsExprYmd) {
		this.licsExprYmd = licsExprYmd;
	}
	public String getTsptr() {
		return tsptr;
	}
	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
	}
	public String getTsptrNm() {
		return tsptrNm;
	}
	public void setTsptrNm(String tsptrNm) {
		this.tsptrNm = tsptrNm;
	}
	public String getSnBlNo() {
		return snBlNo;
	}
	public void setSnBlNo(String snBlNo) {
		this.snBlNo = snBlNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getLorryTsptr() {
		return lorryTsptr;
	}
	public void setLorryTsptr(String lorryTsptr) {
		this.lorryTsptr = lorryTsptr;
	}
	public String getDriverTsptr() {
		return driverTsptr;
	}
	public void setDriverTsptr(String driverTsptr) {
		this.driverTsptr = driverTsptr;
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
	public String getPkgqty() {
		return pkgqty;
	}
	public void setPkgqty(String pkgqty) {
		this.pkgqty = pkgqty;
	}
	public String getWgt() {
		return wgt;
	}
	public void setWgt(String wgt) {
		this.wgt = wgt;
	}
	public String getVol() {
		return vol;
	}
	public void setVol(String vol) {
		this.vol = vol;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
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
	public String getTransport() {
		return transport;
	}
	public void setTransport(String transport) {
		this.transport = transport;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getAllowWgt() {
		return allowWgt;
	}
	public void setAllowWgt(String allowWgt) {
		this.allowWgt = allowWgt;
	}
	public String getAllowWgtVal() {
		return allowWgtVal;
	}
	public void setAllowWgtVal(String allowWgtVal) {
		this.allowWgtVal = allowWgtVal;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getTruckMode() {
		return truckMode;
	}
	public void setTruckMode(String truckMode) {
		this.truckMode = truckMode;
	}
	public String getSubDoNo() {
		return subDoNo;
	}
	public void setSubDoNo(String subDoNo) {
		this.subDoNo = subDoNo;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getPermitYn() {
		return permitYn;
	}
	public void setPermitYn(String permitYn) {
		this.permitYn = permitYn;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getQrNo() {
		return qrNo;
	}
	public void setQrNo(String qrNo) {
		this.qrNo = qrNo;
	}
	public String getGateNo() {
		return gateNo;
	}
	public void setGateNo(String gateNo) {
		this.gateNo = gateNo;
	}
	public String getLocationNo() {
		return locationNo;
	}
	public void setLocationNo(String locationNo) {
		this.locationNo = locationNo;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getShp() {
		return shp;
	}
	public void setShp(String shp) {
		this.shp = shp;
	}
	public String getShpNm() {
		return shpNm;
	}
	public void setShpNm(String shpNm) {
		this.shpNm = shpNm;
	}
	public String getShpAddr() {
		return shpAddr;
	}
	public void setShpAddr(String shpAddr) {
		this.shpAddr = shpAddr;
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
	public String getCnsneAddr() {
		return cnsneAddr;
	}
	public void setCnsneAddr(String cnsneAddr) {
		this.cnsneAddr = cnsneAddr;
	}
	public String getSha() {
		return sha;
	}
	public void setSha(String sha) {
		this.sha = sha;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getShaAddr() {
		return shaAddr;
	}
	public void setShaAddr(String shaAddr) {
		this.shaAddr = shaAddr;
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
	public String getInbVoyage() {
		return inbVoyage;
	}
	public void setInbVoyage(String inbVoyage) {
		this.inbVoyage = inbVoyage;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getValidDate() {
		return validDate;
	}
	public void setValidDate(String validDate) {
		this.validDate = validDate;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getBalWgt() {
		return balWgt;
	}
	public void setBalWgt(String balWgt) {
		this.balWgt = balWgt;
	}
	public String getLorryRegValidDate() {
		return lorryRegValidDate;
	}
	public void setLorryRegValidDate(String lorryRegValidDate) {
		this.lorryRegValidDate = lorryRegValidDate;
	}
	public String getChassisRegValidDate() {
		return chassisRegValidDate;
	}
	public void setChassisRegValidDate(String chassisRegValidDate) {
		this.chassisRegValidDate = chassisRegValidDate;
	}
	public String getLorryTareWgt() {
		return lorryTareWgt;
	}
	public void setLorryTareWgt(String lorryTareWgt) {
		this.lorryTareWgt = lorryTareWgt;
	}
	public String getChassisTareWgt() {
		return chassisTareWgt;
	}
	public void setChassisTareWgt(String chassisTareWgt) {
		this.chassisTareWgt = chassisTareWgt;
	}
	public String getScaleNo() {
		return scaleNo;
	}
	public void setScaleNo(String scaleNo) {
		this.scaleNo = scaleNo;
	}
	public String getWbIfYn() {
		return wbIfYn;
	}
	public void setWbIfYn(String wbIfYn) {
		this.wbIfYn = wbIfYn;
	}
	public String getCustomsReleasedYn() {
		return customsReleasedYn;
	}
	public void setCustomsReleasedYn(String customsReleasedYn) {
		this.customsReleasedYn = customsReleasedYn;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getWeightCheckYn() {
		return weightCheckYn;
	}
	public void setWeightCheckYn(String weightCheckYn) {
		this.weightCheckYn = weightCheckYn;
	}
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getGateOutDate() {
		return gateOutDate;
	}
	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}
	public String getFirstWgt() {
		return firstWgt;
	}
	public void setFirstWgt(String firstWgt) {
		this.firstWgt = firstWgt;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}
	public String getSdormk() {
		return sdormk;
	}
	public void setSdormk(String sdormk) {
		this.sdormk = sdormk;
	}
	public String getTruckVerify() {
		return truckVerify;
	}
	public void setTruckVerify(String truckVerify) {
		this.truckVerify = truckVerify;
	}
	public String getChassisVerify() {
		return chassisVerify;
	}
	public void setChassisVerify(String chassisVerify) {
		this.chassisVerify = chassisVerify;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getImtNo() {
		return imtNo;
	}
	public void setImtNo(String imtNo) {
		this.imtNo = imtNo;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public String getDelivered() {
		return delivered;
	}
	public void setDelivered(String delivered) {
		this.delivered = delivered;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getBalVol() {
		return balVol;
	}
	public void setBalVol(String balVol) {
		this.balVol = balVol;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
