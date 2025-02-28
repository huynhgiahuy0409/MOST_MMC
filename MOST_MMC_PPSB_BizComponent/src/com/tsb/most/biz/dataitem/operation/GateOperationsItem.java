package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;

public class GateOperationsItem extends DataItem{
	
	private String transactionNo;
	private String ticketNo;
	private String gateNo;
	private String transactionDate;
	private String vslCallId;
	private String vslCode;
	private String vslName;
	private String callYear;
	private String callSeq;
	private String snNo;
	private String grNo;
	private String blNo;
	private String doNo;
	private String sDoNo;
	private String unitNo;
	private String gpNo;
	private String transportComp;
	private String truckNo;
	private String tareWGT;
	private String netWGT;
	private String grossWGT;
	private String truckId;
	private String driverId;
	private String gateInDate;
	private String gateInCd;
	private String gateOutDate;
	private String gateOutCd;
	private String location;
	private String prnCnt;
	private String rmk;
	private String rhdlMode;
	private String commodity;
	private String cargoType;
	private String consignee;
	private String shipper;
	private String driverName;
	private String driverLicense;
	private String driverExDate;
	private String returnShipperChk;
	private String nonVslChk;
	private double wgt;
	private int pkgQty;
	private double msrmt;
	private String width;
	private String length;
	private String height;
	
	private String customsDocNo;
	//VIN item
	private String chasNo;
	private String brandCD;
	private String modelCD;
	private String locID;
	private String planLocID;
	private String docWGT;
	private String actQty;
	private DataItemList vins;
	
	
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getCustomsDocNo() {
		return customsDocNo;
	}
	public void setCustomsDocNo(String customsDocNo) {
		this.customsDocNo = customsDocNo;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public DataItemList getVins() {
		return vins;
	}
	public void setVins(DataItemList vins) {
		this.vins = vins;
	}
	private ArrayList<GateOperationsItem> vinItems;
	
	public ArrayList<GateOperationsItem> getVinItems() {
		return vinItems;
	}
	public void setVinItems(ArrayList<GateOperationsItem> vinItems) {
		this.vinItems = vinItems;
	}

	private String gateType;
	
	public String getGateType() {
		return gateType;
	}
	public void setGateType(String gateType) {
		this.gateType = gateType;
	}
	public String getGateNo() {
		return gateNo;
	}
	public void setGateNo(String gateNo) {
		this.gateNo = gateNo;
	}
	public String getTicketNo() {
		return ticketNo;
	}
	public void setTicketNo(String ticketNo) {
		this.ticketNo = ticketNo;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getsDoNo() {
		return sDoNo;
	}
	public void setsDoNo(String sDoNo) {
		this.sDoNo = sDoNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getTruckId() {
		return truckId;
	}
	public void setTruckId(String truckId) {
		this.truckId = truckId;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getTareWGT() {
		return tareWGT;
	}
	public void setTareWGT(String tareWGT) {
		this.tareWGT = tareWGT;
	}
	public String getNetWGT() {
		return netWGT;
	}
	public void setNetWGT(String netWGT) {
		this.netWGT = netWGT;
	}
	public String getGrossWGT() {
		return grossWGT;
	}
	public void setGrossWGT(String grossWGT) {
		this.grossWGT = grossWGT;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslName() {
		return vslName;
	}
	public void setVslName(String vslName) {
		this.vslName = vslName;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
	public String getConsignee() {
		return consignee;
	}
	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getTransportComp() {
		return transportComp;
	}
	public void setTransportComp(String transportComp) {
		this.transportComp = transportComp;
	}
	public String getDriverName() {
		return driverName;
	}
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	public String getDriverLicense() {
		return driverLicense;
	}
	public void setDriverLicense(String driverLicense) {
		this.driverLicense = driverLicense;
	}
	public String getDriverExDate() {
		return driverExDate;
	}
	public void setDriverExDate(String driverExDate) {
		this.driverExDate = driverExDate;
	}
	public String getReturnShipperChk() {
		return returnShipperChk;
	}
	public void setReturnShipperChk(String returnShipperChk) {
		this.returnShipperChk = returnShipperChk;
	}
	public String getNonVslChk() {
		return nonVslChk;
	}
	public void setNonVslChk(String nonVslChk) {
		this.nonVslChk = nonVslChk;
	}
	public String getTransactionNo() {
		return transactionNo;
	}
	public void setTransactionNo(String transactionNo) {
		this.transactionNo = transactionNo;
	}
	public String getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}
	public String getVslCode() {
		return vslCode;
	}
	public void setVslCode(String vslCode) {
		this.vslCode = vslCode;
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
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getGpNo() {
		return gpNo;
	}
	public void setGpNo(String gpNo) {
		this.gpNo = gpNo;
	}
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getGateInCd() {
		return gateInCd;
	}
	public void setGateInCd(String gateInCd) {
		this.gateInCd = gateInCd;
	}
	public String getGateOutDate() {
		return gateOutDate;
	}
	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}
	public String getGateOutCd() {
		return gateOutCd;
	}
	public void setGateOutCd(String gateOutCd) {
		this.gateOutCd = gateOutCd;
	}
	public String getPrnCnt() {
		return prnCnt;
	}
	public void setPrnCnt(String prnCnt) {
		this.prnCnt = prnCnt;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getChasNo() {
		return chasNo;
	}
	public void setChasNo(String chasNo) {
		this.chasNo = chasNo;
	}
	public String getBrandCD() {
		return brandCD;
	}
	public void setBrandCD(String brandCD) {
		this.brandCD = brandCD;
	}
	public String getModelCD() {
		return modelCD;
	}
	public void setModelCD(String modelCD) {
		this.modelCD = modelCD;
	}
	public String getLocID() {
		return locID;
	}
	public void setLocID(String locID) {
		this.locID = locID;
	}
	public String getDocWGT() {
		return docWGT;
	}
	public void setDocWGT(String docWGT) {
		this.docWGT = docWGT;
	}
	public String getShipper() {
		return shipper;
	}
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getPlanLocID() {
		return planLocID;
	}
	public void setPlanLocID(String planLocID) {
		this.planLocID = planLocID;
	}
	
	
	
}

