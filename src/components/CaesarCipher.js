import React, { useState } from 'react'
import { Col, FormControl, FormGroup, Row, Form, Button } from 'react-bootstrap'
import { alphabetEN, alphabetUA } from '../App'
import { toast } from 'react-toastify'

const encrypt = (string, alphabet, offset) => {
  let out = ''

  for (let i = 0; i < string.length; i++) {
    let indexOfLetter = alphabet.indexOf(string[i])

    if (indexOfLetter + offset > alphabet.length) {
      indexOfLetter -= alphabet.length
    }

    out += alphabet[indexOfLetter + offset]
  }

  return out
}

const decrypt = (string, alphabet, offset) => {
  let out = ''

  for (let i = 0; i < string.length; i++) {
    let indexOfLetter = alphabet.indexOf(string[i])

    if (indexOfLetter - offset < 0) {
      indexOfLetter += alphabet.length
    }

    out += alphabet[indexOfLetter - offset]
  }

  return out
}

const forceDecrypt = (string, alphabet) => {
  const res = []

  for (let i = 1; i <= alphabet.length; i++) {
    res.push((decrypt(string, alphabet, i)))
  }

  return res
}

const CaesarCipher = () => {
  const [message, setMessage] = useState('')
  const [useEn, setUseEn] = useState(true)
  const [offset, setOffset] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const [forceDecrypted, setForceDecrypted] = useState([])

  const handleEncrypt = () => {
    setForceDecrypted([])

    if (!message.trim() || offset === '') {
      return toast('All fields are required', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }

    setResultMessage(encrypt(message.trim().toLowerCase(), useEn ? alphabetEN : alphabetUA, Number(offset)))
  }

  const handleDecrypt = () => {
    setForceDecrypted([])

    if (!message.trim() || offset === '') {
      return toast('All fields are required', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }
    setResultMessage(decrypt(message.trim().toLowerCase(), useEn ? alphabetEN : alphabetUA, Number(offset)))
  }

  const handleForceDecrypt = () => {
    setResultMessage('')

    if (!message.trim()) {
      return toast('Message field is required', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    }

      setForceDecrypted(forceDecrypt(message.trim().toLowerCase(), useEn ? alphabetEN : alphabetUA))
  }

  const handleFieldChange = (setter) => (event) => {
    setResultMessage('')
    setForceDecrypted([])

    setter(event.target.value)
  }

  return (
    <>
      <p className='fs-4 text-center fw-bold'>Caesar cipher</p>
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
          <p className='mb-1 fs-4 w-100'>Enter the offset:</p>
          <FormGroup
            controlId="offset"
            className='mb-4'>
            <FormControl
              type='number'
              value={offset}
              onChange={handleFieldChange(setOffset)}
              placeholder='Type offset'
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
          <Button variant="dark" onClick={handleForceDecrypt}>Force decrypt</Button>
        </Col>
        {
          resultMessage &&
          <p className='mt-3 text-center'>Result: <span className='fw-bold'>{resultMessage}</span></p>
        }
        {forceDecrypted.length > 0 && (
          <div className='d-flex flex-wrap'>
            <p className='fw-bold w-100 mt-3 text-center mb-0'>All possible answers:</p>
            {forceDecrypted.map((el, index) => <span key={index} className='mx-1'>{el}</span>)}
          </div>
        )}
      </Row>
    </>
  )
}

export default CaesarCipher