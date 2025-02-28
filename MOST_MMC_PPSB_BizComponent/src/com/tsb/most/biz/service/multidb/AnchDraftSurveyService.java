package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IAnchDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AnchDraftSurveyService extends MOSTBaseService implements IAnchDraftSurveyService {
	private IAnchDraftSurveyDao anchDraftSurveyDao;

	public void setAnchDraftSurveyDao(IAnchDraftSurveyDao anchDraftSurveyDao) {
		this.anchDraftSurveyDao = anchDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return anchDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return anchDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return anchDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return anchDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return anchDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return anchDraftSurveyDao.updateItems(parm);
	}

}
