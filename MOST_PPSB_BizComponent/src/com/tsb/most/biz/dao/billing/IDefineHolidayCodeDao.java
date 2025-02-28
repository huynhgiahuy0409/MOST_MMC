package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IDefineHolidayCodeDao {
    public DataItemList selectDefineHolidayCodeList(SearchDefineHolidayCodeParm parm) throws DaoException;
	
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
}