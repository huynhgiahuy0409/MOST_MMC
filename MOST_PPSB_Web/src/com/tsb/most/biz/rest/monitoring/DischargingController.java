package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/discharging")
public class DischargingController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfDischarging(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectListOfDischarging",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDischargingComboList(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectModeOfOpr",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/blComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDischargingBlComboList(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectImportBLComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/mfComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectImportManifestComboList(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectImportManifestComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	/*Add for HHT*/
	@RequestMapping(value = "/blComboListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectNumbPage(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectNumbPage",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/dischargeReportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselDischargeListReport(SearchDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.discharging.selectVesselDischargeListReport",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
