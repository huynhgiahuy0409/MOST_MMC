package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoGatePassItem;
import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassListParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/gatepasslist")
public class GatePassListController extends RestBaseController {
	@RequestMapping(value = "/gatePassList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoGatePassList(SearchGatePassListParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.gatePassList.selectCargoGatePassList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}

	@RequestMapping(value = "/cargoMasterCombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoMasterComboList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.gatePassList.selectCargoMasterComboList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/gatePassDetailList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGatePassImportList(SearchGatePassImportParm param) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.gatePassList.selectGatePassImportList",param);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/gatePassList/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateCargoGatePassRemark(@PathVariable("id") String id, @RequestBody CargoGatePassItem item) throws ServiceException, Exception{
//		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
//		DataItemList list = new DataItemList();
//		
//		item.setCrud(DAOProcessType.UPDATE);
//		list.add(item);
//		
//		pParm.setUpdateItems(list);
//		
//		invokeService("MOST.gatePassList.updateCargoGatePassRemark",pParm);
	
	}
}
