package com.tsb.most.basebiz.service.codes;

import java.util.Iterator;

import com.tsb.most.basebiz.dao.codes.IDangerousGoodsCodeDao;
import com.tsb.most.basebiz.dataitem.codes.DangerousGoodsCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchDangerousGoodsCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class DangerousGoodsCode extends MOSTBaseService implements IDangerousGoodsCode {
	private IDangerousGoodsCodeDao dangerousGoodsCodeDao;

	public void setDangerousGoodsCodeDao(IDangerousGoodsCodeDao dangerousGoodsCodeDao) {
		this.dangerousGoodsCodeDao = dangerousGoodsCodeDao;
	}

	@Override
	public DataItemList selectDangerousGoodsCode(SearchDangerousGoodsCodeParm parm) throws BizException{
		return dangerousGoodsCodeDao.selectDangerousGoodsCode(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			DangerousGoodsCodeItem item = (DangerousGoodsCodeItem) list.next();
            
            try {
         		return dangerousGoodsCodeDao.insertItems(parm);
         		
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
			DangerousGoodsCodeItem item = (DangerousGoodsCodeItem) list.next();
			
            try {
         		return dangerousGoodsCodeDao.updateItems(parm);

            }catch(Exception ex) {
             	throw new BizException(ex);
             }
            
		}
		
		return null;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return dangerousGoodsCodeDao.deleteItems(parm);
	}
}
