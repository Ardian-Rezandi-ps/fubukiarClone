import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const lutungKasarung = [
  `Di dalam istana yang megah, sang Raja duduk termenung.\nUsianya telah lanjut, tubuhnya melemah, dan satu pertanyaan terus mengganggu pikirannya:\nSiapa yang akan menggantikan takhta kerajaan?\nIa memiliki beberapa putri yang tumbuh dengan baik.\nMasing-masing punya kelebihan, tapi satu di antaranya memiliki hati yang paling lembut.\nNamun… membuat pilihan bukanlah hal mudah bagi seorang ayah dan raja.\n\n\n\n\n`,
  `Pada suatu pagi yang cerah, sang Raja memanggil semua putrinya ke balairung istana.\nIa berdiri tegak, namun matanya menyimpan haru.\n"Ayah akan segera menyerahkan takhta," katanya.\n"Dan pewaris kerajaan ini adalah… Purbasari."\nPara kakak Purbasari tersenyum dan memberi selamat.\nMereka tahu adik bungsu mereka berhati baik.\nNamun, hanya satu yang tidak tersenyum—Purbararang.\nIa menunduk, matanya tajam… hatinya terbakar cemburu.\n\n\n\n\n`,
  `Malam harinya, saat semua tertidur, Purbararang menyelinap keluar istana.\nDengan langkah cepat, ia menuju hutan terlarang… tempat tinggal seorang penyihir tua.\n"Aku ingin Purbasari terlihat buruk di mata ayah," bisiknya.\nSang penyihir mengangguk dan menyiapkan ramuan.\nCahaya hijau menyala dari tungku… mantra pun dilepaskan.`,
  `Keesokan harinya, wajah dan tubuh Purbasari dipenuhi bercak gelap.\nIa merasa lemas, bingung, dan ketakutan.\nSang Raja memeluk putri bungsunya dengan mata berkaca-kaca.\n"Ayah tak tahu apa yang terjadi… tapi engkau terlihat seperti terkena kutukan," katanya.\nDari kejauhan, Purbararang pura-pura prihatin—padahal hatinya puas.`,
  `Dengan berat hati, sang Raja mengambil keputusan.\nUntuk menjaga nama baik kerajaan, Purbasari harus diasingkan ke hutan.\nPurbasari tidak menangis. Ia hanya menunduk dan mencium tangan ayahnya.\n"Terima kasih, Ayah," katanya lirih.\nDengan langkah perlahan, ia meninggalkan istana.\nTanpa tahu, di hutan sana, takdir baru sedang menantinya.`,
  `Di tengah hutan yang sunyi, Purbasari duduk menangis.\nAir matanya jatuh tanpa henti, rasa sedih dan putus asa menyelimuti hatinya.\nTiba-tiba, dari balik semak-semak, muncul seekor lutung hitam berbulu lebat.\nLutung itu berjalan pelan mendekati Purbasari, lalu duduk di dekatnya.\nIa tak bicara, hanya memandang lembut.\nDan di tengah kesedihan itu, sebuah pertemanan lahir tanpa kata.\n\n\n\n\n
`,
  `Keesokan harinya, Lutung mengajak Purbasari menyusuri jalan setapak menuju air terjun suci.
Di sana, di bawah gemuruh air yang jatuh, Lutung Kasarung berdoa dalam diam.
Ia memejamkan mata, duduk bersila, dan membisikkan harapan untuk kesembuhan Purbasari.
Purbasari memperhatikannya dari belakang.
Ia tak tahu apa yang sedang Lutung lakukan,
tapi hatinya terasa lebih tenang dari sebelumnya.\n\n\n\n\n
`,
  `Hari demi hari berlalu. Perlahan, wajah Purbasari mulai bersinar kembali.
Bercak di kulitnya menghilang, dan senyumnya tumbuh kembali.
Ia dan Lutung bermain di hutan, dikelilingi hewan-hewan yang ramah—rusa, burung, dan kelinci.
Tawa mereka terdengar lembut di antara pepohonan.
Untuk pertama kalinya, Purbasari merasa damai… dan tidak sendiri.\n\n\n\n\n
`,
  `Di kejauhan, kereta kerajaan tampak datang menembus hutan.\nRoda kayunya bergerak pelan, seolah membawa harapan.\nPurbasari dan Lutung berhenti bermain.\nMereka saling menatap. Tak ada kata-kata, tapi keduanya tahu:\ninilah saatnya kembali.\nPerjalanan menuju istana akan segera dimulai—dan lembaran baru pun terbuka.\n\n\n\n\n
`,  `Setelah kembali ke istana, Purbasari disambut hangat oleh sang Raja, tapi tidak oleh semua orang.\nPurbararang, kakaknya, merasa tak terima.\n"Kalau memang kau pantas jadi ratu, buktikan lewat sayembara!" tantangnya.\nMaka diumumkan tiga lomba:\nMemasak,\nMenata rambut,\nMemperkenalkan pasangan terbaik.\nRakyat berkumpul untuk menyaksikan.\nPurbararang tampil percaya diri—sementara Purbasari tetap tenang.\n\n\n\n\n
`,  `Dalam lomba memasak, Purbararang menyajikan hidangan mewah,\ntapi rasa masakan Purbasari yang sederhana justru menghangatkan hati semua orang.\nDalam lomba rambut, hiasan dan sisir emas kalah dari kilau alami rambut Purbasari.\nLomba terakhir membuat semua terdiam:\nPurbararang menggandeng pangeran tampan,\nsementara Purbasari menunjuk… seekor lutung.\n"Ini sahabatku," katanya lembut.\nOrang-orang tertawa—tapi tidak lama.\nLutung Kasarung berubah menjadi Pangeran Guru Minda.\nWibawanya memukau semua yang hadir.\nKini tak ada lagi keraguan—Purbasari menang, dalam semua hal yang berarti.\n\n\n\n\n
`,  `Purbasari dan Guru Minda berdiri berdampingan di pelaminan istana.\nTak ada lagi kutukan, tak ada lagi cemburu—hanya cinta dan kedamaian.\nBunga-bunga mekar, rakyat bersorak, dan musik mengalun lembut di seluruh penjuru istana.\nSang Raja tersenyum bangga, menyaksikan putri bungsunya menikah dengan orang yang dipilih oleh hatinya sendiri.\nMereka tidak memerintah dengan kekuatan,\ntapi dengan kelembutan, kasih, dan kejujuran.\nRakyat hidup sejahtera. Istana dipenuhi tawa.\nDan kisah mereka dikenang…\nsebagai bukti bahwa kebaikan akan selalu pulang sebagai pemenang.\n\n\n\n\n
`
];

