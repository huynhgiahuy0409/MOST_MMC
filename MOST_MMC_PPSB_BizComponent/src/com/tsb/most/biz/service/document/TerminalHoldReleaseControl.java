package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.ITerminalHoldReleaseControlDao;
import com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TerminalHoldReleaseControl extends MOSTBaseService implements ITerminalHoldReleaseControl {
	private ITerminalHoldReleaseControlDao terminalHoldReleaseControlDao;

	public void setTerminalHoldReleaseControlDao(ITerminalHoldReleaseControlDao terminalHoldReleaseControlDao) {
		this.terminalHoldReleaseControlDao = terminalHoldReleaseControlDao;
	}

	public DataItemList selectTerminalHoldReleaseList(SearchTerminalHoldReleaseControlParm parm) throws BizException{
		return terminalHoldReleaseControlDao.selectTerminalHoldReleaseList(parm);
    }
	
	public DataItemList selectTerminalHoldReleaseHist(SearchTerminalHoldReleaseControlParm parm) throws BizException{
		return terminalHoldReleaseControlDao.selectTerminalHoldReleaseHist(parm);
    }
	
	public DataItemList selectOPStoppedByHoldReason(SearchTerminalHoldReleaseControlParm parm) throws BizException{
		return terminalHoldReleaseControlDao.selectOPStoppedByHoldReason(parm);
    }
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		return terminalHoldReleaseControlDao.insertItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException{
		return terminalHoldReleaseControlDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException{
		return terminalHoldReleaseControlDao.deleteItems(parm);
	}
	
	public DataItemList checkTerminalHold(SearchTerminalHoldReleaseControlParm parm) throws BizException{
		return terminalHoldReleaseControlDao.checkTerminalHold(parm);
    }
}
