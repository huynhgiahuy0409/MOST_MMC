package com.tsb.most.basebiz.dao.validation;

import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ValidationCodeDao extends BaseDao implements IValidationCodeDao {
	
	public DataItemList selectValidation(SearchValidationCodeParm parm) throws DaoException{
		return unifiedDao.getItems("validationCode.selectValidation",parm);
	}
	
	public DataItemList selectValidationTruckGateinList(SearchValidationCodeParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("validationCode.selectValidationTruckGateinList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
}
