package com.tsb.most.biz.dao.operation;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselDelayDao extends BaseDao implements IVesselDelayDao {
    
	public DataItemList selectEqNoList(SearchVesselDelayParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vesselDelay.selectEqNoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList selectHatchNoList(SearchVesselDelayParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vesselDelay.selectHatchNoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList selectVesselDelayList(SearchVesselDelayParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = null;
            String sReportId = (String)parm.getReportId();
            
            if (sReportId != null && ("RCS10101".equals(sReportId) || "RCS10102".equals(sReportId)) ){
                rtnList = unifiedDao.getItems("vesselDelay.selectDelayRecordReport", parm);
            }else {
                rtnList = unifiedDao.getItems("vesselDelay.selectVesselDelayList", parm);                
            }            
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}        
    }
	
    public DataItemList selectAcceptedDelayCode(SearchVesselDelayParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vesselDelay.selectAcceptedDelayCode", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectDelayCodeList(SearchCodeMasterParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vesselDelay.selectDelayCodeList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			unifiedDao.insertItems(null,"vesselDelay.insertdelayRecordItems", insertItems);
			setVersion(insertItems);			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
	public DataItemList updateVerifiedVesselDelayItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"vesselDelay.updatedelayRecordItemsVerify", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null,"vesselDelay.deletedelayRecordItems", deleteItems);
			setVersion(deleteItems);
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"vesselDelay.updatedelayRecordItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	
}
