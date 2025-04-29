import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const MiniQuiz = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const questions = [
        {
            id: 1,
            image: '/images/story/Lutung01.webp',
            question: 'Siapa nama putri bungsu yang berhati lembut?',
            options: [
                'A. Purbararang',
                'B. Rarasati',
                'C. Purbasari',
                'D. Sekarwati'
            ],
            correctAnswer: 'C. Purbasari',
            description: 'Putri bungsu yang berhati lembut dalam kisah Lutung Kasarung adalah Purbasari.'
        },
        {
            id: 2,
            image: '/images/story/Lutung02.webp',
            question: 'Mengapa Purbasari diasingkan dari istana?',
            options: [
                'A. Ia mencuri makanan kerajaan',
                'B. Ia terkena kutukan dan wajahnya berubah',
                'C. Ia menolak menikah',
                'D. Ia melanggar perintah raja'
            ],
            correctAnswer: 'B. Ia terkena kutukan dan wajahnya berubah',
            description: 'Purbasari diasingkan karena terkena kutukan yang membuat wajahnya berubah.'
        },
        {
            id: 3,
            image: '/images/story/Lutung03.webp',
            question: 'Siapa yang menyebabkan Purbasari terkena kutukan?',
            options: [
                'A. Penyihir hutan',
                'B. Purbararang',
                'C. Sang Raja',
                'D. Lutung'
            ],
            correctAnswer: 'B. Purbararang',
            description: 'Purbararang, kakak Purbasari, yang menyebabkan Purbasari terkena kutukan.'
        },
        {
            id: 4,
            image: '/images/story/Lutung04.webp',
            question: 'Apa yang dilakukan Lutung Kasarung di air terjun?',
            options: [
                'A. Bermain air',
                'B. Menyembuhkan dirinya sendiri',
                'C. Berdoa untuk kesembuhan Purbasari',
                'D. Menyanyikan lagu'
            ],
            correctAnswer: 'C. Berdoa untuk kesembuhan Purbasari',
            description: 'Lutung Kasarung berdoa di air terjun untuk kesembuhan Purbasari.'
        },
        {
            id: 5,
            image: '/images/story/Lutung05.webp',
            question: 'Apa tantangan pertama dalam sayembara?',
            options: [
                'A. Memasak',
                'B. Menari',
                'C. Menjahit',
                'D. Membangun rumah'
            ],
            correctAnswer: 'A. Memasak',
            description: 'Tantangan pertama dalam sayembara adalah memasak.'
        },
        {
            id: 6,
            image: '/images/story/Lutung06.webp',
            question: 'Apa yang membuat rambut Purbasari lebih indah dari kakaknya?',
            options: [
                'A. Panjangnya',
                'B. Kilau alaminya',
                'C. Hiasan bunga',
                'D. Sisir emas'
            ],
            correctAnswer: 'B. Kilau alaminya',
            description: 'Rambut Purbasari lebih indah karena kilau alaminya.'
        },
        {
            id: 7,
            image: '/images/story/Lutung07.webp',
            question: 'Siapa yang ditunjuk Purbasari sebagai pasangannya?',
            options: [
                'A. Tidak ada',
                'B. Seorang pangeran asing',
                'C. Lutung Kasarung',
                'D. Pengawal kerajaan'
            ],
            correctAnswer: 'C. Lutung Kasarung',
            description: 'Purbasari memilih Lutung Kasarung sebagai pasangannya.'
        },
        {
            id: 8,
            image: '/images/story/Lutung08.webp',
            question: 'Siapa sebenarnya Lutung Kasarung?',
            options: [
                'A. Roh penjaga hutan',
                'B. Pangeran Guru Minda',
                'C. Dewa',
                'D. Penjaga rahasia'
            ],
            correctAnswer: 'B. Pangeran Guru Minda',
            description: 'Lutung Kasarung sebenarnya adalah Pangeran Guru Minda yang dikutuk.'
        },
        {
            id: 9,
            image: '/images/story/Lutung09.webp',
            question: 'Apa yang terjadi setelah Purbasari memenangkan semua sayembara?',
            options: [
                'A. Ia kembali diasingkan',
                'B. Ia diangkat menjadi Ratu',
                'C. Ia memilih hidup di hutan',
                'D. Ia menikah dengan raja'
            ],
            correctAnswer: 'B. Ia diangkat menjadi Ratu',
            description: 'Setelah memenangkan sayembara, Purbasari diangkat menjadi Ratu.'
        },
        {
            id: 10,
            image: '/images/story/Lutung10.webp',
            question: 'Apa pesan utama dari kisah Lutung Kasarung?',
            options: [
                'A. Kecantikan lebih penting dari segalanya',
                'B. Kekuasaan selalu menang',
                'C. Kebaikan dan ketulusan akan selalu menang',
                'D. Jangan percaya saudara'
            ],
            correctAnswer: 'C. Kebaikan dan ketulusan akan selalu menang',
            description: 'Pesan utama dari kisah ini adalah kebaikan dan ketulusan akan selalu menang.'
        }
    ];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setShowResult(true);
        setShowOverlay(true);
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 100);
        }
    };

    const handleNextQuestion = () => {
        setShowOverlay(false);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setIsQuizFinished(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setIsQuizFinished(false);
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

            {/* Overlay Jawaban */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <img
                        src={
                            selectedAnswer === questions[currentQuestion].correctAnswer
                                ? '/images/correct.png'
                                : '/images/incorrect.png'
                        }
                        alt={selectedAnswer === questions[currentQuestion].correctAnswer ? "Benar" : "Salah"}
                        className="w-40 h-40 mb-8"
                    />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {selectedAnswer === questions[currentQuestion].correctAnswer ? "Jawaban Benar!" : "Jawaban Salah!"}
                    </h2>
                    <div className="bg-green-500 bg-opacity-90 border-4 border-orange-400 rounded-2xl px-6 py-4 mb-8 w-72">
                        <p className="text-white text-center text-lg">{questions[currentQuestion].description}</p>
                    </div>
                    <button
                        className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg border-2 border-orange-400 hover:bg-orange-900 transition"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestion < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Skor Akhir'}
                    </button>
                </div>
            )}

            {/* Jika quiz selesai, tampilkan skor akhir dan tombol */}
            {isQuizFinished ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Quiz Selesai!</h2>
                        <p className="text-lg mb-6">Skor Akhir Kamu: <span className="font-bold text-primary-orange">{score}</span></p>
                        <div className="flex flex-col gap-4">
                            <button
                                className="bg-primary-orange text-white px-6 py-3 rounded-lg font-semibold"
                                onClick={() => navigate('/')}
                            >
                                Kembali ke Halaman Utama
                            </button>
                            <button
                                className="bg-primary-darker text-white px-6 py-3 rounded-lg font-semibold"
                                onClick={handleRestartQuiz}
                            >
                                Ulang Kuis Lagi
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
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
                            {questions[currentQuestion].question}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiniQuiz; 