package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDamageCheckDao {
	public DataItemList selectBlSnNo(SearchDamageCheckParm parm) throws DaoException;
	public DataItemList selectDoGrNo(SearchDamageCheckParm parm) throws DaoException;
	public DataItemList selectDamageCheck(SearchDamageCheckParm parm) throws DaoException;
	public DataItemList selectJobNoDamageCheck(InsertItemsBizParm parm) throws DaoException;
	
	public DataItemList insertDamageCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteDamageCheck(DeleteItemsBizParm parm) throws DaoException;
}
