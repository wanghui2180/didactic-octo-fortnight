package com.uliaow.cms.converters;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.uliaow.base.converter.AbstractConverter;
import com.uliaow.basedata.entity.BasedataDictionary;
import com.uliaow.basedata.service.BasedataDictionaryService;
import com.uliaow.cms.entity.TrendSubTopic;
import com.uliaow.cms.entity.TrendTopic;
import com.uliaow.cms.vo.TrendSubTopicVo;
import com.uliaow.cms.vo.TrendTopicVo;
import com.uliaow.commons.utils.BeanHelper;
import com.uliaow.commons.utils.CommonUtil;
@Component
public class TrendTopicConverter extends AbstractConverter<TrendTopic , TrendTopicVo> {
	SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss") ;
	
	@Autowired
	private BasedataDictionaryService basedataService ;
	public SimpleDateFormat getDateFormat() {
		return dateFormat;
	}
	@Override
	public TrendTopic convert2Po(TrendTopicVo v) {
		if( v == null ){
			return null ;
		}
		TrendTopic entity = new TrendTopic() ;
		BeanHelper.beancopy( v , entity ) ;
		return entity;
	}

	@Override
	public TrendTopicVo convert2Vo(TrendTopic p) {
		if( p == null ){
			return null ;
		}
		TrendTopicVo trendTopic = new TrendTopicVo() ;
		
		BeanHelper.beancopy( p , trendTopic ) ;
		trendTopic.setCategoryName( findCategoryName( p.getCategoryId() ) );
		trendTopic.setCoverPic( 
				CommonUtil.concatImageDomain( p.getCoverPic()));
		return trendTopic;
	}
	
	public TrendSubTopic convert2Po(TrendSubTopicVo v) {
		if( v == null ){
			return null ;
		}
		TrendSubTopic entity = new TrendSubTopic() ;
		String coverPic=null;
		if(StringUtils.isNotBlank(v.getCoverPics())){
			 coverPic = v.getCoverPics();
		}
		BeanHelper.beancopy( v , entity ) ;
		if(coverPic!=null){
			entity.setCoverPic(coverPic);
		}
		
		return entity;
	}

	public TrendSubTopicVo convert2Vo(TrendSubTopic p) {
		if( p == null ){
			return null ;
		}
		TrendSubTopicVo trendSubTopic = new TrendSubTopicVo() ;
		//List< String > coverPics = new  ArrayList<String>() ;	
		//String coverPic = p.getCoverPic();
		BeanHelper.beancopy( p , trendSubTopic ) ;
	
		trendSubTopic.setCoverPic(CommonUtil.concatImageDomain(
				CommonUtil.explode( p.getCoverPic() , "," )) );
		
		/*if(coverPic!=null){
			String[] strings = coverPic.split(",");
			for (String string : strings) {
				coverPics.add(string);
			}
			trendSubTopic.setCoverPic(coverPics);
		}*/
		return trendSubTopic;
	}
	
	public List<TrendSubTopicVo> convertSubTopic2Vo( List<TrendSubTopic> ps ){
		if( ps == null || ps.isEmpty() ){
			return null ;
		}
		List< TrendSubTopicVo > vs = new  ArrayList<TrendSubTopicVo>() ;
		for( TrendSubTopic p : ps ){
			
			vs.add( convert2Vo( p ) ) ;
		}
		return vs ;
	}
	
	private String findCategoryName( Integer id ){
		if( id == null ){
			return  null ;
		}
		 BasedataDictionary entity = basedataService.findBasedataDictionaryByIdFromCache( id ) ;
		return entity == null ? null : entity.getDictionaryName() ;
	}
	
	
}
