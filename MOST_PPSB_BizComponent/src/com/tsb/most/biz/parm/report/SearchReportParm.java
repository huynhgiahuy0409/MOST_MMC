package com.tsb.most.biz.parm.report;

import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.dataitem.DataItemList;


public class SearchReportParm extends BaseBizParm {

	private DataItemList items;
	private String file;
	//report type
	private String type;
	
	//Print Type (added by Brian 2020/05/26)
	private String printType;
	private String parmClassName;
	private String serviceId;
	
	//staff code
	private String staffCd;        // Staff Code
	private String param1; 	//PARAM1
	private String param2; 	//PARAM2
	private String param3; 	//PARAM3
	private String param4; 	//PARAM4
	private String param5; 	//PARAM5
	private String param6; 	//PARAM6
	private String param7; 	//PARAM7
	private String param8; 	//PARAM8
	private String param9; 	//PARAM9
	private String param10; //PARAM10
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPrintType() {
		return printType;
	}
	public void setPrintType(String printType) {
		this.printType = printType;
	}
	public String getParmClassName() {
		return parmClassName;
	}
	public void setParmClassName(String parmClassName) {
		this.parmClassName = parmClassName;
	}
	public String getServiceId() {
		return serviceId;
	}
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	public String getStaffCd() {
		return staffCd;
	}
	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}
	public String getParam1() {
		return param1;
	}
	public void setParam1(String param1) {
		this.param1 = param1;
	}
	public String getParam2() {
		return param2;
	}
	public void setParam2(String param2) {
		this.param2 = param2;
	}
	public String getParam3() {
		return param3;
	}
	public void setParam3(String param3) {
		this.param3 = param3;
	}
	public String getParam4() {
		return param4;
	}
	public void setParam4(String param4) {
		this.param4 = param4;
	}
	public String getParam5() {
		return param5;
	}
	public void setParam5(String param5) {
		this.param5 = param5;
	}
	public String getParam6() {
		return param6;
	}
	public void setParam6(String param6) {
		this.param6 = param6;
	}
	public String getParam7() {
		return param7;
	}
	public void setParam7(String param7) {
		this.param7 = param7;
	}
	public String getParam8() {
		return param8;
	}
	public void setParam8(String param8) {
		this.param8 = param8;
	}
	public String getParam9() {
		return param9;
	}
	public void setParam9(String param9) {
		this.param9 = param9;
	}
	public String getParam10() {
		return param10;
	}
	public void setParam10(String param10) {
		this.param10 = param10;
	}

	public DataItemList getItems() {
		return items;
	}
	public void setItems(DataItemList items) {
		this.items = items;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
}
