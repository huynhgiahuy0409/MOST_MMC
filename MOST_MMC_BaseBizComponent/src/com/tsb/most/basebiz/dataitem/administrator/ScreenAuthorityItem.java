/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dataitem.admin.UserItem.java
* CREATE ON : 2015. 4. 14.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 4. 14.     Alex.Min             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.administrator;
import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;
/**
 * @date : 2015. 4. 14. 오전 11:18:56
 * @version :
 * @author : Alex.Min
 */
public class ScreenAuthorityItem extends DataItem {
	
	private String pgmId;
	private String refId;
	private String refName;
	private String xtype;
	private String screenType;
	private String hidden;
	private String disabled;
	private String readOnly;
	private String useYn;
	private String GrpCode;
	private String authGrp;
	private String screenUserId;
	
	private ArrayList<ScreenAuthorityItem> itemList;
	
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getRefId() {
		return refId;
	}
	public void setRefId(String refId) {
		this.refId = refId;
	}
	public String getRefName() {
		return refName;
	}
	public void setRefName(String refName) {
		this.refName = refName;
	}
	public String getXtype() {
		return xtype;
	}
	public void setXtype(String xtype) {
		this.xtype = xtype;
	}
	public String getScreenType() {
		return screenType;
	}
	public void setScreenType(String screenType) {
		this.screenType = screenType;
	}
	public String getHidden() {
		return hidden;
	}
	public void setHidden(String hidden) {
		this.hidden = hidden;
	}
	public String getDisabled() {
		return disabled;
	}
	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}
	public String getReadOnly() {
		return readOnly;
	}
	public void setReadOnly(String readOnly) {
		this.readOnly = readOnly;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getGrpCode() {
		return GrpCode;
	}
	public void setGrpCode(String grpCode) {
		GrpCode = grpCode;
	}
	public String getAuthGrp() {
		return authGrp;
	}
	public void setAuthGrp(String authGrp) {
		this.authGrp = authGrp;
	}
	public String getScreenUserId() {
		return screenUserId;
	}
	public void setScreenUserId(String screenUserId) {
		this.screenUserId = screenUserId;
	}
	public ArrayList<ScreenAuthorityItem> getItemList() {
		return itemList;
	}
	public void setItemList(ArrayList<ScreenAuthorityItem> itemList) {
		this.itemList = itemList;
	}

}
