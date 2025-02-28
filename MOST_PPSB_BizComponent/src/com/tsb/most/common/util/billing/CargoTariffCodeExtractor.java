package com.tsb.most.common.util.billing;

import com.tsb.most.biz.dao.billing.ITariffCodeGeneratorDao;
import com.tsb.most.biz.dataitem.billing.TariffCodeConditionItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoTariffCodeExtractor extends AbstractTariffCodeExtractor{
	
	
	public CargoTariffCodeExtractor(String mode, String type) {
		super(mode, type);
	}


	public DataItemList performExtractTask(ITariffCodeGeneratorDao oTrfGenDao) throws BizException {
		DataItemList oExtTrfList = new DataItemList();
		DataItemList rtnList = new DataItemList();
	
		for(int i=0;i<targetDataList.size();i++) { //The target of data gathering object list
			oExtTrfList = new DataItemList();
			TariffCodeGeneratorItem targetItem = (TariffCodeGeneratorItem)targetDataList.get(i);
			TariffCodeGenerator oTrfGen = TariffCodeGeneratorFactory.getInstance().getGenerator(trfType);
			
			for(int j=0;j<oTrfGen.getDistinctTariffCodList().size();j++) { //Tariff code list based on tariff type
				TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem)oTrfGen.getDistinctTariffCodList().get(j);
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
