'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultationPage() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { user: 'Consultant', message: 'Welcome to your consultation. How can I assist you today?' },
  ]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [stream, setStream] = useState(null);
  const router = useRouter();
  
  const videoRef = useRef(null);

  // Function to start the video call
  const startVideoCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      setIsVideoCallActive(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
      alert("Sorry, we couldn't access your camera and microphone.");
    }
  };

  // Function to generate replies based on user input
  const generateConsultantReply = (userInput) => {
    if (userInput.toLowerCase().includes('diet plan')) {
      // Redirect to the /feeding page when the user asks for a diet plan
      setTimeout(() => {
        router.push('/feeding'); // Redirect to feeding page
      }, 1000);
      return "Redirecting you to the diet plan section...";
    } else if (userInput.toLowerCase().includes('health issue')) {
      return "It sounds like your pet may be dealing with a health issue. Could you please describe the symptoms?";
    } else if (userInput.toLowerCase().includes('appointment')) {
      return "Let's schedule an appointment. What time works best for you?";
    } else {
      return `You said: "${userInput}". How else can I help?`;
    }
  };

  // Handle new message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add user's message to chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { user: 'You', message: userMessage },
    ]);
    setUserMessage(''); // Clear input field

    // Simulate consultant's reply based on user input
    setTimeout(() => {
      const consultantReply = generateConsultantReply(userMessage);
      setChatHistory((prevChat) => [
        ...prevChat,
        { user: 'Consultant', message: consultantReply },
      ]);
    }, 1000); // Delay to simulate a response
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">One-to-One Consultation</h1>

      {/* Chat Section */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="space-y-4 mb-6">
          {/* Chat History */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {chatHistory.map((entry, index) => (
              <div key={index} className={`flex ${entry.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`bg-gray-200 p-3 rounded-lg max-w-xs ${entry.user === 'You' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                  <span className="font-semibold">{entry.user}:</span> {entry.message}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg"
              placeholder="Type your message..."
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Video Call Button */}
      {!isVideoCallActive && (
        <button
          onClick={startVideoCall}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Start One-to-One Video Call
        </button>
      )}

      {/* Video Call Section */}
      {isVideoCallActive && (
        <div className="w-full max-w-lg mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Video Call Active</h2>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-lg shadow-lg"
          ></video>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsVideoCallActive(false)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition-all"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
