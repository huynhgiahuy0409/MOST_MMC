package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface ICostCenter {
	public DataItemList selectCostCenter(SearchCostCenterParm parm) throws BizException;
    public DataItemList isUnitInUsed(SearchCostCenterParm param) throws BizException;
    public DataItemList duplicatedCostERP(SearchCostCenterParm param) throws DaoException;
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}