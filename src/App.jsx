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
      console.log('فایل انتخاب شد:', selected.name)
    }
  }

  const handleConvert = () => {
    if (!file) {
      alert('لطفا ابتدا فایل انتخاب کنید')
      return
    }

    setConverting(true)
    
    // شبیه‌سازی تبدیل
    setTimeout(() => {
      setConverting(false)
      setConverted(true)
      alert('تبدیل موفقیت‌آمیز بود!')
    }, 2000)
  }

  const handleDownload = () => {
    if (!file) return
    
    // ایجاد فایل نمونه برای دانلود
    const content = `فایل تبدیل شده: ${file.name}\nتاریخ: ${new Date().toLocaleString('fa-IR')}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `تبدیل شده_${file.name}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    header: {
      color: '#2d6a4f',
      marginBottom: '20px'
    },
    uploadArea: {
      border: '2px dashed #40916c',
      borderRadius: '10px',
      padding: '30px',
      margin: '20px 0',
      cursor: 'pointer',
      backgroundColor: '#f8f9fa'
    },
    button: {
      backgroundColor: '#40916c',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '10px',
      width: '100%'
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    },
    fileInfo: {
      backgroundColor: '#e8f5e9',
      padding: '15px',
      borderRadius: '8px',
      margin: '15px 0'
    },
    successBox: {
      backgroundColor: '#d4edda',
      padding: '15px',
      borderRadius: '8px',
      margin: '15px 0',
      color: '#155724'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🕌 تبدیل فایل ۳D ساده</h1>
      
      <p>فایل خود را انتخاب و تبدیل کنید</p>
      
      <div 
        style={styles.uploadArea}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          accept=".obj,.stl,.fbx,.gltf"
          onChange={handleFileChange}
        />
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📁</div>
        <h3>برای انتخاب فایل کلیک کنید</h3>
        <p>فرمت‌های پشتیبانی: OBJ, STL, FBX, GLTF</p>
      </div>
      
      {file && (
        <div style={styles.fileInfo}>
          <p><strong>فایل انتخاب شده:</strong> {file.name}</p>
          <p><strong>حجم:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      
      <button
        style={{
          ...styles.button,
          ...((!file || converting) ? styles.disabledButton : {})
        }}
        onClick={handleConvert}
        disabled={!file || converting}
      >
        {converting ? 'در حال تبدیل...' : 'شروع تبدیل'}
      </button>
      
      {converted && (
        <div style={styles.successBox}>
          <h3>✅ تبدیل موفق!</h3>
          <p>فایل شما با موفقیت تبدیل شد.</p>
          <button style={styles.button} onClick={handleDownload}>
            📥 دانلود فایل تبدیل شده
          </button>
        </div>
      )}
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ⚠️ این نسخه ساده برای اجرا در موبایل بهینه شده است
        </p>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
          فایل‌ها روی سرور ذخیره نمی‌شوند
        </p>
      </div>
    </div>
  )
}

export default App
