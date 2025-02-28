package com.tsb.most.biz.service.billing;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.billing.IDataGatheringDao;
import com.tsb.most.biz.dao.billing.ITariffCodeGeneratorDao;
import com.tsb.most.biz.dataitem.billing.DataGatheringItem;
import com.tsb.most.biz.dataitem.billing.GatheredDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.dataitem.billing.TariffCodePayerItem;
import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.biz.parm.billing.SearchTariffServiceOrderGatheredParm;
import com.tsb.most.biz.parm.billing.SearchTariffcodeGeneratorParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.common.util.billing.AbstractTariffCodeExtractor;
import com.tsb.most.common.util.billing.CargoTariffCodeCalcurator;
import com.tsb.most.common.util.billing.CargoTariffCodeExtractor;
import com.tsb.most.common.util.billing.DockageTariffCodeCalcurator;
import com.tsb.most.common.util.billing.DockageTariffCodeExtractor;
import com.tsb.most.common.util.billing.TariffCodeExtractorFactory;
import com.tsb.most.common.util.billing.TariffCodeGenerator;
import com.tsb.most.common.util.billing.TariffCodeGeneratorFactory;
import com.tsb.most.common.util.billing.VesselTariffCodeCalcurator;
import com.tsb.most.common.util.billing.VesselTariffCodeExtractor;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DataGathering extends MOSTBaseService implements IDataGathering{
	private IDataGatheringDao dataGatheringDao;
	private ITariffCodeGeneratorDao tariffCodeGeneratorDao;
	
	public void setDataGatheringDao(IDataGatheringDao dataGatheringDao) {
		this.dataGatheringDao = dataGatheringDao;
	}

	public void settariffCodeGeneratorDao(ITariffCodeGeneratorDao tariffCodeGeneratorDao) {
		this.tariffCodeGeneratorDao = tariffCodeGeneratorDao;
	}
						
	public DataItemList selectDataGathering(SearchDataGatheringParm parm) throws BizException{
		return dataGatheringDao.selectDataGathering(parm);
    }
    					
    public DataItemList selectDataGatheringDetail(SearchDataGatheringParm parm) throws BizException{
    	DataGatheringItem returnItem = new DataGatheringItem();
    	DataItemList rtnList = new DataItemList();

    	ArrayList<GatheredDataItem> gatheredDataList = (ArrayList<GatheredDataItem>)dataGatheringDao.selectGatheredData(parm).getCollection();
    	ArrayList<DataGatheringItem> vesselInfoList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectVesselInformation(parm).getCollection();
    	ArrayList<DataGatheringItem> cargoInfoList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectCargoInformation(parm).getCollection();
    	ArrayList<DataGatheringItem> cargoSummarizeInfoList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectCargoSumInformation(parm).getCollection();
    	ArrayList<DataGatheringItem> EquipmentInfoList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectEquipmentInformation(parm).getCollection();
    	ArrayList<DataGatheringItem> PayerInfoList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectPayerData(parm).getCollection();
    	ArrayList<DataGatheringItem> detailList = (ArrayList<DataGatheringItem>)dataGatheringDao.selectDataGatheringDetail(parm).getCollection();

		returnItem.setChildGatheredData(gatheredDataList);
		returnItem.setChildVesselInfo(vesselInfoList);
		returnItem.setChildCargoInfo(cargoInfoList);
		returnItem.setChildCargoSumInfo(cargoSummarizeInfoList);
		returnItem.setChildEquipmentInfo(EquipmentInfoList);
		returnItem.setPayerInfo(PayerInfoList);
		returnItem.setDetailList(detailList);		

	    rtnList.add(returnItem);
	  
		return rtnList;
    }
    
    public DataItemList applyDataGatheringDetail(UpdateItemsBizParm parm) throws BizException{
    	DataItemList itemList = parm.getUpdateItems();
    	ArrayList<DataGatheringItem> arrItem = (ArrayList<DataGatheringItem>)itemList.getCollection();
    	DataGatheringItem item = (DataGatheringItem) arrItem.get(0);
    	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
    	ArrayList<DataGatheringItem> bbtList = item.getBbtcheckInfo();
    	
    	if(bbtList.size() > 0) {
    		for(int i = 0; i < bbtList.size(); i++) {
    			DataGatheringItem bbtItem = bbtList.get(i);
    			
    			updateParm.addUpdateItem(bbtItem);
    		}
    	}
    	
        return dataGatheringDao.applyDataGatheringDetail(updateParm);
    }
    
	@SuppressWarnings("unchecked")
	public DataItemList applyDataGathering(UpdateItemsBizParm parm) throws BizException {
		SearchTariffcodeGeneratorParm trfGenParm = new SearchTariffcodeGeneratorParm();
		SearchTariffcodeGeneratorParm trfTypeParm = new SearchTariffcodeGeneratorParm();
		
		SearchTariffServiceOrderGatheredParm searchServiceOrderparm = new SearchTariffServiceOrderGatheredParm();
		
		DataItemList payerList = new DataItemList();
		
		String payerCode = "";
		String payerType = "";
		String ptnrRate = "";
		String stdRate = "";
		
		//Tariff code type 
		DataItemList trfType = null;
		String[] trfTypeList = null;
		
		TariffCodeGenerator generator = null;
		AbstractTariffCodeExtractor extractor = null;
		
		DataItemList targetItemList = parm.getUpdateItems();
		
		//target data gathering item
		for(int i=0;i < targetItemList.size();i++) {
			DataGatheringItem item = (DataGatheringItem)targetItemList.get(i);
			trfGenParm.setVslCallId(item.getVslCallId());
			trfGenParm.setUserId(item.getUserId());
			
			//delete data into the TMT_B_IV_DATA
			InvoiceDataItem invItem = new InvoiceDataItem();
			invItem.setVslCallId(item.getVslCallId());
			
			DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
			deleteItems.addDeleteItem(invItem);
			
			tariffCodeGeneratorDao.deleteItem(deleteItems);
			
			//get Tariff code (tariff code initialization)
			StringBuffer sqlWhere = new StringBuffer();
			sqlWhere.append("AND L_CD = '"+CodeConstant.LCD_MOST+"'")
				    .append("AND M_CD = '"+CodeConstant.MCD_MT_TRFTP+"'")
				    .append("AND S_CD_USE = 'Y'");
			
			trfTypeParm.setWhereSQL(sqlWhere.toString());
			ArrayList<TariffCodeGatheredItem> trfCodeType = (ArrayList<TariffCodeGatheredItem>)tariffCodeGeneratorDao.selectTariffCodeType(trfTypeParm).getCollection();
					
			TariffCodeGeneratorFactory oGenfactory = TariffCodeGeneratorFactory.createInstance(item.getVslCallId());
			oGenfactory.setTrfType(trfCodeType);
			
			TariffCodeExtractorFactory oStdExtfactory = TariffCodeExtractorFactory.createInstance(BillingConstant.TRF_CODE_MODE_STANDARD,item.getVslCallId());
			oStdExtfactory.setTrfType(trfCodeType);
			
			
			//Tariff code type (tariffCodeGatheredItem)
			for(TariffCodeGatheredItem trfCodeTypeItem : trfCodeType) {
				trfGenParm.setTarDiv(trfCodeTypeItem.getTrfTpCd());
				trfGenParm.setWhereSQL("AND	TRF.PRC_TP_CD = '"+BillingConstant.TRF_CODE_MODE_STANDARD+"'");
				
				DataItemList rtnList = tariffCodeGeneratorDao.selectTariffCodelist(trfGenParm);	
				
				if(rtnList.size() == 0) {
					continue;
				}
				
				generator = new TariffCodeGenerator(trfCodeTypeItem.getTrfTpCd(),rtnList);
				oGenfactory.setGenerator(trfCodeTypeItem.getTrfTpCd(), generator);
				
				if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_PD)) { //Vessel 
					extractor = new VesselTariffCodeExtractor(BillingConstant.TRF_CODE_MODE_STANDARD,trfCodeTypeItem.getTrfTpCd());
				} else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_DC)){ // Dockage 
					extractor = new DockageTariffCodeExtractor(BillingConstant.TRF_CODE_MODE_STANDARD,trfCodeTypeItem.getTrfTpCd());
				} else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HG)
						|| trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HE)){ //Handling Goods
					extractor = new CargoTariffCodeExtractor(BillingConstant.TRF_CODE_MODE_STANDARD, trfCodeTypeItem.getTrfTpCd());
				} else {
				
				}
				
				oStdExtfactory.setExtractor(trfCodeTypeItem.getTrfTpCd(), extractor);
				
			}
			
			//To get target data for data gathering (Vessel Part)
			DataItemList vslItemList = new DataItemList();
			vslItemList = tariffCodeGeneratorDao.selectGenerateVesselScheduleList(trfGenParm);
			
			//To get target data for Dockage Charge (Vessel Part)
			DataItemList dockageItemList = new DataItemList();
			dockageItemList = tariffCodeGeneratorDao.selectGenerateVesselDockageCharge(trfGenParm);
			
			
			//To get data for data gathering (Cargo Part)
			DataItemList cargoItemList = new DataItemList(); 
			cargoItemList = tariffCodeGeneratorDao.selectGenerateHandlingGoodsItems(trfGenParm);
			
			//To get data for Equipment gathering (Equipment ) 
			
