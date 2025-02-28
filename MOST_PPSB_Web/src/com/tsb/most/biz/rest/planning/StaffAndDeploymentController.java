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

import com.tsb.most.biz.dataitem.planning.StaffAndDeploymentItem;
import com.tsb.most.biz.dataitem.planning.VOperationDeployItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/staffdeployment")
public class StaffAndDeploymentController extends RestBaseController{
	private static Logger logger = LoggerFactory.getLogger(StaffAndDeploymentController.class);
	
	@RequestMapping(value = "/VOperationDeployList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		
		result = invokeService("MOST.staffAndDeployment.selectStaffDeployMentList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/staffandequipmentdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffAndEquipmentDetail(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectStaffAndEquipmentDetail",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/summegalist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSumMegaList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectSumMegaList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/equipCapaList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployEquipCapaList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumOperator", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaSumOperatorList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectMegaSumOperatorList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumPortCrane", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSumMegaPortCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectSumMegaPortCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumShipCrane", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSumMegaShipCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectSumMegaShipCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaRemarkList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployRmkList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/portCraneDeployList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployPortCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployPortCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumForkliftList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMegaSumForkliftList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectMegaSumForkliftList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/forkliftDeployedList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployForkliftList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/stevedoreCompanyList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployStvdList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumShoreCraneList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSumMegaShoreCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectSumMegaShoreCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/megaSumPortAndShipCraneList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSumMegaPortAndShipCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectSumMegaPortAndShipCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/roleOtherList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoleOther(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectRoleOther",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/standardStaffList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStandardStaffList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectStandardStaffList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/equipmentList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectVOperationDeployShipCraneEquipCapa",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/standardStaffGroupList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectOtherStaffGroupList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/deployedStaffList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse checkValidation(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.checkValidation",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/extraList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectExtraList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectExtraList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/extraStaffGroupList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectExStaffGroupList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/otherStaffList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectNewStaff(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectNewStaff",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/validationStaffAdd", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffAdded(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectStaffAdded",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/validationCode", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationCode(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		Object obj = this.invokeService("MOST.staffAndDeployment.selectValidationCode", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/staffandequipmentdetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<StaffAndDeploymentItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.staffAndDeployment.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/staffandequipmentdetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, UpdateBizParm<StaffAndDeploymentItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.staffAndDeployment.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/staffandequipmentnonjpvcdetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertStaffAndEquipmentNonJpvcDetail(@RequestBody UpdateBizParm<StaffAndDeploymentItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.staffAndDeployment.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/staffandequipmentnonjpvcdetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateStaffAndEquipmentNonJpvcDetail(@PathVariable("id") String id, UpdateBizParm<StaffAndDeploymentItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.staffAndDeployment.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/shipCraneList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipCraneList(SearchStaffAndDeploymentParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.staffAndDeployment.selectShipCraneList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
}
