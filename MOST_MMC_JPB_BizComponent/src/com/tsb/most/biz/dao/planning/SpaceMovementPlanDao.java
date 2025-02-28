package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.SpaceMovementPlanItem;
import com.tsb.most.biz.parm.planning.SearchSpaceMovementPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class SpaceMovementPlanDao extends BaseDao implements ISpaceMovementPlanDao {
 
    public DataItemList selectSpaceMoveMentPlanDetail(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItemsPage("spaceMovementPlan.selectSpaceMovementDetail", parm);
    }

    public DataItemList selectSpaceMovementRequestList(SearchSpaceMovementPlanParm parm) throws DaoException{
    	return unifiedDao.getItems("spaceMovementPlan.selectSpaceMovementRequestList", parm);
    }
    
    public DataItemList selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItemsPage("spaceMovementPlan.selectSpaceMovementPlanList", parm);
    }
    
    public DataItemList selectMultipleSearchFilterCombo(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectMultipleSearchFilterCombo", parm);
    }
    
    public DataItemList selectGrList(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectGrList", parm);
    }

    public DataItemList selectBlSnInfo(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectBlSnInfo", parm);
    }
    
    public DataItemList selectSpaceMovementInfo(SearchSpaceMovementPlanParm parm) throws DaoException {
    	DataItemList rtnList = null;
    	
        if (parm.getBlNo() != null && !"".equalsIgnoreCase(parm.getBlNo())) {
            rtnList = unifiedDao.getItems("spaceMovementPlan.selectSpaceMovementBlInfo", parm);
        } else {
            rtnList = unifiedDao.getItems("spaceMovementPlan.selectSpaceMovementSnInfo", parm);
        }     
        
        return rtnList;
    }
    
    public DataItemList selectRcntReqNo(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectRcntReqNo", parm);
    }
    
    public DataItemList selectReqSeq(SpaceMovementPlanItem parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectReqSeq", parm);
    }
    
    public DataItemList selectMaxSeq(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectMaxSeq", parm);
    }
    
    public DataItemList selectMaxPlanSeq(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectMaxPlanSeq", parm);
    }
    
    public DataItemList selectNewReqNo(SearchSpaceMovementPlanParm parm) throws DaoException {
        return unifiedDao.getItems("spaceMovementPlan.selectNewReqNo", parm);
    }

    public void updateSpaceMovementRequestItems(TxTraceInfo txTraceInfo,  DataItemList items) throws DaoException {
        unifiedDao.updateItems(txTraceInfo,"spaceMovementPlan.updateSpaceMovementRequestItems", items);
    } 
    
    public void deleteSpcMovRequestItem(TxTraceInfo txTraceInfo, SpaceMovementPlanItem items) throws DaoException {
        unifiedDao.deleteItem(txTraceInfo,"spaceMovementPlan.deleteSpaceMovementPlanItems", items);
    }

    public void deleteSpcMovPlanItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
        unifiedDao.deleteItems(txTraceInfo,"spaceMovementPlan.deleteSpcMovPlanItems", items);
    }
    
    public void deleteSpcMovPlanItem(TxTraceInfo txTraceInfo, SpaceMovementPlanItem items) throws DaoException {
        unifiedDao.deleteItem(txTraceInfo,"spaceMovementPlan.deleteSpcMovPlanItems", items);
    }

    public void updateSpcMovRequestProcess(UpdateItemsBizParm parm) throws DaoException {
		try {
			setNewVersion(parm.getUpdateItems());
			unifiedDao.updateItems(null, "spaceMovementPlan.updateSpcMovRequestProcess", parm.getUpdateItems());
		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}

    public void insertSpcMovPlanItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
        unifiedDao.updateItems(txTraceInfo,"spaceMovementPlan.insertSpcMovPlanItems", items);
    }
    
    public void insertSpcMovPlanItem(TxTraceInfo txTraceInfo, SpaceMovementPlanItem items) throws DaoException {
        unifiedDao.updateItemWithTimeCheck(txTraceInfo,"spaceMovementPlan.insertSpcMovPlanItems", items);
    }

    public void updateSpcMovPlanConfirm(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
        unifiedDao.updateItems(txTraceInfo,"spaceMovementPlan.updateSpcMovPlanConfirm", items);
    }
    
    public void updateSpcMovPlanConfirm2(UpdateItemsBizParm parm) throws DaoException {
		try {
			unifiedDao.updateItemWithTimeCheck(null, "spaceMovementPlan.updateSpcMovPlanConfirm", (SpaceMovementPlanItem) parm.getUpdateItem());
		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	} 

	@Override
	public DataItemList insertSpcMovPlanItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null, "spaceMovementPlan.insertSpcMovPlanItems", insertItems);
    		setVersion(insertItems);
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList deleteSpcMovPlanItems(DeleteItemsBizParm parm) throws DaoException {
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "spaceMovementPlan.deleteSpcMovPlanItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	} 

	@Override
	public DataItemList deleteSpaceMovementPlanItems(DeleteItemsBizParm parm) throws DaoException {
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "spaceMovementPlan.deleteSpaceMovementPlanItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	} 	

	@Override
	public DataItemList updateSpcMovReject(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = new DataItemList();
			updateItems.add(parm.getUpdateItems().get(0));
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "spaceMovementPlan.updateSpcMovReject", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    } 

	@Override
	public DataItemList updateSpcMovPlanConfirm(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "spaceMovementPlan.updateSpcMovPlanConfirm", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}
	
	@Override
	public DataItemList selectCargoInfo(SearchSpaceMovementPlanParm parm) throws DaoException {
		
		DataItemList rtnList =  unifiedDao.getItems("spaceMovementPlan.selectCargoInfo", parm);

		return rtnList;
	}
	
	//s-PL-012
	@Override
	public DataItemList insertSpcMovRequestItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();

			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "spaceMovementPlan.insertSpcMovRequestItems", insertItems);
			setVersion(insertItems);

			return insertItems;

		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateSpaceMovementRequestItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "spaceMovementPlan.updateSpaceMovementRequestItems", updateItems);
			setVersion(updateItems);

			return updateItems;

		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList deleteSpcMovRequestItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();

			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "spaceMovementPlan.deleteSpcMovRequestItems", deleteItems);
			setVersion(deleteItems);

			return deleteItems;

		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}
	
	@Override
	public DataItemList selectDuplicatedRequest(SearchSpaceMovementPlanParm parm) throws DaoException {
		
		DataItemList rtnList =  unifiedDao.getItems("spaceMovementPlan.selectDuplicatedRequest", parm);

		return rtnList;
	}
	
}
