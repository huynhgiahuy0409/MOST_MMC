package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.CargoExportItem;
import com.tsb.most.biz.dataitem.operation.CargoGeneralItem;
import com.tsb.most.biz.dataitem.operation.CargoImportItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoGatePassParm;
import com.tsb.most.biz.parm.operation.SearchCargoGeneralParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargomanualctl")
public class CargoManualCtlController  extends RestBaseController {
	
	@RequestMapping(value = "/cargoGeneralList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoGeneralList(SearchCargoGeneralParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoGeneralList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoManualCtlExportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoExportList(SearchCargoExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoExportList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoManualCtlImportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoImportList(SearchCargoImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoImportList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoManualCtlGatePassList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoGatePassList(SearchCargoGatePassParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoGatePassList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snBlList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSnBlComboList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectSnBlComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/goGr", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGrGoComboList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectGrGoComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/goGp", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGpGoComboList(SearchCargoMasterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectGpGoComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoGeneralComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoGeneralComboList(SearchCargoGeneralParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoGeneralComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shiftDtList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOperationSetShftDtList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectOperationSetShftDtList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shiftList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOperationSetShftList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectOperationSetShftList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/updatingyardtruckwhcheckimport/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updatingYardTruckWHCheckImport(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoImportItem>  parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.cargoManualCtl.updatingYardTruckWHCheckImport",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/updatingyardtruckindirectloading/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updatingYardTruckIndirectLoading(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoExportItem>  parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.cargoManualCtl.updatingYardTruckIndirectLoading",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/*************TABLET***********************/
	@RequestMapping(value = "/qr", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectQrInformation(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectQrInformation",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	/*************RORO***********************/
	
	@RequestMapping(value = "/cargoManualCtlROROExportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoExportROROList(SearchCargoExportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoExportROROList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoManualCtlROROImportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoImportROROList(SearchCargoImportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoManualCtl.selectCargoImportROROList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoManualEquipment/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateEquipmentInfoForDocument(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoGeneralItem> parm) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(parm.getItem());
		updateParm.setUpdateItems(insertItems);
		Object result = invokeService("MOST.cargoManualCtl.updateEquipmentInfoForDocument", updateParm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
}
