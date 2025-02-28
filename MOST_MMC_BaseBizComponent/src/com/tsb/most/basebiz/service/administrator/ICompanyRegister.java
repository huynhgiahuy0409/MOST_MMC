/**
* FILE NAME : IIntegParty.java 
* PACKAGE NAME : com.pcs.integ.service.party
* Created on   : 2015. 6. 16
*
* ------------------------------------------------------------
* CHANGE REVISION
* ------------------------------------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2015. 6. 16     LUIS             First release.
* ------------------------------------------------------------
* CLASS DESCRIPTION
* ------------------------------------------------------------
* 
* 
* ------------------------------------------------------------
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*/
package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface ICompanyRegister {
	public DataItemList selectCompanyRegisterList(SearchCompanyRegisterParm parm) throws BizException;

	public DataItemList selectCompanyRegisterDetail(SearchCompanyRegisterParm parm) throws BizException;

	public DataItemList selectShpList(SearchCompanyRegisterParm parm) throws DaoException;
	
	public DataItemList selectAccountList(SearchCompanyRegisterParm parm) throws BizException;
	
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException;
}