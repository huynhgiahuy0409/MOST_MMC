package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
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
@RequestMapping("/v1/stevedoretrimming")
public class StevedoreTrimmingController extends RestBaseController{
	@RequestMapping(value = "/stevedoreTrimmingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStevedoreTrimmingList(SearchVesselOprSettingParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = null;
		if ("info".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("EQ") ;
			result = invokeService("MOST.vesselOprSetting.selectVORDryBreakBulk",parm);
		}  
		else if ("infoSheet".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("WC") ;
			result = invokeService("MOST.vesselOprSetting.selectVORDryBreakBulk",parm);
		}
		
		if(result != null) {
			response.setData(((DataItemList)result).getCollection());
			response.setLimit(((DataItemList)result).getTotalRowCount());
		}
		return response;
		
	}
		
	@RequestMapping(value = "/stevedoreTrimmingList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateStevedoreTrimmingList(@PathVariable("id") String id,  @RequestBody VesselOprSettingItem item) throws ServiceException, Exception{
		RestResponse response = new RestResponse();
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		if(item.getWithGears() == "" || item.getWithGears() == null) {
			item.setWithGears("N");
		}
		pParm.setDataItem(item);
		invokeService("MOST.vesselOprSetting.processVORDryBreakBulkForStevAndTrimCUD",pParm);
		
	}
	
	@RequestMapping(value = "/vesseldelaypenaltylist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesseldelaypntyList(SearchVesselOprSettingParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = null;
		result = invokeService("MOST.vesselOprSetting.selectDelayPenaltyReportList",parm);
		if(result != null) {
			response.setData(((DataItemList)result).getCollection());
			response.setLimit(((DataItemList)result).getTotalRowCount());
		}
		return response;
		
	}
	@RequestMapping(value = "/vesseldelaypenaltylist", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDelayPenaltyReportItem(@RequestBody UpdateBizParm<VesselOprSettingItem> parm) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		RestResponse response = new RestResponse();
		Object result = null;
		result = invokeService("MOST.vesselOprSetting.insertDelayPenaltyReportList", insertParm);
		if(result != null) {
			response.setData(((DataItemList)result).getCollection());
			response.setLimit(((DataItemList)result).getTotalRowCount());
		}
		return response;
		
	}

	@RequestMapping(value = "/vesseldelaypenaltylist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDelayPenaltyReportItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselOprSettingItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		RestResponse response = new RestResponse();
		Object result = null;
		result = invokeService("MOST.vesselOprSetting.updateDelayPenaltyReportList", updateParm);
		if(result != null) {
			response.setData(((DataItemList)result).getCollection());
			response.setLimit(((DataItemList)result).getTotalRowCount());
		}
		return response;
		
	}
	@RequestMapping(value = "/vesseldelaypenaltylist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteDelayPenaltyReportItem(@PathVariable("id") String id, @RequestBody VesselOprSettingItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList itemList = new DataItemList();
		
		itemList.add(item);
		deleteItems.setDeleteItems(itemList);
		invokeService("MOST.vesselOprSetting.deleteDelayPenaltyReportList", deleteItems);
	}
}
