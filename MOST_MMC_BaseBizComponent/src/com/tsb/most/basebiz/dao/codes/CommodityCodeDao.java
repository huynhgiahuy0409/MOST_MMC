package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.dataitem.codes.CommodityCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CommodityCodeDao extends BaseDao implements ICommodityCodeDao{
    public DataItemList selectCommodityCodeList(SearchCommodityCodeParm parm) throws DaoException {
    	DataItemList cmdtCd = unifiedDao.getItemsPage("commodityCode.selectCommodityCodeList", parm);
    	
    	for(int i = 0; i < cmdtCd.getCollection().size(); i++) {
    		SearchCommodityCodeParm cmdtParm = new SearchCommodityCodeParm();
    		CommodityCodeItem list = (CommodityCodeItem) cmdtCd.getCollection().get(i);
    		cmdtParm.setCmdtCd(list.getCmdtCd());
    		String pkgTp = "";
    		DataItemList pkgCd = unifiedDao.getItems("commodityCode.selectPackageTypeCodeItem", cmdtParm);
    		for(int j = 0; j < pkgCd.size(); j++) {    			
    			CommodityCodeItem listPkg = (CommodityCodeItem) pkgCd.getCollection().get(j);
    			if(pkgTp.equals("")) {
    				pkgTp = listPkg.getPkgTpCd();
    			}else {
    				pkgTp += "," + listPkg.getPkgTpCd();
    			}
    		}
    		list.setPkgTpCd(pkgTp);    		
    	}
    	
		return cmdtCd;
    }
    
    
    @Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);
		CommodityCodeItem list = (CommodityCodeItem) insertItems.getCollection().get(0);
		String pkgTpCd = list.getPkgTpCd();
		String items[] = pkgTpCd.split(",");
		DataItemList pkgTpList = new DataItemList();
		DataItemList pkgItems = new DataItemList();
		
		if(pkgTpCd != null && (!pkgTpCd.equals(""))) {
			for(int i = 0; i < items.length; i++) {
				CommodityCodeItem insItems = new CommodityCodeItem();
				insItems = (CommodityCodeItem) list.clone();
				insItems.setPkgTpCd(items[i]);
				pkgTpList.add(insItems);			
			}
		}		
		
		if(pkgTpList.size() > 0) {
			pkgItems.addDataItemList(pkgTpList);
			unifiedDao.insertItems(null,"commodityCode.insertPackageTypeCodeItem", pkgItems);
		}
		
		unifiedDao.insertItems(null,"commodityCode.insertCommodityCodeItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
    
    @Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		CommodityCodeItem list = (CommodityCodeItem) updateItems.getCollection().get(0);
		String pkgTpCd = list.getPkgTpCd();
		String items[] = pkgTpCd.split(",");
		DataItemList pkgTpList = new DataItemList();
		DataItemList pkgItems = new DataItemList();
		
		DataItemList deleteItems = new DataItemList();
		deleteItems.add(updateItems);
		unifiedDao.deleteItems(null,"commodityCode.deletePackageTypeCodeItem", deleteItems);
		
		for(int i = 0; i < items.length; i++) {
			CommodityCodeItem insItems = new CommodityCodeItem();
			insItems = (CommodityCodeItem) list.clone();
			insItems.setPkgTpCd(items[i]);
			pkgTpList.add(insItems);			
		}
		
		if(pkgTpList.size() > 0) {
			pkgItems.addDataItemList(pkgTpList);
			unifiedDao.insertItems(null,"commodityCode.insertPackageTypeCodeItem", pkgItems);
		}
		
		unifiedDao.updateItems(null,"commodityCode.updateCommodityCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"commodityCode.deletePackageTypeCodeItem", deleteItems);
		unifiedDao.deleteItemsWithTimeCheck(null,"commodityCode.deleteCommodityCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}


	@Override
	public DataItemList insertCommodityGroupItem(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"commodityCode.insertCommodityGroupItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}


	@Override
	public DataItemList selectCommodityGroupItem(SearchCommodityCodeParm parm) throws DaoException {
		return unifiedDao.getItemsPage("commodityCode.selectCommodityGroup", parm);
	}


	@Override
	public DataItemList updateCommodityGroupItem(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"commodityCode.updateCommodityGroupItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}


	@Override
	public DataItemList deleteCommodityGroupItem(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"commodityCode.deleteCommodityGroupItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
	
	@Override
	public DataItemList checkDuplicate(SearchCommodityCodeParm parm) throws DaoException{
		return unifiedDao.getItems("commodityCode.checkDuplicate", parm);
	}
}
