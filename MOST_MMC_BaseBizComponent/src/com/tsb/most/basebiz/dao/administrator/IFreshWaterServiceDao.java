package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IFreshWaterServiceDao {
	public DataItemList selectFreshWaterServiceItems(SearchFreshWaterServiceParm parm)throws DaoException;

}
