import React, { useState, useEffect } from 'react'
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : null

  useEffect(() => {
    if (userInfo) {
      if (redirect) navigate(`/${redirect}`, { state: location.state })
      else {
        navigate('/', { state: location.state })
      }
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(register(name, email, password))
    } else {
      setMessage("The password doesn't match")
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form
        onSubmit={(e) => {
          submitHandler(e)
        }}
      >
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='name'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button className='mt-3' type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='mt-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
