package com.tsb.most.biz.rest.monitoring;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.monitoring.JobMonitoringOfROROExportItem;
import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROExportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/jobmonitoringofroroexport")
public class JobMonitoringOfROROExportController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchJobMonitoringOfROROExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROExport.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchJobMonitoringOfROROExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROExport.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/snitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfROROExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROExport.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitJobDetailItems(SearchJobMonitoringOfROROExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROExport.selectUnitJobDetailItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/validatefordeletinggateinjob", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationForDeletingGateInJob(SearchJobMonitoringOfROROExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.jobMonitoringOfROROExport.selectValidationForDeletingGateInJob",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<JobMonitoringOfROROExportItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.jobMonitoringOfROROExport.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitjobdetailitems/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteSingleGrid(@PathVariable("id") String id, @RequestBody UpdateBizParm<JobMonitoringOfROROExportItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.jobMonitoringOfROROExport.deleteItems",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
