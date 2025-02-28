package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.ITruckAssignmentOfRORODao;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentOfROROParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TruckAssignmentOfRORO extends MOSTBaseService implements ITruckAssignmentOfRORO {
	private ITruckAssignmentOfRORODao truckAssignmentOfRORODao;

	public void setTruckAssignmentOfRORODao(ITruckAssignmentOfRORODao truckAssignmentOfRORODao) {
		this.truckAssignmentOfRORODao = truckAssignmentOfRORODao;
	}
    
    public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentOfROROParm parm) throws BizException {
  		return truckAssignmentOfRORODao.selectTruckAssignmentItems(parm);
  	}
    
    public DataItemList selectAssigningDriversForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException {
  		return truckAssignmentOfRORODao.selectAssigningDriversForVehicleItems(parm);
  	}
	
	public DataItemList selectAssigningTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException {
  		return truckAssignmentOfRORODao.selectAssigningTrucksForVehicleItems(parm);
  	}
	
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException {
  		return truckAssignmentOfRORODao.selectAssignedDriversAndTrucksForVehicleItems(parm);
  	}
	
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws BizException {
		return truckAssignmentOfRORODao.insertDriversAndTrucksItems(parm);
	}
	
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm parm) throws BizException {
		return truckAssignmentOfRORODao.deleteAssignedDriversAndTrucksForVehicleItems(parm);
	}
   
}
