package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchShiftGroupDefParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IShiftGroupDefDao {
    public DataItemList selectShiftDef(SearchShiftGroupDefParm parm) throws DaoException;
    public DataItemList selectGroupDef(SearchShiftGroupDefParm parm) throws DaoException;
    public DataItemList selectShiftGroupDefShiftMegaList(SearchShiftGroupDefParm parm) throws DaoException;

    public DataItemList insertShiftItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateShiftItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteShiftItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList insertGroupItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGroupItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteStffGroupItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteGroupItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteRstrGroupItems(DeleteItemsBizParm parm) throws DaoException;
}
