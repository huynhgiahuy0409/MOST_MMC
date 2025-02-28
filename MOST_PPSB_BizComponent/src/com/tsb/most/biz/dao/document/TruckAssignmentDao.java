package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TruckAssignmentDao extends BaseDao implements ITruckAssignmentDao {
  
    public DataItemList selectGoodReceiptItems(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectGoodReceiptItems", parm);
    }
    
    public DataItemList selectSubDoNoItems(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectSubDoNoItems", parm);
    }
    
    public DataItemList selectGoodReceiptItemforAssigment(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectGoodReceiptItemforAssigment", parm);
    }
    
    public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectTruckAssignmentItems", parm);
	}
    
    public DataItemList selectDriverRegistrationItems(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("truckAssignment.selectDriverRegistrationItems", parm);
    }
    
	public DataItemList selectTruckRegistrationItems(SearchTruckAssignmentParm parm) throws DaoException {
		return unifiedDao.getItemsPage("truckAssignment.selectTruckRegistrationItems", parm);
	}
    
    public DataItemList selectChangeBLSNo(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectChangeBLSNo", parm);
	} 
    
    public DataItemList selectAssignmentLorrysGateItems(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectAssignmentLorrysGateItems", parm);
	} 
    
    public DataItemList selectInternalMovementTicketReport(SearchTruckAssignmentParm parm) throws DaoException {
    	return unifiedDao.getItems("truckAssignment.selectInternalMovementTicketReport", parm);
	}
    
	public DataItemList insertTruckAssignment(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);
		unifiedDao.insertItems(null, "truckAssignment.insertTruckAssignment", insertItems);
		setVersion(insertItems);
		return insertItems;
	}

	public DataItemList updateTruckAssignment(UpdateItemsBizParm parm) throws DaoException {
		DataItemList itemList = parm.getUpdateItems();
		setNewVersion(itemList);
		unifiedDao.updateItems(null, "truckAssignment.updateTruckAssignment", itemList);
		setVersion(itemList);
		return itemList;
	}

	public void deleteTruckAssignment(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "truckAssignment.deleteTruckAssignment", deleteItems);
	}
}
