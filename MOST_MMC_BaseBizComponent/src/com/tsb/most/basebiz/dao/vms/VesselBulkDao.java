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
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.plus.base.dao.VmsBaseDao;
import com.tsb.most.framework.dao.BaseDao;
//import com.pcs.foundation.exception.DaoException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


public class VesselBulkDao extends BaseDao implements IVesselBulkDao {
	@Override
	public DataItemList selectVesselList(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselBulk.selectVesselList", parm);
	}
	
	@Override
	public DataItemList selectVesselGroup(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselBulk.selectVesselGroup", parm);
	}
	
	@Override
	public DataItemList selectVesselMaster(VesselParm parm) throws DaoException {
		return unifiedDao.getItems("VesselBulk.selectVesselMaster", parm);
	}
	
//    @Override
//    public List selectBulkPlEachSignalLampList(VesselParm parm) throws DaoException {
//        return unifiedDao.selectItems("VesselBulk.selectBulkPlEachSignalLampList", parm);
//    }

    @Override
    public DataItemList selectMarketIndex(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectMarketIndex", parm);
    }

    @Override
    public DataItemList selectMarketIndexValueDataList(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectMarketIndexValueDataList", parm);
    }

    @Override
    public DataItemList selectPositionDataList(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectPositionDataList", parm);
    }

    @Override
    public DataItemList selectPositionChartDataList(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectPositionChartDataList", parm);
    }

    @Override
    public DataItemList selectBondStatistics(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectBondStatistics", parm);
    }
    
    @Override
    public DataItemList selectClaimStatistics(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectClaimStatistics", parm);
    }
    
    @Override
    public DataItemList selectContractStatistics(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectContractStatistics", parm);
    }
    
    @Override
    public DataItemList selectVesselSchedule(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectVesselSchedule", parm);
    }
    
    @Override
    public DataItemList selectCargoByConsignee(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectCargoByConsignee", parm);
    }
    
    @Override
    public DataItemList selectCargoByBrand(VesselParm parm) throws DaoException {
    	return unifiedDao.getItems("VesselBulk.selectCargoByBrand", parm);
    }
    
    @Override
    public DataItemList selectPortList(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselBulk.selectPortList", parm);
    }
    
    @Override
    public DataItemList selectVesselOperationList(VesselParm parm) throws DaoException {
        return unifiedDao.getItems("VesselBulk.selectVesselOperationList", parm);
    }
    
    @Override
    public void updateVesselLocationModify(TxTraceInfo traceInfo, VesselItem item) throws DaoException{
        unifiedDao.updateItem(traceInfo,"VesselBulk.updateVesselLocationModify",item);
    }

}
