var a = {
    "status": "-1", "tips": `com.joinforwin.framework.exception.JdfException: FW00000~hahaha
	at com.joinforwin.framework.exception.JdfException.newForMessage(JdfException.java:148)
	at com.joinforwin.service.ReportGroupService.saveGroup(ReportGroupService.java:61)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:597)
	at com.joinforwin.jsdf.service.JfwBaseService.invokeMethodByMethodName(JfwBaseService.java:69)
	at com.joinforwin.jsdf.service.JfwBaseService.service(JfwBaseService.java:40)
	at com.joinforwin.jsdf.controller.BaseServiceController.doService(BaseServiceController.java:146)
	at com.joinforwin.jsdf.controller.BaseServiceController.realService(BaseServiceController.java:97)
	at com.joinforwin.jsdf.controller.BaseServiceController.service(BaseServiceController.java:65)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:597)
	at org.springframework.web.bind.annotation.support.HandlerMethodInvoker.invokeHandlerMethod(HandlerMethodInvoker.java:176)
	at org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.invokeHandlerMethod(AnnotationMethodHandlerAdapter.java:436)
	at org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(AnnotationMethodHandlerAdapter.java:424)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:790)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:719)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:669)
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:585)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:650)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:731)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:303)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:220)
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:122)
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:505)
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:170)
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:103)
	at org.apache.catalina.valves.AccessLogValve.invoke(AccessLogValve.java:956)
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:116)
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:423)
	at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1079)
	at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:625)
	at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:316)
	at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:895)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:918)
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
	at java.lang.Thread.run(Thread.java:695)
Caused by: java.lang.NullPointerException
	at com.joinforwin.service.ReportGroupService.saveGroup(ReportGroupService.java:59)
	... 39 more
`, "result": null
}


const parseExceptionTips = function (e) {
    const result = {}
    result.detail = e.tips
    const excptionArr = result.detail.split('\n')
    let jfwMsgArr = excptionArr[0].split(':')[1].split('~')
    result.code = jfwMsgArr[0]
    result.message = jfwMsgArr[1]
    const causedArr = excptionArr.filter(str => str.indexOf('Caused by:') > -1)
    if (causedArr.length > 0) {
        result.cause = causedArr[0].split(':')[1]
    }
    return result
}

console.log(parseExceptionTips(a))