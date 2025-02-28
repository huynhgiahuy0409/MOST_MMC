package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/cargojob")
public class CargoJobController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectJobMonitoringList(SearchCargoJobParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoJob.selectJobMonitoringList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateJobMonitoring(@PathVariable("id") String id, @RequestBody CargoJobItem item) throws ServiceException, Exception{
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.UPDATE);
		list.add(item);
		
		pParm.setUpdateItems(list);
		
		invokeService("MOST.cargoJob.updateJobMonitoring",pParm);
		
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteJobMonitoring(@PathVariable("id") String id, @RequestBody CargoJobItem item) throws ServiceException, Exception{
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.DELETE);
		list.add(item);
		
		pParm.setUpdateItems(list);
		
		invokeService("MOST.cargoJob.updateJobMonitoring",pParm);
		
	}
}
