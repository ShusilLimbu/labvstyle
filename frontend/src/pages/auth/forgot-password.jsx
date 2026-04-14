import CommonForm from '@/components/common/form'
import { forgotPasswordFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { forgotPassword } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState = {
  email: '',
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(forgotPassword(formData.email)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Reset link sent successfully",
        });
        setFormData(initialState);
      } else {
        toast({
          title: data?.payload?.message || "Failed to send reset link",
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Forgot Password</h1>
        <p className='mt-2'>Remember your password?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Log In</Link>
        </p>
      </div>
      <CommonForm
        formControls={forgotPasswordFormControls}
        buttonText={'Send Reset Link'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ForgotPassword
