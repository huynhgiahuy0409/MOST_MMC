package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.WHCheckExportItem;
import com.tsb.most.biz.parm.operation.SearchWHCheckExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/whcheckexport")
public class WHCheckExportController extends RestBaseController {
	
	
	@RequestMapping(value = "/selectcargo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoWarehouseCheckExportItems(SearchWHCheckExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckExport.selectCargoWarehouseCheckExportItems", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	@RequestMapping(value = "/checkamoutlocation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse checkAmoutLocation(SearchWHCheckExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckExport.checkAmoutLocation", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/warehousecheckforexport/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoWarehouseCheckExportItems(@PathVariable("id") String id, @RequestBody WHCheckExportItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updParm = new UpdateItemsBizParm();
		updParm.setUpdateItem(item);
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckExport.updateCargoWarehouseCheckExportItems", updParm);
	
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	//RORO
//	@RequestMapping(value = "/selectcargoforRORO", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectWHExportForROROItems(SearchWHCheckExportParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object result = invokeService("MOST.whCheckExport.selectWHExportForROROItems", parm);
//		res.setData(((DataItemList) result).getCollection());
//		return res;
//	}
//	
//	@RequestMapping(value = "/whcheckexportforroro/{id}", method = RequestMethod.PUT)
//	@ResponseBody
//	public RestResponse updateCheckExporForROROtItems(@PathVariable("id") String id, @RequestBody WHCheckExportItem item) throws ServiceException, Exception {
//		UpdateItemsBizParm updParm = new UpdateItemsBizParm();
//		updParm.setUpdateItem(item);
//		
//		RestResponse res = new RestResponse();
//		Object result = invokeService("MOST.whCheckExport.updateCheckExporForROROtItems", updParm);
//	
//		res.setData(((DataItemList)result).getCollection());
//		return res;
//	}
}
