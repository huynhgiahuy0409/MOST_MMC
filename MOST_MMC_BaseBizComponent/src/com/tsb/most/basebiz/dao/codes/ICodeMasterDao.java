/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.dao.common.ICodeMasterDao.java 
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

import org.apache.ibatis.annotations.Update;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

/**
 * The Interface ICodeMasterDao.
 */
public interface ICodeMasterDao {
	public DataItemList selectCodeMasterLargeCode(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList selectCodeMasterMiddleCode(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList selectCodeMasterSmallCodeList(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList selectCodeMasterSmallCode(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList selectCodeMasterList(SearchCodeMasterParm parm) throws DaoException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList duplicationCodeCheck(SearchCodeMasterParm parm) throws DaoException;
	
	public DataItemList selectLorryAssignmentConfigurationList(SearchCodeMasterParm parm) throws DaoException;
	public DataItemList updateLorryAssignmentConfigurationItems(UpdateItemsBizParm parm) throws DaoException;
}
