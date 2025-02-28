package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/staffattendancepershift")
public class StaffAttendancePerShiftController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffAttendance4JPVC(SearchStaffAttendanceParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		result = invokeService("MOST.staffAttendance.getStaffAttendance4JPVC", parm);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());
		return response;
	}

}
