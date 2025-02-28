package com.tsb.most.biz.rest.planning;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dataitem.planning.WhRentalItem;
import com.tsb.most.biz.parm.planning.SearchWhRentalParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rentalinfo")
public class RentalInfoController  extends RestBaseController {
	@RequestMapping(value = "/gridList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHGridList(SearchWhRentalParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.whRental.getWhRentalGridList", parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/detailList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHDetailList(SearchWhRentalParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.whRental.getWhRentalDetailList", parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}

	@RequestMapping(value = "/gridList/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteWHGridList(@PathVariable("id") String id, @RequestBody WhRentalItem item) throws ServiceException, Exception{		
		InsertItemsBizParm deleteParm = new InsertItemsBizParm();
		DataItemList deleteItems = new DataItemList();
		item.setWorkingStatus(DAOProcessType.DELETE);
		deleteItems.add(item);
		deleteParm.setInsertItems(deleteItems);

		invokeService("MOST.whRental.processWhRentalItems", deleteParm);
	}
//	
//	@RequestMapping(value = "/detailList", method = RequestMethod.DELETE)
//	@ResponseBody
//	public void deleteWHDetailList(@PathVariable("id") String id, @RequestBody WhRentalItem item) throws ServiceException, Exception{
//		DataItemList itemList = new DataItemList();
//		CudParm pParm = new CudParm();
//		
//		item.setCrud(DAOProcessType.DELETE);
//		itemList.add(item);
//		pParm.setDataItemList(itemList);
//		
//		execute("planning", "deleteWhRentalDetailList", item);
//	}
//	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHList(SearchWhRentalParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.whRental.getWhRentalList", parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void processWhRentalItems(@RequestBody WhRentalItem item) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		DataItemList insertItems = new DataItemList();
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);

		invokeService("MOST.whRental.processWhRentalItems", insertParm);
	}
//	
//	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
//	@ResponseBody
//	public void processWhRentalItems(@PathVariable("id") String id, @RequestBody WhRentalItem item) throws ServiceException, Exception{
//		
//		item.setCrud(DAOProcessType.UPDATE);
//		
//		CudParm param = new CudParm();
//		param.setDataItem(item);
//		
//		execute("planning","processWhRentalItems", param);
//
//	}
//
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteWhRentalItems(@PathVariable("id") String id, @RequestBody WhRentalItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		DataItemList deleteItems = new DataItemList();
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);

		invokeService("MOST.whRental.processWhRentalItems", deleteParm);
	}
	
	@RequestMapping(value = "/whConfigurationList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhConfigurationList(SearchWhConfigurationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.whRental.getWhConfigurationList", parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/chkDupliRentNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChkDupliRentNo(SearchWhRentalParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object obj = invokeService("MOST.whRental.getChkDupliRentNo", parm);
		res.setData(((DataItemList)obj).getCollection());
		return res;
	}
	
}
