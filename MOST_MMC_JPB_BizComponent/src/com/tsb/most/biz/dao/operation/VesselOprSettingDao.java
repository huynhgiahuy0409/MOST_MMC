package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselOprSettingDao extends BaseDao implements IVesselOprSettingDao {

	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws DaoException {
        return unifiedDao.getItemsPage("vesselOprSetting.selectVesselOprSettingList", parm);
    }
	
	public DataItemList selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectOverlappedWithFinitePeriod", parm);
	}
	
	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchVesselOprSettingParm parm) throws DaoException {
        return unifiedDao.getItems("vesselOprSetting.selectVORDryBreakBulkForStevAndTrim", parm);
    }
	
	public DataItemList selectIsAllCargoReleased(SearchVesselOprSettingParm parm) throws DaoException {
        return unifiedDao.getItems("vesselOprSetting.selectIsAllCargoReleased", parm);
    }
	
	public DataItemList insertVesselOprSetting(InsertItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "vesselOprSetting.insertVesselOprSetting", itemList);
			unifiedDao.insertItems(null, "vesselOprSetting.insertVesselOprSettingMst", itemList);
			
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
			setVersion(itemList);
			return itemList;
		}
		catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateVesselOprSetting(UpdateItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateVesselOprSetting", itemList);
			
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public void updateAtwAtc4Vsl(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "vesselOprSetting.updateAtwAtc4Vsl", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}

	}
	
	public void deleteVesselOprSetting(DeleteItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getDeleteItems();
			unifiedDao.deleteItems(null, "vesselOprSetting.deleteVesselOprSetting", itemList);
			
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
