package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselDraftSurveyDao extends BaseDao implements IVesselDraftSurveyDao {

	@Override
	public DataItemList getVesselDraftSurveyList(SearchVesselDraftSurveyParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("vesselDraftSurvey.selectVesselDraftSurveyList", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList getVesselDraftSurveyDetailList(SearchVesselDraftSurveyParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("vesselDraftSurvey.selectVesselDraftSurveyDetail", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteTariffCode(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();

			setNewVersion(deleteItems);
			unifiedDao.updateItems(null, "vesselDraftSurvey.deleteVesselDraftSurveyItem", deleteItems);
			setVersion(deleteItems);

			return deleteItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

}
