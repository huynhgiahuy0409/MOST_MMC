package com.tsb.most.basebiz.service.vms;

import java.rmi.RemoteException;
import java.text.ParseException;

import com.tsb.most.basebiz.parm.vms.NetPasParm;
import com.tsb.most.basebiz.parm.vms.PortParm;
import com.tsb.most.basebiz.parm.vms.UserZoneParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IPort{
    public DataItemList selectPortList(PortParm pParm) throws BizException;
    public DataItemList selectVesselScheduleOfPort(PortParm pParm) throws BizException;
    public DataItemList selectVesselScheduleOfPortSum(PortParm pParm) throws BizException;
    public DataItemList selectNetPasSimulation(NetPasParm pParm) throws BizException, RemoteException, ParseException;
    public DataItemList selectNetpasPort(NetPasParm pParm) throws BizException;
    
    public DataItemList selectUserZoneList(UserZoneParm pParm) throws BizException;	
    public DataItemList insertUserZone(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateUserZone(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteUserZone(DeleteItemsBizParm parm)throws BizException;	
//    public void insertGisZone(CudParm parm)throws BizException;
//	public void deleteGisZone(CudParm parm)throws BizException;
}