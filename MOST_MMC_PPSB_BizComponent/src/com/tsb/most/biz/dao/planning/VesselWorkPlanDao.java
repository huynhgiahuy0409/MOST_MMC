package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.VesselWorkPlanItem;
import com.tsb.most.biz.parm.planning.SearchVesselWorkPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselWorkPlanDao extends BaseDao implements IVesselWorkPlanDao {
    
    public DataItemList selectVesselWorkPLanList(SearchVesselWorkPlanParm parm) throws DaoException {
        return unifiedDao.getItems("vesselWorkPlan.selectVesselWorkPLanList", parm);
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);
    		unifiedDao.insertItems(null,"vesselWorkPlan.insertItems", insertItems);
    		setVersion(insertItems);
    		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		
    		setNewVersion(updateItems);
    		unifiedDao.updateItemsWithTimeCheck(null, "vesselWorkPlan.updateItems", updateItems);
    		setVersion(updateItems);
    		
    		return updateItems;
    	}catch(Exception e) {
    		throw new DaoException(e);
    	}
    }

	@Override
	public void deleteAllItems(DeleteItemsBizParm parm) throws DaoException {
		try{
    		DataItemList  itemList = parm.getDeleteItems();
    		
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "vesselWorkPlan.deleteAllItems", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertHatchPlan(InsertItemsBizParm insertVslBLItems) throws DaoException {
		try{
    		DataItemList insertItems = insertVslBLItems.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"vesselWorkPlan.insertHatchPlan", insertItems);
    		setVersion(insertItems);
    		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectVslBaplieItem(VesselWorkPlanItem item) throws DaoException {
		 return unifiedDao.getItems("vesselWorkPlan.selectVslBaplieItem", item);
	}

	@Override
	public String createNextSeq() throws DaoException {
		String values = (String) unifiedDao.readOne("vesselWorkPlan.createNextSeq", null);
		
		if (values == null) values = "";
		
		return values;
	}
}
