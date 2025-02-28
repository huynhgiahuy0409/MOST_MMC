package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/auditcargo")
public class AuditCargoController extends RestBaseController {
    
    @RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAudiCargoList(SearchAuditCargoParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.auditCargo.selectAuditCargoItems", parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/screenItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectScreenNameComboBoxItems(SearchAuditCargoParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.auditCargo.selectScreenNameComboBoxItems", parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/blItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboBoxItems(SearchAuditCargoParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.auditCargo.selectBlComboBoxItems", parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/snItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchAuditCargoParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.auditCargo.selectShipgNoteNoComboBoxItems", parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
}
