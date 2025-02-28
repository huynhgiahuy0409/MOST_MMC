/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.service.admin.UserList.java
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

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.component.fileupload.IFileUploadDao;
import com.tsb.most.basebiz.dao.administrator.IAuthorityGroupDao;
import com.tsb.most.basebiz.dao.administrator.IUserRegisterDao;
import com.tsb.most.basebiz.dataitem.administrator.UserRegisterItem;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.dataitem.user.UserInfoDataItem;
import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.basebiz.parm.administrator.SearchUserRegisterParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.data.util.Encryption;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
/**
 * @date : 2015. 4. 14. 오후 1:39:43
 * @version :
 * @author : Alex.Min
 */
public class UserRegister extends MOSTBaseService implements IUserRegister {
	private IUserRegisterDao userRegisterDao;
	private IFileUploadDao fileUploadDao;
	private IAuthorityGroupDao authorityGroupDao;
	
	public void setuserRegisterDao(IUserRegisterDao userRegisterDao) {
		this.userRegisterDao = userRegisterDao;
	}
	
	public IFileUploadDao getFileUploadDao() {
		return fileUploadDao;
	}

	public void setFileUploadDao(IFileUploadDao fileUploadDao) {
		this.fileUploadDao = fileUploadDao;
	}

	public void setAuthorityGroupDao(IAuthorityGroupDao authorityGroupDao) {
		this.authorityGroupDao = authorityGroupDao;
	}
	
	public DataItemList selectUserList(SearchUserRegisterParm pParm) throws BizException {
		return userRegisterDao.selectUserList(pParm);
	}
	
	public DataItemList checkUserDup(SearchUserRegisterParm pParm) throws BizException {
		return this.userRegisterDao.checkUserDup(pParm);
	}

	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws BizException{
		return authorityGroupDao.selectPartnerType(parm);
	}
	
	public DataItemList selectDepartmentList(SearchUserRegisterParm pParm) throws BizException {
		return this.userRegisterDao.selectDepartmentList(pParm);
	}
	
	public DataItemList selectUserAuthList(SearchUserRegisterParm pParm) throws BizException {
		return this.userRegisterDao.selectUserAuthList(pParm);
	}
	
	public DataItemList selectUserAuth(SearchUserRegisterParm parm) throws BizException{
		return this.userRegisterDao.selectUserAuth(parm);
	}
	
	public DataItemList selectUserAuthCombo(SearchUserRegisterParm parm) throws BizException{
		return this.userRegisterDao.selectUserAuthCombo(parm);
	}
	
	public DataItemList selectUserType(SearchCodeMasterParm parm) throws BizException {
		return userRegisterDao.selectUserType(parm);
	}
	
