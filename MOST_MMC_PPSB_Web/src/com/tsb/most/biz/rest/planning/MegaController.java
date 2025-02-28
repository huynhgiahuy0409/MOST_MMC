package com.tsb.most.biz.rest.planning;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/mega")
public class MegaController  extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(MegaController.class);
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/penalty", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaPenaltyList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaPenaltyList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/equipmentList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaEquipmentList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaEquipmentList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/warehouseSnDoList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaWarehouseSnDoList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaWarehouseSnDoList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/VOperationDeployList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		
		if (parm.getSubSearchType().equals("deploylist")) {
			result = invokeService("MOST.staffDeployment.selectStaffDeployMentList",parm);
		}
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}

	@RequestMapping(value = "/selectSearchVesselCallId", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaVesselCallId(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaVesselCallId", parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/selectCargoDetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaCgDtlList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.mega.selectMegaCgDtlList", parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/validationCode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationCode(SearchMegaParm parm) throws ServiceException, Exception {
		Object obj = this.invokeService("MOST.mega.selectValidationCode", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/confirmationSlipDryBreakBulk", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectConfirmationSlipDryBreakBulk(SearchMegaParm parm) throws ServiceException, Exception {
		Object obj = this.invokeService("MOST.mega.selectConfirmationSlipDryBreakBulk", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/stervedoreList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaStevedoreList(SearchMegaParm parm) throws ServiceException, Exception {
		Object obj = this.invokeService("MOST.mega.selectMegaStevedoreList", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/megadetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaDetailList(SearchMegaParm parm) throws ServiceException, Exception {
		Object obj = this.invokeService("MOST.mega.selectMegaDetailList", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/staffandequipmentdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getStaffAndEquipmentDetail(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffDeployment.getStaffAndEquipmentDetail",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<MegaItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.mega.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/staffandequipmentdetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertStaffAndEquipmentDetail(String id, @RequestBody UpdateBizParm<MegaItem> item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		
		Object result = invokeService("MOST.planning.processVOperationDeployItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
	}

	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		Object result = new Object();
		RestResponse res = new RestResponse();
		MegaItem item = new MegaItem();
		
		updateParm.setUpdateItems(super.getItems(parm));
		
		item = (MegaItem)updateParm.getUpdateItems().getCollection().get(0);
		
		if(item.getInsertType() != null && item.getInsertType().equals("updateRmk")) {
			result = invokeService("MOST.mega.updateRmk4MegaItems",updateParm);
		}else {
			result = invokeService("MOST.mega.updateItems",updateParm);
		}
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/internalList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMegaInternal(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(super.getItems(item));
		updateParm.setUpdateItems(updateItems);
		
		invokeService("MOST.mega.updateMegaInternaForkliftlItem", updateParm);
		
		return res;
	}

	@RequestMapping(value = "/staffandequipmentdetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateStaffAndEquipmentDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(super.getItems(item));
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.planning.processVOperationDeployItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
	
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteMegaItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteParm.setDeleteItems(super.getItems(parm));
		
		Object result = invokeService("MOST.mega.deleteMegaItems",deleteParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMegaDetail(@PathVariable("id") String id, @RequestBody MegaItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		items.add(item);
		
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.mega.deleteMegaItems", deleteItems);
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void deleteMegaList2(@RequestBody MegaItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		items.add(item);
		
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.mega.deleteMegaItems", deleteItems);
	}
	
	@RequestMapping(value = "/internalList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaInternalList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.mega.selectInternalMegaList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaComboList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.mega.selectMegaComboList",parm);
	
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
}
