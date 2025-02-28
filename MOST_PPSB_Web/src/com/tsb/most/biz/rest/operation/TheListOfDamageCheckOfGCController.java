package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.DamageCheckItem;
import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/thelistofdamagecheckofgc")
public class TheListOfDamageCheckOfGCController extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGCDamageCheckItems(SearchDamageCheckParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDamageCheckItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody 
	public RestResponse selectGCDmgDtlDmgItems(SearchDamageCheckParm parm) 
			throws ServiceException, Exception { 
	  RestResponse res = new RestResponse(); Object
	  result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDmgDtlDmgItems",parm); 
	  res.setData(((DataItemList) result).getCollection());
	  res.setLimit(((DataItemList) result).getTotalRowCount()); 
	  return res; 
    }
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteGCDmgItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<DamageCheckItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.deleteGCDmgItem",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

}
