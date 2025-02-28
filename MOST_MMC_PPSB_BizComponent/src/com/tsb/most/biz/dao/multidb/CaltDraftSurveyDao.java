package com.tsb.most.biz.dao.multidb;

import com.tsb.most.biz.dataitem.operation.VesselDraftSurveyItem;
import com.tsb.most.biz.parm.operation.SearchVesselDraftSurveyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CaltDraftSurveyDao extends BaseDao implements ICaltDraftSurveyDao {

	@Override
	public DataItemList getDocumentItems(SearchVesselDraftSurveyParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("draftSurveyCalt.selectDocumentItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItem getSummaryDocumentForTerminals(SearchVesselDraftSurveyParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("draftSurveyCalt.selectSummaryDocumentForTerminals", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try {
			VesselDraftSurveyItem vslDraftSurvey = (VesselDraftSurveyItem) parm.getInsertItem();
			DataItemList vslDraftSurveyDtls = parm.getInsertItems();

			setNewVersion(vslDraftSurveyDtls);
			setNewVersion(vslDraftSurvey);
			unifiedDao.insertItem(null, "draftSurveyCalt.insertVslDraftSurvey", vslDraftSurvey);
			unifiedDao.insertItems(null, "draftSurveyCalt.insertVslDraftSurveyDtls", vslDraftSurveyDtls);
			setVersion(vslDraftSurvey);

			DataItemList returnList = new DataItemList();
			returnList.add(vslDraftSurvey);

			return returnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "draftSurveyCalt.deleteVslDraftSurveyItem", deleteItems);
			setVersion(deleteItems);
			return deleteItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList checkIfReconcileStatusIsVerified(SearchVesselDraftSurveyParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("draftSurveyCalt.checkIfReconcileStatusIsVerified", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			VesselDraftSurveyItem vslDraftSurvey = (VesselDraftSurveyItem) parm.getUpdateItem();
			DataItemList vslDraftSurveyDtls = parm.getUpdateItems();

			setNewVersion(vslDraftSurveyDtls);
			setNewVersion(vslDraftSurvey);
			unifiedDao.updateItem(null, "draftSurveyCalt.updateVslDraftSurvey", vslDraftSurvey);
			unifiedDao.updateItems(null, "draftSurveyCalt.updateVslDraftSurveyDtls", vslDraftSurveyDtls);
			setVersion(vslDraftSurvey);

			DataItemList returnList = new DataItemList();
			returnList.add(vslDraftSurvey);

			return returnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
