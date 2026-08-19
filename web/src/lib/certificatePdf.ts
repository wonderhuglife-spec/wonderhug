export function downloadCertificatePdf(opts: { programName: string; userName: string; date: string }) {
  const line1 = 'WonderHug.Life'
  const line2 = 'Programme completion'
  const line3 = opts.programName
  const line4 = opts.userName
  const line5 = opts.date
  const line6 = 'Educational wellness programme — not a clinical credential.'
  const objects: string[] = []

  const stream = [
    'BT',
    '/F1 24 Tf 72 720 Td (WonderHug.Life) Tj',
    '/F1 14 Tf 0 -36 Td (Programme completion) Tj',
    `/F1 18 Tf 0 -40 Td (${escapePdf(line3)}) Tj`,
    `/F1 14 Tf 0 -32 Td (${escapePdf(line4)}) Tj`,
    `/F1 12 Tf 0 -28 Td (${escapePdf(line5)}) Tj`,
    `/F1 10 Tf 0 -36 Td (${escapePdf(line6)}) Tj`,
    'ET',
  ].join('\n')

  const content = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  const pages = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>'
  const page = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>'
  const font = '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>'
  const catalog = '<< /Type /Catalog /Pages 2 0 R >>'

  objects.push(catalog, pages, page, content, font)

  let body = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((obj, i) => {
    offsets.push(body.length)
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xref = body.length
  body += `xref\n0 ${objects.length + 1}\n`
  body += '0000000000 65535 f \n'
  for (let i = 1; i <= objects.length; i++) {
    body += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  body += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  const blob = new Blob([body], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `certificate-${opts.programName.replace(/\s+/g, '-').toLowerCase()}.pdf`
  a.click()
  URL.revokeObjectURL(url)
  return { line1, line2, line3, line4, line5 }
}

function escapePdf(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}
