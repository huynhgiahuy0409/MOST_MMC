package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfROROItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/thelistofdamagecheckofroro")
public class TheListOfDamageCheckOfROROController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingList(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectRoRoDamageCheckItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/blitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectBlComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/categoryitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectCategoryComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/snitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/cargoitems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectCargoPopupItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unititems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectUnitPopupItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckinventory", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoDmgDtlInvItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectRoRoDmgDtlInvItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoDmgDtlDmgItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectRoRoDmgDtlDmgItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/thedamageparts", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheDamagePartItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectTheDamagePartItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/thedamagelevels", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheDamageLevelItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectTheDamageLevelItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/checkrorodamagecheckinventory", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectROROInventoryItems(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectROROInventoryItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckdetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckdetail", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertRoRoDmgItem(@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.insertRoRoDmgItem",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckinventory/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateRoRoInvItem(@PathVariable("id") String id,@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.updateRoRoInvItem",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckinventory", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertRoRoInvItem(@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.insertRoRoInvItem",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rorodamagecheckdetail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteRoRoDmgItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.deleteRoRoDmgItem",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectFileList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	/**	===========================================================================
	 * 	HHT START
	 */
	@RequestMapping(value = "/listHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingListHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectRoRoDamageCheckItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/blitemsHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectBlComboBoxItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/snitemsHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectShipgNoteNoComboBoxItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unititemsHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectUnitPopupItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/branditemsHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectBrandComboBoxItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/checkrorodamagecheckinventoryHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectROROInventoryItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectROROInventoryItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/rorodamagecheckinventoryHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.selectRoRoDmgDtlInvItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/rorodamagecheckdetailHHT", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertRoRoDmgItemHHT(@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.insertRoRoDmgItemHHT",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/rorodamagecheckdetailHHT/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.updateItemsHHT",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/rorodamagecheckinventoryHHT/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateRoRoInvItemHHT(@PathVariable("id") String id,@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.updateRoRoInvItemHHT",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	@RequestMapping(value = "/rorodamagecheckinventoryHHT", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertRoRoInvItemHHT(@RequestBody UpdateBizParm<TheListOfDamageCheckOfROROItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.theListOfDamageCheckOfRORO.insertRoRoInvItemHHT",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
