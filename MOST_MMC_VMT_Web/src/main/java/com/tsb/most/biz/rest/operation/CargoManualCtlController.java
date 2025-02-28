
package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.OperationSettingItem;
import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargomanualctl")
public class CargoManualCtlController extends RestBaseController{
	/************* TABLET ***********************/
	@RequestMapping(value = "/qr", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectQrInformation(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectQrInformation", parm);
		
		res.setData(((DataItemList) result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/cargoManualCtlExportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoExportList(SearchCargoExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoExportList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/cargoManualCtlImportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoImportList(SearchCargoImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoImportList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	/*
	 * Robert added. for YT Demo function:
	 * RBT. Test
	 * */
	@RequestMapping(value = "/activeyt", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse processActivateOperation(@RequestBody UpdateBizParm<OperationSettingItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.cargoManualCtl.processActivateOperation", updateParm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
