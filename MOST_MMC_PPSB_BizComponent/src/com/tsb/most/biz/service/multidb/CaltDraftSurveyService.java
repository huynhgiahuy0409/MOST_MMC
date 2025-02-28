package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.dao.multidb.ICaltDraftSurveyDao;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CaltDraftSurveyService extends MOSTBaseService implements ICaltDraftSurveyService {
	private ICaltDraftSurveyDao caltDraftSurveyDao;

	public void setCaltDraftSurveyDao(ICaltDraftSurveyDao caltDraftSurveyDao) {
		this.caltDraftSurveyDao = caltDraftSurveyDao;
	}

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException {
		return caltDraftSurveyDao.getDocumentItems(parm);
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException {
		return caltDraftSurveyDao.getSummaryDocumentForTerminals(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return caltDraftSurveyDao.insertItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return caltDraftSurveyDao.deleteItems(parm);
	}

	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException {
		return caltDraftSurveyDao.checkIfReconcileStatusIsVerified(parm);
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return caltDraftSurveyDao.updateItems(parm);
	}
}
