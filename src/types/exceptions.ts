import { AppTexts } from '../models/texts';

export abstract class AppException {
  public abstract getMessage(texts: AppTexts): string;
}

export class InternetErrorException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorInternet;
  }
}

export class AudioPlayerErrorException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorAudioPlayer;
  }
}

export class InvalidCredentialException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorInvalidCredentials;
  }
}

export class NotConnectedException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorNotConnected;
  }
}

export class DuplicateUsernameException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorDuplicateUsername;
  }
}

export class WeakPasswordException extends AppException {
  public override getMessage(texts: AppTexts): string {
    return texts.errorWeakPassword;
  }
}
