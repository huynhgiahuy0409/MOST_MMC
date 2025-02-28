/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.service.common.IAuthentication.java
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
package com.tsb.most.biz.service.vms;

import com.tsb.most.basebiz.parm.vms.VesselParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselBulk{
	public DataItemList selectVesselList(VesselParm pParm) throws BizException;
	public DataItemList selectVesselGroup(VesselParm pParm) throws BizException;
	public DataItemList selectVesselMaster(VesselParm pParm) throws BizException;
//	public DataItemList selectBulkPlEachSignalLampList(VesselParm pParm) throws BizException;
	public DataItemList selectMarketIndex(VesselParm parm) throws BizException;
	public DataItemList selectMarketIndexValueDataList(VesselParm parm) throws BizException;
	public DataItemList selectPositionDataList(VesselParm parm) throws BizException;
	public DataItemList selectPositionChartDataList(VesselParm parm) throws BizException;
	public DataItemList selectBondStatistics(VesselParm parm) throws BizException;
	public DataItemList selectClaimStatistics(VesselParm parm) throws BizException;
	public DataItemList selectContractStatistics(VesselParm parm) throws BizException;
	public DataItemList selectVesselSchedule(VesselParm parm) throws BizException;
	public DataItemList selectCargoByConsignee(VesselParm parm) throws BizException;
	public DataItemList selectCargoByBrand(VesselParm parm) throws BizException;
	public DataItemList selectPortList(VesselParm parm) throws BizException;
	public DataItemList selectVesselOperationList(VesselParm parm) throws BizException;
	public DataItemList updateVesselLocationModify(UpdateItemsBizParm parm)throws BizException;
}