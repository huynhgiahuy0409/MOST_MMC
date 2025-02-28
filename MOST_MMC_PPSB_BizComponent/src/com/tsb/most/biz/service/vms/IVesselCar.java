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
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselCar{
	public DataItemList selectCarVesselList(VesselParm pParm) throws BizException;
	public DataItemList selectContinentCarVesselScheduleList(VesselParm pParm) throws BizException;
	public DataItemList selectTransitTimeVesselList(VesselParm pParm) throws BizException;
	public DataItemList selectShipperList(VesselParm pParm) throws BizException;
	public DataItemList selectCustomerAnnualAmount(VesselParm pParm) throws BizException;
	public DataItemList selectCustomerMonthlyAmountPerPort(VesselParm pParm) throws BizException;
	public DataItemList selectPriorityList(VesselParm pParm) throws BizException;
    public DataItemList insertPriority(InsertItemsBizParm parm)throws BizException;
	public DataItemList updatePriority(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deletePriority(DeleteItemsBizParm parm)throws BizException;
	public DataItemList selectChartBaseSummary(VesselParm pParm) throws BizException;
	public DataItemList selectConsumptionSummary(VesselParm pParm) throws BizException;
	public DataItemList selectPortList(VesselParm pParm) throws BizException;
    
}