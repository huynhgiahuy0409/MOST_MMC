package com.tsb.most.biz.service.billing;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dataitem.parameters.ParameterSettingItem;
import com.tsb.most.basebiz.parm.parameters.SearchCommonParameterSettingBizParm;
import com.tsb.most.biz.dao.billing.IProformaInvoiceDao;
import com.tsb.most.biz.dao.billing.ITariffCodeGeneratorDao;
import com.tsb.most.biz.dataitem.billing.DataGatheringItem;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.ProformaInvoiceItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeConditionItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.dataitem.billing.TariffCodePayerItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeStroageItem;
import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeStorageDayParm;
import com.tsb.most.biz.parm.billing.SearchTariffServiceOrderGatheredParm;
import com.tsb.most.biz.parm.billing.SearchTariffcodeGeneratorParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.common.util.BranchCodeSetting;
import com.tsb.most.common.util.billing.VesselTariffCodeCalcurator;
import com.tsb.most.common.util.billing.TariffCodeGenerator;
import com.tsb.most.common.util.billing.TariffCodeGeneratorFactory;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.data.util.DateInfo;
import com.tsb.most.framework.data.util.DateUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

public class ProformaInvoice extends MOSTBaseService implements IProformaInvoice {

	private IProformaInvoiceDao proformaInvoiceDao;
	private ITariffCodeGeneratorDao tariffCodeGeneratorDao;

	public void setProformaInvoiceDao(IProformaInvoiceDao proformaInvoiceDao) {
		this.proformaInvoiceDao = proformaInvoiceDao;
	}

	public void setTariffCodeGeneratorDao(ITariffCodeGeneratorDao tariffCodeGeneratorDao) {
		this.tariffCodeGeneratorDao = tariffCodeGeneratorDao;
	}

	public DataItemList selectProformaInvoice(SearchProformaInvoiceParm parm) throws BizException {
		return proformaInvoiceDao.selectProformaInvoice(parm);
	}

	public DataItemList selectTrfInfoForProformaIv(SearchProformaInvoiceParm parm) throws BizException {
		return proformaInvoiceDao.selectGatheringDataForProformaIv(parm);
	}

