package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.dao.codes.IUNLoctaionCodeDao;
import com.tsb.most.basebiz.parm.codes.SearchCountryCodeParm;
import com.tsb.most.basebiz.parm.codes.SearchUNLocationCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class UNLocationCode extends MOSTBaseService implements IUNLocationCode {
	
	private IUNLoctaionCodeDao unlocationCodeDao;

	public void setUnlocationCodeDao(IUNLoctaionCodeDao unlocationCodeDao) {
		this.unlocationCodeDao = unlocationCodeDao;
	}
	
	@Override
	public DataItemList selectUNLocationCode(SearchUNLocationCodeParm pParm) throws BizException {
		return unlocationCodeDao.selectUNLocationCode(pParm);
	}
	
	@Override
	public DataItemList selectUNLocationCodeDtl(SearchUNLocationCodeParm pParm) throws BizException {
		return unlocationCodeDao.selectUNLocationCodeDtl(pParm);
	}
	
	@Override
	public DataItemList selectCountryCodes(SearchCountryCodeParm parm)throws BizException{
		return unlocationCodeDao.selectCountryCodes(parm);
	}
	
	@Override
	public DataItemList countryCodeDuplicateCheck(SearchCountryCodeParm parm)throws BizException{
		return unlocationCodeDao.countryCodeDuplicateCheck(parm);
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return unlocationCodeDao.insertItems(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return unlocationCodeDao.updateItems(parm);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return unlocationCodeDao.deleteItems(parm);
	}
}
