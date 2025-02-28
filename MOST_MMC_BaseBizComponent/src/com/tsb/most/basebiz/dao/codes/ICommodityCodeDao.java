package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICommodityCodeDao {
	public DataItemList selectCommodityCodeList(SearchCommodityCodeParm parm) throws DaoException;
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList insertCommodityGroupItem(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectCommodityGroupItem(SearchCommodityCodeParm parm) throws DaoException;
	public DataItemList updateCommodityGroupItem(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteCommodityGroupItem(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList checkDuplicate(SearchCommodityCodeParm parm) throws DaoException;
}    
