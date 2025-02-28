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
package com.tsb.most.basebiz.dataitem.vms;
import java.util.Date;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class VesselScheduleItem extends DataItem {
	
	private String vesselCode;
	private String vesselName;
	private String route;
	private String status;
	private String voyageNo;
	private String latitude;
	private String longitude;
	private String heading;
	private String speed;
	private String portCode;
	private String portName;
	
	private int sequence;
	
	private int dischargeQuantity;
	private int loadQuantity;
	
	private Date eta;
	private Date etb;
	private Date etu;
	private Date etd;
	private Date ata;
	private Date atb;
	private Date atu;
	private Date atd;
	
	public String getVesselCode() {
		return vesselCode;
	}
	public void setVesselCode(String vesselCode) {
		this.vesselCode = vesselCode;
	}
	public String getVesselName() {
		return vesselName;
	}
	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getVoyageNo() {
		return voyageNo;
	}
	public void setVoyageNo(String voyageNo) {
		this.voyageNo = voyageNo;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	public String getSpeed() {
		return speed;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public int getDischargeQuantity() {
		return dischargeQuantity;
	}
	public void setDischargeQuantity(int dischargeQuantity) {
		this.dischargeQuantity = dischargeQuantity;
	}
	public int getLoadQuantity() {
		return loadQuantity;
	}
	public void setLoadQuantity(int loadQuantity) {
		this.loadQuantity = loadQuantity;
	}
	public Date getEta() {
		return eta;
	}
	public void setEta(Date eta) {
		this.eta = eta;
	}
	public Date getEtb() {
		return etb;
	}
	public void setEtb(Date etb) {
		this.etb = etb;
	}
	public Date getEtu() {
		return etu;
	}
	public void setEtu(Date etu) {
		this.etu = etu;
	}
	public Date getEtd() {
		return etd;
	}
	public void setEtd(Date etd) {
		this.etd = etd;
	}
	public Date getAta() {
		return ata;
	}
	public void setAta(Date ata) {
		this.ata = ata;
	}
	public Date getAtb() {
		return atb;
	}
	public void setAtb(Date atb) {
		this.atb = atb;
	}
	public Date getAtu() {
		return atu;
	}
	public void setAtu(Date atu) {
		this.atu = atu;
	}
	public Date getAtd() {
		return atd;
	}
	public void setAtd(Date atd) {
		this.atd = atd;
	}
	public String getPortCode() {
		return portCode;
	}
	public void setPortCode(String portCode) {
		this.portCode = portCode;
	}
	public String getPortName() {
		return portName;
	}
	public void setPortName(String portName) {
		this.portName = portName;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

}
