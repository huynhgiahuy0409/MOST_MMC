package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.parm.billing.SearchTariffCodeStorageDayParm;
import com.tsb.most.biz.parm.billing.SearchTariffServiceOrderGatheredParm;
import com.tsb.most.biz.parm.billing.SearchTariffcodeGeneratorParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITariffCodeGeneratorDao {
		
	//Tariff code generation & calcuarion
	public String selectParnerTariffRate(TariffCodeGatheredItem parm) throws DaoException;
	public String selectStandardTariffRate(TariffCodeGatheredItem parm) throws DaoException;
	public DataItemList selectTariffCodeType(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTariffCodelist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTrfCondPrpt(TariffCodeGatheredItem item) throws DaoException;
	public DataItemList selectTrfPayerList(SearchTariffcodeGeneratorParm item) throws DaoException;
	
	public DataItemList selectGenerateVesselScheduleList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateHandlingGoodsItems(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateVesselDockageCharge(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectDelayHrsForDockageCharge(SearchTariffcodeGeneratorParm parm) throws DaoException;
	
	public void insertItems(InsertItemsBizParm item) throws DaoException;
	public void deleteItem(DeleteItemsBizParm item) throws DaoException;
	
	//Target Data Gathering 
	public DataItemList selectGenerateCargolist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGeneratePortHandling(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateCargoForProformaImportList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateCargoForProformaExportList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateRoroList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateRoroPortHadlingList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateRoroForProformaImportList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateRoroForProformaExportList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	
	public DataItemList selectGenerateServiceOrderCreditList(SearchTariffServiceOrderGatheredParm parm) throws DaoException;
	
	//Check duplicated
	public DataItemList selectInvoiceItemsForDataGathering(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectInvoiceItemsForProformalist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectInvoiceItemsForServiceOrder(SearchTariffcodeGeneratorParm parm) throws DaoException;
	
	//Check Reconcile
	public DataItemList selectReconcileVerifyChk(SearchTariffcodeGeneratorParm parm) throws DaoException;
	
	//MMC - Settlement
	public DataItemList selectTariffCodelistForCalculationProforma(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTargetROROStorageProformaCalculation(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateOverStorageForCalculateProformalist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectOverStorageInvoiceItemsForProformalist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectFreeStorageDays(SearchTariffCodeStorageDayParm parm) throws DaoException;
	public DataItemList selectStorageDays(SearchTariffCodeStorageDayParm parm) throws DaoException;
	public DataItemList selectPartnerTrfRateInfo(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTargetROROPortHandlingProformaCalculation(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateCargoForProformaList(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTargetDocumentProcessingProforma(SearchTariffcodeGeneratorParm parm) throws DaoException; 
	public DataItemList selectTargetDocumentProcessingCharge(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectExistedDocumentCharge(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGatheredPortHandlingForDPC(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateServiceOrderForCalculateProformaList(SearchTariffServiceOrderGatheredParm parm) throws DaoException;
	public DataItemList selectTargetROROStorageProformaSettlement(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateOverStorageForSettlementProformalist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectTargetROROPortHandlingProformaSettlement(SearchTariffcodeGeneratorParm parm) throws DaoException;
	public DataItemList selectGenerateHGandSTchargelist(SearchTariffcodeGeneratorParm parm) throws DaoException;
	DataItemList selectGenerateServiceOrderForSettlementProformaList(SearchTariffServiceOrderGatheredParm parm) throws DaoException;
	public DataItemList selectInvoiceDataItems(SearchTariffcodeGeneratorParm parm) throws DaoException;
}
