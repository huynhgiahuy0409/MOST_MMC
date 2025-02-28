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

import com.tsb.most.basebiz.dataitem.vms.PriorityItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.pcs.foundation.exception.BizException;
//import com.pcs.foundation.exception.DaoException;
//import com.pcs.foundation.tx.TxTraceInfo;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IVesselCarDao {
	public DataItemList selectCarVesselList(VesselParm parm) throws DaoException;
	public DataItemList selectContinentCarVesselScheduleList(VesselParm parm) throws DaoException;
	public DataItemList selectTransitTimeVesselList(VesselParm parm) throws DaoException;
	public DataItemList selectShipperList(VesselParm parm) throws DaoException;
	public DataItemList selectCustomerAnnualAmount(VesselParm parm) throws DaoException;
	public DataItemList selectCustomerMonthlyAmountPerPort(VesselParm parm) throws DaoException;
	public DataItemList selectPriorityList(VesselParm parm) throws DaoException;
	public void insertPriority(TxTraceInfo traceInfo, PriorityItem item)throws BizException;
	public void updatePriority(TxTraceInfo traceInfo, PriorityItem item)throws BizException;
	public void deletePriority(TxTraceInfo traceInfo, PriorityItem item)throws BizException;
	public DataItemList selectChartBaseSummary(VesselParm parm) throws DaoException;
	public DataItemList selectConsumptionSummary(VesselParm parm) throws DaoException;
	public DataItemList selectPortList(VesselParm parm) throws DaoException;
	
}
