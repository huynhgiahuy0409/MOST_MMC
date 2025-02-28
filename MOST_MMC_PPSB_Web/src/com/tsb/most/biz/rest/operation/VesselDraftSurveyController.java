package com.tsb.most.biz.rest.operation;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.biz.dataitem.operation.VesselDraftSurveyItem;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/vesseldraftsurvey")
public class VesselDraftSurveyController extends RestBaseController {

	@PostMapping("/list")
	public RestResponse insertItems(@RequestBody UpdateBizParm<VesselDraftSurveyItem> param)
			throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse response = new RestResponse();

		try {
			insertParm.setInsertItem(param.getItem());
			Object result = invokeService("MOST.vesselDraftSurvey.insertItems", insertParm);

			response.setData(((DataItemList) result).getCollection());
		} catch (Exception e) {
			response.setErrorNumber(500);
		}
		return response;
	}

	@GetMapping("/list")
	public RestResponse getVesselDraftSurveyList(SearchVesselDraftSurveyParm param) throws ServiceException, Exception {

		RestResponse response = new RestResponse();

		Object result = invokeService("MOST.vesselDraftSurvey.getVesselDraftSurveyList", param);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());

		return response;
	}

	@PutMapping("/list/{id}")
	public RestResponse updateItems(@PathVariable("id") String id,
			@RequestBody UpdateBizParm<VesselDraftSurveyItem> param) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse response = new RestResponse();
		
		try {
			updateParm.setUpdateItem(param.getItem());
			Object result = invokeService("MOST.vesselDraftSurvey.updateItems", updateParm);
			response.setData(((DataItemList) result).getCollection());
		} catch (Exception e) {
			response.setErrorNumber(500);
		}
		return response;
	}

	@DeleteMapping("/list/{id}")
	public RestResponse deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselDraftSurveyItem> param)
			throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(param));

		try {
			Object result = invokeService("MOST.vesselDraftSurvey.deleteItems", deleteParm);
			response.setData(((DataItemList) result).getCollection());
		} catch (Exception e) {
			response.setErrorNumber(500);
		}
		
		return response;
	}

	@GetMapping("/draftsurveyinfo")
	public RestResponse getVesselDraftSurveyInfo(SearchVesselDraftSurveyParm param) throws ServiceException, Exception {
		RestResponse response = new RestResponse();

		Object result = invokeService("MOST.vesselDraftSurvey.getVesselDraftSurveyInfo", param);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());

		return response;
	}

	@GetMapping("/detail")
	public RestResponse getVesselDraftSurveyDetailList(SearchVesselDraftSurveyParm param)
			throws ServiceException, Exception {

		RestResponse response = new RestResponse();

		Object result = invokeService("MOST.vesselDraftSurvey.getVesselDraftSurveyDetailList", param);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());

		return response;
	}

	@GetMapping("/isValidated")
	public RestResponse isValidated(SearchVesselDraftSurveyParm param)
			throws ServiceException, Exception {
		RestResponse response = new RestResponse();

		Object result = invokeService("MOST.vesselDraftSurvey.isValidated", param);

		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());

		return response;
	}
}
