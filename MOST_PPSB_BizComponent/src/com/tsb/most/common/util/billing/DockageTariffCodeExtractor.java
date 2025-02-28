package com.tsb.most.common.util.billing;

import java.math.BigDecimal;
import java.math.RoundingMode;

import com.tsb.most.biz.dao.billing.ITariffCodeGeneratorDao;
import com.tsb.most.biz.dataitem.billing.TariffCodeConditionItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.parm.billing.SearchTariffcodeGeneratorParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DockageTariffCodeExtractor extends AbstractTariffCodeExtractor{
	
	
	public DockageTariffCodeExtractor(String mode, String type) {
		super(mode, type);
	}

	public DataItemList performExtractTask(ITariffCodeGeneratorDao oTrfGenDao) throws BizException {
		DataItemList oExtTrfList = new DataItemList();
		DataItemList rtnList = new DataItemList();
		
		SearchTariffcodeGeneratorParm trfGenParm = new SearchTariffcodeGeneratorParm();
		DataItemList targetDcItemList = new DataItemList();
		DataItemList delayItems = new DataItemList();
		BigDecimal firstAcptDelayHrs = new BigDecimal(0);
		BigDecimal secondAcptDelayHrs = new BigDecimal(0);
		BigDecimal thirdAcptDelayHrs = new BigDecimal(0);
		
		BigDecimal dockageHrs = new BigDecimal(0);
		BigDecimal firstDockageHrs = new BigDecimal(0);
		BigDecimal secondDockageHrs = new BigDecimal(0);
		BigDecimal thirdDockageHrs = new BigDecimal(0);
		
		for(int i=0;i<targetDataList.size();i++) {
			TariffCodeGeneratorItem tempItem = (TariffCodeGeneratorItem)targetDataList.get(i);
			TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem) tempItem.clone();
			trfGenParm.setVslCallId(tempItem.getVslCallId());
			
			if(targetItem.getAtw() == null && targetItem.getAtc() == null) {
				//Loading cancel case
				targetItem.setDockageType(BillingConstant.MT_DKGTP_LC);
				targetItem.setDockageHrs(targetItem.getNormalDockageHrs());
				targetDcItemList.add(targetItem);
			} else if (targetItem.getVslTp() != null &&
					(targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_BBK)
					|| targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_DBN)
					|| targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_DBE)
					|| targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_LQN)
					|| targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_LQE))){
				//Break/Dry bulk vessel 
				trfGenParm.setAcptDelayYn(CommonConstants.Y);
				
				//1st acceptable delay
				StringBuffer whereSQL = new StringBuffer();
				whereSQL.append("AND ((ST_DT >= CONVERT(DATETIME, '" + targetItem.getAtb() + "', 103) AND END_DT <= CONVERT(DATETIME, '" + targetItem.getAtw() + "', 103))");
//				whereSQL.append("OR (ST_DT <= CONVERT(DATETIME, '" + targetItem.getAtb() + "', 103) AND END_DT > CONVERT(DATETIME, '" + targetItem.getAtb() + "', 103))");
//				whereSQL.append("OR (ST_DT < CONVERT(DATETIME, '" + targetItem.getAtw() + "', 103) AND END_DT >= CONVERT(DATETIME, '" + targetItem.getAtw() + "', 103))");
				whereSQL.append(")");
				trfGenParm.setWhereSQL(whereSQL.toString());
				
				delayItems = oTrfGenDao.selectDelayHrsForDockageCharge(trfGenParm);
				if(delayItems.size() > 0) {
					TariffCodeGeneratorItem delayItem = (TariffCodeGeneratorItem)delayItems.get(0);
					firstAcptDelayHrs = new BigDecimal(delayItem.getDelayHrs());
				}
				
				//2nd acceptable delay
				whereSQL = new StringBuffer();
				whereSQL.append("AND ((ST_DT >= CONVERT(DATETIME, '" + targetItem.getAtc() + "', 103) AND END_DT <= CONVERT(DATETIME, '" + targetItem.getAtu() + "', 103)))");
				trfGenParm.setWhereSQL(whereSQL.toString());
				
				delayItems = oTrfGenDao.selectDelayHrsForDockageCharge(trfGenParm);
				if(delayItems.size() > 0) {
					TariffCodeGeneratorItem delayItem = (TariffCodeGeneratorItem)delayItems.get(0);
					secondAcptDelayHrs = new BigDecimal(delayItem.getDelayHrs());
				}
				
				//3rd acceptable delay
				whereSQL = new StringBuffer();
				whereSQL.append("AND ((ST_DT >= CONVERT(DATETIME, '" + targetItem.getAtw() + "', 103) AND END_DT <= CONVERT(DATETIME, '" + targetItem.getAtc() + "', 103)))");
				trfGenParm.setWhereSQL(whereSQL.toString());
				
				delayItems = oTrfGenDao.selectDelayHrsForDockageCharge(trfGenParm);
				if(delayItems.size() > 0) {
					TariffCodeGeneratorItem delayItem = (TariffCodeGeneratorItem)delayItems.get(0);
					thirdAcptDelayHrs = new BigDecimal(delayItem.getDelayHrs());
				}
				
				firstDockageHrs = new BigDecimal(targetItem.getFirstDockageHrs()).subtract(firstAcptDelayHrs).subtract(new BigDecimal(2)).setScale(2, RoundingMode.HALF_UP);
				if(firstDockageHrs.compareTo(BigDecimal.ZERO) < 0) {
					firstDockageHrs = new BigDecimal(0);
				}
				
				secondDockageHrs = new BigDecimal(targetItem.getSecondDockageHrs()).subtract(secondAcptDelayHrs).subtract(new BigDecimal(1)).setScale(2, RoundingMode.HALF_UP);
				if(secondDockageHrs.compareTo(BigDecimal.ZERO) < 0) {
					secondDockageHrs = new BigDecimal(0);
				}
				
				//dockageHrs = new BigDecimal(targetItem.getNormalDockageHrs()).subtract(firstDockageHrs).subtract(secondDockageHrs).subtract(thirdAcptDelayHrs);
				dockageHrs = new BigDecimal(targetItem.getNormalDockageHrs()).subtract(thirdAcptDelayHrs);
				targetItem.setDockageHrs(dockageHrs.setScale(0, RoundingMode.HALF_UP).toString());
				if("SCHEDULE".equals(targetItem.getSearchType())
						|| "SHIFTING".equals(targetItem.getSearchType())) {
					targetItem.setDockageType(BillingConstant.MT_DKGTP_NR);//normal dockage
				} else if("DOUBLE_BANKING".equals(targetItem.getSearchType())) {
					targetItem.setDockageType(BillingConstant.MT_DKGTP_DK);//DOUBLE BANKING
				}
				
				targetDcItemList.add(targetItem);
				
				//1st dockage
				TariffCodeGeneratorItem firstDcItem = (TariffCodeGeneratorItem)targetItem.clone();
				firstDcItem.setDockageHrs(firstDockageHrs.toString());
				if("SCHEDULE".equals(firstDcItem.getSearchType())
						|| "SHIFTING".equals(firstDcItem.getSearchType())) {
					firstDcItem.setDockageType(BillingConstant.MT_DKGTP_FD);//1st D/Double
				} else if("DOUBLE_BANKING".equals(firstDcItem.getSearchType())) {
					firstDcItem.setDockageType(BillingConstant.MT_DKGTP_FDK);//1st D/Double Banking
				}
				targetDcItemList.add(firstDcItem);
				
				//2nd dockage
				TariffCodeGeneratorItem secondDcItem = (TariffCodeGeneratorItem)targetItem.clone();
				secondDcItem.setDockageHrs(secondDockageHrs.toString());
				if("SCHEDULE".equals(secondDcItem.getSearchType())
						|| "SHIFTING".equals(secondDcItem.getSearchType())) {
					secondDcItem.setDockageType(BillingConstant.MT_DKGTP_SD);//2nd D/Double
				} else if("DOUBLE_BANKING".equals(secondDcItem.getSearchType())) {
					secondDcItem.setDockageType(BillingConstant.MT_DKGTP_SDK);//2nd D/Double Banking
				}
				targetDcItemList.add(secondDcItem);
				
				if (targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_LQN)
						|| targetItem.getVslTp().equals(BillingConstant.MT_VSLTP_LQE)){
					//3rd Dockage
					//3rd unacceptable delay
					trfGenParm.setAcptDelayYn(CommonConstants.N);
					whereSQL = new StringBuffer();
					whereSQL.append("AND ((ST_DT >= CONVERT(DATETIME, '" + targetItem.getAtw() + "', 103) AND END_DT <= CONVERT(DATETIME, '" + targetItem.getAtc() + "', 103)))");
					trfGenParm.setWhereSQL(whereSQL.toString());
					
					delayItems = oTrfGenDao.selectDelayHrsForDockageCharge(trfGenParm);
					if(delayItems.size() > 0) {
						TariffCodeGeneratorItem delayItem = (TariffCodeGeneratorItem)delayItems.get(0);
						thirdDockageHrs = new BigDecimal(delayItem.getDelayHrs()).subtract(new BigDecimal(1));
						
						if(thirdDockageHrs.compareTo(BigDecimal.ZERO) < 0) {
							thirdDockageHrs = new BigDecimal(0);
						}
					}
					
					TariffCodeGeneratorItem thirdDcItem = (TariffCodeGeneratorItem)targetItem.clone();
					thirdDcItem.setDockageHrs(thirdDockageHrs.toString());
					if("SCHEDULE".equals(thirdDcItem.getSearchType())
							|| "SHIFTING".equals(thirdDcItem.getSearchType())) {
						firstDcItem.setDockageType(BillingConstant.MT_DKGTP_TD);//3rd D/Double
					} else if("DOUBLE_BANKING".equals(thirdDcItem.getSearchType())) {
						firstDcItem.setDockageType(BillingConstant.MT_DKGTP_TDK);//3rd D/Double Banking
					}
					targetDcItemList.add(thirdDcItem);
					
				}
			}
		}
	
		for(int i=0;i<targetDcItemList.size();i++) { //The target of data gathering object list
			oExtTrfList = new DataItemList();
			TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem)targetDcItemList.get(i);
			
			TariffCodeGenerator oTrfGen = TariffCodeGeneratorFactory.getInstance().getGenerator(trfType);
			
			for(int j=0;j<oTrfGen.getDistinctTariffCodList().size();j++) { //Tariff code list based on tariff type
				TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem)oTrfGen.getDistinctTariffCodList().get(j).clone();
				DataItemList trfCondList = oTrfGenDao.selectTrfCondPrpt(trfItem);
				
				boolean isContinue = false;
				boolean isAddable = true;
				
				for(int k = 0;k<trfCondList.size();k++) { // tariff code condition
					isContinue = oTrfGen.executeTariff(trfItem,(TariffCodeConditionItem)trfCondList.get(k),targetItem);
					
					if(!isContinue) {
						isAddable = false;
						break;
					}
				}
				
				if(isAddable) {
					oExtTrfList.add(trfItem);
				}
			}
			
			targetItem.setTrfBucketList(oExtTrfList);
			rtnList.add(targetItem);
		}

		return rtnList;
	}
}
