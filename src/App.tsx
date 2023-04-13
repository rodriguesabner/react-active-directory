import {useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>();

    const handleSignIn = async (): Promise<void> => {
        const body = {
            username,
            password
        }

        try {
            const {data}: any = await axios.post('http://localhost:21300/active-directory/login', body);
            setIsAuthenticated(true);
            setUser(data._json)
        } catch (e) {
            alert('Invalid credentials')
        }
    }

    return (
        <div className="App">
            {!isAuthenticated ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    void handleSignIn();
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <p style={{marginBottom: 5, fontSize: 14}}>
                            Usuário
                        </p>
                        <input
                            style={{height: 30}}
                            type="text"
                            name="user"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <p style={{marginBottom: 5, fontSize: 14}}>
                            Senha
                        </p>
                        <input
                            style={{height: 30}}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button style={{marginTop: 20}}>
                        Entrar
                    </button>
                </form>
            ) : (
                <div>
                    <h1>Hello</h1>
                    <h2>{user.cn}</h2>
                </div>
            )}
        </div>
    )
}

export default App
