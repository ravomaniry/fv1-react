import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../clients/fv1';
import { AppTexts } from '../../models/texts';

export function getErrorMessage(error: unknown, texts: AppTexts): string {
  if (error instanceof AxiosError) {
    switch (error.response?.data?.code) {
      case ErrorCodesEnum.InvalidCredentials:
        return texts.errorInvalidCredentials;
      case ErrorCodesEnum.UserExists:
        return texts.errorDuplicateUsername;
      case ErrorCodesEnum.WeakPassword:
        return texts.errorWeakPassword;
      default:
        return texts.errorUnknown;
    }
  }
  return texts.errorUnknown;
}
