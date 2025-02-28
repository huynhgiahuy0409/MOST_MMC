package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchConfirmationSlipParm;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ConfirmationSlipDao extends BaseDao implements IConfirmationSlipDao {
    public DataItemList getConfirmationSlip(SearchConfirmationSlipParm parm) throws DaoException {
        return unifiedDao.getItems("ConfirmationSlipMap.selectConfirmationSlip", parm);
    }
    
    public DataItemList getConfirmationSlipDetail(SearchConfirmationSlipParm parm) throws DaoException {
		return unifiedDao.getItems("ConfirmationSlipMap.selectConfirmationSlipDetail", parm);
    }
    
    public DataItemList getConfirmationSlipCount(SearchConfirmationSlipParm parm) throws DaoException {
		return unifiedDao.getItems("ConfirmationSlipMap.selectConfirmationSlipCount", parm);
    }
    
    public DataItemList getConfirmationSlipOperationType(SearchConfirmationSlipParm parm) throws DaoException {
		return unifiedDao.getItems("ConfirmationSlipMap.selectConfirmationSlipOperationType", parm);
    }

	public void insertConfirmationSlipItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getInsertItems();
			unifiedDao.insertItems(null, "ConfirmationSlipMap.insertConfirmationSlipItems", itemList);
			unifiedDao.updateItems(null, "ConfirmationSlipMap.updateVslDblBnkYn", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
    
	public void updateConfirmationSlipItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			unifiedDao.updateItems(null, "ConfirmationSlipMap.updateConfirmationSlipItems", itemList);
			unifiedDao.updateItems(null, "ConfirmationSlipMap.updateVslDblBnkYn", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void updateVslPriorityYn(TxTraceInfo txTraceInfo, DataItem item) throws DaoException {
		unifiedDao.updateItem(txTraceInfo, "ConfirmationSlipMap.updateVslPriorityYn", item);
	}

	public void insertConfirmationSlipDetailItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getInsertItems();
			unifiedDao.insertItems(null, "ConfirmationSlipMap.insertConfirmationSlipDetailItems", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void updateConfirmationSlipDetailItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "ConfirmationSlipMap.updateConfirmationSlipDetailItems", itemList);
			setVersion(itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void deleteConfirmationSlipDetailItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			unifiedDao.deleteItems(null, "ConfirmationSlipMap.deleteConfirmationSlipDetailItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void insertConfirmationSlipPtnrItems(InsertItemsBizParm parm) throws DaoException {
		try {
			unifiedDao.insertItems(null, "ConfirmationSlipMap.insertConfirmationSlipPtnrItems", parm.getInsertItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void deleteConfirmationSlipPtnrItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			unifiedDao.deleteItem(null, "ConfirmationSlipMap.deleteConfirmationSlipPtnrItems", parm.getDeleteItem());
		} catch (Exception e) {
			throw new DaoException(e);
		}

	}
    
    public DataItemList getPassenger(SearchConfirmationSlipParm parm) throws DaoException {
        return unifiedDao.getItems("ISPSMap.selectPassenger", parm);
    }
    
    public DataItemList getVesselInfo(SearchConfirmationSlipParm parm) throws DaoException {
        return unifiedDao.getItems("ISPSMap.selectVesselInfo", parm);
    }
    
    public DataItemList getPassengerSummary(SearchConfirmationSlipParm parm) throws DaoException {
        return unifiedDao.getItems("ISPSMap.selectPassengerSummary", parm);
    }
    
    public DataItemList getISPS(SearchConfirmationSlipParm parm) throws DaoException {
        return unifiedDao.getItems("ISPSMap.selectISPS", parm);
    }

    public String checkConfirmationUpdate(SearchConfirmationSlipParm parm) throws DaoException {
    	//TODO
    	//Need to change return type
		//return (String) unifiedDao.retrieveItem("ConfirmationSlipMap.checkConfirmationUpdate", parm);
    	return null;
    }

	public DataItemList getConfirmationSlipDetail(SearchMegaParm parm) throws DaoException {
		return unifiedDao.getItems("ConfirmationSlipMap.selectConfirmationSlipDetail", parm);
	}

}
