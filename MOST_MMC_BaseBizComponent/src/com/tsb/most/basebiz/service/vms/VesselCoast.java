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

import java.util.Iterator;

import com.tsb.most.basebiz.dao.vms.IVesselCoastDao;
import com.tsb.most.basebiz.dataitem.vms.VesselImageItem;
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
//import com.tsb.most.biz.service.vms.VmsBaseService;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
//import com.pcs.foundation.bizparm.CudParm;
//import com.pcs.foundation.dataitem.DataItemList;
//import com.pcs.foundation.exception.BizException;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselCoast extends MOSTBaseService implements IVesselCoast {
	private IVesselCoastDao vesselCoastDao;
	
	public IVesselCoastDao getVesselCoastDao() {
		return vesselCoastDao;
	}

	public void setVesselCoastDao(IVesselCoastDao vesselCoastDao) {
		this.vesselCoastDao = vesselCoastDao;
	}
	
	@Override
	public DataItemList selectVesselList(VesselParm parm)throws BizException{
		return vesselCoastDao.selectVesselList(parm);
	}

	@Override
	public DataItemList selectVesselRouteCodeList(VesselParm parm) throws BizException {
		return vesselCoastDao.selectVesselRouteCodeList(parm);
	}
	
	@Override
    public DataItemList selectVesselKindList(VesselParm parm) throws BizException {
		return vesselCoastDao.selectVesselKindList(parm);
    }
	
//	@Override
//    public DataItemList selectPortList(VesselParm parm) throws BizException {
//        RestResponse response = new RestResponse();
//        response.setData(vesselCoastDao.selectPortList(parm));
//        return response;
//    }
	
	@Override
    public DataItemList selectVesselMovements(VesselParm parm) throws BizException {
		DataItemList vesselMovements = new DataItemList();
		DataItemList vesselMoves = vesselCoastDao.selectVesselMovements(parm);
		
		if(vesselMoves != null){
			
			VesselItem vesselMove = new VesselItem();
			String routes = "";
			String vesselCode = "";
				
			Iterator iter = vesselMoves.getCollection().iterator();
			
			while (iter.hasNext()) {
				vesselMove = (VesselItem) iter.next();
				routes = routes + vesselMove.getLatitude() + "," + vesselMove.getLongitude() + "|";
				vesselCode = vesselMove.getVesselCode();				
			}
			
			vesselMove.setVesselCode(vesselCode);
			vesselMove.setRouteCode(routes);
			vesselMovements.add(vesselMove);
			
		}
		
		return vesselMovements;
		
        
    }	
	
	@Override
    public DataItemList selectVesselImage(VesselParm parm) throws BizException {
		return vesselCoastDao.selectVesselImage(parm);
    }	
	
	@Override
	public DataItemList insertVesselImage(InsertItemsBizParm parm)throws BizException{
		VesselImageItem item = (VesselImageItem)parm.getDataItem();
		vesselCoastDao.insertVesselImage(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
	public DataItemList updateVesselImage(UpdateItemsBizParm parm)throws BizException{
		VesselImageItem item = (VesselImageItem)parm.getDataItem();
		vesselCoastDao.updateVesselImage(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
	public DataItemList deleteVesselImage(DeleteItemsBizParm parm)throws BizException{
		VesselImageItem item = (VesselImageItem)parm.getDataItem();
		vesselCoastDao.deleteVesselImage(parm.getTxTraceinfo(),item);
		
		return null;
	}	
		
	@Override
	public DataItemList updateVesselGps(UpdateItemsBizParm parm)throws BizException{
		VesselItem item = (VesselItem)parm.getDataItem();
		vesselCoastDao.updateVesselGps(parm.getTxTraceinfo(),item);
		
		return null;
	}	
}
