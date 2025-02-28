package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselDelayPenaltyReportDao extends BaseDao implements IVesselDelayPenaltyReportDao {

	@Override
	public DataItemList selectDelayPenaltyReportList(SearchVesselDelayPenaltyReportParm parm) throws DaoException {
         return unifiedDao.getItems("vesselDelayPenaltyReport.selectDelayPenaltyReportList", parm); 
	}

	@Override
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"vesselDelayPenaltyReport.updatedelayRecordItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			unifiedDao.insertItems(null,"vesselDelayPenaltyReport.insertdelayRecordItems", insertItems);
			setVersion(insertItems);			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null,"vesselDelayPenaltyReport.deletedelayRecordItems", deleteItems);
			setVersion(deleteItems);
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectSpecificDelayCodes(SearchVesselDelayPenaltyReportParm parm) throws DaoException {
        return unifiedDao.getItems("vesselDelayPenaltyReport.selectSpecificDelayCodes", parm); 
	}

}
