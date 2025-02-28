package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class HangingScaleDao extends BaseDao implements IHangingScaleDao {

	public DataItemList selectHangingScaleItems(SearchHangingScaleParm parm) throws DaoException {
        return unifiedDao.getItems("hangingScale.selectHangingScaleItems", parm);
    }
	
	public void updateHangingScaleItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"hangingScale.updateHangingScaleItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
}
