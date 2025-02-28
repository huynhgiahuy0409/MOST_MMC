package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchCargoSearchParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoSearch{
	public DataItemList selectCargoSearchList(SearchCargoSearchParm parm) throws BizException;
	public DataItemList selectGrGoComboList(SearchCargoSearchParm parm) throws BizException;
	
}
