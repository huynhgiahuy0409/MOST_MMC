package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.billing.IPartnerTariffRateDao;
import com.tsb.most.biz.dao.billing.ITariffCodeDao;
import com.tsb.most.biz.dataitem.billing.PartnerConditionItem;
import com.tsb.most.biz.dataitem.billing.PartnerConditionPropertyItem;
import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.common.util.StringConverter;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class PartnerTariffRate extends MOSTBaseService implements IPartnerTariffRate {
	private IPartnerTariffRateDao partnerTariffRateDao;
	private ITariffCodeDao tariffCodeDao;
	private ICodeMasterDao codeMasterDao;
	private IFileUpload fileUpload;
	
	public void setTariffCodeDao(ITariffCodeDao tariffCodeDao) {
		this.tariffCodeDao = tariffCodeDao;
	}
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public void setPartnerTariffRateDao(IPartnerTariffRateDao partnerTariffRateDao) {
		this.partnerTariffRateDao = partnerTariffRateDao;
	}
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	public DataItemList selectBerthList(SearchPartnerTariffRateParm parm) throws BizException {
		return partnerTariffRateDao.selectBerthList( parm);
	}
	
	// Partner Tariff Rate
	public DataItemList selectPartnerTariffRate(SearchPartnerTariffRateParm parm) throws BizException {
		DataItemList ptnrList = new DataItemList();
		List pkgSum = partnerTariffRateDao.selectPartnerTariffRateSummary(parm).getCollection();
		List pkgRate = partnerTariffRateDao.selectPartnerTariffRate(parm).getCollection();
		List cond = partnerTariffRateDao.selectPartnerConditionList(parm).getCollection();
		
		for (Iterator it = pkgSum.iterator(); it.hasNext();) {
			PartnerTariffRateItem rate = (PartnerTariffRateItem) it.next();
			String vessels = "", delivery = "", cargo = "", commodity = "";
			
			for (Iterator subIt = cond.iterator(); subIt.hasNext();) {
				PartnerConditionItem condition = (PartnerConditionItem) subIt.next();
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("P1")
						&& condition.getChrVal() != null) {
					if (vessels.length() == 0) {
						vessels = condition.getChrVal();
					} else {
						vessels = vessels.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("C3")
						&& condition.getChrVal() != null) {
					if (delivery.length() == 0) {
						delivery = condition.getChrVal();
					} else {
						delivery = delivery.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PC1")
						&& condition.getChrVal() != null) {
					if (cargo.length() == 0) {
						cargo = condition.getChrVal();
					} else {
						cargo = cargo.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PC2")
						&& condition.getChrVal() != null) {
					if (commodity.length() == 0) {
						commodity = condition.getChrVal();
					} else {
						commodity = commodity.concat("," + condition.getChrVal());
					}
				}
			}
			
			for(Iterator pkgIt =pkgRate.iterator(); pkgIt.hasNext();) {
				PartnerTariffRateItem itemRate = (PartnerTariffRateItem)pkgIt.next();
				
				if(itemRate.getPkgTrfNo().equals(rate.getPkgTrfNo())) {
					rate.setTrfRegNo(itemRate.getTrfRegNo());
				}
			}
			
			rate.setVessels(vessels);
			rate.setDeliveryString(delivery);
			rate.setCargoString(cargo);
			rate.setCommodityString(commodity);
		}
		
		ptnrList.setCollection(pkgSum);
		return ptnrList;
	}
	
	public DataItemList selectPartnerTariffRateDetailList(SearchPartnerTariffRateParm param) throws BizException {
		PartnerTariffRateItem returnItem = new PartnerTariffRateItem();
		DataItemList ptnrItemList = new DataItemList();
	    
		List curRate = partnerTariffRateDao.selectCurrentPartnerTariffRate(param).getCollection();
		List pkgSum = partnerTariffRateDao.selectPartnerTariffRateSummary(param).getCollection();
		List pkgRate = partnerTariffRateDao.selectPartnerTariffRate(param).getCollection();
		List prpt = partnerTariffRateDao.selectPartnerConditionPropertyList(param).getCollection();
		List<PartnerConditionItem> cond = partnerTariffRateDao.selectPartnerConditionList(param).getCollection();
		List berthList = partnerTariffRateDao.selectBerthList(param).getCollection();

		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		partyCode.setLcd(CodeConstant.LCD_MOST);
		partyCode.setMcd(CodeConstant.MCD_MT_CGTP);
		DataItemList arrService = codeMasterDao.selectCodeMasterSmallCodeList((partyCode));
		
		boolean chkLOA = true;
		
		for (Iterator it = curRate.iterator(); it.hasNext();) {
			PartnerTariffRateItem rate = (PartnerTariffRateItem) it.next();
			String vessels = "", delivery = "", cargo = "", commodity = "", berthString = "", tier1Cago = "",
					tier2Cago = "", tier1Vsl = "", tier2Vsl = "";
			
			for (Iterator subIt = cond.iterator(); subIt.hasNext();) {
				PartnerConditionItem condition = (PartnerConditionItem) subIt.next();
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("P1")
						&& condition.getChrVal() != null) {
					if (vessels.length() == 0) {
						vessels = condition.getChrVal();
					} else {
						vessels = vessels.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("C3")
						&& condition.getChrVal() != null) {
					if (delivery.length() == 0) {
						delivery = condition.getChrVal();
					} else {
						delivery = delivery.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PC1")
						&& condition.getChrVal() != null) {
					if (cargo.length() == 0) {
						cargo = condition.getChrVal();
					} else {
						cargo = cargo.concat("," + condition.getChrVal());
					}
				}

				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PC2")
						&& condition.getChrVal() != null) {
					if (commodity.length() == 0) {
						commodity = condition.getChrVal();
					} else {
						commodity = commodity.concat("," + condition.getChrVal());
					}
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("P2")
						&& condition.getChrVal() != null) {
					berthString = condition.getChrVal();
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PC3")
						&& condition.getTierVal1() != null && condition.getTierVal2() != null) {
					tier1Cago = condition.getTierVal1();
					tier2Cago = condition.getTierVal2();
				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PV1")
						&& condition.getTierVal1() != null && condition.getTierVal2() != null) {
					tier1Vsl = condition.getTierVal1();
					tier2Vsl = condition.getTierVal2();

				}
				
				if (condition.getAgreNo().equals(rate.getPkgTrfNo()) && condition.getPrptCd().equals("PV2")
						&& condition.getTierVal1() != null && condition.getTierVal2() != null) {
					tier1Vsl = condition.getTierVal1();
					tier2Vsl = condition.getTierVal2();
					chkLOA = false;
				}
			}
			
			if (tier1Cago != "" || tier2Cago != "") {
				rate.setChkCargo(true);
			}
			
			if (chkLOA == true) {
				rate.setCkLOA(1);
			}
			
			if (chkLOA == false) {
				rate.setCkDWT(1);
			}
			
			rate.setTierVal1Vsl(tier1Vsl);
			rate.setTierVal2Vsl(tier2Vsl);
			rate.setTierVal1Cargo(tier1Cago);
			rate.setTierVal2Cargo(tier2Cago);
			rate.setVessels(vessels);
			rate.setDeliveryString(delivery);
			rate.setCargoString(cargo);
			rate.setCommodityString(commodity);
			rate.setPkgRate(pkgRate);
			rate.setPkgSum(pkgSum);
			rate.setPrpt(prpt);
			rate.setCond(cond);
			rate.setArrService(arrService.getCollection());
			rate.setBerthString(berthString);
			rate.setBerthList(berthList);
		}

		returnItem.setPkgRate(pkgRate);
		returnItem.setPkgSum(pkgSum);
		returnItem.setPrpt(prpt);
		returnItem.setCond(cond);
		returnItem.setCurRate(curRate);

		returnItem.setBerthList(berthList);

		returnItem.setArrService(arrService.getCollection());

		List returnItems = new ArrayList();
		returnItems.add(returnItem);
		ptnrItemList.setCollection(curRate);
		
		return ptnrItemList;
	}

	public DataItemList insertPartnerTariffRate(InsertItemsBizParm param) throws BizException {
		PartnerTariffRateItem res = new PartnerTariffRateItem();
		PartnerTariffRateItem col = (PartnerTariffRateItem) param.getInsertItems().get(0);
		String userId = "";
		DataItemList insertItems = new DataItemList();
	    insertItems.add(col);
		SearchPartnerTariffRateParm condParm = new SearchPartnerTariffRateParm();
		condParm.setPkgTrfNo(col.getPkgTrfNo());
		DataItemList insertPkg = new DataItemList();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		FileUploadItem fileUploadItem = new FileUploadItem();
		DataItemList insertPtnr = new DataItemList(); 
		List pkgRates = col.getPkgRate();
		
		boolean itmExisted = false;
		int count = 0;
		
		PartnerTariffRateItem pkgtemItem = new PartnerTariffRateItem();
		for (Iterator it = pkgRates.iterator(); it.hasNext() && !itmExisted;) {
			PartnerTariffRateItem pkg = (PartnerTariffRateItem) it.next();
			userId = pkg.getUserId();
			
			insertPtnr.add(pkg);
			insertPkg.add(pkg);
		}
		
		if (itmExisted) {
			throw new BizException("BL009004");
		}
		
		HashMap pkgNoMap = new HashMap();
		HashMap condSeqMap = new HashMap();
		
		if (insertPkg.size() > 0) {
			String maxPkgNoStr = partnerTariffRateDao.selectMaxPkgNo("");
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
			Integer maxRegNo;
			
			if (maxTrfRegNo == null) {
				maxRegNo = new Integer(0);
			} else {
				try {
					maxRegNo = new Integer(maxTrfRegNo);
				} catch (Exception e) {
					maxRegNo = new Integer(0);
				}
			}
			
			Calendar cal = Calendar.getInstance();
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			
			for (Iterator it = insertPkg.getCollection().iterator(); it.hasNext();) {
				PartnerTariffRateItem temp = (PartnerTariffRateItem) it.next();
				
				if(temp.getPkgTrfNo().equals("")){
					Integer newPkgNo = maxPkgNo;
					String tempStr = newPkgNo.toString();
					
					while (tempStr.length() != 7) {
						tempStr = "0".concat(tempStr);
					}
					
					tempStr = "PKG_" + tempStr;
					temp.setPkgTrfNo(tempStr);
				}
				
				maxRegNo += 1;
				
				String newTrfRegNo = "TRF" + year + StringConverter.formatNumString(Integer.toString(month), 2)
						+ StringConverter.formatNumString(maxRegNo.toString(), 7);
				temp.setTrfRegNo(newTrfRegNo);
				
				if (res.getPkgTrfNo() == null) {
					res.setPkgTrfNo(temp.getPkgTrfNo());
				}
			}
			
			insertItms.addInsertItem(insertPtnr);
			partnerTariffRateDao.insertPartnerTariffRates(insertItms);
		}

		String vessels = col.getVessels();
		String deliveryStr = col.getDeliveryString();
		String cargoStr = col.getCargoString();
		String commodityStr = col.getCommodityString();
		String tierVsl1 = col.getTierVal1Vsl();
		String tiervsl2 = col.getTierVal2Vsl();
		String tierCar1 = col.getTierVal1Cargo();
		String tierCar2 = col.getTierVal2Cargo();
		String berthString = col.getBerthString();
		
		if (berthString == null) {
			berthString = "";
		}
		
		String[] arrDelivery = null;
		String[] arrVessels = null;
		String[] arrCargo = null;
		String[] arrCommodity = null;

		ArrayList<String> arrExistCmd = new ArrayList<String>();
		ArrayList<String> arrExistDel = new ArrayList<String>();
		ArrayList<String> arrExistVsl = new ArrayList<String>();
		ArrayList<String> arrExistCar = new ArrayList<String>();
		
		if(deliveryStr != null && !deliveryStr.equals("")) {
			arrDelivery = deliveryStr.split(",");
			for (int i = 0; i < arrDelivery.length; i++) {
				arrExistDel.add(arrDelivery[i]);
			}
		}
		
		if(vessels != null && !vessels.equals("")) {
			arrVessels = vessels.split(",");
			for (int i = 0; i < arrVessels.length; i++) {
				arrExistVsl.add(arrVessels[i]);
			}
		}
		
		if(cargoStr != null && !cargoStr.equals("")) {
			arrCargo = cargoStr.split(",");
			for (int i = 0; i < arrCargo.length; i++) {
				arrExistCar.add(arrCargo[i]);
			}
		}
		
		if(commodityStr != null && !commodityStr.equals("")) {
			arrCommodity = commodityStr.split(",");
			for (int i = 0; i < arrCommodity.length; i++) {
				arrExistCmd.add(arrCommodity[i]);
			}
		}
		
		DataItemList insertPrpt = new DataItemList();
		
		if(res.getPkgTrfNo() == null || res.getPkgTrfNo().equals("")) {
			res.setPkgTrfNo(col.getPkgTrfNo());
		}
		
		condParm.setPkgTrfNo(res.getPkgTrfNo());
		List<PartnerConditionPropertyItem> condPrptList = partnerTariffRateDao.selectPartnerConditionPropertyList(condParm).getCollection();
		
		if (condPrptList.size() == 0 || condPrptList.size() == 8) {
			List<PartnerConditionPropertyItem> prptList = partnerTariffRateDao.selectPrptCDList(condParm).getCollection();
			for (Iterator itCndPrpt = prptList.iterator(); itCndPrpt.hasNext();) {
				PartnerConditionPropertyItem condPrptItem = (PartnerConditionPropertyItem) itCndPrpt.next();
				condPrptItem.setAgreNo(res.getPkgTrfNo());
				condPrptItem.setUserId(col.getUserId());
				insertPrpt.add(condPrptItem);
			}
		}
		
		if (insertPrpt.size() > 0) {
			InsertItemsBizParm insertPrpts = new InsertItemsBizParm();
			insertPrpts.addInsertItem(insertPrpt);
			partnerTariffRateDao.insertPartnerConditionProperties(insertPrpts);
		}
		
		DataItemList insertCond = new DataItemList();
		int maxSq = 0;
		boolean flagVesselsNull = false, flagDeliveryNull = false, flagBerthNull = false, flagCargoNull = false,
				flagCommodityNull = false, flagCarlHdlNull = false, flagVsllHdlNull = false;
		int sizeCond = 0;
		if(condParm.getPkgTrfNo() != "" || condParm.getPkgTrfNo() != null) {
			List<PartnerConditionItem> condListchk = partnerTariffRateDao.selectPartnerConditionList(condParm).getCollection();
			sizeCond = condListchk.size();
			if(res.getPkgTrfNo() == null || res.getPkgTrfNo().equals("") == true) {
				res.setPkgTrfNo(col.getPkgTrfNo());
			}
		}
		
		PartnerConditionItem item1Cond = new PartnerConditionItem();
		item1Cond.setAgreNo(res.getPkgTrfNo());
		item1Cond.setUserId(userId);
		item1Cond.setPrptCd("P1");
		item1Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		// item1Cond.setChrVal("");
		insertCond.add(item1Cond);

		PartnerConditionItem item2Cond = new PartnerConditionItem();
		item2Cond.setAgreNo(res.getPkgTrfNo());
		item2Cond.setUserId(userId);
		item2Cond.setPrptCd(BillingConstant.TRF_TP_PRPT_C3);
		item2Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		insertCond.add(item2Cond);

		PartnerConditionItem item3Cond = new PartnerConditionItem();
		item3Cond.setAgreNo(res.getPkgTrfNo());
		item3Cond.setUserId(userId);
		item3Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		item3Cond.setPrptCd("P2");
		insertCond.add(item3Cond);

		PartnerConditionItem item4Cond = new PartnerConditionItem();
		item4Cond.setAgreNo(res.getPkgTrfNo());
		item4Cond.setUserId(userId);
		item4Cond.setPrptCd("PC3");
		item4Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		insertCond.add(item4Cond);

		PartnerConditionItem item5Cond = new PartnerConditionItem();
		item5Cond.setAgreNo(res.getPkgTrfNo());
		item5Cond.setUserId(userId);
		item5Cond.setPrptCd("PV1");
		item5Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		insertCond.add(item5Cond);

		PartnerConditionItem item6Cond = new PartnerConditionItem();
		item6Cond.setAgreNo(res.getPkgTrfNo());
		item6Cond.setUserId(userId);
		item6Cond.setPrptCd("PV2");
		item6Cond.setOprIdtCd(BillingConstant.OP_EQUAL);
		insertCond.add(item6Cond);

		PartnerConditionItem item7Cond = new PartnerConditionItem();
		item7Cond.setAgreNo(res.getPkgTrfNo());
		item7Cond.setUserId(userId);
		item7Cond.setPrptCd("PC1");
		insertCond.add(item7Cond);

		PartnerConditionItem item8Cond = new PartnerConditionItem();
		item8Cond.setAgreNo(res.getPkgTrfNo());
		item8Cond.setUserId(userId);
		item8Cond.setPrptCd("PC2");
		insertCond.add(item8Cond);
		
		if (flagVesselsNull == false && vessels != null && !vessels.equals("")) {
			for (int i = 0; i < arrVessels.length; i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd("P1");
				itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
				itemCond.setChrVal(arrVessels[i]);
				insertCond.add(itemCond);
			}
		}
		
		if (flagDeliveryNull == false && deliveryStr != null && !deliveryStr.equals("")) {
			for (int i = 0; i < arrDelivery.length; i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
		
				itemCond.setUserId(userId);
				itemCond.setPrptCd(BillingConstant.TRF_TP_PRPT_C3);
				itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
				itemCond.setChrVal(arrDelivery[i]);
				insertCond.add(itemCond);
			}
		}

		if (flagBerthNull == false && berthString != null && !berthString.equals("")) {
			PartnerConditionItem itemCond = new PartnerConditionItem();
			if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
				itemCond.setAgreNo(res.getPkgTrfNo());
			} else {
				itemCond.setAgreNo(col.getPkgTrfNo());
			}
			
			itemCond.setUserId(userId);
			itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
			itemCond.setPrptCd("P2");
			itemCond.setChrVal(berthString);
			insertCond.add(itemCond);
		}

		if (flagCarlHdlNull == false 
				&& ((tierCar1 != null && !tierCar1.equals("")) || (tierCar2 != null && !tierCar2.equals("")))) {
			PartnerConditionItem itemCond = new PartnerConditionItem();
			
			if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
				itemCond.setAgreNo(res.getPkgTrfNo());
			} else {
				itemCond.setAgreNo(col.getPkgTrfNo());
			}
			
			itemCond.setUserId(userId);
			itemCond.setPrptCd("PC3");
			itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
			itemCond.setTierVal1(tierCar1);
			itemCond.setTierVal2(tierCar2);
			insertCond.add(itemCond);
		}
		
		if (flagCarlHdlNull == false 
				&& ((tierCar1 != null && !tierCar1.equals("")) || (tierCar2 != null && !tierCar2.equals("")))
				&& col.getCkLOA() == 1) {
			PartnerConditionItem itemCond = new PartnerConditionItem();
			
			if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
				itemCond.setAgreNo(res.getPkgTrfNo());
			} else {
				itemCond.setAgreNo(col.getPkgTrfNo());
			}
			
			itemCond.setUserId(userId);
			itemCond.setPrptCd("PV1");
			itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
			itemCond.setTierVal1(tierVsl1);
			itemCond.setTierVal2(tiervsl2);
			insertCond.add(itemCond);
		}
		
		if (flagCarlHdlNull == false 
				&& ((tierCar1 != null && !tierCar1.equals("")) || (tierCar2 != null && !tierCar2.equals("")))
				&& col.getCkDWT() == 1) {
			PartnerConditionItem itemCond = new PartnerConditionItem();
			
			if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
				itemCond.setAgreNo(res.getPkgTrfNo());
			} else {
				itemCond.setAgreNo(col.getPkgTrfNo());
			}
			
			itemCond.setUserId(userId);
			itemCond.setPrptCd("PV2");
			itemCond.setOprIdtCd(BillingConstant.OP_EQUAL);
			itemCond.setTierVal1(tierVsl1);
			itemCond.setTierVal2(tiervsl2);
			insertCond.add(itemCond);
		}

		if (flagCargoNull == false && cargoStr != null && !cargoStr.equals("")) {
			for (int i = 0; i < arrCargo.length; i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
			
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd("PC1");
				itemCond.setChrVal(arrCargo[i]);
				insertCond.add(itemCond);
			}
		}
		
		if (flagCommodityNull == false && commodityStr != null && !commodityStr.equals("")) {
			for (int i = 0; i < arrCommodity.length; i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
		
				itemCond.setUserId(userId);
				itemCond.setPrptCd("PC2");
				itemCond.setChrVal(arrCommodity[i]);
				insertCond.add(itemCond);
			}
		}
		
		if (arrExistVsl.size() > 0 && flagVesselsNull == true) {
			for (int i = 0; i < arrExistVsl.size(); i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd("P1");
				itemCond.setChrVal(arrExistVsl.get(i));
				insertCond.add(itemCond);
			}
		}
		
		if (arrExistDel.size() > 0 && flagDeliveryNull == true) {
			for (int i = 0; i < arrExistDel.size(); i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd(BillingConstant.TRF_TP_PRPT_C3);
				itemCond.setChrVal(arrExistDel.get(i));
				insertCond.add(itemCond);
			}
		}
		
		if (arrExistCar.size() > 0 && flagCargoNull == true) {
			for (int i = 0; i < arrExistCar.size(); i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
		
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd("PC1");
				itemCond.setChrVal(arrExistCar.get(i));
				insertCond.add(itemCond);
			}
		}
		
		if (arrExistCmd.size() > 0 && flagCommodityNull == true) {
			for (int i = 0; i < arrExistCmd.size(); i++) {
				PartnerConditionItem itemCond = new PartnerConditionItem();
				
				if (col.getPkgTrfNo() == null || col.getPkgTrfNo().equals("")) {
					itemCond.setAgreNo(res.getPkgTrfNo());
				} else {
					itemCond.setAgreNo(col.getPkgTrfNo());
				}
				
				itemCond.setUserId(userId);
				itemCond.setPrptCd("PC2");
				itemCond.setChrVal(arrExistCmd.get(i));
				insertCond.add(itemCond);
			}
		}
		
		// //create package condition sequence
		String tmpString = "";
		if (insertCond.size() > 0) {
			for (Iterator itCond = insertCond.getCollection().iterator(); itCond.hasNext();) {
				PartnerConditionItem temp = (PartnerConditionItem) itCond.next();

				Object pkgSeq = pkgNoMap.get(temp.getAgreNo());
				Object seq = condSeqMap.get(temp.getAgreNo());

				if (seq == null) {
					// add condition to package rate that exists in DB
					if (pkgSeq == null) {
						Integer maxCondSeq = maxSq;
						System.out.print("MaxCondSeq" + maxCondSeq);
						if (maxCondSeq == null)
							maxCondSeq = new Integer(0);
						maxCondSeq = new Integer(maxCondSeq.intValue() + 1);
						temp.setSeq(maxCondSeq.toString());
						condSeqMap.put(temp.getAgreNo(), maxCondSeq);
					}
					//add condition to a newly package
					// Integer maxCondSeq = new Integer(1);
					// //add the sequence before update the package tariff
					// // rate no
					// // -> use the dummy package tariff no as reference
					// condSeqMap.put(temp.getAgreNo(), maxCondSeq);
					// // temp.setAgreNo(((Integer) pkgSeq).toString());
					// temp.setAgreNo(tempPkgNo);
					// temp.setSeq(maxCondSeq.toString());
				} else {
					// add condition to existed package rate
					if (pkgSeq == null) {
						Integer maxCondSeq = new Integer(((Integer) seq).intValue() + 1);
						temp.setSeq(maxCondSeq.toString());
						condSeqMap.put(temp.getAgreNo(), maxCondSeq);
						// add condition to nonexisted package rate
					} else {// add condition to newly package tariff rate
						Integer maxCondSeq = new Integer(((Integer) seq).intValue() + 1);
						// add the sequence before update the package tariff
						// rate no
						// -> use the dummy package tariff no as reference
						condSeqMap.put(temp.getAgreNo(), maxCondSeq);
						// temp.setAgreNo(((Integer) pkgSeq).toString());
						// temp.setAgreNo(tempPkgNo);
						temp.setSeq(maxCondSeq.toString());
					}

				}
			}
			//Convert Collection to dataItemList
			DataItemList conditionList = new DataItemList();
			conditionList.setCollection(insertCond.getCollection());
			InsertItemsBizParm insertCondition = new InsertItemsBizParm();
			insertCondition.addInsertItem(conditionList);
			partnerTariffRateDao.insertPartnerConditions(insertCondition);
		}
		
		//file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) col.getUploadItems();
		
		if (fileuploadList != null && fileuploadList.size() > 0) {
			String originCatgCd = fileuploadList.get(0).getCatgCd();
			
			fileuploadList.get(0).setCatgCd(res.getPkgTrfNo() + originCatgCd);
			
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((PartnerTariffRateItem)param.getInsertItems().get(0)).getUserId());
			
			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((PartnerTariffRateItem)param.getInsertItems().get(0)).getUserId());
			
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((PartnerTariffRateItem)param.getInsertItems().get(0)).getUserId());
			
			fileUpload.applyUploadItems(cudParm);
		}
		
		ArrayList list = new ArrayList();
		list.add(res);
		PartnerTariffRateItem itm = new PartnerTariffRateItem();
		itm.add(list);

		return insertItems;
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
		
		for(Object obj : pkgRateCopyList ) {
			PartnerTariffRateItem item = (PartnerTariffRateItem) obj;
			
			if( item.getWorkingStatus().equals( DAOProcessType.INSERT ) ) {
				insertItemsCollection.add(item);
				pkgRateList.remove(item);
			}
		}
		
		if( !pkgRateList.isEmpty() ) {
			updateResult.setCollection(pkgRateList);
			parm.setUpdateItems(updateResult);
			updateResult = partnerTariffRateDao.updatePartnerTariffRates(parm);
		}
		
		if(!insertItemsCollection.getCollection().isEmpty()) {
			for(int i = 0; i < insertItemsCollection.getCollection().size(); i++) {
				
				String maxPkgNoStr = partnerTariffRateDao.selectMaxPkgNo("");
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
					maxTempTrfRegNo+= 1;
					String newTrfRegNo = "TRF" + year + StringConverter.formatNumString(Integer.toString(month), 2)
					+ StringConverter.formatNumString(maxTempTrfRegNo.toString(), 7);
					temp.setTrfRegNo(newTrfRegNo);
				}				
			}
			insertItems.setInsertItems(insertItemsCollection);
			partnerTariffRateDao.insertPartnerTariffRates(insertItems);
		}
		
		//file upload function
		ArrayList<FileUploadItem> fileUploadList = (ArrayList<FileUploadItem>) col.getUploadItems();
		
		if (fileUploadList != null && fileUploadList.size() > 0) {
			if(DAOProcessType.INSERT.equals(fileUploadList.get(0).getWorkingStatus())) {
				String originCatgCd = fileUploadList.get(0).getCatgCd();
				
				fileUploadList.get(0).setCatgCd(col.getPkgTrfNo() + originCatgCd);
			}
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((PartnerTariffRateItem)parm.getUpdateItems().get(0)).getUserId());
			
			fileUploadItem.setItems(fileUploadList);
			fileUploadItem.setUserId(((PartnerTariffRateItem)parm.getUpdateItems().get(0)).getUserId());
			
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((PartnerTariffRateItem)parm.getUpdateItems().get(0)).getUserId());
			
			fileUpload.applyUploadItems(cudParm);
		}
		
		return items;
	}

	public void deletePartnerTariffRate(DeleteItemsBizParm parm) throws BizException {
		PartnerTariffRateItem col = (PartnerTariffRateItem) parm.getDeleteItems().get(0);
		partnerTariffRateDao.deletePartnerTariffRates(parm);
		
		partnerTariffRateDao.deleteAllPartnerCondition(col);
		partnerTariffRateDao.deleteAllPartnerConditionProperty(col);
	}
	
	public void deletePartnerTariffRateDetail(DeleteItemsBizParm parm) throws BizException {
		PartnerTariffRateItem col = (PartnerTariffRateItem) parm.getDeleteItems().get(0);
		partnerTariffRateDao.deletePartnerTariffDetailRates(parm);
		
		partnerTariffRateDao.deleteAllPartnerCondition(col);
		partnerTariffRateDao.deleteAllPartnerConditionProperty(col);
	}

}
