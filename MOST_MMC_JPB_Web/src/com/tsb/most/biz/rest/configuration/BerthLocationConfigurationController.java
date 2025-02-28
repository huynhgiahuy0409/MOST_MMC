package com.tsb.most.biz.rest.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.configuration.BerthLocationConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchBerthLocationConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/berthLocation")
public class BerthLocationConfigurationController extends RestBaseController {
	@RequestMapping(value="/BerthWharfs", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthWharfList(SearchBerthLocationConfigurationParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.berthLocationConfiguration.selectBerthWharfList",parm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
		
	}
	
	@RequestMapping(value="/BerthWharfs/validateDuplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthWharfItem(SearchBerthLocationConfigurationParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.berthLocationConfiguration.selectBerthWharfList",parm);

		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/BerthWharfs", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody BerthLocationConfigurationItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.berthLocationConfiguration.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/BerthWharfs/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody BerthLocationConfigurationItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.berthLocationConfiguration.updateItems",updateParm);
		
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/BerthWharfs/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody BerthLocationConfigurationItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.berthLocationConfiguration.deleteItems",deleteParm);
	}
	
}
