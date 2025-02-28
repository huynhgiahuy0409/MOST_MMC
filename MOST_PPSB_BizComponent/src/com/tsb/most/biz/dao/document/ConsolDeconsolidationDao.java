package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.ConsolDeconsolidationItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchConsolDeconsolidationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
public class ConsolDeconsolidationDao extends BaseDao implements IConsolDeconsolidationDao{
	public DataItemList selectCargoStatusCombo(SearchConsolDeconsolidationParm parm) throws DaoException{
		return unifiedDao.getItems("consolDeconsolidation.selectCargoStatusCombo", parm);
	}
	
	public DataItemList selectConsolDeconsolidationList(SearchConsolDeconsolidationParm parm) throws DaoException{
		return unifiedDao.getItemsPage("consolDeconsolidation.selectConsolDeconsolidationList", parm);
	}
	
	public DataItemList updateGetInStatusForSnBlInsertGr(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"consolDeconsolidation.updateGetInStatusForSnBlInsertGr", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateGetInStatusForSnBlInsertVAJob(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"consolDeconsolidation.updateGetInStatusForSnBlInsertVAJob", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateGetInStatusForSnBlCgMst(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"consolDeconsolidation.updateGetInStatusForSnBlCgMst", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateGetInStatusForSnBlJob(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"consolDeconsolidation.updateGetInStatusForSnBlJob", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateGetInStatusForSnBlInv(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"consolDeconsolidation.updateGetInStatusForSnBlInv", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateNextJobForVA(DataItemList parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.updateItems(null,"consolDeconsolidation.updateNextJobForVA", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateNextJobForWA(DataItemList parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.updateItems(null,"consolDeconsolidation.updateNextJobForWA", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCgNoForSn(ConsolDeconsolidationItem parm) throws DaoException {
		return unifiedDao.getItems("consolDeconsolidation.selectCgNoForSn", parm);
	}
	
	public DataItemList selectCgNoForBl(ConsolDeconsolidationItem parm) throws DaoException {
		return unifiedDao.getItems("consolDeconsolidation.selectCgNoForBl", parm);
	}
	
	public void updateGetOutStatusForSnCgMst(DataItem parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.insertItem(null,"consolDeconsolidation.updateGetOutStatusForSnCgMst", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGetOutStatusForBlCgMst(DataItem parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.insertItem(null,"consolDeconsolidation.updateGetOutStatusForBlCgMst", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGetOutStatusForSnBlJob(DataItem parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.insertItem(null,"consolDeconsolidation.updateGetOutStatusForSnBlJob", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGetOutStatusForSnBlJobAV(DataItem parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.insertItem(null,"consolDeconsolidation.updateGetOutStatusForSnBlJobAV", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGetOutStatusForSnBlInv(DataItem parm) throws DaoException {
		try{
			setNewVersion(parm);
			unifiedDao.insertItem(null,"consolDeconsolidation.updateGetOutStatusForSnBlInv", parm);
			setVersion(parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
