package com.tsb.most.biz.rest.administrator;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.basebiz.dataitem.parameters.ParameterSettingItem;
import com.tsb.most.basebiz.parm.parameters.SearchCommonParameterSettingBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/paramettersetting")
public class ParameterSettingController extends RestBaseController{
	
	@RequestMapping(value = "/searchItems", method = RequestMethod.GET)
	public RestResponse searchItems(SearchCommonParameterSettingBizParm parm) throws ServiceException, Exception{
		Object result = invokeService("MOST.parametersetting.searchItems", parm);
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getCollection().size());
		return res;
	}
	
	
	@RequestMapping(value = "/searchItems/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateParamsterSetting(@PathVariable("id") String id, @RequestBody ParameterSettingItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm parm = new UpdateItemsBizParm();
		updateItems.add(item);
		parm.addUpdateItem(updateItems);
		Object result = invokeService("MOST.parametersetting.updateItems", parm);
		RestResponse res = new RestResponse();
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	
	
}

