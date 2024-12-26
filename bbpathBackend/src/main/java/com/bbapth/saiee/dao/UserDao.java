package com.bbapth.saiee.dao;

import com.bbapth.saiee.entities.User;

public interface UserDao 
{
	User findByEmail(String email);
    boolean existsByEmail(String email);
    void saveUser(User user);
}
