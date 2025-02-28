package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ROROMasterDao extends BaseDao implements IROROMasterDao {
	
	public boolean selectIsExistedROROMst(SearchROROMasterParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("roroMaster.selectIsExistedROROMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertROROMasterItems(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
			DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"roroMaster.insertROROMasterItems", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateYardPlanOfRoRo(UpdateItemsBizParm insertMstParm) throws DaoException {
		try{
    		DataItemList itemList = insertMstParm.getUpdateItems();
    		
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"roroYardPlan.updateYardPlanOfRoRo", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException {
		try{
        	return (String)unifiedDao.readOne("cargoMaster.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
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
	
}
