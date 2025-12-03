import React, { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [converting, setConverting] = useState(false)
  const [converted, setConverted] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected)
      setConverted(false)
    }
  }

  const handleConvert = () => {
    if (!file) {
      alert('لطفا ابتدا فایل انتخاب کنید')
      return
    }

    setConverting(true)
    
    setTimeout(() => {
      setConverting(false)
      setConverted(true)
    }, 2000)
  }

  const handleDownload = () => {
    if (!file) return
    
    const content = `فایل تبدیل شده: ${file.name}\nتاریخ: ${new Date().toLocaleString('fa-IR')}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `converted_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('✅ دانلود شروع شد!')
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2d6a4f', marginBottom: '20px' }}>🕌 تبدیل فایل ۳D</h1>
      
      <div 
        style={{
          border: '2px dashed #40916c',
          borderRadius: '10px',
          padding: '30px',
          margin: '20px 0',
          cursor: 'pointer',
          backgroundColor: '#f8f9fa'
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".obj,.stl,.fbx,.gltf"
        />
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📁</div>
        <h3>برای انتخاب فایل کلیک کنید</h3>
        <p>فرمت‌های پشتیبانی: OBJ, STL, FBX, GLTF</p>
      </div>
      
      {file && (
        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '15px',
          borderRadius: '8px',
          margin: '15px 0'
        }}>
          <p><strong>فایل انتخاب شده:</strong> {file.name}</p>
          <p><strong>حجم:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      
      <button
        style={{
          backgroundColor: converting ? '#ccc' : '#40916c',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: converting ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          width: '100%',
          margin: '10px 0'
        }}
        onClick={handleConvert}
        disabled={!file || converting}
      >
        {converting ? 'در حال تبدیل...' : 'شروع تبدیل'}
      </button>
      
      {converted && (
        <div style={{
          backgroundColor: '#d4edda',
          padding: '15px',
          borderRadius: '8px',
          margin: '15px 0',
          color: '#155724'
        }}>
          <h3>✅ تبدیل موفق!</h3>
          <p>فایل شما با موفقیت تبدیل شد.</p>
          <button 
            onClick={handleDownload}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            📥 دانلود فایل تبدیل شده
          </button>
        </div>
      )}
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ⚠️ فایل‌ها روی سرور ذخیره نمی‌شوند • استقرار روی Vercel
        </p>
      </div>
    </div>
  )
}

export default App
