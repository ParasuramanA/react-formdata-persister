import { useState, useEffect, useRef } from "react";

export const useFormDataPersister = ({ formKey, steps = 1, autoSaveDelay = 1000 }) => {
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const saveTimeout = useRef(null);

    // Restore saved data
    useEffect(() => {
        if (!formKey) {
            console.error("❌ useFormDataPersister requires a valid 'formKey'");
            return;
        };

        try {
            const savedData = localStorage.getItem(formKey);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                if (typeof parsed === "object" && parsed !== null) {
                    setFormData(parsed);
                }
            }
        } catch (error) {
            console.error(`Error restoring form data for key: ${formKey}`, error);
        }
    }, [formKey]);

    // Auto-save data
    useEffect(() => {
        if (!formKey) {
            console.error("❌ useFormDataPersister requires a valid 'formKey'");
            return;
        };

        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(() => {
            try {
                localStorage.setItem(formKey, JSON.stringify(formData));
                // Debug line
                console.log(`✅ Saved data for ${formKey}:`, formData);
            } catch (error) {
                console.error(`Error saving form data for key: ${formKey}`, error);
            }
        }, autoSaveDelay);

        return () => clearTimeout(saveTimeout.current);
    }, [formData, formKey, autoSaveDelay]);

    // Field updater
    const updateField = (field, value) => {
        if (typeof field !== "string") {
            console.error("updateField requires a valid field name (string)");
            return;
        }
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Step control
    const nextStep = () => {
        if (steps > 1 && currentStep < steps) setCurrentStep((s) => s + 1);
    };

    const prevStep = () => {
        if (steps > 1 && currentStep > 1) setCurrentStep((s) => s - 1);
    };

    const resetForm = () => {
        setFormData({});
        setCurrentStep(1);
        localStorage.removeItem(formKey);
    };

    return { formData, updateField, currentStep, nextStep, prevStep, resetForm, steps };
};
