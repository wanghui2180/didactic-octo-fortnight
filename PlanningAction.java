
package com.uliaow.admin.cms.action;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.uliaow.admin.base.action.WebBizAction;
import com.uliaow.base.constant.CommonConstant;
import com.uliaow.base.constant.CommonConstant.SEARTCH_PRIFIX;
import com.uliaow.base.exception.GlobalBizException;
import com.uliaow.cms.manager.TrendTopicManager;
import com.uliaow.cms.vo.ArticleVo;
import com.uliaow.cms.vo.ListTrendSubTopic;
import com.uliaow.cms.vo.TrendSubTopicVo;
import com.uliaow.cms.vo.TrendTopicSearchCriteral;
import com.uliaow.cms.vo.TrendTopicVo;
import com.uliaow.commons.dao.RemotePage;

/**
  * <p>Title: </p>
  * <p>Description: </p>
  * <p>Company: </p> 
  * @author wanghui 
  * @date 2016年6月12日
  */
@Controller
@RequestMapping("/cms/planning")
public class PlanningAction extends WebBizAction{
	private SimpleDateFormat dateFormat;
	private SimpleDateFormat simpleDateFormat;
	
	public SimpleDateFormat getSimpleDateFormat() {
		if(null==simpleDateFormat){
			simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
		}
		return simpleDateFormat;
	}
	public SimpleDateFormat getDateFormat() {
		if(null==dateFormat){
			dateFormat=new SimpleDateFormat("MM/dd/yyyy");
		}
		return dateFormat;
	}
	
	@Autowired
	private TrendTopicManager trendTopicManager;
	
	
	@Value("${file.upload.url}")
	private String imgHeadPath;
	
	@Value("${artical.file.upload.url}")
	private String articleImageBaseUrl ;
	@Value("${site.head.path}")
	private String siteHeadPath;
	
	/**
	 * 跳转到趋势添加页面
	 * @param model
	 * @return
	 */
	@RequestMapping("/add")
	public String add(Model model){
		model.addAttribute("imgHeadPath", imgHeadPath);
		model.addAttribute("ImageBaseUrl", articleImageBaseUrl);
		model.addAttribute("siteHeadPath", siteHeadPath);
		return "planning/planningAdd";
	}
	
	/**
	 * 保存新添加的趋势及其趋势
	 * @param request
	 * @param TrendSubTopicVo
	 * @param topicVo
	 * @return
	 */
	@RequestMapping("/save")
	@ResponseBody
	public String save(HttpServletRequest request,ListTrendSubTopic TrendSubTopicVo ,TrendTopicVo topicVo){
		Integer creatorId = resoveUserId(request);
		if(null!=creatorId){
			topicVo.setCreatorId(creatorId);
		}
	
		topicVo.setCoverPic(getRealPath(topicVo.getCoverPic()));
	int id =trendTopicManager.insertTrendTopic(topicVo);
	List<TrendSubTopicVo> vos = TrendSubTopicVo.getTrendSubTopicVo();
	
	if(vos.size()!=0){
		for (int i = 0; i < vos.size(); i++) {
			vos.get(i).setParentId(id);	
			vos.get(i).setStatus((byte)1);
			String coverPics = vos.get(i).getCoverPics();//保存真实图片路径开始
			String[] split =coverPics.split(",");
			StringBuffer buffer =new StringBuffer();
			for (String string : split) {	
				 buffer.append(getRealPath(string));
				 buffer.append(",");
			}
			String string = buffer.toString();
			vos.get(i).setCoverPics(string.substring(0,string.length()-1));//保存真实图片路径结束
		}
		trendTopicManager.insertSubTrendTopic(vos);
		
	}
	
		
		return buildSuccessResponseString(null);
}
	/**
	 * 跳转到列表页
	 * @param model
	 * @return
	 */
	@RequestMapping("/list")
	public String list(Model model){
		model.addAttribute("siteHeadPath", siteHeadPath);
		return "planning/planningList";
		
	}
	
	
	/**多条件查询趋势
	 * @param request
	 */
	@RequestMapping("/queryByCondition")
	@ResponseBody
	public String queryByCondition(HttpServletRequest request) throws ParseException{
		DataTable dataTable = parset4DataTable(request);
		
		TrendTopicSearchCriteral trendTopicVo =new TrendTopicSearchCriteral();
		trendTopicVo.setPageInfo(dataTable.getPageInfo());	
		trendTopicVo.setOrderField(dataTable.getOrderField());
		trendTopicVo.setOrderType(dataTable.getOrderType());
		if(trendTopicVo.getOrderField().equals("trendId")){
			trendTopicVo.setOrderField("id");
			
		}
		setRequestParamSearchCriteralByPrefix(request, trendTopicVo, SEARTCH_PRIFIX.PREFIX_S_);
		if(null!=trendTopicVo.getCreatedTimeStart()){
			Date parse = getDateFormat().parse(trendTopicVo.getCreatedTimeStart());
			String format = getSimpleDateFormat().format(parse);
			trendTopicVo.setCreatedTimeStart(format);
		}
		if(null!=trendTopicVo.getCreatedTimeEnd()){
			Date parse = getDateFormat().parse(trendTopicVo.getCreatedTimeEnd());
			String format = getSimpleDateFormat().format(parse);
			trendTopicVo.setCreatedTimeEnd(format);
		}
		
		RemotePage<TrendTopicVo> remotePage = null;
		
	
			remotePage = trendTopicManager.findTrendTopics(trendTopicVo);
		
		if (remotePage == null || remotePage.getData() == null) {
			dataTable.setData(new ArrayList<TrendTopicVo>());
			return formatDataTable(dataTable);
		}
		// 设置返回的数据
		dataTable.setData(remotePage.getData());
		// 设置分页信息
		dataTable.setPageInfo(remotePage.getPageInfo());
		return formatDataTable(dataTable);
		
	}
	
