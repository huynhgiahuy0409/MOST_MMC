/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dao.admin.UserListDao.java
* CREATE ON : 2015. 4. 14.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 4. 14.     Alex.Min             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dao.administrator;
import com.tsb.most.basebiz.dataitem.administrator.UserRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchUserRegisterParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;


/**
 * The Class UserListDao.
 *
 * @author : Alex.Min
 * @version :
 * @date : 2015. 4. 14. 오후 1:36:31
 */
/**
 * @date : 2015. 4. 24. 오전 9:48:20
 * @version : 
 * @author : PLUS
 */
public class UserRegisterDao extends BaseDao implements IUserRegisterDao {
	 
	public DataItemList selectUserIdList(SearchUserRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("userRegister.selectUserIdList", parm);
	}
		
	public DataItemList selectUserList(SearchUserRegisterParm parm) throws DaoException {
		return unifiedDao.getItemsPage("userRegister.selectUserList", parm);
	}
		
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"userRegister.insertUserItem", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "userRegister.updateUserItem", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "userRegister.deleteUserItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

	public DataItemList selectNonAssignedUserList(SearchUserRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("userRegister.selectNonAssignedUserList", parm);
	}
	
	@Override
	public void insertPartners(TxTraceInfo traceInfo, DataItem item) throws DaoException {
		unifiedDao.insertItem(traceInfo, "userRegister.insertPartners", item);
	}

	@Override
	public UserRegisterItem selectUserInfo(SearchUserRegisterParm parm) throws DaoException {
		return (UserRegisterItem)unifiedDao.readOne("userRegister.selectUserList", parm);
	}
	
	@Override
	public DataItemList selectDepartmentList(SearchUserRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("userRegister.selectDepartmentList", parm);
	}
	
	@Override
	public DataItemList selectUserAuthList(SearchUserRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("userRegister.selectAuthGrpList", parm);
	}
	
	@Override
	public DataItemList selectUserAuth(SearchUserRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("userRegister.selectUserAuth", parm);
	}

	@Override
	public DataItemList selectUserAuthCombo(SearchUserRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("userRegister.selectUserAuthCombo", parm);
	}
	
	@Override
	public DataItemList checkUserDup(SearchUserRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("userRegister.checkUserDup", parm);
	}

	@Override
	public DataItemList selectUserType(SearchCodeMasterParm parm) throws DaoException{
    	return unifiedDao.getItems("userRegister.selectUserType", parm);
    }
	
	@Override
	public DataItemList selectJobTitle(SearchCodeMasterParm parm) throws DaoException{
    	return unifiedDao.getItems("userRegister.selectJobTitle", parm);
    }
	
	@Override
	public void insertUserAuth(TxTraceInfo txTraceInfo, UserRegisterItem item) throws DaoException {
        unifiedDao.insertItem(txTraceInfo,"userRegister.insertUserAuth", item);
    }
	
	@Override
	public void deleteUserAuth(TxTraceInfo txTraceInfo, UserRegisterItem items) throws DaoException {
        unifiedDao.deleteItem(txTraceInfo,"userRegister.deleteUserAuth", items);
    }
	
	@Override
	public void insertOauthCredentialMst(TxTraceInfo txTraceInfo, DataItem items) throws DaoException {
        unifiedDao.insertItem(txTraceInfo,"userRegister.insertOauthCredentialMst", items);
    }
	
	@Override
	public void updateAccessAuth(TxTraceInfo traceInfo, DataItem updateItem) throws DaoException {
		unifiedDao.updateItem(traceInfo, "accessAuthority.updateAccessAuth", updateItem);
	}
	
	@Override
	public void deletePartnerUser(TxTraceInfo traceInfo, UserRegisterItem item) throws DaoException {
		unifiedDao.deleteItem(traceInfo, "userRegister.deletePartnerUser", item);
	}
	
	@Override
	public void insertPartnerUser(TxTraceInfo traceInfo, UserRegisterItem item) throws DaoException {
		unifiedDao.insertItem(traceInfo, "userRegister.insertPartnerUser", item);
	}
	
	@Override
	public DataItemList checkOldPassword(SearchUserRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("userRegister.checkOldPassword", parm);
	}
	
	@Override
	public DataItemList updateUserPassword(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "userRegister.updateUserPassword", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	@Override
	public DataItemList updateUserInfo(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "userRegister.updateUserInfo", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
}
