package com.tsb.most.biz.dao.multidb;

import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICaltDraftSurveyDao {
	
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws DaoException;

	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws DaoException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;

	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws DaoException;

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
}
