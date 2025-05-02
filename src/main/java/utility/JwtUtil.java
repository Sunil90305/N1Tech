//package utility;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import java.util.Date;
//
//public class JwtUtil {
//    // Ensure this matches your actual package structure
//
//
//        private static final String SECRET_KEY = "your_secret_key"; // Replace with a secure key
//
//        // Generate JWT Token
//        public static String generateToken(String email) {
//            return Jwts.builder()
//                    .setSubject(email) // Store email in the token payload
//                    .setIssuedAt(new Date()) // Token creation time
//                    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Token expires in 1 hour
//                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Secure using HS256 encryption
//                    .compact(); // Convert token to string
//        }
//
//        // Verify & Decode JWT Token
//        public static Claims verifyToken(String token) {
//            return Jwts.parser()
//                    .setSigningKey(SECRET_KEY) // Validate token using secret key
//                    .parseClaimsJws(token) // Decode the JWT
//                    .getBody(); // Extract claims (email, etc.)
//        }
//    }

