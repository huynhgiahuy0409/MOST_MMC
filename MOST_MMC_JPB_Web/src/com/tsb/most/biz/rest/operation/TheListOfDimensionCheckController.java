package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.DimensionCheckItem;
import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/thelistofdimensioncheck")
public class TheListOfDimensionCheckController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDimensionCheckList(SearchDimensionCheckParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDimensionCheck.selectGCDimensionCheckItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}	  
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody 
	public RestResponse selectGCDimensionDtlDmgItems(SearchDimensionCheckParm parm) 
			throws ServiceException, Exception { 
	  RestResponse res = new RestResponse(); Object
	  result = invokeService("MOST.theListOfDimensionCheck.selectGCDimensionDtlDmgItems",parm); 
	  res.setData(((DataItemList) result).getCollection());
	  res.setLimit(((DataItemList) result).getTotalRowCount()); 
	  return res; 
    }
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteGCDimensionItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<DimensionCheckItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDimensionCheck.deleteGCDimensionItem",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
