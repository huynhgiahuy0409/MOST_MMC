package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.VSRCheckListItem;
import com.tsb.most.biz.parm.operation.SearchVSRCheckListParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vsrchecklist")
public class VSRCheckListController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRCheckList(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRCheckList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRCheckListDetail(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		if (parm.getSearchType() != null && parm.getSearchType().equals("HHT")) {
			Object result = invokeService("MOST.vsrCheckList.getVSRDetailHHT",parm);
			res.setData(((DataItemList)result).getCollection());
			return res;
		}
		Object result = invokeService("MOST.vsrCheckList.selectVSRCheckListDetail",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/emppopuphhtlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRCheckListhht(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRCheckListhht",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/partnercodelistcombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRPartnerCodeListCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRPartnerCodeListCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/flnocombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRDeployFLNoCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRDeployFLNoCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/deployeqnocombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRDeployEQNoCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRDeployEQNoCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/empidcombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSREmpIdCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSREmpIdCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/equipmenttrlistcombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSREquipmentTRListCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSREquipmentTRListCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/requipmentcapalistcombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSREquipmentCapaListCombo(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSREquipmentCapaListCombo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
//	@RequestMapping(value = "/shiftlist", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse getShift(VesselOperationReportParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object result = invokeService("MOST.vsrCheckList.getShift",parm);
//		res.setData(((DataItemList)result).getCollection());
//		return res;
//	}

	@RequestMapping(value = "/workingarealist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWorkingArea(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectWorkingArea",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/empidlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVSRPopupList(SearchVSRCheckListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.selectVSRPopupList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVSRListItem(@PathVariable("id") String id, @RequestBody VSRCheckListItem item) throws ServiceException, Exception {
		RestResponse rtnResponse = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(item);
		Object result = invokeService("MOST.vsrCheckList.processVSRListItem", updateParm);
		rtnResponse.setData(((DataItemList)result).getCollection());
		return rtnResponse;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertVSRListItem(@RequestBody VSRCheckListItem item) throws ServiceException, Exception {

		RestResponse res = new RestResponse();
		InsertItemsBizParm pParm = new InsertItemsBizParm();
		DataItemList list = new DataItemList();
		
		item.setCrud(DAOProcessType.INSERT);
		list.add(item);
		
		pParm.setInsertItems(list);
		
		Object result = (Object)invokeService("MOST.vsrCheckList.processVSRListItem",pParm);
		res.setData(((DataItemList)result).getCollection());
		 
		return res;
	
	}

	@RequestMapping(value = "/verify", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse updateVSRVerifyItem(@RequestBody VSRCheckListItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(item);
		
		RestResponse rtnResponse = new RestResponse();
		Object result = invokeService("MOST.vsrCheckList.updateVSRVerifyItem", updateParm);
		rtnResponse.setData(((DataItemList)result).getCollection());
		return rtnResponse;
	}

}
