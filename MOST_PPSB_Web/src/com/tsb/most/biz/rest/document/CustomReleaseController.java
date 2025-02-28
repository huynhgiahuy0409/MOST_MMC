package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.document.CheckListCustomClearanceItem;
import com.tsb.most.biz.dataitem.document.CustomerCleranceItem;
import com.tsb.most.biz.parm.document.SearchCustomerCleranceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/customRelease")
public class CustomReleaseController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getCustomsCargoReleaseList(SearchCustomerCleranceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.customRelease.getCustomsCargoReleaseList", parm);
		DataItemList resList = (DataItemList)result; 
		
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/blSnCombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getCustomsCargoReleaseComboList(SearchCustomerCleranceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.customRelease.getCustomsCargoReleaseComboList", parm);
		DataItemList resList = (DataItemList)result; 
		
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		
		return res;
	}
	
	
	@RequestMapping(value = "/status/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody CheckListCustomClearanceItem item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.addInsertItem(item);
		
		Object result = invokeService("MOST.customRelease.processCustomsCargoReleaseCUD", insertParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

}
