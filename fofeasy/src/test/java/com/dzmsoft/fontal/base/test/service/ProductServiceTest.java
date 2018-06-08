package com.dzmsoft.fontal.base.test.service;

import com.dzmsoft.fofeasy.report.service.ProductService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:/spring.xml"})
public class ProductServiceTest {
	@Autowired
	private ProductService productService;

	@SuppressWarnings("rawtypes")
	@Test
	public void selectByMap_test(){
		/*Map params = new HashMap();
		PageList<ProductDto> productDtos = productService.selectByMap(params, new PageBounds(1,10));
		if (!CheckEmptyUtil.isEmpty(productDtos)){
			System.out.print("productDtos size is " + productDtos.size());
		}*/
		
	}
}
	