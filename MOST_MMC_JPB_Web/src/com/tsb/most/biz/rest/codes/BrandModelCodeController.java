package com.tsb.most.biz.rest.codes;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.codes.BrandModelCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchBrandModelCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class CountryCodeController.
 */
@Controller
@RequestMapping("/v1/brandmodelcode")
public class BrandModelCodeController extends RestBaseController {
	
	@RequestMapping(value = "/brands", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBrandCodeItems(SearchBrandModelCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.brandModelCode.selectBrandCodeItems", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/models", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectModelCodeItems(SearchBrandModelCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.brandModelCode.selectModelCodeItems", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/brandCodeDuplicateCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse brandCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.brandModelCode.brandCodeDuplicateCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/brandCodeRemoveCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse brandCodeRemoveCheck(SearchBrandModelCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.brandModelCode.brandCodeRemoveCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/modelCodeDuplicateCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse modelCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.brandModelCode.modelCodeDuplicateCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/brands", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertBrandCodeItems(@RequestBody BrandModelCodeItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.brandModelCode.insertBrandCodeItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;		
	}
	
	@RequestMapping(value = "/models", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertModeCodelItems(@RequestBody BrandModelCodeItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.brandModelCode.insertModelCodeItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;		
	}
	
	@RequestMapping(value = "/brands/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateBrandCodeItems (@PathVariable("id") String id, @RequestBody BrandModelCodeItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.brandModelCode.updateBrandCodeItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;        
	}
	
	@RequestMapping(value = "/models/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateModelCodeItems (@PathVariable("id") String id, @RequestBody BrandModelCodeItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.brandModelCode.updateModelCodeItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;        
	}
	
	@RequestMapping(value = "/brands/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteBrandCodeItems (@PathVariable("id") String id, @RequestBody BrandModelCodeItem item) {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.brandModelCode.deleteBrandCodeItems",deleteParm);
	}
	
	@RequestMapping(value = "/models/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteModelCodeItems (@PathVariable("id") String id, @RequestBody BrandModelCodeItem item) {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.brandModelCode.deleteModelCodeItems",deleteParm);
	}
}
