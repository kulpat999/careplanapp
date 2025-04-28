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

  const formatText = (text) => {
    const bulletPoints = text.split("\n").filter(item => item.trim() !== "");

    // Create a structured paragraph with natural transitions
    let paragraph = "The individual requires ";

    bulletPoints.forEach((item, index) => {
      let formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      
      // Adding proper transitions and structure
      if (index === bulletPoints.length - 1) {
        paragraph += `and ${formattedItem}.`;
      } else {
        paragraph += `${formattedItem}, `;
      }
    });

    // Make the first sentence more formal and natural
    if (paragraph.startsWith("The individual requires")) {
      paragraph = paragraph.replace("The individual requires", "The individual needs assistance with");
    }

    return paragraph;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Display the logo */}
      <img 
        src="/logo.png" 
        alt="Right at Home Logo" 
        style={{ width: '150px', marginBottom: '20px' }} 
      />
      
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
            <p><strong>Desired Outcome:</strong> {formatText(formData.desiredOutcome)}</p>
            <p><strong>Support Needs:</strong> {formatText(formData.supportNeeds)}</p>
            <p><strong>Health Summary:</strong> {formatText(formData.healthSummary)}</p>
            <p><strong>Mobility:</strong> {formatText(formData.mobility)}</p>
            <p><strong>Medication:</strong> {formatText(formData.medication)}</p>
            <p><strong>Daily Routine:</strong> {formatText(formData.dailyRoutine)}</p>
            <p><strong>Risks:</strong> {formatText(formData.risks)}</p>
            <p><strong>Consent:</strong> {formatText(formData.consent)}</p>
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
