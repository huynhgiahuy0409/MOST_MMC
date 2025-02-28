/**
* DataGatheringItem.java
*
* Created on   : 2007-12-05
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.3 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-12-05   Mr Luis Lee	1.0          First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class DataGatheringItem extends DataItem{
    private boolean selected = false;
    
    private String vslCallId;
    private String payer;
    private String payerTpCd;
    private String payTpCd;
    private String atb;
    private String atw;
    private String atc;
    private String atu;
    private String berth;
    private String cargoType;
    private String warehouseId;
    private String imRecclCd;
    private String exRecclCd;
    private String status;
    private String gatheredDate;
    private String gatheringStaff;
    private String marineCharge;
    
    private String shippingAgent;
    private String systemId;
    private String vslNm;
    private String loa;
    private String grt;
    private String cmdtCd;
    private String pkgTp;
    private String ldDs;
    private String pol;
    private String pod;
    private String shipper;
    private String consignee;
    private String tonnage;
    private String ata;
    private String atd;
    private String vslTrade;
    
    private String docMsrmt;
    private String searchType;
    private String blSnNo;
    private String docNo;
    private String delvTpCd;
    private String estDt;
    
    private String chk;
    private String tariffCode;
    private String prefix;    
    private String subTariffCode;
    private String waiverDescr;
    private String gatherNo;
    private String cargoNo;
    private String workDate;
    private String statusCd;
    private String costCentreCode;
    private String refNo;
    private String isUpdateRefNo;
    
    private String no;
    private String megaNo;	
	private String workDt;
	private String shift;
	private String submitDt;
	private String megaStatus;
	private String apprvDt;
	private String penalty;
	
    private String equType;
    private String date;
    private String capacity;
    private String gearType;
    private String fromTime;
    private String toTime;
    private double totalHrs;
    private String nos;
	private String trfCd;
	private String subTrfCd;
	private String trfDescr;
	private String cgTpCd;
	private String costct;
	
	private String category;
    private String delivery;
    private String commodity;
    private String dgClass;
    private String packageType;
    private String transportType;
    private double pkgQty;
    private double wgt;
    private String tariffDesc;
    private String referenceNo;
    private String operationNo;
    private double unit1;
    private double unit2;
    private double unit3;
	private String shft;
	private double opWgt;
	private double opMsrmt;
	private double opPkgQty;	
	private double docWgt;
	private double docPkgQty;	
	private double blMsrmt;	
	private double blWgt;
	private double blPkgQty;
	private String jobTpCd;
	private String fwrAgnt;
	
	private String vesselID;
    private String vesselName;
    private String saCode;
    private String saName;
    private String dpSaCd;
    private String dpSaName;
    private String vesselType;
    private String vslServiceType;
    private String berthNo;
    private double berthingHours;
    private double acceptableDelay;
    private double oneStDouble;
    private double twoNdDouble;
    private double threeRdDouble;
    private double doubleBanking; 
    private double arrivalTimeInMonthAsScheduled;
    private double arrivalTimeInMonth;
    private double secondAcceptDelay;
    private double normalAcceptDelay;
    private String remark;
    private String purpCall;
    private String isValidated;
    private String mfDocId;
    private String dwt;
    private String bookingNo;
    private String masterBL;
    private String blNo;
    private String shipgNoteNo;
    
    private ArrayList<DataGatheringItem> items;
    
    private ArrayList<GatheredDataItem>  childGatheredData;
    private ArrayList<DataGatheringItem> childVesselInfo;
    private ArrayList<DataGatheringItem> childCargoInfo;
    private ArrayList<DataGatheringItem> childCargoSumInfo;
    private ArrayList<DataGatheringItem> childEquipmentInfo;
    private ArrayList<DataGatheringItem> payerInfo;
    private ArrayList<DataGatheringItem> detailList;
    private ArrayList<DataGatheringItem> bbtcheckInfo;
    private ArrayList<ProformaInvoiceItem> proformaItems;
    
    //MMC - Settlement
    private String opeClassCd;
    private String expectedDeliveryDay;
    
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getDocMsrmt() {
        return docMsrmt;
    }
    public void setDocMsrmt(String docMsrmt) {
        this.docMsrmt = docMsrmt;
    }
    /**
     * @return Returns the bpb.
     */
    public String getBpb() {
        return bpb;
    }
    /**
     * @param bpb The bpb to set.
     */
    public void setBpb(String bpb) {
        this.bpb = bpb;
    }
    /**
     * @return Returns the pob.
     */
    public String getPob() {
        return pob;
    }
    /**
     * @param pob The pob to set.
     */
    public void setPob(String pob) {
        this.pob = pob;
    }
    private String pob;
    private String bpb;

    public String getMarineCharge() {
        return marineCharge;
    }
    public void setMarineCharge(String marineCharge) {
        this.marineCharge = marineCharge;
    }

    public String getShippingAgent() {
        return shippingAgent;
    }
    public void setShippingAgent(String shippingAgent) {
        this.shippingAgent = shippingAgent;
    }
    public String getExRecclCd() {
        return exRecclCd;
    }
    public void setExRecclCd(String exRecclCd) {
        this.exRecclCd = exRecclCd;
    }
    public String getImRecclCd() {
        return imRecclCd;
    }
    public void setImRecclCd(String imRecclCd) {
        this.imRecclCd = imRecclCd;
    }
    
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
    }
    public String getBerth() {
        return berth;
    }
    public void setBerth(String berth) {
        this.berth = berth;
    }
    public String getCargoType() {
        return cargoType;
    }
    public void setCargoType(String cargoType) {
        this.cargoType = cargoType;
    }
    public String getGatheringStaff() {
        return gatheringStaff;
    }
    public void setGatheringStaff(String gatheringStaff) {
        this.gatheringStaff = gatheringStaff;
    }
    public String getGatheredDate() {
        return gatheredDate;
    }
    public void setGatheredDate(String gatheredDate) {
        this.gatheredDate = gatheredDate;
    }
    
    public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getWarehouseId() {
        return warehouseId;
    }
    public void setWarehouseId(String warehouseId) {
        this.warehouseId = warehouseId;
    }
    public boolean isSelected() {
        return selected;
    }
    public void setSelected(boolean selected) {
        this.selected = selected;
    }
    public String getSystemId() {
        return systemId;
    }
    public void setSystemId(String systemId) {
        this.systemId = systemId;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
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
     * @return Returns the loa.
     */
    public String getLoa() {
        return loa;
    }
    /**
     * @param loa The loa to set.
     */
    public void setLoa(String loa) {
        this.loa = loa;
    }
    /**
     * @return Returns the grt.
     */
    public String getGrt() {
        return grt;
    }
    /**
     * @param grt The grt to set.
     */
    public void setGrt(String grt) {
        this.grt = grt;
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
     * @return Returns the pkgTp.
     */
    public String getPkgTp() {
        return pkgTp;
    }
    /**
     * @param pkgTp The pkgTp to set.
     */
    public void setPkgTp(String pkgTp) {
        this.pkgTp = pkgTp;
    }
    /**
     * @return Returns the ldDs.
     */
    public String getLdDs() {
        return ldDs;
    }
    /**
     * @param ldDs The ldDs to set.
     */
    public void setLdDs(String ldDs) {
        this.ldDs = ldDs;
    }
    /**
     * @return Returns the ata.
     */
    public String getAta() {
        return ata;
    }
    /**
     * @param ata The ata to set.
     */
    public void setAta(String ata) {
        this.ata = ata;
    }
    /**
     * @return Returns the atd.
     */
    public String getAtd() {
        return atd;
    }
    /**
     * @param atd The atd to set.
     */
    public void setAtd(String atd) {
        this.atd = atd;
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
     * @return Returns the pod.
     */
    public String getPod() {
        return pod;
    }
    /**
     * @param pod The pod to set.
     */
    public void setPod(String pod) {
        this.pod = pod;
    }
    /**
     * @return Returns the pol.
     */
    public String getPol() {
        return pol;
    }
    /**
     * @param pol The pol to set.
     */
    public void setPol(String pol) {
        this.pol = pol;
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
     * @return Returns the tonnage.
     */
    public String getTonnage() {
        return tonnage;
    }
    /**
     * @param tonnage The tonnage to set.
     */
    public void setTonnage(String tonnage) {
        this.tonnage = tonnage;
    }
    public String getVslTrade() {
        return vslTrade;
    }
    public void setVslTrade(String vslTrade) {
        this.vslTrade = vslTrade;
    }
	public ArrayList<DataGatheringItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<DataGatheringItem> items) {
		this.items = items;
	}
	public String getBlSnNo() {
		return blSnNo;
	}
	public void setBlSnNo(String blSnNo) {
		this.blSnNo = blSnNo;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getEstDt() {
		return estDt;
	}
	public void setEstDt(String estDt) {
		this.estDt = estDt;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getTariffCode() {
		return tariffCode;
	}
	public void setTariffCode(String tariffCode) {
		this.tariffCode = tariffCode;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public String getSubTariffCode() {
		return subTariffCode;
	}
	public void setSubTariffCode(String subTariffCode) {
		this.subTariffCode = subTariffCode;
	}
	public String getWaiverDescr() {
		return waiverDescr;
	}
	public void setWaiverDescr(String waiverDescr) {
		this.waiverDescr = waiverDescr;
	}
	public String getGatherNo() {
		return gatherNo;
	}
	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}
	public String getCargoNo() {
		return cargoNo;
	}
	public void setCargoNo(String cargoNo) {
		this.cargoNo = cargoNo;
	}
	public String getWorkDate() {
		return workDate;
	}
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public String getCostCentreCode() {
		return costCentreCode;
	}
	public void setCostCentreCode(String costCentreCode) {
		this.costCentreCode = costCentreCode;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getIsUpdateRefNo() {
		return isUpdateRefNo;
	}
	public void setIsUpdateRefNo(String isUpdateRefNo) {
		this.isUpdateRefNo = isUpdateRefNo;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getMegaNo() {
		return megaNo;
	}
	public void setMegaNo(String megaNo) {
		this.megaNo = megaNo;
	}
	public String getWorkDt() {
		return workDt;
	}
	public void setWorkDt(String workDt) {
		this.workDt = workDt;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getSubmitDt() {
		return submitDt;
	}
	public void setSubmitDt(String submitDt) {
		this.submitDt = submitDt;
	}
	public String getMegaStatus() {
		return megaStatus;
	}
	public void setMegaStatus(String megaStatus) {
		this.megaStatus = megaStatus;
	}
	public String getApprvDt() {
		return apprvDt;
	}
	public void setApprvDt(String apprvDt) {
		this.apprvDt = apprvDt;
	}
	public String getPenalty() {
		return penalty;
	}
	public void setPenalty(String penalty) {
		this.penalty = penalty;
	}
	public String getEquType() {
		return equType;
	}
	public void setEquType(String equType) {
		this.equType = equType;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getCapacity() {
		return capacity;
	}
	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
	public String getGearType() {
		return gearType;
	}
	public void setGearType(String gearType) {
		this.gearType = gearType;
	}
	public String getFromTime() {
		return fromTime;
	}
	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}
	public String getToTime() {
		return toTime;
	}
	public void setToTime(String toTime) {
		this.toTime = toTime;
	}
	public double getTotalHrs() {
		return totalHrs;
	}
	public void setTotalHrs(double totalHrs) {
		this.totalHrs = totalHrs;
	}
	public String getNos() {
		return nos;
	}
	public void setNos(String nos) {
		this.nos = nos;
	}
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getSubTrfCd() {
		return subTrfCd;
	}
	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}
	public String getTrfDescr() {
		return trfDescr;
	}
	public void setTrfDescr(String trfDescr) {
		this.trfDescr = trfDescr;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCostct() {
		return costct;
	}
	public void setCostct(String costct) {
		this.costct = costct;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDelivery() {
		return delivery;
	}
	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getDgClass() {
		return dgClass;
	}
	public void setDgClass(String dgClass) {
		this.dgClass = dgClass;
	}
	public String getPackageType() {
		return packageType;
	}
	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}
	public String getTransportType() {
		return transportType;
	}
	public void setTransportType(String transportType) {
		this.transportType = transportType;
	}
	public double getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(double pkgQty) {
		this.pkgQty = pkgQty;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public String getTariffDesc() {
		return tariffDesc;
	}
	public void setTariffDesc(String tariffDesc) {
		this.tariffDesc = tariffDesc;
	}
	public String getReferenceNo() {
		return referenceNo;
	}
	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}
	public String getOperationNo() {
		return operationNo;
	}
	public void setOperationNo(String operationNo) {
		this.operationNo = operationNo;
	}
	public double getUnit1() {
		return unit1;
	}
	public void setUnit1(double unit1) {
		this.unit1 = unit1;
	}
	public double getUnit2() {
		return unit2;
	}
	public void setUnit2(double unit2) {
		this.unit2 = unit2;
	}
	public double getUnit3() {
		return unit3;
	}
	public void setUnit3(double unit3) {
		this.unit3 = unit3;
	}
	public String getShft() {
		return shft;
	}
	public void setShft(String shft) {
		this.shft = shft;
	}
	public double getOpWgt() {
		return opWgt;
	}
	public void setOpWgt(double opWgt) {
		this.opWgt = opWgt;
	}
	public double getOpMsrmt() {
		return opMsrmt;
	}
	public void setOpMsrmt(double opMsrmt) {
		this.opMsrmt = opMsrmt;
	}
	public double getOpPkgQty() {
		return opPkgQty;
	}
	public void setOpPkgQty(double opPkgQty) {
		this.opPkgQty = opPkgQty;
	}
	public double getDocWgt() {
		return docWgt;
	}
	public void setDocWgt(double docWgt) {
		this.docWgt = docWgt;
	}
	public double getDocPkgQty() {
		return docPkgQty;
	}
	public void setDocPkgQty(double docPkgQty) {
		this.docPkgQty = docPkgQty;
	}
	public double getBlMsrmt() {
		return blMsrmt;
	}
	public void setBlMsrmt(double blMsrmt) {
		this.blMsrmt = blMsrmt;
	}
	public double getBlWgt() {
		return blWgt;
	}
	public void setBlWgt(double blWgt) {
		this.blWgt = blWgt;
	}
	public double getBlPkgQty() {
		return blPkgQty;
	}
	public void setBlPkgQty(double blPkgQty) {
		this.blPkgQty = blPkgQty;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getFwrAgnt() {
		return fwrAgnt;
	}
	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}
	public String getVesselID() {
		return vesselID;
	}
	public void setVesselID(String vesselID) {
		this.vesselID = vesselID;
	}
	public String getVesselName() {
		return vesselName;
	}
	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}
	public String getSaCode() {
		return saCode;
	}
	public void setSaCode(String saCode) {
		this.saCode = saCode;
	}
	public String getSaName() {
		return saName;
	}
	public void setSaName(String saName) {
		this.saName = saName;
	}
	public String getDpSaCd() {
		return dpSaCd;
	}
	public void setDpSaCd(String dpSaCd) {
		this.dpSaCd = dpSaCd;
	}
	public String getDpSaName() {
		return dpSaName;
	}
	public void setDpSaName(String dpSaName) {
		this.dpSaName = dpSaName;
	}
	public String getVesselType() {
		return vesselType;
	}
	public void setVesselType(String vesselType) {
		this.vesselType = vesselType;
	}
	public String getVslServiceType() {
		return vslServiceType;
	}
	public void setVslServiceType(String vslServiceType) {
		this.vslServiceType = vslServiceType;
	}
	public String getBerthNo() {
		return berthNo;
	}
	public void setBerthNo(String berthNo) {
		this.berthNo = berthNo;
	}
	public double getBerthingHours() {
		return berthingHours;
	}
	public void setBerthingHours(double berthingHours) {
		this.berthingHours = berthingHours;
	}
	public double getAcceptableDelay() {
		return acceptableDelay;
	}
	public void setAcceptableDelay(double acceptableDelay) {
		this.acceptableDelay = acceptableDelay;
	}
	public double getOneStDouble() {
		return oneStDouble;
	}
	public void setOneStDouble(double oneStDouble) {
		this.oneStDouble = oneStDouble;
	}
	public double getTwoNdDouble() {
		return twoNdDouble;
	}
	public void setTwoNdDouble(double twoNdDouble) {
		this.twoNdDouble = twoNdDouble;
	}
	public double getThreeRdDouble() {
		return threeRdDouble;
	}
	public void setThreeRdDouble(double threeRdDouble) {
		this.threeRdDouble = threeRdDouble;
	}
	public double getDoubleBanking() {
		return doubleBanking;
	}
	public void setDoubleBanking(double doubleBanking) {
		this.doubleBanking = doubleBanking;
	}
	public double getArrivalTimeInMonthAsScheduled() {
		return arrivalTimeInMonthAsScheduled;
	}
	public void setArrivalTimeInMonthAsScheduled(double arrivalTimeInMonthAsScheduled) {
		this.arrivalTimeInMonthAsScheduled = arrivalTimeInMonthAsScheduled;
	}
	public double getArrivalTimeInMonth() {
		return arrivalTimeInMonth;
	}
	public void setArrivalTimeInMonth(double arrivalTimeInMonth) {
		this.arrivalTimeInMonth = arrivalTimeInMonth;
	}
	public double getSecondAcceptDelay() {
		return secondAcceptDelay;
	}
	public void setSecondAcceptDelay(double secondAcceptDelay) {
		this.secondAcceptDelay = secondAcceptDelay;
	}
	public double getNormalAcceptDelay() {
		return normalAcceptDelay;
	}
	public void setNormalAcceptDelay(double normalAcceptDelay) {
		this.normalAcceptDelay = normalAcceptDelay;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPurpCall() {
		return purpCall;
	}
	public void setPurpCall(String purpCall) {
		this.purpCall = purpCall;
	}
	public String getIsValidated() {
		return isValidated;
	}
	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getPayerTpCd() {
		return payerTpCd;
	}
	public void setPayerTpCd(String payerTpCd) {
		this.payerTpCd = payerTpCd;
	}
	public String getPayTpCd() {
		return payTpCd;
	}
	public void setPayTpCd(String payTpCd) {
		this.payTpCd = payTpCd;
	}
	public String getDwt() {
		return dwt;
	}
	public void setDwt(String dwt) {
		this.dwt = dwt;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getMasterBL() {
		return masterBL;
	}
	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public ArrayList<GatheredDataItem> getChildGatheredData() {
		return childGatheredData;
	}
	public void setChildGatheredData(ArrayList<GatheredDataItem> childGatheredData) {
		this.childGatheredData = childGatheredData;
	}
	public ArrayList<DataGatheringItem> getChildVesselInfo() {
		return childVesselInfo;
	}
	public void setChildVesselInfo(ArrayList<DataGatheringItem> childVesselInfo) {
		this.childVesselInfo = childVesselInfo;
	}
	public ArrayList<DataGatheringItem> getChildCargoInfo() {
		return childCargoInfo;
	}
	public void setChildCargoInfo(ArrayList<DataGatheringItem> childCargoInfo) {
		this.childCargoInfo = childCargoInfo;
	}
	public ArrayList<DataGatheringItem> getChildCargoSumInfo() {
		return childCargoSumInfo;
	}
	public void setChildCargoSumInfo(ArrayList<DataGatheringItem> childCargoSumInfo) {
		this.childCargoSumInfo = childCargoSumInfo;
	}
	public ArrayList<DataGatheringItem> getChildEquipmentInfo() {
		return childEquipmentInfo;
	}
	public void setChildEquipmentInfo(ArrayList<DataGatheringItem> childEquipmentInfo) {
		this.childEquipmentInfo = childEquipmentInfo;
	}
	public ArrayList<DataGatheringItem> getPayerInfo() {
		return payerInfo;
	}
	public void setPayerInfo(ArrayList<DataGatheringItem> payerInfo) {
		this.payerInfo = payerInfo;
	}
	public ArrayList<DataGatheringItem> getDetailList() {
		return detailList;
	}
	public void setDetailList(ArrayList<DataGatheringItem> detailList) {
		this.detailList = detailList;
	}
	public ArrayList<DataGatheringItem> getBbtcheckInfo() {
		return bbtcheckInfo;
	}
	public void setBbtcheckInfo(ArrayList<DataGatheringItem> bbtcheckInfo) {
		this.bbtcheckInfo = bbtcheckInfo;
	}
	public ArrayList<ProformaInvoiceItem> getProformaItems() {
		return proformaItems;
	}
	public void setProformaItems(ArrayList<ProformaInvoiceItem> proformaItems) {
		this.proformaItems = proformaItems;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getExpectedDeliveryDay() {
		return expectedDeliveryDay;
	}
	public void setExpectedDeliveryDay(String expectedDeliveryDay) {
		this.expectedDeliveryDay = expectedDeliveryDay;
	}
	
}
