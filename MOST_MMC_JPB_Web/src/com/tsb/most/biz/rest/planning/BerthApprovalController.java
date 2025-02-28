package com.tsb.most.biz.rest.planning;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.biz.dataitem.planning.BerthApprovalItem;
import com.tsb.most.biz.parm.planning.SearchBerthApprovalParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/berthapproval")
public class BerthApprovalController extends RestBaseController {

	@GetMapping(value = "/list")
	public RestResponse selectBerthingApprovalList(SearchBerthApprovalParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthApproval.selectBerthApprovalList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	@GetMapping(value = "/vesselInfo")
	public RestResponse selectVesselInformation(SearchBerthPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthPlan.selectVesselInformation", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/partnerInfo")
	public RestResponse selectPartnerInfo(SearchBerthPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthPlan.selectPartnerInformationList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	@RequestMapping(value = "/businessHistory")
	public RestResponse selectBusinessHistory(SearchBerthPlanParm parm)  throws ServiceException, Exception {		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthPlan.selectBusinessHistoryList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@PutMapping(value = "/list/{id}")
	public RestResponse applyApproval(@PathVariable("id") String id, @RequestBody UpdateBizParm<BerthApprovalItem> parm)
			throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();

		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.berthApproval.updateItems", updateParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	/*
	@GetMapping(value = "/emailtemplate")
	public RestResponse selectEmailTemplate(SearchEmailTemplateParm parm)  throws ServiceException, Exception {
		RestResponse res = (RestResponse)execute("configuration","getEmailTemplateItems", parm);
		return res;
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthPlan.selectBusinessHistoryList", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	*/
}
