/**
* FILE NAME : PtnrInfoDao.java 
* PACKAGE NAME : com.pcs.integ.dao.party
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
package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CompanyRegisterDao extends BaseDao implements ICompanyRegisterDao {

	public DataItemList selectCompanyRegisterList(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItemsPage("companyRegister.selectCompanyRegisterList", parm);
	}

	public DataItemList selectPtnrDetail(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectPtnrDetail", parm);
	}

	public DataItemList selectCompanyRegsterImageDetail(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectPtnrImageDetail", parm);
	}

	public DataItemList selectAgencyDetail(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectAgencyDetail", parm);
	}

	public DataItemList selectAgencyImageDetail(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectAgencyImageDetail", parm);
	}

	public DataItemList selectPartnerCode(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectPartnerCode", parm);
	}

	//s-MGR-008 PLUS – Company Register List and Detail screen
	@Override
	public DataItemList selectShpList(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectShpList", parm);
	}
	
	@Override
	public DataItemList selectAccountList(SearchCompanyRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("companyRegister.selectAccountNoList", parm);
	}
	//e-MGR-008 PLUS – Company Register List and Detail screen

}