const empatRaja = [
  `Di sebuah desa kecil yang damai,\nhidup sepasang suami istri—raja dan ratu yang bijaksana.\nHidup mereka penuh kasih,\ntapi satu hal masih belum mereka miliki:\nseorang anak.\nSetiap hari mereka berdoa, berharap, menanti.\nHingga suatu pagi, mereka pergi ke hutan untuk mencari kayu.\nNamun yang mereka temukan bukanlah kayu,\nmelainkan enam telur misterius, bercahaya lembut di balik semak-semak.\nMereka saling menatap,\ndan membawa telur-telur itu pulang…\ndengan hati penuh harapan.\n\n\n\n\n
`,  `Beberapa waktu setelah dibawa pulang,\nlima dari enam telur perlahan mulai retak.\nDari dalamnya, lahir empat bayi laki-laki dan satu perempuan.\nMereka sehat, hangat, dan tak bersuara—seolah tahu mereka ditunggu begitu lama.\nSang Raja dan Ratu menangis bahagia.\nSatu telur yang tersisa tetap utuh…\ndan disimpan sebagai tanda, bahwa keajaiban belum selesai.
`,  `Tahun-tahun berlalu dengan cepat.\nKelima anak itu tumbuh dalam cinta dan kebersamaan.\nDi malam hari, mereka menari di bawah cahaya bulan.\nMusik dan tawa terdengar di halaman rumah kecil mereka.\nHidup mereka sederhana,\ntapi tak pernah kekurangan rasa syukur.
`,  `Setiap anak menunjukkan bakatnya sendiri:\n🌱 War, si sulung, rajin merawat ladang—menggali tanah dan menanam sayuran.\n🏹 Betani, cekatan dan gesit—berlatih memanah dan membantu berburu makanan.\n🐐 Dohak, tenang dan tangguh—menggembala kambing dan menjaga ternak keluarga.\n🏗️ Mohamad, teliti dan kreatif—menenun atap dan membantu membangun rumah.\n❤️ Tintole, si bungsu, lembut dan penuh perhatian—selalu ada untuk ibu dan saudara-saudaranya.\nMereka berbeda,\ntapi selalu saling melengkapi.\n\n\n\n\n
`,  `Saat anak-anak telah cukup besar,\nsang ayah memanggil keempat putranya ke halaman rumah.\nIa membentangkan peta berisi pulau-pulau di lautan timur.\n"Ini semua akan menjadi milik kalian," katanya.\n"Tapi ingat… kekuasaan bukan untuk diri sendiri—tapi untuk melindungi sesama."\n\n\n\n\n
`,  `Tak lama setelah itu, sang Raja jatuh sakit.\nSeluruh keluarga berkumpul di samping tempat tidurnya.\nDengan suara lemah, ia menatap satu per satu anak-anaknya.\n"Jangan lupakan asal kalian," ucapnya pelan.\nKetika ia berpulang,\nangin terasa hening… dan langit malam tampak lebih gelap dari biasanya.\n\n\n\n\n
`,  `War, Betani, Dohak, dan Mohamad berlayar ke pulau mereka masing-masing.\nDi sana, mereka membangun, menjaga, dan memimpin dengan hati.\nRakyat mencintai mereka.\nPulau-pulau itu pun tumbuh damai di bawah perlindungan mereka.\nMerekalah yang dikenal sebagai Raja Ampat—\nempat saudara, empat pemimpin, satu warisan dari hutan dan langit.\nSementara itu, Tintole tetap tinggal bersama ibunya,\nmenjaga rumah kecil yang menyimpan awal dari segalanya.\n\n\n\n\n
`
];

