package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoGatePassParm;
import com.tsb.most.biz.parm.operation.SearchCargoGeneralParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoManualCtlDao extends BaseDao implements ICargoManualCtlDao {

	/******GENERAL TAB***************************/
	public DataItemList selectCargoGeneralList(SearchCargoGeneralParm parm) throws DaoException {
        return unifiedDao.getItems("cargoManualCtl.selectCargoGeneralList", parm);
    }
	
	public DataItemList selectCargoGeneralTotal(SearchCargoGeneralParm parm) throws DaoException {
        return unifiedDao.getItems("cargoManualCtl.selectCargoGeneralTotal", parm);
    }
	
	public DataItemList selectCargoGeneralRemain(SearchCargoGeneralParm parm) throws DaoException {
        return unifiedDao.getItems("cargoManualCtl.selectCargoGeneralRemain", parm);
    }
	
	/******GENERAL TAB (END)***************************/
	
	/******EXPORT TAB***************************/
	public DataItemList selectCargoExportList(SearchCargoExportParm parm) throws DaoException {
        return unifiedDao.getItemsPage("cargoManualCtlExport.selectCargoExportList", parm);
    }
	
	public DataItemList updatingYardTruckIndirectLoading(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"cargoManualCtlExport.updatingYardTruckIndirectLoading", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	/******EXPORT TAB (END)***************************/
	
	/******IMPORT TAB***************************/
	public DataItemList selectCargoImportList(SearchCargoImportParm parm) throws DaoException {
        return unifiedDao.getItemsPage("cargoManualCtlImport.selectCargoImportList", parm);
    }
	
	public DataItemList updatingYardTruckWHCheckImport(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"cargoManualCtlImport.updatingYardTruckWHCheckImport", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	/******IMPORT TAB (END)***************************/
	
	/******GATEPASS TAB***************************/
	public DataItemList selectCargoGatePassList(SearchCargoGatePassParm parm) throws DaoException {
        return unifiedDao.getItemsPage("cargoManualCtlGatePass.selectCargoGatePassList", parm);
    }
	
	public DataItemList selectBLComboList(SearchCargoGatePassParm parm) throws DaoException {
		return unifiedDao.getItemsPage("cargoManualCtlGatePass.selectBLComboList", parm);
	}
	/******GATEPASS TAB (END)***************************/
	
	/******TABLET START********************************/
	public DataItemList selectQrInformation(SearchTruckAssignmentParm parm) throws DaoException {
        return unifiedDao.getItems("cargoManualCtl.selectQrInformation", parm);
    }

	
	
	/******TABLET END********************************/
	

	/******RORO***************************/
	@Override
	public DataItemList selectCargoExportForROROList(SearchCargoExportParm parm) throws DaoException {
		return unifiedDao.getItemsPage("cargoManualCtlExport.selectCargoExportForROROList", parm);
	}

	@Override
	public DataItemList selectCargoImporForROROtList(SearchCargoImportParm parm) throws DaoException {
		return unifiedDao.getItemsPage("cargoManualCtlImport.selectCargoImporForROROtList", parm);
	}
}
