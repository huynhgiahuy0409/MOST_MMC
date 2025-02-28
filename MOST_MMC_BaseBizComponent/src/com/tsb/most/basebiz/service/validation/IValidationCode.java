package com.tsb.most.basebiz.service.validation;

import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IValidationCode {
	public DataItemList selectValidation(SearchValidationCodeParm parm) throws BizException;
}