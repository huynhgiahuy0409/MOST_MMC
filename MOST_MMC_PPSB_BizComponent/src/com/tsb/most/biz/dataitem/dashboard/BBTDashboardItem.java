package com.tsb.most.biz.dataitem.dashboard;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class BBTDashboardItem extends DataItem {
	
	//VesselCountItem
    private int vslAnchCnt;
    private int vslBerthCnt;
    
    //ShiftGroupDefItem
    private String shftId;
    private String shftNm;
    private String fmHhmm;
    private String toHhmm;
    
    //AccidentsCountItem
    private int totalAcdntCnt;
    private int openAcdntCnt;
    private int closedAcdntCnt;
    
    //TerminalOccupancyItem
    private String cargoType;
    private int berthCnt;
    private double cargoPercent;
    
    //bulkSummaryItem
    private String vslCallId;
    private String workYmd;
    private String vslNm;
    private String cgOpeTp;
    private String berthCd;
    private String cgCmdt;
    private Double cgWgt;
    private int mlaHoseCnt;
    private int flxHoseCnt;
    
    //CargoOperationItem
    private String cgTp;
    private int vslCnt;
    private double tonnage;
    private double cgWgtRate;
    
    //bulkHandlingBalanceCompareItem
    private String eqNm;
    private double handlingWgt;
    private double totalHandlingWgt;
    private double balanceWgt;
    private double totalWgt;
    
    //bulkProductivityItem
    private String atb;
    private String atbWorkYmd;
    private String atu;
    private String atuWorkYmd;
    private String hatchNo;
    private String eqFacNo;
    private String eqFacNm;
    private String staffNo;
    private String cmdtGrp;
    private String cmdtGrpCd;
    private double wgt;
    private double kpiIdx;
    private String shftStHr;
    private String shftEndHr;
    private String currHr;
    private String dlyRsnCd;
    private double dlyHrs;
    private double totalNetWrkHrs;
    private double handlingRate;

    private ArrayList<BBTDashboardItem> vslBulkProductivity;
    private ArrayList<BBTDashboardItem> craneBulkProductivity;
    
    //LorriesTurnaroundItem
    private String vslLorryCnt;
    private String lorryCount;
    private String lorryTripsCount;
    
    //BulkDelayItem
    private String berthDlyHrs;
    private String berthDlyCd;
    
    //WarehouseYardHandlingItem
    private String jobTypeCd;
    
    public BBTDashboardItem() {
    }
    
    public int getVslAnchCnt() {
        return vslAnchCnt;
    }

    public void setVslAnchCnt(int vslAnchCnt) {
        this.vslAnchCnt = vslAnchCnt;
    }

    public int getVslBerthCnt() {
        return vslBerthCnt;
    }

    public void setVslBerthCnt(int vslBerthCnt) {
        this.vslBerthCnt = vslBerthCnt;
    }

	public String getShftId() {
		return shftId;
	}

	public void setShftId(String shftId) {
		this.shftId = shftId;
	}

	public String getShftNm() {
		return shftNm;
	}

	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}

	public String getFmHhmm() {
		return fmHhmm;
	}

	public void setFmHhmm(String fmHhmm) {
		this.fmHhmm = fmHhmm;
	}

	public String getToHhmm() {
		return toHhmm;
	}

	public void setToHhmm(String toHhmm) {
		this.toHhmm = toHhmm;
	}

	public int getTotalAcdntCnt() {
		return totalAcdntCnt;
	}

	public void setTotalAcdntCnt(int totalAcdntCnt) {
		this.totalAcdntCnt = totalAcdntCnt;
	}

	public int getOpenAcdntCnt() {
		return openAcdntCnt;
	}

	public void setOpenAcdntCnt(int openAcdntCnt) {
		this.openAcdntCnt = openAcdntCnt;
	}

	public int getClosedAcdntCnt() {
		return closedAcdntCnt;
	}

	public void setClosedAcdntCnt(int closedAcdntCnt) {
		this.closedAcdntCnt = closedAcdntCnt;
	}

	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	public int getBerthCnt() {
		return berthCnt;
	}

	public void setBerthCnt(int berthCnt) {
		this.berthCnt = berthCnt;
	}

	public double getCargoPercent() {
		return cargoPercent;
	}

	public void setCargoPercent(double cargoPercent) {
		this.cargoPercent = cargoPercent;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getWorkYmd() {
		return workYmd;
	}

	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getCgOpeTp() {
		return cgOpeTp;
	}

	public void setCgOpeTp(String cgOpeTp) {
		this.cgOpeTp = cgOpeTp;
	}

	public String getBerthCd() {
		return berthCd;
	}

	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}

	public String getCgCmdt() {
		return cgCmdt;
	}

	public void setCgCmdt(String cgCmdt) {
		this.cgCmdt = cgCmdt;
	}

	public Double getCgWgt() {
		return cgWgt;
	}

	public void setCgWgt(Double cgWgt) {
		this.cgWgt = cgWgt;
	}

	public int getMlaHoseCnt() {
		return mlaHoseCnt;
	}

	public void setMlaHoseCnt(int mlaHoseCnt) {
		this.mlaHoseCnt = mlaHoseCnt;
	}

	public int getFlxHoseCnt() {
		return flxHoseCnt;
	}

	public void setFlxHoseCnt(int flxHoseCnt) {
		this.flxHoseCnt = flxHoseCnt;
	}

	public String getCgTp() {
		return cgTp;
	}

	public void setCgTp(String cgTp) {
		this.cgTp = cgTp;
	}

	public int getVslCnt() {
		return vslCnt;
	}

	public void setVslCnt(int vslCnt) {
		this.vslCnt = vslCnt;
	}

	public double getTonnage() {
		return tonnage;
	}

	public void setTonnage(double tonnage) {
		this.tonnage = tonnage;
	}

	public double getCgWgtRate() {
		return cgWgtRate;
	}

	public void setCgWgtRate(double cgWgtRate) {
		this.cgWgtRate = cgWgtRate;
	}

	public String getEqNm() {
		return eqNm;
	}

	public void setEqNm(String eqNm) {
		this.eqNm = eqNm;
	}

	public double getHandlingWgt() {
		return handlingWgt;
	}

	public void setHandlingWgt(double handlingWgt) {
		this.handlingWgt = handlingWgt;
	}

	public double getTotalHandlingWgt() {
		return totalHandlingWgt;
	}

	public void setTotalHandlingWgt(double totalHandlingWgt) {
		this.totalHandlingWgt = totalHandlingWgt;
	}

	public double getBalanceWgt() {
		return balanceWgt;
	}

	public void setBalanceWgt(double balanceWgt) {
		this.balanceWgt = balanceWgt;
	}

	public double getTotalWgt() {
		return totalWgt;
	}

	public void setTotalWgt(double totalWgt) {
		this.totalWgt = totalWgt;
	}

	public String getAtb() {
		return atb;
	}

	public void setAtb(String atb) {
		this.atb = atb;
	}

	public String getAtbWorkYmd() {
		return atbWorkYmd;
	}

	public void setAtbWorkYmd(String atbWorkYmd) {
		this.atbWorkYmd = atbWorkYmd;
	}

	public String getAtu() {
		return atu;
	}

	public void setAtu(String atu) {
		this.atu = atu;
	}

	public String getAtuWorkYmd() {
		return atuWorkYmd;
	}

	public void setAtuWorkYmd(String atuWorkYmd) {
		this.atuWorkYmd = atuWorkYmd;
	}

	public String getHatchNo() {
		return hatchNo;
	}

	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}

	public String getEqFacNo() {
		return eqFacNo;
	}

	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}

	public String getEqFacNm() {
		return eqFacNm;
	}

	public void setEqFacNm(String eqFacNm) {
		this.eqFacNm = eqFacNm;
	}

	public String getStaffNo() {
		return staffNo;
	}

	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}

	public String getCmdtGrp() {
		return cmdtGrp;
	}

	public void setCmdtGrp(String cmdtGrp) {
		this.cmdtGrp = cmdtGrp;
	}

	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}

	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}

	public double getWgt() {
		return wgt;
	}

	public void setWgt(double wgt) {
		this.wgt = wgt;
	}

	public double getKpiIdx() {
		return kpiIdx;
	}

	public void setKpiIdx(double kpiIdx) {
		this.kpiIdx = kpiIdx;
	}

	public String getShftStHr() {
		return shftStHr;
	}

	public void setShftStHr(String shftStHr) {
		this.shftStHr = shftStHr;
	}

	public String getShftEndHr() {
		return shftEndHr;
	}

	public void setShftEndHr(String shftEndHr) {
		this.shftEndHr = shftEndHr;
	}

	public String getCurrHr() {
		return currHr;
	}

	public void setCurrHr(String currHr) {
		this.currHr = currHr;
	}

	public String getDlyRsnCd() {
		return dlyRsnCd;
	}

	public void setDlyRsnCd(String dlyRsnCd) {
		this.dlyRsnCd = dlyRsnCd;
	}

	public double getDlyHrs() {
		return dlyHrs;
	}

	public void setDlyHrs(double dlyHrs) {
		this.dlyHrs = dlyHrs;
	}

	public double getTotalNetWrkHrs() {
		return totalNetWrkHrs;
	}

	public void setTotalNetWrkHrs(double totalNetWrkHrs) {
		this.totalNetWrkHrs = totalNetWrkHrs;
	}

	public double getHandlingRate() {
		return handlingRate;
	}

	public void setHandlingRate(double handlingRate) {
		this.handlingRate = handlingRate;
	}

	public ArrayList<BBTDashboardItem> getVslBulkProductivity() {
		return vslBulkProductivity;
	}

	public void setVslBulkProductivity(ArrayList<BBTDashboardItem> vslBulkProductivity) {
		this.vslBulkProductivity = vslBulkProductivity;
	}

	public ArrayList<BBTDashboardItem> getCraneBulkProductivity() {
		return craneBulkProductivity;
	}

	public void setCraneBulkProductivity(ArrayList<BBTDashboardItem> craneBulkProductivity) {
		this.craneBulkProductivity = craneBulkProductivity;
	}

	public String getVslLorryCnt() {
		return vslLorryCnt;
	}

	public void setVslLorryCnt(String vslLorryCnt) {
		this.vslLorryCnt = vslLorryCnt;
	}

	public String getLorryCount() {
		return lorryCount;
	}

	public void setLorryCount(String lorryCount) {
		this.lorryCount = lorryCount;
	}

	public String getLorryTripsCount() {
		return lorryTripsCount;
	}

	public void setLorryTripsCount(String lorryTripsCount) {
		this.lorryTripsCount = lorryTripsCount;
	}

	public String getBerthDlyHrs() {
		return berthDlyHrs;
	}

	public void setBerthDlyHrs(String berthDlyHrs) {
		this.berthDlyHrs = berthDlyHrs;
	}

	public String getBerthDlyCd() {
		return berthDlyCd;
	}

	public void setBerthDlyCd(String berthDlyCd) {
		this.berthDlyCd = berthDlyCd;
	}

	public String getJobTypeCd() {
		return jobTypeCd;
	}

	public void setJobTypeCd(String jobTypeCd) {
		this.jobTypeCd = jobTypeCd;
	}
	
	public void initBulkSummary() {
        this.setVslCallId("No Data");
        this.setWorkYmd("No Data");
        this.setShftId("No Data");
        this.setVslNm("No Data");
        this.setVslNm("No Data");
        this.setCgOpeTp("No Data");
        this.setBerthCd("No Data");
        this.setCgCmdt("No Data");
        this.setCgWgt(0.01);
	}
	
	public void initCargoOperation() {
		this.setCgTp("No Data");
        this.setVslCnt(0);
        this.setCgWgtRate(0.01);
	}
    
}
