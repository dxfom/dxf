import { Dxf } from './Dxf'
import { getGroupCodeValue } from './getGroupCodeValue'
import { parseDxfFileString, parseDxfFileStringSingleSection } from './parseDxfFileString'

// https://knowledge.autodesk.com/support/autocad-mechanical/learn-explore/caas/CloudHelp/cloudhelp/2020/ENU/AutoCAD-Mechanical/files/GUID-4F938AAD-46D2-4EE5-BA44-A3BDB2BA65B2-htm.html#GUID-4F938AAD-46D2-4EE5-BA44-A3BDB2BA65B2__WS1A9193826455F5FFA23CE210C87543115-25DC
// https://encoding.spec.whatwg.org/#concept-encoding-get
// https://l0.cm/encodings/
const cpTable: { [cp: string]: string | undefined } = {
  cp874: 'dos-874',
  cp932: 'ms932',
  cp936: 'gbk',
  cp949: 'windows-949',
  cp950: 'csbig5',
  cp1361: 'johab',  // some browsers does not support johab: https://www.w3.org/International/questions/qa-choosing-encodings#avoid This is because they allow ASCII code points to represent non-ASCII characters, which poses a security threat.
  'mac-roman': 'mac',
}
const codePageToEncoding = ($DWGCODEPAGE: string): string => {
  const cp = $DWGCODEPAGE
    .trim()
    .toLowerCase()
    .replace(/^dos|^ansi_/, 'cp')
    .replace(/^iso8859_/, 'iso8859-')
  return cpTable[cp] || cp
}

const defaultEncodings: Record<string, string | undefined> = {
  ja: 'ms932',
}

export const parseDxfFileBlob = (
  dxfBlob: Blob,
  callback: (error: DOMException | undefined, dxf: Dxf | undefined) => void,
  options?: { readonly encoding?: string, readonly defaultEncoding?: string },
) => {
  const encoding = options?.encoding
  const reader = new FileReader()
  reader.onload = function () {
    const dxfString = this.result as string
    if (!encoding) {
      const header = parseDxfFileStringSingleSection(dxfString, 'HEADER')
      const version = getGroupCodeValue(header?.$ACADVER, 1)
      if (!version || version < 'AC1021') {
        parseDxfFileBlob(dxfBlob, callback, { encoding: getGroupCodeValue(header?.$DWGCODEPAGE, 3) ?? options?.defaultEncoding ?? defaultEncodings[navigator.language] ?? 'cp1252' })
        return
      }
    }
    callback(undefined, parseDxfFileString(dxfString))
  }
  reader.onerror = function () {
    callback(this.error || undefined, undefined)
  }
  reader.readAsText(dxfBlob, encoding && codePageToEncoding(encoding))
}
