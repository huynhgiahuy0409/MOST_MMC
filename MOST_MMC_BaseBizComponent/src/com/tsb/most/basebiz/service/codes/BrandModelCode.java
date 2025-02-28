package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.dao.codes.IBrandModelCodeDao;
import com.tsb.most.basebiz.parm.codes.SearchBrandModelCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BrandModelCode extends MOSTBaseService implements IBrandModelCode {
	IBrandModelCodeDao brandModelCodeDao;

	public void setBrandModelCodeDao(IBrandModelCodeDao brandModelCodeDao) {
		this.brandModelCodeDao = brandModelCodeDao;
	}
	
	public DataItemList selectBrandCodeItems(SearchBrandModelCodeParm parm)throws BizException{
		return brandModelCodeDao.selectBrandCodeItems(parm);
	}
	
	public DataItemList selectModelCodeItems(SearchBrandModelCodeParm parm)throws BizException{
		return brandModelCodeDao.selectModelCodeItems(parm);
	}
	
	public DataItemList brandCodeDuplicateCheck(SearchBrandModelCodeParm parm)throws BizException{
		return brandModelCodeDao.brandCodeDuplicateCheck(parm);
	}
	
	public DataItemList brandCodeRemoveCheck(SearchBrandModelCodeParm parm)throws BizException{
		return brandModelCodeDao.brandCodeRemoveCheck(parm);
	}
	
	
	public DataItemList insertBrandCodeItems(InsertItemsBizParm parm) throws BizException {
		return brandModelCodeDao.insertItems(parm);
	}

	public DataItemList updateBrandCodeItems(UpdateItemsBizParm parm) throws BizException {
		return brandModelCodeDao.updateItems(parm);
	}

	public DataItemList deleteBrandCodeItems(DeleteItemsBizParm parm) throws BizException {
		return brandModelCodeDao.deleteItems(parm);
	}
	
	public DataItemList modelCodeDuplicateCheck(SearchBrandModelCodeParm parm)throws BizException{
		return brandModelCodeDao.modelCodeDuplicateCheck(parm);
	}
	
	public DataItemList insertModelCodeItems(InsertItemsBizParm parm) throws BizException {
		return brandModelCodeDao.insertModelCodeItems(parm);
	}

	public DataItemList updateModelCodeItems(UpdateItemsBizParm parm) throws BizException {
		return brandModelCodeDao.updateModelCodeItems(parm);
	}

	public DataItemList deleteModelCodeItems(DeleteItemsBizParm parm) throws BizException {
		return brandModelCodeDao.deleteModelCodeItems(parm);
	}
	
}
