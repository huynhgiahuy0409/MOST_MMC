package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RoRoYardPlanDao extends BaseDao implements IRoRoYardPlanDao {
    public DataItemList selectRoRoYardPlanCargoList(SearchRoRoYardPlanParm parm) throws DaoException {
        return unifiedDao.getItemsPage("roroYardPlan.selectRoRoYardPlanCargoList", parm);
    }
    
    public DataItemList selectRoRoYardPlanUnitList(SearchRoRoYardPlanParm parm) throws DaoException {
        return unifiedDao.getItems("roroYardPlan.selectRoRoYardPlanUnitList", parm);
    }
    
    public DataItemList selectRoRoYardPlanList(SearchRoRoYardPlanParm parm) throws DaoException {
        return unifiedDao.getItems("roroYardPlan.selectRoRoYardPlanList", parm);
    }

    public DataItemList updateYardPlanOfRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
    		
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"roroYardPlan.updateYardPlanOfRoRo", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList deleteYardPlanOfRoRo(UpdateItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getUpdateItems();
			unifiedDao.updateItems(null ,"roroYardPlan.deleteYardPlanOfRoRo", itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DataItemList selectUnitsFromBLList(SearchRoRoYardPlanParm parm) throws DaoException {
		return unifiedDao.getItemsPage("roroYardPlan.selectUnitsFromBLList", parm);
	}

	@Override
	public DataItemList selectUnitsFromBLListByMode(SearchRoRoYardPlanParm parm) throws DaoException {
		return unifiedDao.getItemsPage("roroYardPlan.selectUnitsFromBLListByMode", parm);
	}

	@Override
	public DataItemList selectRoRoYardPlanUnitWHCheckImportList(SearchRoRoYardPlanParm parm) throws DaoException {
		 return unifiedDao.getItems("roroYardPlan.selectRoRoYardPlanUnitWHCheckImportList", parm);
	}

	@Override
	public DataItemList selectRoRoYardPlanUnitHandlingOutList(SearchRoRoYardPlanParm parm) throws DaoException {
		 return unifiedDao.getItems("roroYardPlan.selectRoRoYardPlanUnitHandlingOutList", parm);
	}   

}
