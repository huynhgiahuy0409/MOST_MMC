package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchMenuRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class MenuRegisterDao extends BaseDao implements IMenuRegisterDao {

	public DataItemList selectProgramInfoList(SearchMenuRegisterParm parm) throws DaoException{
		return unifiedDao.getItemsPage("menuRegister.selectProgramInfoList", parm);
	}
	
	@Override
	public DataItemList selectMenuList(SearchMenuRegisterParm parm) throws DaoException{
		return unifiedDao.getItemsPage("menuRegister.selectMenuList", parm);
	}

	@Override
	public DataItemList selectMenu(SearchMenuRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("menuRegister.selectMenu", parm);
	}
	
	public DataItemList insertMenuList(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"menuRegister.insertMenuList", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList insertProgramInfoList(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"menuRegister.insertProgramInfoList", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList updateMenuList(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItems(null,"menuRegister.updateMenuList", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	
	public DataItemList updateProgramInfoList(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		
		setNewVersion(updateItems);
		unifiedDao.updateItemsWithTimeCheck(null,"menuRegister.updateProgramInfoList", updateItems);
		setVersion(updateItems);
		
		return updateItems;
	}
	
	public DataItemList deleteMenuList(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"menuRegister.deleteMenuList", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
	
	public DataItemList deleteProgramInfoList(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		
		setNewVersion(deleteItems);
		unifiedDao.deleteItemsWithTimeCheck(null,"menuRegister.deleteProgramInfoList", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
}
