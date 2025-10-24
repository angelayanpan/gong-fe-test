import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { encode } from '../utils/encode';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/user';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const key = encode(email, password);

        try {
            const response = await fetch(
                `https://gongfetest.firebaseio.com/secrets/${key}.json`
            );

            const data = await response.json();

            if (data) {
                const usersResponse = await fetch(
                    'https://gongfetest.firebaseio.com/users.json'
                );
                const users = await usersResponse.json();
                const currentUser = users.find((u: User) => u.id === data);
                if (currentUser) {
                    login(currentUser, users);
                    navigate('/home');
                } else {
                    setError('User data not found.');
                }
            } else {
                setError('Login failed. Please try again.');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setError('Error during login.');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="login-page">
            <h1>Please login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email Address:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;