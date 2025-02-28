/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.service.admin.IUserList.java
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
package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.basebiz.parm.administrator.SearchUserRegisterParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

/**
 * @date : 2015. 4. 14. 오후 1:39:33
 * @version :
 * @author : Alex.Min
 */
public interface IUserRegister {
	public DataItemList selectUserList(SearchUserRegisterParm parm) throws BizException ;
	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList selectDepartmentList(SearchUserRegisterParm pParm) throws BizException;
	public DataItemList selectUserAuthList(SearchUserRegisterParm pParm) throws BizException;
	public DataItemList selectUserAuth(SearchUserRegisterParm parm) throws BizException;
	public DataItemList selectUserAuthCombo(SearchUserRegisterParm parm) throws BizException;
	public DataItemList decryptPassword(SearchUserRegisterParm pParm) throws BizException;
	public DataItemList checkUserDup(SearchUserRegisterParm pParm) throws BizException;
	public DataItemList selectUserType(SearchCodeMasterParm parm) throws BizException;
	public DataItemList selectJobTitle(SearchCodeMasterParm pParm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
	
	public DataItemList checkOldPassword(SearchUserRegisterParm pParm) throws BizException;
	public DataItemList updateUserPassword(UpdateItemsBizParm parm) throws BizException,Exception;
	public DataItemList updateUserInfo(UpdateItemsBizParm parm) throws BizException;
}
