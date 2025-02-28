package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class TariffCodeItem extends DataItem{
    private String repTrfRegNo;
    private String systemId;
    private String trfCd;
    private String subTrfCd;
    private String descr;
    private String trfTpCd;
    private String billTpCd;
    private String ssrTpCd;
    private String costCntCd;
    private String pyrTpCd;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;
    private String sCdNm;
/*    private String minVal1;
    private String minVal2;
    private String minVal3;*/
    private String no;
    private String trfTpCdNm;
    private String chk;
    private String stdPrc;
    
    //GST Type Code - added by Joseph - Aug 20, 2014
    private String gstTpCd;
    private String gstValue;
    private String gstRate;
    private String gstType;
    private String gstValueHidden;
    
    private List billTypeList;
    private List tariffCodeTypeList;
    private List ssrTypeList;
    private List partnerTypeList;
    private List costCenterList;
    private List invoiceUnit1;
    private List invoiceUnit2;
    private List invoiceUnit3;
    private List equipmentTypeList;
    private List tradeTypeList;
    private List dockageTypeList;
    private List freshWaterServiceTypeList;
    private List gstList;
    private List tariffCodesList;
    private List tariffCondPrptList;
    private List tariffCondList;
    private List equipmentCapaList;
    
    private String workingStatus;
    
    private String selectedFlag;
    
    private String updDt;
    
    private String searchTp;
    private String eqTp;
    private String templateCd;
    private String financialCode;
    private String category;
    private String delvTpCd;
    private String cargoTradeTp;
    private String pkgTp;
    private String shftTp;
    private String dgClass;
    private String whTp;
    private String oprMode;
    private String oprTp;
    private String vehicle;
    private String operator;
    private String operatorNo;
    private String cargoFrom;
    private String cargoTo;
    private String msrmtCond;
    private String equipTp;
    private String capacity;
    private String workingArea;
    private String steveRole;
    private String subDay;
    private String paneltySteve;
    private String useOfWb;
    private String cgStorageFrom;
    private String cgStorageTo;
    private String accumFrom;
    private String accumTo;
    private String loaFrom;
    private String loaTo;
    private String arrvDt;
    private String purpCall;
    private String vslTp;
    private String vslTradeTp;
    private String passenAgeFrom;
    private String passenAgeTo;
    private String dockTp;
    private String freshWtServe;
    private String damagedChk;
    private String penLate;
    private String operYn;
    private String descrVN;
    private String erpCostCent;
    private String grtFrom;
    private String grtTo;
    private String wireTp;
    private String prfYn;
    private String ssrYn;
    
    private ArrayList<TariffConditionItem> tariffConditionList;
    private ArrayList<TariffConditionPropertyItem> tariffConditionPrptList;
    
    public String getSystemId() {
        return systemId;
    }
    public void setSystemId(String systemId) {
        this.systemId = systemId;
    }
    
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	private ArrayList<TariffCodeItem>tariffList;
    
    public ArrayList<TariffCodeItem> getTariffList() {
		return tariffList;
	}
	public void setTariffList(ArrayList<TariffCodeItem> tariffList) {
		this.tariffList = tariffList;
	}
	public String getGstType() {
        return gstType;
    }
    public void setGstType(String gstType) {
        this.gstType = gstType;
    }
    public String getGstRate() {
		return gstRate;
	}
	public void setGstRate(String gstRate) {
		this.gstRate = gstRate;
	}
	public String getGstValueHidden() {
        return gstValueHidden;
    }
    public void setGstValueHidden(String gstValueHidden) {
        this.gstValueHidden = gstValueHidden;
    }
    public String getChk() {
        return chk;
    }
    public void setChk(String chk) {
        this.chk = chk;
    }
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
/*    public String getMinVal1() {
        return minVal1;
    }
    public void setMinVal1(String minVal1) {
        this.minVal1 = minVal1;
    }
    public String getMinVal2() {
        return minVal2;
    }
    public void setMinVal2(String minVal2) {
        this.minVal2 = minVal2;
    }
    public String getMinVal3() {
        return minVal3;
    }
    public void setMinVal3(String minVal3) {
        this.minVal3 = minVal3;
    }*/
    public String getBillTpCd() {
        return billTpCd;
    }
    public void setBillTpCd(String bilTpCd) {
        this.billTpCd = bilTpCd;
    }
    public String getCostCntCd() {
        return costCntCd;
    }
    public void setCostCntCd(String costCntCd) {
        this.costCntCd = costCntCd;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getIvUnit1() {
        return ivUnit1;
    }
    public void setIvUnit1(String ivUnit1) {
        this.ivUnit1 = ivUnit1;
    }
    public String getIvUnit2() {
        return ivUnit2;
    }
    public void setIvUnit2(String ivUnit2) {
        this.ivUnit2 = ivUnit2;
    }
    public String getIvUnit3() {
        return ivUnit3;
    }
    public void setIvUnit3(String ivUnit3) {
        this.ivUnit3 = ivUnit3;
    }
    public String getPyrTpCd() {
        return pyrTpCd;
    }
    public void setPyrTpCd(String pyrTpCd) {
        this.pyrTpCd = pyrTpCd;
    }
    public String getSsrTpCd() {
        return ssrTpCd;
    }
    public void setSsrTpCd(String ssrTpCd) {
        this.ssrTpCd = ssrTpCd;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getTrfTpCd() {
        return trfTpCd;
    }
    public void setTrfTpCd(String trfTpCd) {
        this.trfTpCd = trfTpCd;
    }

    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }

    public String getRepTrfRegNo() {
        return repTrfRegNo;
    }
    public void setRepTrfRegNo(String repTrfRegNo) {
        this.repTrfRegNo = repTrfRegNo;
    }
    public String getSCdNm() {
        return sCdNm;
    }
    public void setSCdNm(String cdNm) {
        sCdNm = cdNm;
    }
    public String getTrfTpCdNm() {
        return trfTpCdNm;
    }
    public void setTrfTpCdNm(String trfTpCdNm) {
        this.trfTpCdNm = trfTpCdNm;
    }
    public String getStdPrc() {
        return stdPrc;
    }
    public void setStdPrc(String stdPrc) {
        this.stdPrc = stdPrc;
    }
    public String getGstTpCd() {
        return gstTpCd;
    }
    public void setGstTpCd(String gstTpCd) {
        this.gstTpCd = gstTpCd;
    }
    public String getGstValue() {
        return gstValue;
    }
    public void setGstValue(String gstValue) {
        this.gstValue = gstValue;
    }
	public String getsCdNm() {
		return sCdNm;
	}
	public void setsCdNm(String sCdNm) {
		this.sCdNm = sCdNm;
	}
	public List getBillTypeList() {
		return billTypeList;
	}
	public void setBillTypeList(List billTypeList) {
		this.billTypeList = billTypeList;
	}
	public List getTariffCodeTypeList() {
		return tariffCodeTypeList;
	}
	public void setTariffCodeTypeList(List tariffCodeTypeList) {
		this.tariffCodeTypeList = tariffCodeTypeList;
	}
	public List getSsrTypeList() {
		return ssrTypeList;
	}
	public void setSsrTypeList(List ssrTypeList) {
		this.ssrTypeList = ssrTypeList;
	}
	public List getPartnerTypeList() {
		return partnerTypeList;
	}
	public void setPartnerTypeList(List partnerTypeList) {
		this.partnerTypeList = partnerTypeList;
	}
	public List getCostCenterList() {
		return costCenterList;
	}
	public void setCostCenterList(List costCenterList) {
		this.costCenterList = costCenterList;
	}
	public List getInvoiceUnit1() {
		return invoiceUnit1;
	}
	public void setInvoiceUnit1(List invoiceUnit1) {
		this.invoiceUnit1 = invoiceUnit1;
	}
	public List getInvoiceUnit2() {
		return invoiceUnit2;
	}
	public void setInvoiceUnit2(List invoiceUnit2) {
		this.invoiceUnit2 = invoiceUnit2;
	}
	public List getInvoiceUnit3() {
		return invoiceUnit3;
	}
	public void setInvoiceUnit3(List invoiceUnit3) {
		this.invoiceUnit3 = invoiceUnit3;
	}
	public List getEquipmentTypeList() {
		return equipmentTypeList;
	}
	public void setEquipmentTypeList(List equipmentTypeList) {
		this.equipmentTypeList = equipmentTypeList;
	}
	public List getTradeTypeList() {
		return tradeTypeList;
	}
	public void setTradeTypeList(List tradeTypeList) {
		this.tradeTypeList = tradeTypeList;
	}
	public List getDockageTypeList() {
		return dockageTypeList;
	}
	public void setDockageTypeList(List dockageTypeList) {
		this.dockageTypeList = dockageTypeList;
	}
	public List getFreshWaterServiceTypeList() {
		return freshWaterServiceTypeList;
	}
	public void setFreshWaterServiceTypeList(List freshWaterServiceTypeList) {
		this.freshWaterServiceTypeList = freshWaterServiceTypeList;
	}
	public List getGstList() {
		return gstList;
	}
	public void setGstList(List gstList) {
		this.gstList = gstList;
	}
	public List getTariffCodesList() {
		return tariffCodesList;
	}
	public void setTariffCodesList(List tariffCodesList) {
		this.tariffCodesList = tariffCodesList;
	}
	public List getTariffCondPrptList() {
		return tariffCondPrptList;
	}
	public void setTariffCondPrptList(List tariffCondPrptList) {
		this.tariffCondPrptList = tariffCondPrptList;
	}
	public List getTariffCondList() {
		return tariffCondList;
	}
	public void setTariffCondList(List tariffCondList) {
		this.tariffCondList = tariffCondList;
	}
	public String getSelectedFlag() {
		return selectedFlag;
	}
	public void setSelectedFlag(String selectedFlag) {
		this.selectedFlag = selectedFlag;
	}
	public List getEquipmentCapaList() {
		return equipmentCapaList;
	}
	public void setEquipmentCapaList(List equipmentCapaList) {
		this.equipmentCapaList = equipmentCapaList;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getSearchTp() {
		return searchTp;
	}
	public void setSearchTp(String searchTp) {
		this.searchTp = searchTp;
	}
	public String getEqTp() {
		return eqTp;
	}
	public void setEqTp(String eqTp) {
		this.eqTp = eqTp;
	}
	public String getTemplateCd() {
		return templateCd;
	}
	public void setTemplateCd(String templateCd) {
		this.templateCd = templateCd;
	}
	public ArrayList<TariffConditionItem> getTariffConditionList() {
		return tariffConditionList;
	}
	public void setTariffConditionList(ArrayList<TariffConditionItem> tariffConditionList) {
		this.tariffConditionList = tariffConditionList;
	}
	public ArrayList<TariffConditionPropertyItem> getTariffConditionPrptList() {
		return tariffConditionPrptList;
	}
	public void setTariffConditionPrptList(ArrayList<TariffConditionPropertyItem> tariffConditionPrptList) {
		this.tariffConditionPrptList = tariffConditionPrptList;
	}
	public String getFinancialCode() {
		return financialCode;
	}
	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getCargoTradeTp() {
		return cargoTradeTp;
	}
	public void setCargoTradeTp(String cargoTradeTp) {
		this.cargoTradeTp = cargoTradeTp;
	}
	public String getPkgTp() {
		return pkgTp;
	}
	public void setPkgTp(String pkgTp) {
		this.pkgTp = pkgTp;
	}
	public String getShftTp() {
		return shftTp;
	}
	public void setShftTp(String shftTp) {
		this.shftTp = shftTp;
	}
	public String getDgClass() {
		return dgClass;
	}
	public void setDgClass(String dgClass) {
		this.dgClass = dgClass;
	}
	public String getWhTp() {
		return whTp;
	}
	public void setWhTp(String whTp) {
		this.whTp = whTp;
	}
	public String getOprMode() {
		return oprMode;
	}
	public void setOprMode(String oprMode) {
		this.oprMode = oprMode;
	}
	public String getOprTp() {
		return oprTp;
	}
	public void setOprTp(String oprTp) {
		this.oprTp = oprTp;
	}
	public String getVehicle() {
		return vehicle;
	}
	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getOperatorNo() {
		return operatorNo;
	}
	public void setOperatorNo(String operatorNo) {
		this.operatorNo = operatorNo;
	}
	public String getCargoFrom() {
		return cargoFrom;
	}
	public void setCargoFrom(String cargoFrom) {
		this.cargoFrom = cargoFrom;
	}
	public String getCargoTo() {
		return cargoTo;
	}
	public void setCargoTo(String cargoTo) {
		this.cargoTo = cargoTo;
	}
	public String getMsrmtCond() {
		return msrmtCond;
	}
	public void setMsrmtCond(String msrmtCond) {
		this.msrmtCond = msrmtCond;
	}
	public String getEquipTp() {
		return equipTp;
	}
	public void setEquipTp(String equipTp) {
		this.equipTp = equipTp;
	}
	public String getCapacity() {
		return capacity;
	}
	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
	public String getWorkingArea() {
		return workingArea;
	}
	public void setWorkingArea(String workingArea) {
		this.workingArea = workingArea;
	}
	public String getSteveRole() {
		return steveRole;
	}
	public void setSteveRole(String steveRole) {
		this.steveRole = steveRole;
	}
	public String getSubDay() {
		return subDay;
	}
	public void setSubDay(String subDay) {
		this.subDay = subDay;
	}
	public String getPaneltySteve() {
		return paneltySteve;
	}
	public void setPaneltySteve(String paneltySteve) {
		this.paneltySteve = paneltySteve;
	}
	public String getUseOfWb() {
		return useOfWb;
	}
	public void setUseOfWb(String useOfWb) {
		this.useOfWb = useOfWb;
	}
	public String getCgStorageFrom() {
		return cgStorageFrom;
	}
	public void setCgStorageFrom(String cgStorageFrom) {
		this.cgStorageFrom = cgStorageFrom;
	}
	public String getCgStorageTo() {
		return cgStorageTo;
	}
	public void setCgStorageTo(String cgStorageTo) {
		this.cgStorageTo = cgStorageTo;
	}
	public String getAccumFrom() {
		return accumFrom;
	}
	public void setAccumFrom(String accumFrom) {
		this.accumFrom = accumFrom;
	}
	public String getAccumTo() {
		return accumTo;
	}
	public void setAccumTo(String accumTo) {
		this.accumTo = accumTo;
	}
	public String getLoaFrom() {
		return loaFrom;
	}
	public void setLoaFrom(String loaFrom) {
		this.loaFrom = loaFrom;
	}
	public String getLoaTo() {
		return loaTo;
	}
	public void setLoaTo(String loaTo) {
		this.loaTo = loaTo;
	}
	public String getArrvDt() {
		return arrvDt;
	}
	public void setArrvDt(String arrvDt) {
		this.arrvDt = arrvDt;
	}
	public String getPurpCall() {
		return purpCall;
	}
	public void setPurpCall(String purpCall) {
		this.purpCall = purpCall;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getVslTradeTp() {
		return vslTradeTp;
	}
	public void setVslTradeTp(String vslTradeTp) {
		this.vslTradeTp = vslTradeTp;
	}
	public String getPassenAgeFrom() {
		return passenAgeFrom;
	}
	public void setPassenAgeFrom(String passenAgeFrom) {
		this.passenAgeFrom = passenAgeFrom;
	}
	public String getPassenAgeTo() {
		return passenAgeTo;
	}
	public void setPassenAgeTo(String passenAgeTo) {
		this.passenAgeTo = passenAgeTo;
	}
	public String getDockTp() {
		return dockTp;
	}
	public void setDockTp(String dockTp) {
		this.dockTp = dockTp;
	}
	public String getFreshWtServe() {
		return freshWtServe;
	}
	public void setFreshWtServe(String freshWtServe) {
		this.freshWtServe = freshWtServe;
	}
	public String getDamagedChk() {
		return damagedChk;
	}
	public void setDamagedChk(String damagedChk) {
		this.damagedChk = damagedChk;
	}
	public String getPenLate() {
		return penLate;
	}
	public void setPenLate(String penLate) {
		this.penLate = penLate;
	}
	public String getOperYn() {
		return operYn;
	}
	public void setOperYn(String operYn) {
		this.operYn = operYn;
	}
	public String getDescrVN() {
		return descrVN;
	}
	public void setDescrVN(String descrVN) {
		this.descrVN = descrVN;
	}
	public String getErpCostCent() {
		return erpCostCent;
	}
	public void setErpCostCent(String erpCostCent) {
		this.erpCostCent = erpCostCent;
	}
	public String getGrtFrom() {
		return grtFrom;
	}
	public void setGrtFrom(String grtFrom) {
		this.grtFrom = grtFrom;
	}
	public String getGrtTo() {
		return grtTo;
	}
	public void setGrtTo(String grtTo) {
		this.grtTo = grtTo;
	}
	public String getWireTp() {
		return wireTp;
	}
	public void setWireTp(String wireTp) {
		this.wireTp = wireTp;
	}
	public String getPrfYn() {
		return prfYn;
	}
	public void setPrfYn(String prfYn) {
		this.prfYn = prfYn;
	}
	public String getSsrYn() {
		return ssrYn;
	}
	public void setSsrYn(String ssrYn) {
		this.ssrYn = ssrYn;
	}
}
