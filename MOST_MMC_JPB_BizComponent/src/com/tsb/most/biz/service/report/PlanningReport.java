package com.tsb.most.biz.service.report;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.tsb.most.biz.dao.planning.ShiftRequestDao;
import com.tsb.most.biz.dataitem.planning.ShiftRequestItem;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.planning.SearchShiftRequestParm;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.ReportUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;

public class PlanningReport implements IPlanningReport {
	private ShiftRequestDao shiftRequestDao;

	public void setShiftRequestDao(ShiftRequestDao shiftRequestDao) {
		this.shiftRequestDao = shiftRequestDao;
	}

	@Override
	public ReportItem getVesselShiftingNoticeItem(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		DataItemList itemList = new DataItemList();
		HashMap<String, Object> parmMap = new HashMap<String, Object>();
		SearchShiftRequestParm searchParm = new SearchShiftRequestParm();

		searchParm.setVslCallId(parm.getParam1());
		searchParm.setSeq(parm.getParam2());
		searchParm.setUserId(parm.getParam3());

		itemList = shiftRequestDao.getVesselShiftingNoticeItemForReport(searchParm);

		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_MMC.png";
		String DATE_FORMAT_STD = "dd/MM/yyyy HH:mm";
		SimpleDateFormat sdfStd = new SimpleDateFormat(DATE_FORMAT_STD);
		String strDate = sdfStd.format(new Date());

		parmMap.put("PRINTER", searchParm.getUserId());
		parmMap.put("IMAGE_PATH", imagePath);
		parmMap.put("PRINT_DATE", strDate);
		parmMap.put("P_DATE", strDate);
		parmMap.put("REPORT_ID", "RCS023");
		List<ShiftRequestItem> shiftRequestList = itemList.getCollection();
		if (shiftRequestList != null && shiftRequestList.size() > 0) {
			parmMap.put("P_MASTER", shiftRequestList.get(0).getReqr());
		}

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "planning" + File.separator
					+ parm.getFile();
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);
			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}
		return reportResultItem;
	}

	@Override
	public ReportItem getShiftRequestListReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		DataItemList itemList = new DataItemList();
		HashMap<String, Object> parmMap = new HashMap<String, Object>();
		SearchShiftRequestParm searchParm = new SearchShiftRequestParm();

		searchParm.setVslCallId(parm.getParam1());
		searchParm.setDtType(parm.getParam2());
		searchParm.setFromDt(parm.getParam3());
		searchParm.setToDt(parm.getParam4());
		searchParm.setUserId(parm.getParam5());
		searchParm.setAlertYn(parm.getParam6());
		
		itemList = shiftRequestDao.getShiftRequestItemsForReport(searchParm);

		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_MMC.png";
		String DATE_FORMAT_STD = "dd/MM/yyyy HH:mm";
		SimpleDateFormat sdfStd = new SimpleDateFormat(DATE_FORMAT_STD);
		String strDate = sdfStd.format(new Date());

		parmMap.put("PRINTER", searchParm.getUserId());
		parmMap.put("IMAGE_PATH", imagePath);
		parmMap.put("PRINT_DATE", strDate);
		parmMap.put("P_DATE", strDate);
		parmMap.put("REPORT_ID", "RCS023");
		List<ShiftRequestItem> shiftRequestList = itemList.getCollection();
		if (shiftRequestList != null && shiftRequestList.size() > 0) {
			parmMap.put("P_MASTER", shiftRequestList.get(0).getReqr());
		}

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "planning" + File.separator
					+ parm.getFile();
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);
			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}
		return reportResultItem;
	}
}
