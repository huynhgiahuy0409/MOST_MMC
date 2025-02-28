package com.tsb.most.basebiz.service.codes;

import java.util.Iterator;

import com.tsb.most.basebiz.dao.codes.IGeneralCodeDao;
import com.tsb.most.basebiz.dataitem.codes.GeneralCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchGeneralCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class GeneralCode extends MOSTBaseService implements IGeneralCode {
	private IGeneralCodeDao generalCodeDao;

	public void setGeneralCodeDao(IGeneralCodeDao generalCodeDao) {
		this.generalCodeDao = generalCodeDao;
	}
	
	@Override
	public DataItemList selectCodesList(SearchGeneralCodeParm parm)throws BizException{
		return generalCodeDao.selectCodesList(parm);
	}
	
	@Override
	public DataItemList selectCode(SearchGeneralCodeParm parm)throws BizException{
		return generalCodeDao.selectCode(parm);
	}
		
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			GeneralCodeItem item = (GeneralCodeItem) list.next();
            
            try {
         		return generalCodeDao.insertItems(parm);
            }catch(Exception ex) {
            	throw new BizException(ex);
            }
		}
		
		return null;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException{
		DataItemList items = parm.getUpdateItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			GeneralCodeItem item = (GeneralCodeItem) list.next();
			
            try {
         		return generalCodeDao.updateItems(parm);
            }catch(Exception ex) {
             	throw new BizException(ex);
            }
		}
		
		return null;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return generalCodeDao.deleteItems(parm);
	}
	

	@Override
	public DataItemList selectCodeInUse(SearchGeneralCodeParm parm) throws BizException {
		return generalCodeDao.selectCodeInUse(parm);
	}
}
