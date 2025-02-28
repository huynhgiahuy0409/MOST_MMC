package com.tsb.most.basebiz.dao.vms;

import com.tsb.most.basebiz.dataitem.vms.PortSimulationItem;
import com.tsb.most.basebiz.dataitem.vms.UserZoneItem;
import com.tsb.most.basebiz.parm.vms.NetPasParm;
import com.tsb.most.basebiz.parm.vms.PortParm;
import com.tsb.most.basebiz.parm.vms.UserZoneParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


public interface IPortDao {
    public DataItemList selectPortList(PortParm parm) throws DaoException;
    public DataItemList selectVesselScheduleOfPort(PortParm parm) throws DaoException;
    public DataItemList selectVesselScheduleOfPortSum(PortParm parm) throws DaoException;
	public DataItemList selectUserZoneList(UserZoneParm pParm) throws DaoException;
	public UserZoneItem selectCdZoneCnt(UserZoneParm pParm) throws DaoException;
	public void insertUserZone(TxTraceInfo traceInfo, UserZoneItem item)throws DaoException;
	public void updateUserZone(TxTraceInfo traceInfo, UserZoneItem item)throws DaoException;
	public void deleteUserZone(TxTraceInfo traceInfo, UserZoneItem item)throws DaoException;
	public void insertGisZone(TxTraceInfo traceInfo, UserZoneItem item)throws DaoException;
	public void deleteGisZone(TxTraceInfo traceInfo, UserZoneItem item)throws DaoException;
    public PortSimulationItem selectTimeZone(NetPasParm parm) throws DaoException;
    public DataItemList selectNetpasPort(NetPasParm parm) throws DaoException;
    public void insertNetpasInfo(TxTraceInfo traceInfo, PortSimulationItem item)throws DaoException;
	
}
