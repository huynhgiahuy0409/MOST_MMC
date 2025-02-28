package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.HandlingInParm;
import com.tsb.most.biz.parm.monitoring.HandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/handlinginout")
public class HandingInOutController extends RestBaseController{
	
	@RequestMapping(value = "/handlinglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = new Object();
		if(parm.getSearchType().equals("HI")) {
			HandlingInParm prm = new HandlingInParm();
			
			prm.setVslCallId(parm.getVslCallId());
			prm.setCgNo(parm.getCgNo());
			prm.setCatgCd(parm.getCatgCd());
			prm.setFwrAgnt(parm.getFwrAgnt());
			prm.setStartDt(parm.getFromDate());
			prm.setEndDt(parm.getToDate());
			prm.setLocId(parm.getLocId());
			prm.setShipgNoteNo(parm.getShipgNoteNo());
			prm.setShftId(parm.getShftId());
			
			result = invokeService("MOST.handlingInOut.selectHandlingInList",prm);
		}else if(parm.getSearchType().equals("HO")) {
			HandlingOutParm prm = new HandlingOutParm();
			
			prm.setVslCallId(parm.getVslCallId());
			prm.setBlNo(parm.getBlNo());
			//prm.setCgNo(parm.getCgNo());
			prm.setCatgCd(parm.getCatgCd());
			prm.setFwrAgnt(parm.getFwrAgnt());
			prm.setStartDt(parm.getFromDate());
			prm.setEndDt(parm.getToDate());
			prm.setLocId(parm.getLocId());
			prm.setShipgNoteNo(parm.getShipgNoteNo());
			prm.setShftId(parm.getShftId());
			
			result = invokeService("MOST.handlingInOut.selectHandingOutList",prm);
		}
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
}
