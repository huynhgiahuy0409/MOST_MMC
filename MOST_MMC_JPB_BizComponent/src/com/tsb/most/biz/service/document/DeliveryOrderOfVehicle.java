package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.IDeliveryOrderOfVehicleDao;
import com.tsb.most.biz.dataitem.document.DeliveryOrderOfVehicleItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderOfVehicleParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DeliveryOrderOfVehicle extends MOSTBaseService  implements IDeliveryOrderOfVehicle {
	private IDeliveryOrderOfVehicleDao deliveryOrderOfVehicleDao;
	
	public void setDeliveryOrderOfVehicleDao(IDeliveryOrderOfVehicleDao deliveryOrderOfVehicleDao) {
		this.deliveryOrderOfVehicleDao = deliveryOrderOfVehicleDao;
	}
	
	public DataItemList selectAssigningDriversForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException {
  		return deliveryOrderOfVehicleDao.selectAssigningDriversForVehicleItems(parm);
  	}
	
	public DataItemList selectAssigningTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException {
  		return deliveryOrderOfVehicleDao.selectAssigningTrucksForVehicleItems(parm);
  	}
	
	public DataItemList selectDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException {
  		return deliveryOrderOfVehicleDao.selectDeliveryOrderItems(parm);
  	}
	
	public DataItemList selectSubDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException {
  		return deliveryOrderOfVehicleDao.selectSubDeliveryOrderItems(parm);
  	}
  	
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException {
  		return deliveryOrderOfVehicleDao.selectAssignedDriversAndTrucksForVehicleItems(parm);
  	}
	
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws BizException {
		return deliveryOrderOfVehicleDao.insertDriversAndTrucksItems(parm);
	}
	
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws BizException {
		String newDONo = "";
		DataItemList returnList = parm.getInsertItems();
		DeliveryOrderOfVehicleItem item = (DeliveryOrderOfVehicleItem)returnList.get(0);
		
		if(item.getDoNo() == null|| item.getDoNo().equals("")) {
			SearchDeliveryOrderOfVehicleParm doParm = new SearchDeliveryOrderOfVehicleParm();
			
			doParm.setPtnrCd(item.getPtnrCd());
			
			DataItemList list = deliveryOrderOfVehicleDao.selectDeliveryOrderNo(doParm);
			
			newDONo = ((DeliveryOrderOfVehicleItem)(list.get(0))).getDoNo();
		}
		
    	if(item.getDoNo().isEmpty() || item.getDoNo() == null) {
    		item.setDoNo(newDONo);
    	}
		
		return deliveryOrderOfVehicleDao.insertSubDeliveryOrderItems(parm);
	}
	
	public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws BizException {
    	return deliveryOrderOfVehicleDao.updateSubDeliveryOrderItems(parm);
	}
	
	
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm parm) throws BizException {
		return deliveryOrderOfVehicleDao.deleteAssignedDriversAndTrucksForVehicleItems(parm);
	}
	
	public DataItemList deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws BizException {
		return deliveryOrderOfVehicleDao.deleteSubDeliveryOrderItems(parm);
	}
	
}
