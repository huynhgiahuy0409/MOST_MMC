package com.tsb.most.biz.service.multidb;

import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IEssoDraftSurveyService {
	public DataItem getDocumentItems(SearchVesselDraftSurveyParm parm) throws BizException;

	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws BizException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;

	DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws BizException;

	DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
