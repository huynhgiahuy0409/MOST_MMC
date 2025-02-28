package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;

import com.tsb.most.biz.dataitem.billing.CostCenterItem;
import com.tsb.most.framework.dataitem.DataItem;

public class StaffAttendanceItem extends DataItem {

	private static final long serialVersionUID = 2029554654099188200L;
	
	private String rosterShift;
	private String groupNm;
	private String roster;
	private String hiddenEmpId;
	private String bulkGantry;
	private String no;
	private String seq;
	private String staffNo;
	private String dspStaffNo;
	private String staffNm;
	private String role;
	private String roleNm;
	private String vslCallId;
	private String vslNm;
	private String shiftId;
	private String shiftNm;
	private String dayTp;
	private String dayTpNm;
	private String fmTime;
	private String toTime;
	private String workHrs;
	private String otFmTime;
	private String otToTime;
	private String otHrs;
	private String isFrday;
	private String isSixTurn;
	private String ma;
	private String ea;
	private String incentive;
	private String berthUnberthing;
	private String updUserId;
	private String updDate;
	private String isPublicHoliday;
	private String secondShft;
	private String thirdShft;
	private String transferType;
	private String purpose;
	private String changeShft;
	private String purpType;
	private String purpTpCdNm;
	private String grp;
	private String userId;
	private ArrayList<StaffAttendanceItem> items;

	private String itChk;

