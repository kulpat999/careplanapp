import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    desiredOutcome: '',
    supportNeeds: '',
    healthSummary: '',
    mobility: '',
    medication: '',
    dailyRoutine: '',
    risks: '',
    consent: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Right at Home - Care Plan Generator</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              />
            </div>
          ))}
          <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Generate Care Plan
          </button>
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Care Plan</h2>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
            {Object.keys(formData).map((key) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {formData[key]}
              </p>
            ))}
          </div>
          <button
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '20px', padding: '10px 20px', background: 'green', color: '#fff', border: 'none', borderRadius: '5px' }}
          >
            Edit Again
          </button>
        </div>
      )}
    </div>
  );
}
