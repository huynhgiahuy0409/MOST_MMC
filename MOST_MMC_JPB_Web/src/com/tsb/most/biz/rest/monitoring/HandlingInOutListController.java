package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dataitem.DataItemList;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/handlinginoutlist")
public class HandlingInOutListController  extends RestBaseController {
	@RequestMapping(value = "/setCombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhSnBlComboList(SearchCargoJobParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.handlingInOutList.selectWhSnBlComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/whCombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHComboList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.handlingInOutList.selectWHComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		if(parm.getSearchType().equals("HI")) {
			SearchCargoHandlingInParm prm = new SearchCargoHandlingInParm();
			
			prm.setVslCallId(parm.getVslCallId());
			prm.setScn(parm.getScn());
			prm.setCgNo(parm.getCgNo());
			prm.setCatgCd(parm.getCatgCd());
			prm.setFwrAgnt(parm.getFwrAgnt());
			prm.setStartDt(parm.getFromDate());
			prm.setEndDt(parm.getToDate());
			prm.setLocId(parm.getLocId());
			prm.setLotNo(parm.getLotNo());
			prm.setShipgNoteNo(parm.getShipgNoteNo());
			prm.setShftId(parm.getShftId());
			prm.setCmdtCd(parm.getCmdtCd());
			prm.setCnsneCd(parm.getCnsneCd());
			prm.setLocTpCd(parm.getLocTpCd());
			prm.setCargoTp(parm.getCargoTp());
			prm.setUnitNo(parm.getUnitNo());
			prm.setPageNo(parm.getPageNo());
			prm.setSizePerPage(parm.getSizePerPage());
			Object result = invokeService("MOST.handlingInOutList.selectCargoHIList",prm);
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
	
			return res;
			
		}else if(parm.getSearchType().equals("HO")) {
			SearchCargoHandlingOutParm prm = new SearchCargoHandlingOutParm();
			
			prm.setVslCallId(parm.getVslCallId());
			prm.setScn(parm.getScn());
			prm.setBlNo(parm.getBlNo());
			prm.setCatgCd(parm.getCatgCd());
			prm.setFwrAgnt(parm.getFwrAgnt());
			prm.setStartDt(parm.getFromDate());
			prm.setEndDt(parm.getToDate());
			prm.setLocId(parm.getLocId());
			prm.setLotNo(parm.getLotNo());
			prm.setShipgNoteNo(parm.getShipgNoteNo());
			prm.setShftId(parm.getShftId());
			prm.setCmdtCd(parm.getCmdtCd());
			prm.setCnsneCd(parm.getCnsneCd());
			prm.setLocTpCd(parm.getLocTpCd());
			prm.setUnitNo(parm.getUnitNo());
			prm.setCargoTp(parm.getCargoTp());
			prm.setPageNo(parm.getPageNo());
			prm.setSizePerPage(parm.getSizePerPage());
			Object result = invokeService("MOST.handlingInOutList.selectCargoHOList",prm);
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
	
			return res;
		}
		
		return res;
	}
}
