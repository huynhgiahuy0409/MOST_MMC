package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/loading")
public class LoadingController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfLoading(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectListOfLoading",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLoadingComboList(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectLoadingComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/sncombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShippingNoteComboItems(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectShippingNoteComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/bookingcombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBookingComboItems(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectBookingComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/loadingreportlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselLoadListReport(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectVesselLoadListReport",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/*Add for HHT*/
	@RequestMapping(value = "/listHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfLoadingForHHT(SearchLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectListOfLoadingForHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
