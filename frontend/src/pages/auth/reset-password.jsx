import CommonForm from '@/components/common/form'
import { resetPasswordFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { resetPassword } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

const initialState = {
  password: '',
  confirmPassword: '',
}

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  function onSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast({
        title: "Passwords do not match",
        variant: 'destructive',
      })
    }

    if (!token) {
        return toast({
            title: "Invalid or missing token",
            variant: "destructive"
        })
    }

    dispatch(resetPassword({ token, newPassword: formData.password })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Password reset successful",
        });
        navigate('/auth/login');
      } else {
        toast({
          title: data?.payload?.message || "Failed to reset password",
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Reset Password</h1>
        <p className='mt-2'>Enter your new password below</p>
      </div>
      <CommonForm
        formControls={resetPasswordFormControls}
        buttonText={'Reset Password'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ResetPassword
