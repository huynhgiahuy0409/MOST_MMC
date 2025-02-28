package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.DimensionCheckItem;
import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/dimensioncheck")
public class DimensionCheckController extends RestBaseController{
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDimensionCheck(SearchDimensionCheckParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.dimensionCheck.selectDimensionCheck",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDimensionCheck(@RequestBody UpdateBizParm<DimensionCheckItem> parm) throws ServiceException{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.dimensionCheck.insertDimensionCheck",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDimensionCheck(@PathVariable("id") String id, @RequestBody UpdateBizParm<DimensionCheckItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.dimensionCheck.updateDimensionCheck", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/blSnNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlSnNo(SearchDimensionCheckParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.dimensionCheck.selectBlSnNo",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/doGrNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDoGrNo(SearchDimensionCheckParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.dimensionCheck.selectDoGrNo",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
}
