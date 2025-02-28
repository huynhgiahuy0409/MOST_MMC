package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class UserZoneItem extends DataItem{
    
	private static final long serialVersionUID = -8881289680666498276L;

	//  zone auth use
    private String userId;
    
//  list use
    private String zoneCode;
    private String zoneDiv;
    private String zoneName;
    private String zoneAuto;
    private String checkAuto;
    private String moveTime;
    private String area;
    private String flag;
    private String points;
    private String check;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getZoneCode() {
		return zoneCode;
	}
	public void setZoneCode(String zoneCode) {
		this.zoneCode = zoneCode;
	}
	public String getZoneDiv() {
		return zoneDiv;
	}
	public void setZoneDiv(String zoneDiv) {
		this.zoneDiv = zoneDiv;
	}
	public String getZoneName() {
		return zoneName;
	}
	public void setZoneName(String zoneName) {
		this.zoneName = zoneName;
	}
	public String getZoneAuto() {
		return zoneAuto;
	}
	public void setZoneAuto(String zoneAuto) {
		this.zoneAuto = zoneAuto;
	}
	public String getCheckAuto() {
		return checkAuto;
	}
	public void setCheckAuto(String checkAuto) {
		this.checkAuto = checkAuto;
	}
	public String getMoveTime() {
		return moveTime;
	}
	public void setMoveTime(String moveTime) {
		this.moveTime = moveTime;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getPoints() {
		return points;
	}
	public void setPoints(String points) {
		this.points = points;
	}
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
    
    
}