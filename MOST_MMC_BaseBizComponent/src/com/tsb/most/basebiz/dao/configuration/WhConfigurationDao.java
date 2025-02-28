package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WhConfigurationDao extends BaseDao implements IWhConfigurationDao {

    public DataItemList selectHOInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectHOInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDmgInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectDmgInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectSprInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectSprInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getDmgInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectDmgInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getSprInvLocs(SearchWhConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whConfiguration.selectSprInvLocs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
	public DataItemList getWhConfigurationList(SearchWhConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("whConfiguration.selectWhConfiguration", parm);
    }
}
