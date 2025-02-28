package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IFeryDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class FeryDraftSurveyService extends MOSTBaseService implements IFeryDraftSurveyService {
	private IFeryDraftSurveyDao feryDraftSurveyDao;

	public void setFeryDraftSurveyDao(IFeryDraftSurveyDao feryDraftSurveyDao) {
		this.feryDraftSurveyDao = feryDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return feryDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return feryDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return feryDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return feryDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return feryDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return feryDraftSurveyDao.updateItems(parm);
	}
}
