import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    toast.success('Your account has been created successfully!')
  };
  const password = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-[90%] mx-auto mt-4 border border-zinc-200 p-4 rounded-2xl flex flex-col gap-4'>
      <Input
        label="Full Name"
        name="username"
        type="text"
        register={register}
        rules={{
          required: "Username is required",
          minLength: { value: 1, message: "Min 2 characters" },
        }}
        error={errors.username}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
        error={errors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
        }}
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        rules={{
          required: "Confirm Password is required",
          validate: (value) => value === password || "Passwords do not match",
        }}
        error={errors.confirmPassword}
      />


      <button type="submit" className='px-4 py-2 rounded-3xl bg-black text-white text-sm font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-zinc-400 transition-all '>Create Account</button>
      <div className='flex items-center gap-2 pb-4 pl-4'>
        <p className='text-zinc-500 text-sm'>Already have an account?</p>
        <Link className='text-blue-400 font-bold text-sm' to='/auth'>Login</Link>
      </div>
    </form>
  )
}

export default Signup