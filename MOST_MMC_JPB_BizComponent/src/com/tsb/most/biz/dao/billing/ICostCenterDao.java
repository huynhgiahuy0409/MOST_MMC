package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICostCenterDao {
	public DataItemList selectCostCenter(SearchCostCenterParm parm) throws DaoException;
    public DataItemList isUnitInUsed(SearchCostCenterParm param) throws DaoException;
    public String duplicatedCostERP(SearchCostCenterParm param) throws DaoException;
    
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}
