package com.tsb.most.basebiz.dao.vms;
import com.tsb.most.basebiz.dataitem.vms.PortSimulationItem;
import com.tsb.most.basebiz.dataitem.vms.UserZoneItem;
import com.tsb.most.basebiz.parm.vms.NetPasParm;
import com.tsb.most.basebiz.parm.vms.PortParm;
import com.tsb.most.basebiz.parm.vms.UserZoneParm;
//import com.pcs.foundation.exception.DaoException;
//import com.pcs.foundation.tx.TxTraceInfo;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


public class PortDao extends BaseDao implements IPortDao {
    @Override
    public DataItemList selectPortList(PortParm parm) throws DaoException {
        return unifiedDao.getItems("Port.selectPortList", parm);
    }
    
    @Override
    public DataItemList selectVesselScheduleOfPort(PortParm parm) throws DaoException {
        return unifiedDao.getItems("Port.selectVesselScheduleOfPort", parm);
    }
    
    @Override
    public DataItemList selectVesselScheduleOfPortSum(PortParm parm) throws DaoException {
        return unifiedDao.getItems("Port.selectVesselScheduleOfPortSum", parm);
    }
    
    @Override
    public DataItemList selectUserZoneList(UserZoneParm parm) throws DaoException {
        return unifiedDao.getItems("Port.selectUserZoneList", parm);
    }
    
    @Override
    public UserZoneItem selectCdZoneCnt(UserZoneParm parm) throws DaoException {
        return (UserZoneItem)unifiedDao.readOne("Port.selectCdZoneCnt", parm);
    }    
    
	@Override
    public void insertUserZone(TxTraceInfo traceInfo, UserZoneItem item) throws DaoException{
		//unifiedDao.insertItem(traceInfo,"Port.insertZone",item);
		unifiedDao.insertItem(traceInfo,"Port.insertUserZone",item);
	}
	
	@Override
    public void updateUserZone(TxTraceInfo traceInfo, UserZoneItem item) throws DaoException{
		unifiedDao.updateItem(traceInfo,"Port.updateZone",item);
		//unifiedDao.updateItem(traceInfo,"Port.updateUserZone",item);
	}
	
	@Override
    public void deleteUserZone(TxTraceInfo traceInfo, UserZoneItem item) throws DaoException{
		//unifiedDao.deleteItem(traceInfo,"Port.deleteZone",item);
		unifiedDao.deleteItem(traceInfo,"Port.deleteUserZone",item);
	}    
	
	@Override
    public void insertGisZone(TxTraceInfo traceInfo, UserZoneItem item) throws DaoException{
		unifiedDao.insertItem(traceInfo,"Port.insertZone",item);
//		unifiedDao.insertItem(traceInfo,"Port.insertGisZone",item);
	}
	
	@Override
    public void deleteGisZone(TxTraceInfo traceInfo, UserZoneItem item) throws DaoException{
		unifiedDao.deleteItem(traceInfo,"Port.deleteZone",item);
//		unifiedDao.deleteItem(traceInfo,"Port.deleteGisZone",item);
	}    
	
    @Override
    public PortSimulationItem selectTimeZone(NetPasParm parm) throws DaoException {
        return (PortSimulationItem) unifiedDao.readOne("Port.selectTimeZone", parm);
    }
    
    @Override
    public DataItemList selectNetpasPort(NetPasParm parm) throws DaoException {
        return unifiedDao.getItems("Port.selectNetpasPort", parm);
    }
    
	@Override
    public void insertNetpasInfo(TxTraceInfo traceInfo, PortSimulationItem item) throws DaoException{
		unifiedDao.insertItem(traceInfo,"Port.insertNetpasInfo",item);
	}
	
}