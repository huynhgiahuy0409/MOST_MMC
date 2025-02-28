package com.tsb.most.biz.rest.operation;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.dataitem.operation.VesselScheduleItem;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesselinfo")
public class VesselScheduleController extends RestBaseController{
//	@RequestMapping(value = "/list", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectVesselScheduleList(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object result = invokeService("MOST.vesselScheduleInternal.selectVesselScheduleList", parm);
//		
//		res.setData(((DataItemList)result).getCollection());
//		res.setLimit(((DataItemList)result).getTotalRowCount());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/ConfirmationSlipBreakBulkList", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectConfirmationSlipBreakBulkList(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectConfirmationSlipBreakBulkList", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/ConfirmationSlipLiquidBulkList", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectConfirmationSlipLiquidBulkList(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectConfirmationSlipLiquidBulkList", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/selectVslTpCombo", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectVslTpCombo(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectVslTpCombo", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	//Tablet function:
//	@RequestMapping(value = "/confirmationSlip", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectConfirmationSlip(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectConfirmationSlip", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/berthinfolist", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectBerthInfo(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectBerthInfo", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/vesseldetail", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectVesselScheduleDetail", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/berthValidation", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectBerthValidation(SearchVesselScheduleParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object obj = invokeService("MOST.vesselScheduleInternal.selectBerthValidation", parm);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
//	
//	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
//	@ResponseBody
//	public void updateVesselSchedule(@PathVariable("id") String id, @RequestBody VesselScheduleItem item) throws ServiceException, Exception{
//		UpdateItemsBizParm updateItem = new UpdateItemsBizParm();
//		
//		updateItem.setUpdateItem(item);
//		
//		Object obj = invokeService("MOST.vesselScheduleInternal.updateVesselDetailItem", updateItem);
//	}	
//	
//	@RequestMapping(value = "/confirmationSlip", method = RequestMethod.POST)
//	@ResponseBody
//	public void insertConfirmationSlip(@RequestBody VesselScheduleItem item) throws ServiceException, Exception{
//		InsertItemsBizParm insertItem = new InsertItemsBizParm();
//		
//		insertItem.setInsertItem(item);
//		
//		Object obj = invokeService("MOST.vesselScheduleInternal.insertConfirmationSlipItem", insertItem);
//	}
//	
//	@RequestMapping(value = "/confirmationSlip/{id}", method = RequestMethod.PUT)
//	@ResponseBody
//	public RestResponse updateConfirmationSlip(@PathVariable("id") String id, @RequestBody ConfirmationSlipItem item) throws ServiceException, Exception{
//		RestResponse res = new RestResponse();
//		UpdateItemsBizParm updateItem = new UpdateItemsBizParm();
//		
//		updateItem.setUpdateItem(item);
//		
//		Object obj = invokeService("MOST.vesselScheduleInternal.processConfirmationSlipItem", updateItem);
//		
//		res.setData(((DataItemList)obj).getCollection());
//		
//		return res;
//	}
	
	@RequestMapping(value = "/vesseldetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVesselSchedule(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselScheduleItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm upParm = new UpdateItemsBizParm();
		upParm.setUpdateItems(super.getItems(parm));
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselSchedule.updateVesselDetailItem", upParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
