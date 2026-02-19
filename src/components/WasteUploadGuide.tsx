import React from "react";

const steps = [
  {
    number: 1,
    title: "Prepare Your Request",
    items: [
      "You need to send a POST request to:",
      <code className="block bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-sm font-mono mb-2">https://gratify-ads-management.vercel.app/api/uploadwaste</code>,
      "The request must be a multipart/form-data type (for file upload)."
    ]
  },
  {
    number: 2,
    title: "Required Fields",
    items: [
      "Include these fields in the form data:",
      <ul className="ml-6 list-disc text-sm text-gray-700">
        <li><strong>image</strong>: The waste image file (required, max 10MB).</li>
        <li><strong>type</strong>: The type of waste (e.g., 'plastic', 'food', 'glass', 'metal', 'paper', 'organic', 'can', 'bottle', 'vegetable', 'fruit', 'plant', 'cardboard').</li>
        <li><strong>binlocation</strong>: The location of the bin (required).</li>
      </ul>,
      "Example types will be auto-categorized as 'biodegradable', 'recyclable', or 'miscellaneous'."
    ]
  },
  {
    number: 3,
    title: "Example Using curl",
    items: [
      "Run this command in your terminal:",
      <code className="block bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded text-sm font-mono mb-2">curl -X POST https://gratify-ads-management.vercel.app/api/uploadwaste \
  -F "image=@yourfile.jpg" \
  -F "type=plastic" \
  -F "binlocation=Main Entrance"</code>,
      "Replace 'yourfile.jpg' with your image file, 'type' with the waste type, and 'binlocation' with the bin's location."
    ]
  },
  {
    number: 4,
    title: "Auto-Categorization",
    items: [
      "The API will automatically categorize the waste:",
      <ul className="ml-6 list-disc text-sm text-gray-700">
        <li><strong>biodegradable</strong>: food, paper, organic, vegetable, fruit, plant</li>
        <li><strong>recyclable</strong>: plastic, metal, glass, cardboard, can, bottle</li>
        <li><strong>miscellaneous</strong>: anything else</li>
      </ul>,
      "You do not need to specify the category; just provide the type and the API will handle it."
    ]
  },
  {
    number: 5,
    title: "Response",
    items: [
      "If successful, you'll get a JSON response with the waste details and image URL.",
      "If any field is missing or the file is too large, you'll get an error message."
    ]
  }
];

export default function WasteUploadGuide() {
  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-12 shadow-lg">
        {/* Header */}
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          ♻️ Waste Upload API Guide
        </span>
        <h1 className="text-3xl font-extrabold text-green-900 mb-2">
          Waste Upload — How To
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Learn how to upload waste images and details using the API. Follow these steps for a successful upload.
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
      </div>
    </div>
  );
}
