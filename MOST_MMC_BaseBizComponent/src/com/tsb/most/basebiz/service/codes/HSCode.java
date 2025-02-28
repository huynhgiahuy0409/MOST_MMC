package com.tsb.most.basebiz.service.codes;
import org.springframework.stereotype.Service;

import com.tsb.most.basebiz.dao.codes.IHSCodeDao;
import com.tsb.most.basebiz.parm.codes.SearchHSCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

@Service
public class HSCode extends MOSTBaseService implements IHSCode{
	
	private IHSCodeDao hsCodeDao;
	
	public void setHsCodeDao(IHSCodeDao hsCodeDao) {
		this.hsCodeDao = hsCodeDao;
	}
	
	@Override
	public DataItemList selectHSCodeList(SearchHSCodeParm parm) throws BizException{
		return hsCodeDao.selectHSCodeList(parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return hsCodeDao.insertItems(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm items) throws BizException {
		return hsCodeDao.updateItems(items);
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm items) throws BizException {
		return hsCodeDao.deleteItems(items);
	}

	@Override
	public DataItemList duplicationHSCodeCheck(SearchHSCodeParm parm) throws BizException {
		return hsCodeDao.duplicationHSCodeCheck(parm);
	}
	
	@Override
	public DataItemList selectHsCodePopup(SearchHSCodeParm parm) throws BizException{
		return hsCodeDao.selectHsCodePopup(parm);
	}
}