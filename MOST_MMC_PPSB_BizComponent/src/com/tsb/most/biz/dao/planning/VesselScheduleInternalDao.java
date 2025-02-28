package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.VesselScheduleItem;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselScheduleInternalDao extends BaseDao implements IVesselScheduleInternalDao {

    public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException {
        DataItemList rtnList = null;
        
        if(parm.getSearchType() != null && !"".equals(parm.getSearchType())) {
            rtnList = unifiedDao.getItemsPage("vesselScheduleInternal.selectVesselScheduleList", parm);
        } else {
            rtnList = unifiedDao.getItemsPage("vesselScheduleInternal.selectVesselScheduleReport", parm);
        }
        return rtnList;
    }
    
    public DataItemList selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectVesselScheduleDetail", parm);
    }
    
    public DataItemList selectBerthMaintenanceList(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectBerthMaintenanceList", parm);
    }
    
    public DataItemList selectConfirmationSlip(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectConfirmationSlip", parm);
    }
    
    public DataItemList selectConfirmationSlipDetail(SearchVesselScheduleParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleInternal.selectConfirmationSlipDetail", parm);
    }
    
    public DataItemList selectVORLiquidCargo(SearchVesselScheduleParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vesselScheduleInternal.selectVORLiquidCargo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectConfirmationSlipOperationType(SearchVesselScheduleParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleInternal.selectConfirmationSlipOperationType", parm);
    }
    
    public DataItemList selectVesselInfo(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectVesselInfo", parm);
    }
    
    public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectBerthInfo", parm);
    }
    
    public void insertConfirmationSlipItems(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList itemList = parm.getInsertItems();
			
			unifiedDao.insertItems(null, "vesselScheduleInternal.insertConfirmationSlipItems", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectVslTpCombo(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectVslTpCombo", parm);
    }

	@Override
	public DataItemList selectConfirmationSlipCount(SearchVesselScheduleParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleInternal.selectConfirmationSlipCount", parm);
	}
	
	public DataItemList selectBerthValidation(SearchVesselScheduleParm parm) throws DaoException{
        return unifiedDao.getItems("vesselScheduleInternal.selectBerthValidation", parm);
    }

    public void updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		VesselScheduleItem item = (VesselScheduleItem)parm.getUpdateItem();
			setNewVersion(item);
			unifiedDao.updateItem(null,"vesselScheduleInternal.updateVesselDetailItem", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateConfirmationSlipItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			
			unifiedDao.updateItems(null, "vesselScheduleInternal.updateConfirmationSlipItems", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void insertConfirmationSlipDetailItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getInsertItems();
			unifiedDao.insertItems(null, "vesselScheduleInternal.insertConfirmationSlipDetailItems", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public void updateConfirmationSlipDetailItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselScheduleInternal.updateConfirmationSlipDetailItems", itemList);
			setVersion(itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void deleteConfirmationSlipDetailItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			unifiedDao.deleteItems(null, "vesselScheduleInternal.deleteConfirmationSlipDetailItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
