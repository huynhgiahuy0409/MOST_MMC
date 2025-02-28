package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class HandlingInOutListDao extends BaseDao implements IHandlingInOutListDao {
	
	public DataItemList selectCargoHIList(SearchCargoHandlingInParm parm) throws DaoException {
        return unifiedDao.getItemsPage("handlingInOutList.selectCargoHIList", parm);
    }
	
	public DataItemList selectCargoHOList(SearchCargoHandlingOutParm parm) throws DaoException {
        return unifiedDao.getItemsPage("handlingInOutList.selectCargoHOList", parm);
    }
	
}
