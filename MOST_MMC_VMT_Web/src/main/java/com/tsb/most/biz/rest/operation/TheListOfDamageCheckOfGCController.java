package com.tsb.most.biz.rest.operation;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfGCItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/thelistofdamagecheckofgc")
public class TheListOfDamageCheckOfGCController extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingList(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDamageCheckItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/blitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectBlComboBoxItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/categoryitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectCategoryComboBoxItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/snitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectShipgNoteNoComboBoxItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}

	@RequestMapping(value = "/cargoitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoPopupItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectCargoPopupItems", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
  
	@RequestMapping(value = "/gcdamagecheckdetail", method = RequestMethod.GET)
	  
	@ResponseBody 
	public RestResponse selectGCDmgDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) 
			throws ServiceException, Exception { 
	  RestResponse res = new RestResponse(); Object
	  result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDmgDtlDmgItems",parm); 
	  res.setData(((DataItemList) result).getCollection());
	  res.setLimit(((DataItemList) result).getTotalRowCount()); 
	  return res; 
    }
	
	@RequestMapping(value = "/gcdamagecheckdetail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteGCDmgItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfGCItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.deleteGCDmgItem",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/listDimension", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDimensionCheckList(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDimensionCheckItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}	  
	
	@RequestMapping(value = "/gcdimensioncheckdetail", method = RequestMethod.GET)
	  
	@ResponseBody 
	public RestResponse selectGCDimensionDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) 
			throws ServiceException, Exception { 
	  RestResponse res = new RestResponse(); Object
	  result = invokeService("MOST.theListOfDamageCheckOfGC.selectGCDimensionDtlDmgItems",parm); 
	  res.setData(((DataItemList) result).getCollection());
	  res.setLimit(((DataItemList) result).getTotalRowCount()); 
	  return res; 
    }
	
	@RequestMapping(value = "/gcdimensioncheckdetail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteGCDimensionItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfGCItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.deleteGCDimensionItem",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/* HHT */
	@RequestMapping(value = "/tbldamagechecklist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTblDamageCheckList(SearchTheListOfDamageCheckOfGCParm parm) 
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTblDamageCheckItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/tblmfdocid", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTblMfDocIdComboItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTblMfDocIdComboItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/tblblitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTblBlComboItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTblBlComboItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/tblsnitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTblSnComboItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTblShipgNoteNoComboItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/tbldamagecheckdetaillist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTblDamageCheckDetailItems(SearchTheListOfDamageCheckOfGCParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTblDamageCheckDetailItems", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/tbldamagecheckdetaillist", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertTblDamageCheckDetailItems(@RequestBody UpdateBizParm<TheListOfDamageCheckOfGCItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.insertTblDamageCheckDetailItems", insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/tbldamagecheckdetaillist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateTblDamageCheckDetailItems(@PathVariable("id") String id,@RequestBody UpdateBizParm<TheListOfDamageCheckOfGCItem> parm) throws ServiceException{
		UpdateItemsBizParm updatePram = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updatePram.setUpdateItems(super.getItems(parm));
		Object result = (Object)invokeService("MOST.theListOfDamageCheckOfGC.updateTblDamageCheckDetailItems", updatePram);
		res.setData(((DataItemList)result).getCollection());
		 
		return res;

	}
	
	@RequestMapping(value = "/tbldamagechecklist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteTblDamageCheckList(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfGCItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.deleteTblDamageCheckList",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/thedamagedesc", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheDamageDesc(SearchTheListOfDamageCheckOfGCParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTheDamageDesc",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/thedamageparts", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheDamagePartItems(SearchTheListOfDamageCheckOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTheDamagePartItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/thedamagelevels", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheDamageLevelItems(SearchTheListOfDamageCheckOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.selectTheDamageLevelItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/* Migrate from DamageDimensionCheckController - ADP source */
	@RequestMapping(value = "/listDamage", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.searchDamageCheck",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	@RequestMapping(value = "/listDamage/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDamageCheck(@PathVariable("id") String id, @RequestBody TheListOfDamageCheckOfGCItem parm) throws ServiceException, Exception{
		RestResponse rtnResponse = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(parm);
		Object result = invokeService("MOST.theListOfDamageCheckOfGC.processDamageCheckListItem", updateParm);
		rtnResponse.setData(((DataItemList)result).getCollection());
		return rtnResponse;
	}
}
