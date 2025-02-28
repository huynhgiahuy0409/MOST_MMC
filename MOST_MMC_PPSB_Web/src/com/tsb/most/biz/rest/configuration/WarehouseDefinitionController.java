package com.tsb.most.biz.rest.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.configuration.WarehouseDefinitionItem;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/warehouse")
public class WarehouseDefinitionController extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(WarehouseDefinitionController.class);
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWarehouseDefinitionList(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.warehouseDefinition.selectWarehouseDefinitionList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/areaInfo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.warehouseDefinition.selectAreaInfoList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/checkduplilocid", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChkDupliLocId(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.warehouseDefinition.selectChkDupliLocId",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/overlap", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOverlap(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.warehouseDefinition.selectOverlap",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/whViewList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhViewList(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {	
		RestResponse res = new RestResponse();
		Object result = null;
		
		if(parm.getSearchType().equals("HHTWhViewList")) {
			result = invokeService("MOST.warehouseDefinition.selectHHTWhViewList",parm);
		}else {
			result = invokeService("MOST.warehouseDefinition.selectWhViewList",parm);
		}
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<WarehouseDefinitionItem> parm) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		Object object = invokeService("MOST.warehouseDefinition.insertItems", insertParm);

		RestResponse res = new RestResponse();
		res.setData(((DataItemList)object).getCollection());
		res.setLimit(((DataItemList)object).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<WarehouseDefinitionItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object object = invokeService("MOST.warehouseDefinition.updateItems", updateParm);

		RestResponse res = new RestResponse();
		res.setData(((DataItemList)object).getCollection());
		res.setLimit(((DataItemList)object).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id,@RequestBody WarehouseDefinitionItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.addDeleteItem(item);
		invokeService("MOST.warehouseDefinition.deleteItems", deleteItems);
	}	
	
	@RequestMapping(value = "/unusedblock", method = RequestMethod.POST)
	@ResponseBody
	public void insertUnusedBlock(@RequestBody WarehouseDefinitionItem item) throws ServiceException, Exception {
		DataItemList itemList = new DataItemList();
		itemList.add(item);
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(itemList);
		invokeService("MOST.warehouseDefinition.updateUnusedCells", updateParm);
	}
	
	@RequestMapping(value = "/unusedblock/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteUnusedBlock(@PathVariable("id") String id,@RequestBody WarehouseDefinitionItem item) throws ServiceException, Exception{
		DataItemList itemList = new DataItemList();
		itemList.add(item);
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(itemList);
		invokeService("MOST.warehouseDefinition.updateUnusedCells", updateParm);
	}
}
