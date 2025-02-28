package com.tsb.most.biz.rest.configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.configuration.TerminalDefinitionItem;
import com.tsb.most.basebiz.parm.configuration.SearchTerminalDefinitionParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/terminaldefinition")
public class TerminalDefinitionController extends RestBaseController {
	@RequestMapping(value = "/items", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTerminalDefinition(SearchTerminalDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalDefinition.selectTerminalDefinition",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/items/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<TerminalDefinitionItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.terminalDefinition.updateItems", updateParm);
		
		RestResponse rtnResponse = new RestResponse();
		rtnResponse.setData(((DataItemList)result).getCollection());
		rtnResponse.setLimit(((DataItemList)result).getTotalRowCount());
		
		return rtnResponse;
	}
}
