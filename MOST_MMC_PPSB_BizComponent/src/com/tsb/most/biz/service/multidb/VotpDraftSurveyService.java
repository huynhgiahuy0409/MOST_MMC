package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IVotpDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VotpDraftSurveyService extends MOSTBaseService implements IVotpDraftSurveyService {
	private IVotpDraftSurveyDao votpDraftSurveyDao;

	public void setVotpDraftSurveyDao(IVotpDraftSurveyDao votpDraftSurveyDao) {
		this.votpDraftSurveyDao = votpDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return votpDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return votpDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return votpDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return votpDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return votpDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return votpDraftSurveyDao.updateItems(parm);
	}
}
