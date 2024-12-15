import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useAuth.js';
import { useForm } from '../../hooks/useform.js';
import { useState } from 'react';

import styles from './register.module.css';

const intitialValues = {
    email: '',
    password: '',
    repass: '',
};

export default function Register() {
    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (values) => {
        if (values.password !== values.repass) {
            setError('Passwords do not match!');
            return;
        }

        try {
            await register(values.email, values.password);
            console.log('successful registration with email:', values.email);

            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(intitialValues, registerHandler);

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={submitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.password}
                        onChange={changeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="repass" id="confirm-password" value={values.repass} onChange={changeHandler} />

                    {error && (
                        <p className={styles.error}>
                            <span>{error}</span>
                        </p>
                    )}
                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
