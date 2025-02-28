package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.ITariffCodeDao;
import com.tsb.most.biz.dataitem.billing.TariffCodeItem;
import com.tsb.most.biz.dataitem.billing.TariffConditionItem;
import com.tsb.most.biz.dataitem.billing.TariffConditionPropertyItem;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TariffCode extends MOSTBaseService implements ITariffCode{
	private ITariffCodeDao tariffCodeDao;
	
	public void setTariffCodeDao(ITariffCodeDao tariffCodeDao) {
		this.tariffCodeDao = tariffCodeDao;
	}
	
	public DataItemList selectCostCenter(SearchTariffCodeParm param) throws BizException {
		return tariffCodeDao.selectCostCenter(param);
	}
	
	public DataItemList selectFinancialCode(SearchTariffCodeParm param) throws BizException {
		return tariffCodeDao.selectFinancialCode(param);
	}

	@Override
	public DataItemList selectRefChild(SearchTariffCodeParm param) throws BizException {
		return tariffCodeDao.selectRefChild(param);
	}
	
	public DataItemList selectTariffCode(SearchTariffCodeParm param) throws BizException {
		return tariffCodeDao.selectTariffCode(param);
	}
	
	public DataItemList selectCmdtHeredityMultiSelectPopupList(SearchTariffCodeParm param) throws BizException {
        return tariffCodeDao.selectCmdtHeredityMultiSelectPopupList(param);
    }
	
	public DataItemList selectTariffCodeDetail(SearchTariffCodeParm param) throws BizException {
		TariffCodeItem returnItem = new TariffCodeItem();
		DataItemList returnItems = new DataItemList();
        
		returnItem = (TariffCodeItem)tariffCodeDao.selectTariffCodeDtl(param);
		ArrayList<TariffConditionItem> condList = (ArrayList<TariffConditionItem>)tariffCodeDao.getTariffConditionList(param).getCollection();
		ArrayList<TariffConditionPropertyItem> condPrptList = (ArrayList<TariffConditionPropertyItem>)tariffCodeDao.getTariffConditionPropertyList(param).getCollection();
		returnItem.setTariffConditionList(condList);
		returnItem.setTariffConditionPrptList(condPrptList);
		
		returnItems.add(returnItem);
        return returnItems;      
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException {
		DataItemList items = parm.getInsertItems();
		TariffCodeItem masterItem = (TariffCodeItem)items.get(0);
		
		//Delete First
		TariffConditionItem conditionItem = new TariffConditionItem();
		conditionItem.setTrfCd(masterItem.getTrfCd());
		conditionItem.setSubTrfCd(masterItem.getSubTrfCd());
		
		DeleteItemsBizParm deleteCondParm = new DeleteItemsBizParm();
		DataItemList deleteCondList = new DataItemList();
		deleteCondList.add(conditionItem);
		
		deleteCondParm.setDeleteItems(deleteCondList);
		
		TariffConditionPropertyItem prptItem = new TariffConditionPropertyItem();
		prptItem.setTrfCd(masterItem.getTrfCd());
		prptItem.setSubTrfCd(masterItem.getSubTrfCd());
		
		DeleteItemsBizParm deletePrptParm = new DeleteItemsBizParm();
		DataItemList deletePrptList = new DataItemList();
		deletePrptList.add(conditionItem);
		
		deletePrptParm.setDeleteItems(deletePrptList);
		
		DeleteItemsBizParm deleteMstParm = new DeleteItemsBizParm();
		DataItemList deleteMstList = new DataItemList();
		deleteMstList.add(masterItem);
		
		deleteMstParm.setDeleteItems(deleteMstList);
		
		
		tariffCodeDao.deleteTariffCondition(deleteCondParm);
		tariffCodeDao.deleteTariffConditionProperty(deletePrptParm);
		tariffCodeDao.deleteTariffCode(deleteMstParm);
		///////////////////////////////////
		
		DataItemList returnItem = new DataItemList();
		DataItemList insertCondList = new DataItemList();
		DataItemList insertCondPrptList = new DataItemList();
		
		boolean trfExisted = false;
		boolean isCondPrptExisted = false;
		
		ArrayList<TariffConditionItem> tariffCondList = (ArrayList<TariffConditionItem>) masterItem.getTariffConditionList();
		ArrayList<TariffConditionPropertyItem> tariffCondPrptList = (ArrayList<TariffConditionPropertyItem>) masterItem
				.getTariffConditionPrptList();
		
		for(TariffConditionItem condItem : tariffCondList) {
			if((condItem.getChrVal() != null && !"".equals(condItem.getChrVal()))
					|| (condItem.getNoVal() != null && !"".equals(condItem.getNoVal()))
					|| (condItem.getTierVal1() != null && !"".equals(condItem.getTierVal1()))
					|| (condItem.getTierVal2() != null && !"".equals(condItem.getTierVal2())))
				insertCondList.add(condItem);
		}
			
		List<TariffConditionItem> condList = (ArrayList<TariffConditionItem>)insertCondList.getCollection();
		for(TariffConditionPropertyItem condPrpItem : tariffCondPrptList) {
			TariffConditionItem temp = condList.stream().filter((p) -> condPrpItem.getPrptCd().equals(p.getPrptCd())).findAny().orElse(null);
			if(temp != null) {
				insertCondPrptList.add(condPrpItem);
			}
		}
		
		// Check CondPrpt Existed 
		SearchTariffCodeParm tariffCodeParm = new SearchTariffCodeParm();

		tariffCodeParm.setTrfCd(masterItem.getTrfCd());
		tariffCodeParm.setSubTrfCd(masterItem.getSubTrfCd());

		ArrayList<TariffCodeItem> tariffConditionList = (ArrayList<TariffCodeItem>) tariffCodeDao.checkTariffConditionPropertyList(tariffCodeParm).getCollection();

		if (tariffConditionList.size() > 0) {
			isCondPrptExisted = true;
		}
		
		if( items.size() > 0) {
			returnItem = tariffCodeDao.insertTariffCode(parm);
		}
		
		if (insertCondList.size() > 0 && !isCondPrptExisted && 
		   (masterItem.getWorkingStatus().equals(DAOProcessType.INSERT) || masterItem.getWorkingStatus().equals(DAOProcessType.UPDATE))) {
			
			InsertItemsBizParm condParm = new InsertItemsBizParm();
			condParm.setInsertItems(insertCondList);
			tariffCodeDao.insertTariffCondition(condParm);
		}

		if (insertCondPrptList.size() > 0 && !isCondPrptExisted
				&& (masterItem.getWorkingStatus().equals(DAOProcessType.INSERT)
						|| masterItem.getWorkingStatus().equals(DAOProcessType.UPDATE))) {
			
			InsertItemsBizParm condPrptParm = new InsertItemsBizParm();
			condPrptParm.setInsertItems(insertCondPrptList);
			tariffCodeDao.insertTariffConditionProperty(condPrptParm);
		}
		
		return returnItem;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException {
		DataItemList items = parm.getUpdateItems();
		InsertItemsBizParm insBizParm = new InsertItemsBizParm();
		insBizParm.setInsertItems(items);
		
		TariffCodeItem masterItem = (TariffCodeItem)items.get(0);
		
		//Delete First
		TariffConditionItem conditionItem = new TariffConditionItem();
		conditionItem.setTrfCd(masterItem.getTrfCd());
		conditionItem.setSubTrfCd(masterItem.getSubTrfCd());
		
		DeleteItemsBizParm deleteCondParm = new DeleteItemsBizParm();
		DataItemList deleteCondList = new DataItemList();
		deleteCondList.add(conditionItem);
		
		deleteCondParm.setDeleteItems(deleteCondList);
		
		TariffConditionPropertyItem prptItem = new TariffConditionPropertyItem();
		prptItem.setTrfCd(masterItem.getTrfCd());
		prptItem.setSubTrfCd(masterItem.getSubTrfCd());
		
		DeleteItemsBizParm deletePrptParm = new DeleteItemsBizParm();
		DataItemList deletePrptList = new DataItemList();
		deletePrptList.add(conditionItem);
		
		deletePrptParm.setDeleteItems(deletePrptList);
		
		DeleteItemsBizParm deleteMstParm = new DeleteItemsBizParm();
		DataItemList deleteMstList = new DataItemList();
		deleteMstList.add(masterItem);
		
		deleteMstParm.setDeleteItems(deleteMstList);
		
		
		tariffCodeDao.deleteTariffCondition(deleteCondParm);
		tariffCodeDao.deleteTariffConditionProperty(deletePrptParm);
		///////////////////////////////////
		
		DataItemList returnItem = new DataItemList();
		DataItemList insertCondList = new DataItemList();
		DataItemList insertCondPrptList = new DataItemList();
		
		boolean trfExisted = false;
		boolean isCondPrptExisted = false;
		
		ArrayList<TariffConditionItem> tariffCondList = (ArrayList<TariffConditionItem>) masterItem.getTariffConditionList();
		ArrayList<TariffConditionPropertyItem> tariffCondPrptList = (ArrayList<TariffConditionPropertyItem>) masterItem
				.getTariffConditionPrptList();
		
		for(TariffConditionItem condItem : tariffCondList) {
			if((condItem.getChrVal() != null && !"".equals(condItem.getChrVal()))
					|| (condItem.getNoVal() != null && !"".equals(condItem.getNoVal()))
					|| (condItem.getTierVal1() != null && !"".equals(condItem.getTierVal1()))
					|| (condItem.getTierVal2() != null && !"".equals(condItem.getTierVal2())))
				insertCondList.add(condItem);
		}
			
		List<TariffConditionItem> condList = (ArrayList<TariffConditionItem>)insertCondList.getCollection();
		for(TariffConditionPropertyItem condPrpItem : tariffCondPrptList) {
			TariffConditionItem temp = condList.stream()
					.filter((p) -> condPrpItem.getPrptCd().equals(p.getPrptCd()))
					.findAny()
					.orElse(null);
			if(temp != null) {
				insertCondPrptList.add(condPrpItem);
			}
		}
		
		// Check CondPrpt Existed 
		SearchTariffCodeParm tariffCodeParm = new SearchTariffCodeParm();

		tariffCodeParm.setTrfCd(masterItem.getTrfCd());
		tariffCodeParm.setSubTrfCd(masterItem.getSubTrfCd());

		ArrayList<TariffCodeItem> tariffConditionList = (ArrayList<TariffCodeItem>) tariffCodeDao.checkTariffConditionPropertyList(tariffCodeParm).getCollection();

		if (tariffConditionList.size() > 0) {
			isCondPrptExisted = true;
		}
		
		if( items.size() > 0) {
			returnItem = tariffCodeDao.updateTariffCode(parm);
		}
		
		if (insertCondList.size() > 0 && !isCondPrptExisted 
				&& (masterItem.getWorkingStatus().equals(DAOProcessType.INSERT)
				 || masterItem.getWorkingStatus().equals(DAOProcessType.UPDATE))) {
			
			InsertItemsBizParm condParm = new InsertItemsBizParm();
			condParm.setInsertItems(insertCondList);
			tariffCodeDao.insertTariffCondition(condParm);
		}

		if (insertCondPrptList.size() > 0 && !isCondPrptExisted
				&& (masterItem.getWorkingStatus().equals(DAOProcessType.INSERT)
						|| masterItem.getWorkingStatus().equals(DAOProcessType.UPDATE))) {
			
			InsertItemsBizParm condPrptParm = new InsertItemsBizParm();
			condPrptParm.setInsertItems(insertCondPrptList);
			tariffCodeDao.insertTariffConditionProperty(condPrptParm);
		}
		
		return returnItem;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException {
		DataItemList items = parm.getDeleteItems();
		
		ArrayList<TariffCodeItem> arrItem = (ArrayList<TariffCodeItem>)items.getCollection();
		
		if(arrItem.size()> 0) {
			TariffCodeItem masterItem = (TariffCodeItem)items.get(0);

			TariffConditionItem conditionItem = new TariffConditionItem();
			conditionItem.setTrfCd(masterItem.getTrfCd());
			conditionItem.setSubTrfCd(masterItem.getSubTrfCd());
			
			DeleteItemsBizParm deleteCondParm = new DeleteItemsBizParm();
			DataItemList deleteCondList = new DataItemList();
			deleteCondList.add(conditionItem);
			
			deleteCondParm.setDeleteItems(deleteCondList);
			
			TariffConditionPropertyItem prptItem = new TariffConditionPropertyItem();
			prptItem.setTrfCd(masterItem.getTrfCd());
			prptItem.setSubTrfCd(masterItem.getSubTrfCd());
			
			DeleteItemsBizParm deletePrptParm = new DeleteItemsBizParm();
			DataItemList deletePrptList = new DataItemList();
			deletePrptList.add(conditionItem);
			
			deletePrptParm.setDeleteItems(deletePrptList);
			
			DeleteItemsBizParm deleteMstParm = new DeleteItemsBizParm();
			DataItemList deleteMstList = new DataItemList();
			deleteMstList.add(masterItem);
			
			deleteMstParm.setDeleteItems(deleteMstList);
			
			
			tariffCodeDao.deleteTariffCondition(deleteCondParm);
			tariffCodeDao.deleteTariffConditionProperty(deletePrptParm);
			tariffCodeDao.deleteTariffCode(deleteMstParm);
			///////////////////////////////////
		}
		return items;
	}
}
