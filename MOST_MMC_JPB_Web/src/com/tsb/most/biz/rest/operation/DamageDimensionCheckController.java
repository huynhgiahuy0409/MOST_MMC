package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dataitem.operation.DamageCheckItem;
import com.tsb.most.biz.dataitem.operation.DimensionCheckGCItem;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/damageDimensionCheck")
public class DamageDimensionCheckController extends RestBaseController{
	@RequestMapping(value = "/listDamage", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDamageCheck(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.damageDimensionCheck.searchDamageCheck",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/listDimension", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDimensionCheck(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.damageDimensionCheck.searchDimensionCheck",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/listDamage", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDamageCheck(@RequestBody UpdateBizParm<DamageCheckItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.damageDimensionCheck.insertDamageCheck",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/listDimension", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDimensionCheck(@RequestBody UpdateBizParm<DimensionCheckGCItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.damageDimensionCheck.insertDimension",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/listDimension/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDimensionCheck(@PathVariable("id") String id, @RequestBody UpdateBizParm<DimensionCheckGCItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.damageDimensionCheck.updateDimensionCheck", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/listDamage/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDamageCheck(@PathVariable("id") String id, @RequestBody UpdateBizParm<DamageCheckItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.damageDimensionCheck.updateDamageCheck", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/jobNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDamageDimensionCheckJobNo(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.damageDimensionCheck.searchDamageDimensionCheckJobNo",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/blSnNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDamageDimensionCheckBlSnNo(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.damageDimensionCheck.searchDamageDimensionCheckBlSnNo",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/doGrNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse searchDamageDimensionCheckDoGrNo(SearchDamageDimensionCheck parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.damageDimensionCheck.searchDamageDimensionCheckDoGrNo",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
}
