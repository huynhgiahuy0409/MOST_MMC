package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoMasterDao extends BaseDao implements ICargoMasterDao {

	public DataItemList selectGrGoComboList(SearchCargoMasterParm parm) throws DaoException {
        return unifiedDao.getItems("cargoMaster.selectGrGoComboList", parm);
    }
	
	public DataItemList selectGpGoComboList(SearchCargoMasterParm parm) throws DaoException {
		return unifiedDao.getItems("cargoMaster.selectGpGoComboList", parm);
	}
	
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException {
    	try{
        	return (String)unifiedDao.readOne("cargoMaster.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public String selectActualDelvTpCd(SearchCargoMasterParm parm) throws DaoException {
    	try{
            return (String)unifiedDao.readOne("cargoMaster.selectActualDelvTpCd", parm);
            
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public boolean selectIsWHFinalCheck(SearchCargoMasterParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsWHFinalCheck", parm);
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public boolean selectIsCargoMst(SearchCargoMasterParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public boolean selectIsCargoAvDvChk(SearchCargoMasterParm parm) throws DaoException {
    	try{
        	String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoAvDvChk", parm);
        	
        	if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public boolean selectIsCargoMstHOStDt(SearchCargoMasterParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoMstHOStDt", parm);
           
    		if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public boolean selectIsImportInvSumCheck(SearchCargoMasterParm parm) throws DaoException {
    	try{
        	String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsImportInvSumCheck", parm);
    		if(rtnValue != null && Integer.parseInt(rtnValue) <= 0){
                return true;
            }else{
                return false;
            }
    		
		}catch(Exception e){
			throw new DaoException(e);
		}	
    }

	public DataItemList selectCargoSearchList(SearchCargoMasterParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("cargoMaster.selectCargoSearchList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList selectCargoDoOperation(SearchCargoMasterParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("cargoMaster.selectCargoDoOperation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectShippingNoteComboList(SearchCargoMasterParm parm) throws DaoException {
		return unifiedDao.getItems("cargoMaster.selectShippingNoteComboList", parm);
	}
	
	public DataItemList selectBLComboList(SearchCargoMasterParm parm) throws DaoException {
		return unifiedDao.getItems("cargoMaster.selectBLComboList", parm);
	}
	
	public DataItemList selectWHComboList(SearchCargoMasterParm parm) throws DaoException{
		return unifiedDao.getItems("cargoMaster.selectWHComboList", parm);
	}
	
	public DataItemList selectShift(SearchCargoMasterParm parm) throws DaoException {
		return unifiedDao.getItems("cargoMaster.selectShift", parm);
    }
	
	public String getJobGroupNo(SearchCargoMasterParm parm) throws DaoException {
    	try{
        	return (String)unifiedDao.readOne("cargoMaster.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public boolean getCargoMasterCheck(SearchCargoMasterParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
}
