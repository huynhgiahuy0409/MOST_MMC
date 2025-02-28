/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.service.common.CodeMaster.java 
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
package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

/**
 * The Class CodeMaster.
 */
public class CodeMaster extends MOSTBaseService implements ICodeMaster {
	
	/** The detailCode dao. */
	private ICodeMasterDao codeMasterDao;

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	
	public ICodeMasterDao getCodeMasterDao() {
		return codeMasterDao;
	}
	
	@Override
	public DataItemList selectCodeMasterLargeCode(SearchCodeMasterParm pParm) throws BizException {
		return codeMasterDao.selectCodeMasterLargeCode(pParm);
	}
	
	@Override
	public DataItemList selectCodeMasterSmallCode(SearchCodeMasterParm pParm) throws BizException {
		return codeMasterDao.selectCodeMasterSmallCode(pParm);
	}
	
	@Override
	public DataItemList selectCodeMasterMiddleCode(SearchCodeMasterParm pParm) throws BizException {
		return codeMasterDao.selectCodeMasterMiddleCode(pParm);
	}
	
	@Override
	public DataItemList selectCodeMasterSmallCodeList(SearchCodeMasterParm pParm) throws BizException {
		return codeMasterDao.selectCodeMasterSmallCodeList(pParm);
	}
	
	@Override
	public DataItemList selectCodeMasterList(SearchCodeMasterParm pParm) throws BizException {
		return codeMasterDao.selectCodeMasterList(pParm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		return codeMasterDao.insertItems(parm);
	}
	
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return codeMasterDao.updateItems(parm);
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return codeMasterDao.deleteItems(parm);
	}
	
	@Override
	public DataItemList duplicationCodeCheck(SearchCodeMasterParm parm) throws BizException {
		return codeMasterDao.duplicationCodeCheck(parm);
	}
	
	public DataItemList selectLorryAssignmentConfigurationList(SearchCodeMasterParm parm) throws BizException {
		return codeMasterDao.selectLorryAssignmentConfigurationList(parm);
	}

	public DataItemList updateLorryAssignmentConfigurationItems(UpdateItemsBizParm parm) throws BizException {
		return codeMasterDao.updateLorryAssignmentConfigurationItems(parm);
	}
}