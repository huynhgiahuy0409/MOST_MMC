package com.tsb.most.basebiz.dao.validation;

import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IValidationCodeDao {
	public DataItemList selectValidation(SearchValidationCodeParm parm) throws DaoException;
	public DataItemList selectValidationTruckGateinList(SearchValidationCodeParm parm) throws DaoException;
}
