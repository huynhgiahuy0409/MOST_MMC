package com.tsb.most.basebiz.dao.codes;


import com.tsb.most.basebiz.parm.codes.SearchGeneralCodeParm;
import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGeneralCodeDao {
	public DataItemList selectCodesList(SearchGeneralCodeParm pParm) throws DaoException;
	public DataItemList selectCode(SearchGeneralCodeParm parm) throws DaoException;
	public DataItemList selectCodeMasterLargeCode(SearchGeneralCodeParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList selectCodeInUse(BaseBizParm parm) throws DaoException;
}    
