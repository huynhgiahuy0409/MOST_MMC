package com.tsb.most.biz.rest.codes;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.basebiz.dataitem.codes.HSCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchHSCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class HSCodeController.
 */
@RestController
@RequestMapping("/v1/hscode")
public class HSCodeController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody 
	public RestResponse selectHSCodeList(HttpServletRequest request, SearchHSCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.hsCode.selectHSCodeList",parm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
	  
	  	return res;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<HSCodeItem> item) throws ServiceException, Exception {
		
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));

		Object result = invokeService("MOST.hsCode.insertItems", insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody 
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<HSCodeItem> item) throws ServiceException, Exception { 
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.hsCode.updateItems", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
			
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody HSCodeItem item) throws BizException {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
			
		invokeService("MOST.hsCode.deleteItems",deleteParm);
	}
	  
	@RequestMapping(value = "/duplicationHSCodeCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse duplicationHSCodeCheck(HttpServletRequest request, SearchHSCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.hsCode.duplicationHSCodeCheck", parm);
		
		res.setData(((DataItemList)result).getCollection());
	  	res.setLimit(((DataItemList)result).getTotalRowCount());
	  		
	  	return res; 
	}
	
	
	@RequestMapping(value = "/hscodepopuplist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHsCodePopup(SearchHSCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.hsCode.selectHsCodePopup", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
