package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IDimensionCheckDao;
import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DimensionCheck extends MOSTBaseService implements IDimensionCheck{
	private IDimensionCheckDao dimensionCheckDao;

	public void setDimensionCheckDao(IDimensionCheckDao dimensionCheckDao) {
		this.dimensionCheckDao = dimensionCheckDao;
	}

	@Override
	public DataItemList selectDimensionCheck(SearchDimensionCheckParm parm) throws BizException {
		// TODO Auto-generated method stub
		return dimensionCheckDao.selectDimensionCheck(parm);
	}
	
	@Override
	public DataItemList selectBlSnNo(SearchDimensionCheckParm parm) throws BizException {
		return dimensionCheckDao.selectBlSnNo(parm);
	}

	@Override
	public DataItemList selectDoGrNo(SearchDimensionCheckParm parm) throws BizException {
		return dimensionCheckDao.selectDoGrNo(parm);
	}

	@Override
	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return dimensionCheckDao.insertDimensionCheck(parm);
	}

	@Override
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return dimensionCheckDao.updateDimensionCheck(parm);
	}
}
