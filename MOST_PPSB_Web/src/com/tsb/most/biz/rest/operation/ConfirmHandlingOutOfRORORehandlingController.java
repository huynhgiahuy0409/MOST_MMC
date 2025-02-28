package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmHandlingOutOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/confirmhandlingoutofrororehandling")
public class ConfirmHandlingOutOfRORORehandlingController  extends RestBaseController {
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/stackedunitlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStackedUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingoutlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingoutcombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.selectHandlingOutComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/sncombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingoutlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateHandlingOutUnitItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.updateHandlingOutUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingoutlist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteHandlingOutUnitItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORORehandling.deleteHandlingOutUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
}
