import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuth.js';
import { useState } from 'react';
import { useForm } from '../../hooks/useform.js';

import styles from './login.module.css';

const intitialValues = {
    email: '',
    password: '',
};

export default function Login() {
    const [error, setError] = useState('');
    const login = useLogin();
    const navigate = useNavigate();

    const loginHandler = async (values) => {
        try {
            await login(values.email, values.password);
            console.log('successful login with email:', values.email);

            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(intitialValues, loginHandler);

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={submitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" value={values.password} onChange={changeHandler} />
                    {error && (
                        <p className={styles.error}>
                            <span>{error}</span>
                        </p>
                    )}
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
