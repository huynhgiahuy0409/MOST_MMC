package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchBerthApprovalParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBerthApprovalDao {
	public DataItemList getBerthingApprovalList(SearchBerthApprovalParm parm) throws DaoException;

	public DataItemList insertItems(InsertItemsBizParm items) throws DaoException;

	public DataItemList updateItems(UpdateItemsBizParm items) throws DaoException;

	public void deleteItems(DeleteItemsBizParm items) throws DaoException;

	public String countBerthingApproval(SearchBerthApprovalParm parm) throws DaoException;
}
