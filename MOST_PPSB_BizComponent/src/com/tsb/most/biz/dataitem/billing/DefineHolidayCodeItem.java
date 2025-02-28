/**
* DefineHolidayCodeItem.java
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


import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class DefineHolidayCodeItem extends DataItem {
	
    private int strHlDayYmd;
    private int strHlMonthYmd;
    private String strHlDayCd;
    private String strDescr;
    private String strVersion;
    private String no;
    private String strFormatHlDayYmd;
    private Date updateTimeField ;
    
	public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
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
    public int getStrHlDayYmd() {
        return strHlDayYmd;
    }
    public void setStrHlDayYmd(int strHlDayYmd) {
        this.strHlDayYmd = strHlDayYmd;
    }
    public String getStrVersion() {
        return strVersion;
    }
    public void setStrVersion(String strVersion) {
        this.strVersion = strVersion;
    }

    public int getStrHlMonthYmd() {
        return strHlMonthYmd;
    }
    public void setStrHlMonthYmd(int strHlMonthYmd) {
        this.strHlMonthYmd = strHlMonthYmd;
    }
    public String getStrFormatHlDayYmd() {
        return strFormatHlDayYmd;
    }
    public void setStrFormatHlDayYmd(String strFormatHlDayYmd) {
        this.strFormatHlDayYmd = strFormatHlDayYmd;
    }
	public Date getUpdateTimeField() {
		return updateTimeField;
	}
	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}
}
