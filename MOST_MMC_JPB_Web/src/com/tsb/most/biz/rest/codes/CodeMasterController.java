package com.tsb.most.biz.rest.codes;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.codes.CodeMasterItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class DetailCodeController.
 */
@Controller
@RequestMapping("/v1/codeMaster")
public class CodeMasterController extends RestBaseController {
	@RequestMapping(value = "/selectCodeMasterMiddleCode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCodeMasterMiddleCode(SearchCodeMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.selectCodeMasterMiddleCode", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterSmallCode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCodeMasterSmallCode() throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		SearchCodeMasterParm parm = new SearchCodeMasterParm();
		
		Object result = invokeService("MOST.codeMaster.selectCodeMasterSmallCode", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterSmallCodeList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCodeMasterSmallCodeList(SearchCodeMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.selectCodeMasterSmallCodeList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCodeMasterList(SearchCodeMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.selectCodeMasterList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCommodityCodeCombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommodityCodeCombo(SearchCodeMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.selectCommodityCodeCombo", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterSmallCodeList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<CodeMasterItem> item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		Object result = invokeService("MOST.codeMaster.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterSmallCodeList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CodeMasterItem> item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.codeMaster.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectCodeMasterSmallCodeList/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody CodeMasterItem item) {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.codeMaster.deleteItems",deleteParm);
	}
	
	@RequestMapping(value = "/duplicationCodeCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse duplicationCodeCheck(SearchCodeMasterParm parm) {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.duplicationCodeCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