	public ArrayList<StaffAttendanceItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<StaffAttendanceItem> items) {
		this.items = items;
	}

	public String getItChk() {
		return itChk;
	}

	public void setItChk(String itChk) {
		this.itChk = itChk;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getsCd() {
		return sCd;
	}

	public void setsCd(String sCd) {
		this.sCd = sCd;
	}

	public String getsCdNm() {
		return sCdNm;
	}

	public void setsCdNm(String sCdNm) {
		this.sCdNm = sCdNm;
	}

	public String getGrp() {
		return grp;
	}

	public void setGrp(String grp) {
		this.grp = grp;
	}

	public String getPurpTpCdNm() {
		return purpTpCdNm;
	}

	public void setPurpTpCdNm(String purpTpCdNm) {
		this.purpTpCdNm = purpTpCdNm;
	}

	public String getPurpType() {
		return purpType;
	}

	public void setPurpType(String purpType) {
		this.purpType = purpType;
	}

	public String getChangeShft() {
		return changeShft;
	}

	public void setChangeShft(String changeShft) {
		this.changeShft = changeShft;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getGroupNm() {
		return groupNm;
	}

	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}

	public String getRoster() {
		return roster;
	}

	public void setRoster(String roster) {
		this.roster = roster;
	}

	public String getTransferType() {
		return transferType;
	}

	public void setTransferType(String transferType) {
		this.transferType = transferType;
	}

	private String curPage;
	private String rn;
	private String totalPage;

	public String getBulkGantry() {
		return bulkGantry;
	}

	public void setBulkGantry(String bulkGantry) {
		this.bulkGantry = bulkGantry;
	}

	/**
	 * @return Returns the isPuclicHoliday.
	 */
	public String getIsPublicHoliday() {
		return isPublicHoliday;
	}

	/**
	 * @param isPuclicHoliday The isPuclicHoliday to set.
	 */
	public void setIsPublicHoliday(String isPublicHoliday) {
		this.isPublicHoliday = isPublicHoliday;
	}

	// etc
	private String otFactor;
	private String fmHhMm;
	private String toHhMm;
	private String workCd;
	private String workCdNm;
	private String workNm;
	private String workYmd;
	private String dspWorkYmd;
	private String rsDivCd;
	private String purpTpCd;
	private String rsnCd;
	private String rsnNm;
	private String otFmHhMm;
	private String otToHhMm;

	// staff attendance voucher
	private String opeComp;
	private String oprQty;
	private String dayWork;
	private String isFriday;
	private String saveType;
	private String sCd;
	private String sCdNm;
	private String tempCompare;
	private String leaveTp;

	// Fix issue 30694
	private String normalShiftId;
	private Integer normalShiftIdx;

	// collection for allowance item
	private ArrayList allowanceItems = new ArrayList();

	private String updateSignature;

	public String getUpdateSignature() {
		return updateSignature;
	}

	public void setUpdateSignature(String updateSignature) {
		this.updateSignature = updateSignature;
	}

	/**
	 * @return Returns the normalShiftIdx.
	 */
	public Integer getNormalShiftIdx() {
		return normalShiftIdx;
	}

	/**
	 * @param normalShiftIdx The normalShiftIdx to set.
	 */
	public void setNormalShiftIdx(Integer normalShiftIdx) {
		this.normalShiftIdx = normalShiftIdx;
	}

	private String normalShift;
	private String ot1stFrom;
	private String ot1stTo;
	private String ot1stHours;
	private String ot2ndFrom;
	private String ot2ndTo;
	private String ot2ndHours;
	private String ot3rdFrom;
	private String ot3rdTo;
	private String ot3rdHours;
	private String fridayFrom;
	private String fridayTo;
	private String fridayHours;
	private String workLoc;
	private ArrayList<CostCenterItem> CostCenterList;
	private ArrayList<StaffAttendanceItem> StaffAttendanceList;

	public ArrayList<CostCenterItem> getCostCenterList() {
		return CostCenterList;
	}

	public void setCostCenterList(ArrayList<CostCenterItem> costCenterList) {
		CostCenterList = costCenterList;
	}

	public ArrayList<StaffAttendanceItem> getStaffAttendanceList() {
		return StaffAttendanceList;
	}

	public void setStaffAttendanceList(ArrayList<StaffAttendanceItem> staffAttendanceList) {
		StaffAttendanceList = staffAttendanceList;
	}

	public String getWorkLoc() {
		return workLoc;
	}

	public void setWorkLoc(String workLoc) {
		this.workLoc = workLoc;
	}

	public String getTempCompare() {
		return tempCompare;
	}

	public void setTempCompare(String tempCompare) {
		this.tempCompare = tempCompare;
	}

	public String getSCd() {
		return sCd;
	}

	public void setSCd(String cd) {
		sCd = cd;
	}

	public String getSCdNm() {
		return sCdNm;
	}

	public void setSCdNm(String cdNm) {
		sCdNm = cdNm;
	}

	public String getIsFriday() {
		return isFriday;
	}

	public void setIsFriday(String isFriday) {
		this.isFriday = isFriday;
	}

	// monthly overtime voucher
	private String dt01, dt02, dt03, dt04, dt05, dt06, dt07, dt08, dt09, dt10;
	private String dt11, dt12, dt13, dt14, dt15, dt16, dt17, dt18, dt19, dt20;
	private String dt21, dt22, dt23, dt24, dt25, dt26, dt27, dt28, dt29, dt30, dt31;
	private String totalHrs;
	private String totalFreq;
	private String avgHrs;

	// Monthly Overtime Voucher
	private String empId;
	private String workSt;
	private String a2nd;
	private String a3rd;
	private String sixturn;
	private String otfriHours;
	private String allowance;
	private String amount;
	private String secondRate;
	private String thirdRate;
	private String maRate;
	private String eaRate;
	private String incenRate;
	private String weekDay;
	private String dt;
	private String dept;
	private String shftPos;
	private String otRate1;
	private String otRate2;
	private String otRate3;
	private String otRate4;

	// Daily Time Shift Report
	private String locId;
	private String stvdComp;

	public ArrayList getDsList1() {
		return dsList1;
	}

	public ArrayList getDsList2() {
		return dsList2;
	}

	public ArrayList getDsList3() {
		return dsList3;
	}

	public void setDsList1(ArrayList dsList1) {
		this.dsList1 = dsList1;
	}

	public void setDsList2(ArrayList dsList2) {
		this.dsList2 = dsList2;
	}

	public void setDsList3(ArrayList dsList3) {
		this.dsList3 = dsList3;
	}

	private String nofGang;
	private String eqNo;
	private ArrayList dsList1 = new ArrayList();
	private ArrayList dsList2 = new ArrayList();
	private ArrayList dsList3 = new ArrayList();

	// Generation
	private String offFmYmd;
	private String offToYmd;
	private String chk;
	private String descr;
	private String costCentCd;
	private String gnrtYn;
	private String gnrtBy;
	private String gnrtDt;
	private String updYn;
	private String rmk;

	// daily warehouse deployment
	private String sh1StaffNo;
	private String sh1Agent;
	private String sh2StaffNo;
	private String sh2Agent;
	private String sh3Staffno;
	private String sh3Agent;
	private String sh1No;
	private String sh1Capac;
	private String sh2No;
	private String sh2Capac;
	private String sh3No;
	private String sh3Capac;
	private String log;
	private String period;

	/**
	 * @return Returns the period.
	 */
	public String getPeriod() {
		return period;
	}

	/**
	 * @param period The period to set.
	 */
	public void setPeriod(String period) {
		this.period = period;
	}

	/**
	 * @return Returns the dspWorkYmd.
	 */
	public String getDspWorkYmd() {
		return dspWorkYmd;
	}

	/**
	 * @param dspWorkYmd The dspWorkYmd to set.
	 */
	public void setDspWorkYmd(String dspWorkYmd) {
		this.dspWorkYmd = dspWorkYmd;
	}

	/**
	 * @return Returns the opeComp.
	 */
	public String getOpeComp() {
		return opeComp;
	}

	/**
	 * @param opeComp The opeComp to set.
	 */
	public void setOpeComp(String opeComp) {
		this.opeComp = opeComp;
	}

	/**
	 * @return Returns the oprQty.
	 */
	public String getOprQty() {
		return oprQty;
	}

	/**
	 * @param oprQty The oprQty to set.
	 */
	public void setOprQty(String oprQty) {
		this.oprQty = oprQty;
	}

	/**
	 * @return Returns the eqNo.
	 */
	public String getEqNo() {
		return eqNo;
	}

	/**
	 * @param eqNo The eqNo to set.
	 */
	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}

	/**
	 * @return Returns the nofGang.
	 */
	public String getNofGang() {
		return nofGang;
	}

	/**
	 * @param nofGang The nofGang to set.
	 */
	public void setNofGang(String nofGang) {
		this.nofGang = nofGang;
	}

	/**
	 * @return Returns the stvdComp.
	 */
	public String getStvdComp() {
		return stvdComp;
	}

	/**
	 * @param stvdComp The stvdComp to set.
	 */
	public void setStvdComp(String stvdComp) {
		this.stvdComp = stvdComp;
	}
	/**
	 * @param dsList1 The dsList1 to set.
	 */
//    public void setDsList1(ArrayList dsList1) {
//        this.dsList1 = dsList1;
//    }
//    /**
//     * @param dsList2 The dsList2 to set.
//     */
//    public void setDsList2(ArrayList dsList2) {
//        this.dsList2 = dsList2;
//    }
//    /**
//     * @param dsList3 The dsList3 to set.
//     */
//    public void setDsList3(ArrayList dsList3) {
//        this.dsList3 = dsList3;
//    }
//    /**
//     * @return Returns the dsList1.
//     */
//    public List getDsList1() {
//        return dsList1;
//    }
	/**
	 * @param dsList1 The dsList1 to set.
	 */
