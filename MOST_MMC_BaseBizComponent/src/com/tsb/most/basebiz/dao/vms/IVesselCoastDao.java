/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.dao.common.IUserListDao.java
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
import com.tsb.most.framework.dataitem.DataItemList;
//import com.pcs.foundation.exception.DaoException;
//import com.pcs.foundation.tx.TxTraceInfo;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IVesselCoastDao {
	public DataItemList selectVesselList(VesselParm parm) throws DaoException;
	public DataItemList selectVesselRouteCodeList(VesselParm parm) throws DaoException;
	public DataItemList selectVesselKindList(VesselParm parm) throws DaoException;
	public DataItemList selectVesselMovements(VesselParm parm) throws DaoException;
	public DataItemList selectVesselImage(VesselParm parm) throws DaoException;
	public void insertVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException;
	public void updateVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException;
	public void deleteVesselImage(TxTraceInfo traceInfo, VesselImageItem item) throws DaoException;
	public void updateVesselGps(TxTraceInfo traceInfo, VesselItem item) throws DaoException;

}
