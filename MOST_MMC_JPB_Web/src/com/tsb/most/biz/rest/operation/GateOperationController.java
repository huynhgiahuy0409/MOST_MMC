package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.GateOperationItem;
import com.tsb.most.biz.parm.operation.SearchGateOperationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/gateoperation")
public class GateOperationController extends RestBaseController{
	/**
	 * Gate operation for Cargo
	 */

	@RequestMapping(value = "/gateInCargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGCGateInItems(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectGCGateInItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/selectCargoLorryGateIn", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGateInData(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectCargoLorryGateIn",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/selectCargoLorryGateOut", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGateOutData(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectCargoLorryGateOut",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/selectCargoGateInCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectArrvDelvIsCheck(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectCargoGateInCheck",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/selectCargoGateOutCheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGateOutCheck(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectCargoGateOutCheck",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
		
	}
	
	@RequestMapping(value = "/cargoArrivalDelivery", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoArrvDelv(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectCargoArrivalDelivery",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;    
	
	} 
	
	@RequestMapping(value = "/cargoArrivalDelivery", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.insertCargoGateInItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoArrivalDeliveryChkInTime/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateChkInTimeItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.updateCargoGateInChkInTimeItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoArrivalDelivery/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.updateCargoGateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/**
	 * Gate operation for RORO
	 * 
	 */
	@RequestMapping(value = "/gateinforrorolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectROROGateInItems(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectROROGateInItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/gateinforrorolist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateROROGateInItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.updateROROGateInItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/gateoutforrorolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectROROGateOutItems(SearchGateOperationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.gateOperation.selectROROGateOutItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;   
	}
	
	@RequestMapping(value = "/roroArrivalDelivery", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertROROGateoutItems(@RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.insertROROGateoutItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/roroArrivalDelivery/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateROROGateoutItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.gateOperation.updateROROGateoutItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/**
	 * Gate operation for Liquid
	 * 
	 */
	

		
}
