package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDimensionCheckDao {
	public DataItemList selectDimensionCheck(SearchDimensionCheckParm parm) throws DaoException;
	public DataItemList selectJobNoDimensionCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectBlSnNo(SearchDimensionCheckParm parm) throws DaoException;
	public DataItemList selectDoGrNo(SearchDimensionCheckParm parm) throws DaoException;

	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteDimensionCheck(DeleteItemsBizParm parm) throws DaoException;
	
}
