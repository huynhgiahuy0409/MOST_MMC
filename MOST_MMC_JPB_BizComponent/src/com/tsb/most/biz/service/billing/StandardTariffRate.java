package com.tsb.most.biz.service.billing;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.ICostCenterDao;
import com.tsb.most.biz.dao.billing.IStandardTariffRateDao;
import com.tsb.most.biz.dao.billing.ITariffCodeDao;
import com.tsb.most.biz.dataitem.billing.StandardTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.biz.parm.billing.SearchStandardTariffRateParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ApplicationException;
import com.tsb.most.framework.exception.BizException;

public class StandardTariffRate extends MOSTBaseService implements IStandardTariffRate{
	private IStandardTariffRateDao standardTariffRateDao;
	private ITariffCodeDao tariffCodeDao;
	private ICostCenterDao costCenterDao;
	
	public void setCostCenterDao(ICostCenterDao costCenterDao) {
		this.costCenterDao = costCenterDao;
	}

	public void setStandardTariffRateDao(IStandardTariffRateDao standardTariffRateDao) {
		this.standardTariffRateDao = standardTariffRateDao;
	}
	
	public void setTariffCodeDao(ITariffCodeDao tariffCodeDao) {
		this.tariffCodeDao = tariffCodeDao;
	}

	public DataItemList selectStandardTariffRate(SearchStandardTariffRateParm param) throws BizException {
		return standardTariffRateDao.selectStandardTariffRate(param);
	}
	
	public DataItemList selectApplyDateList(SearchStandardTariffRateParm param) throws BizException {
		return standardTariffRateDao.selectApplyDateList(param);
	}

	public DataItemList selectBlankStandardTariffRateList(SearchStandardTariffRateParm param) throws BizException {
		return standardTariffRateDao.selectBlankStandardTariffRateList(param);
	}
	
    public DataItemList selectCostCenterList(SearchCostCenterParm parm) throws BizException {
        return costCenterDao.selectCostCenter(parm);
    }
    
	public DataItemList insertItems(InsertItemsBizParm param) throws BizException {
		List masterItem = param.getInsertItems().getCollection();
		DataItemList insertItemList = new DataItemList();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		
		for (int i =0; i < masterItem.size();i++) {
			StandardTariffRateItem item =  (StandardTariffRateItem) masterItem.get(i);
			if (param.getTxTraceinfo().getUserInfo() != null)
			{
				item.setUserId(param.getTxTraceinfo().getUserInfo().getUserId());
			}
			insertItemList.add(item);
		}
		
		boolean existed = false;

		for (int i = 0; i < insertItemList.size(); i++) {
			StandardTariffRateItem obj = (StandardTariffRateItem) insertItemList.get(i);
			Integer a = standardTariffRateDao.isOverlappedWithFinitePeriod(obj);
			Integer b = standardTariffRateDao.isOverlappedWithInfinitePeriod(obj);
			Integer n = new Integer(a.intValue() + b.intValue());
			
			if (n.intValue() > 0)
				existed = true;
		}
		
		if (existed) {
			throw new ApplicationException("BL007004");
		}

		// Create new TRF_REG_NO for new standard rate
		HashMap trfRegNoMap = new HashMap();
		
		if (insertItemList.size() > 0) {
			Calendar cal = Calendar.getInstance();
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			
			String maxRegNo = tariffCodeDao.selectMaxTrfRegNo(null);
			
			String maxTrfRegNo = maxRegNo != null ? maxRegNo:"0";
			String prefix = "TRF" + year + formatNumString(Integer.toString(month), 2);

			for (int i = 0; i <insertItemList.size(); i++) {
				StandardTariffRateItem std = (StandardTariffRateItem) insertItemList.get(i);
				String oldTrfRegNo = std.getTrfRegNo();
				maxTrfRegNo = Integer.toString((Integer.parseInt(maxTrfRegNo) + 1));
				String newTrfRegNo = prefix.concat(formatNumString(maxTrfRegNo.toString(), 7));
				std.setTrfRegNo(newTrfRegNo);
				
				trfRegNoMap.put(oldTrfRegNo, newTrfRegNo);
			}
		}
		
		if (insertItemList.size() > 0){
			insertItms.addInsertItem(insertItemList);
			standardTariffRateDao.insertStandardTariffRates(insertItms);
		}
			
		return param.getInsertItems();
	}

	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException {
		List masterItem = param.getUpdateItems().getCollection();
	    DataItemList updateItemList = new DataItemList();
	    DataItemList insertItemList = new DataItemList();
	    InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
	    
		for (int i =0; i < masterItem.size();i++) {
			StandardTariffRateItem item =  (StandardTariffRateItem) masterItem.get(i);
			
			updateItemList.add(item);
			
			if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertItemList.add(item);
			}
		}
		
		boolean existed = false;

		for (int i = 0; i < insertItemList.size(); i++) {
			StandardTariffRateItem obj = (StandardTariffRateItem) insertItemList.get(i);
			Integer a = standardTariffRateDao.isOverlappedWithFinitePeriod(obj);
			Integer b = standardTariffRateDao.isOverlappedWithInfinitePeriod(obj);
			Integer n = new Integer(a.intValue() + b.intValue());
			
			if (n.intValue() > 0) {
				existed = true;
			}
		}
		
		if (existed) {
			throw new ApplicationException("BL007004");
		}

		// Create new TRF_REG_NO for new standard rate
		HashMap trfRegNoMap = new HashMap();
		
		if (insertItemList.size() > 0) {
			Calendar cal = Calendar.getInstance();
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			
			String maxRegNo = tariffCodeDao.selectMaxTrfRegNo(null);
			String maxTrfRegNo = maxRegNo != null ? maxRegNo:"0";
			String prefix = "TRF" + year + formatNumString(Integer.toString(month), 2);

			for (int i = 0; i <insertItemList.size(); i++) {
				StandardTariffRateItem std = (StandardTariffRateItem) insertItemList.get(i);
				String oldTrfRegNo = std.getTrfRegNo();
				maxTrfRegNo = Integer.toString((Integer.parseInt(maxTrfRegNo) + 1));
				String newTrfRegNo = prefix.concat(formatNumString(maxTrfRegNo.toString(), 7));
				std.setTrfRegNo(newTrfRegNo);
				trfRegNoMap.put(oldTrfRegNo, newTrfRegNo);
			}
		}
		
		if (insertItemList.size() > 0){
			insertItms.addInsertItem(insertItemList);
			standardTariffRateDao.insertStandardTariffRates(insertItms);
		}
		
		if (updateItemList.size() > 0){
			updateItms.addUpdateItem(updateItemList);
			standardTariffRateDao.updateStandardTariffRates(updateItms);
			standardTariffRateDao.updateStandardTariffGstRates(updateItms);
		}
		
		return param.getUpdateItems();
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm param) throws BizException {
		List masterItem = param.getDeleteItems().getCollection();
	    DataItemList deleteItemList = new DataItemList();
	    DeleteItemsBizParm deleteItms = new DeleteItemsBizParm();
	    
		for (int i =0; i < masterItem.size();i++) {
			StandardTariffRateItem item =  (StandardTariffRateItem) masterItem.get(i);
				deleteItemList.add(item);
		}
		
		if (deleteItemList.size() > 0){
			deleteItms.addDeleteItem(deleteItemList);
			standardTariffRateDao.deleteStandardTariffRates(deleteItms);
		}
		
		return param.getDeleteItems();
	}
	
	private String formatNumString(String toProcess, int length) {
		for (int i = length - toProcess.length(); i > 0; i--) {
			toProcess = "0".concat(toProcess);
		}
		
		return toProcess;
	}
}

