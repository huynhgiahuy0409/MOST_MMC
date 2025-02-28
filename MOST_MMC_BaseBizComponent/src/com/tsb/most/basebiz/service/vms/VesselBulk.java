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

import com.tsb.most.basebiz.dao.vms.IVesselBulkDao;
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.plus.base.service.VmsBaseService;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
//import com.pcs.foundation.bizparm.CudParm;
//import com.pcs.foundation.dataitem.DataItemList;
//import com.pcs.foundation.exception.BizException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselBulk extends MOSTBaseService implements IVesselBulk {
	private IVesselBulkDao vesselBulkDao;
	
	public IVesselBulkDao getVesselBulkDao() {
		return vesselBulkDao;
	}

	public void setVesselBulkDao(IVesselBulkDao vesselBulkDao) {
		this.vesselBulkDao = vesselBulkDao;
	}
	
	@Override
	public DataItemList selectVesselList(VesselParm parm)throws BizException{
		return vesselBulkDao.selectVesselList(parm);
	}
	
	@Override
	public DataItemList selectVesselGroup(VesselParm parm)throws BizException{
		return vesselBulkDao.selectVesselGroup(parm);
	}

	@Override
	public DataItemList selectVesselMaster(VesselParm parm)throws BizException{
		return vesselBulkDao.selectVesselMaster(parm);
	}
	
//    @Override
//    public DataItemList selectBulkPlEachSignalLampList(VesselParm parm) throws BizException {
//        RestResponse response = new RestResponse();
//        response.setData(vesselBulkDao.selectBulkPlEachSignalLampList(parm));
//        return response;
//    }

    @Override
    public DataItemList selectMarketIndex(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectMarketIndex(parm);
    }
    
    @Override
    public DataItemList selectMarketIndexValueDataList(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectMarketIndexValueDataList(parm);
    }

    @Override
    public DataItemList selectPositionDataList(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectPositionDataList(parm);
    }

    @Override
    public DataItemList selectPositionChartDataList(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectPositionChartDataList(parm);
    }

    @Override
    public DataItemList selectBondStatistics(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectBondStatistics(parm);
    }
    
    @Override
    public DataItemList selectClaimStatistics(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectClaimStatistics(parm);
    }
    
    @Override
    public DataItemList selectContractStatistics(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectContractStatistics(parm);
    }
    
    @Override
    public DataItemList selectVesselSchedule(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectVesselSchedule(parm);
    }
    
    @Override
    public DataItemList selectCargoByConsignee(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectCargoByConsignee(parm);
    }
    
    @Override
    public DataItemList selectCargoByBrand(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectCargoByBrand(parm);
    }
    
    @Override
    public DataItemList selectPortList(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectPortList(parm);
    }
    @Override
    public DataItemList selectVesselOperationList(VesselParm parm) throws BizException {
    	return vesselBulkDao.selectVesselOperationList(parm);
    }

    @Override
    public DataItemList updateVesselLocationModify(UpdateItemsBizParm parm)throws BizException{
        VesselItem item = (VesselItem)parm.getDataItem();
        vesselBulkDao.updateVesselLocationModify(parm.getTxTraceinfo(),item);
        
        return null;
    }
}
