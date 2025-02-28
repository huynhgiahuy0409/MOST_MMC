
package com.tsb.most.basebiz.service.administrator;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import com.tsb.most.basebiz.dao.administrator.IMenuRegisterDao;
import com.tsb.most.basebiz.dataitem.administrator.MenuRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchMenuRegisterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;


public class MenuRegister extends MOSTBaseService implements IMenuRegister {
	private IMenuRegisterDao menuRegisterDao;
	
	public void setMenuRegisterDao(IMenuRegisterDao menuRegisterDao) {
		this.menuRegisterDao = menuRegisterDao;
	}
	
	public DataItemList selectMenuList(SearchMenuRegisterParm parm) throws BizException{
		return menuRegisterDao.selectMenuList(parm);
	}
	
	public DataItemList selectMenu(SearchMenuRegisterParm parm) throws BizException{
		return menuRegisterDao.selectMenu(parm);
	}
	
	public DataItemList selectProgramInfoList(SearchMenuRegisterParm parm) throws BizException{
		return menuRegisterDao.selectProgramInfoList(parm);
	}
	
	public DataItemList insertMenuList(InsertItemsBizParm parm) throws BizException{
		return menuRegisterDao.insertMenuList(parm);
	}
	
	public DataItemList insertProgramInfoList(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			MenuRegisterItem item = (MenuRegisterItem) list.next();
			
			SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");
            
            try {
             	if(item.getUseStartDt() != null && !item.getUseStartDt().equals("")) {
             		Date workStdate = inputFormat.parse(item.getUseStartDt());
                 	String strWorkStDt = outputFormat.format(workStdate);
                 	
                 	item.setUseStartDt(strWorkStDt);
             	}
         		if(item.getUseEndDt() != null && !item.getUseEndDt().equals("")) {
         			Date workEnddate = inputFormat.parse(item.getUseEndDt());
                 	String strWorkEndDt = outputFormat.format(workEnddate);
                 	
                 	item.setUseEndDt(strWorkEndDt);
             	}
         		
         		return menuRegisterDao.insertProgramInfoList(parm);
            }catch(Exception ex) {
            	throw new BizException(ex);
            }
		}
		
		return null;
	}
	
	public DataItemList updateMenuList(UpdateItemsBizParm parm) throws BizException{
		return menuRegisterDao.updateMenuList(parm);
	}
	
	public DataItemList updateProgramInfoList(UpdateItemsBizParm parm) throws BizException{
		DataItemList items = parm.getUpdateItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			MenuRegisterItem item = (MenuRegisterItem) list.next();
     		return menuRegisterDao.updateProgramInfoList(parm);
		}
		
		return null;
	}
	
	public DataItemList deleteMenuList(DeleteItemsBizParm parm) throws BizException{
		return menuRegisterDao.deleteMenuList(parm);
	}
	
	public DataItemList deleteProgramInfoList(DeleteItemsBizParm parm) throws BizException{
		return menuRegisterDao.deleteProgramInfoList(parm);
	}
}
