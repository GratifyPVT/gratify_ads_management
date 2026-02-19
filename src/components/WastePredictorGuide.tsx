import React from "react";

const steps = [
  {
    number: 1,
    dark: true,
    title: "Fork & Clone the Repository",
    items: [
      <>
        Visit <strong>github.com/GratifyPVT/ML-model</strong> and click the{" "}
        <strong>Fork</strong> button (top-right) to copy the repo to your GitHub account.
      </>,
      <>
        Open a terminal and clone your forked repo:
        <br />
        <code className="block bg-gray-100 text-gray-800 border border-gray-300 px-2 py-0.5 rounded text-xs font-mono mt-1 break-all">
          git clone https://github.com/YOUR-USERNAME/ML-model.git
        </code>
      </>,
      <>
        Navigate into the folder:
        <br />
        <code className="block bg-gray-100 text-gray-800 border border-gray-300 px-2 py-0.5 rounded text-xs font-mono mt-1">
          cd ML-model
        </code>
      </>,
    ],
  },
  {
    number: 2,
    dark: false,
    title: "Install Requirements",
    items: [
      <>
        Make sure <strong>Python</strong> is installed on your system.
      </>,
      <>
        In the project folder, run:
        <br />
        <code className="block bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-xs font-mono mt-1 break-all">
          pip install tensorflow opencv-python numpy
        </code>
      </>,
    ],
  },
  {
    number: 3,
    dark: false,
    title: "Check Your Files",
    items: [
      <>
        Confirm{" "}
        <code className="bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded text-xs font-mono">
          waste_model.h5
        </code>{" "}
        is inside the <strong>model/</strong> folder.
      </>,
      <>
        Confirm{" "}
        <code className="bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded text-xs font-mono">
          predict.py
        </code>{" "}
        is in the root project folder.
      </>,
    ],
  },
  {
    number: 4,
    dark: false,
    title: "Run the Predictor",
    items: [
      "Open a terminal inside your project folder.",
      <>
        Run the command:{" "}
        <code className="bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded text-xs font-mono">
          python predict.py
        </code>
      </>,
    ],
  },
  {
    number: 5,
    dark: false,
    title: "Use the Camera",
    items: [
      <>
        The camera will open <strong>automatically</strong>.
      </>,
      "Place your waste item in front of the camera.",
      <>
        Press{" "}
        <code className="bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded text-xs font-mono">
          Spacebar
        </code>{" "}
        to capture an image.
      </>,
    ],
  },
  {
    number: 6,
    dark: false,
    title: "Get Your Prediction",
    items: [
      "The model will analyze the captured image and display the predicted waste category.",
    ],
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
      <div className="bg-white rounded-3xl max-w-2xl w-full p-12 shadow-lg overflow-hidden">

        {/* Badge */}
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          🌿 AI Waste Classifier
        </span>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-green-900 leading-tight mb-2">
          Waste Predictor — Setup Guide
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Follow these steps to fork, clone, and run the waste classification model on your machine.
        </p>

        {/* GitHub Banner */}
        <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 mb-10">
          <span className="text-3xl flex-shrink-0">🐙</span>
          <div className="text-sm text-gray-700 leading-relaxed min-w-0">
            <strong>GitHub Repository</strong>
            <br />
            <a
              href="https://github.com/GratifyPVT/ML-model"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold break-all hover:underline"
            >
              github.com/GratifyPVT/ML-model
            </a>
          </div>
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.number}>
            <div className="flex gap-5">
              {/* Number bubble */}
              <div
                className={`flex-shrink-0 w-10 h-10 text-white text-base font-extrabold rounded-full flex items-center justify-center mt-1 ${
                  step.dark ? "bg-gray-800" : "bg-green-600"
                }`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base font-bold mb-2 ${
                    step.dark ? "text-gray-800" : "text-green-700"
                  }`}
                >
                  {step.title}
                </h2>
                <ul className="space-y-0">
                  {step.items.map((item, i) => (
                    <li
                      key={i}
                      className={`text-sm text-gray-700 pl-6 relative py-2 border-b border-gray-100 last:border-0 leading-relaxed before:absolute before:left-0 before:font-bold ${
                        step.dark
                          ? "before:content-['→'] before:text-gray-800"
                          : "before:content-['→'] before:text-green-600"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {index < steps.length - 1 && (
              <hr className="my-7 border-dashed border-green-200" />
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

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Ready to paste into your Canva design!
        </p>
      </div>
    </div>
  );
}