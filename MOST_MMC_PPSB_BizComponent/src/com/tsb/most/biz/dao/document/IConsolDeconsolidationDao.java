package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.ConsolDeconsolidationItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchConsolDeconsolidationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConsolDeconsolidationDao {
	public DataItemList selectCargoStatusCombo(SearchConsolDeconsolidationParm parm) throws DaoException;
	public DataItemList selectConsolDeconsolidationList(SearchConsolDeconsolidationParm parm) throws DaoException;
	public DataItemList updateGetInStatusForSnBlInsertGr(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGetInStatusForSnBlInsertVAJob(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGetInStatusForSnBlCgMst(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGetInStatusForSnBlJob(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGetInStatusForSnBlInv(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectCgNoForSn(ConsolDeconsolidationItem parm) throws DaoException;
	public DataItemList selectCgNoForBl(ConsolDeconsolidationItem parm) throws DaoException;
	public void updateGetOutStatusForSnCgMst(DataItem parm) throws DaoException;
	public void updateGetOutStatusForBlCgMst(DataItem parm) throws DaoException;
	public void updateGetOutStatusForSnBlJob(DataItem parm) throws DaoException;
	public void updateGetOutStatusForSnBlJobAV(DataItem parm) throws DaoException;
	public void updateGetOutStatusForSnBlInv(DataItem parm) throws DaoException;
	public void updateNextJobForVA(DataItemList items) throws DaoException;
	public void updateNextJobForWA(DataItemList items) throws DaoException;
}
