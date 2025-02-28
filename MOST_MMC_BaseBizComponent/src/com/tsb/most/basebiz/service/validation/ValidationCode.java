package com.tsb.most.basebiz.service.validation;

import com.tsb.most.basebiz.dao.validation.IValidationCodeDao;
import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;


public class ValidationCode extends MOSTBaseService implements IValidationCode {
	private IValidationCodeDao validationCodeDao;

	public void setValidationCodeDao(IValidationCodeDao validationCodeDao) {
		this.validationCodeDao = validationCodeDao;
	}

	public DataItemList selectValidation(SearchValidationCodeParm parm) throws BizException{
		return validationCodeDao.selectValidation(parm);
	}
	
}
