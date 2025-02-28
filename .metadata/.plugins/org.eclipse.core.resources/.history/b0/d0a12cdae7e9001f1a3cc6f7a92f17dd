package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.VesselOprSettingItem;
import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesseloprsetting")
public class VesselOprSettingController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselOprSetting.selectVesselOprSettingList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/isOverlappedWithFinitePeriod", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.vesselOprSetting.selectOverlappedWithFinitePeriod",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
		
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertEquipmentSettingList(@RequestBody VesselOprSettingItem item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.addInsertItem(item);
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.vesselOprSetting.insertVesselOprSetting", insertParm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVesselOprSetting(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselOprSettingItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vesselOprSetting.updateVesselOprSetting", updateParm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());

		return response;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVesselOprSetting(@PathVariable("id") String id, @RequestBody VesselOprSettingItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList itemList = new DataItemList();
		
		itemList.add(item);
		deleteItems.setDeleteItems(itemList);
		invokeService("MOST.vesselOprSetting.deleteVesselOprSetting", deleteItems);
	}
}
