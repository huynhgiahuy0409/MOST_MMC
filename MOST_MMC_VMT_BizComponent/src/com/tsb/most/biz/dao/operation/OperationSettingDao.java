package com.tsb.most.biz.dao.operation;


import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class OperationSettingDao extends BaseDao implements IOperationSettingDao {

	public DataItemList selectOperationSetShftDtList(SearchOperationSettingParm parm) throws DaoException {
        return unifiedDao.getItems("operationSetting.selectOperationSetShftDtList", parm);
    }
	
	public DataItemList selectOperationSetShftList(SearchOperationSettingParm parm) throws DaoException {
        return unifiedDao.getItems("operationSetting.selectOperationSetShftList", parm);
    }
	
	public DataItemList selectOpHatchList(SearchOperationSettingParm parm) throws DaoException {
		DataItemList rtnList = null;
        if(parm.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)){
            rtnList = unifiedDao.getItems("operationSetting.selectOpHatchBBKList", parm);
        }else{
            rtnList = unifiedDao.getItems("operationSetting.selectOpHatchDBKList", parm);
        }
        return rtnList;
	}
	
	public DataItemList selectOperationSetHatch(SearchOperationSettingParm parm) throws DaoException {
		return unifiedDao.getItems("operationSetting.selectOperationSetHatch", parm);
	}
	
	public DataItemList selectLocationList(SearchOperationSettingParm parm) throws DaoException {
      return unifiedDao.getItems("operationSetting.selectLocationList", parm);
    }
	
	public DataItemList getOpHatchList(SearchOperationSettingParm parm) throws DaoException {
        DataItemList rtnList = null;
        if(parm.getCgTpCd().equals("BBK")){
            rtnList = unifiedDao.getItems("operationSetting.selectOpHatchBBKList", parm);
        }else{
            rtnList = unifiedDao.getItems("operationSetting.selectOpHatchDBKList", parm);
        }
        return rtnList;
    }
	
	public DataItemList getOperationSetHatch(SearchOperationSettingParm parm) throws DaoException {
	      return unifiedDao.getItems("operationSetting.selectOperationSetHatch", parm);
	}
	
	@Override
	public DataItemList selectYTList(SearchOperationSettingParm parm) throws DaoException {
		return unifiedDao.getItems("operationSetting.selectYTList", parm);
	}
	
	@Override
	public DataItemList insertYTPool(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "operationSetting.insertYTPool", insertItems);
			setVersion(insertItems);
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	
}
