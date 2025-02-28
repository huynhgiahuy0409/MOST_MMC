package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfUnitNoCorrectionDao extends BaseDao implements ITheListOfUnitNoCorrectionDao {
  
	public DataItemList selectCorrectionUnitNoItems(SearchTheListOfUnitNoCorrectionParm parm) throws DaoException {
        return unifiedDao.getItemsPage("theListOfUnitNoCorrection.selectCorrectionUnitNoItems", parm);
    }
	
}
