package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchSpaceMovementSummaryParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class SpaceMovementSummaryDao extends BaseDao implements ISpaceMovementSummaryDao {
 
    public DataItemList selectSpaceMovementSummaryList(SearchSpaceMovementSummaryParm parm) throws DaoException {
        return unifiedDao.getItemsPage("spaceMovementSummary.selectSpaceMovementSummaryList", parm);
    }
}
