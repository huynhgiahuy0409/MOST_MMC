/**
* VesselScheduleItem.java
*
* Created on   : 2007-07-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-03   Mr Luis Lee	1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;

import java.util.ArrayList;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author kimyangmin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchExcelFileUploadParm extends BaseBizParm{     
    private String pgmId;			//Program Id
    private String catgCd;			//Category Code          
    private String fileName;		//File Name
    private String fileSize;		//File Size
    private String ufileName;		//Upload File Name
    private String workingStatus;	// 'C', 'R', 'U', 'D' Flag
    private String fileStream;		//Temp
    private String content;
    private ArrayList<SearchExcelFileUploadParm> items;
    
    /**
     * @return Returns the ufileName.
     */
    public String getUfileName() {
        return ufileName;
    }
    /**
     * @param ufileName The ufileName to set.
     */
    public void setUfileName(String ufileName) {
        this.ufileName = ufileName;
    }
    /**
     * @return Returns the catgCd.
     */
    public String getCatgCd() {
        return catgCd;
    }
    /**
     * @param catgCd The catgCd to set.
     */
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    /**
     * @return Returns the fileName.
     */
    public String getFileName() {
        return fileName;
    }
    /**
     * @param fileName The fileName to set.
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    /**
     * @return Returns the fileSize.
     */
    public String getFileSize() {
        return fileSize;
    }
    /**
     * @param fileSize The fileSize to set.
     */
    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }
    /**
     * @return Returns the pgmId.
     */
    public String getPgmId() {
        return pgmId;
    }
    /**
     * @param pgmId The pgmId to set.
     */
    public void setPgmId(String pgmId) {
        this.pgmId = pgmId;
    }
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getFileStream() {
		return fileStream;
	}
	public void setFileStream(String fileStream) {
		this.fileStream = fileStream;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public ArrayList<SearchExcelFileUploadParm> getItems() {
		return items;
	}
	public void setItems(ArrayList<SearchExcelFileUploadParm> items) {
		this.items = items;
	}
}
