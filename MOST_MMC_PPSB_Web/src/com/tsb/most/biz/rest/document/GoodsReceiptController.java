package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/goodsreceipt")
public class GoodsReceiptController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGoodsReceiptList(SearchGoodsReceiptParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectGoodsReceiptList", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGoodsReceiptDetail(SearchGoodsReceiptParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectGoodsReceiptDetail", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGoodsReceiptForCreating(SearchGoodsReceiptParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectGoodsReceiptForCreating", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/grpkgdetail", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse selectPackageItems(SearchGoodsReceiptParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectPackageItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertGoodsReceipt(@RequestBody UpdateBizParm<GoodsReceiptItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.goodsReceipt.insertItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateGoodsReceipt(@PathVariable("id") String id, @RequestBody UpdateBizParm<GoodsReceiptItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.goodsReceipt.updateItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteSingleGrid(@PathVariable("id") String id, @RequestBody GoodsReceiptItem item) throws ServiceException, Exception {
		DataItemList items = new DataItemList();
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.goodsReceipt.deleteItems", deleteItems);
	}
	
	@RequestMapping(value = "/roro", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertGoodsReceiptOfRORO(@RequestBody UpdateBizParm<GoodsReceiptItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.goodsReceipt.insertGoodsReceiptOfRORO", items);
		
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/goodsreceiptrts", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBalanceGoodsReceiptReturnToShipper(SearchGoodsReceiptParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectBalanceGoodsReceiptReturnToShipper", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/warehouseRtsList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWarehouseRtsList(SearchGoodsReceiptParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectWarehouseRtsList", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoItems(SearchShippingNoteParm parm) throws ServiceException {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.goodsReceipt.selectRTSRoRoItems", parm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
