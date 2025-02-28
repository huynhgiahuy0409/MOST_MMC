package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfDamageCheckOfGCDao {
	
	public DataItemList selectGCDamageCheckItems(SearchDamageCheckParm parm) throws DaoException ;
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm items) throws DaoException;
}
