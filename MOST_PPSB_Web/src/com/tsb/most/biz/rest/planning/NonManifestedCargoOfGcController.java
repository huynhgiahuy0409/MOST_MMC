package com.tsb.most.biz.rest.planning;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.planning.NonManifestedCargoOfGcItem;
import com.tsb.most.biz.parm.planning.SearchNonManifestedCargoOfGcParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/nonmanifestedcargoofgc")
public class NonManifestedCargoOfGcController  extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getNonManifestedCargoOfGcList(SearchNonManifestedCargoOfGcParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.nonManifestedCargoOfGc.selectNonManifestedCargoOfGcList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems( @RequestBody UpdateBizParm<NonManifestedCargoOfGcItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.nonManifestedCargoOfGc.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<NonManifestedCargoOfGcItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.nonManifestedCargoOfGc.updateItems", updateParm);

		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<NonManifestedCargoOfGcItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.nonManifestedCargoOfGc.deleteItems", deleteParm);
	}	
	
	@RequestMapping(value = "/nonManifestRegisterList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateNonManifestRegister(@PathVariable("id") String id, @RequestBody UpdateBizParm<NonManifestedCargoOfGcItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.nonManifestedCargoOfGc.updateNonManifestRegister",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/nonManifestRegisterList", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertNonManifestRegister(@RequestBody UpdateBizParm<NonManifestedCargoOfGcItem> item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		
		insertParm.setInsertItems(super.getItems(item));
		
		invokeService("MOST.nonManifestedCargoOfGc.insertNonManifestRegister",insertParm);
	}
	
	@RequestMapping(value = "/blItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlItems(SearchNonManifestedCargoOfGcParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.nonManifestedCargoOfGc.selectBlItems", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/snItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSnItems(SearchNonManifestedCargoOfGcParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.nonManifestedCargoOfGc.selectSnItems", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/orgBlItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOrgBlComboBoxItem(SearchNonManifestedCargoOfGcParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.nonManifestedCargoOfGc.selectOrgBlComboBoxItem",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/deleteValidation", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkValidation(SearchNonManifestedCargoOfGcParm parm)	throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.nonManifestedCargoOfGc.deleteValidation",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/getShiftInfor", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftInfor(SearchNonManifestedCargoOfGcParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.nonManifestedCargoOfGc.selectShiftInfor", parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
}
