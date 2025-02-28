package com.tsb.most.basebiz.dao.codes;


import com.tsb.most.basebiz.parm.codes.SearchDangerousGoodsCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DangerousGoodsCodeDao extends BaseDao implements IDangerousGoodsCodeDao{
	@Override
	public DataItemList selectDangerousGoodsCode(SearchDangerousGoodsCodeParm parm) throws DaoException {
	    return unifiedDao.getItemsPage("dangerousGoodsCode.selectDangerousGoodsCode",parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"dangerousGoodsCode.insertDangerousGoodsCode", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"dangerousGoodsCode.updateDangerousGoodsCode", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"dangerousGoodsCode.deleteDangerousGoodsCode", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
		
	}
}
