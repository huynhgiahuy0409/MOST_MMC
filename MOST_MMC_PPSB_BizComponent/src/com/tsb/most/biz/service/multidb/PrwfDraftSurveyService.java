package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IPrwfDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class PrwfDraftSurveyService extends MOSTBaseService implements IPrwfDraftSurveyService {
	private IPrwfDraftSurveyDao prwfDraftSurveyDao;

	public void setPrwfDraftSurveyDao(IPrwfDraftSurveyDao prwfDraftSurveyDao) {
		this.prwfDraftSurveyDao = prwfDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return prwfDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return prwfDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return prwfDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return prwfDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return prwfDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return prwfDraftSurveyDao.updateItems(parm);
	}
}
