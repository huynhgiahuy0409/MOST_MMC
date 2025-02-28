package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselDraftSurvey {
	public DataItemList getVesselDraftSurveyInfo(SearchVesselDraftSurveyParm parm) throws BizException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;

	public DataItemList getVesselDraftSurveyList(SearchVesselDraftSurveyParm parm) throws BizException;

	public DataItemList getVesselDraftSurveyDetailList(SearchVesselDraftSurveyParm parm) throws BizException;

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;

	public DataItemList isValidated(SearchVesselDraftSurveyParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
