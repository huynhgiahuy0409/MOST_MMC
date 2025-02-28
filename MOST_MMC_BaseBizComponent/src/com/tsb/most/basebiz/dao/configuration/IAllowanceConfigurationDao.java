package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchAllowanceConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IAllowanceConfigurationDao {
	public DataItemList getAllowanceConfigurationItems(SearchAllowanceConfigurationParm parm) throws DaoException;

	public DataItemList getStaffItem(SearchAllowanceConfigurationParm parm) throws DaoException;

	public DataItemList deleteItem(DeleteItemsBizParm parm) throws DaoException;

	public DataItemList insertItem(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateItem(UpdateItemsBizParm parm) throws DaoException;

}
