package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.parm.billing.SearchTariffCodeStorageDayParm;
import com.tsb.most.biz.parm.billing.SearchTariffServiceOrderGatheredParm;
import com.tsb.most.biz.parm.billing.SearchTariffcodeGeneratorParm;
import com.tsb.most.common.util.BranchCodeSetting;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;;

public class TariffCodeGeneratorDao extends BaseDao implements ITariffCodeGeneratorDao {


	public String selectParnerTariffRate(TariffCodeGatheredItem parm) throws DaoException {
		return (String) unifiedDao.readOne("tariffCodeGenerator.selectParnerTariffRate", parm);
	}

	public String selectStandardTariffRate(TariffCodeGatheredItem parm) throws DaoException {
		return (String) unifiedDao.readOne("tariffCodeGenerator.selectStandardTariffRate", parm);
	}

	public DataItemList selectTariffCodeType(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTariffCodeType", parm);
	}

	public DataItemList selectTariffCodelist(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTariffCodelist", parm);
	}

	public DataItemList selectTrfCondPrpt(TariffCodeGatheredItem item) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTrfCondPrpt", item);
	}

	public DataItemList selectTrfPayerList(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTrfPayerList", parm);
	}
	
	public DataItemList selectGenerateVesselScheduleList(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateVesselScheduleList", parm);
	}
	
	//DOCKAGE CHARGE
	public DataItemList selectGenerateVesselDockageCharge(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateVesselDockageCharge", parm);
	}
	
	public DataItemList selectDelayHrsForDockageCharge(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectDelayHrsForDockageCharge", parm);
	}
	
	//HANDLING GOODS
	public DataItemList selectGenerateHandlingGoodsItems(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateHandlingGoodsItems", parm);
	}
	
	public DataItemList selectGenerateCargolist(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateCargolist", parm);
	}

	public DataItemList selectGenerateCargoForProformaExportList(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateCargoForProformaExportList", parm);
	}

	public DataItemList selectGenerateCargoForProformaImportList(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateCargoForProformaImportList", parm);
	}

	public DataItemList selectGenerateRoroList(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateRoroList", parm);
	}

	public DataItemList selectGenerateRoroPortHadlingList(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateRoroPortHadlingList", parm);
	}

	public DataItemList selectGenerateRoroForProformaImportList(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateRoroForProformaImportList", parm);
	}

	public DataItemList selectGenerateRoroForProformaExportList(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateRoroForProformaExportList", parm);
	}

	public DataItemList selectInvoiceItemsForDataGathering(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectInvoiceItemsForDataGathering", parm);
	}

	public DataItemList selectInvoiceItemsForProformalist(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectInvoiceItemsForProformalist", parm);
	}

	public DataItemList selectInvoiceItemsForServiceOrder(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectInvoiceItemsForServiceOrder", parm);
	}

	public DataItemList selectGenerateServiceOrderCreditList(SearchTariffServiceOrderGatheredParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateServiceOrderCreditList", parm);
	}

	public DataItemList selectReconcileVerifyChk(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectReconcileVerifyChk", parm);
	}

	public DataItemList selectGeneratePortHandling(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGeneratePortHandling", parm);
	}

	public void insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		unifiedDao.insertItems(null, "tariffCodeGenerator.insertItems", insertItems);
	}

	public void deleteItem(DeleteItemsBizParm parm) throws DaoException {
		try {

			unifiedDao.deleteItems(null, "tariffCodeGenerator.deleteItem", parm.getDeleteItems());

		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	// MMC - Settlement
	public DataItemList selectTariffCodelistForCalculationProforma(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTariffCodelistForCalculationProforma", parm);
	}

	public DataItemList selectTargetROROStorageProformaCalculation(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetROROStorageProformaCalculation", parm);
	}

	/**
	 * Purpose: Get target cargo of Over storage for Proforma Invoice when User
	 * action Calculation Button. Category: IMPORT DelvMode: Indirect
	 */
	@Override
	public DataItemList selectGenerateOverStorageForCalculateProformalist(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateOverStorageForCalculateProformalist", parm);
	}

	public DataItemList selectFreeStorageDays(SearchTariffCodeStorageDayParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectFreeStorageDays", parm);
	}

	public DataItemList selectOverStorageInvoiceItemsForProformalist(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectOverStorageInvoiceItemsForProformalist", parm);
	}

	public DataItemList selectStorageDays(SearchTariffCodeStorageDayParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectStorageDays", parm);
	}

	public DataItemList selectPartnerTrfRateInfo(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectPartnerTrfRateInfo", parm);
	}

	public DataItemList selectTargetROROPortHandlingProformaCalculation(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetROROPortHandlingProformaCalculation", parm);
	}

	/**
	 * Purpose: Get target cargo for Proforma Invoice Category: IMPORT DelvMode:
	 * Both (Direct)
	 */
	@Override
	public DataItemList selectGenerateCargoForProformaList(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateCargoForProformaList", parm);
	}

	public DataItemList selectTargetDocumentProcessingProforma(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetDocumentProcessingProforma", parm);
	}

	public DataItemList selectTargetDocumentProcessingCharge(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetDocumentProcessingCharge", parm);
	}

	public DataItemList selectExistedDocumentCharge(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectExistedDocumentCharge", parm);
	}

	public DataItemList selectGatheredPortHandlingForDPC(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGatheredPortHandlingForDPC", parm);
	}

	@Override
	public DataItemList selectGenerateServiceOrderForCalculateProformaList(SearchTariffServiceOrderGatheredParm parm)
			throws DaoException {
		String branchCode = BranchCodeSetting.getInstance().getBranchCode();
		parm.setBranchCode(branchCode);
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateServiceOrderForCalculateProformaList", parm);
	}

	public DataItemList selectTargetROROStorageProformaSettlement(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetROROStorageProformaSettlement", parm);
	}

	/**
	 * Purpose: Get target cargo of Over storage for Proforma Invoice when User
	 * action Settlement Button. Category: IMPORT DelvMode: Indirect
	 */
	@Override
	public DataItemList selectGenerateOverStorageForSettlementProformalist(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateOverStorageForSettlementProformalist", parm);
	}

	public DataItemList selectTargetROROPortHandlingProformaSettlement(SearchTariffcodeGeneratorParm parm)
			throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectTargetROROPortHandlingProformaSettlement", parm);
	}

	/**
	 * Purpose: Get target cargo for Handling Goods, Stevedore Carge Category:
	 * IMPORT, Export DelvMode: Direct, InDirect
	 */
	public DataItemList selectGenerateHGandSTchargelist(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateHGandSTchargelist", parm);
	}

	@Override
	public DataItemList selectGenerateServiceOrderForSettlementProformaList(SearchTariffServiceOrderGatheredParm parm)
			throws DaoException {
		String branchCode = BranchCodeSetting.getInstance().getBranchCode();
		parm.setBranchCode(branchCode);
		return unifiedDao.getItems("tariffCodeGenerator.selectGenerateServiceOrderForSettlementProformaList", parm);
	}

	public DataItemList selectInvoiceDataItems(SearchTariffcodeGeneratorParm parm) throws DaoException {
		return unifiedDao.getItems("tariffCodeGenerator.selectInvoiceDataItems", parm);
	}
}