//			if(vslItemList != null && vslItemList.size() > 0 ) {	
//				TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem)vslItemList.get(0);
//				
//				//get payer
//				payerList = tariffCodeGeneratorDao.selectTrfPayerList(trfGenParm); 
//				
//				if(payerList.size() > 0) {
//					TariffCodePayerItem payer = (TariffCodePayerItem)payerList.get(0);
//					payerCode = payer.getPtnrCd();
//				}else {
//					payerCode = targetItem.getShipgAgnt();
//					payerType = targetItem.getShaPayTpCd();
//				}
//			
//			}
			
			//Tariff code type (tariffCodeGatheredItem)
			for(TariffCodeGatheredItem trfCodeTypeItem : trfCodeType) {
				ArrayList<TariffCodeGeneratorItem> trfBucket = new ArrayList<TariffCodeGeneratorItem> ();
				
				if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_PD)) { //Vessel 
					
					extractor = (VesselTariffCodeExtractor)oStdExtfactory.getGenerator(trfCodeTypeItem.getTrfTpCd());
					
					if(extractor == null) {
						continue;
					}
					
					extractor.setTargetDataList(vslItemList);
					trfBucket = (ArrayList<TariffCodeGeneratorItem>)extractor.performExtractTask(tariffCodeGeneratorDao).getCollection();
					
					
					
				}else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_DC)){ // Dockage 
					extractor = (DockageTariffCodeExtractor)oStdExtfactory.getGenerator(trfCodeTypeItem.getTrfTpCd());
					
					if(extractor == null) {
						continue;
					}
					
					extractor.setTargetDataList(dockageItemList);
					
					trfBucket = (ArrayList<TariffCodeGeneratorItem>)extractor.performExtractTask(tariffCodeGeneratorDao).getCollection();
					
				} else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HG)
						|| trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HE)){ // Handling goods 
					extractor = (CargoTariffCodeExtractor)oStdExtfactory.getGenerator(trfCodeTypeItem.getTrfTpCd());
					
					if(extractor == null) {
						continue;
					}
					
					extractor.setTargetDataList(cargoItemList);
					
					trfBucket = (ArrayList<TariffCodeGeneratorItem>)extractor.performExtractTask(tariffCodeGeneratorDao).getCollection();
					
				} else {
				}
				
				for(TariffCodeGeneratorItem oGenTrfItem : trfBucket) {
					if(oGenTrfItem.getTrfBucketList().size() > 0) {
						
						if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_PD)) {
					
							VesselTariffCodeCalcurator calcurator = new VesselTariffCodeCalcurator(oGenTrfItem, payerList);
							calcurator.executeCalcurate();
							
							
						} else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_DC)){ // Dockage 
							DockageTariffCodeCalcurator calcurator = new DockageTariffCodeCalcurator(oGenTrfItem, payerList);
							calcurator.executeCalcurate();
							
						} else if(trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HG)
								|| trfCodeTypeItem.getTrfTpCd().equals(BillingConstant.TRF_TP_HE)){ // Handling Goods 
							CargoTariffCodeCalcurator calcurator = new CargoTariffCodeCalcurator(oGenTrfItem, payerList);
							calcurator.executeCalcurate();
							
						} else {
							
						}
						
						/**
						 * 2. insert data into the TMT_B_IV_DATA
						 * */
						InsertItemsBizParm insertItem = new InsertItemsBizParm();
						
						insertItem.addInsertItem(oGenTrfItem.getInvoiceList());
						tariffCodeGeneratorDao.insertItems(insertItem);
					}
				}
			}
		}
		
		return targetItemList;
	}
    
    public void applyGatheredDataDelete(DeleteItemsBizParm parm) throws BizException{
        dataGatheringDao.applyGatheredDelete(parm); 
        dataGatheringDao.applyGatheredDeleteDetail(parm);
    }

	@Override
	public DataItemList selectValidVslSchedule(SearchDataGatheringParm parm) throws BizException {
		return dataGatheringDao.selectValidVslSchedule(parm); 
	}
}
