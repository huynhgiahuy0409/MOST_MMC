/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.dao.common.CodeMasterDao.java 
* CREATE ON : 2015. 3. 27
* CLASS DESCRIPTION :
* 
*  
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION     
* --------------------------------------------------------------------------
* 2015. 3. 27     simonkang             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CodeMasterDao extends BaseDao implements ICodeMasterDao{

	@Override
	public DataItemList selectCodeMasterLargeCode(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItems("codeMaster.selectCodeMasterLargeCode",parm);
	}

	@Override
	public DataItemList selectCodeMasterMiddleCode(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItems("codeMaster.selectCodeMasterMiddleCode",parm);
	}

	@Override
	public DataItemList selectCodeMasterSmallCode(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItemsPage("codeMaster.selectCodeMasterSmallCode",parm);
	}
	
	@Override
	public DataItemList selectCodeMasterSmallCodeList(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItemsPage("codeMaster.selectCodeMasterSmallCodeList",parm);
	}
	
	@Override
	public DataItemList selectCodeMasterList(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItems("codeMaster.selectCodeMasterList",parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"codeMaster.insertCodeMasterItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"codeMaster.updateCodeMasterItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"codeMaster.deleteCodeMasterItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
	
	@Override
	public DataItemList duplicationCodeCheck(SearchCodeMasterParm parm) throws DaoException {
		return unifiedDao.getItems("codeMaster.checkDupCodeMaster", parm);
	}
	
	@Override
	public DataItemList selectLorryAssignmentConfigurationList(SearchCodeMasterParm parm) throws DaoException {
		try{
			return unifiedDao.getItemsPage("codeMaster.selectLorryAssignmentConfigurationList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateLorryAssignmentConfigurationItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"codeMaster.updateLorryAssignmentConfigurationItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}