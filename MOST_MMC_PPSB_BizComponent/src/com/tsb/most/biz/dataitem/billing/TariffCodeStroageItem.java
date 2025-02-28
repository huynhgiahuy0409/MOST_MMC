package com.tsb.most.biz.dataitem.billing;

public class TariffCodeStroageItem {
	private String freeDays;
	private String weekend1Yn;
	private String weekend2Yn;
	private String holidaysYn;
	private String holidays;
	private String daydiff;
	
	/*
	WHERE TO_CHAR (FROM_DT + LEVEL - 1, 'd') != 6
    AND TO_CHAR (FROM_DT + LEVEL - 1, 'd') != 7
	CONNECT BY LEVEL <= TO_DT - FROM_DT + 1)
	 
	 */
	
	public String getFreeDays() {
		return freeDays;
	}
	public void setFreeDays(String freeDays) {
		this.freeDays = freeDays;
	}
	public String getWeekend1Yn() {
		return weekend1Yn;
	}
	public void setWeekend1Yn(String weekend1Yn) {
		this.weekend1Yn = weekend1Yn;
	}
	public String getWeekend2Yn() {
		return weekend2Yn;
	}
	public void setWeekend2Yn(String weekend2Yn) {
		this.weekend2Yn = weekend2Yn;
	}
	public String getHolidaysYn() {
		return holidaysYn;
	}
	public void setHolidaysYn(String holidaysYn) {
		this.holidaysYn = holidaysYn;
	}
	public String getHolidays() {
		return holidays;
	}
	public void setHolidays(String holidays) {
		this.holidays = holidays;
	}
	public String getDaydiff() {
		return daydiff;
	}
	public void setDaydiff(String daydiff) {
		this.daydiff = daydiff;
	}
	
	
}