	public DataItemList selectJobTitle(SearchCodeMasterParm pParm) throws BizException {
		return userRegisterDao.selectJobTitle(pParm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		DataItemList items = parm.getInsertItems();
		
		UserRegisterItem masterItem = (UserRegisterItem)items.get(0);
    	masterItem.setUserId(masterItem.getUserId());
    	
    	ArrayList<UserRegisterItem> ptnrSysList = (ArrayList<UserRegisterItem>)masterItem.getPtnrSysList();
		ArrayList<UserRegisterItem> ptnrUserList = (ArrayList<UserRegisterItem>)masterItem.getPtnrUserList();
		ArrayList<UserRegisterItem> userAuthList = (ArrayList<UserRegisterItem>)masterItem.getUserAuthList();
		ArrayList<FileUploadItem> uploadItemList = (ArrayList<FileUploadItem>)masterItem.getUploadItemsList();
		
		DataItemList ptnrSysCol = new DataItemList();
		DataItemList ptnrUserCol = new DataItemList();
		DataItemList userAuthCol = new DataItemList();
		DataItemList insertFileCol = new DataItemList();
		
		UserRegisterItem delPtnrSysItem = new UserRegisterItem();
		UserRegisterItem delPtnrUserItem = new UserRegisterItem();
		UserRegisterItem delUserAuthItem = new UserRegisterItem();
		
		String sPWD = masterItem.getPassword();
		
		delPtnrSysItem.setRegUserId(masterItem.getRegUserId());
		delPtnrUserItem.setRegUserId(masterItem.getRegUserId());
		delUserAuthItem.setRegUserId(masterItem.getRegUserId());
		
		if(ptnrUserList != null) {
			for(UserRegisterItem ptnrUserItem : ptnrUserList){
				ptnrUserItem.setUserId(masterItem.getUserId());
				ptnrUserCol.add(ptnrUserItem);
			}
		}
		
		if(userAuthList != null) {
			for(UserRegisterItem userAuthItem : userAuthList){
				userAuthItem.setUserId(masterItem.getUserId());
				userAuthCol.add(userAuthItem);
			}
		}
		
		if(uploadItemList != null) {
			for(FileUploadItem uploadItem : uploadItemList){
				insertFileCol.add(uploadItem);
			}
		}
		
		if(ptnrSysList != null) {
			for (UserRegisterItem ptnrSysItem : ptnrSysList) {
				ptnrSysItem.setUserId(masterItem.getUserId());
				ptnrSysCol.add(ptnrSysItem);
			}
		}
		
		boolean done = false;
		
		while(!done) {
			try {
				Encryption encryp = new Encryption();
				
				String sEncryptPWD = encryp.makeEncryp(sPWD);
				masterItem.setPassword(sEncryptPWD);
				
				done = true;
			}catch(Exception ex) {
				System.out.println(ex);
			}
		}
		
		DataItemList resList = new DataItemList();
		resList = this.userRegisterDao.insertItems(parm);

		userRegisterDao.insertOauthCredentialMst(parm.getTxTraceinfo(), masterItem);
		
		if(userAuthCol.size() > 0) {
			for (int i = 0; i < userAuthCol.size(); i++) {
				UserRegisterItem it = (UserRegisterItem)userAuthCol.get(i);
				userRegisterDao.insertUserAuth(parm.getTxTraceinfo(), it);
			}
		}
		
		if(masterItem.getRegUserType().equals("E")) {
			userRegisterDao.deletePartnerUser(parm.getTxTraceinfo(), delPtnrUserItem);
			if(ptnrUserCol.size() > 0) { //comment temporary: to continue
				for(int i = 0; i < ptnrUserCol.size(); i++) {
					UserRegisterItem it = (UserRegisterItem)ptnrUserCol.get(i);
					userRegisterDao.insertPartnerUser(parm.getTxTraceinfo(), it);
				}
			}
		}
		
		if(insertFileCol.size()>0) {
			this.fileUploadDao.deleteFileItemsForUserReg(parm.getTxTraceinfo(), insertFileCol);
			this.fileUploadDao.insertFileItems(parm.getTxTraceinfo(), insertFileCol);
		}
		
		return resList;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException{
		DataItemList items = parm.getUpdateItems();
		SearchUserRegisterParm getDecPwd = new SearchUserRegisterParm();
		UserRegisterItem masterItem = (UserRegisterItem)items.get(0);
		UserRegisterItem decPwd = new UserRegisterItem();
		
    	ArrayList<UserRegisterItem> ptnrSysList = (ArrayList<UserRegisterItem>)masterItem.getPtnrSysList();
		ArrayList<UserRegisterItem> ptnrUserList = (ArrayList<UserRegisterItem>)masterItem.getPtnrUserList();
		ArrayList<UserRegisterItem> userAuthList = (ArrayList<UserRegisterItem>)masterItem.getUserAuthList();
		ArrayList<FileUploadItem> uploadItemList = (ArrayList<FileUploadItem>)masterItem.getUploadItemsList();
		
		DataItemList ptnrSysCol = new DataItemList();
		DataItemList ptnrUserCol = new DataItemList();
		DataItemList userAuthCol = new DataItemList();
		DataItemList insertFileCol = new DataItemList();
		DataItemList decryptPwd = new DataItemList();
		
		UserRegisterItem delPtnrSysItem = new UserRegisterItem();
		UserRegisterItem delPtnrUserItem = new UserRegisterItem();
		UserRegisterItem delUserAuthItem = new UserRegisterItem();
		
		String sPWD = masterItem.getPassword();
		String originPWD = sPWD;
		getDecPwd.setPwd(sPWD);
		
		delPtnrSysItem.setRegUserId(masterItem.getRegUserId());
		delPtnrUserItem.setRegUserId(masterItem.getRegUserId());
		delUserAuthItem.setRegUserId(masterItem.getRegUserId());
		
		if(ptnrUserList != null) {
			for(UserRegisterItem ptnrUserItem : ptnrUserList){
				ptnrUserItem.setUserId(masterItem.getUserId());
				ptnrUserCol.add(ptnrUserItem);
			}
		}
		
		if(userAuthList != null) {
			for(UserRegisterItem userAuthItem : userAuthList){
				userAuthItem.setUserId(masterItem.getUserId());
				userAuthCol.add(userAuthItem);
			}
		}
		
		if(uploadItemList != null) {
			for(FileUploadItem uploadItem : uploadItemList){
				insertFileCol.add(uploadItem);
			}
		}
		
		if(ptnrSysList != null) {
			for (UserRegisterItem ptnrSysItem : ptnrSysList) {
				ptnrSysItem.setUserId(masterItem.getUserId());
				ptnrSysCol.add(ptnrSysItem);
			}
		}
		
		decryptPwd = decryptPassword(getDecPwd);
		decPwd = (UserRegisterItem)decryptPwd.getCollection().get(0);
		sPWD = decPwd.getPassword();
		
		if(sPWD == null){
			sPWD = originPWD;
		}
		
		boolean done = false;
		
		while(!done) {
			try {
				Encryption encryp = new Encryption();
				
				String sEncryptPWD = encryp.makeEncryp(sPWD);
				masterItem.setPassword(sEncryptPWD);
				done = true;
			}catch(Exception ex) {
				System.out.println(ex);
			}
		}

		parm.setDataItem(masterItem);
		
		SearchUserRegisterParm userListParm = new SearchUserRegisterParm();
		
		userListParm.setRegUserId(masterItem.getRegUserId());
		userListParm.setSysCd("MPTS");
		
		if(masterItem.getRegUserType().equals(CodeConstant.USER_TYPE_EXTERNAL)) {
			userListParm.setPtnrCd(masterItem.getPtnrCd());
		}else if(masterItem.getRegUserType().equals(CodeConstant.USER_TYPE_INTERNAL)) {
			userListParm.setPtnrCd("MYPGU");
		}
		
		delUserAuthItem.setRegUserId(userListParm.getRegUserId());
		userRegisterDao.deleteUserAuth(parm.getTxTraceinfo(), delUserAuthItem);

		if(userAuthCol.size() > 0) {
			for (int i = 0; i < userAuthCol.size(); i++) {
				UserRegisterItem it = (UserRegisterItem)userAuthCol.get(i);
				userRegisterDao.insertUserAuth(parm.getTxTraceinfo(), it);
			}
		}
		
		if(masterItem.getRegUserType().equals("E")) {
			userRegisterDao.deletePartnerUser(parm.getTxTraceinfo(), delPtnrUserItem);
			if(ptnrUserCol.size() > 0) { //comment temporary: to continue
				for(int i = 0; i < ptnrUserCol.size(); i++) {
					UserRegisterItem it = (UserRegisterItem)ptnrUserCol.get(i);
					userRegisterDao.insertPartnerUser(parm.getTxTraceinfo(), it);
				}
			}
		}
		
		if(insertFileCol.size()>0) {
			this.fileUploadDao.deleteFileItemsForUserReg(parm.getTxTraceinfo(), insertFileCol);
			this.fileUploadDao.insertFileItems(parm.getTxTraceinfo(), insertFileCol);
		}

		return this.userRegisterDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException{
		DataItemList items = parm.getDeleteItems();
		
		UserRegisterItem masterItem = (UserRegisterItem)items.get(0);
    	masterItem.setUserId(parm.getUserId());
    	
		ArrayList<UserRegisterItem> ptnrSysList = (ArrayList<UserRegisterItem>)masterItem.getPtnrSysList();
		ArrayList<UserRegisterItem> ptnrUserList = (ArrayList<UserRegisterItem>)masterItem.getPtnrUserList();
		ArrayList<UserRegisterItem> userAuthList = (ArrayList<UserRegisterItem>)masterItem.getUserAuthList();
		ArrayList<FileUploadItem> uploadItemList = (ArrayList<FileUploadItem>)masterItem.getUploadItemsList();
		
		DataItemList ptnrSysCol = new DataItemList();
		DataItemList ptnrUserCol = new DataItemList();
		DataItemList userAuthCol = new DataItemList();
		DataItemList insertFileCol = new DataItemList();
		
		UserRegisterItem delPtnrSysItem = new UserRegisterItem();
		UserRegisterItem delPtnrUserItem = new UserRegisterItem();
		UserRegisterItem delUserAuthItem = new UserRegisterItem();
		
		String sPWD = masterItem.getPassword();
		
		delPtnrSysItem.setRegUserId(masterItem.getRegUserId());
		delPtnrUserItem.setRegUserId(masterItem.getRegUserId());
		delUserAuthItem.setRegUserId(masterItem.getRegUserId());
		
		if(ptnrUserList != null) {
			for(UserRegisterItem ptnrUserItem : ptnrUserList){
				ptnrUserItem.setUserId(masterItem.getUserId());
				ptnrUserCol.add(ptnrUserItem);
			}
		}
		
		if(userAuthList != null) {
			for(UserRegisterItem userAuthItem : userAuthList){
				userAuthItem.setUserId(masterItem.getUserId());
				userAuthCol.add(userAuthItem);
			}
		}
		
		if(uploadItemList != null) {
			for(FileUploadItem uploadItem : uploadItemList){
				insertFileCol.add(uploadItem);
			}
		}
		
		if(ptnrSysList != null) {
			for (UserRegisterItem ptnrSysItem : ptnrSysList) {
				ptnrSysItem.setUserId(masterItem.getUserId());
				ptnrSysCol.add(ptnrSysItem);
			}
		}
	
		
		return this.userRegisterDao.deleteItems(parm);
	}
	
	
	public DataItemList decryptPassword(SearchUserRegisterParm pParm) throws BizException{
		DataItemList returnList = new DataItemList();
		
		String pwd = pParm.getPwd();
		
		Encryption encryp = new Encryption();
		String decryptPwd = encryp.makeDecryp(pwd);
		
		UserRegisterItem userItem = new UserRegisterItem();
		userItem.setPassword(decryptPwd);
		
		
		returnList.add(userItem);
		
		return returnList;
	}
	
	///////////////////////////////////////////////////////////
	public DataItemList checkOldPassword(SearchUserRegisterParm pParm) throws BizException {
		DataItemList returnList = new DataItemList();
		Encryption encryp = new Encryption();
		List userOldList = userRegisterDao.checkOldPassword(pParm).getCollection();
		UserRegisterItem userOldItem = (UserRegisterItem) userOldList.get(0);
		String decryptPwd = encryp.makeDecryp(userOldItem.getPassword());
		UserRegisterItem userItem = new UserRegisterItem();
		userItem.setPassword(decryptPwd);
		returnList.add(userItem);
		return returnList;
		
	}
	
	public DataItemList updateUserPassword(UpdateItemsBizParm parm) throws BizException,Exception{
		DataItemList items = parm.getUpdateItems();
		DataItemList updateItemList = new DataItemList();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		
    	UserInfoDataItem oItem = (UserInfoDataItem)items.get(0);
    	
    	Encryption encryp = new Encryption();
		
		String sEncryptPWD = encryp.makeEncryp(oItem.getPassword());
		oItem.setPassword(sEncryptPWD);
    	
    	updateItemList.add(oItem);
    	updateItms.addUpdateItem(updateItemList);
    	userRegisterDao.updateUserPassword(updateItms);
        return items;
    }
	
	public DataItemList updateUserInfo(UpdateItemsBizParm parm) throws BizException{
    	return userRegisterDao.updateUserInfo(parm);
    }
	
	
}
