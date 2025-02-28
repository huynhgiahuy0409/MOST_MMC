package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmLoadingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/confirmloadingofrororehandling")
public class ConfirmLoadingOfRORORehandlingController  extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORORehandling.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORORehandling.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORORehandling.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateLoadingOfRORORehandlingItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmLoadingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmLoadingOfRORORehandling.updateLoadingOfRORORehandlingItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
