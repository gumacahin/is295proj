import { useEffect } from 'react';
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Login({appName, canResetPassword}) {
    const { reset, data, setData, form, post, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { classes } = useStyles();

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title={`Login to ${appName}`} />
            <div className={classes.wrapper}>
                <Paper
                    component='form'
                    onSubmit={submit}
                    className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome back to{' '}
                    <Anchor component={Link} href={route('home')}>Task Wise</Anchor>
                    </Title>

                    <TextInput
                        disable={processing}
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        label="Email address"
                        placeholder="mail@example.com"
                        size="md" />
                    <PasswordInput
                        disable={processing}
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        label="Password"
                        placeholder="Your password"
                        mt="md" size="md" />
                    <Checkbox
                        disable={processing}
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        label="Keep me logged in"
                        mt="xl" size="md" />
                    <Button type="submit" fullWidth mt="xl" size="md">Login</Button>

                    <Text ta="center" mt="md">
                        Don’t have an account?{' '}
                        <Anchor component={Link} href={route('register')} weight={700}>Register</Anchor>
                    </Text>
                    <Text ta="center" mt="md">
                        Forgot your password?{' '}
                        {canResetPassword && (
                            <Anchor component={Link}
                                href={route('password.request')}
                                weight={700}
                            >
                                Reset Password
                            </Anchor>
                        )}
                    </Text>
                </Paper>
            </div>
        </GuestLayout>
  );
}
// import Checkbox from '@/Components/Checkbox';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Login({ status, appName, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     useEffect(() => {
//         return () => {
//             reset('password');
//         };
//     }, []);

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('login'));
//     };

//     return (
//         <GuestLayout>
//             <Head title={`Login to ${appName}`} />

//             {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         isFocused={true}
//                         onChange={(e) => setData('email', e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="block mt-4">
//                     <label className="flex items-center">
//                         <Checkbox
//                             name="remember"
//                             checked={data.remember}
//                             onChange={(e) => setData('remember', e.target.checked)}
//                         />
//                         <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                     </label>
//                 </div>

//                 <div className="flex items-center justify-end mt-4">
//                     {canResetPassword && (
//                         <Link
//                             href={route('password.request')}
//                             className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Forgot your password?
//                         </Link>
//                     )}

//                     <PrimaryButton className="ml-4" disabled={processing}>
//                         Log in
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }
