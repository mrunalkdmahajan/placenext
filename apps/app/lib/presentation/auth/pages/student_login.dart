import 'package:app/domain/auth/usecases/google_signin.dart';
import 'package:flutter/material.dart';

class StudentLogin extends StatelessWidget {
  StudentLogin({super.key});
  final GoogleSignInUseCase googleSignInUseCase = GoogleSignInUseCase();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 48.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // App Logo
              SizedBox(
                height: 150,
                child: Image.asset('assets/images/PlaceNext_logo.png'),
              ),
              const SizedBox(height: 24),
              // Welcome Message
              const Text(
                "Welcome Back!",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.blueAccent,
                ),
              ),
              const SizedBox(height: 16),
              // Subtitle
              Text(
                "Login to continue",
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[600],
                ),
              ),
              const SizedBox(height: 32),
              // Login Form
              const LoginForm(),
              const SizedBox(height: 16),
              // Divider with "OR"
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(child: Divider(thickness: 1)),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12.0),
                    child: Text(
                      "OR",
                      style: TextStyle(color: Colors.grey),
                    ),
                  ),
                  Expanded(child: Divider(thickness: 1)),
                ],
              ),
              const SizedBox(height: 16),
              // Google Login Button
              ElevatedButton.icon(
                onPressed: () async {
                  final googleSignInUseCase = GoogleSignInUseCase();
                  final result = await googleSignInUseCase.call();

                  result.fold(
                    (exception) {
                      print("Google Sign-In Error: ${exception.toString()}");
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                                "Google Sign-In Failed: ${exception.toString()}")),
                      );
                    },
                    (user) {
                      // Handle successful login
                      print(
                          "Google Sign-In Success: ${user.displayName} (${user.email})");
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text("Welcome, ${user.displayName}!")),
                      );
                      // Optionally, navigate to a new screen or update state
                    },
                  );
                },
                icon: const Icon(Icons.login),
                label: const Text("Login with Google"),
                style: ElevatedButton.styleFrom(
                  minimumSize:
                      const Size(double.infinity, 50), // Full-width button
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  backgroundColor: Colors.redAccent,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    return const LoginWithEmailAndPassword();
  }
}

class LoginWithEmailAndPassword extends StatefulWidget {
  const LoginWithEmailAndPassword({super.key});

  @override
  State<LoginWithEmailAndPassword> createState() =>
      _LoginWithEmailAndPasswordState();
}

class _LoginWithEmailAndPasswordState extends State<LoginWithEmailAndPassword> {
  bool _obscurePassword = true; // To toggle password visibility

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Email TextField
          TextFormField(
            decoration: InputDecoration(
              labelText: "Email",
              hintText: "Enter your email",
              prefixIcon: const Icon(Icons.email),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            keyboardType: TextInputType.emailAddress,
          ),
          const SizedBox(height: 16),
          // Password TextField
          TextFormField(
            obscureText: _obscurePassword,
            decoration: InputDecoration(
              labelText: "Password",
              hintText: "Enter your password",
              prefixIcon: const Icon(Icons.lock),
              suffixIcon: IconButton(
                icon: Icon(
                  _obscurePassword ? Icons.visibility : Icons.visibility_off,
                ),
                onPressed: () {
                  setState(() {
                    _obscurePassword = !_obscurePassword;
                  });
                },
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Login Button
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 50), // Full-width button
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text("Login"),
          ),
          const SizedBox(height: 16),
          // Forgot Password Link
          GestureDetector(
            onTap: () {},
            child: const Text(
              "Forgot Password?",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.blueAccent),
            ),
          ),
        ],
      ),
    );
  }
}
