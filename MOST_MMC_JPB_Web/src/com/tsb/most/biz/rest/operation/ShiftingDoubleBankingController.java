package com.tsb.most.biz.rest.operation;

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

import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.biz.dataitem.operation.ShiftingDoubleBankingItem;
import com.tsb.most.biz.parm.operation.SearchShiftingDoubleBankingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/shifting")
public class ShiftingDoubleBankingController extends RestBaseController {
	
		private static Logger logger = LoggerFactory.getLogger(ShiftingDoubleBankingController.class);

		@RequestMapping(value = "/list", method = RequestMethod.GET)
		@ResponseBody
		public RestResponse selectSftDblBankingList(SearchShiftingDoubleBankingParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.shiftingDoubleBanking.selectSftDblBankingList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
		}
	
		@RequestMapping(value = "/vesselShifting", method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public RestResponse insertVesselShiftingItems(@RequestBody ShiftingDoubleBankingItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.shiftingDoubleBanking.insertVesselShiftingItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;	
		
		}
	
		@RequestMapping(value = "/vesselShifting/{id}", method = RequestMethod.PUT)
		@ResponseBody
		public RestResponse updateVesselShiftingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
			throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.shiftingDoubleBanking.updateVesselShiftingItems",updateParm);
		
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;    
		}
	
		@RequestMapping(value = "/vesselShifting/{id}", method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteVesselShiftingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
			throws ServiceException, Exception {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.shiftingDoubleBanking.deleteVesselShiftingItems",deleteParm);
		}
	
		@RequestMapping(value = "/cargoShifting", method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public RestResponse insertCargoShiftingItems(@RequestBody ShiftingDoubleBankingItem item) throws ServiceException, Exception {
			DataItemList insertItems = new DataItemList();
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			RestResponse res = new RestResponse();
			
			insertItems.add(item);
			insertParm.setInsertItems(insertItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.insertCargoShiftingItems",insertParm);
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			return res;	
			
		}
		
		@RequestMapping(value = "/cargoShifting/{id}", method = RequestMethod.PUT)
		@ResponseBody
		public RestResponse updateCargoShiftingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList updateItems = new DataItemList();
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			RestResponse res = new RestResponse();
			
			updateItems.add(item);
			updateParm.setUpdateItems(updateItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.updateCargoShiftingItems",updateParm);
			
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			
			return res;    
		}
		
		@RequestMapping(value = "/cargoShifting/{id}", method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteCargoShiftingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList deleteItems = new DataItemList();
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			
			deleteItems.add(item);
			deleteParm.setDeleteItems(deleteItems);
			
			invokeService("MOST.shiftingDoubleBanking.deleteCargoShiftingItems",deleteParm);
		}
		
		@RequestMapping(value = "/doubleBanking", method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public RestResponse insertDoubleBankingItems(@RequestBody ShiftingDoubleBankingItem item) throws ServiceException, Exception {
			DataItemList insertItems = new DataItemList();
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			RestResponse res = new RestResponse();
			
			insertItems.add(item);
			insertParm.setInsertItems(insertItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.insertDoubleBankingItems",insertParm);
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			return res;	
			
		}
		
		@RequestMapping(value = "/doubleBanking/{id}", method = RequestMethod.PUT)
		@ResponseBody
		public RestResponse updateDoubleBankingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList updateItems = new DataItemList();
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			RestResponse res = new RestResponse();
			
			updateItems.add(item);
			updateParm.setUpdateItems(updateItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.updateDoubleBankingItems",updateParm);
			
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			
			return res;    
		}
		
		@RequestMapping(value = "/doubleBanking/{id}", method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteDoubleBankingItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList deleteItems = new DataItemList();
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			
			deleteItems.add(item);
			deleteParm.setDeleteItems(deleteItems);
			
			invokeService("MOST.shiftingDoubleBanking.deleteDoubleBankingItems",deleteParm);
		}
		
		
		@RequestMapping(value = "/shipToShip", method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public RestResponse insertShipToShipItems(@RequestBody ShiftingDoubleBankingItem item) throws ServiceException, Exception {
			DataItemList insertItems = new DataItemList();
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			RestResponse res = new RestResponse();
			
			insertItems.add(item);
			insertParm.setInsertItems(insertItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.insertShipToShipItems",insertParm);
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			return res;	
			
		}
		
		@RequestMapping(value = "/shipToShip/{id}", method = RequestMethod.PUT)
		@ResponseBody
		public RestResponse updateShipToShipItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList updateItems = new DataItemList();
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			RestResponse res = new RestResponse();
			
			updateItems.add(item);
			updateParm.setUpdateItems(updateItems);
			
			Object result = invokeService("MOST.shiftingDoubleBanking.updateShipToShipItems",updateParm);
			
			
			res.setData(((DataItemList)result).getCollection());
			res.setLimit(((DataItemList)result).getTotalRowCount());
			
			return res;    
		}
		
		@RequestMapping(value = "/shipToShip/{id}", method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteShipToShipItems(@PathVariable("id") String id, @RequestBody ShiftingDoubleBankingItem item)
				throws ServiceException, Exception {
			DataItemList deleteItems = new DataItemList();
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			
			deleteItems.add(item);
			deleteParm.setDeleteItems(deleteItems);
			
			invokeService("MOST.shiftingDoubleBanking.deleteShipToShipItems",deleteParm);
		}
		
		
	
}
