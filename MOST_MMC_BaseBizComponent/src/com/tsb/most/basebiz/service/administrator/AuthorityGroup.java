package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.dao.administrator.IAuthorityGroupDao;
import com.tsb.most.basebiz.dataitem.administrator.AuthorityGroupItem;
import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AuthorityGroup extends MOSTBaseService implements IAuthorityGroup{
	private IAuthorityGroupDao authorityGroupDao;
	
	public void setAuthorityGroupDao(IAuthorityGroupDao authorityGroupDao) {
		this.authorityGroupDao = authorityGroupDao;
	}

	public DataItemList selectAuthorityGroup(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectAuthorityGroup(parm);
	}
	
	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectPartnerType(parm);
	}
	
	public DataItemList selectUserListByGroup(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectUserListByGroup(parm);
	}
	
	public DataItemList selectAccessAuth(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectAccessAuth(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{	
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		DataItemList insertItems = new DataItemList();
		DataItemList result = new DataItemList();
		AuthorityGroupItem item = new AuthorityGroupItem();
		
		item = (AuthorityGroupItem) parm.getInsertItems().getCollection().get(0);
		
		insertItems.setCollection(item.getUserList());
		insertParm.setInsertItems(insertItems);
		
		result.addDataItemList(authorityGroupDao.insertItems(parm));
		result.addDataItemList(authorityGroupDao.insertAccessItems(insertParm));
		
		return result;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		DataItemList updateItems = new DataItemList();
		DataItemList result = new DataItemList();
		AuthorityGroupItem item = new AuthorityGroupItem();
		
		item = (AuthorityGroupItem) parm.getUpdateItems().getCollection().get(0);
		
		updateItems.setCollection(item.getUserList());
		updateParm.setUpdateItems(updateItems);
		
		result.addDataItemList(authorityGroupDao.updateGroupItems(parm));
		result.addDataItemList(authorityGroupDao.updateItems(updateParm));
		return result;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList result = new DataItemList();
		
		result.addDataItemList(authorityGroupDao.deleteItems(parm));
		result.addDataItemList(authorityGroupDao.deleteAccessItems(parm));
		
		return result;
	}
	
	public DataItemList selectAuthorityGroupPopup(SearchAuthorityGroupParm parm) throws BizException{
		return  authorityGroupDao.selectAuthorityGroupPopup(parm);
	}
	
	public DataItemList selectDepartmentPopup(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectDepartmentPopup(parm);
	}
}
