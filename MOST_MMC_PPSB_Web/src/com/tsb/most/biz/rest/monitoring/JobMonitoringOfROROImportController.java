package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.monitoring.JobMonitoringOfROROImportItem;
import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROImportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/jobmonitoringofroroimport")
public class JobMonitoringOfROROImportController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectJobMonitoringOfROROImportList(SearchJobMonitoringOfROROImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROImport.selectJobMonitoringOfROROImportList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchJobMonitoringOfROROImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROImport.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/blitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlItems(SearchJobMonitoringOfROROImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROImport.selectBlItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitJobDetailItems(SearchJobMonitoringOfROROImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROImport.selectUnitJobDetailItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<JobMonitoringOfROROImportItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.jobMonitoringOfROROImport.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteSingleGrid(@PathVariable("id") String id, @RequestBody UpdateBizParm<JobMonitoringOfROROImportItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.jobMonitoringOfROROImport.deleteItems",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
