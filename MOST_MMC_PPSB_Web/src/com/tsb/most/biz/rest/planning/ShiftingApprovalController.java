package com.tsb.most.biz.rest.planning;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.billing.InvoiceAdviceItem;
import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.biz.dataitem.planning.ShiftRequestItem;
import com.tsb.most.biz.dataitem.planning.ShipInPortItem;
import com.tsb.most.biz.parm.operation.VesselDelayRecordParm;
import com.tsb.most.util.report.IReportBuilder;
import com.tsb.most.util.report.ReportBuilder;
import com.tsb.most.common.util.ReportType;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.biz.parm.planning.SearchShiftRequestParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/shiftingapproval")
public class ShiftingApprovalController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftRequestList(SearchShiftRequestParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shiftingApproval.getShiftRequestList", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/combo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPlanList(SearchShiftRequestParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.shiftingApproval.getCodeMasterList", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse processShiftRequestCUD(@PathVariable("id") String id,
			@RequestBody UpdateBizParm<ShiftRequestItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.shiftingApproval.processShiftRequestCUD", insertParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	/*
	 * @RequestMapping(value = "/generatepdfshftapprv", method = RequestMethod.GET)
	 * 
	 * @ResponseBody public RestResponse generatePdfVslDl(ShiftRequestParm parm,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * ServiceException, Exception { RestResponse res = new RestResponse();
	 * 
	 * Map parmMap = new HashMap();
	 * 
	 * String DATE_FORMAT_REPORT = "dd/MM/yyyy HH:mm"; String printType =
	 * request.getParameter("printType"); Calendar calendar =
	 * Calendar.getInstance(); String strMaster = " "; SimpleDateFormat sdfReport =
	 * new SimpleDateFormat(DATE_FORMAT_REPORT);
	 * 
	 * List lst = null;
	 * 
	 * RestResponse result = (RestResponse)
	 * invokeService("MOST.planning.getShiftRequestList", parm); lst =
	 * result.getData(); if (lst != null && lst.size() > 0) { if (lst.size() > 0) {
	 * strMaster = ((ShiftRequestItem) lst.get(0)).getReqr(); } } else { lst = new
	 * ArrayList(); } if (lst.size() <= 0) lst.add(new ShiftRequestItem());
	 * 
	 * ArrayList shifLst = new ArrayList(); int n = 0; for (Iterator it =
	 * lst.iterator(); it.hasNext();) { n++; ShiftRequestItem itm =
	 * (ShiftRequestItem) it.next(); HashMap map = new HashMap(); map.put("NO",
	 * Integer.toString(n)); map.put("reqDt", itm.getReqDt());
	 * map.put("prevBerthNo", itm.getPrevBerthNo()); map.put("nxBerthNo",
	 * itm.getNxBerthNo()); map.put("wharfMarkTo", itm.getWharfMarkTo());
	 * map.put("wharfMarkFm", itm.getWharfMarkFm()); map.put("rsnCd",
	 * itm.getRsnCd());
	 * 
	 * shifLst.add(map);
	 * 
	 * } IReportBuilder builder = new ReportBuilder();
	 * 
	 * parmMap.put("IMAGE_PATH", request.getSession().getServletContext()
	 * .getRealPath("/WEB-INF/reports/" + PcsProperties.getProperty("terminal.code")
	 * + ".gif")); if (!("".equalsIgnoreCase(parm.getUserId()))) {
	 * parmMap.put("PRINTER", parm.getUserId()); } else { parmMap.put("PRINTER",
	 * "EMPTY"); } parmMap.put("REPORT_ID", "RCS023"); parmMap.put("P_DATE",
	 * sdfReport.format(calendar.getTime())); parmMap.put("P_MASTER", strMaster);
	 * 
	 * builder.setJrXml(
	 * request.getSession().getServletContext().getResourceAsStream(
	 * "/WEB-INF/reports/planning/RCS023.jrxml")); //
	 * builder.setJasper(request.getSession().getServletContext().getRealPath(
	 * "/WEB-INF/reports/planning/RCS023.jasper")); builder.setDatasource(shifLst);
	 * builder.setParameter(parmMap);
	 * 
	 * DataItem resItem = new DataItem(); // String filePathName =
	 * builder.generate(ReportType.SAVE_PDF); String filePathName = "";
	 * 
	 * if (parm.getReportId().equals("") || parm.getReportId().equals("PDF")) {
	 * filePathName = builder.generate(ReportType.SAVE_PDF); } else if
	 * (parm.getReportId().equals("EXCEL")) { filePathName =
	 * builder.generate(ReportType.SAVE_EXCEL); }
	 * 
	 * String fileName[] =
	 * filePathName.split(PcsProperties.getProperty("file.separator"));
	 * 
	 * File file = new File(filePathName);
	 * 
	 * InputStream in = new FileInputStream(file); FileUploadItem fileItem = new
	 * FileUploadItem();
	 * 
	 * fileItem.setFileName(fileName[fileName.length - 1]);
	 * fileItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
	 * 
	 * resItem.add(fileItem); res.setData(resItem.getCollection());
	 * 
	 * // Remove temp file builder.removePDFfile(in, file); return res; }
	 */
}
