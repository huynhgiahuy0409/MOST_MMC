package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IVesselOprSettingDao;
import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselOprSetting extends MOSTBaseService implements IVesselOprSetting {
	private IVesselOprSettingDao vesselOprSettingDao;
	
	public void setVesselOprSettingDao(IVesselOprSettingDao vesselOprSettingDao) {
		this.vesselOprSettingDao = vesselOprSettingDao;
	}
	///////////////////////////////////////////////

	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws BizException {
		return vesselOprSettingDao.selectVesselOprSettingList(parm);
	}
	
	public DataItemList selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws BizException {
		return vesselOprSettingDao.selectOverlappedWithFinitePeriod(parm);
	}
	
	public DataItemList insertVesselOprSetting(InsertItemsBizParm parm) throws BizException {
		DataItemList res = vesselOprSettingDao.insertVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getInsertItems());
		return res;
	}
	
	public DataItemList updateVesselOprSetting(UpdateItemsBizParm parm) throws BizException {
		DataItemList res = vesselOprSettingDao.updateVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getUpdateItems());
		return res;
	}
	
	public void deleteVesselOprSetting(DeleteItemsBizParm parm) throws BizException {
		vesselOprSettingDao.deleteVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getDeleteItems());
	}
	
	public void updateAtwAtc4Vsl(DataItemList items) throws BizException {
		vesselOprSettingDao.updateAtwAtc4Vsl(items);
    }

}
