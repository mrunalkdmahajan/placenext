import "package:app/data/application_form/model/user_creation_req.dart";
import "package:dartz/dartz.dart";
import "package:firebase_auth/firebase_auth.dart";
import 'package:google_sign_in/google_sign_in.dart';

abstract class AuthFirebaseService {
  Future<Either> signup(UserCreationReq user);
  Future<Either> googleLogin();
}

class AuthFirebaseServiceImpl implements AuthFirebaseService {
  @override
  Future<Either> signup(UserCreationReq user) async {
    try {
      // Call the firebase signup method
      var returedData =
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: user.email,
        password: user.password,
      );
      // storing data to firebase collection
      // await FirebaseFirestore.instance.collection("users").doc(returedData.user.uid).set({
      //   "email": user.email,
      //   "password": user.password,
      // });

      return Right("hello");
    } catch (e) {
      return Left(e);
    }
  }

  @override
  Future<Either> googleLogin() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      final GoogleSignInAuthentication googleAuth =
          await googleUser!.authentication;

      final OAuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final UserCredential userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

      return Right(userCredential);
    } catch (e) {
      return Left(e);
    }
  }
}
