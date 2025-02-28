package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IBerthApprovalDao;
import com.tsb.most.biz.parm.planning.SearchBerthApprovalParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BerthApproval extends MOSTBaseService implements IBerthApproval {
	private IBerthApprovalDao berthApprovalDao;

	public void setBerthApprovalDao(IBerthApprovalDao berthApprovalDao) {
		this.berthApprovalDao = berthApprovalDao;
	}

	@Override
	public DataItemList selectBerthApprovalList(SearchBerthApprovalParm parm) throws BizException {
		return berthApprovalDao.getBerthingApprovalList(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return berthApprovalDao.updateItems(parm);
	}
}
