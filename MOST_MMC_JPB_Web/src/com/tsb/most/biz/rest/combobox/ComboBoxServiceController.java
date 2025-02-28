package com.tsb.most.biz.rest.combobox;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/combobox")
public class ComboBoxServiceController extends RestBaseController{
	private static Logger logger = LoggerFactory.getLogger(ComboBoxServiceController.class);

	// Code Master Popup
	@RequestMapping(value = "/codeMaster", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectComboBox(SearchComboBoxServiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.comboboxService.selectComboBox",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
		
	}
	
	@RequestMapping(value = "/selectWHComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHComboList(SearchWhConfigurationParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.comboboxService.selectWHComboList",parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/commonComboListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommonComboItemsHHT(SearchComboBoxServiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.comboboxService.selectCommonComboItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/brandcomboListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBrandComboBoxItemsHHT(SearchComboBoxServiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.comboboxService.selectBrandComboBoxItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
