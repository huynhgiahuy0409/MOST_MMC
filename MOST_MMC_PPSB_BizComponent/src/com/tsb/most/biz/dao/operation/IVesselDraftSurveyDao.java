package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselDraftSurveyDao {
	public DataItemList getVesselDraftSurveyList(SearchVesselDraftSurveyParm parm) throws DaoException;

	public DataItemList getVesselDraftSurveyDetailList(SearchVesselDraftSurveyParm parm) throws DaoException;

	public DataItemList deleteTariffCode(DeleteItemsBizParm parm) throws DaoException;
}
