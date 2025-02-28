package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;

public class MegaContractorDao extends BaseDao implements IMegaContractorDao {
     public DataItemList selectMegaContractorList(SearchMegaParm parm) throws DaoException {
        return unifiedDao.getItems("MegaMap.selectMegaCntt", parm);
    }
}
