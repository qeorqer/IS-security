import React, { useState } from 'react'
import { Col, FormControl, FormGroup, Row, Form, Button } from 'react-bootstrap'
import { alphabetEN, alphabetUA } from '../App'
import { toast } from 'react-toastify'

const encrypt = (string, alphabet, gamma) => {
  let out = ''

  for (let i = 0; i < string.length; i++) {
    let indexOfLetter = alphabet.indexOf(string[i])
    const indexOfGamma = alphabet.indexOf(gamma[i])

    if (indexOfLetter + indexOfGamma > alphabet.length) {
      indexOfLetter -= alphabet.length
    }

    out += alphabet[indexOfLetter + indexOfGamma]
  }

  return out
}

const decrypt = (string, alphabet, gamma) => {
  let out = ''

  for (let i = 0; i < string.length; i++) {
    let indexOfLetter = alphabet.indexOf(string[i])
    const indexOfGamma = alphabet.indexOf(gamma[i])

    if (indexOfLetter - indexOfGamma < 0) {
      indexOfLetter += alphabet.length
    }

    out += alphabet[indexOfLetter - indexOfGamma]
  }

  return out
}

const CaesarCipher = () => {
  const [message, setMessage] = useState('')
  const [gamma, setGamma] = useState('')
  const [useEn, setUseEn] = useState(true)
  const [resultMessage, setResultMessage] = useState('')

  const handleEncrypt = () => {
    if (!message.trim() || !gamma.trim()) {
      return toast('All fields are required', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    } else if (gamma.length < message.length) {
      return toast('Length of gamma word can\'t be less then message\'s length', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }

    setResultMessage(encrypt(message.trim().toLowerCase(), useEn ? alphabetEN : alphabetUA, gamma))
  }

  const handleDecrypt = () => {
    if (!message.trim() || !gamma.trim()) {
      return toast('All fields are required', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    } else if (gamma.length < message.length) {
      return toast('Length of gamma word can\'t be less then message\'s length', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }

    setResultMessage(decrypt(message.trim().toLowerCase(), useEn ? alphabetEN : alphabetUA, gamma))
  }
  const handleFieldChange = (setter) => (event) => {
    setResultMessage('')
    setter(event.target.value)
  }

  return (
    <>
      <p className='fs-4 text-center fw-bold'>Trithemius cipher</p>
      <Row>
        <Col xs='4'>
          <p className='mb-1 fs-4 w-100'>Enter the message:</p>
          <FormGroup
            controlId="message"
            className='mb-4'>
            <FormControl
              type='text'
              value={message}
              onChange={handleFieldChange(setMessage)}
              placeholder='Type string to work with'
            />
          </FormGroup>
        </Col>
        <Col xs='4'>
          <p className='mb-1 fs-4 w-100'>Enter the gamma:</p>
          <FormGroup
            controlId="gamma"
            className='mb-4'>
            <FormControl
              type='text'
              value={gamma}
              onChange={handleFieldChange(setGamma)}
              placeholder='Enter gamma'
            />
          </FormGroup>
        </Col>
        <Col xs='4'>
          <p className='mb-1 fs-4 w-100'>Select the language:</p>
          <Form.Check
            checked={useEn}
            type='radio'
            name='enOrUk'
            id='default-radio2'
            label='English'
            className='w-50 d-inline-block'
            onChange={() => setUseEn(true)}
          />
          <Form.Check
            checked={!useEn}
            type='radio'
            name='enOrUk'
            id='default-radio1'
            label='Ukrainian'
            className='w-50  d-inline-block mt-2'
            onChange={() => setUseEn(false)}
          />
        </Col>
        <Col xs='12' className='d-flex justify-content-around'>
          <Button variant="dark" onClick={handleEncrypt}>Encrypt</Button>
          <Button variant="dark" onClick={handleDecrypt}>Decrypt</Button>
        </Col>
        {
          resultMessage &&
          <p className='mt-3 text-center'>Result: <span className='fw-bold'>{resultMessage}</span></p>
        }
      </Row>
    </>
  )
}

export default CaesarCipher