	/**
	 * 根据id删除趋势，同时删除其子趋势
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(HttpServletRequest request,Integer id){
		Integer updaterId = resoveUserId(request);	
		trendTopicManager.deleteTrendTopic(id,updaterId );
		return buildSuccessResponseString(null);
	}
	
	/**
	 * 根据id修改趋势
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping("/edit")
	public String edit(Integer id ,Model model){
		TrendTopicVo trendTopicVo = trendTopicManager.findTrendTopic(id);
		model.addAttribute("imgHeadPath", imgHeadPath);
		model.addAttribute("ImageBaseUrl", articleImageBaseUrl);
		model.addAttribute(trendTopicVo);
		
		return "planning/planningEdit";
		
	}
	
	
	/**
	 * 只修改主趋势
	 * @param request
	 * @param trendTopicVo
	 * @return
	 */
	@RequestMapping("/updateTrendTopic")
	@ResponseBody
	public String updateTrendTopic(HttpServletRequest request,TrendTopicVo trendTopicVo ){
		Integer updatorId = resoveUserId(request);
		if(updatorId!=null){
			trendTopicVo.setUpdatorId(updatorId);
		}	
		String coverPic = trendTopicVo.getCoverPic();	
		String realPath = getRealPath(coverPic);
		trendTopicVo.setCoverPic( realPath);
		trendTopicManager.updateTrendTopic(trendTopicVo);
		return buildSuccessResponseString(null);
		
	}
	
	/**
	 * 修改自趋势
	 * @param request
	 * @param trendSubTopicVo
	 * @return
	 */
	@RequestMapping("/updateTrendSubTopic")
	@ResponseBody
	public String updateTrendSubTopic(HttpServletRequest request,TrendSubTopicVo trendSubTopicVo){
		trendSubTopicVo.setStatus((byte)1);
		trendSubTopicVo.setIsFabricRelation((byte)1);
		
		String pics = trendSubTopicVo.getCoverPics();   //图片路径替换
		String[] split = pics.split(",");
		StringBuffer buffer =new StringBuffer();
		for (String string : split) {	
			 buffer.append(getRealPath(string));
			 buffer.append(",");
		}
		String string = buffer.toString();
		trendSubTopicVo.setCoverPics(string.substring(0,string.length()-1));
		
		trendTopicManager.updateTrendSubTopic(trendSubTopicVo);
		return buildSuccessResponseString(null);
	}
	
	
	/**
	 * 删除子趋势
	 * @param id
	 * @return
	 */
	@RequestMapping("/deletesubtopic")
	@ResponseBody
	public String deletesubtopic(Integer id){
		
	TrendSubTopicVo trendSubTopicVo=trendTopicManager.findTrendSubTopicById(id);	
		trendSubTopicVo.setIsDeleted((byte)1);
		trendTopicManager.updateTrendSubTopic(trendSubTopicVo);	
		return buildSuccessResponseString(null);
		
	}
	
	/**
	 * 发布趋势
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping("/publishTrendTopic")
	@ResponseBody
	public String publishTrendTopic(HttpServletRequest request,Integer id){
		Integer updatorId = resoveUserId(request);
		trendTopicManager.publishTrendTopic(id,updatorId);
		
		return  buildSuccessResponseString(null);
	}
	
	/**
	 * 取消发布趋势
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping("/cancelpublishTopic")
	@ResponseBody
	public String cancelpublishTopic(HttpServletRequest request,Integer id){
	Integer updatorId = resoveUserId(request);
	trendTopicManager.cancelpublishTopic(id,updatorId);
	return  buildSuccessResponseString(null);
	}
	
	/**
	 * 添加自趋势
	 * @param trendSubTopic
	 * @return
	 */
	@RequestMapping("/addTrendSubTopic")
	@ResponseBody
	public String addTrendSubTopic(TrendSubTopicVo trendSubTopic){
		trendSubTopic.setStatus((byte)1);
		trendSubTopic.setIsFabricRelation((byte)1);
		
		String pics = trendSubTopic.getCoverPics();   //图片路径替换
		String[] split = pics.split(",");
		StringBuffer buffer =new StringBuffer();
		for (String string : split) {	
			 buffer.append(getRealPath(string));
			 buffer.append(",");
		}
		String string = buffer.toString();
		trendSubTopic.setCoverPics(string.substring(0,string.length()-1));
		
		Integer id= trendTopicManager.insertSubTrendTopic(trendSubTopic);	
		return buildSuccessResponseString(id);
	}
	
	
	private String getRealPath(String path){
		if(StringUtils.isNotBlank(path)){
			int index = path.indexOf("TMP-");
			if(index!=-1){	
				try {
					return this.handleFile(path, CommonConstant.PROJECT.ULIAOBAO.getName(), CommonConstant.ULIAOBAO_MODULE.TREND.getName(), 0+"");
					
				} catch (IOException e) {
					throw new GlobalBizException("图片解析错误");
				}
			}
			return path;
		}	
		return null;
		
	}
	
	
	

}
