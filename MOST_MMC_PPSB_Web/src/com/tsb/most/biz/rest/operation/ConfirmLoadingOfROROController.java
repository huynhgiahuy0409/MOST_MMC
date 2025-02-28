package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmLoadingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/confirmloadingofroro")
public class ConfirmLoadingOfROROController  extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/indirectunititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectInDirectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/directunititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectDirectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/snitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unititems/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateConfirmYardAndLoadingCheckForRoRo(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmLoadingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmLoadingOfRORO.updateConfirmYardAndLoadingCheckForRoRo", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	/**
	 * ==========================================================
	 * HHT START
	 */
	@RequestMapping(value = "/yardExportListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectYardExportListHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectCargoItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/apronExportListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItemsHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectCargoItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unititemsHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectUnitItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/unititemsHHT/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmLoadingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmLoadingOfRORO.updateItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unititemsHHT/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmLoadingOfROROItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.deleteItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/directunititemshht", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectDirectUnitItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/indirectunititemshht", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInDirectUnitItemshht(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmLoadingOfRORO.selectInDirectUnitItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/brandcomboListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBrandComboBoxItemsHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.comboboxService.selectBrandComboBoxItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
//	@RequestMapping(value = "/snitemsHHT", method = RequestMethod.GET)
//	@ResponseBody
//	public RestResponse selectShipgNoteNoComboBoxItemsHHT(SearchConfirmLoadingOfROROParm parm) throws ServiceException, Exception {
//		RestResponse res = new RestResponse();
//		Object result = invokeService("MOST.confirmLoadingOfRORO.selectShipgNoteNoComboBoxItemsHHT",parm);
//		res.setData(((DataItemList)result).getCollection());
//		return res;
//	}
}
