package com.examportal.exam_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.exam_portal.dto.AnswerRequest;
import com.examportal.exam_portal.entity.Question;
import com.examportal.exam_portal.repository.QuestionRepository;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    // Add question
    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    // Get all questions
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @PostMapping("/submit")
    public int submitExam(@RequestBody AnswerRequest request) {
        int score = 0;
        
        for (Long qId : request.getAnswers().keySet()) {
            Question q = questionRepository.findById(qId).orElse(null);

            if (q != null && 
                q.getCorrectAnswer().equalsIgnoreCase(request.getAnswers().get(qId))) {
                score++;
            }
            
        }

        return score;
    }
}
