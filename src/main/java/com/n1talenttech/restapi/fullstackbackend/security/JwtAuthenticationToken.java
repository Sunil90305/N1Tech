package com.n1talenttech.restapi.fullstackbackend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final String principal;

    public JwtAuthenticationToken(String principal) {
        super(null);
        this.principal = principal;
        setAuthenticated(true); // Mark as authenticated
    }

    @Override
    public Object getCredentials() {
        return null; // No credentials required for JWT
    }

    @Override
    public Object getPrincipal() {
        return principal; // Return the principal (e.g., email)
    }
}