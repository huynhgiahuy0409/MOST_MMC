package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IAssignedTruckDao;
import com.tsb.most.biz.dao.operation.IGateOperationDao;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckPivotParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
//import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
//import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AssignedTruck extends MOSTBaseService implements IAssignedTruck {
	private IAssignedTruckDao assignedTruckDao;
	private IGateOperationDao gateOperationDao;
	
	public void setAssignedTruckDao(IAssignedTruckDao assignedTruckDao) {
		this.assignedTruckDao = assignedTruckDao;
	}
	
	public void setGateOperationDao(IGateOperationDao gateOperationDao) {
		this.gateOperationDao = gateOperationDao;
	}

	public DataItemList selectLorryListItems(SearchAssignedTruckParm parm) throws BizException{
		return assignedTruckDao.selectLorryListItems(parm);
    }
	
	public DataItemList selectUnitNoList(SearchAssignedTruckParm parm) throws BizException{
		return assignedTruckDao.selectUnitNoList(parm);
    }
	
	public DataItemList selectUnitNoListForROROImport(SearchAssignedTruckParm parm) throws BizException{
		return assignedTruckDao.selectUnitNoListForROROImport(parm);
    }
	
	public DataItemList selectUnitNoListForROROExport(SearchAssignedTruckParm parm) throws BizException{
		return assignedTruckDao.selectUnitNoListForROROExport(parm);
    }
	
	public DataItemList selectLorryListPivotItems(SearchAssignedTruckPivotParm parm) throws BizException {
		return assignedTruckDao.selectLorryListPivotItems(parm);
	}
	
	public void updateCirPrintItem(UpdateItemsBizParm parm) throws BizException{
		gateOperationDao.updateCirPrintItem(parm);
	}
	
}
