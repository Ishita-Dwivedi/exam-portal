package com.examportal.exam_portal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController
{
    @GetMapping("/test")
    public String home()
    {
        return "Backend Working";
    }


}