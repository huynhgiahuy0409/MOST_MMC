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

import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.pcs.foundation.exception.DaoException;
//import com.pcs.foundation.tx.TxTraceInfo;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IVesselBulkDao {
	public DataItemList selectVesselList(VesselParm parm) throws DaoException;
	public DataItemList selectVesselGroup(VesselParm parm) throws DaoException;
	public DataItemList selectVesselMaster(VesselParm parm) throws DaoException;
//	public List<VesselItem> selectBulkPlEachSignalLampList(VesselParm parm) throws DaoException;
	public DataItemList selectMarketIndex(VesselParm parm) throws DaoException;
	public DataItemList selectMarketIndexValueDataList(VesselParm parm) throws DaoException;
	public DataItemList selectPositionDataList(VesselParm parm) throws DaoException;
	public DataItemList selectPositionChartDataList(VesselParm parm) throws DaoException;
	public DataItemList selectBondStatistics(VesselParm parm) throws DaoException;
	public DataItemList selectClaimStatistics(VesselParm parm) throws DaoException;
	public DataItemList selectContractStatistics(VesselParm parm) throws DaoException;
	public DataItemList selectVesselSchedule(VesselParm parm) throws DaoException;
	public DataItemList selectCargoByConsignee(VesselParm parm) throws DaoException;
	public DataItemList selectCargoByBrand(VesselParm parm) throws DaoException;
	public DataItemList selectPortList(VesselParm parm) throws DaoException;
	public DataItemList selectVesselOperationList(VesselParm parm) throws DaoException;
	public void updateVesselLocationModify(TxTraceInfo traceInfo, VesselItem item) throws DaoException;
}
