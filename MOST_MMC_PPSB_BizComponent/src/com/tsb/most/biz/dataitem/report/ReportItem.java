
package com.tsb.most.biz.dataitem.report;

import java.util.Map;

import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;

import net.sf.jasperreports.engine.JasperReport;

public class ReportItem extends DataItem {

	/* DETAIL */
	DataItemList dataItemList;
	
	/* PAGE HEADER */
	Map<String, Object> parameterMap;
	JasperReport	mainReport;
	
	public JasperReport getMainReport() {
		return mainReport;
	}
	public void setMainReport(JasperReport mainReport) {
		this.mainReport = mainReport;
	}
	public DataItemList getDataItemList() {
		
		return dataItemList;
	}
	public void setDataItemList(DataItemList dataItemList) {
		if(dataItemList == null) 
			this.dataItemList = new DataItemList();
		this.dataItemList = dataItemList;
	}
	public Map<String, Object> getParameterMap() {
		return parameterMap;
	}
	public void setParameterMap(Map<String, Object> parameterMap) {
		this.parameterMap = parameterMap;
	}

	
}
