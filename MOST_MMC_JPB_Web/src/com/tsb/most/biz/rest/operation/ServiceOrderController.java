package com.tsb.most.biz.rest.operation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ServiceOrderItem;
import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.biz.parm.planning.SearchShiftGroupDefParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/serviceorder")
public class ServiceOrderController extends RestBaseController {
    private static Logger logger = LoggerFactory.getLogger(ServiceOrderController.class);
    
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectServiceOrderList(SearchServiceOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.serviceOrder.selectServiceOrderList",parm);	// Service Bean ID
		res.setData(((DataItemList)result).getCollection());
		return res;
    }

    @RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public RestResponse updateServiceOrderListItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ServiceOrderItem> parm) throws ServiceException, Exception {

		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.serviceOrder.updateServiceOrderItem",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
        
    }
    
    @RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteServiceOrderListItem(@RequestBody ServiceOrderItem item) throws ServiceException, Exception {

    	DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.serviceOrder.deleteServiceOrderItem",deleteParm);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectServiceOrderItem(SearchServiceOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.serviceOrder.selectServiceOrderItem",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
		
    }

    @RequestMapping(value = "/detail", method = RequestMethod.POST)
    @ResponseBody
    public RestResponse insertServiceOrderItem(@RequestBody ServiceOrderItem item) throws ServiceException, Exception {
        
        DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.serviceOrder.insertServiceOrderItem",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;		
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public RestResponse updateServiceOrderItem(@RequestBody ServiceOrderItem item) throws ServiceException, Exception {

    	DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.serviceOrder.updateServiceOrderItem",updateParm);
		
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;        
        
        
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteServiceOrderItem(@RequestBody ServiceOrderItem item) throws ServiceException, Exception {

    	DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.serviceOrder.deleteServiceOrderItem",deleteParm);
    }

    @RequestMapping(value = "/blItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBLItems(SearchServiceOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.serviceOrder.selectBLItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShippingNoteItems(SearchServiceOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.serviceOrder.selectShippingNoteItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	
	@RequestMapping(value = "/blsnList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBLSNItems(SearchServiceOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.serviceOrder.selectBLSNItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
