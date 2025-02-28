package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.dao.administrator.IFreshWaterServiceDao;
import com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class FreshWaterService extends MOSTBaseService implements IFreshWaterService{

	private IFreshWaterServiceDao freshWaterServiceDao;
	
	public IFreshWaterServiceDao getFreshWaterServiceDao() {
		return freshWaterServiceDao;
	}


	public void setFreshWaterServiceDao(IFreshWaterServiceDao freshWaterServiceDao) {
		this.freshWaterServiceDao = freshWaterServiceDao;
	}


	@Override
	public DataItemList selectFreshWaterServiceItems(SearchFreshWaterServiceParm parm) throws BizException {
		return freshWaterServiceDao.selectFreshWaterServiceItems(parm);
	}

}
