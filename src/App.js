import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CaesarCipher from './components/CaesarCipher'
import TrithemiusCipher from './components/TrithemiusCipher'
import AppHeader from './components/AppHeader'
import { Container } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify'

export const alphabetEN = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetUA = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'
export const numbers = '0123456789'

const App = () => (
  <>
    <AppHeader/>
    <Container>
      <Switch>
        <Route path="/lab1" component={CaesarCipher}/>
        <Route path="/lab2" component={TrithemiusCipher}/>
      </Switch>
    </Container>
    <ToastContainer
      transition={Slide}
    />
  </>
)

export default App
