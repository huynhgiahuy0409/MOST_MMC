package com.tsb.most.biz.service.report;

import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.framework.exception.BizException;

public interface IPlanningReport {
	public ReportItem getShiftRequestListReportItems(SearchReportParm parm) throws BizException;
	public ReportItem getVesselShiftingNoticeItem(SearchReportParm parm) throws BizException;
}
