package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.configuration.ServiceOrderSettingItem;
import com.tsb.most.basebiz.parm.configuration.SearchServiceOrderSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/serviceordersetting")
public class ServiceOrderSettingController extends RestBaseController {

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectServiceOrderConfigurationList(SearchServiceOrderSettingParm parm) throws ServiceException, Exception {
    	RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.serviceOrderSetting.selectServiceOrderSettingList",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
    }
    
    @RequestMapping(value = "/extendcode", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectExtendCategoryCd(SearchServiceOrderSettingParm parm) throws ServiceException, Exception {
    	RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.serviceOrderSetting.selectExtendCategoryCd",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectServiceOrderConfigurationDetail(SearchServiceOrderSettingParm parm) throws ServiceException, Exception {
    	RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.serviceOrderSetting.selectServiceOrderSettingDetailItem",parm);
		
		res.setData(((DataItemList)obj).getCollection());
		
		return res;
    }

    @RequestMapping(value = "/detail", method = RequestMethod.POST)
    @ResponseBody
    public RestResponse insertServiceOrderConfigurationDetail(@RequestBody ServiceOrderSettingItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.serviceOrderSetting.insertServiceOrderConfigurationDetail",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public RestResponse updateServiceOrderConfigurationDetail(@RequestBody ServiceOrderSettingItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.serviceOrderSetting.updateServiceOrderConfigurationDetail",updateParm);
		
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteServiceOrderConfigurationDetail(@RequestBody ServiceOrderSettingItem item) throws ServiceException, Exception {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.serviceOrderSetting.deleteServiceOrderConfigurationDetail",deleteParm);
    }
}
