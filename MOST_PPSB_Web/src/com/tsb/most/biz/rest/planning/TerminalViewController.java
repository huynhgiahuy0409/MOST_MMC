package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/terminalView")
public class TerminalViewController  extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectWhConfiguration",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/areaInfo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectAreaInfoList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/berthstructure", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthInfo(SearchBerthPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectBerthInfo",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/masterBlList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMasterBlList(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectMasterBlList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/subBlList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSubBlList(SearchBLParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectSubBlList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/BookingNoList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBookingNoList(SearchShippingNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectBookingNoList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/shippingNoteList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShippingNoteList(SearchShippingNoteParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.terminalView.selectShippingNoteList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/commodityList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getCargoTypeList(SearchCodeMasterParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.codeMaster.getCMDTCodeList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
