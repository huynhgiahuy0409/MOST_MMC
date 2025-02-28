package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.dao.codes.ICountryCodeDao;
import com.tsb.most.basebiz.parm.codes.SearchCountryCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CountryCode extends MOSTBaseService implements ICountryCode {
	ICountryCodeDao countryCodeDao;

	public void setCountryCodeDao(ICountryCodeDao countryCodeDao) {
		this.countryCodeDao = countryCodeDao;
	}
	
	@Override
	public DataItemList selectCountryCodes(SearchCountryCodeParm parm)throws BizException{
		return countryCodeDao.selectCountryCodes(parm);
	}
	
	@Override
	public DataItemList countryCodeDuplicateCheck(SearchCountryCodeParm parm)throws BizException{
		return countryCodeDao.countryCodeDuplicateCheck(parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return countryCodeDao.insertItems(parm);
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return countryCodeDao.updateItems(parm);
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return countryCodeDao.deleteItems(parm);
	}
}
