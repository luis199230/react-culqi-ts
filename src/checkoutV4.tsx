import React, { useState, useEffect } from 'react'
import CulqiContext from './context'
import { CulqiError, CulqiOptionsV4, CulqiProviderV4Props, CulqiToken } from './typedefs'

const culqiMessages = {
  welcome: 'checkout_bienvenido',
  closed: 'checkout_cerrado'
}

const baseCulqiUrl = 'https://checkout.culqi.com'
const culqiId = 'culqi-js'
const culqiUrl = `${baseCulqiUrl}/js/v4`

const CulqiProviderV4: React.FC<CulqiProviderV4Props> = (props: CulqiProviderV4Props) => {
  console.log('CulqiProviderV4', props.options.amount)
  const [amount, setAmount] = useState<number>(1000)
  console.log('amount')
  const [token, setToken] = useState<CulqiToken | null>(null)
  const [error, setError] = useState<CulqiError | null>(null)

  useEffect(() => {
    console.log('useEffect', props)
    if (props.options.amount) {
      setAmount(props.options.amount)
    }
  }, [props.options.amount])

  const getCulqiSettings = (): CulqiOptionsV4 => {
    const {
      currency = 'PEN',
      description = '',
      title = '',
      style,
      paymentMethods
    } = props.options || {}

    return {
      amount,
      currency,
      description,
      title,
      style,
      paymentMethods
    }
  }

  useEffect(() => {
    if (!props.publicKey) return

    const script = document.createElement('script')
    script.id = culqiId
    script.src = culqiUrl
    script.async = true
    script.onload = onCulqiLoad
    document.body.appendChild(script)
    window.addEventListener('message', onCulqiEvent, false)

    return () => {
      document.body.removeChild(script)
      window.removeEventListener('message', onCulqiEvent, false);
      (window as any).culqi = undefined
    }
  }, [props.publicKey])

  useEffect(() => {
    if (amount) {
      setCulqiSettings(getCulqiSettings())
    }
  }, [amount])

  const initCulqi = () => {
    const { publicKey, options } = props
    const culqiSettings = getCulqiSettings()

    setCulqiOptions(options);
    (window as any).Culqi.publicKey = publicKey
    requestAnimationFrame(() => {
      setCulqiSettings(culqiSettings)
    });
    // Patch it so it doesn't throw on browser
    (window as any).culqi = () => {}
  }

  const onCulqiLoad = (e: any) => {
    if ((window as any).Culqi) {
      initCulqi()
    }
  }

  const onCulqiEvent = (messageEvent: MessageEvent) => {
    const { origin, data } = messageEvent
    const { onClose, onError, onToken } = props
    if (origin !== baseCulqiUrl) return

    if (typeof data === 'string' && data === culqiMessages.closed) {
      onClose && onClose()

      initCulqi()
    }

    if (typeof data === 'object') {
      const { object } = data
      if (!object) return
      if (object === 'token') {
        setToken(data)
        onToken && onToken(data)
      } else if (object === 'error') {
        setError(data)
        onError && onError(data)
      }
    }
  }

  const openCulqi = () => {
    if ((window as any).Culqi) {
      (window as any).Culqi.open()
    }
  }

  const setCulqiOptions = (userOptions: CulqiOptionsV4) => {
    if (Object.keys(userOptions).length > 0 && (window as any).Culqi) {
      (window as any).Culqi.options(userOptions)
    }
  }

  const setCulqiSettings = (settings: CulqiOptionsV4) => {
    if ((window as any).Culqi) {
      (window as any).Culqi.settings(settings)
    }
  }

  useEffect(() => {
    if (!props.publicKey) {
      throw new Error('Please pass along a publicKey prop.')
    }
  }, [props.publicKey])

  return (
    <CulqiContext.Provider
      value={{
        setAmount,
        openCulqi,
        amount,
        token,
        error
      }}
    >
      {props.children}
    </CulqiContext.Provider>
  )
}

export default CulqiProviderV4