	public DataItemList updateCalculationProformaIv(UpdateItemsBizParm parm) throws BizException {
		SearchTariffcodeGeneratorParm trfGenParm = new SearchTariffcodeGeneratorParm();
		DataGatheringItem gatherItem = new DataGatheringItem();
		SearchTariffCodeStorageDayParm storageParm = new SearchTariffCodeStorageDayParm();
		List<InvoiceDataItem> targetItems = new ArrayList();
		DataItemList payerList = new DataItemList();

		String payerCode = "";

		// Tariff code type
		String[] trfType = new String[2];

		// 0134458-Get Free Day configuration (From Parametter Settings)
		// BILLING_OS_FREE_DAY
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		SearchCommonParameterSettingBizParm settingParm = new SearchCommonParameterSettingBizParm();
		settingParm.setBranchCode(BranchCodeSetting.getInstance().getBranchCode());
		DataItemList parameterList = (DataItemList) serviceProviderPojo.execute("MOST.parametersetting.searchItems",settingParm);
		List<ParameterSettingItem> list = parameterList.getCollection();
		
		ParameterSettingItem settingItem = (ParameterSettingItem) list.stream().filter(x -> "BILLING_OS_FREE_DAY".equals(x.getCode())).findAny().orElse(null);
		
		if (settingItem != null && settingItem.getValue() != null && !"".equals(settingItem.getValue())) {
			trfGenParm.setOsFreeDays(Integer.parseInt(settingItem.getValue()));
		}

		// initial tariff code and target item & Tariff code generator
		DataItemList targetItemList = parm.getUpdateItems();

		if (targetItemList.size() > 0) {
			gatherItem = (DataGatheringItem) targetItemList.get(0).clone();

			// delete data into the TMT_B_IV_DATA
			InvoiceDataItem invItem = new InvoiceDataItem();
			invItem.setVslCallId(gatherItem.getVslCallId());
			invItem.setBookingNo(gatherItem.getBookingNo());
			invItem.setMasterBl(gatherItem.getMasterBL());
			invItem.setScrId(BillingConstant.PAYTMENT_MODE_PRE_PAID);

			DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
			deleteItems.addDeleteItem(invItem);

			tariffCodeGeneratorDao.deleteItem(deleteItems);
		}

		// Target data gathering item
		for (int i = 0; i < targetItemList.size(); i++) {
			DataGatheringItem item = (DataGatheringItem) targetItemList.get(i);
			trfGenParm.setVslCallId(item.getVslCallId());
			trfGenParm.setOpeClassCd(item.getOpeClassCd());
			trfGenParm.setBlNo(item.getBlSnNo());
			trfGenParm.setMasterBL(item.getDocNo());
			trfGenParm.setEstDt(item.getEstDt());
			trfType = new String[2];
			trfType[0] = BillingConstant.TRF_TP_CD_HG;
			trfType[1] = BillingConstant.TRF_TP_CD_OS;

			// Get Tariff code (tariff code initialization)
			TariffCodeGeneratorFactory factory = TariffCodeGeneratorFactory.createInstance(item.getVslCallId());

			for (int j = 0; j < trfType.length; j++) {
				trfGenParm.setTarDiv(trfType[j]);
				trfGenParm.setWhereSQL("AND	TRF.PRC_TP_CD = '" + BillingConstant.TRF_CODE_MODE_STANDARD + "'");
				
				/* BILL-025 Cash Collection before ATB of Vessel */
				DataItemList rtnList = tariffCodeGeneratorDao.selectTariffCodelistForCalculationProforma(trfGenParm); 

				if (rtnList.size() == 0) {
					continue;
				}

				TariffCodeGenerator generator = new TariffCodeGenerator(trfType[j], rtnList);

				factory.setGenerator(trfType[j], generator);
			}

			// 01.STORAGE CHARGE - START
			// ********************************************************************
			DataItemList gatherOSlist = new DataItemList();
			if (CodeConstant.MT_CGTP_RCV.equals(gatherItem.getCargoType())) {
				gatherOSlist = tariffCodeGeneratorDao.selectTargetROROStorageProformaCalculation(trfGenParm);
			} else {
				gatherOSlist = tariffCodeGeneratorDao.selectGenerateOverStorageForCalculateProformalist(trfGenParm);
			}

			for (int j = 0; j < gatherOSlist.size(); j++) {
				TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem) gatherOSlist.get(j);
				DataItemList tempTrfBucket = new DataItemList();

				targetItem.setUserId(item.getUserId());

				// get freeStorage Days and holidays for each cargo id
				payerList = tariffCodeGeneratorDao.selectTrfPayerList(trfGenParm);
				String payerPaymentType = "";

				if (payerList.size() > 0) {
					TariffCodePayerItem payer = (TariffCodePayerItem) payerList.get(0);
					payerCode = payer.getPtnrCd();
				}

				TariffCodeGenerator oTrfGen = factory.getGenerator(BillingConstant.TRF_TP_CD_OS);

				// Operated without ATB, skip to check Overstorage
				if (oTrfGen == null)
					continue;
				for (int l = 0; l < oTrfGen.getDistinctTariffCodList().size(); l++) { // problem > occur
																						// oTrfGen.getDistinctTariffCodList()
																						// == null
					TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) oTrfGen.getDistinctTariffCodList().get(l)
							.clone();
					String payerType = "";

					// for overstorage charge
					if ("".equals(payerCode) || "".equals(payerPaymentType)) {
						if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_SHA)) {
							payerCode = targetItem.getShipgAgnt();
							payerType = trfItem.getPayer();
							payerPaymentType = targetItem.getShipgAgntPayTpCd();
						} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_FWD)) {
							payerCode = targetItem.getFwrAgent();
							payerType = trfItem.getPayer();
							payerPaymentType = targetItem.getFwrAgentPayTpCd();
						} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_CNS)) {
							if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
								payerCode = targetItem.getShpr();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getShprPayTpCd();
							} else {
								payerCode = targetItem.getCnsne();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getCnsnePayTpCd();
							}
						}
					}

					// check the os - iv items
					trfGenParm.setTrfTpCd(BillingConstant.TRF_TP_CD_OS);
					DataItemList existedOSlist = tariffCodeGeneratorDao
							.selectOverStorageInvoiceItemsForProformalist(trfGenParm);
					List<InvoiceDataItem> existedOSItems = existedOSlist.getCollection();
					// MMC - Filter out non-null elements from the existedOSItems list
					List<InvoiceDataItem> existedOSNotNullItems = new ArrayList<>();
					for (InvoiceDataItem existedOSItem : existedOSItems) {
						if (existedOSItem != null) {
							existedOSNotNullItems.add(existedOSItem);
						}
					}
					if (existedOSNotNullItems.size() > 0) {
						continue;
					} else {
						targetItem.setRefNo4(BillingConstant.PAYTMENT_MODE_PRE_PAID); // if empty, then make as proforma
																						// with expected date.
					}

					String fromDate = "";
					String toDate = "";

					// get a period of the over storage date
					if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
						fromDate = targetItem.getCargoExSt();
					} else if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_IMPORT)) {
						fromDate = targetItem.getCargoImSt();
					}

					String expectedEndDt = targetItem.getExpectedDeliveryDay().equals("")
							? DateUtil.getCurrentDateTime(DateInfo.DEFAULT_DATE_FORMAT_YYYMMDDHHMM)
							: targetItem.getExpectedDeliveryDay();
					toDate = expectedEndDt;

					storageParm.setPtnrCode(payerCode);
					storageParm.setCatgCd(targetItem.getCatgCd());
					storageParm.setCgtpCd(targetItem.getCargoType());
					storageParm.setCmdtCd(targetItem.getCommodity());
					storageParm.setWhTpCd(targetItem.getWhLocTp());
					storageParm.setFromDate(fromDate);
					storageParm.setToDate(toDate);

					TariffCodeStroageItem freeStorageItem = new TariffCodeStroageItem();
					if (targetItem.getApplyFreeDays() != null) {
						freeStorageItem.setHolidaysYn(CommonConstants.N);
						freeStorageItem.setFreeDays(targetItem.getApplyFreeDays());
					} else {
						DataItemList freeStorageDays = tariffCodeGeneratorDao.selectFreeStorageDays(storageParm);
						if (freeStorageDays.getCollection().size() > 0) {
							freeStorageItem = (TariffCodeStroageItem) freeStorageDays.getCollection().get(0);
							targetItem.setApplyFreeDays(freeStorageItem.getFreeDays());
						}

						StringBuffer whereSQL = new StringBuffer();

						if (freeStorageItem.getWeekend1Yn() != null
								&& freeStorageItem.getWeekend1Yn().equals(CommonConstants.Y)) {
							whereSQL.append("AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 6");
						}

						if (freeStorageItem.getWeekend2Yn() != null
								&& freeStorageItem.getWeekend2Yn().equals(CommonConstants.Y)) {
							whereSQL.append("AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 7");
						}

						if (whereSQL.length() > 0) {
							storageParm.setWhereSQL(whereSQL.toString());
						}
					}

					DataItemList storageDays = tariffCodeGeneratorDao.selectStorageDays(storageParm);

					trfItem.setFreeStorageDays(freeStorageItem);
					trfItem.setSvcDtFrom(fromDate);
					trfItem.setSvcDtTo(toDate);

					if (storageDays.getCollection().size() > 0) {
						trfItem.setStorageDays((TariffCodeStroageItem) storageDays.getCollection().get(0));
					}

					// Checking Partner Rate - start**********
					SearchTariffcodeGeneratorParm ptnrRateParm = new SearchTariffcodeGeneratorParm();
					ptnrRateParm.setVslCallId(targetItem.getVslCallId());
					StringBuffer sql = new StringBuffer();
					sql.append("AND PTNR_CD = '" + payerCode + "' ");
					sql.append("AND TRF_CD = '" + trfItem.getTrfCd() + "' ");
					sql.append("AND SUB_TRF_CD = '" + trfItem.getSubTrfCd() + "' ");
					ptnrRateParm.setWhereSQL(sql.toString());
					DataItemList ptnrRateList = tariffCodeGeneratorDao.selectPartnerTrfRateInfo(ptnrRateParm);
					if (ptnrRateList.getCollection().size() > 0) {
						TariffCodeGatheredItem ptnrRstItem = (TariffCodeGatheredItem) ptnrRateList.getCollection()
								.get(0);
						trfItem.setPtnrRate(ptnrRstItem.getUnitPrc());
						trfItem.setStdRate(trfItem.getUnitPrc());
						trfItem.setUnitPrc(trfItem.getPtnrRate());
					}
					// Checking Partner Rate - end************

					DataItemList condList = tariffCodeGeneratorDao.selectTrfCondPrpt(trfItem);
					boolean isContinue = false;
					boolean isAddable = true;

					// check condition data
					for (int idx = 0; idx < condList.size(); idx++) {
						isContinue = oTrfGen.executeTariff((TariffCodeGatheredItem) trfItem,
								(TariffCodeConditionItem) condList.get(idx), targetItem);

						if (!isContinue) {
							isAddable = false;
							break;
						}
					}

					if (isAddable && BillingConstant.PAYTMENT_TYPE_CASH.equals(payerPaymentType)) {
						tempTrfBucket.add(trfItem);
					}

				}

				if (tempTrfBucket.size() > 0) {
					targetItem.setTrfBucketList(tempTrfBucket);

					/**
					 * 3. tariff code calcuration
					 */
					VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(targetItem, payerList);
					calcurator.executeCalcurate();

					/**
					 * 5. insert data into the TMT_B_IV_DATA
					 */
					InsertItemsBizParm insertItem = new InsertItemsBizParm();
					insertItem.addInsertItem(targetItem.getInvoiceList());

					tariffCodeGeneratorDao.insertItems(insertItem);
				}

			}
			// 01.STORAGE CHARGE - END
			// ********************************************************************

			// 02.PORT HANDLING CHARGE + STEVEDORING CHARGE - START
			// ***************************************
			// targeted datagathering List
			DataItemList gatherItemlist = new DataItemList();
			if (CodeConstant.MT_CGTP_RCV.equals(gatherItem.getCargoType())) {
				gatherItemlist = tariffCodeGeneratorDao.selectTargetROROPortHandlingProformaCalculation(trfGenParm);
			} else {
				gatherItemlist = tariffCodeGeneratorDao.selectGenerateCargoForProformaList(trfGenParm);
			}

			for (int j = 0; j < gatherItemlist.size(); j++) {
				TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem) gatherItemlist.get(j);
				targetItem.setExpectedDeliveryDay(item.getExpectedDeliveryDay()); //
				DataItemList tempTrfBucket = new DataItemList();

				targetItem.setUserId(item.getUserId());
				targetItem.setSearchType("DOC");

				// get freeStorage Days and holidays for each cargo id
				payerList = tariffCodeGeneratorDao.selectTrfPayerList(trfGenParm);

				if (payerList.size() > 0) {
					TariffCodePayerItem payer = (TariffCodePayerItem) payerList.get(0);
					payerCode = payer.getPtnrCd();
				}

				String fromDate = "";
				String toDate = "";

				// get a period of the overstoragte date
				if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
					fromDate = targetItem.getCargoExSt();
				} else if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_IMPORT)) {
					fromDate = targetItem.getCargoImSt();
				}

				String expectedEndDt = targetItem.getExpectedDeliveryDay().equals("")
						? DateUtil.getCurrentDateTime(DateInfo.DEFAULT_DATE_FORMAT_YYYMMDDHHMM)
						: targetItem.getExpectedDeliveryDay();
				// toDate =
				// targetItem.getWorkEndDt().equals("")?expectedEndDt:targetItem.getWorkEndDt();
				toDate = expectedEndDt;

				// Check Condition
				String[] trfTypeList = trfType;

				for (int k = 0; k < trfTypeList.length; k++) {
					TariffCodeGenerator oTrfGen = factory.getGenerator(trfTypeList[k]);
					if (oTrfGen == null) {
						continue;
					}

					trfGenParm.setTrfTpCd(trfTypeList[k]);
					DataItemList ivDataItems = tariffCodeGeneratorDao.selectInvoiceItemsForProformalist(trfGenParm);
					InvoiceDataItem ivDataItem = ivDataItems.getCollection().size() > 0
							? (InvoiceDataItem) ivDataItems.getCollection().get(0)
							: null;

					if (ivDataItem != null) {
						continue;
					} else {
						targetItem.setRefNo4(BillingConstant.PAYTMENT_MODE_PRE_PAID);
					}

					for (int l = 0; l < oTrfGen.getDistinctTariffCodList().size(); l++) {
						TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) oTrfGen.getDistinctTariffCodList()
								.get(l).clone();
						if (trfTypeList[k].equals(BillingConstant.TRF_TP_CD_OS)
								|| trfTypeList[k].equals(BillingConstant.TRF_TP_CD_DP)) {
							// for over storage charge
							continue;
						}

						String payerType = "";
						String payerPaymentType = "";
						// for overstorage Carhg
						if ("".equals(payerCode) || "".equals(payerPaymentType)) {
							if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_SHA)) {
								payerCode = targetItem.getShipgAgnt();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getShipgAgntPayTpCd();
							} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_FWD)) {
								payerCode = targetItem.getFwrAgent();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getFwrAgentPayTpCd();
							} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_CNS)) {
								if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
									payerCode = targetItem.getShpr();
									payerType = trfItem.getPayer();
									payerPaymentType = targetItem.getShprPayTpCd();
								} else {
									payerCode = targetItem.getCnsne();
									payerType = trfItem.getPayer();
									payerPaymentType = targetItem.getCnsnePayTpCd();
								}
							}
						}

						storageParm = new SearchTariffCodeStorageDayParm();
						storageParm.setPtnrCode(payerCode);
						storageParm.setCatgCd(targetItem.getCatgCd());
						storageParm.setCgtpCd(targetItem.getCargoType());
						storageParm.setCmdtCd(targetItem.getCommodity());
						storageParm.setWhTpCd(targetItem.getWhLocTp());
						storageParm.setFromDate(fromDate);
						storageParm.setToDate(toDate);

						TariffCodeStroageItem freeStorageItem = new TariffCodeStroageItem();
						if (targetItem.getApplyFreeDays() != null) {
							freeStorageItem.setHolidaysYn(CommonConstants.N);
							freeStorageItem.setFreeDays(targetItem.getApplyFreeDays());
						} else {
							DataItemList freeStorageDays = tariffCodeGeneratorDao.selectFreeStorageDays(storageParm);
							if (freeStorageDays.getCollection().size() > 0) {
								freeStorageItem = (TariffCodeStroageItem) freeStorageDays.getCollection().get(0);
								targetItem.setApplyFreeDays(freeStorageItem.getFreeDays());
							}
						}

						trfItem.setFreeStorageDays(freeStorageItem);
						trfItem.setSvcDtFrom(fromDate);
						trfItem.setSvcDtTo(toDate);

						// Checking Partner Rate - start**********
						SearchTariffcodeGeneratorParm ptnrRateParm = new SearchTariffcodeGeneratorParm();
						ptnrRateParm.setVslCallId(targetItem.getVslCallId());
						StringBuffer sql = new StringBuffer();
						sql.append("AND PTNR_CD = '" + payerCode + "' ");
						sql.append("AND TRF_CD = '" + trfItem.getTrfCd() + "' ");
						sql.append("AND SUB_TRF_CD = '" + trfItem.getSubTrfCd() + "' ");
						ptnrRateParm.setWhereSQL(sql.toString());
						DataItemList ptnrRateList = tariffCodeGeneratorDao.selectPartnerTrfRateInfo(ptnrRateParm);
						if (ptnrRateList.getCollection().size() > 0) {
							TariffCodeGatheredItem ptnrRstItem = (TariffCodeGatheredItem) ptnrRateList.getCollection()
									.get(0);
							trfItem.setPtnrRate(ptnrRstItem.getUnitPrc());
							trfItem.setStdRate(trfItem.getUnitPrc());
							trfItem.setUnitPrc(trfItem.getPtnrRate());
						}
						// Checking Partner Rate - end************

						DataItemList condList = tariffCodeGeneratorDao.selectTrfCondPrpt(trfItem);

						boolean isContinue = false;
						boolean isAddable = true;

						// check condition data
						for (int idx = 0; idx < condList.size(); idx++) {
							isContinue = oTrfGen.executeTariff((TariffCodeGatheredItem) trfItem,
									(TariffCodeConditionItem) condList.get(idx), targetItem);

							if (!isContinue) {
								isAddable = false;
								break;
							}
						}

						if (isAddable && BillingConstant.PAYTMENT_TYPE_CASH.equals(payerPaymentType)) {
							tempTrfBucket.add(trfItem);

							// DPC SOURCE LINE
						}
					}
				}

				if (tempTrfBucket.size() > 0) {
					targetItem.setTrfBucketList(tempTrfBucket);

					/**
					 * 3. tariff code calcuration
					 */
					VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(targetItem, payerList);
					calcurator.executeCalcurate();

					/***
					 * 4. insert data into the TMT_B_IV_DATA
					 */
					InsertItemsBizParm insertItem = new InsertItemsBizParm();
					insertItem.addInsertItem(targetItem.getInvoiceList());

					tariffCodeGeneratorDao.insertItems(insertItem);
				}
			}
			// 02.PORT HANDLING CHARGE + STEVEDORING CHARGE - END
			// ***************************************
		}
		return targetItemList;
	}

	public DataItemList updateCUDProformaIv(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		ArrayList<ProformaInvoiceItem> arrItem = (ArrayList<ProformaInvoiceItem>) itemList.getCollection();
		Double ivAmount = 0.0;
		Double taxAmount = 0.0;

		if (arrItem.size() > 0) {
			ProformaInvoiceItem ivItem = (ProformaInvoiceItem) arrItem.get(0).clone();
			// 0. Get IV No.
			SearchProformaInvoiceParm ivParm = new SearchProformaInvoiceParm();
			ivParm.setIvPrfx(ivItem.getIvPrfx());
			String ivNo = proformaInvoiceDao.selectInvoiceNo(ivParm);
			ivItem.setIvNo(ivNo);

			if (ivItem.getIvPrfx().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
				Boolean isExtraItemOnly = true;

				for (int i = 0; i < arrItem.size(); i++) {
					ProformaInvoiceItem ivDataItem = (ProformaInvoiceItem) arrItem.get(i);
					ivDataItem.setIvNo(ivNo);
					ivDataItem.setStatusCd(BillingConstant.DATA_GATHER_STATUS_PAID_COMPETE);
					ivAmount += Double.valueOf(ivDataItem.getIvAmt());
					taxAmount += Double.valueOf(ivDataItem.getTaxAmt());

					if (ivDataItem.getItemStatus().equals("Extra Item")) {
						ivDataItem.setStatusCd(BillingConstant.DATA_GATHER_STATUS_SATTLED);
						proformaInvoiceDao.insertInvoiceDataItem(ivDataItem);
					} else {
						isExtraItemOnly = false;
						proformaInvoiceDao.updateInvoiceDataItem(ivDataItem);
					}
				}
				String ivStatusCd = isExtraItemOnly ? BillingConstant.DATA_GATHER_STATUS_SATTLED
						: BillingConstant.DATA_GATHER_STATUS_PAID_COMPETE;
				ivItem.setStatusCd(ivStatusCd);
				// insertCashReleaseItems(ivItem);

				// 2. Issue invoice (prefix: CSH), Paid: Y
				ivItem.setPaidYn(CommonConstants.Y);
				ivItem.setIvAmt(String.valueOf(ivAmount));
				ivItem.setTaxAmt(String.valueOf(taxAmount));
				ivItem.setTotalAmt(String.valueOf(ivAmount + taxAmount));
				proformaInvoiceDao.insertInvoiceItem(ivItem);
			} else {
				// should have Over Storage charge and Extra Item only
				for (int i = 0; i < arrItem.size(); i++) {
					ProformaInvoiceItem ivDataItem = (ProformaInvoiceItem) arrItem.get(i);
					ivDataItem.setIvNo(ivNo);
					ivDataItem.setStatusCd(BillingConstant.DATA_GATHER_STATUS_INVOICED);
					ivAmount += Double.valueOf(ivDataItem.getIvAmt());
					taxAmount += Double.valueOf(ivDataItem.getTaxAmt());

					// 1.1 In case of Extra Item >> generate Gathered data
					if ("Extra Item".equals(ivDataItem.getItemStatus())) {
						ivDataItem.setStatusCd(BillingConstant.DATA_GATHER_STATUS_SATTLED);
						proformaInvoiceDao.insertInvoiceDataItem(ivDataItem);
					} else {
						if (BillingConstant.TRF_TP_CD_OS.equals(ivDataItem.getTrfTpCd())) {
							// 1.2 In case of Storage charge >> update Gathered data
							proformaInvoiceDao.updateInvoiceNoToProformaIvData(ivDataItem);
						}
					}
				}

				// 2. Issue invoice (prefix: XMS), Paid: Y
				ivItem.setPaidYn(CommonConstants.Y);
				ivItem.setIvAmt(String.valueOf(ivAmount));
				ivItem.setTaxAmt(String.valueOf(taxAmount));
				ivItem.setTotalAmt(String.valueOf(ivAmount + taxAmount));
				proformaInvoiceDao.insertInvoiceItem(ivItem);
			}
		}

		return itemList;
	}

	public DataItemList processCUDCreditAdditionalIv(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		ArrayList<ProformaInvoiceItem> arrItem = (ArrayList<ProformaInvoiceItem>) itemList.getCollection();

		if (arrItem.size() > 0) {
			ProformaInvoiceItem ivItem = (ProformaInvoiceItem) arrItem.get(0).clone();

			SearchProformaInvoiceParm ivParm = new SearchProformaInvoiceParm();
			ivParm.setVslCallId(ivItem.getVslCallId());
			ivParm.setIvNo(ivItem.getIvNo());
			ivParm.setCategory(ivItem.getCategory());
			if ("C".equals(ivItem.getCreditNote())) {
				ivParm.setIvPrfx("CRI");
			} else
				ivParm.setIvPrfx("ADI");
			// 0. Get IV No.
			String ivNo = proformaInvoiceDao.selectInvoiceNo(ivParm);

			// 1. Get tariff info
			List trfList = proformaInvoiceDao.selectTrfInfoForCreditAdditionalIv(ivParm).getCollection();
			Double ivAmount = 0.0;
			if (trfList.size() > 0) {
				for (int i = 0; i < trfList.size(); i++) {
					ProformaInvoiceItem ivDataItem = (ProformaInvoiceItem) trfList.get(i);

					ivDataItem.setIvNo(ivNo);
					ivDataItem.setAddCreditIvNo(ivNo);
					ivDataItem.setRefInvNo(ivItem.getIvNo());
					ivDataItem.setGatherTpCd(CodeConstant.MT_BILLINGTP_VV);
					ivDataItem.setUserId(ivItem.getUserId());

					if (ivItem.getCreditNote() != null && ivItem.getCreditNote().equals("C")) {
						ivDataItem.setIvPrfx("CRI");
						ivDataItem.setIvTp("C");
					} else {
						ivDataItem.setIvPrfx("ADI");
						ivDataItem.setIvTp("A");
					}

					// Invoice Amount
					Double operationMT = Double.valueOf(ivItem.getOperationMT());
					Double issuedMT = Double.valueOf(ivItem.getIssuedMT());
					Double ivMT = Math.abs(operationMT - issuedMT);
					Double ivAmt = ivMT * Double.valueOf(ivDataItem.getStdRate());

					ivDataItem.setIssuedMT(String.valueOf(ivMT));
					ivDataItem.setIvAmt(String.valueOf(ivAmt));

					ivAmount += ivAmt;

					// 1. Insert TMT_B_IV_DATA
					proformaInvoiceDao.insertInvoiceDataItem(ivDataItem);
					// 2. Insert TMT_B_IV_DATA_DTL
					proformaInvoiceDao.insertInvoiceDataDetailItem(ivDataItem);
				}

				// 3. Insert TMT_B_IV
				ProformaInvoiceItem cudIvItem = (ProformaInvoiceItem) trfList.get(0);

				cudIvItem.setIvAmt(String.valueOf(ivAmount));
				cudIvItem.setTotalAmt(String.valueOf(ivAmount));
				proformaInvoiceDao.insertInvoiceItem(cudIvItem);

				// 4.Update Original Invoice
				proformaInvoiceDao.updateInvoiceItem(cudIvItem);
			}
		}

		return itemList;
	}

	// MMC - Settlement
	@Override
	public DataItemList processSettlementProformaIv(UpdateItemsBizParm parm) throws BizException, ParseException {
		SearchTariffcodeGeneratorParm trfGenParm = new SearchTariffcodeGeneratorParm();
		DataGatheringItem gatherItem = new DataGatheringItem();

		SearchTariffCodeStorageDayParm storageParm = new SearchTariffCodeStorageDayParm();
		DataItemList payerList = new DataItemList();
		String payerCode = "";

		ArrayList<ProformaInvoiceItem> gridItems = null;
		SearchTariffServiceOrderGatheredParm searchServiceOrderparm = new SearchTariffServiceOrderGatheredParm();
		searchServiceOrderparm.setPayTpCd(BillingConstant.PAYTMENT_TYPE_CASH);

		// Target Tariff Type for Cash Collection
		// replacement between factory.getTrfType() and trfType()
		String[] trfType = new String[2];

		// 0134458-Get Free Day configuration (From Parametter Settings)
		// BILLING_OS_FREE_DAY
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		SearchCommonParameterSettingBizParm settingParm = new SearchCommonParameterSettingBizParm();
		settingParm.setBranchCode(BranchCodeSetting.getInstance().getBranchCode());
		DataItemList parameterList = (DataItemList) serviceProviderPojo.execute("MOST.parametersetting.searchItems",
				settingParm);
		List<ParameterSettingItem> list = parameterList.getCollection();
		ParameterSettingItem settingItem = (ParameterSettingItem) list.stream()
				.filter(x -> "BILLING_OS_FREE_DAY".equals(x.getCode())).findAny().orElse(null);
		if (settingItem != null && settingItem.getValue() != null && !"".equals(settingItem.getValue())) {
			trfGenParm.setOsFreeDays(Integer.parseInt(settingItem.getValue()));
		}

		// initial tariff code and target item & Tariff code generator
		DataItemList targetItemList = parm.getUpdateItems();
		if (targetItemList.size() > 0) {
			gatherItem = (DataGatheringItem) targetItemList.get(0).clone();

			searchServiceOrderparm.setVslCallId(gatherItem.getVslCallId());
			searchServiceOrderparm.setUserId(gatherItem.getUserId());

			// delete data into the TMT_B_IV_DATA
			InvoiceDataItem invItem = new InvoiceDataItem();
			invItem.setVslCallId(gatherItem.getVslCallId());
			invItem.setScrId("PFI");

			DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
			deleteItems.addDeleteItem(invItem);

			tariffCodeGeneratorDao.deleteItem(deleteItems);
		}

		// target data gathering item
		for (int i = 0; i < targetItemList.size(); i++) {

			DataGatheringItem item = (DataGatheringItem) targetItemList.get(i);
			trfGenParm.setSearchType("PFI");
			trfGenParm.setVslCallId(item.getVslCallId());
			trfGenParm.setOpeClassCd(item.getOpeClassCd());
			trfGenParm.setBlNo(item.getBlSnNo());
			trfGenParm.setMasterBL(item.getDocNo());
			trfGenParm.setEstDt(item.getEstDt());

			// Checking Port Handling Invoice
			SearchProformaInvoiceParm proformaParm = new SearchProformaInvoiceParm();
			proformaParm.setVslCallId(item.getVslCallId());
			proformaParm.setDocNo(item.getDocNo());
			proformaParm.setBlNo(item.getBlSnNo());

			gridItems = new ArrayList<ProformaInvoiceItem>();
			gridItems = item.getProformaItems();

			trfType = new String[2];
			trfType[0] = BillingConstant.TRF_TP_CD_HG;
			trfType[1] = BillingConstant.TRF_TP_CD_OS;

			// get Tariff code (tariff code initialization)
			TariffCodeGeneratorFactory factory = TariffCodeGeneratorFactory.createInstance(item.getVslCallId());

			for (int j = 0; j < trfType.length; j++) {
				trfGenParm.setTarDiv(trfType[j]);
				trfGenParm.setWhereSQL("AND	TRF.PRC_TP_CD = '" + BillingConstant.TRF_CODE_MODE_STANDARD + "'");

				DataItemList rtnList = tariffCodeGeneratorDao.selectTariffCodelist(trfGenParm);

				if (rtnList.size() == 0) {
					continue;
				}

				TariffCodeGenerator generator = new TariffCodeGenerator(trfType[j], rtnList);

				factory.setGenerator(trfType[j], generator);
			}

			// Overstorage
			trfGenParm.setTrfTpCd(BillingConstant.TRF_TP_CD_OS);

			DataItemList gatherOSlist = new DataItemList();
			if (CodeConstant.MT_CGTP_RCV.equals(gatherItem.getCargoType())) {
				gatherOSlist = tariffCodeGeneratorDao.selectTargetROROStorageProformaSettlement(trfGenParm);
			} else {
				gatherOSlist = tariffCodeGeneratorDao.selectGenerateOverStorageForSettlementProformalist(trfGenParm);
			}
			// DataItemList gatherOSlist =
			// tariffCodeGeneratorDao.selectGenerateOverStorageForSettlementProformalist(trfGenParm);
			for (int j = 0; j < gatherOSlist.size(); j++) {
				TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem) gatherOSlist.get(j);
				DataItemList tempTrfBucket = new DataItemList();

				targetItem.setUserId(item.getUserId());

				// get freeStorage Days and holidays for each cargo id
				payerList = tariffCodeGeneratorDao.selectTrfPayerList(trfGenParm);

				if (payerList.size() > 0) {
					TariffCodePayerItem payer = (TariffCodePayerItem) payerList.get(0);
					payerCode = payer.getPtnrCd();
				}

				TariffCodeGenerator oTrfGen = factory.getGenerator(BillingConstant.TRF_TP_CD_OS);

				// Operated without ATB, skip to check Overstorage
				if (oTrfGen == null)
					continue;

				String fromDate = "";
				String toDate = "";

				for (int l = 0; l < oTrfGen.getDistinctTariffCodList().size(); l++) {
					TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) oTrfGen.getDistinctTariffCodList().get(l)
							.clone();
					String payerType = "";

					// For Overstorage Charge
					if ("".equals(payerCode) || "".equals(payerType)) {
						if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_SHA)) {
							payerCode = targetItem.getShipgAgnt();

						} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_FWD)) {
							payerCode = targetItem.getFwrAgent();

						} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_CNS)) {
							if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
								payerCode = targetItem.getShpr();
							} else {
								payerCode = targetItem.getCnsne();
							}
						}
					}

					// get a period of the overstoragte date
					if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
						fromDate = targetItem.getCargoExSt();
					} else if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_IMPORT)) {
						fromDate = targetItem.getCargoImSt();
					}

					String expectedEndDt = targetItem.getExpectedDeliveryDay().equals("")
							? DateUtil.getCurrentDateTime(DateInfo.DEFAULT_DATE_FORMAT_YYYMMDDHHMM)
							: targetItem.getExpectedDeliveryDay();
					toDate = expectedEndDt;

					storageParm.setPtnrCode(payerCode);
					storageParm.setCatgCd(targetItem.getCatgCd());
					storageParm.setCgtpCd(targetItem.getCargoType());
					storageParm.setCmdtCd(targetItem.getCommodity());
					storageParm.setWhTpCd(targetItem.getWhLocTp());
					storageParm.setFromDate(fromDate);
					storageParm.setToDate(toDate);

					TariffCodeStroageItem freeStorageItem = new TariffCodeStroageItem();
					if (targetItem.getApplyFreeDays() != null) {
						freeStorageItem.setHolidaysYn(CommonConstants.N);
						freeStorageItem.setFreeDays(targetItem.getApplyFreeDays());
					} else {
						DataItemList freeStorageDays = tariffCodeGeneratorDao.selectFreeStorageDays(storageParm);
						if (freeStorageDays.getCollection().size() > 0) {
							freeStorageItem = (TariffCodeStroageItem) freeStorageDays.getCollection().get(0);
							targetItem.setApplyFreeDays(freeStorageItem.getFreeDays());
						}

						StringBuffer whereSQL = new StringBuffer();

						if (freeStorageItem.getWeekend1Yn() != null
								&& freeStorageItem.getWeekend1Yn().equals(CommonConstants.Y)) {
							whereSQL.append("AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 6");
						}

						if (freeStorageItem.getWeekend2Yn() != null
								&& freeStorageItem.getWeekend2Yn().equals(CommonConstants.Y)) {
							if (whereSQL.length() > 0) {
								whereSQL.append(" AND ");
							} else {
								whereSQL.append(" WHERE ");
							}

							whereSQL.append("AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 7");
						}

						if (whereSQL.length() > 0) {
							storageParm.setWhereSQL(whereSQL.toString());

						}
					}

					DataItemList storageDays = tariffCodeGeneratorDao.selectStorageDays(storageParm);

					trfItem.setFreeStorageDays(freeStorageItem);
					trfItem.setSvcDtFrom(fromDate);
					trfItem.setSvcDtTo(toDate);

					if (storageDays.getCollection().size() > 0) {
						trfItem.setStorageDays((TariffCodeStroageItem) storageDays.getCollection().get(0));
					}

					// Checking Partner Rate - start**********
					SearchTariffcodeGeneratorParm ptnrRateParm = new SearchTariffcodeGeneratorParm();
					ptnrRateParm.setVslCallId(targetItem.getVslCallId());
					StringBuffer sql = new StringBuffer();
					sql.append("AND PTNR_CD = '" + payerCode + "' ");
					sql.append("AND TRF_CD = '" + trfItem.getTrfCd() + "' ");
					sql.append("AND SUB_TRF_CD = '" + trfItem.getSubTrfCd() + "' ");
					ptnrRateParm.setWhereSQL(sql.toString());
					DataItemList ptnrRateList = tariffCodeGeneratorDao.selectPartnerTrfRateInfo(ptnrRateParm);
					if (ptnrRateList.getCollection().size() > 0) {
						TariffCodeGatheredItem ptnrRstItem = (TariffCodeGatheredItem) ptnrRateList.getCollection()
								.get(0);
						trfItem.setPtnrRate(ptnrRstItem.getUnitPrc());
						trfItem.setStdRate(trfItem.getUnitPrc());
						trfItem.setUnitPrc(trfItem.getPtnrRate());
					}
					// Checking Partner Rate - end************

					DataItemList condList = tariffCodeGeneratorDao.selectTrfCondPrpt(trfItem);

					boolean isContinue = false;
					boolean isAddable = true;

					// check condition data
					for (int idx = 0; idx < condList.size(); idx++) {
						isContinue = oTrfGen.executeTariff((TariffCodeGatheredItem) trfItem,
								(TariffCodeConditionItem) condList.get(idx), targetItem);

						if (!isContinue) {
							isAddable = false;
							break;
						}
					}

					if (isAddable) {
						tempTrfBucket.add(trfItem);
					}
				}

				if (tempTrfBucket.size() > 0) {

					// modify trfitem in bucket list for diff day.
					DataItemList ivOsList = tariffCodeGeneratorDao
							.selectOverStorageInvoiceItemsForProformalist(trfGenParm);
					// InvoiceDataItem summaryItem =
					// (InvoiceDataItem)ivOsList.getCollection().get(0);
					InvoiceDataItem summaryItem = new InvoiceDataItem();

					if (ivOsList.size() > 0) {
						for (int k = 0; k < ivOsList.size(); k++) {
							summaryItem = (InvoiceDataItem) ivOsList.getCollection().get(k);
							// MMC
							if (summaryItem != null) {
								SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
								Date prevExpectedDate = summaryItem.getExpectedDeliveryDay() != null
										? sdf.parse(summaryItem.getExpectedDeliveryDay())
										: null;
								Date deliveredDate = summaryItem.getDeliveredDate() != null
										? sdf.parse(summaryItem.getDeliveredDate())
										: null;
								Date FreeStrgEndDate = summaryItem.getFreeStorageEndDate() != null
										? sdf.parse(summaryItem.getFreeStorageEndDate())
										: null;
								// MMC
								int storagedDay = (int) Double.parseDouble(summaryItem.getUnit2Val());
								TariffCodeGatheredItem targetTrfItem = (TariffCodeGatheredItem) tempTrfBucket.get(0);
								TariffCodeStroageItem targetStorageDayItem = targetTrfItem.getStorageDays();

								int tagetDay = Integer.parseInt(targetStorageDayItem.getDaydiff());
								if (CodeConstant.MT_CGTP_RCV.equals(gatherItem.getCargoType())) {
									tagetDay = Integer.parseInt(targetTrfItem.getUnit2Val());
									targetTrfItem.setUnit2Val(String.valueOf(tagetDay - storagedDay));
								}

								targetStorageDayItem.setDaydiff(String.valueOf(tagetDay - storagedDay));

								targetItem.setTrfBucketList(tempTrfBucket);

								// BILL-036
								Date expectedDate = !"".equals(toDate) ? sdf.parse(toDate) : null;
								if (prevExpectedDate.compareTo(expectedDate) < 0) {
									/**
									 * 3. tariff code calcuration
									 */
									VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(targetItem, payerList);
									calcurator.executeCalcurate();

									/**
									 * 5. insert data into the TMT_B_IV_DATA 6. Insert data into History
									 **/
									InsertItemsBizParm insertItem = new InsertItemsBizParm();
									insertItem.addInsertItem(targetItem.getInvoiceList());
									tariffCodeGeneratorDao.insertItems(insertItem);
								}

								// 7. Update Status of ivData as Settlement in Grid
								for (ProformaInvoiceItem gridIvData : gridItems) {

									if (gridIvData.getVslCallId().equals(trfGenParm.getVslCallId())
											&& gridIvData.getBlSnNo().equals(trfGenParm.getBlNo())
											&& gridIvData.getTrfTpCd().equals(trfGenParm.getTrfTpCd())
											&& BillingConstant.DATA_GATHER_STATUS_PAID_COMPETE
													.equals(gridIvData.getStatusCd())) {
										ProformaInvoiceItem proformaClone = (ProformaInvoiceItem) gridIvData.clone();

										int strgDays = 0;

										// BILL-035
										ProformaInvoiceItem cudItem = (ProformaInvoiceItem) gridIvData.clone();
										if (deliveredDate != null && (deliveredDate.compareTo(prevExpectedDate) < 0
												&& deliveredDate.compareTo(FreeStrgEndDate) > 0)) {
											// Delivery Date < Expected Date && Delivery Date > Free Storage Expire Date
											// Calculating Storage days again
											TariffCodeStroageItem freeStorageItem = new TariffCodeStroageItem();
											if (targetItem.getApplyFreeDays() != null) {
												freeStorageItem.setHolidaysYn(CommonConstants.N);
												freeStorageItem.setFreeDays(targetItem.getApplyFreeDays());
											} else {
												DataItemList freeStorageDays = tariffCodeGeneratorDao
														.selectFreeStorageDays(storageParm);
												if (freeStorageDays.getCollection().size() > 0) {
													freeStorageItem = (TariffCodeStroageItem) freeStorageDays
															.getCollection().get(0);
													targetItem.setApplyFreeDays(freeStorageItem.getFreeDays());
												}

												StringBuffer whereSQL = new StringBuffer();

												if (freeStorageItem.getWeekend1Yn() != null
														&& freeStorageItem.getWeekend1Yn().equals(CommonConstants.Y)) {
													whereSQL.append(
															"AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 6");
												}

												if (freeStorageItem.getWeekend2Yn() != null
														&& freeStorageItem.getWeekend2Yn().equals(CommonConstants.Y)) {
													whereSQL.append(
															"AND DATEPART(dw, DATEADD(DAY, NUMBER, @fromDate)) != 7");
												}

												if (whereSQL.length() > 0) {
													storageParm.setWhereSQL(whereSQL.toString());

												}
											}

											storageParm.setToDate(summaryItem.getDeliveredDate());
											DataItemList storageDays = tariffCodeGeneratorDao
													.selectStorageDays(storageParm);

											if (storageDays.getCollection().size() > 0) {
												TariffCodeStroageItem strgItem = (TariffCodeStroageItem) storageDays
														.getCollection().get(0);

												int freeDays = Integer
														.parseInt(freeStorageItem.getFreeDays() == null ? "0"
																: freeStorageItem.getFreeDays());
												int diffDays = Integer.parseInt(
														strgItem.getDaydiff() == null ? "0" : strgItem.getDaydiff());

												strgDays = diffDays - freeDays;
												if (freeStorageItem.getHolidaysYn() != null
														&& freeStorageItem.getHolidaysYn().equals(CommonConstants.Y)) {
													int holidays = Integer.parseInt(freeStorageItem.getHolidays());
													strgDays = strgDays - holidays;
												}
											}

											BigDecimal unit1 = new BigDecimal(cudItem.getUnit1Val());
											BigDecimal rate = new BigDecimal(cudItem.getApplyRate());
											BigDecimal applyAmt = unit1
													.multiply(rate.multiply(BigDecimal.valueOf(strgDays)));
											BigDecimal gstAmt = applyAmt.multiply(new BigDecimal(
													(cudItem.getTaxValue() == null || cudItem.getTaxValue().equals("")
															? "0"
															: proformaClone.getTaxValue()))
																	.divide(BigDecimal.valueOf(100)));
											BigDecimal totalAmt = applyAmt.add(gstAmt);

											cudItem.setUnit2Val(String.valueOf(strgDays));
											cudItem.setApplyAmt(String.valueOf(applyAmt));
											cudItem.setTaxAmt(String.valueOf(gstAmt));
											cudItem.setTotalAmt(String.valueOf(totalAmt));
											cudItem.setGatherNo(summaryItem.getGatherNo());
											cudItem.setSvcDtFrom(fromDate);
											cudItem.setSvcDtTo(summaryItem.getDeliveredDate());
											cudItem.setExpectedDeliveryDay(summaryItem.getDeliveredDate());
											cudItem.setUserId(item.getUserId());

											UpdateItemsBizParm updParm = new UpdateItemsBizParm();
											DataItemList cudItems = new DataItemList();
											cudItems.add(cudItem);
											updParm.setUpdateItems(cudItems);
											proformaInvoiceDao.updateSettleStorageAmt(updParm);
											proformaInvoiceDao.updateInvoiceStatus(updParm);
										} else {
											proformaClone.setStatusCd(BillingConstant.DATA_GATHER_STATUS_SATTLED);
											proformaClone.setUserId(item.getUserId());
											UpdateItemsBizParm updateIvStatus = new UpdateItemsBizParm();
											updateIvStatus.setUpdateItems(new DataItemList());
											updateIvStatus.addUpdateItem(proformaClone);
											proformaInvoiceDao.updateInvoiceDataStatus(updateIvStatus);
											proformaInvoiceDao.updateInvoiceStatus(updateIvStatus);
										}
									}
								}

							}
						}
					} else {
						targetItem.setTrfBucketList(tempTrfBucket);

						/**
						 * 3. tariff code calcuration
						 */
						VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(targetItem, payerList);
						calcurator.executeCalcurate();

						/**
						 * 5. insert data into the TMT_B_IV_DATA 6. Insert data into History
						 **/
						InsertItemsBizParm insertItem = new InsertItemsBizParm();
						insertItem.addInsertItem(targetItem.getInvoiceList());
						tariffCodeGeneratorDao.insertItems(insertItem);

						// 7. Update Status of ivData as Settlement in Grid
						for (ProformaInvoiceItem gridIvData : gridItems) {

							if (gridIvData.getVslCallId().equals(trfGenParm.getVslCallId())
									&& gridIvData.getBlSnNo().equals(trfGenParm.getBlNo())
									&& gridIvData.getTrfTpCd().equals(trfGenParm.getTrfTpCd())
									&& BillingConstant.DATA_GATHER_STATUS_PAID_COMPETE
											.equals(gridIvData.getStatusCd())) {
								ProformaInvoiceItem proformaClone = (ProformaInvoiceItem) gridIvData.clone();
								proformaClone.setStatusCd(BillingConstant.DATA_GATHER_STATUS_SATTLED);
								proformaClone.setUserId(item.getUserId());
								UpdateItemsBizParm updateIvStatus = new UpdateItemsBizParm();
								updateIvStatus.setUpdateItems(new DataItemList());
								updateIvStatus.addUpdateItem(proformaClone);
								proformaInvoiceDao.updateInvoiceDataStatus(updateIvStatus);
								proformaInvoiceDao.updateInvoiceStatus(updateIvStatus);
							}
						}
					}

				}

			}

			// Others
			// Targeted datagathering List
			DataItemList gatherItemlist = new DataItemList();
			if (CodeConstant.MT_CGTP_RCV.equals(gatherItem.getCargoType())) {
				gatherItemlist = tariffCodeGeneratorDao.selectTargetROROPortHandlingProformaSettlement(trfGenParm);
			} else {
				gatherItemlist = tariffCodeGeneratorDao.selectGenerateHGandSTchargelist(trfGenParm);
			}

			trfGenParm.setTrfTpCd(BillingConstant.TRF_TP_CD_HG);
			List<InvoiceDataItem> ivDataHGItems = tariffCodeGeneratorDao.selectInvoiceItemsForProformalist(trfGenParm)
					.getCollection();
			InvoiceDataItem ivDataHGItem = ivDataHGItems.size() > 0 ? ivDataHGItems.get(0) : null;
			trfGenParm.setTrfTpCd(BillingConstant.TRF_TP_CD_ST);
			List<InvoiceDataItem> ivDataSTItems = tariffCodeGeneratorDao.selectInvoiceItemsForProformalist(trfGenParm)
					.getCollection();
			InvoiceDataItem ivDataSTItem = ivDataSTItems.size() > 0 ? ivDataSTItems.get(0) : null;

			for (int j = 0; j < gatherItemlist.size(); j++) {
				TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem) gatherItemlist.get(j);
				targetItem.setExpectedDeliveryDay(item.getExpectedDeliveryDay()); //
				DataItemList tempTrfBucket = new DataItemList();

				targetItem.setUserId(item.getUserId());
				targetItem.setScrId("PFI");
				targetItem.setIvPrfx("CSH");

				// get freeStorage Days and holidays for each cargo id
				payerList = tariffCodeGeneratorDao.selectTrfPayerList(trfGenParm);

				if (payerList.size() > 0) {
					TariffCodePayerItem payer = (TariffCodePayerItem) payerList.get(0);
					payerCode = payer.getPtnrCd();
				}

				// Set Service Start Date End Date - START
				String fromDate = "";
				String toDate = "";

				if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
					fromDate = targetItem.getCargoExSt();
				} else if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_IMPORT)) {
					fromDate = targetItem.getCargoImSt();
				}

				String expectedEndDt = targetItem.getExpectedDeliveryDay().equals("")
						? DateUtil.getCurrentDateTime(DateInfo.DEFAULT_DATE_FORMAT_YYYMMDDHHMM)
						: targetItem.getExpectedDeliveryDay();
				toDate = expectedEndDt;
				// Set Service Start Date End Date - END

				// Check Condition
				String[] trfTypeList = trfType;

				for (int k = 0; k < trfTypeList.length; k++) {
					TariffCodeGenerator oTrfGen = factory.getGenerator(trfTypeList[k]);
					if (oTrfGen == null) {
						continue;
					}

					for (int l = 0; l < oTrfGen.getDistinctTariffCodList().size(); l++) {
						TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) oTrfGen.getDistinctTariffCodList()
								.get(l).clone();
						if (trfTypeList[k].equals(BillingConstant.TRF_TP_CD_OS)) {
							// for overstorage Carhg
							continue;
						}

						// Set Service Start Date End Date - START
						String payerType = "";
						String payerPaymentType = "";
						if ("".equals(payerCode) || "".equals(payerPaymentType)) {
							if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_SHA)) {
								payerCode = targetItem.getShipgAgnt();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getShipgAgntPayTpCd();
							} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_FWD)) {
								payerCode = targetItem.getFwrAgent();
								payerType = trfItem.getPayer();
								payerPaymentType = targetItem.getFwrAgentPayTpCd();
							} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_CNS)) {
								if (targetItem.getOpeClass().equals(CodeConstant.VSLSCH_CG_OP_TP_EXPORT)) {
									payerCode = targetItem.getShpr();
									payerType = trfItem.getPayer();
									payerPaymentType = targetItem.getShprPayTpCd();
								} else {
									payerCode = targetItem.getCnsne();
									payerType = trfItem.getPayer();
									payerPaymentType = targetItem.getCnsnePayTpCd();
								}
							}
						}

						// Checking Partner Rate - start**********
						SearchTariffcodeGeneratorParm ptnrRateParm = new SearchTariffcodeGeneratorParm();
						ptnrRateParm.setVslCallId(targetItem.getVslCallId());
						StringBuffer sql = new StringBuffer();
						sql.append("AND PTNR_CD = '" + payerCode + "' ");
						sql.append("AND TRF_CD = '" + trfItem.getTrfCd() + "' ");
						sql.append("AND SUB_TRF_CD = '" + trfItem.getSubTrfCd() + "' ");
						ptnrRateParm.setWhereSQL(sql.toString());
						DataItemList ptnrRateList = tariffCodeGeneratorDao.selectPartnerTrfRateInfo(ptnrRateParm);
						if (ptnrRateList.getCollection().size() > 0) {
							TariffCodeGatheredItem ptnrRstItem = (TariffCodeGatheredItem) ptnrRateList.getCollection()
									.get(0);
							trfItem.setPtnrRate(ptnrRstItem.getUnitPrc());
							trfItem.setStdRate(trfItem.getUnitPrc());
							trfItem.setUnitPrc(trfItem.getPtnrRate());
						}
						// Checking Partner Rate - end************

						DataItemList condList = tariffCodeGeneratorDao.selectTrfCondPrpt(trfItem);

						boolean isContinue = false;
						boolean isAddable = true;

						// check condition data
						for (int idx = 0; idx < condList.size(); idx++) {
							isContinue = oTrfGen.executeTariff((TariffCodeGatheredItem) trfItem,
									(TariffCodeConditionItem) condList.get(idx), targetItem);

							if (!isContinue) {
								isAddable = false;
								break;
							}
						}

						if (isAddable) {
							tempTrfBucket.add(trfItem);
						}

					}

				}

				if (tempTrfBucket.size() > 0) {
					targetItem.setTrfBucketList(tempTrfBucket);

					/**
					 * 3. tariff code calculation
					 */
					VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(targetItem, payerList);
					calcurator.executeCalcurate();

					DataItemList insertIvDataList = new DataItemList();
					List<InvoiceDataItem> targetIvList = (List<InvoiceDataItem>) targetItem.getInvoiceList()
							.getCollection();

					for (InvoiceDataItem targetIvItem : targetIvList) {
						InvoiceDataItem summaryItem = BillingConstant.TRF_TP_CD_HG.equals(targetIvItem.getTrfTpCd())
								? ivDataHGItem
								: ivDataSTItem;

						// 0. summaryItems is null
						if (summaryItem != null) {

							if (BillingConstant.IMPORT.equals(item.getOpeClassCd())
									&& BillingConstant.TRF_TP_CD_HG.equals(targetIvItem.getTrfTpCd())
									&& "D".equals(summaryItem.getDelvTpCd()) // +) Proforma is direct
									&& "I".equals(targetItem.getDeliveryType())
									&& (summaryItem.getIsUpdatePaid() == null)) {
								BigDecimal proformaAmount = new BigDecimal(summaryItem.getPrfAmt()); // 100 * 19 = 1,900
								BigDecimal currentTotalAmount = new BigDecimal(
										summaryItem.getRevsAmt() == null ? "0" : summaryItem.getRevsAmt()); // D: 760 (+
																											// I: 1,680
																											// ) = 2,440
								BigDecimal itemAmt = new BigDecimal(targetIvItem.getAplyAmt()); // 60 * 28 = 1,680
								// 0. HG - CDI check (false) - check the amount how much diff
								// have only proforma amount
								currentTotalAmount = currentTotalAmount.add(itemAmt);
								if (currentTotalAmount.compareTo(proformaAmount) == 1) { // 2440 > 1900
									InvoiceDataItem modifyItem = (InvoiceDataItem) targetIvItem.clone();
									String cdiDesc = modifyItem.getTrfDescr() + " (Difference from DIR to IND)"; // Mantis:
																													// 0134274
									BigDecimal itemQty = new BigDecimal(modifyItem.getUnit1Val());

									BigDecimal diffAmt = currentTotalAmount.subtract(proformaAmount);
									BigDecimal diffRate = diffAmt.divide(itemQty, 2); // Mantis: 0132150
									BigDecimal gstAmt = diffAmt.multiply(new BigDecimal(
											(modifyItem.getGstPercent() == null ? "0" : modifyItem.getGstPercent()))
													.divide(BigDecimal.valueOf(100)));
									BigDecimal totalAmt = diffAmt.add(gstAmt);

									modifyItem.setAplyRate(String.valueOf(diffRate));
									modifyItem.setAplyAmt(String.valueOf(diffAmt));

									modifyItem.setGstAmt(String.valueOf(gstAmt));
									modifyItem.setTotalAmt(String.valueOf(totalAmt));
									modifyItem.setRefNo4(BillingConstant.CHANGE_DIRECT_TO_INDIRECT);
									modifyItem.setTrfDescr(cdiDesc);

									summaryItem.setIsUpdatePaid("Y");
									insertIvDataList.add(modifyItem);

								} else { // if( currentTotalAmount <= proformaAmount ){
									summaryItem.setRevsAmt(String.valueOf(currentTotalAmount)); // 760
								}

							} else {
								// Check as normal process
								// 1. HG - CDI check (true) - add aditional or check duplicate
								// 2. ST - no check. - add additional or check duplicate
								BigDecimal totalAmount = new BigDecimal(summaryItem.getAppliedAmt());
								BigDecimal totalUnit1Val = new BigDecimal(summaryItem.getUnit1Val());
								BigDecimal currentUnit1Val = new BigDecimal(
										summaryItem.getRevsUnit1Val() == null ? "0" : summaryItem.getRevsUnit1Val()); // [ST]
																														// D:
																														// 640
																														// (+
																														// I:
																														// 960
																														// )
																														// =
																														// 1600
								BigDecimal currentTotalAmount = new BigDecimal(
										summaryItem.getRevsAmt() == null ? "0" : summaryItem.getRevsAmt()); // [ST] D:
																											// 640 (+ I:
																											// 960 ) =
																											// 1600
								BigDecimal itemUnit1Val = new BigDecimal(
										targetIvItem.getUnit1Val() == null ? "0" : targetIvItem.getUnit1Val()); // 60 *
																												// 16 =
																												// 960
								BigDecimal itemAmt = new BigDecimal(targetIvItem.getAplyAmt()); // 60 * 16 = 960

								currentUnit1Val = currentUnit1Val.add(itemUnit1Val);
								currentTotalAmount = currentTotalAmount.add(itemAmt);
								if (currentTotalAmount.compareTo(totalAmount) == 1) {
									InvoiceDataItem modifyItem = (InvoiceDataItem) targetIvItem.clone();

									BigDecimal diffAmt = currentTotalAmount.subtract(totalAmount);
									BigDecimal diffUnit1 = currentUnit1Val.subtract(totalUnit1Val);
									modifyItem.setUnit1Val(String.valueOf(diffUnit1));
									modifyItem.setAplyAmt(String.valueOf(diffAmt));
									modifyItem.setTotalAmt(String.valueOf(diffAmt));

									insertIvDataList.add(modifyItem);
								} else {
									summaryItem.setRevsUnit1Val(String.valueOf(currentUnit1Val));
									summaryItem.setRevsAmt(String.valueOf(currentTotalAmount)); // 640
								}

							}

						}

						// update settled the proforma record after complete.
						for (ProformaInvoiceItem gridIvData : gridItems) {

							if (gridIvData.getVslCallId().equals(targetIvItem.getVslCallId())
									&& gridIvData.getBlSnNo().equals(targetIvItem.getRefNo())
									&& gridIvData.getTrfTpCd().equals(targetIvItem.getTrfTpCd())
									&& BillingConstant.DATA_GATHER_STATUS_PAID_COMPETE
											.equals(gridIvData.getStatusCd())) {
								ProformaInvoiceItem proformaClone = (ProformaInvoiceItem) gridIvData.clone();
								proformaClone.setStatusCd(BillingConstant.DATA_GATHER_STATUS_SATTLED);
								proformaClone.setUserId(item.getUserId());
								UpdateItemsBizParm updateIvStatus = new UpdateItemsBizParm();
								updateIvStatus.setUpdateItems(new DataItemList());
								updateIvStatus.addUpdateItem(proformaClone);
								proformaInvoiceDao.updateInvoiceDataStatus(updateIvStatus);
								proformaInvoiceDao.updateInvoiceStatus(updateIvStatus);
							}
						}
					}

					/**
					 * 4. insert data into the TMT_B_IV_DATA
					 */
					InsertItemsBizParm insertItem = new InsertItemsBizParm();
					insertItem.addInsertItem(insertIvDataList);

					tariffCodeGeneratorDao.insertItems(insertItem);
				}
			}
		}
		return targetItemList;
	}

	// MMC - Settlement
	@Override
	public DataItemList updateInvoiceStatus(UpdateItemsBizParm parm) throws BizException {
		return proformaInvoiceDao.updateInvoiceStatus(parm);
	}

	public DataItemList updateApplyFreeDays(UpdateItemsBizParm parm) throws BizException {
		return proformaInvoiceDao.updateApplyFreeDays(parm);
	}
}
