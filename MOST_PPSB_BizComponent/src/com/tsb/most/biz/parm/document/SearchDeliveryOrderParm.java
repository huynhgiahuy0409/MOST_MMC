/**
* DeliveryOrderParm.java
*
* Created on   : Aug 21, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Aug 21, 2007   Mr Dong-Yeob Lee 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author USER
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchDeliveryOrderParm extends BaseBizParm {

    
    /**
     * 
     */
    public SearchDeliveryOrderParm() {
        super();
        // TODO Auto-generated constructor stub
    }

    private String docid;
    private String jobno;
    private String mfdocid;
    private String mfjobno;
    private String vslcd;
    private String callseq;
    private String callyear;
    private String cginouttp;
    private String blno;
    private String hblno;
    private String cnsneodr1;
    private String cnsneodr2;
    private String totcntrcnt;
    private String pkgqty;
    private String pkgtpcd;
    private String pkgmark;
    private String wgt;
    private String wgtunit;
    private String vol;
    private String volunit;
    private String pductcd;
    private String gdsrmk;
    private String custgdsrmk;
    private String rmk;
    private String cgtpcd;
    private String pol;
    private String pod;
    private String fnlportcd;
    private String blclasscd;
    private String cgclasscd;
    private String imdgclass;
    private String tfzunno;
    private String tmtunno;
    private String cnntvslcd;
    private String insuserid;
    private String insdtm;
    private String upduserid;
    private String upddtm;
    private String hscddiv;
    private String hscd;
    private String pkgtpnm;
    private String polnm;
    private String podnm;
    private String fnlportnm;
    private String vslCallId;
    private String tsptr;
    private String delvtpcd;
    private String dono;
    private String ackby;
    private String ackdt;
    private String issuedt;
    private String imdg;
    private String nilmarks;
    private String cmdtcd;
    private String domark;
    private String searchType;
    private String rolecd;
    private String ptnrcd;
    private String fwrd;
    
    private String etaFrom;
    private String etaTo;
    private String authUsrId;
    private String authority;
    private String ptnrType;
    private String pageId;
    
  
    
    //added by William (2015/07/21 - HHT) Mantis issue 49799
    private String lorryNo;
    private String arrvDtFm;
    private String arrvDtTo;
    private String driverId;
    
    private String startRow;
    private String endRow;
    
    private String userType;
    
    private String mode;
    
    private String rptNo;
    
    private String sdono;
    
    public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getUserType() {
        return userType;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }
    public String getPageId() {
        return pageId;
    }
    public void setPageId(String pageId) {
        this.pageId = pageId;
    }
    /**
     * @return Returns the ackby.
     */
    public String getAckby() {
        return ackby;
    }
    /**
     * @param ackby The ackby to set.
     */
    public void setAckby(String ackby) {
        this.ackby = ackby;
    }
    /**
     * @return Returns the ackdt.
     */
    public String getAckdt() {
        return ackdt;
    }
    /**
     * @param ackdt The ackdt to set.
     */
    public void setAckdt(String ackdt) {
        this.ackdt = ackdt;
    }
    /**
     * @return Returns the authority.
     */
    public String getAuthority() {
        return authority;
    }
    /**
     * @param authority The authority to set.
     */
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    /**
     * @return Returns the authUsrId.
     */
    public String getAuthUsrId() {
        return authUsrId;
    }
    /**
     * @param authUsrId The authUsrId to set.
     */
    public void setAuthUsrId(String authUsrId) {
        this.authUsrId = authUsrId;
    }
    /**
     * @return Returns the blclasscd.
     */
    public String getBlclasscd() {
        return blclasscd;
    }
    /**
     * @param blclasscd The blclasscd to set.
     */
    public void setBlclasscd(String blclasscd) {
        this.blclasscd = blclasscd;
    }
    /**
     * @return Returns the blno.
     */
    public String getBlno() {
        return blno;
    }
    /**
     * @param blno The blno to set.
     */
    public void setBlno(String blno) {
        this.blno = blno;
    }
    /**
     * @return Returns the callseq.
     */
    public String getCallseq() {
        return callseq;
    }
    /**
     * @param callseq The callseq to set.
     */
    public void setCallseq(String callseq) {
        this.callseq = callseq;
    }
    /**
     * @return Returns the callyear.
     */
    public String getCallyear() {
        return callyear;
    }
    /**
     * @param callyear The callyear to set.
     */
    public void setCallyear(String callyear) {
        this.callyear = callyear;
    }
    /**
     * @return Returns the cgclasscd.
     */
    public String getCgclasscd() {
        return cgclasscd;
    }
    /**
     * @param cgclasscd The cgclasscd to set.
     */
    public void setCgclasscd(String cgclasscd) {
        this.cgclasscd = cgclasscd;
    }
    /**
     * @return Returns the cginouttp.
     */
    public String getCginouttp() {
        return cginouttp;
    }
    /**
     * @param cginouttp The cginouttp to set.
     */
    public void setCginouttp(String cginouttp) {
        this.cginouttp = cginouttp;
    }
    /**
     * @return Returns the cgtpcd.
     */
    public String getCgtpcd() {
        return cgtpcd;
    }
    /**
     * @param cgtpcd The cgtpcd to set.
     */
    public void setCgtpcd(String cgtpcd) {
        this.cgtpcd = cgtpcd;
    }
    /**
     * @return Returns the cmdtcd.
     */
    public String getCmdtcd() {
        return cmdtcd;
    }
    /**
     * @param cmdtcd The cmdtcd to set.
     */
    public void setCmdtcd(String cmdtcd) {
        this.cmdtcd = cmdtcd;
    }
    /**
     * @return Returns the cnntvslcd.
     */
    public String getCnntvslcd() {
        return cnntvslcd;
    }
    /**
     * @param cnntvslcd The cnntvslcd to set.
     */
    public void setCnntvslcd(String cnntvslcd) {
        this.cnntvslcd = cnntvslcd;
    }
    /**
     * @return Returns the cnsneodr1.
     */
    public String getCnsneodr1() {
        return cnsneodr1;
    }
    /**
     * @param cnsneodr1 The cnsneodr1 to set.
     */
    public void setCnsneodr1(String cnsneodr1) {
        this.cnsneodr1 = cnsneodr1;
    }
    /**
     * @return Returns the cnsneodr2.
     */
    public String getCnsneodr2() {
        return cnsneodr2;
    }
    /**
     * @param cnsneodr2 The cnsneodr2 to set.
     */
    public void setCnsneodr2(String cnsneodr2) {
        this.cnsneodr2 = cnsneodr2;
    }
    /**
     * @return Returns the custgdsrmk.
     */
    public String getCustgdsrmk() {
        return custgdsrmk;
    }
    /**
     * @param custgdsrmk The custgdsrmk to set.
     */
    public void setCustgdsrmk(String custgdsrmk) {
        this.custgdsrmk = custgdsrmk;
    }
    /**
     * @return Returns the delvtpcd.
     */
    public String getDelvtpcd() {
        return delvtpcd;
    }
    /**
     * @param delvtpcd The delvtpcd to set.
     */
    public void setDelvtpcd(String delvtpcd) {
        this.delvtpcd = delvtpcd;
    }
    /**
     * @return Returns the docid.
     */
    public String getDocid() {
        return docid;
    }
    /**
     * @param docid The docid to set.
     */
    public void setDocid(String docid) {
        this.docid = docid;
    }
    /**
     * @return Returns the domark.
     */
    public String getDomark() {
        return domark;
    }
    /**
     * @param domark The domark to set.
     */
    public void setDomark(String domark) {
        this.domark = domark;
    }
    /**
     * @return Returns the dono.
     */
    public String getDono() {
        return dono;
    }
    /**
     * @param dono The dono to set.
     */
    public void setDono(String dono) {
        this.dono = dono;
    }
    /**
     * @return Returns the etaFrom.
     */
    public String getEtaFrom() {
        return etaFrom;
    }
    /**
     * @param etaFrom The etaFrom to set.
     */
    public void setEtaFrom(String etaFrom) {
        this.etaFrom = etaFrom;
    }
    /**
     * @return Returns the etaTo.
     */
    public String getEtaTo() {
        return etaTo;
    }
    /**
     * @param etaTo The etaTo to set.
     */
    public void setEtaTo(String etaTo) {
        this.etaTo = etaTo;
    }
    /**
     * @return Returns the fnlportcd.
     */
    public String getFnlportcd() {
        return fnlportcd;
    }
    /**
     * @param fnlportcd The fnlportcd to set.
     */
    public void setFnlportcd(String fnlportcd) {
        this.fnlportcd = fnlportcd;
    }
    /**
     * @return Returns the fnlportnm.
     */
    public String getFnlportnm() {
        return fnlportnm;
    }
    /**
     * @param fnlportnm The fnlportnm to set.
     */
    public void setFnlportnm(String fnlportnm) {
        this.fnlportnm = fnlportnm;
    }
    /**
     * @return Returns the fwrd.
     */
    public String getFwrd() {
        return fwrd;
    }
    /**
     * @param fwrd The fwrd to set.
     */
    public void setFwrd(String fwrd) {
        this.fwrd = fwrd;
    }
    /**
     * @return Returns the gdsrmk.
     */
    public String getGdsrmk() {
        return gdsrmk;
    }
    /**
     * @param gdsrmk The gdsrmk to set.
     */
    public void setGdsrmk(String gdsrmk) {
        this.gdsrmk = gdsrmk;
    }
    /**
     * @return Returns the hblno.
     */
    public String getHblno() {
        return hblno;
    }
    /**
     * @param hblno The hblno to set.
     */
    public void setHblno(String hblno) {
        this.hblno = hblno;
    }
    /**
     * @return Returns the hscd.
     */
    public String getHscd() {
        return hscd;
    }
    /**
     * @param hscd The hscd to set.
     */
    public void setHscd(String hscd) {
        this.hscd = hscd;
    }
    /**
     * @return Returns the hscddiv.
     */
    public String getHscddiv() {
        return hscddiv;
    }
    /**
     * @param hscddiv The hscddiv to set.
     */
    public void setHscddiv(String hscddiv) {
        this.hscddiv = hscddiv;
    }
    /**
     * @return Returns the imdg.
     */
    public String getImdg() {
        return imdg;
    }
    /**
     * @param imdg The imdg to set.
     */
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    /**
     * @return Returns the imdgclass.
     */
    public String getImdgclass() {
        return imdgclass;
    }
    /**
     * @param imdgclass The imdgclass to set.
     */
    public void setImdgclass(String imdgclass) {
        this.imdgclass = imdgclass;
    }
    /**
     * @return Returns the insdtm.
     */
    public String getInsdtm() {
        return insdtm;
    }
    /**
     * @param insdtm The insdtm to set.
     */
    public void setInsdtm(String insdtm) {
        this.insdtm = insdtm;
    }
    /**
     * @return Returns the insuserid.
     */
    public String getInsuserid() {
        return insuserid;
    }
    /**
     * @param insuserid The insuserid to set.
     */
    public void setInsuserid(String insuserid) {
        this.insuserid = insuserid;
    }
    /**
     * @return Returns the issuedt.
     */
    public String getIssuedt() {
        return issuedt;
    }
    /**
     * @param issuedt The issuedt to set.
     */
    public void setIssuedt(String issuedt) {
        this.issuedt = issuedt;
    }
    /**
     * @return Returns the jobno.
     */
    public String getJobno() {
        return jobno;
    }
    /**
     * @param jobno The jobno to set.
     */
    public void setJobno(String jobno) {
        this.jobno = jobno;
    }
    /**
     * @return Returns the mfdocid.
     */
    public String getMfdocid() {
        return mfdocid;
    }
    /**
     * @param mfdocid The mfdocid to set.
     */
    public void setMfdocid(String mfdocid) {
        this.mfdocid = mfdocid;
    }
    /**
     * @return Returns the mfjobno.
     */
    public String getMfjobno() {
        return mfjobno;
    }
    /**
     * @param mfjobno The mfjobno to set.
     */
    public void setMfjobno(String mfjobno) {
        this.mfjobno = mfjobno;
    }
    /**
     * @return Returns the nilmarks.
     */
    public String getNilmarks() {
        return nilmarks;
    }
    /**
     * @param nilmarks The nilmarks to set.
     */
    public void setNilmarks(String nilmarks) {
        this.nilmarks = nilmarks;
    }
    /**
     * @return Returns the pductcd.
     */
    public String getPductcd() {
        return pductcd;
    }
    /**
     * @param pductcd The pductcd to set.
     */
    public void setPductcd(String pductcd) {
        this.pductcd = pductcd;
    }
    /**
     * @return Returns the pkgmark.
     */
    public String getPkgmark() {
        return pkgmark;
    }
    /**
     * @param pkgmark The pkgmark to set.
     */
    public void setPkgmark(String pkgmark) {
        this.pkgmark = pkgmark;
    }
    /**
     * @return Returns the pkgqty.
     */
    public String getPkgqty() {
        return pkgqty;
    }
    /**
     * @param pkgqty The pkgqty to set.
     */
    public void setPkgqty(String pkgqty) {
        this.pkgqty = pkgqty;
    }
    /**
     * @return Returns the pkgtpcd.
     */
    public String getPkgtpcd() {
        return pkgtpcd;
    }
    /**
     * @param pkgtpcd The pkgtpcd to set.
     */
    public void setPkgtpcd(String pkgtpcd) {
        this.pkgtpcd = pkgtpcd;
    }
    /**
     * @return Returns the pkgtpnm.
     */
    public String getPkgtpnm() {
        return pkgtpnm;
    }
    /**
     * @param pkgtpnm The pkgtpnm to set.
     */
    public void setPkgtpnm(String pkgtpnm) {
        this.pkgtpnm = pkgtpnm;
    }
    /**
     * @return Returns the pod.
     */
    public String getPod() {
        return pod;
    }
    /**
     * @param pod The pod to set.
     */
    public void setPod(String pod) {
        this.pod = pod;
    }
    /**
     * @return Returns the podnm.
     */
    public String getPodnm() {
        return podnm;
    }
    /**
     * @param podnm The podnm to set.
     */
    public void setPodnm(String podnm) {
        this.podnm = podnm;
    }
    /**
     * @return Returns the pol.
     */
    public String getPol() {
        return pol;
    }
    /**
     * @param pol The pol to set.
     */
    public void setPol(String pol) {
        this.pol = pol;
    }
    /**
     * @return Returns the polnm.
     */
    public String getPolnm() {
        return polnm;
    }
    /**
     * @param polnm The polnm to set.
     */
    public void setPolnm(String polnm) {
        this.polnm = polnm;
    }
    /**
     * @return Returns the ptnrcd.
     */
    public String getPtnrcd() {
        return ptnrcd;
    }
    /**
     * @param ptnrcd The ptnrcd to set.
     */
    public void setPtnrcd(String ptnrcd) {
        this.ptnrcd = ptnrcd;
    }
    /**
     * @return Returns the ptnrType.
     */
    public String getPtnrType() {
        return ptnrType;
    }
    /**
     * @param ptnrType The ptnrType to set.
     */
    public void setPtnrType(String ptnrType) {
        this.ptnrType = ptnrType;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the rolecd.
     */
    public String getRolecd() {
        return rolecd;
    }
    /**
     * @param rolecd The rolecd to set.
     */
    public void setRolecd(String rolecd) {
        this.rolecd = rolecd;
    }
    /**
     * @return Returns the searchType.
     */
    public String getSearchType() {
        return searchType;
    }
    /**
     * @param searchType The searchType to set.
     */
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the tfzunno.
     */
    public String getTfzunno() {
        return tfzunno;
    }
    /**
     * @param tfzunno The tfzunno to set.
     */
    public void setTfzunno(String tfzunno) {
        this.tfzunno = tfzunno;
    }
    /**
     * @return Returns the tmtunno.
     */
    public String getTmtunno() {
        return tmtunno;
    }
    /**
     * @param tmtunno The tmtunno to set.
     */
    public void setTmtunno(String tmtunno) {
        this.tmtunno = tmtunno;
    }
    /**
     * @return Returns the totcntrcnt.
     */
    public String getTotcntrcnt() {
        return totcntrcnt;
    }
    /**
     * @param totcntrcnt The totcntrcnt to set.
     */
    public void setTotcntrcnt(String totcntrcnt) {
        this.totcntrcnt = totcntrcnt;
    }
    /**
     * @return Returns the tsptr.
     */
    public String getTsptr() {
        return tsptr;
    }
    /**
     * @param tsptr The tsptr to set.
     */
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    /**
     * @return Returns the upddtm.
     */
    public String getUpddtm() {
        return upddtm;
    }
    /**
     * @param upddtm The upddtm to set.
     */
    public void setUpddtm(String upddtm) {
        this.upddtm = upddtm;
    }
    /**
     * @return Returns the upduserid.
     */
    public String getUpduserid() {
        return upduserid;
    }
    /**
     * @param upduserid The upduserid to set.
     */
    public void setUpduserid(String upduserid) {
        this.upduserid = upduserid;
    }
    /**
     * @return Returns the vol.
     */
    public String getVol() {
        return vol;
    }
    /**
     * @param vol The vol to set.
     */
    public void setVol(String vol) {
        this.vol = vol;
    }
    /**
     * @return Returns the volunit.
     */
    public String getVolunit() {
        return volunit;
    }
    /**
     * @param volunit The volunit to set.
     */
    public void setVolunit(String volunit) {
        this.volunit = volunit;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the vslcd.
     */
    public String getVslcd() {
        return vslcd;
    }
    /**
     * @param vslcd The vslcd to set.
     */
    public void setVslcd(String vslcd) {
        this.vslcd = vslcd;
    }
    /**
     * @return Returns the wgt.
     */
    public String getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(String wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the wgtunit.
     */
    public String getWgtunit() {
        return wgtunit;
    }
    /**
     * @param wgtunit The wgtunit to set.
     */
    public void setWgtunit(String wgtunit) {
        this.wgtunit = wgtunit;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
    }
    public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    public String getEndRow() {
        return endRow;
    }
    public void setEndRow(String endRow) {
        this.endRow = endRow;
    }
    public String getStartRow() {
        return startRow;
    }
    public void setStartRow(String startRow) {
        this.startRow = startRow;
    }
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	public String getSdono() {
		return sdono;
	}
	public void setSdono(String sdono) {
		this.sdono = sdono;
	}
}
