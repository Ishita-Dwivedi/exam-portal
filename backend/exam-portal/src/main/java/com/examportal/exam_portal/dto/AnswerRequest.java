package com.examportal.exam_portal.dto;

import java.util.Map;

import lombok.Data;

@Data
public class AnswerRequest {
    private Map<Long, String> answers;
}
