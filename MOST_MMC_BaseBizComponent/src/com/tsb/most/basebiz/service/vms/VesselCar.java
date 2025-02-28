/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.service.common.Authentication.java
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
package com.tsb.most.basebiz.service.vms;

import com.tsb.most.basebiz.dao.vms.IVesselCarDao;
import com.tsb.most.basebiz.dataitem.vms.PriorityItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.plus.base.service.VmsBaseService;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
//import com.pcs.foundation.bizparm.CudParm;
//import com.pcs.foundation.dataitem.DataItemList;
//import com.pcs.foundation.exception.BizException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselCar extends MOSTBaseService implements IVesselCar {
	private IVesselCarDao vesselCarDao;
	
	public IVesselCarDao getVesselCarDao() {
		return vesselCarDao;
	}

	public void setVesselCarDao(IVesselCarDao vesselCarDao) {
		this.vesselCarDao = vesselCarDao;
	}

	public DataItemList selectCarVesselList(VesselParm parm)throws BizException{
		return vesselCarDao.selectCarVesselList(parm);
	}
	
	public DataItemList selectContinentCarVesselScheduleList(VesselParm parm)throws BizException{
		return vesselCarDao.selectContinentCarVesselScheduleList(parm);
    }
	
	public DataItemList selectTransitTimeVesselList(VesselParm parm)throws BizException{
		return vesselCarDao.selectTransitTimeVesselList(parm);
	}	
	
	public DataItemList selectShipperList(VesselParm parm)throws BizException{
		return vesselCarDao.selectShipperList(parm);
	}
	
	public DataItemList selectCustomerAnnualAmount(VesselParm parm)throws BizException{
		return vesselCarDao.selectCustomerAnnualAmount(parm);
	}
	
	public DataItemList selectCustomerMonthlyAmountPerPort(VesselParm parm)throws BizException{
		return vesselCarDao.selectCustomerMonthlyAmountPerPort(parm);
	}
	
    @Override
    public DataItemList selectPriorityList(VesselParm parm) throws BizException {
    	return vesselCarDao.selectPriorityList(parm);
    }    
	
    @Override
    public DataItemList selectChartBaseSummary(VesselParm parm) throws BizException {
    	return vesselCarDao.selectChartBaseSummary(parm);
    } 	
	
    @Override
    public DataItemList selectConsumptionSummary(VesselParm parm) throws BizException {
    	return vesselCarDao.selectConsumptionSummary(parm);
    }     
    
    @Override
    public DataItemList selectPortList(VesselParm parm) throws BizException {
    	return vesselCarDao.selectPortList(parm);
    }  
	@Override
	public DataItemList insertPriority(InsertItemsBizParm parm)throws BizException{
		PriorityItem item = (PriorityItem)parm.getDataItem();
		vesselCarDao.insertPriority(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
	public DataItemList updatePriority(UpdateItemsBizParm parm)throws BizException{
		PriorityItem item = (PriorityItem)parm.getDataItem();
		vesselCarDao.updatePriority(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
	public DataItemList deletePriority(DeleteItemsBizParm parm)throws BizException{
		PriorityItem item = (PriorityItem)parm.getDataItem();
		vesselCarDao.deletePriority(parm.getTxTraceinfo(),item);
		
		return null;
	}	
}
