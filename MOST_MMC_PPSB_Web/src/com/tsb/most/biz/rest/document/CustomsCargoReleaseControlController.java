package com.tsb.most.biz.rest.document;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.document.CustomsCargoReleaseControlItem;
import com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/customscargoreleasecontrol")
public class CustomsCargoReleaseControlController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCustomsCargoReleaseList(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.customsCargoReleaseControl.selectCustomsCargoReleaseList", parm);
		DataItemList resList = (DataItemList)result; 
		
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems( @RequestBody UpdateBizParm<CustomsCargoReleaseControlItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.customsCargoReleaseControl.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CustomsCargoReleaseControlItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.customsCargoReleaseControl.updateItems", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CustomsCargoReleaseControlItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.customsCargoReleaseControl.deleteItems", deleteParm);
	}	
	
	@RequestMapping(value = "/masterBlItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMasterBlItems(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.customsCargoReleaseControl.selectMasterBlItems", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/bookingNoItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBookingNoItems(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.customsCargoReleaseControl.selectBookingNoItems", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/docNoInfo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDocNoInfo(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.customsCargoReleaseControl.selectDocNoInfo", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/blSnItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlSnItems(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.customsCargoReleaseControl.selectBlSnItems", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoNoInfo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoNoInfo(SearchCustomsCargoReleaseControlParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.customsCargoReleaseControl.selectCargoNoInfo", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
}