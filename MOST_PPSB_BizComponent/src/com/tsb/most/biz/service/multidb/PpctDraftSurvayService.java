package com.tsb.most.biz.service.multidb;

import java.util.List;

import com.tsb.most.biz.dao.multidb.IPpctDraftSurvayDao;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.exception.BizException;

public class PpctDraftSurvayService extends MOSTBaseService implements IPpctDraftSurvayService {
	private IPpctDraftSurvayDao ppctDraftSurvayDao;

	
	public void setPpctDraftSurvayDao(IPpctDraftSurvayDao ppctDraftSurvayDao) {
		this.ppctDraftSurvayDao = ppctDraftSurvayDao;
	}


	public List selectDraftSurvayList(SearchShippingNoteParm parm) throws BizException {
		return ppctDraftSurvayDao.selectDrafSurvayList(parm);
	}
	
}
