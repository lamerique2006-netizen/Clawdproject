export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', fontWeight: 'bold' }}>BrainAI Video Generator</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', opacity: 0.9 }}>Transform product images into stunning AI videos in seconds</p>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '10px', marginBottom: '30px', backdropFilter: 'blur(10px)' }}>
          <p style={{ fontSize: '1em', marginBottom: '20px' }}>✨ AI-powered video generation</p>
          <p style={{ fontSize: '1em', marginBottom: '20px' }}>🎬 Perfect for e-commerce</p>
          <p style={{ fontSize: '1em', marginBottom: '20px' }}>💰 Increase conversions by 3x</p>
        </div>

        <a href="/api/models" style={{ display: 'inline-block', background: 'white', color: '#667eea', padding: '15px 40px', borderRadius: '5px', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'none', marginRight: '10px' }}>
          View Models
        </a>
        <a href="/api/pricing" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '15px 40px', borderRadius: '5px', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'none' }}>
          Pricing
        </a>
      </div>
    </div>
  )
}
