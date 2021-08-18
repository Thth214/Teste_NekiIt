import{ useContext, useState } from 'react'
import '../../styles/styles.css'
import { ToggleButton } from 'primereact/togglebutton'
import api from '../../service/api'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../service/UserContext'
export const Login = () => {
    const[value,setValue] = useState(false)
    const[user,setUser] = useState({})
    const{addUser} = useContext(UserContext)
    const [className, setClassName] = useState("container")
    const history = useHistory();


    const onInputChange = (event) => {
     const { name, value } = event.target;
        setUser({ ...user, [name]: value });
            
          };
    const Login = async() =>{
        await api.post("user/login",{
            login:`${user.login}`,
            password:`${user.password}`,
        }).then((res)=>{
            addUser(res.data.user)
            history.push("/mySkills")
        }).catch((err)=>{
            alert("Tente Novamente E verifique os campos preenchidos")
        })
    }

    const Register = ()=>{
         api.post("user",{
            login:`${user.login}`,
            password:`${user.password}`
        }).then((res)=>{
            alert("Cadastro Efetuado com Sucesso")
        }).catch((err)=>{
            console.log(err);
            alert("Erro,Tente Novamente")
        })
    }

    

    return (
        <>
            <div className={className}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Username" name="login" onChange={(e) => onInputChange(e)} />
                        <input type={value?"text":"password"} name="password" placeholder="Password" onChange={(e) => onInputChange(e)} /> 
                        <ToggleButton checked={value} onChange={(e) => setValue(e.value)} onLabel="Mostrando Senha" offLabel="Senha Escondida" className="visible2" onIcon="pi pi-check" offIcon="pi pi-times"/>
                        <button onClick={()=>Register()}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    
                    <form action="#">
                        <h1>Sign in</h1>
                        <input type="text" placeholder="Username" name="login" onChange={(e) => onInputChange(e)} />
                        <input type={value?"text":"password"} name="password" placeholder="Password" onChange={(e) => onInputChange(e)} /> 
                        <ToggleButton checked={value} onChange={(e) => setValue(e.value)} onLabel="Mostrando Senha" offLabel="Senha Escondida" className="visible" onIcon="pi pi-check" offIcon="pi pi-times"/>
                        <button onClick={()=>Login()}>Sign In</button>
                    </form>
                </div>

                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        {
                            className === "container right-panel-active" ?
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent. Tá deprimidis</p>
                                    <button onClick={() => setClassName("container")} className="ghost" id="signIn">Sign In</button>
                                </div>

                                :
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. In elementis mé pra quem é amistosis</p>
                                    <button onClick={() => setClassName("container right-panel-active")} className="ghost" id="signUp">Sign Up</button>
                                </div>
                        }
                    </div>
                </div>
            </div>

            <footer>
                <p>
                   Teste Neki-It
                </p>
            </footer>

        </>

    )
}
