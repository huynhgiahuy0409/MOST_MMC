package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchDGListParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public interface IDGListDao {
    public DataItemList getDGList(SearchDGListParm parm) throws DaoException;
    public DataItemList getDGDetail(SearchDGListParm parm) throws DaoException;
    public DataItemList getSubstanceItems(SearchDGListParm parm) throws DaoException;
    public DataItemList updateDGDetail(UpdateItemsBizParm parm) throws DaoException;
}
