/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dao.admin.IUserListDao.java
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
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

/**
 * @date : 2015. 4. 14. 오후 1:36:17
 * @version :
 * @author : Alex.Min
 */
public interface IUserRegisterDao {

	public DataItemList selectUserList(SearchUserRegisterParm parm) throws DaoException;
	
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	public UserRegisterItem selectUserInfo(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList selectDepartmentList(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList selectUserAuthList(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList checkUserDup(SearchUserRegisterParm parm) throws DaoException;
	
	public void insertPartners(TxTraceInfo traceInfo, DataItem item) throws DaoException;
	public void insertUserAuth(TxTraceInfo txTraceInfo, UserRegisterItem item) throws DaoException;
	public void deleteUserAuth(TxTraceInfo txTraceInfo, UserRegisterItem items) throws DaoException;
	
	public DataItemList selectUserAuth(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList selectUserAuthCombo(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList selectUserType(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList selectJobTitle(SearchCodeMasterParm parm) throws DaoException;
	
	public void insertOauthCredentialMst(TxTraceInfo txTraceInfo, DataItem items) throws DaoException;
	public void updateAccessAuth(TxTraceInfo traceInfo, DataItem updateItem) throws DaoException;
	
	public void deletePartnerUser(TxTraceInfo traceInfo, UserRegisterItem item) throws DaoException;
	public void insertPartnerUser(TxTraceInfo traceInfo, UserRegisterItem item) throws DaoException;
	
	public DataItemList checkOldPassword(SearchUserRegisterParm parm) throws DaoException;
	public DataItemList updateUserPassword(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateUserInfo(UpdateItemsBizParm parm) throws DaoException;
}
