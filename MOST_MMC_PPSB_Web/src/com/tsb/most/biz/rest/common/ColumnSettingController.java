package com.tsb.most.biz.rest.common;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

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

import com.tsb.most.basebiz.dataitem.columndisplay.ColumnDisplayItem;
import com.tsb.most.basebiz.parm.columndisplay.SearchColumnDisplayBizParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IUserSession;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/columnsetting")
public class ColumnSettingController extends RestBaseController{
	/** The logger. */
	private static Logger logger = LoggerFactory.getLogger(ColumnSettingController.class);
	
	@RequestMapping(value = "/searchItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectItems(SearchColumnDisplayBizParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.columnDisplay.getColumnSettings", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	
	}
	
	@RequestMapping(value = "/getColumnDefaultValue", method = RequestMethod.POST)
    @ResponseBody
	public RestResponse selectColumnDefaultValue(@RequestBody SearchColumnDisplayBizParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.columnDisplay.getColumnDefaultValue", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/searchItems", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertItems(@RequestBody ColumnDisplayItem item, HttpServletRequest request) throws ServiceException, Exception{
		UpdateItemsBizParm updateParam = new UpdateItemsBizParm();
		DataItemList updateItems = new DataItemList();		
		updateItems.add(item);
		updateParam.setUpdateItems(updateItems);
		
		IUserSession userInfo = (IUserSession)request.getAttribute("userInfo");
		updateParam.getBizParmMetaInfo().setUserInfo(userInfo);
		
		invokeService("MOST.columnDisplay.updateItems", updateParam);
	}
	
	@RequestMapping(value = "/searchItems/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody ColumnDisplayItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParam = new DeleteItemsBizParm();
		DataItemList deleteItems = new DataItemList();		
		deleteItems.add(item);
		deleteParam.setDeleteItems(deleteItems);
		invokeService("MOST.columnDisplay.deleteItems", deleteParam);
	}
}
