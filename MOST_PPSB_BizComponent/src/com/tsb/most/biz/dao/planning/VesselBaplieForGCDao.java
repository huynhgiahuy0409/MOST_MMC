package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchVesselBaplieForGCParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselBaplieForGCDao extends BaseDao implements IVesselBaplieForGCDao {

	@Override
	public DataItemList searchVesselBaplieItems(SearchVesselBaplieForGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("vesselBaplieForGC.searchVesselBaplieItems", parm);
	}
}
