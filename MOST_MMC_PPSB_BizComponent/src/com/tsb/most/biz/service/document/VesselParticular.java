package com.tsb.most.biz.service.document;


import com.tsb.most.biz.dao.document.IVesselParticularDao;
import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselParticular extends MOSTBaseService implements IVesselParticular {
	private IVesselParticularDao vesselParticularDao;

	public void setVesselParticularDao(IVesselParticularDao vesselParticularDao) {
		this.vesselParticularDao = vesselParticularDao;
	}

	public DataItemList selectVesselParticularList(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectVesselParticularList(parm);
	}
	
	public DataItemList selectRequestVesselChangeList(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectRequestVesselChangeList(parm);
	}

	public DataItemList selectShaList(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectShaList(parm);
	}
	
	public DataItemList selectSha(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectSha(parm);
	}

	public DataItemList selectShpList(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectShpList(parm);
	}

	public DataItemList selectVesselParticularDetailItem(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.selectVesselParticularDetailItem(parm);
	}

	public DataItemList vslScheduleCheck(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.vslScheduleCheck(parm);
	}
	
	public DataItemList isCheckValidateForMQ(SearchVesselParticularParm parm) throws BizException {
		return vesselParticularDao.isCheckValidateForMQ(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws Exception{
		return vesselParticularDao.insertItems(parm);
	}
	
    public DataItemList updateItems(UpdateItemsBizParm parm) throws Exception{
    	return vesselParticularDao.updateItems(parm);
    }
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws Exception{
    	return vesselParticularDao.deleteVesselParticularItems(parm);
    }
    
	public DataItemList updateVesselParticularItemConfirm(UpdateItemsBizParm parm) throws BizException{
    	return vesselParticularDao.updateVesselParticularItemConfirm(parm);
	}
}
