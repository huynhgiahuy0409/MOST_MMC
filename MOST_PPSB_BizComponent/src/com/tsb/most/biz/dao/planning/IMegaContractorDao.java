package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.dataitem.DataItemList;

public interface IMegaContractorDao {
    public DataItemList selectMegaContractorList(SearchMegaParm parm) throws DaoException;
}
