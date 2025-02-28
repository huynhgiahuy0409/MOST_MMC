package com.tsb.most.biz.dataitem.dashboard;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoFlowDashboardItem extends DataItem {
	//vessel schedule
	private String hatchQty;
	private String vslCd;
	private String vslNm;
	private String voyage;
	private String arrvSaId;
	private String eta;
	private String etb;
	private String etd;
	private String berthLoc;
	private String storageLoc;
	private String vslCallId;
	
	//Commodity
	private String cmmdCd;
	private String cmmdNm;
	
	private String cgTpCd;
	private String cgTpNm;
	private String catgCd;
	private String catgNm;
	private String delvTpCd;
	private String delvTpNm;
	
	private String balMt;
	private String balQty;
	private String actMt;
	private String actQty;
	private String totalMt;
	private String totalQty;
	private String tobeRecvMt;
	private String tobeRecvQty;
	private String percentage;
	private String percentageStr;
	
	private String balAmt;
	private String actAmt;
	private String totalAmt;
	private String tobeRecvAmt;
	
	private String whPercentage;
	private String whPercentageStr;
	private String truckPercentage;
	private String truckPercentageStr;
	private String vslPercentage;
	private String vslPercentageStr;
	
	private ArrayList<CargoFlowDashboardItem> vslDischargedItems;
	private ArrayList<CargoFlowDashboardItem> whDischargedItems;
	private ArrayList<CargoFlowDashboardItem> gateDischargedItems;
	
	private ArrayList<CargoFlowDashboardItem> vslLoadingItems;
	private ArrayList<CargoFlowDashboardItem> whLoadingItems;
	private ArrayList<CargoFlowDashboardItem> gateLoadingItems;
	
	private String pkgQty;
	private String cgWgt;
	private String cgVol;
	
	private String dqty;
	private String dmt;
	private String dm3;
	private String iqty;
	private String imt;
	private String im3;
	
	private String ptnrCode;
	private String fwdCode;
	private String cnsCode;
	
	private String cmmdSumTotal;
	private String cmmdSumIndirect;
	private String cmmdSumDirect;
	private String cmmdSumDirectByBarge;
	
	//cargoflowhatchlayout
	private String hatchNo;
	private String vslCmmdCd;
	private String vslCmmdNm;
	private String vslCargoTypeCd;
	private String vslCargoTypeNm;
	private String vslDeliveryTypeCd;
	private String vslDeliveryTypeNm;
	private String vslRemainnedAmt;
	private String vslCompletedAmt;
	private String vslTotalAmt;
	private String vslCurrentAmt;
	private String vslAmtPercentage;
	
	private String yardCmmdCd;
	private String yardCmmdNm;
	private String yardCargoTypeCd;
	private String yardCargoTypeNm;
	private String yardDeliveryTypeCd;
	private String yardDeliveryTypeNm;
	private String yardRemainnedAmt;
	private String yardCompletedAmt;
	private String yardTotalAmt;
	private String yardCurrentAmt;
	private String yardAmtPercentage;
	
	private String gateCmmdCd;
	private String gateCmmdNm;
	private String gateCargoTypeCd;
	private String gateCargoTypeNm;
	private String gateDeliveryTypeCd;
	private String gateDeliveryTypeNm;
	private String gateRemainnedAmt;
	private String gateCompletedAmt;
	private String gateTotalAmt;
	private String gateCurrentAmt;
	private String gateAmtPercentage;
	
	public String getHatchQty() {
		return hatchQty;
	}
	public void setHatchQty(String hatchQty) {
		this.hatchQty = hatchQty;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtb() {
		return etb;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	
	public String getEtd() {
		return etd;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getStorageLoc() {
		return storageLoc;
	}
	public void setStorageLoc(String storageLoc) {
		this.storageLoc = storageLoc;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getVslCmmdCd() {
		return vslCmmdCd;
	}
	public void setVslCmmdCd(String vslCmmdCd) {
		this.vslCmmdCd = vslCmmdCd;
	}
	public String getVslCmmdNm() {
		return vslCmmdNm;
	}
	public void setVslCmmdNm(String vslCmmdNm) {
		this.vslCmmdNm = vslCmmdNm;
	}
	public String getVslCargoTypeCd() {
		return vslCargoTypeCd;
	}
	public void setVslCargoTypeCd(String vslCargoTypeCd) {
		this.vslCargoTypeCd = vslCargoTypeCd;
	}
	public String getVslCargoTypeNm() {
		return vslCargoTypeNm;
	}
	public void setVslCargoTypeNm(String vslCargoTypeNm) {
		this.vslCargoTypeNm = vslCargoTypeNm;
	}
	public String getVslDeliveryTypeCd() {
		return vslDeliveryTypeCd;
	}
	public void setVslDeliveryTypeCd(String vslDeliveryTypeCd) {
		this.vslDeliveryTypeCd = vslDeliveryTypeCd;
	}
	public String getVslDeliveryTypeNm() {
		return vslDeliveryTypeNm;
	}
	public void setVslDeliveryTypeNm(String vslDeliveryTypeNm) {
		this.vslDeliveryTypeNm = vslDeliveryTypeNm;
	}
	public String getVslRemainnedAmt() {
		return vslRemainnedAmt;
	}
	public void setVslRemainnedAmt(String vslRemainnedAmt) {
		this.vslRemainnedAmt = vslRemainnedAmt;
	}
	public String getVslCompletedAmt() {
		return vslCompletedAmt;
	}
	public void setVslCompletedAmt(String vslCompletedAmt) {
		this.vslCompletedAmt = vslCompletedAmt;
	}
	public String getVslTotalAmt() {
		return vslTotalAmt;
	}
	public void setVslTotalAmt(String vslTotalAmt) {
		this.vslTotalAmt = vslTotalAmt;
	}
	public String getVslCurrentAmt() {
		return vslCurrentAmt;
	}
	public void setVslCurrentAmt(String vslCurrentAmt) {
		this.vslCurrentAmt = vslCurrentAmt;
	}
	public String getVslAmtPercentage() {
		return vslAmtPercentage;
	}
	public void setVslAmtPercentage(String vslAmtPercentage) {
		this.vslAmtPercentage = vslAmtPercentage;
	}
	public String getYardCmmdCd() {
		return yardCmmdCd;
	}
	public void setYardCmmdCd(String yardCmmdCd) {
		this.yardCmmdCd = yardCmmdCd;
	}
	public String getYardCmmdNm() {
		return yardCmmdNm;
	}
	public void setYardCmmdNm(String yardCmmdNm) {
		this.yardCmmdNm = yardCmmdNm;
	}
	public String getYardCargoTypeCd() {
		return yardCargoTypeCd;
	}
	public void setYardCargoTypeCd(String yardCargoTypeCd) {
		this.yardCargoTypeCd = yardCargoTypeCd;
	}
	public String getYardCargoTypeNm() {
		return yardCargoTypeNm;
	}
	public void setYardCargoTypeNm(String yardCargoTypeNm) {
		this.yardCargoTypeNm = yardCargoTypeNm;
	}
	public String getYardDeliveryTypeCd() {
		return yardDeliveryTypeCd;
	}
	public void setYardDeliveryTypeCd(String yardDeliveryTypeCd) {
		this.yardDeliveryTypeCd = yardDeliveryTypeCd;
	}
	public String getYardDeliveryTypeNm() {
		return yardDeliveryTypeNm;
	}
	public void setYardDeliveryTypeNm(String yardDeliveryTypeNm) {
		this.yardDeliveryTypeNm = yardDeliveryTypeNm;
	}
	public String getYardRemainnedAmt() {
		return yardRemainnedAmt;
	}
	public void setYardRemainnedAmt(String yardRemainnedAmt) {
		this.yardRemainnedAmt = yardRemainnedAmt;
	}
	public String getYardCompletedAmt() {
		return yardCompletedAmt;
	}
	public void setYardCompletedAmt(String yardCompletedAmt) {
		this.yardCompletedAmt = yardCompletedAmt;
	}
	public String getYardTotalAmt() {
		return yardTotalAmt;
	}
	public void setYardTotalAmt(String yardTotalAmt) {
		this.yardTotalAmt = yardTotalAmt;
	}
	public String getYardCurrentAmt() {
		return yardCurrentAmt;
	}
	public void setYardCurrentAmt(String yardCurrentAmt) {
		this.yardCurrentAmt = yardCurrentAmt;
	}
	public String getYardAmtPercentage() {
		return yardAmtPercentage;
	}
	public void setYardAmtPercentage(String yardAmtPercentage) {
		this.yardAmtPercentage = yardAmtPercentage;
	}
	public String getGateCmmdCd() {
		return gateCmmdCd;
	}
	public void setGateCmmdCd(String gateCmmdCd) {
		this.gateCmmdCd = gateCmmdCd;
	}
	public String getGateCmmdNm() {
		return gateCmmdNm;
	}
	public void setGateCmmdNm(String gateCmmdNm) {
		this.gateCmmdNm = gateCmmdNm;
	}
	public String getGateCargoTypeCd() {
		return gateCargoTypeCd;
	}
	public void setGateCargoTypeCd(String gateCargoTypeCd) {
		this.gateCargoTypeCd = gateCargoTypeCd;
	}
	public String getGateCargoTypeNm() {
		return gateCargoTypeNm;
	}
	public void setGateCargoTypeNm(String gateCargoTypeNm) {
		this.gateCargoTypeNm = gateCargoTypeNm;
	}
	public String getGateDeliveryTypeCd() {
		return gateDeliveryTypeCd;
	}
	public void setGateDeliveryTypeCd(String gateDeliveryTypeCd) {
		this.gateDeliveryTypeCd = gateDeliveryTypeCd;
	}
	public String getGateDeliveryTypeNm() {
		return gateDeliveryTypeNm;
	}
	public void setGateDeliveryTypeNm(String gateDeliveryTypeNm) {
		this.gateDeliveryTypeNm = gateDeliveryTypeNm;
	}
	public String getGateRemainnedAmt() {
		return gateRemainnedAmt;
	}
	public void setGateRemainnedAmt(String gateRemainnedAmt) {
		this.gateRemainnedAmt = gateRemainnedAmt;
	}
	public String getGateCompletedAmt() {
		return gateCompletedAmt;
	}
	public void setGateCompletedAmt(String gateCompletedAmt) {
		this.gateCompletedAmt = gateCompletedAmt;
	}
	public String getGateTotalAmt() {
		return gateTotalAmt;
	}
	public void setGateTotalAmt(String gateTotalAmt) {
		this.gateTotalAmt = gateTotalAmt;
	}
	public String getGateCurrentAmt() {
		return gateCurrentAmt;
	}
	public void setGateCurrentAmt(String gateCurrentAmt) {
		this.gateCurrentAmt = gateCurrentAmt;
	}
	public String getGateAmtPercentage() {
		return gateAmtPercentage;
	}
	public void setGateAmtPercentage(String gateAmtPercentage) {
		this.gateAmtPercentage = gateAmtPercentage;
	}
	public String getCmmdCd() {
		return cmmdCd;
	}
	public void setCmmdCd(String cmmdCd) {
		this.cmmdCd = cmmdCd;
	}
	public String getCmmdNm() {
		return cmmdNm;
	}
	public void setCmmdNm(String cmmdNm) {
		this.cmmdNm = cmmdNm;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getCgWgt() {
		return cgWgt;
	}
	public void setCgWgt(String cgWgt) {
		this.cgWgt = cgWgt;
	}
	public String getCgVol() {
		return cgVol;
	}
	public void setCgVol(String cgVol) {
		this.cgVol = cgVol;
	}
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getFwdCode() {
		return fwdCode;
	}
	public void setFwdCode(String fwdCode) {
		this.fwdCode = fwdCode;
	}
	public String getCnsCode() {
		return cnsCode;
	}
	public void setCnsCode(String cnsCode) {
		this.cnsCode = cnsCode;
	}
	public String getCmmdSumTotal() {
		return cmmdSumTotal;
	}
	public void setCmmdSumTotal(String cmmdSumTotal) {
		this.cmmdSumTotal = cmmdSumTotal;
	}
	public String getCmmdSumIndirect() {
		return cmmdSumIndirect;
	}
	public void setCmmdSumIndirect(String cmmdSumIndirect) {
		this.cmmdSumIndirect = cmmdSumIndirect;
	}
	public String getCmmdSumDirect() {
		return cmmdSumDirect;
	}
	public void setCmmdSumDirect(String cmmdSumDirect) {
		this.cmmdSumDirect = cmmdSumDirect;
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
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
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
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getBalMt() {
		return balMt;
	}
	public void setBalMt(String balMt) {
		this.balMt = balMt;
	}
	public String getBalQty() {
		return balQty;
	}
	public void setBalQty(String balQty) {
		this.balQty = balQty;
	}
	public String getActMt() {
		return actMt;
	}
	public void setActMt(String actMt) {
		this.actMt = actMt;
	}
	public String getActQty() {
		return actQty;
	}
	public void setActQty(String actQty) {
		this.actQty = actQty;
	}
	public String getTotalMt() {
		return totalMt;
	}
	public void setTotalMt(String totalMt) {
		this.totalMt = totalMt;
	}
	public String getTotalQty() {
		return totalQty;
	}
	public void setTotalQty(String totalQty) {
		this.totalQty = totalQty;
	}
	public String getTobeRecvMt() {
		return tobeRecvMt;
	}
	public void setTobeRecvMt(String tobeRecvMt) {
		this.tobeRecvMt = tobeRecvMt;
	}
	public String getTobeRecvQty() {
		return tobeRecvQty;
	}
	public void setTobeRecvQty(String tobeRecvQty) {
		this.tobeRecvQty = tobeRecvQty;
	}
	public String getPercentage() {
		return percentage;
	}
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}
	public ArrayList<CargoFlowDashboardItem> getVslDischargedItems() {
		return vslDischargedItems;
	}
	public void setVslDischargedItems(ArrayList<CargoFlowDashboardItem> vslDischargedItems) {
		this.vslDischargedItems = vslDischargedItems;
	}
	public ArrayList<CargoFlowDashboardItem> getWhDischargedItems() {
		return whDischargedItems;
	}
	public void setWhDischargedItems(ArrayList<CargoFlowDashboardItem> whDischargedItems) {
		this.whDischargedItems = whDischargedItems;
	}
	public ArrayList<CargoFlowDashboardItem> getGateDischargedItems() {
		return gateDischargedItems;
	}
	public void setGateDischargedItems(ArrayList<CargoFlowDashboardItem> gateDischargedItems) {
		this.gateDischargedItems = gateDischargedItems;
	}
	public String getDqty() {
		return dqty;
	}
	public void setDqty(String dqty) {
		this.dqty = dqty;
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
	public String getIqty() {
		return iqty;
	}
	public void setIqty(String iqty) {
		this.iqty = iqty;
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
	public String getPercentageStr() {
		return percentageStr;
	}
	public void setPercentageStr(String percentageStr) {
		this.percentageStr = percentageStr;
	}
	public ArrayList<CargoFlowDashboardItem> getVslLoadingItems() {
		return vslLoadingItems;
	}
	public void setVslLoadingItems(ArrayList<CargoFlowDashboardItem> vslLoadingItems) {
		this.vslLoadingItems = vslLoadingItems;
	}
	public ArrayList<CargoFlowDashboardItem> getWhLoadingItems() {
		return whLoadingItems;
	}
	public void setWhLoadingItems(ArrayList<CargoFlowDashboardItem> whLoadingItems) {
		this.whLoadingItems = whLoadingItems;
	}
	public ArrayList<CargoFlowDashboardItem> getGateLoadingItems() {
		return gateLoadingItems;
	}
	public void setGateLoadingItems(ArrayList<CargoFlowDashboardItem> gateLoadingItems) {
		this.gateLoadingItems = gateLoadingItems;
	}
	public String getCmmdSumDirectByBarge() {
		return cmmdSumDirectByBarge;
	}
	public void setCmmdSumDirectByBarge(String cmmdSumDirectByBarge) {
		this.cmmdSumDirectByBarge = cmmdSumDirectByBarge;
	}
	public String getWhPercentage() {
		return whPercentage;
	}
	public void setWhPercentage(String whPercentage) {
		this.whPercentage = whPercentage;
	}
	public String getWhPercentageStr() {
		return whPercentageStr;
	}
	public void setWhPercentageStr(String whPercentageStr) {
		this.whPercentageStr = whPercentageStr;
	}
	public String getTruckPercentage() {
		return truckPercentage;
	}
	public void setTruckPercentage(String truckPercentage) {
		this.truckPercentage = truckPercentage;
	}
	public String getTruckPercentageStr() {
		return truckPercentageStr;
	}
	public void setTruckPercentageStr(String truckPercentageStr) {
		this.truckPercentageStr = truckPercentageStr;
	}
	public String getVslPercentage() {
		return vslPercentage;
	}
	public void setVslPercentage(String vslPercentage) {
		this.vslPercentage = vslPercentage;
	}
	public String getVslPercentageStr() {
		return vslPercentageStr;
	}
	public void setVslPercentageStr(String vslPercentageStr) {
		this.vslPercentageStr = vslPercentageStr;
	}
	public String getBalAmt() {
		return balAmt;
	}
	public void setBalAmt(String balAmt) {
		this.balAmt = balAmt;
	}
	public String getActAmt() {
		return actAmt;
	}
	public void setActAmt(String actAmt) {
		this.actAmt = actAmt;
	}
	public String getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getTobeRecvAmt() {
		return tobeRecvAmt;
	}
	public void setTobeRecvAmt(String tobeRecvAmt) {
		this.tobeRecvAmt = tobeRecvAmt;
	}
	
	
}
