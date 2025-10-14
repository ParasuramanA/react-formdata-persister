# react-formdata-persister

A lightweight React hook that automatically saves single-step or multi-step form data to `localStorage`.  
Perfect for survey apps, checkout flows, and long forms where users might refresh or navigate away.

---

## ⚙️ Installation

```bash
npm install react-formdata-persister

```

## 🚀 usage Example For both Single-step Form

```javascript
// Import the hook
import { useFormDataPersister } from "react-formdata-persister";

// Example: Single-step form
export default function ContactForm() {
  // 👇 Every form must have a unique formKey
  const { formData, updateField, resetForm } = useFormDataPersisterj({ formKey: "contact_form" });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    resetForm();
  };

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => updateField("name", e.target.value)}j
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </label>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
```
## 🚀 usage Example For Multi-step Form

```javascript
// Import the hook
import { useFormDataPersister } from "react-formdata-persister";

// Example: Multi-step form
export default function MultiStepForm() {
  // 👇 Every form must have a unique formKey
  const { formData, updateField, currentStep, nextStep, prevStep } = useFormDataPersister({
    formKey: "signup_form",
    steps: 3,
  });

  return (
    <div>
      {currentStep === 1 && (
        <input
          placeholder="First Name"
          value={formData.firstName || ""}
          onChange={(e) => updateField("firstName", e.target.value)}
        />
      )}

      {currentStep === 2 && (
        <input
          placeholder="Email"
          value={formData.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
        />
      )}

      {currentStep === 3 && (
        <div>
          <p>Review your info before submitting:</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <button onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </button>
        <button onClick={nextStep} disabled={currentStep === 3}>
          Next
        </button>
      </div>
    </div>
  );
}
```
## 🚀 usage Example For Reset Form

```javascript
🧹 Reset Form

Clear saved form data completely:

resetForm();
```