package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.billing.IPackageTariffRateDao;
import com.tsb.most.biz.dao.billing.IPartnerTariffRateDao;
import com.tsb.most.biz.dao.billing.ITariffCodeDao;
import com.tsb.most.biz.dataitem.billing.PackageConditionItem;
import com.tsb.most.biz.dataitem.billing.PackageConditionPropertyItem;
import com.tsb.most.biz.dataitem.billing.PackageTariffRateItem;
import com.tsb.most.biz.dataitem.billing.PartnerConditionItem;
import com.tsb.most.biz.dataitem.billing.PartnerConditionPropertyItem;
import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPackageTariffRateParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.common.util.StringConverter;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class PackageTariffRate extends MOSTBaseService implements IPackageTariffRate {
	private IPackageTariffRateDao packageTariffRateDao;
	private ITariffCodeDao tariffCodeDao;
	private ICodeMasterDao codeMasterDao;

	public void setTariffCodeDao(ITariffCodeDao tariffCodeDao) {
		this.tariffCodeDao = tariffCodeDao;
	}

	public void setPackageTariffRateDao(IPackageTariffRateDao packageTariffRateDao) {
		this.packageTariffRateDao = packageTariffRateDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public DataItemList selectBerthList(SearchPackageTariffRateParm parm) throws BizException {
		return packageTariffRateDao.selectBerthList(parm);
	}

	public DataItemList selectPackageTariffRate(SearchPackageTariffRateParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		PackageTariffRateItem returnItem = new PackageTariffRateItem();
		ArrayList<PackageTariffRateItem> pkgSum = (ArrayList<PackageTariffRateItem>) packageTariffRateDao
				.selectPackageTariffRateSummary(parm).getCollection();
		ArrayList<PackageTariffRateItem> pkgRate = (ArrayList<PackageTariffRateItem>) packageTariffRateDao
				.selectPackageTariffRate(parm).getCollection();
		ArrayList<PackageConditionItem> cond = (ArrayList<PackageConditionItem>) packageTariffRateDao
				.selectPackageConditionList(parm).getCollection();
		ArrayList<PackageConditionPropertyItem> prpt = (ArrayList<PackageConditionPropertyItem>) packageTariffRateDao
				.selectPackageConditionPropertyList(parm).getCollection();

		for (Iterator<PackageTariffRateItem> it = pkgSum.iterator(); it.hasNext();) {
			PackageTariffRateItem rate = (PackageTariffRateItem) it.next();
			String vessels = "";

			for (Iterator<PackageConditionItem> subIt = cond.iterator(); subIt.hasNext();) {
				PackageConditionItem condition = (PackageConditionItem) subIt.next();
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("P1")
						&& condition.getChrVal() != null) {
					if (vessels.length() == 0) {
						vessels = condition.getChrVal();
					} else {
						vessels = vessels.concat("," + condition.getChrVal());
					}
				}
			}
			rate.setVessels(vessels);
		}

		returnItem.setSumList(pkgSum);
		returnItem.setPackTrfList(pkgRate);
		returnItem.setPrptList(prpt);
		returnItem.setCondsList(cond);

		returnList.add(returnItem);
		return returnList;
	}

	public DataItemList selectPackageTariffRateDetailList(SearchPackageTariffRateParm param) throws BizException {
		PackageTariffRateItem returnItem = new PackageTariffRateItem();
		DataItemList ptnrItemList = new DataItemList();

		ArrayList<PackageTariffRateItem> pkgSum = (ArrayList<PackageTariffRateItem>) packageTariffRateDao
				.selectPackageTariffRateSummary(param).getCollection();
		ArrayList<PackageTariffRateItem> pkgRate = (ArrayList<PackageTariffRateItem>) packageTariffRateDao
				.selectPackageTariffRate(param).getCollection();
		ArrayList<PackageConditionPropertyItem> prpt = (ArrayList<PackageConditionPropertyItem>) packageTariffRateDao
				.selectPackageConditionPropertyList(param).getCollection();
		ArrayList<PackageConditionItem> cond = (ArrayList<PackageConditionItem>) packageTariffRateDao
				.selectPackageConditionList(param).getCollection();

		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		partyCode.setLcd(CodeConstant.LCD_MOST);
		partyCode.setMcd(CodeConstant.MCD_MT_CGTP);
		DataItemList arrService = codeMasterDao.selectCodeMasterSmallCodeList((partyCode));

		boolean chkLOA = true;

		for (Iterator<PackageTariffRateItem> it = pkgSum.iterator(); it.hasNext();) {
			PackageTariffRateItem rate = (PackageTariffRateItem) it.next();
			String vessels = "";
			for (Iterator<PackageConditionItem> subIt = cond.iterator(); subIt.hasNext();) {
				PackageConditionItem condition = (PackageConditionItem) subIt.next();

				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("P1")
						&& condition.getChrVal() != null) {
					if (vessels.length() == 0) {
						vessels = condition.getChrVal();
					} else {
						vessels = vessels.concat("," + condition.getChrVal());
					}
				}
			}
			rate.setVessels(vessels);
		}

		returnItem.setSumList(pkgSum);
		returnItem.setPackTrfList(pkgRate);
		returnItem.setPrptList(prpt);
		returnItem.setCondsList(cond);

		List<PackageTariffRateItem> returnItems = new ArrayList<PackageTariffRateItem>();
		returnItems.add(returnItem);
		return ptnrItemList;
	}

	public DataItemList updatePartnerTariffRate(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		PartnerTariffRateItem col = (PartnerTariffRateItem) items.get(0);
		List pkgRateList = col.getPkgRate();
		Object[] pkgRateCopyList = pkgRateList.toArray();

		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		DataItemList updateResult = new DataItemList();
		DataItemList insertItemsCollection = new DataItemList();
		FileUploadItem fileUploadItem = new FileUploadItem();

		for (Object obj : pkgRateCopyList) {
			PartnerTariffRateItem item = (PartnerTariffRateItem) obj;

			if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertItemsCollection.add(item);
				pkgRateList.remove(item);
			}
		}

		if (!pkgRateList.isEmpty()) {
			updateResult.setCollection(pkgRateList);
			parm.setUpdateItems(updateResult);
			updateResult = packageTariffRateDao.updatePackageTariffRates(parm);
		}

		if (!insertItemsCollection.getCollection().isEmpty()) {
			for (int i = 0; i < insertItemsCollection.getCollection().size(); i++) {

				String maxPkgNoStr = packageTariffRateDao.selectMaxPkgNo("");
				maxPkgNoStr = maxPkgNoStr.substring(5, 11);
				Integer maxPkgNo;

				if (maxPkgNoStr == null) {
					maxPkgNo = new Integer(0);
				} else {
					try {
						maxPkgNo = new Integer(maxPkgNoStr);
					} catch (Exception e) {
						maxPkgNo = new Integer(0);
					}
				}

				String maxTrfRegNo = tariffCodeDao.selectMaxTrfRegNo(null);

				Integer maxTempTrfRegNo = Integer.parseInt(maxTrfRegNo);

				Calendar cal = Calendar.getInstance();
				int month = cal.get(Calendar.MONTH) + 1;
				int year = cal.get(Calendar.YEAR);

				List<PartnerTariffRateItem> tempList = insertItemsCollection.getCollection();

				for (PartnerTariffRateItem temp : tempList) {
					maxTempTrfRegNo += 1;
					String newTrfRegNo = "TRF" + year + StringConverter.formatNumString(Integer.toString(month), 2)
							+ StringConverter.formatNumString(maxTempTrfRegNo.toString(), 7);
					temp.setTrfRegNo(newTrfRegNo);
				}
			}
			insertItems.setInsertItems(insertItemsCollection);
			packageTariffRateDao.insertPackageTariffRates(insertItems);
		}
		return items;
	}

	public void deletePackageTariffRate(DeleteItemsBizParm parm) throws BizException {
		PackageTariffRateItem col = (PackageTariffRateItem) parm.getDeleteItems().get(0);

		packageTariffRateDao.deletePackageTariffRates(parm);
		packageTariffRateDao.deleteAllPackageCondition(col);
		packageTariffRateDao.deleteAllPackageConditionProperty(col);
	}

	public void deletePackageTariffRateDetail(DeleteItemsBizParm parm) throws BizException {
		PackageTariffRateItem col = (PackageTariffRateItem) parm.getDeleteItems().get(0);

		packageTariffRateDao.deletePackageTariffRates(parm);
		packageTariffRateDao.deleteAllPackageCondition(col);
		packageTariffRateDao.deleteAllPackageConditionProperty(col);
	}

	@Override
	public DataItemList cudPackageTariffRates(InsertItemsBizParm param) throws BizException {
		PackageTariffRateItem returnItem = new PackageTariffRateItem();
		PackageTariffRateItem packageTariffRateItem = (PackageTariffRateItem) param.getInsertItems().get(0);
		String userId = "";
		ArrayList<PackageTariffRateItem> packTrfList = packageTariffRateItem.getPackTrfList();
		SearchPackageTariffRateParm condParm = new SearchPackageTariffRateParm();

		DataItemList insertPkgTrfList = new DataItemList();
		DataItemList updatePkgTrfList = new DataItemList();
		DataItemList deletePkgTrfList = new DataItemList();
		boolean itemExisted = false;
		int deleteCount = 0;

		for (Iterator<PackageTariffRateItem> it = packTrfList.iterator(); it.hasNext() && !itemExisted;) {
			PackageTariffRateItem item = it.next();
			if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertPkgTrfList.add(item);
			} else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				if (returnItem.getPkgTrfNo() == null)
					returnItem.setPkgTrfNo(item.getPkgTrfNo());
				updatePkgTrfList.add(item);
			} else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
				deletePkgTrfList.add(item);
				deleteCount++;
			}
		}
		// Package Tariff Rates
		if (deletePkgTrfList.size() > 0) {
			DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
			deleteItems.addDeleteItem(deletePkgTrfList);
			packageTariffRateDao.deletePackageTariffRates(deleteItems);
		}

		if (updatePkgTrfList.size() > 0) {
			UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
			updateItems.addUpdateItem(updatePkgTrfList);
			packageTariffRateDao.updatePackageTariffRates(updateItems);
		}

		if (insertPkgTrfList.size() > 0) {
			// getMaxPkgNo
			String maxPkgTrfNoStr = packageTariffRateDao.selectMaxPkgNo("");
			maxPkgTrfNoStr = maxPkgTrfNoStr.substring(5, 11);
			Integer maxPkgTrfNoInt;
			if (maxPkgTrfNoStr == null) {
				maxPkgTrfNoInt = new Integer(0);
			} else {
				try {
					maxPkgTrfNoInt = new Integer(maxPkgTrfNoStr);
				} catch (Exception e) {
					maxPkgTrfNoInt = new Integer(0);
				}
			}
			// getMaxTrfRegNo
			String maxTrfRegNoStr = tariffCodeDao.selectMaxTrfRegNo(null);
			Integer maxTrfRegNoInt = 0;
			if (maxTrfRegNoStr == null) {
				maxTrfRegNoInt = new Integer(0);
			} else {
				try {
					maxTrfRegNoInt = new Integer(maxTrfRegNoStr);
				} catch (Exception e) {
					maxTrfRegNoInt = new Integer(0);
				}
			}

			Calendar calendar = Calendar.getInstance();
			int month = calendar.get(Calendar.MONTH) + 1;
			int year = calendar.get(Calendar.YEAR);

			for (Iterator<PackageTariffRateItem> it = insertPkgTrfList.getCollection().iterator(); it.hasNext();) {
				// setPkgTrfNo
				PackageTariffRateItem item = it.next();
				if (item.getPkgTrfNo().equals("")) {
					String newPkgTrfNo = maxPkgTrfNoInt.toString();
					while (newPkgTrfNo.length() != 7) {
						newPkgTrfNo = "0".concat(newPkgTrfNo);
					}
					newPkgTrfNo = "PKG_" + newPkgTrfNo;
					item.setPkgTrfNo(newPkgTrfNo);
				}

				// setTrfRegNo
				maxTrfRegNoInt += 1;
				String newTrfRegNo = "TRF" + year + StringConverter.formatNumString(Integer.toString(month), 2)
						+ StringConverter.formatNumString(maxTrfRegNoInt.toString(), 7);
				;
				item.setTrfRegNo(newTrfRegNo);
				if (returnItem.getPkgTrfNo() == null) {
					returnItem.setPkgTrfNo(item.getPkgTrfNo());
				}
			}
			InsertItemsBizParm insertItems = new InsertItemsBizParm();
			insertItems.addInsertItem(insertPkgTrfList);
			packageTariffRateDao.insertPackageTariffRates(insertItems);
		}

		// Package Tariff Rates Conditions
		ArrayList<PackageConditionItem> condsList = packageTariffRateItem.getCondsList();
		DataItemList insertPkgTrfCondList = new DataItemList();
		DataItemList updatePkgTrfCondList = new DataItemList();
		DataItemList deletePkgTrfCondList = new DataItemList();

		for (Iterator<PackageConditionItem> it = condsList.iterator(); it.hasNext();) {
			PackageConditionItem conditionItem = it.next();
			if (conditionItem.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertPkgTrfCondList.add(conditionItem);
			} else if (conditionItem.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				updatePkgTrfCondList.add(conditionItem);
			} else if (conditionItem.getWorkingStatus().equals(DAOProcessType.DELETE)) {
				deletePkgTrfCondList.add(conditionItem);
			}

		}

		if (insertPkgTrfCondList.size() > 0) {
			for (Iterator<PackageConditionItem> it = insertPkgTrfCondList.getCollection().iterator(); it.hasNext();) {
				PackageConditionItem temp = it.next();
				if (!returnItem.getPkgTrfNo().equals("") || returnItem.getPkgTrfNo() == null)
					temp.setAgreNo(returnItem.getPkgTrfNo());
				else {
					temp.setAgreNo(packageTariffRateItem.getPkgTrfNo());
				}
			}
			if (returnItem.getPkgTrfNo() == null)
				returnItem.setPkgTrfNo(packageTariffRateItem.getPkgTrfNo());
			packageTariffRateDao.deleteAllPackageCondition(returnItem);
			InsertItemsBizParm insertCondition = new InsertItemsBizParm();
			insertCondition.addInsertItem(insertPkgTrfCondList);
			packageTariffRateDao.insertPackageConditions(insertCondition);
		}

		// Package Tariff Rates Conditions Properties
		ArrayList<PackageConditionPropertyItem> prptList = packageTariffRateItem.getPrptList();
		DataItemList insertPkgTrfPrptList = new DataItemList();
		DataItemList deletePkgTrfPrptList = new DataItemList();
		for (Iterator<PackageConditionPropertyItem> it = prptList.iterator(); it.hasNext();) {
			PackageConditionPropertyItem prptItem = it.next();
			if (prptItem.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertPkgTrfPrptList.add(prptItem);
			} else if (prptItem.getWorkingStatus().equals(DAOProcessType.DELETE)) {
				deletePkgTrfPrptList.add(prptItem);
			}
		}

		if (insertPkgTrfPrptList.size() > 0) {
			for (Iterator<PackageConditionPropertyItem> it = insertPkgTrfPrptList.getCollection().iterator(); it
					.hasNext();) {
				PackageConditionPropertyItem item = it.next();
				if (returnItem.getPkgTrfNo() != null) {
					item.setAgreNo(returnItem.getPkgTrfNo());
				} else {
					item.setAgreNo(packageTariffRateItem.getPkgTrfNo());
				}
			}
			if (returnItem.getPkgTrfNo() == null) {
				returnItem.setPkgTrfNo(packageTariffRateItem.getPkgTrfNo());
			}
			packageTariffRateDao.deleteAllPackageConditionProperty(returnItem);
			InsertItemsBizParm insertPrpt = new InsertItemsBizParm();
			insertPrpt.addInsertItem(insertPkgTrfPrptList);
			packageTariffRateDao.insertPackagerConditionProperties(insertPrpt);
		}
		DataItemList returnList = new DataItemList();
		returnList.add(returnItem);
		return returnList;
	}

}
