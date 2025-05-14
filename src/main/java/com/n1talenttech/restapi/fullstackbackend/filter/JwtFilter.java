package com.n1talenttech.restapi.fullstackbackend.filter;

import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
import com.n1talenttech.restapi.fullstackbackend.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                System.out.println("✅ Valid JWT for email: " + email);

                // Load user from DB to get roles
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

                // Create Spring Security Authentication Token with roles
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // Register it with Spring Security Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println("⛔ Invalid or expired JWT token.");
            }
        } else {
            System.out.println("⚠️ No Authorization header or does not start with 'Bearer'.");
        }

        filterChain.doFilter(request, response);
    }
}
