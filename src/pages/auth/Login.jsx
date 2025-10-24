import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../../store/reducers/authReducer';
import Input from '../../components/ui/Input';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-[90%] mx-auto mt-4 border border-zinc-200 p-4 rounded-2xl flex flex-col gap-4'>
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


      <button type="submit" className='px-4 py-2 rounded-3xl bg-black text-white text-sm font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-zinc-400 transition-all '>Login</button>
      <div className='flex items-center gap-2 pb-4 pl-4'>
        <p className='text-zinc-500 text-sm'>Don't have an account?</p>
        <Link className='text-blue-400 font-bold text-sm' to='/auth/sign-up'>Signup</Link>
      </div>
    </form>
  )
}

export default Login