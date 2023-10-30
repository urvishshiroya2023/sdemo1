import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-white '>
            <div className='container'>
                <header className='my-5'>
                    <h1>Demo App</h1>
                </header>
                <h3>Let's Get Started In to Application..</h3>
                <div className='d-flex mt-4'>
                    <div>
                        <div>
                            <h4>Already Have <br /> Account?</h4>
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary '>
                                <Link className='text-white' to={"/login"}>Login</Link>
                            </button>
                        </div>
                    </div>
                    <div className='ms-5'>
                        <div>
                            <h4>SignUp With <br />
                                Us?</h4>
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary '>
                                <Link className='text-white' to={"/register"}>Register</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
