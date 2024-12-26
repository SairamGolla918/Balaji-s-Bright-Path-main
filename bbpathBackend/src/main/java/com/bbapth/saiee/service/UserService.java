package com.bbapth.saiee.service;

import com.bbapth.saiee.dao.UserDao;
import com.bbapth.saiee.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDAO;

    public String registerUser(User user) {
        if (userDAO.existsByEmail(user.getEmail())) {
            return "Email already exists.";
        }
        userDAO.saveUser(user);  // No password encoding
        return "User registered successfully.";
    }

    public String loginUser(String email, String password) {
        User user = userDAO.findByEmail(email);
        if (user == null) {
            return "User not found.";
        }
        return password.equals(user.getPassword()) ? "Login successful." : "Invalid password.";  // Direct password comparison
    }
}
