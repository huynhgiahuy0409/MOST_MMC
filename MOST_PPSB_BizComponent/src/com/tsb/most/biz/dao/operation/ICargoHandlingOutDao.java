package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoHandlingOutDao {
	public DataItemList selectCargoHandlingOutList(SearchCargoHandlingOutParm parm) throws DaoException;
	public DataItemList selectCargoRhdlHandlingOutList(SearchCargoHandlingOutParm parm) throws DaoException;
	
	public DataItemList updateCargoHandlingOutItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList insertCargoHOJobItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertCargoInvLocationItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateCargoMasterStatus(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertCargoHOArrvDelvItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateCargoHOArrvDelvItems(UpdateItemsBizParm parm) throws DaoException;

	public void insertPackageJobItems(DataItemList items) throws DaoException;
}