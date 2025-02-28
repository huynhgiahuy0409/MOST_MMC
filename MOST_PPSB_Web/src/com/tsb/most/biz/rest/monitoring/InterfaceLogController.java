package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.monitoring.InterfaceLogItem;
import com.tsb.most.biz.parm.monitoring.SearchInterfaceLogParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/interfaceLog")
public class InterfaceLogController extends RestBaseController {
	
	@RequestMapping(value = "/searchInterfaceLogItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchInterfaceLogItems(SearchInterfaceLogParm parm) throws ServiceException, Exception{
		Object result = invokeService("MOST.interfaceLog.searchInterfaceLogItems", parm);
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/searchInterfaceLogItems/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateInterfaceLogItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<InterfaceLogItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.interfaceLog.updateInterfaceLogItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
