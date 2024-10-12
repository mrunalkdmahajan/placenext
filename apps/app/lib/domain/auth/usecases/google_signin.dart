import 'package:app/data/application_form/model/user_google_login_req.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dartz/dartz.dart';

class GoogleSignInUseCase {
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Future<Either<Exception, UserGoogleLoginReq>> call() async {
    try {
      final account = await _googleSignIn.signIn();
      if (account != null) {
        return Right(UserGoogleLoginReq(
          displayName: account.displayName,
          email: account.email,
          photoUrl: account.photoUrl,
        ));
      } else {
        return Left(Exception("Google Sign-In canceled by user."));
      }
    } catch (e) {
      return Left(Exception("Error during Google Sign-In: $e"));
    }
  }
}
