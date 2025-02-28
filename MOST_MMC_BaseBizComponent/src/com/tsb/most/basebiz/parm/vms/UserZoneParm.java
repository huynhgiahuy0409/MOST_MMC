package com.tsb.most.basebiz.parm.vms;
//import com.pcs.foundation.bizparm.Parm;
import com.tsb.most.framework.bizparm.BaseBizParm;

public class UserZoneParm extends BaseBizParm {
    
	private static final long serialVersionUID = 1L;
	
	private String zoneCode;
    private String zoneDiv;
    private String zoneName;
    private String area;
    private String flag;
    private String points;
    private String check;

    private String moveTime;
    private String userGroup;
    
    
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
	public String getMoveTime() {
		return moveTime;
	}
	public void setMoveTime(String moveTime) {
		this.moveTime = moveTime;
	}
	public String getUserGroup() {
		return userGroup;
	}
	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}
    
   
  
}