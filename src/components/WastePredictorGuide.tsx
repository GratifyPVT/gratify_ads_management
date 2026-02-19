import React from "react";

const steps = [
  {
    number: 1,
    title: "Install Requirements",
    items: [
      "Make sure Python is installed on your system.",
      <>Open a terminal and run: <code className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono">pip install tensorflow opencv-python numpy</code></>,
    ],
  },
  {
    number: 2,
    title: "Download Files",
    items: [
      <>Download <code className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono">waste_model.h5</code> and place it in your project folder.</>,
      <>Download <code className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono">predict.py</code> and save it in the <strong>same folder</strong> as the model.</>,
    ],
  },
  {
    number: 3,
    title: "Run the Predictor",
    items: [
      "Open a terminal inside your project folder.",
      <>Run the command: <code className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono">python predict.py</code></>,
    ],
  },
  {
    number: 4,
    title: "Use the Camera",
    items: [
      "The camera will open automatically.",
      "Place your waste item in front of the camera.",
      <>Press <code className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono">Spacebar</code> to capture an image.</>,
    ],
  },
  {
    number: 5,
    title: "Get Prediction",
    items: ["The model will analyze the image and return a category."],
  },
];

const categories = [
  { label: "🌱 Biodegradable", className: "bg-green-100 text-green-800" },
  { label: "♻️ Recyclable", className: "bg-blue-100 text-blue-800" },
  { label: "🗑️ Miscellaneous", className: "bg-yellow-100 text-yellow-800" },
];

export default function WastePredictorGuide() {
  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-12 shadow-lg">
        {/* Header */}
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          🌿 AI Waste Classifier
        </span>
        <h1 className="text-3xl font-extrabold text-green-900 mb-2">
          Waste Predictor — Setup Guide
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Follow these steps to set up and run the waste classification model on your machine.
        </p>
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.number}>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white text-base font-extrabold rounded-full flex items-center justify-center mt-1">
                {step.number}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-green-700 mb-2">{step.title}</h2>
                <ul className="space-y-1">
                  {step.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 pl-5 relative py-1.5 border-b border-gray-100 last:border-0 leading-relaxed"
                    >
                      <span className="absolute left-0 text-green-600 font-bold">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {index < steps.length - 1 && (
              <hr className="my-8 border-dashed border-green-200" />
            )}
          </div>
        ))}
        {/* Output Categories */}
        <div className="mt-8 bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Possible predicted categories:</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <span
                key={cat.label}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${cat.className}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
