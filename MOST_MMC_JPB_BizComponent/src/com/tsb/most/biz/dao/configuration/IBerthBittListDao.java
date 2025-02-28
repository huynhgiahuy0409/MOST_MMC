package com.tsb.most.biz.dao.configuration;

import com.tsb.most.biz.parm.configuration.SearchBerthBittListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBerthBittListDao {
	public DataItemList selectBerthBittList(SearchBerthBittListParm parm) throws DaoException;
	public DataItemList insertBerthBittList(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateBerthBittList(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteBerthBittList(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList selectBerthLocList(SearchBerthBittListParm parm) throws DaoException;
	public DataItemList selectDuplicateBerthBitt(SearchBerthBittListParm parm) throws DaoException;
}