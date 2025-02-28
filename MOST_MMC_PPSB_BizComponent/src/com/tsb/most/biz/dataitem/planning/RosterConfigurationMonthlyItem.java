/**
* RosterSetupItem.java
*
* Created on   : 2007-09-30
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-30 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import com.tsb.most.framework.dataitem.DataItem;

/**
* use RosterSetupItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class RosterConfigurationMonthlyItem extends DataItem {

    private String rstrYmd;
    private int seq;
    private String shftId;
    private String vslCallId;
    private String empId;
    private String engNm;
    private String statCdNm;
    private String workLocCdNm;
    private String shftGrpCd;
    private String cgTpCd;
    private String offDdYn;
    
    //Roster Setup Master
    private int tabSeq;
    private String date1;
    private String date2;
    private String date3;
    private String date4;
    private String date5;
    private String date6;
    private String date7;
    
    //Roster Setup List
    private String shftNm;
    private String gpNm1;
    private String gpCd1;
    private String gpNm2;
    private String gpCd2;
    private String gpNm3;
    private String gpCd3;
    private String gpNm4;
    private String gpCd4;
    private String gpNm5;
    private String gpCd5;
    private String gpNm6;
    private String gpCd6;
    private String gpNm7;
    private String gpCd7;
    
    //Update & Insert Condition
    private String startDate;
    private String deliUpdateCd;
    private String rsnCd;

    //Shift Type
    private String shftTpCd;
    private String shftTpCdNm;
    
    private String role;
    private String shftIndex;
    private int cnt;
    //Report
    private String countIndex ;
    
    private String title ;
    private String calendarId ;
    private String endDate ;
    
    private boolean allDay = true;
    private String color;
    private String shftDivCd;
    private String idx;
    
    private String aplyFmYmd;
    private String aplyToYmd;
    private String fmHhmm;
    private String toHhmm;
    private String no;
    private String groupCd;
    private String groupNm;
    private String divCd;
    private String scd;
    private String scdNm;
    private String shftMethCd;
    private String shftIdx;
    private String useYn;
    private String rmk;
    private String workingStatus;
    
	public String getRstrYmd() {
		return rstrYmd;
	}
	public void setRstrYmd(String rstrYmd) {
		this.rstrYmd = rstrYmd;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEngNm() {
		return engNm;
	}
	public void setEngNm(String engNm) {
		this.engNm = engNm;
	}
	public String getStatCdNm() {
		return statCdNm;
	}
	public void setStatCdNm(String statCdNm) {
		this.statCdNm = statCdNm;
	}
	public String getWorkLocCdNm() {
		return workLocCdNm;
	}
	public void setWorkLocCdNm(String workLocCdNm) {
		this.workLocCdNm = workLocCdNm;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getOffDdYn() {
		return offDdYn;
	}
	public void setOffDdYn(String offDdYn) {
		this.offDdYn = offDdYn;
	}
	public int getTabSeq() {
		return tabSeq;
	}
	public void setTabSeq(int tabSeq) {
		this.tabSeq = tabSeq;
	}
	public String getDate1() {
		return date1;
	}
	public void setDate1(String date1) {
		this.date1 = date1;
	}
	public String getDate2() {
		return date2;
	}
	public void setDate2(String date2) {
		this.date2 = date2;
	}
	public String getDate3() {
		return date3;
	}
	public void setDate3(String date3) {
		this.date3 = date3;
	}
	public String getDate4() {
		return date4;
	}
	public void setDate4(String date4) {
		this.date4 = date4;
	}
	public String getDate5() {
		return date5;
	}
	public void setDate5(String date5) {
		this.date5 = date5;
	}
	public String getDate6() {
		return date6;
	}
	public void setDate6(String date6) {
		this.date6 = date6;
	}
	public String getDate7() {
		return date7;
	}
	public void setDate7(String date7) {
		this.date7 = date7;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getGpNm1() {
		return gpNm1;
	}
	public void setGpNm1(String gpNm1) {
		this.gpNm1 = gpNm1;
	}
	public String getGpCd1() {
		return gpCd1;
	}
	public void setGpCd1(String gpCd1) {
		this.gpCd1 = gpCd1;
	}
	public String getGpNm2() {
		return gpNm2;
	}
	public void setGpNm2(String gpNm2) {
		this.gpNm2 = gpNm2;
	}
	public String getGpCd2() {
		return gpCd2;
	}
	public void setGpCd2(String gpCd2) {
		this.gpCd2 = gpCd2;
	}
	public String getGpNm3() {
		return gpNm3;
	}
	public void setGpNm3(String gpNm3) {
		this.gpNm3 = gpNm3;
	}
	public String getGpCd3() {
		return gpCd3;
	}
	public void setGpCd3(String gpCd3) {
		this.gpCd3 = gpCd3;
	}
	public String getGpNm4() {
		return gpNm4;
	}
	public void setGpNm4(String gpNm4) {
		this.gpNm4 = gpNm4;
	}
	public String getGpCd4() {
		return gpCd4;
	}
	public void setGpCd4(String gpCd4) {
		this.gpCd4 = gpCd4;
	}
	public String getGpNm5() {
		return gpNm5;
	}
	public void setGpNm5(String gpNm5) {
		this.gpNm5 = gpNm5;
	}
	public String getGpCd5() {
		return gpCd5;
	}
	public void setGpCd5(String gpCd5) {
		this.gpCd5 = gpCd5;
	}
	public String getGpNm6() {
		return gpNm6;
	}
	public void setGpNm6(String gpNm6) {
		this.gpNm6 = gpNm6;
	}
	public String getGpCd6() {
		return gpCd6;
	}
	public void setGpCd6(String gpCd6) {
		this.gpCd6 = gpCd6;
	}
	public String getGpNm7() {
		return gpNm7;
	}
	public void setGpNm7(String gpNm7) {
		this.gpNm7 = gpNm7;
	}
	public String getGpCd7() {
		return gpCd7;
	}
	public void setGpCd7(String gpCd7) {
		this.gpCd7 = gpCd7;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getDeliUpdateCd() {
		return deliUpdateCd;
	}
	public void setDeliUpdateCd(String deliUpdateCd) {
		this.deliUpdateCd = deliUpdateCd;
	}
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getShftTpCd() {
		return shftTpCd;
	}
	public void setShftTpCd(String shftTpCd) {
		this.shftTpCd = shftTpCd;
	}
	public String getShftTpCdNm() {
		return shftTpCdNm;
	}
	public void setShftTpCdNm(String shftTpCdNm) {
		this.shftTpCdNm = shftTpCdNm;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getShftIndex() {
		return shftIndex;
	}
	public void setShftIndex(String shftIndex) {
		this.shftIndex = shftIndex;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getCountIndex() {
		return countIndex;
	}
	public void setCountIndex(String countIndex) {
		this.countIndex = countIndex;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCalendarId() {
		return calendarId;
	}
	public void setCalendarId(String calendarId) {
		this.calendarId = calendarId;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public boolean isAllDay() {
		return allDay;
	}
	public void setAllDay(boolean allDay) {
		this.allDay = allDay;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getShftDivCd() {
		return shftDivCd;
	}
	public void setShftDivCd(String shftDivCd) {
		this.shftDivCd = shftDivCd;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getAplyFmYmd() {
		return aplyFmYmd;
	}
	public void setAplyFmYmd(String aplyFmYmd) {
		this.aplyFmYmd = aplyFmYmd;
	}
	public String getAplyToYmd() {
		return aplyToYmd;
	}
	public void setAplyToYmd(String aplyToYmd) {
		this.aplyToYmd = aplyToYmd;
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
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getGroupNm() {
		return groupNm;
	}
	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getScd() {
		return scd;
	}
	public void setScd(String scd) {
		this.scd = scd;
	}
	public String getScdNm() {
		return scdNm;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getShftMethCd() {
		return shftMethCd;
	}
	public void setShftMethCd(String shftMethCd) {
		this.shftMethCd = shftMethCd;
	}
	public String getShftIdx() {
		return shftIdx;
	}
	public void setShftIdx(String shftIdx) {
		this.shftIdx = shftIdx;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
}
