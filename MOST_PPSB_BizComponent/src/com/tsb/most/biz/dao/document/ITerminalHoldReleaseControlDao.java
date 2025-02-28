package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITerminalHoldReleaseControlDao {
    
	public DataItemList selectTerminalHoldReleaseList(SearchTerminalHoldReleaseControlParm parm) throws DaoException;
	public DataItemList selectTerminalHoldReleaseHist(SearchTerminalHoldReleaseControlParm parm) throws DaoException;
	public DataItemList selectOPStoppedByHoldReason(SearchTerminalHoldReleaseControlParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList checkTerminalHold(SearchTerminalHoldReleaseControlParm parm) throws DaoException;
}
