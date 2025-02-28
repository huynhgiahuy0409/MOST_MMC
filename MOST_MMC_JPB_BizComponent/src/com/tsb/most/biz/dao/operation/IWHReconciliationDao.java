package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationPivotParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IWHReconciliationDao {
    public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException;
    public DataItemList selectWHRecnListPivot(SearchWHReconciliationPivotParm parm) throws DaoException;
    
    public DataItemList getWHRecnDtl(SearchWHReconciliationParm parm) throws DaoException;
    public DataItemList getWHRecnDocList(SearchWHReconciliationParm parm) throws DaoException;
    
	public DataItemList insertJobItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertInvLocItems(InsertItemsBizParm parm) throws BizException;
    
}
