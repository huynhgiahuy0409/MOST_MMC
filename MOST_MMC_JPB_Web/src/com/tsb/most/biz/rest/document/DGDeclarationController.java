package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/dgdeclaration")
public class DGDeclarationController extends RestBaseController {
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDGDeclarationDetail(SearchDGDeclarationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.dgDeclaration.getDGDeclarationItems", parm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/substance", method = RequestMethod.GET)
	@ResponseBody public RestResponse selectDGDeclarationSubstance(SearchDGDeclarationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		parm.setSearchType("substance"); 
		Object result = invokeService("MOST.dgDeclaration.getDGDeclarationItems", parm);
		res.setData(((DataItemList)result).getCollection());
		return (res) ; 
	}
}
