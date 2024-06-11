import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { LoginActionApply } from '../../domainHooks/useLogin/useLogin';

type LoginProps = {
    isLoggedIn: boolean;
    userLoggedIn: (data: {accountId: string}) => void;
    userLoggedOut: () => void;
    loginError: Error | null;
    loginUser: LoginActionApply
    navigateToMeterReadingsPage: (accountId: string) => void;
}

type LoginFormValues = z.infer<typeof LoginFormSchema>

const LoginFormSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
});

const ErrorField = ({ error }: { error?: string }) => error ? <p className='text-red-500'>{error}</p> : null;

export const Login = ({
    isLoggedIn,
    userLoggedIn,
    userLoggedOut,
    loginError,
    loginUser,
    navigateToMeterReadingsPage
}: LoginProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
    });
    
    const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
        const response = await loginUser(data);
    
        if (response instanceof Error) {
            console.log(response.message);
        } else {
            const { accountId } = response;
            userLoggedIn({
                accountId
            })
            navigateToMeterReadingsPage(accountId)
        }
    }


    const handleLogout = async () => {
        userLoggedOut()
    }

    return (
        <div className='p-4'>
            <p className="text-xl font-semibold mb-4">Login</p>

            {isLoggedIn ? (
                <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={handleLogout}
                type="button"
            >
                    Logout
                </button> 
            ) : (
                <form className="flex flex-col items-start" method='POST' onSubmit={handleSubmit(handleLogin)}>
                    <ErrorField error={loginError?.message}/>

                    <div className="flex items-center">
                        <label htmlFor="username" className="mb-2 mr-2 w-18">Username:</label>
                        <input 
                            {...register('username', {
                                disabled: isSubmitting
                            })}
                            className="border border-gray-300 rounded-md px-2 py-1 w-64"
                            defaultValue="test"
                            id="username"
                            type="text" 
                        />
                    </div>
                    <ErrorField error={errors?.username?.message}/>

                    <div className="mt-4 flex items-center">
                        <label htmlFor="password" className="mb-2 mr-2 w-18">Password:</label>
                        <input 
                            {...register('password', {
                                disabled: isSubmitting
                            })}
                            className="border border-gray-300 rounded-md px-2 py-1 w-64" 
                            defaultValue="react practices"
                            id='password'
                            type="password" 
                        />
                    </div>
                    <ErrorField error={errors?.password?.message}/>
                    
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                        disabled={isSubmitting}
                        type="submit" 
                    >
                        Login
                    </button>
                </form>
            )}
            
        </div>
    );
}