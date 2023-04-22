# DXF Object Model / DXF

Lossless low level DXF object model.


## Installation

```bash
$ npm i @dxfom/dxf
```


## Usage

```javascript
import fs from 'fs'
import { parseDxfFileArrayBuffer } from '@dxfom/dxf/bundle.js'

const buffer = fs.readFileSync('my.dxf')
const dxf = parseDxfFileArrayBuffer(buffer.buffer)

for (const entity of dxf.ENTITIES) {
  for (const [groupCode, groupCodeValue] of entity) {
    console.log(groupCode, ':', groupCodeValue)
  }
  console.log('----')
}
```


## Object Model

See [Dxf.ts](https://github.com/dxfom/dxf/blob/master/src/Dxf.ts).


## License

GPL 3.0
