package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchROROCargoInYardParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ROROCargoInYardDao extends BaseDao implements IROROCargoInYardDao {
    
    public DataItemList selectRoRoCargoInYardItems(SearchROROCargoInYardParm parm) throws DaoException {
    	return unifiedDao.getItems("roroCargoInYard.selectRoRoCargoInYardItems", parm);
    }
}
