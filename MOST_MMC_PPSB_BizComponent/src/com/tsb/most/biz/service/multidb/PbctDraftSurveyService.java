package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.IPbctDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class PbctDraftSurveyService extends MOSTBaseService implements IPbctDraftSurveyService {
	private IPbctDraftSurveyDao pbctDraftSurveyDao;

	public void setPbctDraftSurveyDao(IPbctDraftSurveyDao pbctDraftSurveyDao) {
		this.pbctDraftSurveyDao = pbctDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return pbctDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return pbctDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return pbctDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return pbctDraftSurveyDao.deleteItems(parm);
	}
	
	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return pbctDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return pbctDraftSurveyDao.updateItems(parm);
	}
}
