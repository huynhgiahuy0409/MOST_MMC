package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.RehandlingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rehandlingofroro")
public class RehandlingOfROROController  extends RestBaseController {
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOriginalCargoItems(SearchRehandlingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfRORO.selectOriginalCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/documentComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDocumentComboItemList(SearchRehandlingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfRORO.selectDocumentComboItemList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rehandlinglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRehandlingCargoItems(SearchRehandlingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfRORO.selectRehandlingCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/rehandlinglist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteRehandlingItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandlingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		DeleteItemsBizParm items = new DeleteItemsBizParm();
		items.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.rehandlingOfRORO.deleteRehandlingItem", items);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	//Detail screen
	@RequestMapping(value = "/stackedUnitList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStackedUnitItems(SearchRehandlingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfRORO.selectStackedUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		//res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/rehandlingUnitList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRehandlingUnitItems(SearchRehandlingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfRORO.selectRehandlingUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		//res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/rehandlingUnitList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertRehandlingOfROROItems(@RequestBody UpdateBizParm<RehandlingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.rehandlingOfRORO.insertRehandlingOfROROItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rehandlingUnitList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateRehandlingOfROROItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandlingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.rehandlingOfRORO.updateRehandlingOfROROItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
