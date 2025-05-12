package com.n1talenttech.restapi.fullstackbackend.filter;

import com.n1talenttech.restapi.fullstackbackend.security.JwtAuthenticationToken;
import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            System.out.println("Token received: " + token); // Debugging log

            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                System.out.println("Email extracted from token: " + email); // Debugging log
                JwtAuthenticationToken authentication = new JwtAuthenticationToken(email);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                System.out.println("Token validation failed."); // Debugging log
            }
        } else {
            System.out.println("Authorization header is missing or invalid."); // Debugging log
        }

        filterChain.doFilter(request, response);
    }
}