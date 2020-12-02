import EmailFormSection from "components/auth/password-forgot/components/EmailFormSection";
import EmailSent from "components/auth/password-forgot/components/EmailSent";
import useBodyClass from "components/hooks/useBodyClass";
import { IRootState } from "types";
import { useSelector } from 'react-redux'

export default function PasswordRecoveryEmail() {
  useBodyClass('grey');
  const formIsSuccess = useSelector((state: IRootState) => state.PWRecoverEmail.formIsSuccess)

    return (
      <>
      {formIsSuccess === true ? <EmailSent/> : <EmailFormSection/>}
      </>
  )
}
