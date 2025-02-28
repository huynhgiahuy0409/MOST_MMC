package com.tsb.most.biz.rest.operation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.StevedoreTrimmingItem;
import com.tsb.most.biz.parm.operation.SearchStevedoreTrimmingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/stevedoretrimming")
public class StevedoreTrimmingController extends RestBaseController {
	
	@RequestMapping(value = "/stevedoreTrimmingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStevedoreTrimmingList(SearchStevedoreTrimmingParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		if ("info".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("EQ");
			Object result = invokeService("MOST.stevedoreTrimming.selectVORDryBreakBulk",parm);
			response.setData(((DataItemList)result).getCollection());
		}  else if ("infoSheet".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("WC") ;
			Object result = invokeService("MOST.stevedoreTrimming.selectVORDryBreakBulk",parm);
			response.setData(((DataItemList)result).getCollection());
		} else {
			Object result = invokeService("MOST.stevedoreTrimming.selectVORDryBreakBulkCommonCd",parm);
			response.setData(((DataItemList)result).getCollection());
		}
		
		return response;
		
	}
		
	@RequestMapping(value = "/stevedoreTrimmingList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateStevedoreTrimmingList(@PathVariable("id") String id, @RequestBody StevedoreTrimmingItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		if(item.getWithGears() == "" || item.getWithGears() == null) {
			item.setWithGears("N");
		}
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		invokeService("MOST.stevedoreTrimming.processVORDryBreakBulkForStevAndTrimCUD",updateParm);
		
	}
}
