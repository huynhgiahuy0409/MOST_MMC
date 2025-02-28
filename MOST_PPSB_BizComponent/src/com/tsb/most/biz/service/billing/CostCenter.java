package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.dao.billing.ICostCenterDao;
import com.tsb.most.biz.dataitem.billing.CostCenterItem;
import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.StringValueItem;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class CostCenter extends MOSTBaseService implements ICostCenter{
	private ICostCenterDao costCenterDao;

	public ICostCenterDao getCostCenterDao() {
		return costCenterDao;
	}

	public void setCostCenterDao(ICostCenterDao costCenterDao) {
		this.costCenterDao = costCenterDao;
	}
	
    public DataItemList selectCostCenter(SearchCostCenterParm parm) throws BizException {
        return costCenterDao.selectCostCenter(parm);
    }
    
    public DataItemList isUnitInUsed(SearchCostCenterParm param) throws BizException {
        DataItemList result = costCenterDao.isUnitInUsed(param);
        CostCenterItem item = new CostCenterItem();
       
        if (result.size() > 0) {
            item.setMessageError("BL003002");
            result.add(item);
        }
        
        return result;
    }
    
    public DataItemList duplicatedCostERP(SearchCostCenterParm param) throws DaoException{
		String defalutValue = costCenterDao.duplicatedCostERP(param);
		DataItemList rtnList = new DataItemList();
		
		if(defalutValue !=null){
			rtnList.add(new StringValueItem(defalutValue));
		}
		
		return rtnList;
		
    }
    
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return costCenterDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return costCenterDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return costCenterDao.deleteItems(parm);
	}
	
}
