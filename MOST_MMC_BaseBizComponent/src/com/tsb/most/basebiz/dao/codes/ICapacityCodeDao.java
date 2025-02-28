package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchCapacityCodeParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICapacityCodeDao {
	public DataItemList getCodeMasterList(SearchCodeMasterParm param) throws DaoException;
    public DataItemList selectCapacityCodeList(SearchCapacityCodeParm param) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}
