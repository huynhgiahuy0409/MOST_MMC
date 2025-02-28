package com.tsb.most.biz.service.billing;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.billing.IProofSheetDao;
import com.tsb.most.biz.dataitem.billing.ProofSheetItem;
import com.tsb.most.biz.parm.billing.SearchProofSheetParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ProofSheet extends MOSTBaseService implements IProofSheet{
	private IProofSheetDao proofSheetDao;
	
	public void setProofSheetDao(IProofSheetDao proofSheetDao) {
		this.proofSheetDao = proofSheetDao;
	}
	
	public DataItemList selectCostCenterCombo(SearchProofSheetParm parm) throws BizException{
        return proofSheetDao.selectCostCenterCombo(parm);
    }
	
	public DataItemList selectComboBoxIvPrefix(SearchProofSheetParm parm) throws BizException{
        return proofSheetDao.selectComboBoxIvPrefix(parm);
    }

	public DataItemList selectProofSheetList(SearchProofSheetParm parm) throws BizException{
        return proofSheetDao.selectProofSheetList(parm);
    }
    
    public DataItemList selectExchangeData(SearchProofSheetParm parm) throws BizException{
    	return proofSheetDao.selectExchangeData(parm);
    }
    
    public DataItemList selectCostCenterData(SearchProofSheetParm parm) throws BizException{
    	return proofSheetDao.selectCostCenterData(parm);
    }
    
    public DataItemList selectPartnerRates(SearchProofSheetParm parm) throws BizException{
    	return proofSheetDao.selectPartnerRates(parm);
    }
	
	public DataItemList updateStatusDataGathering(UpdateItemsBizParm parm) throws BizException{
        return proofSheetDao.updateStatusDataGathering(parm);   
    }
	
	public DataItemList updateGatheredData(UpdateItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getUpdateItems();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		ProofSheetItem ssrItem = new ProofSheetItem();
		DataItemList ssrList = new DataItemList();
		DataItemList returnItems = new DataItemList();
		
		for(ProofSheetItem item: (ArrayList<ProofSheetItem>)itemList.getCollection()) {
			if(item == null) {
				return null;
			}
			
			Double unit1 = 1.0;
			Double unit2 = 1.0;
			Double unit3 = 1.0;
			Double aplyRate = item.getAplyRate();
			
			if(item.getUnit1() != 0) {
				unit1 = item.getUnit1();
			}
			
			if(item.getUnit2() != 0) {
				unit2 = item.getUnit2();
			}
			
			if(item.getUnit3() != 0) {
				unit3 = item.getUnit3();
			}
			
			if(item.getPtnrRate() != 0) {
				aplyRate = item.getPtnrRate();
			}
			
			item.setAplyRate(aplyRate);
			item.setAplyAmt(unit1 * unit2 * unit3 * aplyRate);
			
			updateItems.addUpdateItem(item);
			
			if(item.getScrId() != null && item.getScrId().equals("SSR/Add Hoc")) {
				ssrItem = item;
			}
			
//			if(item.getTariffType() != null && item.getTariffType().equals(BillingConstant.TRF_TP_CD_SO)) {
//				proofSheetDao.updateServiceOrderPayer(item);
//			}
		}
		
		returnItems = proofSheetDao.updateGatheredData(updateItems);
		proofSheetDao.updateServiceOrderPayer(updateItems);
		
		if(ssrItem.getScrId() != null && ssrItem.getScrId().equals("SSR/Add Hoc")) {
			Boolean existIvStat = false;
			Boolean existVfStat = false;
			
			ssrList = proofSheetDao.selectSsrList(ssrItem);
			
			for(ProofSheetItem item: (ArrayList<ProofSheetItem>)ssrList.getCollection()) {
				if(item.getStatusCd().equals(BillingConstant.DATA_GATHER_STATUS_INVOICED)) {
					existIvStat = true;
				} else if(item.getStatusCd().equals(BillingConstant.DATA_GATHER_STATUS_VERIFIED)) {
					existVfStat = true;
				}
			}
			
			if(existVfStat) {
				ssrItem.setStatusCd(CodeConstant.MT_IVSTAT_VF);
			} else {
				ssrItem.setStatusCd(CodeConstant.MT_IVSTAT_CR);
			}
			
			updateItems.setUpdateItem(ssrItem);
			
			proofSheetDao.updateSsrDetail(updateItems);
			
			if(!existIvStat) {
				proofSheetDao.updateSsrStatus(updateItems);
			}
		}
		
        return returnItems;
    }
}
