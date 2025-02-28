/**
* FILE NAME : IntegParty.java 
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

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dao.administrator.ICompanyRegisterDao;
import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class CompanyRegister extends MOSTBaseService implements ICompanyRegister {
	private ICompanyRegisterDao companyRegisterDao;
	private IFileUpload fileUpload;

	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public DataItemList selectCompanyRegisterList(SearchCompanyRegisterParm parm) throws BizException {
		return companyRegisterDao.selectCompanyRegisterList(parm);
	}

	//s-MGR-008 PLUS – Company Register List and Detail screen
	public DataItemList selectCompanyRegisterDetail(SearchCompanyRegisterParm parm) throws BizException {
		DataItemList returnItems = new DataItemList();
		CompanyRegisterItem returnItem = null;
		boolean isSHAType = CodeConstant.CM_PTNRTP_SHA.equals(parm.getPtnrType());

		returnItem = getCompanyRegisterItem(parm, returnItem, isSHAType);
		
		if (returnItem != null) { 
			setAccountList(parm, returnItem);
			setPartnerImage(parm, returnItem, isSHAType);
			setSHADetail(parm, returnItem, isSHAType);
			returnItems.add(returnItem);
		}

		return returnItems;
	}

	private CompanyRegisterItem getCompanyRegisterItem(SearchCompanyRegisterParm parm, CompanyRegisterItem returnItem,
			boolean isSHAType) throws DaoException {
		DataItemList companyReigstList = isSHAType ? companyRegisterDao.selectAgencyDetail(parm)
				: companyRegisterDao.selectPtnrDetail(parm);

		return !companyReigstList.getCollection().isEmpty() ? (CompanyRegisterItem) companyReigstList.get(0) : null;
	}

	private void setPartnerImage(SearchCompanyRegisterParm parm, CompanyRegisterItem item, boolean isSHAType)
			throws DaoException {
		DataItemList ptnrImageList = isSHAType ? companyRegisterDao.selectAgencyImageDetail(parm)
				: companyRegisterDao.selectCompanyRegsterImageDetail(parm);

		if (!ptnrImageList.getCollection().isEmpty()) {
			if (ptnrImageList.get(0) != null) {
				item.setPtnrImage(((CompanyRegisterItem) ptnrImageList.get(0)).getPtnrImage());
			}
		}
	}

	private void setSHADetail(SearchCompanyRegisterParm parm, CompanyRegisterItem item, boolean isSHAType)
			throws DaoException {
		if (!isSHAType) {
			return;
		}
		item.setShpList(companyRegisterDao.selectShpList(parm).getCollection());
	}
	
	private void setAccountList(SearchCompanyRegisterParm parm, CompanyRegisterItem item)
			throws DaoException {
		item.setAccNoList(companyRegisterDao.selectAccountList(parm).getCollection());
	}
	//e-MGR-008 PLUS – Company Register List and Detail screen
	
	@Override
	public DataItemList selectShpList(SearchCompanyRegisterParm parm) throws DaoException {
		return companyRegisterDao.selectShpList(parm);
	}

	@Override
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException {
		return fileUpload.selectFileList(parm);
	}
	
	@Override
	public DataItemList selectAccountList(SearchCompanyRegisterParm parm) throws BizException {
		return companyRegisterDao.selectAccountList(parm);
	}
	
}
