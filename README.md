# REACT-CULQI-TS

A React library using Typescript for integration with the Culqi payment processor, compatible with Next.js

## Installation

```bash
npm install react-culqi-ts
```

## Usage

```js
import { useState } from "react";
import { CulqiProviderV3, Culqi } from "react-culqi-ts";

import { CulqiProvider, Culqi } from 'react-culqi';

const App = () => {
  return (
    <CulqiProviderV3
      publicKey="your-culqi-public-key-here"
      onToken={token => {
        /* handle a successful token */
      }}
      onError={error => {
        /* handle an error during tokenization */
      }}
    >
      <Culqi>
        {({ openCulqi, setAmount, amount }) => {
          return <button onClick={openCulqi}>Open Culqi</button>;
        }}
      </Culqi>
    </CulqiProviderV3>
  );
};
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Based on
I needed support with Typescript so I have to publish a new version with few changes.

I based on two repositories as original code, I would very grateful to allow me contribute or maintain those codes. 

https://github.com/klujanrosas/react-culqi React using classes 
https://github.com/hebertdev/react-culqi-full React using hooks