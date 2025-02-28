package com.tsb.most.biz.rest.document;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.document.RORODischargingListItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class CountryCodeController.
 */
@Controller
@RequestMapping("/v1/exceluploadblforroro")
public class RORODischargingListController extends RestBaseController {
	
	@RequestMapping(value = "/rorodischarginglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRORODischarginglist(SearchExcelFileUploadParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.rORODischargingList.selectRORODischarginglist", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/duplicatecheckbl", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectbl(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.rORODischargingList.selectBLList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/rorodischarginglist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<RORODischargingListItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		insertItems.setUserId(parm.getUserId());
		
		insertItems.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.rORODischargingList.insertItems", insertItems);
		
		res.setData(((DataItemList)result).getCollection());
		res.setErrorNumber(((DataItemList)result).getErrorFlag());
		res.setErrorDescription(((DataItemList)result).getErrorDesc());
		
		return res;
	}
	
	@RequestMapping(value = "/rorodischarginglist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems (@PathVariable("id") String id, @RequestBody UpdateBizParm<RORODischargingListItem> parm) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUserId(parm.getUserId());
		
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.rORODischargingList.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
}
