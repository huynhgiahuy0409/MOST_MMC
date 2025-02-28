package com.tsb.most.biz.service.multidb;

import java.util.List;

import com.tsb.most.biz.dao.multidb.IBwctDraftSurvayDao;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.exception.BizException;

public class BwctDraftSurvayService extends MOSTBaseService implements IBwctDraftSurvayService {
	private IBwctDraftSurvayDao bwctDraftSurvayDao;
	
	public void setBwctDraftSurvayDao(IBwctDraftSurvayDao bwctDraftSurvayDao) {
		this.bwctDraftSurvayDao = bwctDraftSurvayDao;
	}

	public List selectDraftSurvayList(SearchShippingNoteParm parm) throws BizException {
		return bwctDraftSurvayDao.selectDrafSurvayList(parm);
	}
	
}