//    public void setDsList1(List list) {
//        this.dsList1 = (ArrayList) list;
//    }
	/**
	 * @return Returns the dsList2.
	 */
//    public List getDsList2() {
//        return dsList2;
//    }
	/**
	 * @param dsList2 The dsList2 to set.
	 */
//   public void setDsList2(List list) {
//        this.dsList2 = (ArrayList) list;
//    }
	/**
	 * @return Returns the dsList3.
	 */
//    public List getDsList3() {
//        return dsList3;
//    }
	/**
	 * @param dsList3 The dsList3 to set.
	 */

//    public void setDsList3(List list) {
//        this.dsList3 = (ArrayList) list;
//    }
	/**
	 * @return Returns the locId.
	 */
	public String getLocId() {
		return locId;
	}

	/**
	 * @param locId The locId to set.
	 */
	public void setLocId(String locId) {
		this.locId = locId;
	}

	/**
	 * @return Returns the avgHrs.
	 */
	public String getAvgHrs() {
		return avgHrs;
	}

	/**
	 * @param avgHrs The avgHrs to set.
	 */
	public void setAvgHrs(String avgHrs) {
		this.avgHrs = avgHrs;
	}

	/**
	 * @return Returns the chk.
	 */
	public String getChk() {
		return chk;
	}

	/**
	 * @param chk The chk to set.
	 */
	public void setChk(String chk) {
		this.chk = chk;
	}

	/**
	 * @return Returns the costCentCd.
	 */
	public String getCostCentCd() {
		return costCentCd;
	}

	/**
	 * @param costCentCd The costCentCd to set.
	 */
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}

	/**
	 * @return Returns the dayTp.
	 */
	public String getDayTp() {
		return dayTp;
	}

	/**
	 * @param dayTp The dayTp to set.
	 */
	public void setDayTp(String dayTp) {
		this.dayTp = dayTp;
	}

	/**
	 * @return Returns the dayTpNm.
	 */
	public String getDayTpNm() {
		return dayTpNm;
	}

	/**
	 * @param dayTpNm The dayTpNm to set.
	 */
	public void setDayTpNm(String dayTpNm) {
		this.dayTpNm = dayTpNm;
	}

	/**
	 * @return Returns the dept.
	 */
	public String getDept() {
		return dept;
	}

	/**
	 * @param dept The dept to set.
	 */
	public void setDept(String dept) {
		this.dept = dept;
	}

	/**
	 * @return Returns the descr.
	 */
	public String getDescr() {
		return descr;
	}

	/**
	 * @param descr The descr to set.
	 */
	public void setDescr(String descr) {
		this.descr = descr;
	}

	/**
	 * @return Returns the dt.
	 */
	public String getDt() {
		return dt;
	}

	/**
	 * @param dt The dt to set.
	 */
	public void setDt(String dt) {
		this.dt = dt;
	}

	/**
	 * @return Returns the dt01.
	 */
	public String getDt01() {
		return dt01;
	}

	/**
	 * @param dt01 The dt01 to set.
	 */
	public void setDt01(String dt01) {
		this.dt01 = dt01;
	}

	/**
	 * @return Returns the dt02.
	 */
	public String getDt02() {
		return dt02;
	}

	/**
	 * @param dt02 The dt02 to set.
	 */
	public void setDt02(String dt02) {
		this.dt02 = dt02;
	}

	/**
	 * @return Returns the dt03.
	 */
	public String getDt03() {
		return dt03;
	}

	/**
	 * @param dt03 The dt03 to set.
	 */
	public void setDt03(String dt03) {
		this.dt03 = dt03;
	}

	/**
	 * @return Returns the dt04.
	 */
	public String getDt04() {
		return dt04;
	}

	/**
	 * @param dt04 The dt04 to set.
	 */
	public void setDt04(String dt04) {
		this.dt04 = dt04;
	}

	/**
	 * @return Returns the dt05.
	 */
	public String getDt05() {
		return dt05;
	}

	/**
	 * @param dt05 The dt05 to set.
	 */
	public void setDt05(String dt05) {
		this.dt05 = dt05;
	}

	/**
	 * @return Returns the dt06.
	 */
	public String getDt06() {
		return dt06;
	}

	/**
	 * @param dt06 The dt06 to set.
	 */
	public void setDt06(String dt06) {
		this.dt06 = dt06;
	}

	/**
	 * @return Returns the dt07.
	 */
	public String getDt07() {
		return dt07;
	}

	/**
	 * @param dt07 The dt07 to set.
	 */
	public void setDt07(String dt07) {
		this.dt07 = dt07;
	}

	/**
	 * @return Returns the dt08.
	 */
	public String getDt08() {
		return dt08;
	}

	/**
	 * @param dt08 The dt08 to set.
	 */
	public void setDt08(String dt08) {
		this.dt08 = dt08;
	}

	/**
	 * @return Returns the dt09.
	 */
	public String getDt09() {
		return dt09;
	}

	/**
	 * @param dt09 The dt09 to set.
	 */
	public void setDt09(String dt09) {
		this.dt09 = dt09;
	}

	/**
	 * @return Returns the dt10.
	 */
	public String getDt10() {
		return dt10;
	}

	/**
	 * @param dt10 The dt10 to set.
	 */
	public void setDt10(String dt10) {
		this.dt10 = dt10;
	}

	/**
	 * @return Returns the dt11.
	 */
	public String getDt11() {
		return dt11;
	}

	/**
	 * @param dt11 The dt11 to set.
	 */
	public void setDt11(String dt11) {
		this.dt11 = dt11;
	}

	/**
	 * @return Returns the dt12.
	 */
	public String getDt12() {
		return dt12;
	}

	/**
	 * @param dt12 The dt12 to set.
	 */
	public void setDt12(String dt12) {
		this.dt12 = dt12;
	}

	/**
	 * @return Returns the dt13.
	 */
	public String getDt13() {
		return dt13;
	}

	/**
	 * @param dt13 The dt13 to set.
	 */
	public void setDt13(String dt13) {
		this.dt13 = dt13;
	}

	/**
	 * @return Returns the dt14.
	 */
	public String getDt14() {
		return dt14;
	}

	/**
	 * @param dt14 The dt14 to set.
	 */
	public void setDt14(String dt14) {
		this.dt14 = dt14;
	}

	/**
	 * @return Returns the dt15.
	 */
	public String getDt15() {
		return dt15;
	}

	/**
	 * @param dt15 The dt15 to set.
	 */
	public void setDt15(String dt15) {
		this.dt15 = dt15;
	}

	/**
	 * @return Returns the dt16.
	 */
	public String getDt16() {
		return dt16;
	}

	/**
	 * @param dt16 The dt16 to set.
	 */
	public void setDt16(String dt16) {
		this.dt16 = dt16;
	}

	/**
	 * @return Returns the dt17.
	 */
	public String getDt17() {
		return dt17;
	}

	/**
	 * @param dt17 The dt17 to set.
	 */
	public void setDt17(String dt17) {
		this.dt17 = dt17;
	}

	/**
	 * @return Returns the dt18.
	 */
	public String getDt18() {
		return dt18;
	}

	/**
	 * @param dt18 The dt18 to set.
	 */
	public void setDt18(String dt18) {
		this.dt18 = dt18;
	}

	/**
	 * @return Returns the dt19.
	 */
	public String getDt19() {
		return dt19;
	}

	/**
	 * @param dt19 The dt19 to set.
	 */
	public void setDt19(String dt19) {
		this.dt19 = dt19;
	}

	/**
	 * @return Returns the dt20.
	 */
	public String getDt20() {
		return dt20;
	}

	/**
	 * @param dt20 The dt20 to set.
	 */
	public void setDt20(String dt20) {
		this.dt20 = dt20;
	}

	/**
	 * @return Returns the dt21.
	 */
	public String getDt21() {
		return dt21;
	}

	/**
	 * @param dt21 The dt21 to set.
	 */
	public void setDt21(String dt21) {
		this.dt21 = dt21;
	}

	/**
	 * @return Returns the dt22.
	 */
	public String getDt22() {
		return dt22;
	}

	/**
	 * @param dt22 The dt22 to set.
	 */
	public void setDt22(String dt22) {
		this.dt22 = dt22;
	}

	/**
	 * @return Returns the dt23.
	 */
	public String getDt23() {
		return dt23;
	}

	/**
	 * @param dt23 The dt23 to set.
	 */
	public void setDt23(String dt23) {
		this.dt23 = dt23;
	}

	/**
	 * @return Returns the dt24.
	 */
	public String getDt24() {
		return dt24;
	}

	/**
	 * @param dt24 The dt24 to set.
	 */
	public void setDt24(String dt24) {
		this.dt24 = dt24;
	}

	/**
	 * @return Returns the dt25.
	 */
	public String getDt25() {
		return dt25;
	}

	/**
	 * @param dt25 The dt25 to set.
	 */
	public void setDt25(String dt25) {
		this.dt25 = dt25;
	}

	/**
	 * @return Returns the dt26.
	 */
	public String getDt26() {
		return dt26;
	}

	/**
	 * @param dt26 The dt26 to set.
	 */
	public void setDt26(String dt26) {
		this.dt26 = dt26;
	}

	/**
	 * @return Returns the dt27.
	 */
	public String getDt27() {
		return dt27;
	}

	/**
	 * @param dt27 The dt27 to set.
	 */
	public void setDt27(String dt27) {
		this.dt27 = dt27;
	}

	/**
	 * @return Returns the dt28.
	 */
	public String getDt28() {
		return dt28;
	}

	/**
	 * @param dt28 The dt28 to set.
	 */
	public void setDt28(String dt28) {
		this.dt28 = dt28;
	}

	/**
	 * @return Returns the dt29.
	 */
	public String getDt29() {
		return dt29;
	}

	/**
	 * @param dt29 The dt29 to set.
	 */
	public void setDt29(String dt29) {
		this.dt29 = dt29;
	}

	/**
	 * @return Returns the dt30.
	 */
	public String getDt30() {
		return dt30;
	}

	/**
	 * @param dt30 The dt30 to set.
	 */
	public void setDt30(String dt30) {
		this.dt30 = dt30;
	}

	/**
	 * @return Returns the dt31.
	 */
	public String getDt31() {
		return dt31;
	}

	/**
	 * @param dt31 The dt31 to set.
	 */
	public void setDt31(String dt31) {
		this.dt31 = dt31;
	}

	/**
	 * @return Returns the ea.
	 */
	public String getEa() {
		return ea;
	}

	/**
	 * @param ea The ea to set.
	 */
	public void setEa(String ea) {
		this.ea = ea;
	}

	/**
	 * @return Returns the fmHhMm.
	 */
	public String getFmHhMm() {
		return fmHhMm;
	}

	/**
	 * @param fmHhMm The fmHhMm to set.
	 */
	public void setFmHhMm(String fmHhMm) {
		this.fmHhMm = fmHhMm;
	}

	/**
	 * @return Returns the fmTime.
	 */
	public String getFmTime() {
		return fmTime;
	}

	/**
	 * @param fmTime The fmTime to set.
	 */
	public void setFmTime(String fmTime) {
		this.fmTime = fmTime;
	}

	/**
	 * @return Returns the gnrtBy.
	 */
	public String getGnrtBy() {
		return gnrtBy;
	}

	/**
	 * @param gnrtBy The gnrtBy to set.
	 */
	public void setGnrtBy(String gnrtBy) {
		this.gnrtBy = gnrtBy;
	}

	/**
	 * @return Returns the gnrtDt.
	 */
	public String getGnrtDt() {
		return gnrtDt;
	}

	/**
	 * @param gnrtDt The gnrtDt to set.
	 */
	public void setGnrtDt(String gnrtDt) {
		this.gnrtDt = gnrtDt;
	}

	/**
	 * @return Returns the gnrtYn.
	 */
	public String getGnrtYn() {
		return gnrtYn;
	}

	/**
	 * @param gnrtYn The gnrtYn to set.
	 */
	public void setGnrtYn(String gnrtYn) {
		this.gnrtYn = gnrtYn;
	}

	/**
	 * @return Returns the incentive.
	 */
	public String getIncentive() {
		return incentive;
	}

	/**
	 * @param incentive The incentive to set.
	 */
	public void setIncentive(String incentive) {
		this.incentive = incentive;
	}

	/**
	 * @return Returns the isFrday.
	 */
	public String getIsFrday() {
		return isFrday;
	}

	/**
	 * @param isFrday The isFrday to set.
	 */
	public void setIsFrday(String isFrday) {
		this.isFrday = isFrday;
	}

	/**
	 * @return Returns the isSixTurn.
	 */
	public String getIsSixTurn() {
		return isSixTurn;
	}

	/**
	 * @param isSixTurn The isSixTurn to set.
	 */
	public void setIsSixTurn(String isSixTurn) {
		this.isSixTurn = isSixTurn;
	}

	/**
	 * @return Returns the log.
	 */
	public String getLog() {
		return log;
	}

	/**
	 * @param log The log to set.
	 */
	public void setLog(String log) {
		this.log = log;
	}

	/**
	 * @return Returns the ma.
	 */
	public String getMa() {
		return ma;
	}

	/**
	 * @param ma The ma to set.
	 */
	public void setMa(String ma) {
		this.ma = ma;
	}

	/**
	 * @return Returns the no.
	 */
	public String getNo() {
		return no;
	}

	/**
	 * @param no The no to set.
	 */
	public void setNo(String no) {
		this.no = no;
	}

	/**
	 * @return Returns the offFmYmd.
	 */
	public String getOffFmYmd() {
		return offFmYmd;
	}

	/**
	 * @param offFmYmd The offFmYmd to set.
	 */
	public void setOffFmYmd(String offFmYmd) {
		this.offFmYmd = offFmYmd;
	}

	/**
	 * @return Returns the offToYmd.
	 */
	public String getOffToYmd() {
		return offToYmd;
	}

	/**
	 * @param offToYmd The offToYmd to set.
	 */
	public void setOffToYmd(String offToYmd) {
		this.offToYmd = offToYmd;
	}

	/**
	 * @return Returns the otFactor.
	 */
	public String getOtFactor() {
		return otFactor;
	}

	/**
	 * @param otFactor The otFactor to set.
	 */
	public void setOtFactor(String otFactor) {
		this.otFactor = otFactor;
	}

	/**
	 * @return Returns the otFmHhMm.
	 */
	public String getOtFmHhMm() {
		return otFmHhMm;
	}

	/**
	 * @param otFmHhMm The otFmHhMm to set.
	 */
	public void setOtFmHhMm(String otFmHhMm) {
		this.otFmHhMm = otFmHhMm;
	}

	/**
	 * @return Returns the otFmTime.
	 */
	public String getOtFmTime() {
		return otFmTime;
	}

	/**
	 * @param otFmTime The otFmTime to set.
	 */
	public void setOtFmTime(String otFmTime) {
		this.otFmTime = otFmTime;
	}

	/**
	 * @return Returns the otHrs.
	 */
	public String getOtHrs() {
		return otHrs;
	}

	/**
	 * @param otHrs The otHrs to set.
	 */
	public void setOtHrs(String otHrs) {
		this.otHrs = otHrs;
	}

	/**
	 * @return Returns the otRate1.
	 */
	public String getOtRate1() {
		return otRate1;
	}

	/**
	 * @param otRate1 The otRate1 to set.
	 */
	public void setOtRate1(String otRate1) {
		this.otRate1 = otRate1;
	}

	/**
	 * @return Returns the otRate2.
	 */
	public String getOtRate2() {
		return otRate2;
	}

	/**
	 * @param otRate2 The otRate2 to set.
	 */
	public void setOtRate2(String otRate2) {
		this.otRate2 = otRate2;
	}

	/**
	 * @return Returns the otRate3.
	 */
	public String getOtRate3() {
		return otRate3;
	}

	/**
	 * @param otRate3 The otRate3 to set.
	 */
	public void setOtRate3(String otRate3) {
		this.otRate3 = otRate3;
	}

	/**
	 * @return Returns the otRate4.
	 */
	public String getOtRate4() {
		return otRate4;
	}

	/**
	 * @param otRate4 The otRate4 to set.
	 */
	public void setOtRate4(String otRate4) {
		this.otRate4 = otRate4;
	}

	/**
	 * @return Returns the otToHhMm.
	 */
	public String getOtToHhMm() {
		return otToHhMm;
	}

	/**
	 * @param otToHhMm The otToHhMm to set.
	 */
	public void setOtToHhMm(String otToHhMm) {
		this.otToHhMm = otToHhMm;
	}

	/**
	 * @return Returns the otToTime.
	 */
	public String getOtToTime() {
		return otToTime;
	}

	/**
	 * @param otToTime The otToTime to set.
	 */
	public void setOtToTime(String otToTime) {
		this.otToTime = otToTime;
	}

	/**
	 * @return Returns the purpTpCd.
	 */
	public String getPurpTpCd() {
		return purpTpCd;
	}

	/**
	 * @param purpTpCd The purpTpCd to set.
	 */
	public void setPurpTpCd(String purpTpCd) {
		this.purpTpCd = purpTpCd;
	}

	/**
	 * @return Returns the rmk.
	 */
	public String getRmk() {
		return rmk;
	}

	/**
	 * @param rmk The rmk to set.
	 */
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	/**
	 * @return Returns the role.
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @param role The role to set.
	 */
	public void setRole(String role) {
		this.role = role;
	}

	/**
	 * @return Returns the roleNm.
	 */
	public String getRoleNm() {
		return roleNm;
	}

	/**
	 * @param roleNm The roleNm to set.
	 */
	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}

	/**
	 * @return Returns the rsDivCd.
	 */
	public String getRsDivCd() {
		return rsDivCd;
	}

	/**
	 * @param rsDivCd The rsDivCd to set.
	 */
	public void setRsDivCd(String rsDivCd) {
		this.rsDivCd = rsDivCd;
	}

	/**
	 * @return Returns the rsnCd.
	 */
	public String getRsnCd() {
		return rsnCd;
	}

	/**
	 * @param rsnCd The rsnCd to set.
	 */
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}

	/**
	 * @return Returns the rsnNm.
	 */
	public String getRsnNm() {
		return rsnNm;
	}

	/**
	 * @param rsnNm The rsnNm to set.
	 */
	public void setRsnNm(String rsnNm) {
		this.rsnNm = rsnNm;
	}

	/**
	 * @return Returns the seq.
	 */
	public String getSeq() {
		return seq;
	}

	/**
	 * @param seq The seq to set.
	 */
	public void setSeq(String seq) {
		this.seq = seq;
	}

	/**
	 * @return Returns the sh1Agent.
	 */
	public String getSh1Agent() {
		return sh1Agent;
	}

	/**
	 * @param sh1Agent The sh1Agent to set.
	 */
	public void setSh1Agent(String sh1Agent) {
		this.sh1Agent = sh1Agent;
	}

	/**
	 * @return Returns the sh1Capac.
	 */
	public String getSh1Capac() {
		return sh1Capac;
	}

	/**
	 * @param sh1Capac The sh1Capac to set.
	 */
	public void setSh1Capac(String sh1Capac) {
		this.sh1Capac = sh1Capac;
	}

	/**
	 * @return Returns the sh1No.
	 */
	public String getSh1No() {
		return sh1No;
	}

	/**
	 * @param sh1No The sh1No to set.
	 */
	public void setSh1No(String sh1No) {
		this.sh1No = sh1No;
	}

	/**
	 * @return Returns the sh1StaffNo.
	 */
	public String getSh1StaffNo() {
		return sh1StaffNo;
	}

	/**
	 * @param sh1StaffNo The sh1StaffNo to set.
	 */
	public void setSh1StaffNo(String sh1StaffNo) {
		this.sh1StaffNo = sh1StaffNo;
	}

	/**
	 * @return Returns the sh2Agent.
	 */
	public String getSh2Agent() {
		return sh2Agent;
	}

	/**
	 * @param sh2Agent The sh2Agent to set.
	 */
	public void setSh2Agent(String sh2Agent) {
		this.sh2Agent = sh2Agent;
	}

	/**
	 * @return Returns the sh2Capac.
	 */
	public String getSh2Capac() {
		return sh2Capac;
	}

	/**
	 * @param sh2Capac The sh2Capac to set.
	 */
	public void setSh2Capac(String sh2Capac) {
		this.sh2Capac = sh2Capac;
	}

	/**
	 * @return Returns the sh2No.
	 */
	public String getSh2No() {
		return sh2No;
	}

	/**
	 * @param sh2No The sh2No to set.
	 */
	public void setSh2No(String sh2No) {
		this.sh2No = sh2No;
	}

	/**
	 * @return Returns the sh2StaffNo.
	 */
	public String getSh2StaffNo() {
		return sh2StaffNo;
	}

	/**
	 * @param sh2StaffNo The sh2StaffNo to set.
	 */
	public void setSh2StaffNo(String sh2StaffNo) {
		this.sh2StaffNo = sh2StaffNo;
	}

	/**
	 * @return Returns the sh3Agent.
	 */
	public String getSh3Agent() {
		return sh3Agent;
	}

	/**
	 * @param sh3Agent The sh3Agent to set.
	 */
	public void setSh3Agent(String sh3Agent) {
		this.sh3Agent = sh3Agent;
	}

	/**
	 * @return Returns the sh3Capac.
	 */
	public String getSh3Capac() {
		return sh3Capac;
	}

	/**
	 * @param sh3Capac The sh3Capac to set.
	 */
	public void setSh3Capac(String sh3Capac) {
		this.sh3Capac = sh3Capac;
	}

	/**
	 * @return Returns the sh3No.
	 */
	public String getSh3No() {
		return sh3No;
	}

	/**
	 * @param sh3No The sh3No to set.
	 */
	public void setSh3No(String sh3No) {
		this.sh3No = sh3No;
	}

	/**
	 * @return Returns the sh3Staffno.
	 */
	public String getSh3Staffno() {
		return sh3Staffno;
	}

	/**
	 * @param sh3Staffno The sh3Staffno to set.
	 */
	public void setSh3Staffno(String sh3Staffno) {
		this.sh3Staffno = sh3Staffno;
	}

	/**
	 * @return Returns the shftPos.
	 */
	public String getShftPos() {
		return shftPos;
	}

	/**
	 * @param shftPos The shftPos to set.
	 */
	public void setShftPos(String shftPos) {
		this.shftPos = shftPos;
	}

	/**
	 * @return Returns the shiftId.
	 */
	public String getShiftId() {
		return shiftId;
	}

	/**
	 * @param shiftId The shiftId to set.
	 */
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}

	/**
	 * @return Returns the shiftNm.
	 */
	public String getShiftNm() {
		return shiftNm;
	}

	/**
	 * @param shiftNm The shiftNm to set.
	 */
	public void setShiftNm(String shiftNm) {
		this.shiftNm = shiftNm;
	}

	/**
	 * @return Returns the staffNm.
	 */
	public String getStaffNm() {
		return staffNm;
	}

	/**
	 * @param staffNm The staffNm to set.
	 */
	public void setStaffNm(String staffNm) {
		this.staffNm = staffNm;
	}

	/**
	 * @return Returns the staffNo.
	 */
	public String getStaffNo() {
		return staffNo;
	}

	/**
	 * @param staffNo The staffNo to set.
	 */
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}

	/**
	 * @return Returns the toHhMm.
	 */
	public String getToHhMm() {
		return toHhMm;
	}

	/**
	 * @param toHhMm The toHhMm to set.
	 */
	public void setToHhMm(String toHhMm) {
		this.toHhMm = toHhMm;
	}

	/**
	 * @return Returns the totalFreq.
	 */
	public String getTotalFreq() {
		return totalFreq;
	}

	/**
	 * @param totalFreq The totalFreq to set.
	 */
	public void setTotalFreq(String totalFreq) {
		this.totalFreq = totalFreq;
	}

	/**
	 * @return Returns the totalHrs.
	 */
	public String getTotalHrs() {
		return totalHrs;
	}

	/**
	 * @param totalHrs The totalHrs to set.
	 */
	public void setTotalHrs(String totalHrs) {
		this.totalHrs = totalHrs;
	}

	/**
	 * @return Returns the toTime.
	 */
	public String getToTime() {
		return toTime;
	}

	/**
	 * @param toTime The toTime to set.
	 */
	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	/**
	 * @return Returns the updDate.
	 */
	public String getUpdDate() {
		return updDate;
	}

	/**
	 * @param updDate The updDate to set.
	 */
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}

	/**
	 * @return Returns the updUserId.
	 */
	public String getUpdUserId() {
		return updUserId;
	}

	/**
	 * @param updUserId The updUserId to set.
	 */
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}

	/**
	 * @return Returns the updYn.
	 */
	public String getUpdYn() {
		return updYn;
	}

	/**
	 * @param updYn The updYn to set.
	 */
	public void setUpdYn(String updYn) {
		this.updYn = updYn;
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
	 * @return Returns the workCd.
	 */
	public String getWorkCd() {
		return workCd;
	}

	/**
	 * @param workCd The workCd to set.
	 */
	public void setWorkCd(String workCd) {
		this.workCd = workCd;
	}

	/**
	 * @return Returns the workHrs.
	 */
	public String getWorkHrs() {
		return workHrs;
	}

	/**
	 * @param workHrs The workHrs to set.
	 */
	public void setWorkHrs(String workHrs) {
		this.workHrs = workHrs;
	}

	/**
	 * @return Returns the workNm.
	 */
	public String getWorkNm() {
		return workNm;
	}

	/**
	 * @param workNm The workNm to set.
	 */
	public void setWorkNm(String workNm) {
		this.workNm = workNm;
	}

	/**
	 * @return Returns the workYmd.
	 */
	public String getWorkYmd() {
		return workYmd;
	}

	/**
	 * @param workYmd The workYmd to set.
	 */
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}

	/**
	 * @return Returns the dspStaffNo.
	 */
	public String getDspStaffNo() {
		return dspStaffNo;
	}

	/**
	 * @param dspStaffNo The dspStaffNo to set.
	 */
	public void setDspStaffNo(String dspStaffNo) {
		this.dspStaffNo = dspStaffNo;
	}

	public String getDayWork() {
		return dayWork;
	}

	public void setDayWork(String dayWork) {
		this.dayWork = dayWork;
	}

	public String getWorkCdNm() {
		return workCdNm;
	}

	public void setWorkCdNm(String workCdNm) {
		this.workCdNm = workCdNm;
	}

	public String getWeekDay() {
		return weekDay;
	}

	public void setWeekDay(String weekDay) {
		this.weekDay = weekDay;
	}

	public String getEaRate() {
		return eaRate;
	}

	public void setEaRate(String eaRate) {
		this.eaRate = eaRate;
	}

	public String getIncenRate() {
		return incenRate;
	}

	public void setIncenRate(String incenRate) {
		this.incenRate = incenRate;
	}

	public String getMaRate() {
		return maRate;
	}

	public void setMaRate(String maRate) {
		this.maRate = maRate;
	}

	public String getFridayFrom() {
		return fridayFrom;
	}

	public void setFridayFrom(String fridayFrom) {
		this.fridayFrom = fridayFrom;
	}

	public String getFridayHours() {
		return fridayHours;
	}

	public void setFridayHours(String fridayHours) {
		this.fridayHours = fridayHours;
	}

	public String getFridayTo() {
		return fridayTo;
	}

	public void setFridayTo(String fridayTo) {
		this.fridayTo = fridayTo;
	}

	public String getNormalShift() {
		return normalShift;
	}

	public void setNormalShift(String normalShift) {
		this.normalShift = normalShift;
	}

	public String getOt1stFrom() {
		return ot1stFrom;
	}

	public void setOt1stFrom(String ot1stFrom) {
		this.ot1stFrom = ot1stFrom;
	}

	public String getOt1stHours() {
		return ot1stHours;
	}

	public void setOt1stHours(String ot1stHours) {
		this.ot1stHours = ot1stHours;
	}

	public String getOt1stTo() {
		return ot1stTo;
	}

	public void setOt1stTo(String ot1stTo) {
		this.ot1stTo = ot1stTo;
	}

	public String getOt2ndFrom() {
		return ot2ndFrom;
	}

	public void setOt2ndFrom(String ot2ndFrom) {
		this.ot2ndFrom = ot2ndFrom;
	}

	public String getOt2ndHours() {
		return ot2ndHours;
	}

	public void setOt2ndHours(String ot2ndHours) {
		this.ot2ndHours = ot2ndHours;
	}

	public String getOt2ndTo() {
		return ot2ndTo;
	}

	public void setOt2ndTo(String ot2ndTo) {
		this.ot2ndTo = ot2ndTo;
	}

	public String getOt3rdFrom() {
		return ot3rdFrom;
	}

	public void setOt3rdFrom(String ot3rdFrom) {
		this.ot3rdFrom = ot3rdFrom;
	}

	public String getOt3rdHours() {
		return ot3rdHours;
	}

	public void setOt3rdHours(String ot3rdHours) {
		this.ot3rdHours = ot3rdHours;
	}

	public String getOt3rdTo() {
		return ot3rdTo;
	}

	public void setOt3rdTo(String ot3rdTo) {
		this.ot3rdTo = ot3rdTo;
	}

	public String getSaveType() {
		return saveType;
	}

	public void setSaveType(String saveType) {
		this.saveType = saveType;
	}

	public String getNormalShiftId() {
		return normalShiftId;
	}

	public void setNormalShiftId(String normalShiftId) {
		this.normalShiftId = normalShiftId;
	}

	public ArrayList getAllowanceItems() {
		return allowanceItems;
	}

	public void setAllowanceItems(ArrayList allowanceItems) {
		this.allowanceItems = allowanceItems;
	}

	public String getA2nd() {
		return a2nd;
	}

	public void setA2nd(String a2nd) {
		this.a2nd = a2nd;
	}

	public String getA3rd() {
		return a3rd;
	}

	public void setA3rd(String a3rd) {
		this.a3rd = a3rd;
	}

	public String getSixturn() {
		return sixturn;
	}

	public void setSixturn(String sixturn) {
		this.sixturn = sixturn;
	}

	public String getWorkSt() {
		return workSt;
	}

	public void setWorkSt(String workSt) {
		this.workSt = workSt;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getOtfriHours() {
		return otfriHours;
	}

	public void setOtfriHours(String otfriHours) {
		this.otfriHours = otfriHours;
	}

	public String getAllowance() {
		return allowance;
	}

	public void setAllowance(String allowance) {
		this.allowance = allowance;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getSecondRate() {
		return secondRate;
	}

	public void setSecondRate(String secondRate) {
		this.secondRate = secondRate;
	}

	public String getThirdRate() {
		return thirdRate;
	}

	public void setThirdRate(String thirdRate) {
		this.thirdRate = thirdRate;
	}

	public String getSecondShft() {
		return secondShft;
	}

	public void setSecondShft(String secondShft) {
		this.secondShft = secondShft;
	}

	public String getThirdShft() {
		return thirdShft;
	}

	public void setThirdShft(String thirdShft) {
		this.thirdShft = thirdShft;
	}

	public String getCurPage() {
		return curPage;
	}

	public void setCurPage(String curPage) {
		this.curPage = curPage;
	}

	public String getRn() {
		return rn;
	}

	public void setRn(String rn) {
		this.rn = rn;
	}

	public String getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	public String getHiddenEmpId() {
		return hiddenEmpId;
	}

	public void setHiddenEmpId(String hiddenEmpId) {
		this.hiddenEmpId = hiddenEmpId;
	}

	public String getRosterShift() {
		return rosterShift;
	}

	public void setRosterShift(String rosterShift) {
		this.rosterShift = rosterShift;
	}

	public String getBerthUnberthing() {
		return berthUnberthing;
	}

	public void setBerthUnberthing(String berthUnberthing) {
		this.berthUnberthing = berthUnberthing;
	}

	public String getLeaveTp() {
		return leaveTp;
	}

	public void setLeaveTp(String leaveTp) {
		this.leaveTp = leaveTp;
	}
}