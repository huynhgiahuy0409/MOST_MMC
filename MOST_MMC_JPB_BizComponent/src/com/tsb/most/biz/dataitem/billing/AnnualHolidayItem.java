/**
* AnnualHolidayItem.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class AnnualHolidayItem extends DataItem {
    private String strHlDayYmd ;
    private String strHlMonthYmd;
    private String strOldHlDayYmd ;
    private String strHlDayCd ;
    private String strFormatHlDayYmd;
    private String strDescr ;
    private String strVersion;
    private String no ;
    private String itChk ;
    
    private int strHlDay;
    private	int strHlMonth;
    
    private Date updateTimeField ;
    private String workingStatus;
    ArrayList<AnnualHolidayItem> items;
        
   
	public String getStrDescr() {
        return strDescr;
    }
    public void setStrDescr(String strDescr) {
        this.strDescr = strDescr;
    }
    public String getStrHlDayCd() {
        return strHlDayCd;
    }
    public void setStrHlDayCd(String strHlDayCd) {
        this.strHlDayCd = strHlDayCd;
    }
    public String getStrHlDayYmd() {
        return strHlDayYmd;
    }
    public void setStrHlDayYmd(String strHlDayYmd) {
        this.strHlDayYmd = strHlDayYmd;
    }
    public String getStrVersion() {
        return strVersion;
    }
    public void setStrVersion(String strVersion) {
        this.strVersion = strVersion;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getStrFormatHlDayYmd() {
        return strFormatHlDayYmd;
    }
    public void setStrFormatHlDayYmd(String strFormatHlDayYmd) {
        this.strFormatHlDayYmd = strFormatHlDayYmd;
    }
    public String getItChk() {
        return itChk;
    }
    public void setItChk(String itChk) {
        this.itChk = itChk;
    }
    public String getStrOldHlDayYmd() {
        return strOldHlDayYmd;
    }
    public void setStrOldHlDayYmd(String strOldHlDayYmd) {
        this.strOldHlDayYmd = strOldHlDayYmd;
    }
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<AnnualHolidayItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<AnnualHolidayItem> items) {
		this.items = items;
	}
	public Date getUpdateTimeField() {
		return updateTimeField;
	}
	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}
	
	
	public String getStrHlMonthYmd() {
		return strHlMonthYmd;
	}
	public void setStrHlMonthYmd(String strHlMonthYmd) {
		this.strHlMonthYmd = strHlMonthYmd;
	}
	public int getStrHlDay() {
		return strHlDay;
	}
	public void setStrHlDay(int strHlDay) {
		this.strHlDay = strHlDay;
	}
	public int getStrHlMonth() {
		return strHlMonth;
	}
	public void setStrHlMonth(int strHlMonth) {
		this.strHlMonth = strHlMonth;
	}
}