const StoryDetail = () => {
  const { cerita } = useParams();
  const isLutung = cerita === 'lutung';

  // Pilih array cerita dan total halaman
  const storyParagraphs = isLutung ? lutungKasarung : empatRaja;
  const totalPages = storyParagraphs.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (paragraphRef.current) {
      paragraphRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // Penomoran gambar: lutung 01-12, empat raja 13-19
  const imagePage = isLutung ? currentPage : currentPage + 12;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Header with Image */}
      <div className="w-full h-72 relative overflow-hidden mt-0">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p className="text-white-600">memuat gambar...</p>
          </div>
        )}
        <img 
          src={`/images/story/Lutung${imagePage.toString().padStart(2, '0')}.webp`} 
          alt={`Story Page ${currentPage}`} 
          className="w-full h-full object-cover mt-0 mb-5"
          onLoad={handleImageLoad}
          onError={() => setIsImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end"></div>
      </div>
      
      {/* Back Button */}
      <Link to="/collection" className="absolute left-4 top-4 z-10 bg-white/30 rounded-full p-2">
        <img src="/images/back.png" alt="Back" className="w-6 h-6" />
      </Link>

      {/* Story Content */}
      <div id="storycontent" className="flex-1 px-5 py-4 bg-white rounded-t-3xl -mt-20 z-10 overflow-y-auto max-h-[calc(100vh-18rem)] shadow-lg">
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h3 id="judulstory" className="text-1xl text-black text-center mb-4">
           <i>Cerita Rakyat:</i> <b>{isLutung ? "Lutung Kasarung" : "Empat Raja"}</b> 
          </h3>
          <p
            ref={paragraphRef}
            className="text-black-800 mb-0 border-t-2 text-left px-3 py-1 leading-relaxed text-base md:text-lg max-h-80 md:max-h-[60vh] overflow-y-auto"
          >
            {storyParagraphs[currentPage - 1].split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
           {/* Navigation Buttons */}
      <div id="navbutton" className="fixed bottom-0 left-0 right-0 flex flex-col items-center px-5 py-4 bg-white z-50">
        <div className="w-full flex justify-between items-center">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${currentPage === 1 ? 'opacity-50' : 'bg-black text-white'} text-xl font-bold`}
          >
            &lt;
          </button>
          
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${currentPage === totalPages ? 'opacity-50' : 'bg-black text-white'} text-xl font-bold`}
          >
            &gt;
          </button>
        </div>
        {/* Tombol ke Mainkan Game dan MiniQuiz */}
        {!isLutung && (
          <div className="w-full flex justify-center mt-2">
            <Link
              to="/Home2"
              className="rounded-lg border-2 border-primary-orange bg-black text-primary-orange font-bold px-8 py-1.5 text-base shadow transition hover:bg-primary-orange hover:text-black mb-1"
            >
              Mainkan Game
            </Link>
          </div>
        )}
        <div className="w-full flex justify-center mt-1">
          <Link
            to="/mini-quiz"
            className="rounded-lg border-2 border-primary-orange bg-black text-primary-orange font-bold px-8 py-1.5 text-base shadow transition hover:bg-primary-orange hover:text-black"
          >
            Mulai Mini Quiz
          </Link>
        </div>
      </div>
        </div>
      </div>

     
    </div>
  );
};

export default StoryDetail; 