package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.planning.StaffAttendanceItem;
import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/staffattendance")
public class StaffAttendanceController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffAttendance(SearchStaffAttendanceParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		result = invokeService("MOST.staffAttendance.getStaffAttendance", parm);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());
		return response;
	}
	

	@RequestMapping(value = "/leaveType/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateStaffAttendanceLeaveType(@PathVariable("id") String id, @RequestBody StaffAttendanceItem item) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		UpdateItemsBizParm parm = new UpdateItemsBizParm();
		parm.setUpdateItem(item);
		
		Object result = new Object();
		result = invokeService("MOST.staffAttendance.updateStaffAttendanceLeaveType", parm);
		
		response.setData(((DataItemList) result).getCollection());
		return response;
	}
	
	/*
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateStaffAttendance(@PathVariable("id") String id, @RequestBody StaffAttendanceItem item)
			throws ServiceException, Exception {
		item.setCrud(DAOProcessType.UPDATE);
		for (int i = 0; i < item.getStaffAttendanceList().size(); i++) {
			item.getStaffAttendanceList().get(i).setCrud(DAOProcessType.UPDATE);
		}
		CudParm pParm = new CudParm();
		pParm.setDataItem(item);

		execute("planning", "processStaffAttendance", pParm);
	} 

	@RequestMapping(value = "/generatepdfstfattd", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse generatePdf(StaffAttendanceParm parm, HttpServletRequest request, HttpServletResponse response)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		HashMap parmMap = new HashMap();
		String sReportId = " ";
		parmMap.put("DATE", parm.getWorkYmd());
		parmMap.put("COST_CENTER", parm.getCostCentCd());
		parmMap.put("REPORT_ID", "RCS035");
		parmMap.put("IMAGE_PATH",
				request.getSession().getServletContext().getRealPath("/WEB-INF/reports/" + PcsProperties.getProperty("terminal.code") + ".gif"));
		if (!("".equalsIgnoreCase(parm.getUserId()))) {
			parmMap.put("USER_ID", parm.getUserId());
		} else {
			parmMap.put("USER_ID", "EMPTY");
		}
		// TAM ANH EDIT 02/10/2012 FOR REPORT Staff daily report
		RestResponse result = new RestResponse();
		if (parm.getSearchTp().equals("IV_LIST_DTL")) {
			result = (RestResponse) execute("planning", "getStaffAttendanceDaily", parm);
		} else {
			result = (RestResponse) execute("planning", "getDailyTimeShift", parm);
		}
		ArrayList resList = new ArrayList();
		List vdrList = result.getData();
		int no = 0;
		for (Iterator it = vdrList.iterator(); it.hasNext();) {
			StaffAttendanceItem itm = (StaffAttendanceItem) it.next();
			HashMap vdrMap = new HashMap();
			no++;
			vdrMap.put("no", Integer.toString(no));
			vdrMap.put("staffNo", itm.getStaffNo());
			vdrMap.put("staffNm", itm.getStaffNm());
			vdrMap.put("costCenter", itm.getCostCentCd());
			vdrMap.put("role", itm.getRoleNm());
			vdrMap.put("normalShift", itm.getNormalShift());
			if ("SF0014".equalsIgnoreCase(parm.getShiftId())) {
				parmMap.put("SHIFT_NM", "1ST");
				vdrMap.put("otFmHhMm", itm.getOt1stFrom());
				vdrMap.put("otToHhMm", itm.getOt1stTo());
			}
			if ("SF0012".equalsIgnoreCase(parm.getShiftId())) {
				parmMap.put("SHIFT_NM", "2ND");
				vdrMap.put("otFmHhMm", itm.getOt2ndFrom());
				vdrMap.put("otToHhMm", itm.getOt2ndTo());
			}
			if ("SF0013".equalsIgnoreCase(parm.getShiftId())) {
				parmMap.put("SHIFT_NM", "3RD");
				vdrMap.put("otFmHhMm", itm.getOt3rdFrom());
				vdrMap.put("otToHhMm", itm.getOt3rdTo());
			}
			vdrMap.put("ma", itm.getMa());
			vdrMap.put("ea", itm.getEa());
			resList.add(vdrMap);
			parmMap.put("costCentCdNm", itm.getDescr());
			parmMap.put("Day", itm.getDayWork());
			parmMap.put("holiday", itm.getIsPuclicHoliday());
			vdrMap.put("FromTime", itm.getFmTime());
			vdrMap.put("ToTime", itm.getToTime());
			vdrMap.put("WorkLoc", itm.getWorkLoc());
			vdrMap.put("JPVC", itm.getVslCallId());
			vdrMap.put("Purpose", itm.getPurpose());
			vdrMap.put("group", itm.getGroupNm());
			vdrMap.put("roster", itm.getRoster());
		}

		IReportBuilder builder = new ReportBuilder();
		if (parm.getSearchTp().equals("IV_LIST_DTL")) {
			builder.setJrXml(request.getSession().getServletContext()
					.getResourceAsStream("/WEB-INF/reports/planning/RCS035.jrxml"));
		} else {
			builder.setJrXml(request.getSession().getServletContext()
					.getResourceAsStream("/WEB-INF/reports/planning/RCS036.jrxml"));
		}
		builder.setDatasource(resList);
		builder.setParameter(parmMap);

		DataItem resItem = new DataItem();
		//String filePathName = builder.generate(ReportType.SAVE_PDF);
		String filePathName = "";
        if("excel".equalsIgnoreCase(parm.getPrintType())){
        	filePathName = builder.generate(ReportType.SAVE_EXCEL);
        }else {
        	filePathName = builder.generate(ReportType.SAVE_PDF);
        }
		
		String fileName[] = filePathName.split(PcsProperties.getProperty("file.separator"));

		File file = new File(filePathName);

		InputStream in = new FileInputStream(file);
		FileUploadItem fileItem = new FileUploadItem();

		fileItem.setFileName(fileName[fileName.length - 1]);
		fileItem.setContent(IOUtils.toString(in, "ISO-8859-1"));

		resItem.add(fileItem);
		res.setData(resItem.getCollection());

		// Remove temp file
		builder.removePDFfile(in, file);

		return res;
	}
	*/
}
