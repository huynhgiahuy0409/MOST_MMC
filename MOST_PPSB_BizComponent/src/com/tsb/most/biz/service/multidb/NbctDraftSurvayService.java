package com.tsb.most.biz.service.multidb;

import java.util.List;

import com.tsb.most.biz.dao.multidb.INbctDraftSurvayDao;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.exception.BizException;

public class NbctDraftSurvayService extends MOSTBaseService implements INbctDraftSurvayService {
	private INbctDraftSurvayDao nbctDraftSurvayDao;

	public void setNbctDraftSurvayDao(INbctDraftSurvayDao nbctDraftSurvayDao) {
		this.nbctDraftSurvayDao = nbctDraftSurvayDao;
	}

	public List selectDraftSurvayList(SearchShippingNoteParm parm) throws BizException {
		return nbctDraftSurvayDao.selectDrafSurvayList(parm);
	}
	
}
