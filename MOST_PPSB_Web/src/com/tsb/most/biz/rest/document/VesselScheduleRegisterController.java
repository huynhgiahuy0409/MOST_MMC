package com.tsb.most.biz.rest.document;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dataitem.document.VesselScheduleRegisterItem;
import com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesselscheduleregister")
public class VesselScheduleRegisterController extends RestBaseController{
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselScheduleList(SearchVesselScheduleRegisterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselScheduleRegister.selectVesselScheduleList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselScheduleDetail(SearchVesselScheduleRegisterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselScheduleRegister.selectVesselScheduleDetail", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/listofvslschl", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfVslSchedule(SearchVesselScheduleRegisterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselScheduleRegister.selectListOfVslSchedule", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/dataList", method = RequestMethod.GET)
	@ResponseBody	
	public RestResponse selectCombobox(SearchCodeMasterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.comboboxService.selectCombobox", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertVslScheduleDetail(@RequestBody UpdateBizParm<VesselScheduleRegisterItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.vesselScheduleRegister.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVslScheduleDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselScheduleRegisterItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.vesselScheduleRegister.updateItems", updateParm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/detail/status/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVslScheduleStatus(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselScheduleRegisterItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.vesselScheduleRegister.updateVslSchlStatus", updateParm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/duplicatevesselcallid", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse isDuplicateVslCallId(SearchVesselScheduleRegisterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselScheduleRegister.isDuplicateVslCallId", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
