package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.PackageTariffRateItem;
import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPackageTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IPackageTariffRateDao {
	public DataItemList selectPackageTariffRate(SearchPackageTariffRateParm param) throws DaoException;

	public DataItemList selectPackageConditionList(SearchPackageTariffRateParm param) throws DaoException;

	public DataItemList selectPackageConditionPropertyList(SearchPackageTariffRateParm param) throws DaoException;
	//sMantis
	public DataItemList selectPackageTariffRateSummary(SearchPackageTariffRateParm parm) throws DaoException;

	public DataItemList selectBerthList(SearchPackageTariffRateParm param) throws DaoException;

	public DataItemList selectCurrentPartnerTariffRate(SearchPackageTariffRateParm parm) throws DaoException;

	public DataItemList selectPrptCDList(SearchPackageTariffRateParm parm) throws DaoException;

	public String selectMaxPkgNo(String parm) throws DaoException;

	public DataItemList insertPackageTariffRates(InsertItemsBizParm parm) throws DaoException;

	public DataItemList insertPackageConditions(InsertItemsBizParm parm) throws DaoException;

	public DataItemList insertPackagerConditionProperties(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updatePackageTariffRates(UpdateItemsBizParm parm) throws DaoException;

	public void deleteAllPackageCondition(PackageTariffRateItem item) throws DaoException;

	public void deleteAllPackageConditionProperty(PackageTariffRateItem item) throws DaoException;
	
	//MPTS
	public DataItemList deletePackageTariffRates(DeleteItemsBizParm parm) throws DaoException;

}