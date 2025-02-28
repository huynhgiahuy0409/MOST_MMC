package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IFreshWaterService {
	public DataItemList selectFreshWaterServiceItems(SearchFreshWaterServiceParm parm)throws BizException;
}
