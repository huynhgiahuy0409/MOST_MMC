package com.tsb.most.basebiz.service.codes;

import java.util.Iterator;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICapacityCodeDao;
import com.tsb.most.basebiz.dataitem.codes.CapacityCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchCapacityCodeParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class CapacityCode extends MOSTBaseService implements ICapacityCode {
	private ICapacityCodeDao capacityCodeDao;

	public ICapacityCodeDao getCapacityCodeDao() {
		return capacityCodeDao;
	}
	
	public void setCapacityCodeDao(ICapacityCodeDao capacityCodeDao) {
		this.capacityCodeDao = capacityCodeDao;
	}
	
	public DataItemList selectCapacityCodeList(SearchCapacityCodeParm param) throws BizException{
    	
        if(param.getSearchTp().equals("EQ_TP")){
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			
            partyCode.setLcd(CodeConstant.LCD_MOST);
    		partyCode.setMcd(CodeConstant.MCD_MT_EQFCTPCD);
    		
    		return capacityCodeDao.getCodeMasterList(partyCode);
        }else if(param.getSearchTp().equals("CAPA_LIST")){
	        return capacityCodeDao.selectCapacityCodeList(param);
        }

    	return null;
    }
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			CapacityCodeItem item = (CapacityCodeItem) list.next();
            
            try {
         		return capacityCodeDao.insertItems(parm);
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
			CapacityCodeItem item = (CapacityCodeItem) list.next();
			
            try {
         		return capacityCodeDao.updateItems(parm);
            }catch(Exception ex) {
            	throw new BizException(ex);
            }
		}
		
		return null;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return capacityCodeDao.deleteItems(parm);
	}
}
