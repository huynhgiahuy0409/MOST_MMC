package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm;
import com.tsb.most.basebiz.service.administrator.FreshWaterService;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class FreshWaterServiceDao extends BaseDao implements IFreshWaterServiceDao{

	@Override
	public DataItemList selectFreshWaterServiceItems(SearchFreshWaterServiceParm parm) throws DaoException {
		return unifiedDao.getItemsPage("freshWaterService.selectFreshWaterServiceList", parm);
	}

}
