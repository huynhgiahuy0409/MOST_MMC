package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.DataGatheringItem;
import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
														  
public class DataGatheringDao extends BaseDao implements IDataGatheringDao {

	public DataItemList selectDataGathering(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectDataGathering", parm);
	}

	public DataItemList selectDataGatheringDetail(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectDataGatheringDetail", parm);
	}

	public DataItemList selectGatheredData(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectGatheredData", parm);
	}

	public DataItemList selectVesselInformation(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectVesselInformation", parm);
	}

	public DataItemList selectCargoInformation(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectCargoInformation", parm);
	}

	public DataItemList selectCargoSumInformation(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectCargoSumInformation", parm);
	}

	public DataItemList selectEquipmentInformation(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectEquipmentInformation", parm);
	}

	public DataItemList selectPayerData(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectPayerData", parm);
	}
	
	public DataItemList selectValidVslSchedule(SearchDataGatheringParm parm) throws DaoException {
		return unifiedDao.getItems("dataGathering.selectValidVslSchedule", parm);
	}
	
	public DataItemList applyDataGatheringDetail(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		
		setNewVersion(updateItems);	
		unifiedDao.updateItems(null,"dataGathering.applyDataGatheringDetail", updateItems);
		setVersion(updateItems);			
		
		return updateItems;
		
	}

	public void applyGatheredDelete(DeleteItemsBizParm parm) throws DaoException {
		DataGatheringItem item = (DataGatheringItem) parm.getDataItem();
		unifiedDao.deleteItemWithTimeCheck(parm.getTxTraceinfo(), "dataGathering.applyGatheredDelete", item);
	}

	public void applyGatheredDeleteDetail(DeleteItemsBizParm parm) throws DaoException {
		DataGatheringItem item = (DataGatheringItem) parm.getDataItem();
		unifiedDao.deleteItemWithTimeCheck(parm.getTxTraceinfo(), "dataGathering.applyGatheredDtlDelete", item);
	}
	
}