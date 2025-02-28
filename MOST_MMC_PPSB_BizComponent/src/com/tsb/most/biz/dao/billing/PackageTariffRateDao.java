package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.PackageTariffRateItem;
import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPackageTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class PackageTariffRateDao extends BaseDao implements IPackageTariffRateDao {
	public DataItemList selectPackageTariffRate(SearchPackageTariffRateParm param) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectPackageTariffRate", param);
	}

	public DataItemList selectPackageConditionList(SearchPackageTariffRateParm param) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectPackageConditionList", param);
	}

	public DataItemList selectPackageConditionPropertyList(SearchPackageTariffRateParm param) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectPackageConditionPropertyList", param);
	}
	//sMantis
	public DataItemList selectPackageTariffRateSummary(SearchPackageTariffRateParm parm) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectPackageTariffRateSummary", parm);
	}

	public DataItemList selectBerthList(SearchPackageTariffRateParm param) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectBerthList", param);
	}

	public DataItemList selectCurrentPartnerTariffRate(SearchPackageTariffRateParm parm) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectCurrentPartnerTariffRate", parm);
	}

	public DataItemList selectPrptCDList(SearchPackageTariffRateParm parm) throws DaoException {
		return unifiedDao.getItems("packageTariffRate.selectPrptCDList", parm);
	}

	public String selectMaxPkgNo(String parm) throws DaoException {
		return (String) unifiedDao.readOne("packageTariffRate.selectMaxPkgNo", parm);
	}

	public DataItemList insertPackageTariffRates(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);

			unifiedDao.insertItems(null, "packageTariffRate.insertPackageTariffRate", insertItems);

			setVersion(insertItems);

			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList insertPackageConditions(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = (DataItemList) parm.getInsertItems();
			setNewVersion(insertItems);

			unifiedDao.insertItems(null, "packageTariffRate.insertPackageTariffRateCondition", insertItems);

			setVersion(insertItems);

			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList insertPackagerConditionProperties(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);

			unifiedDao.insertItems(null, "packageTariffRate.insertPackageConditionProperty", insertItems);

			setVersion(insertItems);

			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList updatePackageTariffRates(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);

			unifiedDao.insertItems(null, "packageTariffRate.updatePackageTariffRate", updateItems);

			setVersion(updateItems);

			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}

	}

	public DataItemList deletePackageTariffRates(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();

			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "packageTariffRate.deletePackageTariffRates", deleteItems);
			setVersion(deleteItems);

			return deleteItems;

		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}

	public void deleteAllPackageCondition(PackageTariffRateItem item) throws DaoException {
		unifiedDao.deleteItem(null, "packageTariffRate.deleteAllPackageCondition", item);
	}

	public void deleteAllPackageConditionProperty(PackageTariffRateItem item) throws DaoException {
		unifiedDao.deleteItem(null, "packageTariffRate.deleteAllPackageConditionProperty", item);

	}
}
