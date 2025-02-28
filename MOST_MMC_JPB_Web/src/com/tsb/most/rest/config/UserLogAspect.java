/**
 * 
 */
package com.tsb.most.rest.config;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
/**
 * @author simonkang
 *
 */
@Aspect
public class UserLogAspect {
	/**
	 * Aop Aspect for userLogCollection
	 */
	@Before("execution(public * com.tsb.most.rest.prototype..*Controller.select*(..))")
	public void selectLogAdvicePrototype(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.prototype..*Controller.insert*(..))")
	public void insertLogAdvicePrototype(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.prototype..*Controller.update*(..))")
	public void updateLogAdvicePrototype(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.prototype..*Controller.delete*(..))")
	public void deleteLogAdvicePrototype(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */

		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}	
	
	/**
	 * Aop Aspect for userLogCollection
	 */
	@Before("execution(public * com.tsb.most.rest.common..*Controller.select*(..))")
	public void selectLogAdvice(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.common..*Controller.insert*(..))")
	public void insertLogAdvice(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.common..*Controller.update*(..))")
	public void updateLogAdvice(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.common..*Controller.delete*(..))")
	public void deleteLogAdvice(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */

		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.rest.service..*Controller.select*(..))")
	public void selectLogAdviceService(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.service..*Controller.insert*(..))")
	public void insertLogAdviceService(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.service..*Controller.update*(..))")
	public void updateLogAdviceService(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.service..*Controller.delete*(..))")
	public void deleteLogAdviceService(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.rest.admin..*Controller.select*(..))")
	public void selectLogAdviceAdmin(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.admin..*Controller.insert*(..))")
	public void insertLogAdviceAdmin(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.admin..*Controller.update*(..))")
	public void updateLogAdviceAdmin(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.admin..*Controller.delete*(..))")
	public void deleteLogAdviceAdmin(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.rest.edi..*Controller.select*(..))")
	public void selectLogAdviceEDI(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.edi..*Controller.insert*(..))")
	public void insertLogAdviceEDI(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.edi..*Controller.update*(..))")
	public void updateLogAdviceEDI(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.edi..*Controller.delete*(..))")
	public void deleteLogAdviceEDI(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.rest.message..*Controller.select*(..))")
	public void selectLogAdviceMessage(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.message..*Controller.insert*(..))")
	public void insertLogAdviceMessage(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.message..*Controller.update*(..))")
	public void updateLogAdviceMessage(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.message..*Controller.delete*(..))")
	public void deleteLogAdviceMessage(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	
	//For Interfaces
	@Before("execution(public * com.tsb.most.rest.interfaces..*Controller.select*(..))")
	public void selectLogAdviceInterfaces(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.interfaces..*Controller.insert*(..))")
	public void insertLogAdviceInterfaces(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.interfaces..*Controller.update*(..))")
	public void updateLogAdviceInterfaces(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.interfaces..*Controller.delete*(..))")
	public void deleteLogAdviceInterfaces(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	//For Direct
	@Before("execution(public * com.tsb.most.direct.component..*.select*(..))")
	public void selectDirect(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.direct.component..*.insert*(..))")
	public void insertDirect(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.direct.component..*.update*(..))")
	public void updateDirect(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.direct.component..*.delete*(..))")
	public void deleteDirect(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.rest.authority..*Controller.select*(..))")
	public void selectLogAdviceAuthority(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.rest.authority..*Controller.insert*(..))")
	public void insertLogAdviceAuthority(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.rest.authority..*Controller.update*(..))")
	public void updateLogAdviceAuthority(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.rest.authority..*Controller.delete*(..))")
	public void deleteLogAdviceAuthority(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	@Before("execution(public * com.tsb.most.biz.rest..*Controller.select*(..))")
	public void selectLogAdvicePlanning(JoinPoint joinPoint){
		/**
		 * Catch a select pattern on J2EE Controller
		 */
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "R");
	}
	
	@Before("execution(public * com.tsb.most.biz.rest..*Controller.insert*(..))")
	public void insertLogAdvicePlanning(JoinPoint joinPoint){
		/**
		 * Catch a insert pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "C");
	}
	
	@Before("execution(public * com.tsb.most.biz.rest..*Controller.update*(..))")
	public void updateLogAdvicePlanning(JoinPoint joinPoint){
		/**
		 * Catch a pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "U");
	}
	
	@Before("execution(public * com.tsb.most.biz.rest..*Controller.delete*(..))")
	public void deleteLogAdvicePlanning(JoinPoint joinPoint){
		/**
		 * Catch a delete pattern on J2EE Controller
		 */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		UserLogCollection.process(joinPoint, request, "D");
	}
	
	
}
