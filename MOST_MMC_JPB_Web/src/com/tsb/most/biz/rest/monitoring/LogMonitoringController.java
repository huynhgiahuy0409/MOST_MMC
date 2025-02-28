package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/logmonitoring")
public class LogMonitoringController extends RestBaseController{
	@RequestMapping(value = "/listmost", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListFileMOST(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectListFileMOST",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/listwb", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListFileWB(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectListFileWB",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/listhg", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListFileHG(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectListFileHG",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/downloadlogmost", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileDownLoadMOST(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectFileDownLoadMOST", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/downloadlogwb", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileDownLoadWB(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectFileDownLoadWB", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/downloadloghg", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileDownLoadHG(SearchFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.logMonitoring.selectFileDownLoadHG", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
}
