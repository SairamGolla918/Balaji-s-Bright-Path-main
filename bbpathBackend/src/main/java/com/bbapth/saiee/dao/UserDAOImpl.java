package com.bbapth.saiee.dao;

import com.bbapth.saiee.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User findByEmail(String email) {
        return entityManager.find(User.class, email);
    }

    @Override
    public boolean existsByEmail(String email) {
        String query = "SELECT COUNT(u) FROM User u WHERE u.email = :email";
        Long count = (Long) entityManager.createQuery(query)
                .setParameter("email", email)
                .getSingleResult();
        return count > 0;
    }

    @Override
    @Transactional
    public void saveUser(User user) {
        entityManager.persist(user);
    }
}
