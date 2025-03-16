package com.example.demo;

import com.example.demo.repository.AusLocationRepository;
import com.example.demo.service.UVService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Demo1ApplicationTests {

	@Autowired
	private AusLocationRepository ausLocationRepository;

	@Autowired
	private UVService uvService;

	@Test
	void contextLoads() throws Exception {
		//System.out.println(ausLocationRepository.existsByCoordinates(1.0, 2.0));
		System.out.println(uvService.getCurrentUV("Melbourne"));
	}

}
