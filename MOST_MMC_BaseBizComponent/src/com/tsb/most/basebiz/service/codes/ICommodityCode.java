package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface ICommodityCode {
	public DataItemList selectCommodityCodeList(SearchCommodityCodeParm parm) throws BizException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;	
	
	public DataItemList insertCommodityGroupItem(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectCommodityGroupItem(SearchCommodityCodeParm parm) throws DaoException;
	public DataItemList updateCommodityGroupItem(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteCommodityGroupItem(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList checkDuplicate(SearchCommodityCodeParm pParm) throws BizException;
}
