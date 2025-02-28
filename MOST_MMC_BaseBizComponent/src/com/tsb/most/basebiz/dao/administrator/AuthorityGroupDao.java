package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AuthorityGroupDao extends BaseDao implements IAuthorityGroupDao  {
	
	@Override
	public DataItemList selectAuthorityGroup(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItemsPage("authorityGroup.selectAuthorityGroup", parm);
	}
	
	@Override
	public DataItemList selectAuthorityGroupPopup(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItems("authorityGroup.selectAuthorityGroupPopup", parm);
	}
	
	@Override
	public DataItemList selectDepartmentPopup(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItems("authorityGroup.selectDepartmentPopup", parm);
	}
	
	@Override
	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItems("authorityGroup.selectPartnerType", parm);
	}
	
	@Override
	public DataItemList selectUserListByGroup(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItemsPage("authorityGroup.selectUserListByGroup", parm);
	}
	
	@Override
	public DataItemList selectAccessAuth(SearchAuthorityGroupParm parm) throws DaoException{
		return unifiedDao.getItemsPage("authorityGroup.selectAccessAuth", parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"authorityGroup.insertAuthGrp", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList insertAccessItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"authorityGroup.insertAccessAuth", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		
		setNewVersion(updateItems);
		unifiedDao.updateItems(null,"authorityGroup.updateAccessAuth", updateItems);
		setVersion(updateItems);
		
		return updateItems;
	}
	
	public DataItemList updateGroupItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		
		setNewVersion(updateItems);
		unifiedDao.updateItemsWithTimeCheck(null,"authorityGroup.updateAuthGrp", updateItems);
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		
		setNewVersion(deleteItems);
		unifiedDao.deleteItemsWithTimeCheck(null,"authorityGroup.deleteAuthGrp", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
	
	public DataItemList deleteAccessItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		
		setNewVersion(deleteItems);
		unifiedDao.deleteItems(null, "authorityGroup.deleteAuthAccessGrp", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
}
