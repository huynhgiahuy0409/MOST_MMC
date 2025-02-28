package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDamageDimensionCheckDao {
	public DataItemList searchDamageCheck(SearchDamageDimensionCheck parm) throws DaoException;
	public DataItemList searchDimensionCheck(SearchDamageDimensionCheck parm) throws DaoException;
	public DataItemList insertDamageCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectJobNoDamageCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectJobNoDimensionCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteDimensionCheck(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteDamageCheck(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList searchDamageDimensionCheckJobNo(SearchDamageDimensionCheck parm) throws DaoException;
	public DataItemList searchDamageDimensionCheckBlSnNo(SearchDamageDimensionCheck parm) throws DaoException;
	public DataItemList searchDamageDimensionCheckDoGrNo(SearchDamageDimensionCheck parm) throws DaoException;
}
