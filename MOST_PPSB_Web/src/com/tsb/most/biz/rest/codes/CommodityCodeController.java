package com.tsb.most.biz.rest.codes;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.codes.CommodityCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/commoditycode")
public class CommodityCodeController extends RestBaseController {
	
	@RequestMapping(value = "/commodityCodeGridList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommodityCodeList(SearchCommodityCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.commodityCode.selectCommodityCodeList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/commodityCodeGridList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<CommodityCodeItem> item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		
		Object result = invokeService("MOST.commodityCode.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/commodityCodeGridList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CommodityCodeItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.commodityCode.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/commodityCodeGridList/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody CommodityCodeItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.commodityCode.deleteItems",deleteParm);
	}
	
	@RequestMapping(value = "/commodityGroup", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertCommodityGroupItem(@RequestBody UpdateBizParm<CommodityCodeItem> item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		
		Object result = invokeService("MOST.commodityCode.insertCommodityGroupItem",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/commodityGroup", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommodityGroupItem(SearchCommodityCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.commodityCode.selectCommodityGroupItem", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/commodityGroup/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCommodityGroupItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<CommodityCodeItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.commodityCode.updateCommodityGroupItem",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/commodityGroup/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteCommodityGroupItem(@PathVariable("id") String id, @RequestBody CommodityCodeItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.commodityCode.deleteCommodityGroupItem",deleteParm);
	}
	
	@RequestMapping(value = "/checkDuplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse checkDuplicate(SearchCommodityCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.commodityCode.checkDuplicate", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
}
