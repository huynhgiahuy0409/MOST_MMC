package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IBwctDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BwctDraftSurveyService extends MOSTBaseService implements IBwctDraftSurveyService {
	private IBwctDraftSurveyDao bwctDraftSurveyDao;

	public void setBwctDraftSurveyDao(IBwctDraftSurveyDao bwctDraftSurveyDao) {
		this.bwctDraftSurveyDao = bwctDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return bwctDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return bwctDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return bwctDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return bwctDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return bwctDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return bwctDraftSurveyDao.updateItems(parm);
	}

}
