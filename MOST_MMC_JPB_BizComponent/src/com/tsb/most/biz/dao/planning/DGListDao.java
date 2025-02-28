package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchDGListParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class DGListDao extends BaseDao implements IDGListDao {

    public DataItemList getDGList(SearchDGListParm parm) throws DaoException {
        return unifiedDao.getItems("dgList.selectDGItems", parm);
    }
    
    public DataItemList getDGDetail(SearchDGListParm parm) throws DaoException {
        return unifiedDao.getItems("dgList.selectDGDetail", parm);
    } 
    
    public DataItemList getSubstanceItems(SearchDGListParm parm) throws DaoException {
        return unifiedDao.getItems("dgList.selectSubstance", parm);
    } 
    
    public DataItemList updateDGDetail(UpdateItemsBizParm parm) throws DaoException {        
        try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"dgList.updateDGDetail", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

}
