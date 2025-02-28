package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.ISpaceMovementSummaryDao;
import com.tsb.most.biz.parm.planning.SearchSpaceMovementSummaryParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class SpaceMovementSummary extends MOSTBaseService implements ISpaceMovementSummary {
	private ISpaceMovementSummaryDao spaceMovementSummaryDao;
	
	public void setSpaceMovementSummaryDao(ISpaceMovementSummaryDao spaceMovementSummaryDao) {
		this.spaceMovementSummaryDao = spaceMovementSummaryDao;
	}
	
	public DataItemList selectSpaceMovementSummaryList(SearchSpaceMovementSummaryParm parm) throws BizException {
		DataItemList list = spaceMovementSummaryDao.selectSpaceMovementSummaryList(parm);

		return list;
	}
}