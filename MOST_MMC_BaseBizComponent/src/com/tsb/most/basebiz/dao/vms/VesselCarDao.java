/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.dao.common.UserListDao.java
* CREATE ON : 2017. 05. 31.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2017. 05. 31.  LUIS			             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dao.vms;
import com.tsb.most.basebiz.dataitem.vms.PriorityItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.plus.base.dao.VmsBaseDao;
import com.tsb.most.framework.dao.BaseDao;
//import com.pcs.foundation.exception.DaoException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


public class VesselCarDao extends BaseDao implements IVesselCarDao {
	@Override
	public DataItemList selectCarVesselList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselCar.selectCarVesselList", parm);
	}
	
	@Override
    public DataItemList selectContinentCarVesselScheduleList(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselCar.selectContinentCarVesselScheduleList", parm);
    }
	
	@Override
	public DataItemList selectTransitTimeVesselList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselCar.selectTransitTimeVesselList", parm);
	}	
	
	@Override
	public DataItemList selectShipperList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselCar.selectShipperList", parm);
	}
	
	@Override
	public DataItemList selectCustomerAnnualAmount(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectCustomerAnnualAmount", parm);
	}
	
	@Override
	public DataItemList selectCustomerMonthlyAmountPerPort(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectCustomerMonthlyAmountPerPort", parm);
	}
	
	@Override
	public DataItemList selectPriorityList(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectPriorityList", parm);
	}
	
	@Override
    public void insertPriority(TxTraceInfo traceInfo, PriorityItem item) throws DaoException{
		unifiedDao.insertItem(traceInfo,"VesselCar.insertPriority",item);
	}
	
	@Override
    public void updatePriority(TxTraceInfo traceInfo, PriorityItem item) throws DaoException{
		unifiedDao.updateItem(traceInfo,"VesselCar.updatePriority",item);
	}
	
	@Override
    public void deletePriority(TxTraceInfo traceInfo, PriorityItem item) throws DaoException{
		unifiedDao.deleteItem(traceInfo,"VesselCar.deletePriority",item);
	} 
	
	@Override
	public DataItemList selectChartBaseSummary(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectChartBaseSummary", parm);
	}	
	
	@Override
	public DataItemList selectConsumptionSummary(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectConsumptionSummary", parm);
	}	
	
	@Override
	public DataItemList selectPortList(VesselParm parm) throws DaoException {
	    return unifiedDao.getItems("VesselCar.selectPortList", parm);
	}	
}
