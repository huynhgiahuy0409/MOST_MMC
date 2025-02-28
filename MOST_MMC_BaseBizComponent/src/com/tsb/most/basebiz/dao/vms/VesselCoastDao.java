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
import com.tsb.most.basebiz.dataitem.vms.VesselImageItem;
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.plus.base.dao.VmsBaseDao;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
//import com.pcs.foundation.exception.DaoException;
//import com.pcs.foundation.tx.TxTraceInfo;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


public class VesselCoastDao extends BaseDao implements IVesselCoastDao {
	@Override
	public DataItemList selectVesselList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselCoast.selectVesselList", parm);
	}

	@Override
	public DataItemList selectVesselRouteCodeList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselCoast.selectVesselRouteCodeList", parm);
	}
	
	@Override
    public DataItemList selectVesselKindList(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselCoast.selectVesselKindList", parm);
    }
	
	@Override
    public DataItemList selectVesselMovements(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselCoast.selectVesselMovements", parm);
    }	
	
	@Override
    public DataItemList selectVesselImage(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselCoast.selectVesselImage", parm);
    }	
	
	@Override
    public void insertVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException{
		unifiedDao.insertItem(traceInfo,"VesselCoast.insertVesselImage",item);
	}
	
	@Override
    public void updateVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException{
		unifiedDao.updateItem(traceInfo,"VesselCoast.updateVesselImage",item);
	}
	
	@Override
    public void deleteVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException{
		unifiedDao.deleteItem(traceInfo,"VesselCoast.deleteVesselImage",item);
	}
	
	@Override
    public void updateVesselGps(TxTraceInfo traceInfo, VesselItem item) throws DaoException{
		unifiedDao.updateItem(traceInfo,"VesselCoast.updateVesselGps",item);
	}		
}
