package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.dao.codes.ICommodityCodeDao;
import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class CommodityCode extends MOSTBaseService implements ICommodityCode {
	private ICommodityCodeDao commodityCodeDao;

	public void setCommodityCodeDao(ICommodityCodeDao commodityCodeDao) {
		this.commodityCodeDao = commodityCodeDao;
	}
	
	public DataItemList selectCommodityCodeList(SearchCommodityCodeParm parm) throws BizException {
		return commodityCodeDao.selectCommodityCodeList(parm);
    }

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		return commodityCodeDao.insertItems(parm);
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return commodityCodeDao.updateItems(parm);
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return commodityCodeDao.deleteItems(parm);
	}

	@Override
	public DataItemList insertCommodityGroupItem(InsertItemsBizParm parm) throws DaoException {
		return commodityCodeDao.insertCommodityGroupItem(parm);
	}

	@Override
	public DataItemList selectCommodityGroupItem(SearchCommodityCodeParm parm) throws DaoException {
		return commodityCodeDao.selectCommodityGroupItem(parm);
	}

	@Override
	public DataItemList updateCommodityGroupItem(UpdateItemsBizParm parm) throws DaoException {
		return commodityCodeDao.updateCommodityGroupItem(parm);
	}

	@Override
	public DataItemList deleteCommodityGroupItem(DeleteItemsBizParm parm) throws DaoException {
		return commodityCodeDao.deleteCommodityGroupItem(parm);
	}
	
	@Override
	public DataItemList checkDuplicate(SearchCommodityCodeParm parm) throws DaoException {
		return commodityCodeDao.checkDuplicate(parm);
	}
	
}
