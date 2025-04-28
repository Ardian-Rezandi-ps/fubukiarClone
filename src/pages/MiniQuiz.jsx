import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MiniQuiz = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            image: '/images/story/Lutung07.webp',
            question: 'Apa yang dilakukan Lutung dalam gambar ini?',
            options: ['Memohon kesembuhan bagi Purbasari yang sedang sakit.', 'Melompat ke sungai Meminta kekuatan agar bisa mengalahkan semua musuh kerajaannya.'],
            correctAnswer: 'Memohon kesembuhan bagi Purbasari yang sedang sakit.',
            description: 'Pada adegan ini, Lutung Kasarung tampak berdoa di sebuah tempat suci untuk menolong Purbasari. Apa tujuan utama Lutung Kasarung berdoa dalam peristiwa tersebut?'
        },
        {
            id: 2,
            image: '/images/story/Lutung02.webp',
            question: 'Di mana habitat alami Lutung?',
            options: ['A. Di hutan', 'B. Di padang rumput'],
            correctAnswer: 'A. Di hutan',
            description: 'Lutung adalah hewan yang hidup di hutan tropis. Mereka menghabiskan sebagian besar waktunya di atas pohon dan memakan buah-buahan serta daun-daunan.'
        },
        {
            id: 3,
            image: '/images/story/Lutung03.webp',
            question: 'Apa makanan utama Lutung?',
            options: ['A. Buah dan daun', 'B. Daging'],
            correctAnswer: 'A. Buah dan daun',
            description: 'Lutung adalah hewan herbivora yang memakan buah-buahan, daun, dan bunga. Mereka jarang memakan daging atau biji-bijian.'
        }
    ];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 100);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-primary-darker">
            {/* Banner */}
            <div className="relative w-full h-32 bg-primary-orange">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-white">Mini Quiz</h1>
                    <div className="mt-2 px-6 py-2 rounded-lg bg-orange-100">
                        <span className="text-2xl font-bold text-orange-700">Skor: {score}</span>
                    </div>
                </div>
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4"
                >
                    <img 
                        src="/images/back.png" 
                        alt="Back" 
                        className="w-8 h-8"
                    />
                </button>
            </div>


                {/* Deskripsi Soal */}
                <div className="bg-white p-4 rounded-lg mb-6">
                    
            <div className="max-w-2xl mx-auto p-4">
                {/* Gambar Utama */}
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                    <img 
                        src={questions[currentQuestion].image} 
                        alt="Gambar Soal" 
                        className="w-full h-full object-cover"
                    />
                </div> 
                 
                    <p className="text-gray-600">
                        {questions[currentQuestion].description}
                    </p>
                </div>

                {/* Tombol Pilihan */}
                <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`p-4 rounded-lg text-center border-2 ${
                                showResult && option === questions[currentQuestion].correctAnswer
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : showResult && option === selectedAnswer && option !== questions[currentQuestion].correctAnswer
                                    ? 'bg-red-500 border-red-500 text-white'
                                    : 'bg-black border-yellow-400 text-yellow-400'
                            }`}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    ))}
                     {/* Tombol Next */}
                {showResult && (
                    <button
                        className="w-full bg-primary-orange text-white py-3 rounded-lg mt-4"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestion < questions.length - 1 ? 'Soal Berikutnya' : 'Selesai'}
                    </button>
                )}
                </div>

               
            </div>
        </div>
    );
};

export default MiniQuiz; 