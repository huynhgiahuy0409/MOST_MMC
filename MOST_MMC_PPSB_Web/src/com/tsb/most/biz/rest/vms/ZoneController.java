package com.tsb.most.biz.rest.vms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.vms.UserZoneItem;
import com.tsb.most.basebiz.parm.vms.UserZoneParm;
import com.tsb.most.framework.dataitem.DataItemList;
//import com.pcs.foundation.bizparm.CudParm;
//import com.pcs.foundation.exception.ServiceException;
//import com.pcs.rest.base.controller.RestBaseController;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/area")
public class ZoneController extends RestBaseController {
    
    // Zone List
    @RequestMapping(value = "/data", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectZoneList(UserZoneParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectUserZoneList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
    }
    
    @RequestMapping(value = "/data", method = RequestMethod.POST)
	@ResponseBody
	public void insertUserZone(@RequestBody UserZoneItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.INSERT);
//		InsertItemsBizParm param = new InsertItemsBizParm();
//		param.setDataItem(item);
//		
//		execute("port","insertUserZone",param);
		
	}
    
    @RequestMapping(value = "/data/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateUserZone(@PathVariable("id") String id, @RequestBody UserZoneItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.UPDATE);
//		UpdateItemsBizParm param = new UpdateItemsBizParm();
//		param.setDataItem(item);
//		execute("port","updateUserZone",param);
	}
    
    @RequestMapping(value = "/data/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteUserZone(@PathVariable("id") String id, @RequestBody UserZoneItem item) throws ServiceException, Exception{
		
//		item.setCrud(DAOProcessType.DELETE);
//		
//		DeleteItemsBizParm param = new DeleteItemsBizParm();
//		param.setDataItem(item);
//
//		execute("port","deleteUserZone",param);
	}	

    
}   
 