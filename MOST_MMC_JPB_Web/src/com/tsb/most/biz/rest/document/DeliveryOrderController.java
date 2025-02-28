package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.document.DeliveryOrderItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/deliveryorder")
public class DeliveryOrderController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDeliveryOrder(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectDeliveryOrder",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/whcheckdataforindirect", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getWhCheckDataForIndirect(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.getWhCheckDataForIndirect",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/aproncheckdataforindirect", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getApronCheckDataForIndirect(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.getApronCheckDataForIndirect",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDeliveryOrderDetail(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectDeliveryOrderDetail",parm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/subdolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSubDeliveryOrder(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectSubDeliveryOrder",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/duplicateChk", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse subDoNoDuplicateChk(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.subDoNoDuplicateChk",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cgOpList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoMasterList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectCargoMasterList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/dopkgdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectPackageItems(SearchDeliveryOrderParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectPackageItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/deliveryOrderWgtChk", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDeliveryOrderWgtCheck(SearchDeliveryOrderParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrder.selectDeliveryOrderWgtCheck",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<DeliveryOrderItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrder.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DeliveryOrderItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrder.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody DeliveryOrderItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.deliveryOrder.deleteItems", deleteItems);
	}
	
	@RequestMapping(value = "/subdolist", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertSubDeliveryOrderItems(@RequestBody UpdateBizParm<DeliveryOrderItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrder.insertSubDeliveryOrderItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/subdolist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateSubDeliveryOrderItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DeliveryOrderItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrder.updateSubDeliveryOrderItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/subdolist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteSubDeliveryOrderItems(@PathVariable("id") String id, @RequestBody DeliveryOrderItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.deliveryOrder.deleteSubDeliveryOrderItems", deleteItems);
	}
}
